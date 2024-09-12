import LocalStorage from 'helpers/localStorage/LocalStorage';
import CartPage from 'components/pages/cartPage';
import { ClassListName, ClassMap } from 'constants/htmlConstants';
import { Symbol } from 'types/enums';

class Cart {
  public static fillHeaderCounter(): void {
    const headerQty = document.querySelector(ClassMap.headerCartCounter);
    const cartTotalQty = document.querySelector(ClassMap.cartTotalQty);

    const headerTotalPrice = document.querySelector(ClassMap.headerTotalPrice);
    const cartPriceWrap = document.querySelector(ClassMap.cartPriceWrap);
    const cartTotalPrice = document.querySelector(ClassMap.cartTotalPrice);
    const cartDiscountPrice = document.querySelector(ClassMap.cartDiscountPrice);

    const cart = LocalStorage.getCart();
    const totalQty = cart.reduce((acc, currentValue) => acc + currentValue.count, 0);
    const totalPrice = cart.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, 0);

    const discount = Math.round(totalPrice * ((100 - LocalStorage.getPromo().length * 10) / 100));

    if (headerTotalPrice && headerQty) {
      headerTotalPrice.textContent = `Cart total: ${Symbol.Currence} ${totalPrice}`;
      headerQty.textContent = `${totalQty}`;
    }

    if (cartTotalPrice && cartTotalQty) {
      cartTotalQty.textContent = `Total products: ${totalQty}`;
      cartTotalPrice.textContent = `Total: ${Symbol.Currence} ${totalPrice}`;
    }

    if (cartDiscountPrice && cartPriceWrap && cartTotalPrice) {
      this.createDiscountItems();

      if (LocalStorage.getPromo().length > 0) {
        cartDiscountPrice.textContent = `Total: ${Symbol.Currence} ${discount}`;
        cartDiscountPrice.classList.add(ClassListName.cartDiscountPriceActive);
        cartTotalPrice.classList.add(ClassListName.cartPrevPrice);
      } else {
        cartDiscountPrice.classList.remove(ClassListName.cartDiscountPriceActive);
        cartTotalPrice.classList.remove(ClassListName.cartPrevPrice);
      }
    }
  }

  private static createDiscountItems(): void {
    const promoStorage = LocalStorage.getPromo();
    const discountList = document.querySelector(ClassMap.cartDiscountList);

    if (discountList) {
      discountList.innerHTML = '';

      promoStorage.forEach((item) => {
        CartPage.createPromoItem(item, discountList);
      });
    }
  }
}

export default Cart;
