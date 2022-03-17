/* eslint-disable */
import moment from 'moment';
import validator from 'validator';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import { jsPDF } from 'jspdf';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import pdf from './pdf';
import axios from '../../react-components/core/axios';
import constans from '../../react-components/core/constans';
import ModalClass from './modalClass';
import FormValidator from './formValidator';

export default {
  init() {
    const path = window.location.pathname.match('html/result.html');

    if (!window.localStorage.token) {
      $('.header-nav__btn-recomend').attr('href',`${window.location.origin}/html/not-have-result.html`)
    }

    function renderRecomend(data) {
      let result = '';

      data.forEach((element, i) => {
        result += `
        <div class="s-result__recomend-item s-result__recomend-item-${i}">
          <h5 class="s-result__recomend-name">${element.recommendations.heading}</h5>
          <p>
            ${element.recommendations.description_recommendation}
          </p>
        </div>
        `;
      });

      document.querySelector('.s-result__loding').style.display = 'none';
      document.querySelector('.s-result__results').insertAdjacentHTML('beforeend', result);

      setTimeout(() => {
        let id ;
        let name ;
        // eslint-disable-next-line no-unused-vars
        const inspection = new ModalClass(
          '#inspection',
          '.inspection-modal__close-btn',
          '.s-result__inspection-passed',
        );

        $('.s-result__inspection-passed').on('click', (e) => {
          id = e.target.dataset.id;
          name = e.target.dataset.name
          $('.form__input-data-picker').val('')
          $('.inspection-modal__title').text(name);
        })

        flatpickr('.form__input-data-picker', {
          locale: Russian,
          enableTime: false,
          dateFormat: 'd.m.Y',
          maxDate: 'today',
          monthSelectorType: 'static',
          showMonths: 1,
          position: 'below',
          disableMobile: 'true',
          onOpen() {
            $('#inspection').addClass('open-data-picker');
            $('.err').hide();
          },
          onClose() {
            $('#inspection').removeClass('open-data-picker');
          },
          onMonthChange() {
            $('.err').hide();
          }
        });

        const rulesPassword = {
          'input-data-picker': [
            {
              validatorValue: (val) => !validator.isEmpty(val),
              errorInfo: 'Пустое поле',
            },
          ],
        }

        function onSubConsult(val) {
          axios.post(constans.ENDPOINTS.consultSave, {dateCompletion: val['input-data-picker'], idCons:+id })
            .then(({data}) => {
              // $('.inspection-modal__title').hide();
              // $('.inspection-modal__desc').hide();
              // $('.inspection-data').hide();
              // $('.inspection-modal').append(data.message);
              window.location.reload()
            })
            .catch((err) => {
              $('.inspection-modal').hide();
              $('.inspection').after('Что-то пошло не так')
            })
        }

        const formContacts = new FormValidator($('#inspection-data'), Object.keys(rulesPassword), rulesPassword, onSubConsult);
      }, 2000);
    }

    function renderCallendar(data) {
      /* eslint-disable */
      let result = '';
      let count = 0;
      let complitedCons = ''

      data.forEach((element, i) => {
        const dataCalndarStart = moment(element.date_appointment).format('YYYYMMDD') + 'T070000Z';
        const dataCalndarEnd = moment(element.date_appointment).format('YYYYMMDD') + 'T090000Z';

        if (element.date_completion) {
          return complitedCons += `
            <div class="s-result__consultation s-result__consultation-${i}">
              <p class="s-result__consultation-name">${element.consultations.description_consultations}</p>
              <div class="s-result__consultation-completed">
                  <div class="s-result__consultation-icon"><img src="../frontend/dist/img/complited.png" alt=""></div>
                  <span class="s-result__consultation-date">Пройден ${moment(element.date_completion).format('DD.MM.YYYY, h:mm')}</span>
              </div>
            </div>
          `
        }
        // <button class="s-result__consultation-edit">Изменить</button>
        result += `
        <div class="s-result__inspection s-result__inspection-${i}">
          <p class="s-result__inspection-name">${element.consultations.description_consultations}</p>
          <p class="s-result__inspection-date">Напомним вам по эл. почте <span>
          ${moment(element.date_appointment).format('DD.MM.YYYY, h:mm')}</span> </p>
          <a href='https://calendar.google.com/calendar/u/0/r/eventedit?text=${element.consultations.description_consultations}&dates=${dataCalndarStart}/${dataCalndarEnd}Z&details=${element.consultations.description_consultations}&sf=true&output=xml' target="_blank"
          class="s-result__inspection-add">Добавить в календарь</a>
          <button class="s-result__inspection-passed" data-name='${element.consultations.description_consultations}' data-id='${element.id}'>Уже пройден</button>
        </div>
        `;
        count += 1;
      });

      result += complitedCons;

      document.querySelector('.s-result__loding-calendar').style.display = 'none';
      document.querySelector('.s-result__calendar-desc').insertAdjacentHTML('afterend', result);
      $('.test-complited__date').text(moment(data[0].created_at).format('DD.MM.YYYY'))
      $('.s-result__nav-item-count > span').text(count);
    }

    const emailNoty = new ModalClass(
      '#emailNoty',
      '.emailNoty-modal__close-btn',
    );

    function fetchConsult() {
      axios.get(constans.ENDPOINTS.getTestRecomend)
        .then(({ data }) => {
          renderRecomend(data);
          return data;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.href = `${window.location.origin}/html/not-have-result.html`;
            return
          }
          document.querySelector('.s-result__loding').textContent = err.response.data.message;
        });
    }

    function fetchRecomend() {
      return axios.get(constans.ENDPOINTS.getConsult)
        .then(({ data }) => {
          renderCallendar(data);
          return data;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.href = `${window.location.origin}/html/not-have-result.html`;
            return
          }
          document.querySelector('.s-result__loding-calendar').textContent = err.response.data.message;
          $('.test-complited').hide()
          $('.s-result__calendar-desc').hide()
        });
    }

    if (path) {
      window.scrollTo(0,0);

      if (!window.localStorage.token) {
        window.location.href = `${window.location.origin}/html/not-have-result.html`;
      }

      fetchConsult()
      fetchRecomend()
        .then(data => {
          pdf.init();
        })

        $('.test-complited__print').on('click', () => {
          window.print()
        })
        $('.test-complited__email').on('click', () => {
          axios.post(constans.ENDPOINTS.recomendEmail)
            .then(({ data }) => {
              emailNoty.openStateModal = true;
            })
        })

        function goToByScroll(id) {
          $('html,body').animate({
            scrollTop: $(`#${id}`).offset().top,
          }, 'slow');
        }

        $('.goto').on('click', function ()  {
          goToByScroll($(this).attr('data-scroll'))
          $('.goto').removeClass('s-result__nav-item--active')
          $(this).addClass('s-result__nav-item--active')
        })
    }
  },
};

