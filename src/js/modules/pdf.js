/* eslint-disable */
import $ from 'jquery';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default {
  init() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const arr = [];

    function capture(node) {
      const captureElement = document.querySelector(node);
      return html2canvas(captureElement)
        .then((canvas) => {
          // eslint-disable-next-line no-param-reassign
          canvas.style.display = 'none';
          document.body.appendChild(canvas);
          return canvas;
        })
        .then((canvas) => {
          const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          return image;
        });
    }

    setTimeout(() => {
      $('.s-result__recomend-item').each(function (i) {
        capture(`.s-result__recomend-item-${i}`, 'result')
        .then(img => {
          arr.push(img);
        })
      })
      $('.s-result__inspection').each(function (i) {
        capture(`.s-result__inspection-${i}`, 'result')
        .then(img => {
          arr.push(img);
        })
      })
      $('.s-result__consultation').each(function (i) {
        capture(`.${this.classList[1]}`, 'result')
        .then(img => {
          arr.push(img);
        })
      });

    }, 500)

    $('.test-complited__download').on('click', () => {
      const docDefinition = {
        content: [
          ...arr.map((i) => ({
            margin: [0, 0, 0, 20],
            alignment: 'center',
            width: 400,
            //height: 450,
            image: i,
          })),
        ],
      };
      pdfMake.createPdf(docDefinition).open()
    })

  },
};

