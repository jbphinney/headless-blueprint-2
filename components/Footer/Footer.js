import classNames from 'classnames/bind';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import appConfig from 'app.config.js';

import { NavigationMenu } from '../';

import styles from './Footer.module.scss';

let cx = classNames.bind(styles);

const SOCIAL_LINKS_MAP = [
  {
    key: 'twitterUrl',
    icon: FaTwitter,
    title: 'Twitter',
  },
  {
    key: 'facebookUrl',
    icon: FaFacebookF,
    title: 'Facebook',
  },
  {
    key: 'instagramUrl',
    icon: FaInstagram,
    title: 'Instagram',
  },
  {
    key: 'youtubeUrl',
    icon: FaYoutube,
    title: 'YouTube',
  },
  {
    key: 'githubUrl',
    icon: FaGithub,
    title: 'GitHub',
  },
  {
    key: 'linkedinUrl',
    icon: FaLinkedinIn,
    title: 'LinkedIn',
  },
];

/**
 * The Blueprint's Footer component
 * @return {React.ReactElement} The Footer component.
 */
export default function Footer({ menuItems }) {
  return (
    <footer className={cx('footer')}>
      <div className="container">
        {appConfig?.socialLinks && (
          <div className={cx('social-links')}>
            <ul aria-label="Social media">
              {SOCIAL_LINKS_MAP.map((link) => {
                const url = appConfig.socialLinks[link.key];
                if (!url) {
                  return null;
                }
                const Icon = link.icon;
                return (
                  <li key={link.key}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={url}
                    >
                      <Icon title={link.title} className={cx('social-icon')} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <NavigationMenu className={cx('nav')} menuItems={menuItems} />

        <div className={cx('copyright')}>
          &copy; {new Date().getFullYear()} Blueprint Media &#183; Powered By{' '}
          <a href="https://wpengine.com/headless-wordpress">
            Headless Platform
          </a>
        </div>
      </div>
    </footer>
  );
}
