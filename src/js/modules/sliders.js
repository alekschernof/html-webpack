import Swiper, { Navigation } from 'swiper';

export default {
  init() {
    const container = $('.js-swiper-init');
    if (container !== undefined && container !== null) {
      if ($(window).width() < 768) {
        container.addClass('swiper');
        container.find('.s-services__wrapper').addClass('swiper-wrapper');
        container.find('.s-services__card').addClass('swiper-slide');
        // eslint-disable-next-line no-unused-vars
        const swiper = new Swiper('.js-swiper-init', {
          edgeSwipeDetection: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          slidesPerGroup: 1,
          spaceBetween: 20,
        });
      } else {
        container.removeClass('swiper');
        container.find('.s-services__wrapper').removeClass('swiper-wrapper');
        container.find('.s-services__card').removeClass('swiper-slide');
      }
    }
  },
  footerSliders() {
    const container = document.querySelectorAll('.js-projects-slider');
    if (container.length === 0) {
      return;
    }
    for (let i = 0; i < container.length; i += 1) {
      const slider = container[i].querySelector('.swiper');
      // eslint-disable-next-line no-unused-vars
      const swiper = new Swiper(slider, {
        modules: [Navigation],
        edgeSwipeDetection: true,
        centeredSlides: true,
        slidesPerGroup: 1,
        loop: true,
        navigation: {
          nextEl: slider.parentElement.querySelector('.swiper-button-next'),
          prevEl: slider.parentElement.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
            initialSlide: 1,
          },
        },
      });
    }
  },
};