/**
 *
 *
          pdfMake.vfs = pdfFonts.pdfMake.vfs;

          const docDefinition = {
            pageOrientation: 'portrait',
            pageSize: 'A4',
            pageMargins: [40, 40],
            header: [
              { text: 'Результаты теста', alignment: 'center', fontSize: 24 },
            ],
            footer: [
              { text: '© Всё не напрасно, 2021', alignment: 'center' },
            ],
            content: [
              {
                margin: [0, 0, 0, 20],
                alignment: 'center',
                fit: [2500, 2500],
                image: image
              },
              {
                margin: [0, 0, 0, 20],
                alignment: 'center',
                fit: [2500, 2500],
                image: image
              },

              { text: 'Рекомендации для вас', fontSize: 18, style: 'name' },
              {
                text:[{text: 'Общие рекомендации по питанию \n', fontSize: 14, style:'ulRecomend'}, { text: 'У вашего рациона могут быть индивидуальные особенности, связанные с полом, возрастом, культурными условиями и доступностью продуктов. Однако есть несколько общих рекомендаций, которые помогут следовать правилам здорового питания:', fontSize: 14, },],
                margin: [10,0,0,20],
              },
              {
                text:[{text: 'Общая часть по генетике \n', fontSize: 14, style:'ulRecomend'}, { text: 'Мы задавали вопросы о том, болел ли кто-то из ваших родственников онкологическими заболеваниями. Расскажем немного подробнее, зачем это было нужно и как интерпретировать результат.', fontSize: 14 },],
                margin: [10,0,0,20],
              },
              {
                text:[{text: 'Общие рекомендации по питанию \n', fontSize: 14, style:'ulRecomend'}, { text: 'У вашего рациона могут быть индивидуальные особенности, связанные с полом, возрастом, культурными условиями и доступностью продуктов. Однако есть несколько общих рекомендаций, которые помогут следовать правилам здорового питания:', fontSize: 14 },],
                margin: [10,0,0,20],
                style:'t'
              },
              {
                text:[{text: 'Рекомендуем вам увеличить количество фруктов, овощей и зелени. \n', fontSize: 14, style:'ulRecomend',}, { text: 'Оптимальное количество этих продуктов в суточном рационе – не менее 400 г (или 5 порций/ «горстей»). Фрукты, овощи и зелень содержат большое количество клетчатки. Употребление клетчатки связано с меньшими рисками сердечно-сосудистых заболеваний, сахарного диабета 2 типа и колоректального рака.', fontSize: 14 },],
                margin: [10,0,0,20],
              },
              { text: 'Консультации для вас', fontSize: 18, style: 'name', margin: [0, 20, 0, 0] },
            ],
            styles: {
              name: {bold:false, lineHeight: 2},
              ulRecomend: {lineHeight: 1.2, bold:true, background: '#82839b'},
              t: {background:'#b3b4c8'}
            },
          }

          pdfMake.createPdf(docDefinition).open()
 */
