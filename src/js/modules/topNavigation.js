export default {
  openTopNavigation() {
    const menuButton = document.querySelectorAll('.js-open-top-navigation');
    for (let i = 0; i < menuButton.length; i += 1) {
      menuButton[i].addEventListener('click', (e) => {
        const elem = e.currentTarget;
        const menu = $(elem).siblings('.js-top-nav-menu');
        $(menu).addClass('open js-close-scroll-menu');
      }, false);
    }
  },
  closeTopNavigation() {
    const menuButton = document.querySelectorAll('.js-close-top-navigation');
    for (let i = 0; i < menuButton.length; i += 1) {
      menuButton[i].addEventListener('click', (e) => {
        const elem = e.currentTarget;
        const menu = $(elem).parent('.js-top-nav-menu');
        $(menu).removeClass('open');
      }, false);
    }
  },
};
