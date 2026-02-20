const { describe, it, afterEach } = require('node:test');
const assert = require('node:assert');
const { render, screen, cleanup } = require('@testing-library/react');
const React = require('react');

// We need to require the component. Since it's ESM source transpiled by babel,
// and has export default, we expect .default property.
const NavigationMenu = require('./NavigationMenu.js').default;

describe('NavigationMenu Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('returns null when menuItems is undefined', () => {
    const { container } = render(React.createElement(NavigationMenu));
    assert.strictEqual(container.firstChild, null);
  });

  it('returns null when menuItems is null', () => {
    const { container } = render(React.createElement(NavigationMenu, { menuItems: null }));
    assert.strictEqual(container.firstChild, null);
  });

  it('renders correctly when menuItems is empty array', () => {
    // Note: When menuItems is empty, menuItems[0] is undefined.
    // The current implementation renders an aria-label="undefined menu".
    // We assert this behavior to ensure stability, even if the label isn't ideal.
    const { container } = render(React.createElement(NavigationMenu, { menuItems: [] }));
    const nav = container.querySelector('nav');

    assert.ok(nav);
    // Verifying current behavior
    assert.strictEqual(nav.getAttribute('aria-label'), 'undefined menu');

    const ul = container.querySelector('ul.menu');
    assert.ok(ul);
    assert.strictEqual(ul.children.length, 0);
  });

  it('renders menu items correctly', () => {
     const menuItems = [
       { id: '1', path: '/foo', label: 'Foo', menu: { node: { name: 'Main' } } },
       { id: '2', path: '/bar', label: 'Bar', menu: { node: { name: 'Main' } } }
     ];
     render(React.createElement(NavigationMenu, { menuItems }));

     const nav = screen.getByRole('navigation');
     assert.strictEqual(nav.getAttribute('aria-label'), 'Main menu');

     const items = screen.getAllByRole('listitem');
     assert.strictEqual(items.length, 2);

     const links = screen.getAllByRole('link');
     assert.strictEqual(links.length, 2);

     assert.strictEqual(links[0].getAttribute('href'), '/foo');
     assert.strictEqual(links[0].textContent, 'Foo');

     assert.strictEqual(links[1].getAttribute('href'), '/bar');
     assert.strictEqual(links[1].textContent, 'Bar');
  });

  it('handles items with missing properties', () => {
     // Tests resilience against incomplete data
     const menuItems = [
       { id: null, path: null, label: null, menu: { node: { name: 'Main' } } }
     ];
     const { container } = render(React.createElement(NavigationMenu, { menuItems }));

     // querySelector used because getByRole('link') requires an accessible name,
     // which is missing here due to empty label.
     const link = container.querySelector('a');

     // Should render with empty href and empty text as per component logic (path ?? '', label ?? '')
     assert.strictEqual(link.getAttribute('href'), '');
     assert.strictEqual(link.textContent, '');
  });

  it('renders children elements', () => {
     const menuItems = [{ id: '1', path: '/', label: 'Home', menu: { node: { name: 'Main' } } }];
     const ChildComponent = React.createElement('li', { 'data-testid': 'child' }, 'Child Item');

     render(React.createElement(NavigationMenu, { menuItems }, ChildComponent));

     const items = screen.getAllByRole('listitem');
     // 1 from menuItems + 1 child
     assert.strictEqual(items.length, 2);

     const child = screen.getByTestId('child');
     assert.ok(child);
     assert.strictEqual(child.textContent, 'Child Item');
  });
});
