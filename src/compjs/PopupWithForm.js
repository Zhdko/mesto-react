import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, inputSelector, handleFormSubmit}) {
    super({popupSelector})
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form')
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector))
    this._button = this._form.querySelector('.popup__submit-btn');
    this._buttonText = this._button.textContent
  }

  close() {
    super.close();
    this._form.reset()
  }

  disableSubmitBtn(text) {
    this._button.disabled = true;
    this._button.textContent = text

  }

  unDisableSubmitBtn() {
    this._button.disabled = false;
    this._button.textContent = this._buttonText
  }


  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._handleSubmit)
  }
}