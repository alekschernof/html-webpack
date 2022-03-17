import axios from 'axios';
import 'jquery-mask-plugin';
import validator from 'validator';
import $ from 'jquery';
import constans from '../../react-components/core/constans';
import FormValidator from './formValidator';
import outLogin from './outLogin';

function formValidate(input) {
  const error = $(input).next('.s-subscribe__form-message');
  if (input.checkValidity()) {
    error.removeClass('active _error').text('');
  } else {
    error.addClass('active _error').text(input.validationMessage);
    setTimeout(() => {
      error.removeClass('active _error').text('');
    }, 3000);
  }
}

export default {
  init() {
    const notificationLabel = $('.notification-label');
    $('.form__input--data').mask('00.00.0000', { placeholder: '26.11.1991' });

    function onSubmitContacts(val) {
      axios.post(constans.ENDPOINTS.feetback, {
        name: val.name,
        emaill: val.email.toLowerCase(),
        subject: document.querySelector('.form__select').value,
        message: val.message,
      })
        .then(({ data }) => {
          notificationLabel.addClass('success active');
          notificationLabel.find('.notification-label__message').text('Данные успешно обновлены');
          $('#form-contact').trigger('reset');

          setTimeout(() => {
            notificationLabel.removeClass('active');
          }, 2500);
          return data;
        })
        .catch((err) => {
          outLogin(err.response);
          $('.status-feedback').css({ display: 'flex' });
          $('.status-feedback__btn').on('click', () => {
            $('.status-feedback').css({ display: 'none' });
          });
        });
    }

    /* eslint-disable */
    function onSubmitEditUser(val) {
      const nameUser = val.name;
      axios.post(constans.ENDPOINTS.editUser, {
        name: nameUser,
        region: $('input[name=region]').val(),
        dob: val.data_born,
        gender: window.localStorage.gender,
        email: val.email.toLowerCase(),
      })
        .then(({ data }) => {
          window.localStorage.name = nameUser;
          if (window.innerWidth >= 768) {
            $('.login-bnt').text(nameUser);
          } else {
            $('.dropdawn-auth__profile-name').text(nameUser);
          }
          $('input#name').val(nameUser);
          notificationLabel.addClass('success active');
          notificationLabel.find('.notification-label__message').text('Данные успешно обновлены');
          setTimeout(() => {
            notificationLabel.removeClass('active');
            window.location.reload();
          }, 2500);

          return data;
        })
        .catch((err) => {
          outLogin(err.response);
        });
    }

    function onSubmitPassUser(val) {

      axios.post(constans.ENDPOINTS.editUser, {
        email: $('input[name=email]').val().toLowerCase(),
        old_password: val.old_password,
        password: val.confirm_password,
      })
        .then(({ data }) => {
          notificationLabel.addClass('success active');
          notificationLabel.find('.notification-label__message').text('Данные успешно обновлены');
          setTimeout(() => {
            notificationLabel.removeClass('active');
          }, 2500);

          return data;
        })
        .catch((err) => {
          outLogin(err.response);
        });
    }

    function onSubmitRestorePassword(val) {
      const result = $('#js-restore-password').find('.form-restore__item').find('.form__result');
      const paramsString = document.location.href;
      const searchParams = new URLSearchParams(paramsString);
      const approvehash = searchParams.get("approvehash");
      axios.post('/v1/user/recover/new/password/', {
        password: val.password,
        restore_password: val.repeat_password,
        approvehash: approvehash,
      })
          .then(({ data }) => {
            if (data.success) {
              result.addClass('success');
              result.text(data.message);
            }
            setTimeout(() => {
              result.removeClass('success');
              result.hide();
              window.location.href = '/';
            }, 2500);
          })
          .catch((err) => {
            result.addClass('error');
            result.text(err.message);
          });
    }

    // Это набор правил по которым мы валидируем поля в форме
    // Ключ это имя инпута, а в значении правила
    const rulesContacts = {
      name: [
        {
          validatorValue: (val) => !validator.isEmpty(val),
          errorInfo: 'Поле не должно быть пустым',
        },
        {
          validatorValue: (val) => validator.isLength(val, { min: 4, max: 30 }),
          errorInfo: 'Длина должна быть от 4 до 30 символов',
        },
      ],
      email: [
        {
          validatorValue: (val) => !validator.isEmpty(val),
          errorInfo: 'Поле не должно быть пустым',
        },
        {
          validatorValue: (val) => validator.isEmail(val),
          errorInfo: 'Неверный email адрес',
        },
      ],
      message: [
        {
          validatorValue: (val) => !validator.isEmpty(val),
          errorInfo: 'Поле не должно быть пустым',
        },
        // {
        //   validatorValue: (val) => /^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(val),
        //   errorInfo: 'Только русские буквы и цифры !',
        // },
      ],
    };

    const rulesPersonalInfo = {
      name: [
        {
          validatorValue: (val) => validator.isLength(val, { min: 4, max: 30 }),
          errorInfo: 'Длина должна быть от 4 до 30 символов',
        },
        // {
        //   validatorValue: (val) => /^[?!,.а-яА-ЯёЁ\s]+$/.test(val),
        //   errorInfo: 'Только кирилица и без цифр !',
        // },
      ],
      data_born: [
        {
          validatorValue: (val) => !validator.isEmpty(val),
          errorInfo: 'Пустое поле',
        },
      ],
      email: [
        {
          validatorValue: (val) => validator.isEmail(val),
          errorInfo: 'Неверный email адрес',
        },
      ],
    };

    let formPersonalPass;
    const rulesPassword = {
      old_password: [
        {
          validatorValue: (val) => !validator.isEmpty(val),
          errorInfo: 'Поле не должно быть пустым',
        },
      ],
      new_password: [
        {
          validatorValue: (val) => validator.isLength(val, { min: 4, max: 30 }),
          errorInfo: 'Длина должна быть от 4 до 30 символов',
        },
        {
          validatorValue: (val) => val.match(/^[a-zA-Z0-9!"#$%&'()*+,-.:;<=>?@/[\]^_`{|}]{4,}/g),
          errorInfo: 'Пароль должен содержать как минимум 1 цифру, 1 заглавную букву, 1 прописную букву',
        },
      ],
      confirm_password: [
        {
          validatorValue: (val) => val === formPersonalPass.getValueForm.new_password,
          errorInfo: 'Пароли не совпадают',
        },
      ],
    };

    let formRestorePass;
    const rulesRestorePassword = {
      password: [
        {
          validatorValue: (val) => !validator.isEmpty(val),
          errorInfo: 'Поле не должно быть пустым',
        },
        {
          validatorValue: (val) => validator.isLength(val, { min: 4, max: 30 }),
          errorInfo: 'Длина должна быть от 4 до 30 символов',
        },
        {
          validatorValue: (val) => val.match(/^[a-zA-Z0-9!"#$%&'()*+,-.:;<=>?@/[\]^_`{|}]{4,}/g),
          errorInfo: 'Пароль должен содержать как минимум 1 цифру, 1 заглавную букву, 1 прописную букву',
        },
      ],
      repeat_password: [
        {
          validatorValue: (val) => val === formRestorePass.getValueForm.password,
          errorInfo: 'Пароли не совпадают',
        },
      ],
    };

    // eslint-disable-next-line no-unused-vars
    const formContacts = new FormValidator($('#form-contact'), Object.keys(rulesContacts), rulesContacts, onSubmitContacts);

    // eslint-disable-next-line no-unused-vars
    const formPersonalInfo = new FormValidator($('#form-personal-info'), Object.keys(rulesPersonalInfo), rulesPersonalInfo, onSubmitEditUser);

    // eslint-disable-next-line no-unused-vars
    formPersonalPass = new FormValidator($('#form-password'), Object.keys(rulesPassword), rulesPassword, onSubmitPassUser);

    // eslint-disable-next-line no-unused-vars
    formRestorePass = new FormValidator($('#js-restore-password'), Object.keys(rulesRestorePassword), rulesRestorePassword, onSubmitRestorePassword);
  },
  formSubscribeValidate() {
    const forms = document.querySelectorAll('.js-subscribe-newsletter');
    if (forms.length === 0) {
      return;
    }

    for (let i = 0; i < forms.length; i += 1) {
      const formFeedback = $(forms[i]);
      const formFeedbackSubmit = formFeedback.find('button[type=submit]');
      $(formFeedbackSubmit).on('click', (e) => {
        e.preventDefault();
        const formFeedbackSubmit = formFeedback.find('button[type=submit]');
        const formFeedbackInfo = formFeedback.find('.s-subscribe__form-message');
        const inputs = formFeedback.find(':input:not(button)');
        const inputsArr = inputs.get();
        let valid = false;

        for (let i = 0; i < inputsArr.length; i += 1) {
          const input = inputsArr[i];
          if (input.checkValidity() === false) {
            valid = false;
            formValidate(input);
            break;
          } else {
            valid = true;
          }
        }
        if (valid) {
          $(formFeedbackSubmit).addClass('_disabled');
          $(formFeedbackInfo).removeClass('_success _error').addClass('active _loading')
              .text('Идет отправка формы');
          $.ajax({
            type: formFeedback.attr('method'),
            url: formFeedback.attr('action'),
            data: formFeedback.serialize(),
            dataType: 'json',
            error(err) {
              // console.log('err', err);
              $(formFeedbackSubmit).removeClass('_disabled');
              $(formFeedbackInfo).removeClass('_success _loading').addClass('active _error')
                  .text(err);
            },
          }).done((data) => {
            if (data.success) {
              $(formFeedbackInfo).removeClass('_error _loading').addClass('active _success')
                  .text('Успешно отправлено');
              setTimeout(() => {
                $(formFeedbackInfo).removeClass('_error _loading _success active').text('');
                $(formFeedbackSubmit).removeClass('_disabled');
              }, 2500);
            }
          });
        }
      })
    }
  },
  sendFormFeedback() {
    const forms = document.querySelectorAll('.js-send-feedback');
    if (forms.length === 0) {
      return;
    }

    for (let i = 0; i < forms.length; i += 1) {
      for (let i = 0; i < forms.length; i += 1) {
        const formFeedback = $(forms[i]);
        const formFeedbackSubmit = formFeedback.find('.s-subscribe__form-item').find('button[type=submit]');
        $(formFeedbackSubmit).on('click', (e) => {
          e.preventDefault();
          const formFeedbackSubmit = formFeedback.find('.s-subscribe__form-item').find('button[type=submit]');
          const formFeedbackInfo = $(formFeedbackSubmit).siblings('.s-subscribe__form-message');
          const inputs = formFeedback.find('.s-subscribe__form-item').find(':input:not(button)');
          const inputsArr = inputs.get();
          let valid = false;

          for (let i = 0; i < inputsArr.length; i += 1) {
            const input = inputsArr[i];
            if (input.checkValidity() === false) {
              valid = false;
              formValidate(input);
              break;
            } else {
              valid = true;
            }
          }
          if (valid) {
            $(formFeedbackSubmit).addClass('_disabled');
            $(formFeedbackInfo).removeClass('_success _error').addClass('active _loading')
                .text('Идет отправка формы');
            $.ajax({
              type: formFeedback.attr('method'),
              url: formFeedback.attr('action'),
              data: formFeedback.serialize(),
              dataType: 'json',
              error(err) {
                let errors = [];
                const obgErrors = err.responseJSON.errors;
                console.log('err', err);
                console.log('errJSON', err.responseJSON);
                console.log('objError', obgErrors);
                if ("message" in obgErrors) {
                  errors = obgErrors['message'];
                  for (let i=0; i < errors.length; i+=1) {
                    $(formFeedbackInfo).append(
                        `<p>Исправьте в поле "Сообщение" следующие ошибки:</p>
                        <ul>
                            <li>${errors[i]}</li>
                        </ul>`
                    )
                  }
                }
                if ("subject" in obgErrors) {
                  errors = obgErrors['subject'];
                  for (let i=0; i < errors.length; i+=1) {
                    $(formFeedbackInfo).append(
                        `<p>Исправьте в поле "Тема сообщения" следующие ошибки:</p>
                        <ul>
                            <li>${errors[i]}</li>
                        </ul>`
                    )
                  }
                }
                if ("email" in obgErrors) {
                  errors = obgErrors['email'];
                  for (let i=0; i < errors.length; i+=1) {
                    $(formFeedbackInfo).append(
                        `<p>Исправьте в поле "Почта" следующие ошибки:</p>
                        <ul>
                            <li>${errors[i]}</li>
                        </ul>`
                    )
                  }
                }
                if ("fullname" in obgErrors) {
                  errors = obgErrors['fullname'];
                  for (let i=0; i < errors.length; i+=1) {
                    $(formFeedbackInfo).append(
                        `<p>Исправьте в поле "Имя" следующие ошибки:</p>
                        <ul>
                            <li>${errors[i]}</li>
                        </ul>`
                    )
                  }
                }
                $(formFeedbackSubmit).removeClass('_disabled');
                $(formFeedbackInfo).removeClass('_success _loading').addClass('active _error');

                setTimeout(() => {
                  $(formFeedbackInfo).removeClass('_error _loading _success active').html('');
                  $(formFeedbackSubmit).removeClass('_disabled');
                }, 7500);
              },
            }).done((data) => {
              if (data.success) {
                $(formFeedbackInfo).removeClass('_error _loading').addClass('active _success')
                    .text('Успешно отправлено');
                setTimeout(() => {
                  $(formFeedbackInfo).removeClass('_error _loading _success active').text('');
                  $(formFeedbackSubmit).removeClass('_disabled');
                }, 2500);
              }
            });
          }
        })
      }
    }
  },
};
