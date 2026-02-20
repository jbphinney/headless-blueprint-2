import * as SELECTORS from 'constants/selectors';

import classNames from 'classnames/bind';

import styles from './Main.module.scss';

const cx = classNames.bind(styles);

/**
 * Render the Main component.
 *
 * @param {Props} props The props object.
 * @param {string} props.className Optional class name.
 * @param {React.ReactElement} props.children The children to be rendered.
 * @returns {React.ReactElement} The Main component.
 */
export default function Main({ children, className, ...props }) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex="-1"
      className={cx('main', className)}
      {...props}
    >
      {children}
    </main>
  );
}
