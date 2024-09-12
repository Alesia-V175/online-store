import './payment.scss';
import PaymentValidation from 'components/main/payment/PaymentValidation';

class Payment {
  public static render(): void {
    const bodyContainer = document.querySelector('.body');

    if (bodyContainer) {
      const paymentPopup = `
        <div class="popup">
          <form class="form">
            <section>
              <h3 class="popup__title">Personal details</h3>
              <div class="form__item">
                <label for="name" class="form__label">Name</label>
                <input id="name" type="text" placeholder="Ivan Ivanov" 
                  minlength = "3" maxlength="100" size="2" class="form__input" required>
                <span class="form__input_error" aria-live="polite"></span>
              </div>
              <div class="form__item">
                <label for="phone" class="form__label">Phone Number</label>
                <input id="phone" type="tel" placeholder="+375290000103" 
                minlength = "10" maxlength="20" class="form__input" required>
                <span class="form__input_error" aria-live="polite"></span>
              </div>
              <div class="form__item">
                <label for="address" class="form__label">Delivery address</label>
                <input id="address" type="text" placeholder="Country City Street" 
                minlength = "5" maxlength="50" size="3" class="form__input" required>
                <span class="form__input_error" aria-live="polite"></span>
              </div>
              <div class="form__item">
                <label for="email" class="form__label">E-mail</label>
                <input id="email" type="email" placeholder="ivanIvanov@gmail.com" 
                minlength = "5" maxlength="50" class="form__input" required>
                <span class="form__input_error" aria-live="polite"></span>
              </div>
            </section>
            <section>
              <h3 class="popup__title">Credit card details</h3>
              <div class="form__card">
                <div class="form__item">
                  <label for="card-number" class="form__label">Card Number</label>
                  <span class="payment-icon"></span>
                  <input id="card-number" type="number" placeholder="1234 5678 9012 3456" class="form__input" 
                  pattern="[0-9]{4}"
                  onkeypress="if(this.value.length === 16) return false;" required>
                  <span class="form__input_error" aria-live="polite"></span>
                </div>
                <div class="item__wrap">
                  <div class="form__item">
                    <label for="card-valid" class="form__label">VALID</label>
                    <input id="card-valid" type="text" placeholder="12/25" class="form__input" 
                    onkeypress="if(this.value.length === 5) return false;" required>
                    <span class="form__input_error" aria-live="polite"></span>
                  </div>
                  <div class="form__item"> 
                    <label for="card-cvv" class="form__label">CVV</label>
                    <input id="card-cvv" type="number" placeholder="123" class="form__input" 
                    onkeypress="if(this.value.length === 3) return false;" required>
                    <span class="form__input_error" aria-live="polite"></span>
                  </div>
                </div>
              </div>
            </section>
            <button type="submit" class="form__button">CONFIRM</button>
          </form>
        </div>
    `;

      bodyContainer.classList.add('body_active');

      const popupElement = Payment.convertFromStringToHTML(paymentPopup);

      const overlayPopup = document.createElement('div');
      overlayPopup.classList.add('popup__overlay');
      bodyContainer.append(overlayPopup);

      overlayPopup.addEventListener('click', () => {
        popupElement.remove();
        overlayPopup.remove();
        bodyContainer.classList.remove('body_active');
      });

      bodyContainer.append(popupElement);
    }
    PaymentValidation.validateForm();
  }

  private static convertFromStringToHTML(htmlString: string): HTMLElement {
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = htmlString.trim();
    return parentDiv.firstChild as HTMLElement;
  }
}

export default Payment;
