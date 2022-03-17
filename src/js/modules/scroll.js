import $ from 'jquery';

export default {
  init() {
    // eslint-disable-next-line consistent-return
    function goToByScroll(id, cuont) {
      if (cuont) {
        $('html,body').animate({
          scrollTop: $(`#${id}`).offset().top + 170,
        }, 'slow');
        return '';
      }
      $('html,body').animate({
        scrollTop: $(`#${id}`).offset().top,
      }, 'slow');
    }

    const elem = window.location.hash.replace('#', '');

    if (elem) {
      goToByScroll(elem, 'd');
    }

    $('.header-nav__item--sponsor').on('click', () => {
      const path = window.location.pathname.match('html/index.html');
      if (path) {
        goToByScroll($('.header-nav__item--sponsor').attr('data-scroll'));
      } else {
        window.location.href = `${window.location.origin}/html/index.html#supp`;
      }
    });
  },
  scrollTo() {
    const elements = document.querySelectorAll('.js-scroll-link');

    for (let i = 0; i < elements.length; i += 1) {
      elements[i].addEventListener('click', (e) => {
        e.preventDefault();
        const item = e.currentTarget;
        const menu = item.parentElement;
        const body = $('body');
        body.removeClass('hidden-body-y');
        const href = item.getAttribute('href').substr(1);
        const element = document.getElementById(href);
        if (element === null && element === undefined) {
          return;
        }
        if (menu.classList.contains('js-close-scroll-menu')) {
          menu.classList.remove('open');
        }
        const yOffset = -30;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }, false);
    }
  },
};
