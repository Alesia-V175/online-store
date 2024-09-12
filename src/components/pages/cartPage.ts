import Cart from 'components/main/cart/cart';
import { ClassListName, ClassMap, itemsCart, promoCodes } from 'constants/htmlConstants';
import '../main/cart/Cart.scss';
import LocalStorage from 'helpers/localStorage/LocalStorage';
import { ICartProduct } from 'types/interfaces';
import Product from 'components/main/product/Product';
import localStorage from 'helpers/localStorage/LocalStorage';
import Payment from 'components/main/payment/Payment';
import { CartText, CartParam, Symbol } from 'types/enums';
import UrlHashCart from 'helpers/router/UrlHashCart';

class CartPage {
  container: HTMLElement;

  hash: string;

  constructor(container: HTMLElement, hash: string) {
    this.container = container;
    this.hash = hash;
    this.renderPage();
    Cart.fillHeaderCounter();
  }

  public renderPage(): void {
    if (localStorage.getCart().length === 0) {
      this.checkCart(this.container);
      return;
    }

    const containerWrap = document.createElement('div');
    containerWrap.classList.add(ClassListName.cartContainerWrap);
    this.container.append(containerWrap);

    const cartTitle = document.createElement('h2');
    cartTitle.textContent = CartText.ShoppingCart;
    cartTitle.classList.add(ClassListName.cartTitle);
    containerWrap.append(cartTitle);

    const cartSectionsWrap = document.createElement('div');
    cartSectionsWrap.classList.add(ClassListName.cartSectionsWrap);
    containerWrap.append(cartSectionsWrap);

    const cartProductWrap = document.createElement('section');
    cartProductWrap.classList.add(ClassListName.cartProductWrap);
    cartSectionsWrap.append(cartProductWrap);

    const cartPaginationWrap = document.createElement('div');
    cartPaginationWrap.classList.add(ClassListName.cartPaginationWrap);
    cartProductWrap.append(cartPaginationWrap);

    const paginationLimitPage = document.createElement('div');
    paginationLimitPage.classList.add(ClassListName.cartPaginationLimitPage);
    cartPaginationWrap.append(paginationLimitPage);

    const paginationLabel = document.createElement('label');
    paginationLabel.textContent = CartText.ShowPage;
    paginationLabel.classList.add(ClassListName.cartPaginationLabel);
    paginationLimitPage.append(paginationLabel);

    const cartContainer = document.createElement('div');
    cartContainer.classList.add(ClassListName.cartContainer);

    const paginationInput = document.createElement('input');
    paginationInput.type = 'number';
    paginationInput.min = CartText.InputMinValue;
    paginationInput.max = CartText.InputMaxValue;
    paginationInput.value = this.initialValuePagination();
    paginationInput.classList.add(ClassListName.cartPaginationInput);
    paginationLimitPage.append(paginationInput);

    paginationInput.addEventListener('change', () => {
      this.renderProducts(cartContainer);
      UrlHashCart.setUrlHashCartParam(CartParam.Page, this.initialPageNumValue());
      UrlHashCart.setUrlHashCartParam(CartParam.Limit, paginationInput.value);
    });

    const paginationPageNumberWrap = document.createElement('div');
    paginationPageNumberWrap.classList.add(ClassListName.paginationPageNumberWrap);
    cartPaginationWrap.append(paginationPageNumberWrap);

    const pageButtonLeft = document.createElement('button');
    pageButtonLeft.classList.add(ClassListName.paginationButton);
    pageButtonLeft.textContent = CartText.PageButtonLeft;
    paginationPageNumberWrap.append(pageButtonLeft);

    const pageNumValue = document.createElement('div');
    pageNumValue.classList.add(ClassListName.paginationPageNum);
    pageNumValue.textContent = this.initialPageNumValue();
    paginationPageNumberWrap.append(pageNumValue);

    const pageButtonRight = document.createElement('button');
    pageButtonRight.classList.add(ClassListName.paginationButton);
    pageButtonRight.textContent = CartText.PageButtonRight;
    paginationPageNumberWrap.append(pageButtonRight);

    pageButtonLeft.addEventListener('click', () => {
      if (Number(pageNumValue.textContent) > 1) {
        pageNumValue.textContent = `${Number(pageNumValue.textContent) - 1}`;
        this.renderProducts(cartContainer);
        UrlHashCart.setUrlHashCartParam(CartParam.Page, pageNumValue.textContent);
        UrlHashCart.setUrlHashCartParam(CartParam.Limit, paginationInput.value);
      }
    });

    pageButtonRight.addEventListener('click', () => {
      let pageNumInputValue = Number(paginationInput.value);

      if (!pageNumInputValue) {
        pageNumInputValue = Number(CartText.InputOptionalValue);
      }

      const pageCount = Math.ceil(LocalStorage.getCart().length / pageNumInputValue);

      if (Number(pageNumValue.textContent) < pageCount) {
        pageNumValue.textContent = `${Number(pageNumValue.textContent) + 1}`;
        this.renderProducts(cartContainer);
        UrlHashCart.setUrlHashCartParam(CartParam.Page, pageNumValue.textContent);
        UrlHashCart.setUrlHashCartParam(CartParam.Limit, paginationInput.value);
      }
    });

    const cartHeaderList = document.createElement('ul');
    cartHeaderList.classList.add(ClassListName.cartHeaderList);
    cartProductWrap.append(cartHeaderList);

    itemsCart.forEach((item) => {
      this.createHeaderItem(item, cartHeaderList);
    });

    cartProductWrap.append(cartContainer);

    const priceContainerWrap = document.createElement('section');
    priceContainerWrap.classList.add(ClassListName.priceContainerWrap);
    cartSectionsWrap.append(priceContainerWrap);

    this.renderProducts(cartContainer);
    this.renderTotalContainer(priceContainerWrap);
  }

