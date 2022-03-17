import $ from 'jquery';

export default class FormValidator {
  constructor(form, fields, rules, onSubmitForm) {
    this.form = form;
    this.fields = fields;
    this.rules = rules;
    this.errors = {};
    this.values = {};
    this.isValidForm = false;
    this.functionSubmit = onSubmitForm;
    this.debouns = null;

    this.init();
  }

  init() {
    this.handlerOnSubmitForm();
    this.handlerBlurField();
    this.handlerInputField();
  }

  get getValueForm() {
    return this.values;
  }

  submitData() {
    this.functionSubmit(this.getValueForm);
  }

  checkIsValitForm() {
    this.isValidForm = Object.values(this.errors).length <= 0;
  }

  handlerOnSubmitForm() {
    this.form.on('submit', (event) => {
      event.preventDefault();

      this.checkForm();

      // если форма валидна делаем что то в submitData
      if (this.isValidForm) {
        this.submitData();
      }
    });
  }

  handlerInputField() {
    this.form.on('input', (e) => this.checkFildAfterInput(e));
  }

  handlerBlurField() {
    this.fields.forEach((field) => {
      $(`#${field}`).on('blur', (e) => this.checkFiledAfterBlur(e));
    });
  }

  checkForm() {
    // обнуляем ошибки если они были до этого
    this.errors = {};

    // получаем значение по ключам
    this.fields.forEach((field) => {
      this.values[field] = $(`#${field}`).val();
    });

    Object.keys(this.values).forEach((item) => {
      const rulesArr = this.rules[item];

      this.checkEachValueByRule(rulesArr, item);
    });

    this.checkIsValitForm();
    this.dispalyAllErrors();
  }

  checkField(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.values[fieldName] = fieldValue;

    delete this.errors[fieldName];
    this.checkEachValueByRule(this.rules[fieldName], fieldName);

    this.dispalyAllErrors();
  }

  checkFiledAfterBlur(event) {
    this.checkField(event);
  }

  checkFildAfterInput(event) {
    clearTimeout(this.debouns);

    this.debouns = setTimeout(() => {
      this.checkField(event);
    }, 350);
  }

  // вспомогательный метод для проверки значения из инпута по масиву правил
  checkEachValueByRule(rulesArr = [], item) {
    /* eslint-disable no-plusplus */
    for (let i = 0; i < rulesArr.length; i++) {
      const rule = rulesArr[i];

      if (!rule.validatorValue(this.values[item])) {
        this.errors[item] = rule.errorInfo;
        // делаем выход если есть 1 ошибка
        break;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  errorInfoNode(text, elem = 'div', classNode = 'err') {
    return `<${elem} class="${classNode}"> ${text} </${elem}>`;
  }

  dispalyAllErrors() {
    $('.err').remove();

    Object.entries(this.errors).forEach(([select, text]) => {
      $(`#${select}`).after(this.errorInfoNode(text));
    });
  }
}
