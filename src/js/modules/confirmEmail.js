/* eslint-disable no-unused-vars */
import axios from 'axios';
import validator from 'validator';
import Constans from '../../react-components/core/constans';
import ModalClass from './modalClass';
import FormValidator from './formValidator';

export default {
  init() {
    // const path = window.location.pathname.match('html/index.html');

    // eslint-disable-next-line no-unused-vars
    const confirmEmail = new ModalClass(
      '#confirmEmail',
      '.confirmEmail-modal__close-btn',
    );

    // eslint-disable-next-line no-unused-vars
    const confirmEmailLoding = new ModalClass(
      '#confirmEmailLoding',
      '.confirmEmailLoding-modal__close-btn',
    );

    // eslint-disable-next-line no-unused-vars
    const recoverPass = new ModalClass(
      '#recoverPass',
      '.recoverPass-modal__close-btn',
    );

    function recoverNewPasswordAction(hash) {
      recoverPass.openStateModal = true;

      const onSubmitRecover = (value) => {
        axios.post(Constans.ENDPOINTS.recoverNewPass, {
          hash,
          password: value.recoverPassRep2,
        }).then(({ data }) => {
          document.querySelector('.recoverPass-form').remove();
          document.querySelector('.recoverPass-modal')
            .append(`${data.message}`);
          return data;
        }).catch((err) => {
          document.querySelector('.recoverPass-form').remove();
          document.querySelector('.recoverPass-modal')
            .append(`${err.response.data.message}`);
        });
      };

      let formRecoverPass;

      const rulesRecoverPassword = {
        recoverPassRep: [
          {
            validatorValue: (val) => validator.isLength(val, { min: 4 }),
            errorInfo: 'Длина должна быть от минимум 4 символа',
          },
          {
            validatorValue: (val) => val.match(/^[a-zA-Z0-9!"#$%&'()*+,-.:;<=>?@/[\]^_`{|}]{4,}/g),
            errorInfo: 'Пароль должен содержать как минимум 1 цифру, 1 заглавную букву, 1 прописную букву',
          },
        ],
        recoverPassRep2: [
          {
            validatorValue: (val) => val === formRecoverPass.getValueForm.recoverPassRep,
            errorInfo: 'Пароли не совпадают',
          },
        ],
      };

      formRecoverPass = new FormValidator($('#recoverPass'), Object.keys(rulesRecoverPassword), rulesRecoverPassword, onSubmitRecover);
    }

    function confirmEmailAction(hash) {
      axios.post(Constans.ENDPOINTS.confirmEmail, { hash })
        // eslint-disable-next-line promise/always-return
        .then(({ data }) => {
          confirmEmail.openStateModal = true;
          confirmEmailLoding.openStateModal = false;

          return data;
        })
        .catch((err) => {
          confirmEmailLoding.openStateModal = true;
          document.querySelector('.confirmEmailLoding-modal__desc')
            .textContent = 'Подтверждение регистрации. Ваша регистрация подтверждена, авторизуйтесь для входа в систему';
          return err.response.data.message;
        });
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const param = Object.fromEntries(urlSearchParams.entries());

    if (param.act === 'confirmEmail') {
      confirmEmail.openStateModal = true;

      document.querySelector('.s-main-home__anchor').addEventListener('click', () => {
        confirmEmail.openStateModal = false;
        // eslint-disable-next-line no-return-assign
        return window.location.href = `${window.location.origin}/`;
      });
    }

    // const rules = {
    //   confirmEmail: confirmEmailAction,
    //   recoverNewPassword: recoverNewPasswordAction,
    // };

    // if (param.hash) {
    //   rules[param.act](param.hash);
    // } else if (rules[param.act]) {
    //   rules[param.act](Object.values(param)[1]);
    // }
  },
};