  private initialValuePagination(): string {
    let inputValue: string = CartText.InputOptionalValue;

    if (UrlHashCart.hashCartData.limit !== '') {
      inputValue = UrlHashCart.hashCartData.limit;
    }

    if (this.hash.includes(CartParam.Limit)) {
      UrlHashCart.getHashCartData(this.hash);
      inputValue = UrlHashCart.hashCartData.limit;
    }

    return inputValue;
  }

  private initialPageNumValue(): string {
    let pageNumValue: string = CartText.PageStartValue;

    if (UrlHashCart.hashCartData.page !== '') {
      pageNumValue = UrlHashCart.hashCartData.page;
    }

    if (this.hash.includes(CartParam.Page)) {
      UrlHashCart.getHashCartData(this.hash);
      pageNumValue = UrlHashCart.hashCartData.page;
    }

    return pageNumValue;
  }

  private renderTotalContainer(parentElem: HTMLElement) {
    const priceTitle = document.createElement('h3');
    priceTitle.classList.add(ClassListName.cartTotalPriceTitle);
    priceTitle.textContent = CartText.Summary;
    parentElem.append(priceTitle);

    const totalQty = document.createElement('div');
    totalQty.classList.add(ClassListName.cartTotalQty);
    parentElem.append(totalQty);

    const totalPriceContainer = document.createElement('div');
    totalPriceContainer.classList.add(ClassListName.cartTotalPriceContainer);
    parentElem.append(totalPriceContainer);

    const totalPrice = document.createElement('div');
    totalPrice.classList.add(ClassListName.cartTotalPrice);
    totalPriceContainer.append(totalPrice);

    const newPrice = document.createElement('div');
    newPrice.classList.add(ClassListName.cartDiscountPrice);
    totalPriceContainer.append(newPrice);

    const appliedCodesWrap = document.createElement('div');
    appliedCodesWrap.classList.add(ClassListName.cartAppliedCodesWrap);
    parentElem.append(appliedCodesWrap);

    const titlePromo = document.createElement('h4');
    titlePromo.textContent = CartText.TitlePromo;
    titlePromo.classList.add(ClassListName.cartTotalPromoSubtitle);
    appliedCodesWrap.append(titlePromo);

    const appliedPromoList = document.createElement('ul');
    appliedPromoList.classList.add(ClassListName.cartTotalPromoList);
    appliedCodesWrap.append(appliedPromoList);

    const inputPromoWrap = document.createElement('div');
    inputPromoWrap.classList.add(ClassListName.cartInputPromoWrap);
    appliedCodesWrap.append(inputPromoWrap);

    const inputPromo = document.createElement('input');
    inputPromo.type = 'search';
    inputPromo.placeholder = CartText.PromoInputPlaceholder;
    inputPromo.classList.add(ClassListName.cartTotalPromoInput);
    inputPromoWrap.append(inputPromo);

    const discountList = document.createElement('ul');
    discountList.classList.add(ClassListName.cartTotalPromoList);
    inputPromoWrap.after(discountList);

    inputPromo.addEventListener('input', () => {
      const value = inputPromo.value.toUpperCase();
      if (this.isPromoExist(value) && !this.isPromoAdded(value)) {
        const discountItem = document.createElement('li');
        discountItem.textContent = `Promo ${value} - 10%`;
        discountItem.classList.add(ClassListName.cartTotalPromoItem);
        discountList.append(discountItem);

        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = CartText.ButtonAdd;
        buttonAdd.classList.add(ClassListName.cartTotalPromoButton);
        discountItem.append(buttonAdd);

        buttonAdd.addEventListener('click', () => {
          LocalStorage.addPromo(value);
          discountItem.remove();
          buttonAdd.remove();
          CartPage.createPromoItem(value, appliedPromoList);
          Cart.fillHeaderCounter();
        });
      } else {
        discountList.innerHTML = '';
      }
    });

    const textPromo = document.createElement('p');
    textPromo.textContent = `Promo: ${promoCodes.join(', ')}`;
    textPromo.classList.add(ClassListName.cartTotalPromoText);
    parentElem.append(textPromo);

    const buyButton = document.createElement('button');
    buyButton.classList.add(ClassListName.cartTotalPromoButton);
    buyButton.textContent = CartText.ButtonBuy;
    parentElem.append(buyButton);

    buyButton.addEventListener('click', () => {
      Payment.render();
    });
  }

