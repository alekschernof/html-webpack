/* eslint-disable prefer-template */
import $ from 'jquery';

export default {
  cookieModalNode: $('.cookie-popup'),
  closeCookieModal: 'cookie-popup__close',
  confirmCookieModal: 'cookie-popup__btn',

  setValueToCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    // eslint-disable-next-line no-useless-concat
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getValueFromCookie(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  },
  init() {
    if (this.getValueFromCookie('cookieState')) {
      this.cookieModalNode.hide();
    } else {
      this.cookieModalNode.show();

      $(`.${this.closeCookieModal}`).on('click', () => {
        this.cookieModalNode.hide();
      });
      $(`.${this.confirmCookieModal}`).on('click', () => {
        this.setValueToCookie('cookieState', true, 3000);
        this.cookieModalNode.hide();
      });
    }
  },
};
