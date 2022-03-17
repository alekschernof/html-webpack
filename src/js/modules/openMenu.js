export default {
  openHeader() {
    const menuButton = document.querySelectorAll('.js-open-header-menu');
    for (let i = 0; i < menuButton.length; i += 1) {
      menuButton[i].addEventListener('click', (e) => {
        const elem = e.currentTarget;
        const menu = $(elem).siblings('.js-header-menu');
        const headerHeight = $('.site-header').outerHeight();
        const body = $('body');
        $(elem).toggleClass('open');
        $(menu).toggleClass('open');
        if ($(menu).hasClass('open')) {
          $(menu).css('height', $(window).height() - headerHeight);
        } else {
          $(menu).css('height', 'auto');
        }
        if ($(menu).hasClass('open')) {
          $(body).addClass('hidden-body-y');
        } else {
          $(body).removeClass('hidden-body-y');
        }
      }, false);
    }
  },
};