  public static createPromoItem(value: string, parentElem: Element): void {
    const promoItem = document.createElement('li');
    promoItem.textContent = `Promo ${value} - 10%`;
    promoItem.classList.add(ClassListName.cartTotalPromoItem);
    parentElem.append(promoItem);

    const dropButton = document.createElement('button');
    dropButton.classList.add(ClassListName.cartTotalPromoButton);
    dropButton.textContent = CartText.ButtonDrop;
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
    itemTitle.classList.add(ClassListName.cartHeaderItem);
    parentElem.append(itemTitle);
  }

  private renderProducts(parentElem: HTMLElement): void {
    parentElem.innerHTML = '';
    const pageLimitInput = document.querySelector(ClassMap.cartPaginationInput) as HTMLInputElement;
    const pageNumItem = document.querySelector(ClassMap.paginationPageNum) as HTMLElement;
    let allProducts = LocalStorage.getCart();

    if (pageLimitInput) {
      let pageNumInputValue = Math.abs(Number(pageLimitInput.value));

      if (!pageNumInputValue) {
        pageNumInputValue = Number(CartText.InputOptionalValue);
      }

      let pageNumItemValue = Number(pageNumItem.textContent);
      const pageCount = Math.ceil(allProducts.length / pageNumInputValue);

      if (pageNumItemValue > pageCount) {
        pageNumItemValue = pageCount;
        pageNumItem.textContent = `${pageNumItemValue}`;
      }

      const currCount = pageNumInputValue * pageNumItemValue;

      if (pageCount == pageNumInputValue) {
        allProducts = allProducts.slice(currCount - pageNumInputValue, allProducts.length);
      } else {
        allProducts = allProducts.slice(currCount - pageNumInputValue, currCount);
      }

      allProducts.forEach((item, index) => {
        this.renderProduct(item, parentElem, index + (currCount - pageNumInputValue) + 1);
      });
    }
  }

