import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

// Mock the imported components
jest.mock('../', () => ({
  NavigationMenu: ({ children, className, id }) => (
    <div data-testid="nav-menu" id={id} className={className}>
      {children}
    </div>
  ),
  SkipNavigationLink: () => <div data-testid="skip-link">Skip Link</div>,
}));

// Mock next/link to handle the logo link properly
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return React.cloneElement(children, { href });
  };
});

// Mock next/image to prevent loading actual images
jest.mock('next/image', () => {
  return ({ src, alt }) => <img src={src} alt={alt} />;
});

describe('Header Component', () => {
  const mockMenuItems = [
    {
      id: 'menu-item-1',
      path: '/about',
      label: 'About',
    },
    {
      id: 'menu-item-2',
      path: '/contact',
      label: 'Contact',
    },
  ];

  it('renders correctly with initial state', () => {
    render(<Header menuItems={mockMenuItems} />);

    // Check if SkipNavigationLink is rendered
    expect(screen.getByTestId('skip-link')).toBeInTheDocument();

    // Check if Logo is rendered
    // The link should have title "Home" and href "/"
    const logoImage = screen.getByAltText('Blueprint media logo');
    expect(logoImage).toBeInTheDocument();

    const logoLink = logoImage.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveAttribute('title', 'Home');

    // Check if NavigationMenu is rendered
    const navMenu = screen.getByTestId('nav-menu');
    expect(navMenu).toBeInTheDocument();

    // Initial state: navigation should be hidden (no 'show' class)
    // Note: classnames/bind with mocked styles usually returns the key as the class name
    expect(navMenu).toHaveClass('primary-navigation');
    expect(navMenu).not.toHaveClass('show');

    // Check toggle button
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'primary-navigation');
  });

  it('toggles navigation menu visibility when button is clicked', () => {
    render(<Header menuItems={mockMenuItems} />);

    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    const navMenu = screen.getByTestId('nav-menu');

    // Click to show
    fireEvent.click(toggleButton);

    // Expect 'show' class to be present
    expect(navMenu).toHaveClass('show');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Click to hide
    fireEvent.click(toggleButton);

    // Expect 'show' class to be removed
    expect(navMenu).not.toHaveClass('show');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });
});
