export default {
  init() {
    const cards = document.querySelectorAll('.js-open-dropdown');
    if (cards === null || cards === undefined || cards.length === 0) {
      return;
    }
    for (let i = 0; i < cards.length; i += 1) {
      cards[i].addEventListener('click', (e) => {
        const elem = e.currentTarget;
        const blockContent = elem.parentElement.querySelector('.s-faq__text-container');
        let animateSpeed;
        const currentHeight = blockContent.offsetHeight;
        const totalHeight = blockContent.scrollHeight;
        if (totalHeight < 500) {
          animateSpeed = 500;
        } else if (totalHeight > 500 && totalHeight < 800) {
          animateSpeed = 700;
        } else {
          animateSpeed = 1000;
        }
        if (currentHeight === 0) {
          elem.classList.add('open');
          $(blockContent).height(currentHeight);
          $(blockContent).stop().animate({ height: totalHeight }, animateSpeed);
          $(blockContent).addClass('open');
        } else {
          elem.classList.remove('open');
          $(blockContent).stop().animate({ height: '0' }, animateSpeed);
          $(blockContent).removeClass('open');
        }
      }, false);
    }
  },
};