  private renderProduct(item: ICartProduct, parentElem: HTMLElement, index: number): void {
    const productCart = document.createElement('div');
    productCart.classList.add(ClassListName.productCard);
    parentElem.append(productCart);

    const productIndex = document.createElement('div');
    productIndex.textContent = `${index}`;
    productIndex.classList.add(ClassListName.productIndex);
    productCart.append(productIndex);

    const productItemWrap = document.createElement('div');
    productItemWrap.classList.add(ClassListName.productItemWrap);
    productCart.append(productItemWrap);

    const productStock = document.createElement('div');
    productStock.textContent = `stock: ${item.stock}`;
    productStock.classList.add(ClassListName.productStock);
    productItemWrap.append(productStock);

    const productImgWrap = document.createElement('div');
    productItemWrap.append(productImgWrap);

    const productImgLink = document.createElement('a');
    productImgLink.href = `#product-details/${item.id}`;
    productImgWrap.append(productImgLink);

    const productImg = document.createElement('div');
    productImg.classList.add(ClassListName.productImg);
    productImg.style.backgroundImage = `url(${item.thumbnail})`;
    productImg.style.backgroundPosition = 'center';
    productImg.style.backgroundSize = 'cover';
    productImgLink.append(productImg);

    const productCategory = document.createElement('div');
    productCategory.classList.add(ClassListName.productDesc);
    productCategory.textContent = `category: ${item.category}`;
    productItemWrap.append(productCategory);

    const productDescWrap = document.createElement('div');
    productDescWrap.classList.add(ClassListName.productDescWrap);
    productCart.append(productDescWrap);

    const productTitle = document.createElement('h3');
    productTitle.classList.add(ClassListName.productCardTitle);
    productTitle.textContent = item.title;
    productDescWrap.append(productTitle);

    const productRating: HTMLDivElement = document.createElement('div');
    productRating.classList.add(ClassListName.productCardRating);
    productRating.innerHTML = Product.fillRating(item.rating);
    productDescWrap.append(productRating);

    const productRatingText: HTMLSpanElement = document.createElement('span');
    productRatingText.classList.add(ClassListName.productCardRatingText);
    productRatingText.textContent = `${item.rating}`;
    productRating.append(productRatingText);

    const productDesc = document.createElement('p');
    productDesc.classList.add(ClassListName.productDesc);
    productDesc.textContent = item.titleDetail;
    productDescWrap.append(productDesc);

    const productPrice = document.createElement('div');
    productPrice.classList.add(ClassListName.productPriceDiscount);
    productPrice.textContent = `${Symbol.Currence} ${item.price}`;
    productDescWrap.append(productPrice);

    const productQty = document.createElement('div');
    productQty.classList.add(ClassListName.productCardQty);
    productCart.append(productQty);

    const inputButtonMinus = document.createElement('input');
    inputButtonMinus.type = 'button';
    inputButtonMinus.value = CartText.ProductButtonMinus;
    inputButtonMinus.classList.add(ClassListName.productQtyButton, ClassListName.productQtyButtonMinus);
    productQty.append(inputButtonMinus);

    const quantityValue = document.createElement('div');
    quantityValue.textContent = `${item.count}`;
    quantityValue.classList.add(ClassListName.productQtyValue);
    productQty.append(quantityValue);

    const inputButtonPlus = document.createElement('input');
    inputButtonPlus.type = 'button';
    inputButtonPlus.value = CartText.ProductButtonPlus;
    inputButtonPlus.classList.add(ClassListName.productQtyButton, ClassListName.productQtyButtonPlus);
    productQty.append(inputButtonPlus);

    const totalPriceWrap = document.createElement('div');
    totalPriceWrap.textContent = `${Symbol.Currence} ${item.price}`;
    totalPriceWrap.classList.add(ClassListName.productPriceDiscount, ClassListName.productCartPrice);
    productCart.append(totalPriceWrap);

    inputButtonMinus.addEventListener('click', () => {
      const cartContainer = document.querySelector(ClassMap.cartContainer) as HTMLElement;
      item.count -= 1;

      if (item.count === 0) {
        LocalStorage.removeProductFromCart(item.id);
        productCart.remove();

        if (localStorage.getCart().length === 0) {
          this.checkCart(this.container);
        } else {
          if (cartContainer) {
            this.renderProducts(cartContainer);
          }
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
    emptyCartMessage.classList.add(ClassListName.emptyCart);
    emptyCartMessage.textContent = CartText.EmptyCart;
    parentElem.append(emptyCartMessage);
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default CartPage;
