import './payment.scss';
import { Pages, Validation } from 'types/enums';
import { IdMap } from 'constants/htmlConstants';
import LocalStorage from 'helpers/localStorage/LocalStorage';

class PaymentValidation {
  public static validateForm(): void {
    const form = document.querySelector('.form');

    if (!form) {
      return;
    }

    const nameUser = document.querySelector(IdMap.popupName) as HTMLInputElement;
    const phone = document.querySelector(IdMap.popupPhone) as HTMLInputElement;
    const address = document.querySelector(IdMap.popupAddress) as HTMLInputElement;
    const email = document.querySelector(IdMap.popupEmail) as HTMLInputElement;
    const cardNum = document.querySelector(IdMap.popupCardNumber) as HTMLInputElement;
    const cardValid = document.querySelector(IdMap.popupCardValid) as HTMLInputElement;
    const cardCvv = document.querySelector(IdMap.popupCardCVV) as HTMLInputElement;

    const inputFormArr = [nameUser, phone, address, email, cardCvv, cardNum, cardValid];

    PaymentValidation.check(nameUser, Validation.NameInvalidMessage, (): boolean => {
      const nameValue = nameUser.value.trim();
      const splitedName = nameValue.split(' ');

      if (nameUser.validity.valueMissing || nameUser.validity.typeMismatch || nameUser.validity.tooShort) {
        return false;
      }

      if (splitedName.length < 2) {
        return false;
      }

      for (let i = 0; i < splitedName.length; i++) {
        if (splitedName[i].length < 3) {
          return false;
        }
      }

      return true;
    });

    PaymentValidation.check(phone, Validation.NumberInvalidMessage, (): boolean => {
      const regPhone = /^[+]([0-9]{9,})/gm;

      if (!phone.value.match(regPhone)) {
        return false;
      }

      return true;
    });

    PaymentValidation.check(address, Validation.AddressInvalidMessage, (): boolean => {
      const addressValue = address.value.trim();
      const splitedName = addressValue.split(' ');

      if (splitedName.length < 3) {
        return false;
      }

      for (let i = 0; i < splitedName.length; i++) {
        if (splitedName[i].length < 5) {
          return false;
        }
      }

      return true;
    });

    PaymentValidation.check(email, Validation.EmailInvalidMessage, (): boolean => {
      if (email.validity.valueMissing || email.validity.typeMismatch || email.validity.tooShort) {
        return false;
      }

      return true;
    });

    PaymentValidation.check(cardNum, Validation.CardNumberInvalidMessage, (): boolean => {
      cardNum.value = this.keepOnlyDigits(cardNum.value);
      if (isNaN(Number(cardNum.value))) {
        return false;
      }

      const cardValue = cardNum.value.trim();
      const paymentImg = document.querySelector('.payment-icon');

      if (paymentImg) {
        if (cardValue[0] === '4') {
          paymentImg.classList.remove('payment-icon_maestro');
          paymentImg.classList.add('payment-icon_visa');
        } else if (cardValue[0] === '3') {
          paymentImg.classList.remove('payment-icon_visa');
          paymentImg.classList.add('payment-icon_maestro');
        } else {
          paymentImg.classList.remove('payment-icon_visa');
          paymentImg.classList.remove('payment-icon_maestro');
        }
      }

      if (cardValue.length < 16) {
        return false;
      }

      return true;
    });

    PaymentValidation.check(cardValid, Validation.CardValidInvalidMessage, (): boolean => {
      if (cardValid.value.length == 2) {
        if (this.keepOnlyDigits(cardValid.value).length == 2) {
          cardValid.value = this.keepOnlyDigits(cardValid.value) + '/';
        }
        return false;
      }

      const value = this.keepOnlyDigits(cardValid.value);

      if (cardValid.value.length - value.length != 1) {
        return false;
      }

      const cardValue = cardValid.value.trim();
      const splitedValue = cardValue.split('/');
      const monthValue = splitedValue[0];
      const yearValue = splitedValue[1];

      if (Number(monthValue) > 12 || Number(monthValue) < 1 || Number(yearValue) < 23) {
        return false;
      }

      return true;
    });

    PaymentValidation.check(cardCvv, Validation.CardCvvInvalidMessage, (): boolean => {
      cardCvv.value = this.keepOnlyDigits(cardCvv.value);
      return cardCvv.value.length === 3;
    });

    form.addEventListener('submit', (event) => {
      const invalidInputs = inputFormArr.filter((item) => {
        if (!item.parentElement) {
          return false;
        }

        const error = item.parentElement.querySelector('.form__input_error');

        if (!error) {
          return false;
        }

        return error.classList.contains('form__input_error_active');
      });

      if (invalidInputs.length > 0) {
        invalidInputs.forEach((input: HTMLElement) =>
          PaymentValidation.showMessageError(input, Validation.ErrorMessage),
        );
      } else {
        const bodyContainer = document.querySelector('.body');
        let seconds = 5;

        const popup = document.querySelector('.popup');
        const popupOverlay = document.querySelector('.popup__overlay');

        if (popup) {
          popup.remove();
        }

        if (bodyContainer && popupOverlay && bodyContainer) {
          const closePopup = document.createElement('div');
          closePopup.classList.add('popup_close');
          closePopup.textContent = `Thank you for your order. Redirect to the store after ${seconds} sec.`;
          bodyContainer.append(closePopup);

          const showText = setInterval(() => {
            seconds -= 1;
            closePopup.textContent = `Thanks for your order. Redirect to the store after ${seconds} sec.`;
          }, 1000);

          setTimeout(() => {
            closePopup.remove();
            popupOverlay.remove();
            bodyContainer.classList.remove('body_active');
            clearInterval(showText);
            LocalStorage.removeProductsFromCart();
            window.location.hash = `#${Pages.Main}`;
          }, 5000);
        }
      }
      event.preventDefault();
    });
  }

  private static check(
    input: HTMLInputElement,
    errorMessage: string,
    isInputValid: (item: HTMLInputElement) => boolean,
  ): void {
    if (input) {
      input.addEventListener('input', () => {
        if (input.validity.valid && isInputValid(input)) {
          PaymentValidation.resetError(input);
        } else {
          PaymentValidation.showMessageError(input, errorMessage);
        }
      });
    }
  }

  private static keepOnlyDigits(number: string): string {
    const regExpMatchArray = number.match(/\d+/g);

    if (regExpMatchArray) {
      return regExpMatchArray.join('');
    }

    return '';
  }

  private static showMessageError(input: HTMLElement, errorMessage: string) {
    if (input && input.parentElement) {
      const error = input.parentElement.querySelector('.form__input_error');

      if (error) {
        error.textContent = errorMessage;
        error.classList.add('form__input_error_active');
      }
    }
  }

  private static resetError(input: HTMLElement) {
    if (input && input.parentElement) {
      const error = input.parentElement.querySelector('.form__input_error');

      if (error) {
        error.textContent = '';
        error.classList.remove('form__input_error_active');
      }
    }
  }
}

export default PaymentValidation;
