import Cart from 'components/main/cart/cart';
import { itemsCart, promoCodes } from 'constants/htmlConstants';
import '../main/cart/Cart.scss';
import LocalStorage from 'helpers/localStorage/LocalStorage';
import { ICartProduct } from 'types/interfaces';
import Product from 'components/main/product/Product';
import localStorage from 'helpers/localStorage/LocalStorage';

class CartPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderPage();
    Cart.fillHeaderCounter();
  }

  public renderPage(): void {
    if (localStorage.getCart().length === 0) {
      this.checkCart(this.container);
      return;
    }

    const containerWrap = document.createElement('div');
    containerWrap.classList.add('container-wrap');
    this.container.append(containerWrap);

    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Shopping Cart';
    cartTitle.classList.add('cart-title');
    containerWrap.append(cartTitle);

    const cartSectionsWrap = document.createElement('div');
    cartSectionsWrap.classList.add('cart-sections-wrap');
    containerWrap.append(cartSectionsWrap);

    const cartProductWrap = document.createElement('section');
    cartProductWrap.classList.add('cart-product-wrap');
    cartSectionsWrap.append(cartProductWrap);

    const cartHeaderList = document.createElement('ul');
    cartHeaderList.classList.add('cart-list');
    cartProductWrap.append(cartHeaderList);

    itemsCart.forEach((item) => {
      this.createHeaderItem(item, cartHeaderList);
    });

    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    cartProductWrap.append(cartContainer);

    const priceContainerWrap = document.createElement('section');
    priceContainerWrap.classList.add('price-container-wrap');
    cartSectionsWrap.append(priceContainerWrap);

    this.renderProducts(cartContainer);
    this.renderTotalContainer(priceContainerWrap);
  }

  private renderTotalContainer(parentElem: HTMLElement) {
    const priceTitle = document.createElement('h3');
    priceTitle.classList.add('price-title');
    priceTitle.textContent = 'Summary';
    parentElem.append(priceTitle);

    const totalQty = document.createElement('div');
    totalQty.classList.add('total-quantity');
    parentElem.append(totalQty);

    const totalPriceContainer = document.createElement('div');
    totalPriceContainer.classList.add('total-price-container');
    parentElem.append(totalPriceContainer);

    const totalPrice = document.createElement('div');
    totalPrice.classList.add('total-price');
    totalPriceContainer.append(totalPrice);

    const newPrice = document.createElement('div');
    newPrice.classList.add('new-price');
    totalPriceContainer.append(newPrice);

    const appliedCodesWrap = document.createElement('div');
    appliedCodesWrap.classList.add('promo-codes-wrap');
    parentElem.append(appliedCodesWrap);

    const titlePromo = document.createElement('h4');
    titlePromo.textContent = 'Apply Discount Code';
    titlePromo.classList.add('price-subtitle');
    appliedCodesWrap.append(titlePromo);

    const appliedPromoList = document.createElement('ul');
    appliedPromoList.classList.add('promo-list');
    appliedCodesWrap.append(appliedPromoList);

    const inputPromo = document.createElement('input');
    inputPromo.type = 'search';
    inputPromo.placeholder = 'Enter your promo code';
    inputPromo.classList.add('promo-search');
    appliedCodesWrap.append(inputPromo);

    inputPromo.addEventListener('keyup', () => {
      if (this.isPromoExist(inputPromo.value) && !this.isPromoAdded(inputPromo.value)) {
        const discountList = document.createElement('ul');
        discountList.classList.add('promo-list');
        inputPromo.after(discountList);

        const discountItem = document.createElement('li');
        discountItem.textContent = `Promo ${inputPromo.value.toUpperCase()} - 10%`;
        discountItem.classList.add('promo-item');
        discountList.append(discountItem);

        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = 'ADD';
        buttonAdd.classList.add('promo-button');
        discountItem.append(buttonAdd);

        buttonAdd.addEventListener('click', () => {
          LocalStorage.addPromo(inputPromo.value.toUpperCase());
          discountList.remove();
          buttonAdd.remove();
          CartPage.createPromoItem(inputPromo.value.toUpperCase(), appliedPromoList);
          Cart.fillHeaderCounter();
        });
      }
    });

    const textPromo = document.createElement('p');
    textPromo.textContent = `Promo: ${promoCodes.join(', ')}`;
    textPromo.classList.add('promo-text');
    parentElem.append(textPromo);
  }

  public static createPromoItem(value: string, parentElem: Element): void {
    const promoItem = document.createElement('li');
    promoItem.textContent = `Promo ${value} - 10%`;
    promoItem.classList.add('promo-item');
    parentElem.append(promoItem);

    const dropButton = document.createElement('button');
    dropButton.classList.add('promo-button');
    dropButton.textContent = 'DROP';
    promoItem.append(dropButton);

    dropButton.addEventListener('click', () => {
      LocalStorage.removePromo(value);
      promoItem.remove();
      Cart.fillHeaderCounter();
    });
  }

  private isPromoExist(value: string): boolean {
    value = value.toUpperCase();
    return promoCodes.indexOf(value) !== -1;
  }

  private isPromoAdded(value: string): boolean {
    value = value.toUpperCase();
    return LocalStorage.isPromoExist(value);
  }

  private createHeaderItem(itemName: string, parentElem: HTMLElement): void {
    const itemTitle: HTMLDivElement = document.createElement('div');
    itemTitle.textContent = itemName;
    itemTitle.classList.add('cart-item');
    parentElem.append(itemTitle);
  }

  private renderProducts(parentElem: HTMLElement): void {
    const allProducts = LocalStorage.getCart();

    allProducts.forEach((item) => {
      this.renderProduct(item, parentElem);
    });
  }

  private renderProduct(item: ICartProduct, parentElem: HTMLElement): void {
    const productCart = document.createElement('div');
    productCart.classList.add('product-card');
    parentElem.append(productCart);

    const productItemWrap = document.createElement('div');
    productItemWrap.classList.add('product-card_wrap');
    productCart.append(productItemWrap);

    const productStock = document.createElement('div');
    productStock.textContent = `stock: ${item.stock}`;
    productStock.classList.add('product__stock');
    productItemWrap.append(productStock);

    const productImg = document.createElement('div');
    productImg.classList.add('product__img');
    productImg.style.backgroundImage = `url(${item.thumbnail})`;
    productImg.style.backgroundPosition = 'center';
    productImg.style.backgroundSize = 'cover';
    productItemWrap.append(productImg);

    const productCategory = document.createElement('div');
    productCategory.classList.add('product__description');
    productCategory.textContent = `category: ${item.category}`;
    productItemWrap.append(productCategory);

    const productDescWrap = document.createElement('div');
    productDescWrap.classList.add('product-card_wrap');
    productCart.append(productDescWrap);

    const productTitle = document.createElement('h3');
    productTitle.classList.add('product-card__title');
    productTitle.textContent = item.title;
    productDescWrap.append(productTitle);

    const productRating: HTMLDivElement = document.createElement('div');
    productRating.classList.add('product-details__rating');
    productRating.innerHTML = Product.fillRating(item.rating);
    productDescWrap.append(productRating);

    const productRatingText: HTMLSpanElement = document.createElement('span');
    productRatingText.classList.add('product__rating-text');
    productRatingText.textContent = `${item.rating}`;
    productRating.append(productRatingText);

    const productDesc = document.createElement('p');
    productDesc.classList.add('product__description');
    productDesc.textContent = item.titleDetail;
    productDescWrap.append(productDesc);

    const productPrice = document.createElement('div');
    productPrice.classList.add('product__price_discount');
    productPrice.textContent = `$ ${item.price}`;
    productDescWrap.append(productPrice);

    const productQty = document.createElement('div');
    productQty.classList.add('quantity');
    productCart.append(productQty);

    const inputButtonMinus = document.createElement('input');
    inputButtonMinus.type = 'button';
    inputButtonMinus.value = '-';
    inputButtonMinus.classList.add('quantity-button', 'minus');
    productQty.append(inputButtonMinus);

    const quantityValue = document.createElement('div');
    quantityValue.textContent = `${item.count}`;
    quantityValue.classList.add('quantity-number');
    productQty.append(quantityValue);

    const inputButtonPlus = document.createElement('input');
    inputButtonPlus.type = 'button';
    inputButtonPlus.value = '+';
    inputButtonPlus.classList.add('quantity-button', 'plus');
    productQty.append(inputButtonPlus);

    const totalPriceWrap = document.createElement('div');
    totalPriceWrap.textContent = `$ ${item.price}`;
    totalPriceWrap.classList.add('product__price_discount', 'product-card__price');
    productCart.append(totalPriceWrap);

    inputButtonMinus.addEventListener('click', () => {
      item.count -= 1;

      if (item.count === 0) {
        LocalStorage.removeProductFromCart(item.id);
        productCart.remove();

        if (localStorage.getCart().length === 0) {
          this.checkCart(this.container);
        }
      } else {
        LocalStorage.updateProductToCart(item.id, item.count);
        quantityValue.textContent = `${item.count}`;
      }

      Cart.fillHeaderCounter();
    });

    inputButtonPlus.addEventListener('click', () => {
      if (item.count < item.stock) {
        item.count += 1;
        LocalStorage.updateProductToCart(item.id, item.count);
        quantityValue.textContent = `${item.count}`;
      }

      Cart.fillHeaderCounter();
    });
  }

  private checkCart(parentElem: HTMLElement): void {
    parentElem.innerHTML = '';
    const emptyCartMessage = document.createElement('div');
    emptyCartMessage.classList.add('empty-cart');
    emptyCartMessage.textContent = 'Your cart is empty';
    parentElem.append(emptyCartMessage);
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default CartPage;
