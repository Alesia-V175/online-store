import './product.scss';
import { Symbol } from 'types/enums';
import { ICartProduct, IProduct } from 'types/interfaces';
import LocalStorage from 'helpers/localStorage/LocalStorage';
import Cart from 'components/main/cart/cart';
import { fullStarIcon, halfStarIcon } from 'constants/htmlConstants';

class Product {
  constructor(protected product: IProduct) {}

  public static fillRating(rating: number): string {
    const totalStarsCount = 5;
    const fullStarsCount: number = Math.trunc(rating);

    let result = '';

    for (let i = 0; i < fullStarsCount; i += 1) {
      result += fullStarIcon;
    }

    const halfStar: number = rating - fullStarsCount;

    if (halfStar > 0 && halfStar < 0.25) {
      result += fullStarIcon;
    } else if (halfStar >= 0.25 && halfStar < 0.75) {
      result += halfStarIcon;
    } else if (halfStar >= 0.75) {
      result += fullStarIcon;
    }

    const emptyStarsCount: number = totalStarsCount - Math.ceil(rating);

    for (let i = 0; i < emptyStarsCount; i += 1) {
      result += fullStarIcon;
    }

    return result;
  }

  protected initialPrice(): number {
    const discount: number = 1 + this.product.discountPercentage / 100;
    const initialPrice: number = Math.round(this.product.price * discount);

    return initialPrice;
  }

  public static addProductToCart(buttonAdd: HTMLElement, product: IProduct, currentClass: string) {
    if (buttonAdd.classList.contains(currentClass)) {
      LocalStorage.removeProductFromCart(product.id);
    } else {
      LocalStorage.addProductToCart(product as ICartProduct);
    }

    buttonAdd.classList.toggle(currentClass);

    Cart.fillHeaderCounter();
  }

  private convertFromStringToHTML(htmlString: string): HTMLElement {
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = htmlString.trim();
    return parentDiv.firstChild as HTMLElement;
  }

  public render(): HTMLElement {
    const ratingStars: string = Product.fillRating(this.product.rating);
    const initialPrice: number = this.initialPrice();

    const productString = `
      <div class="product">
        <div class="product__wrap">
          <div class="product__stock">stock: ${this.product.stock}</div>
          <div class="product__descriptionk">category: ${this.product.category}</div>
          <div class="product__img-wrap">
            <a href="#product-details/${this.product.id}">
              <div class="product__img" style="background: 
              url('${this.product.thumbnail}') no-repeat center / contain;"></div>
            </a>
          </div>
        </div>
        <div class="product__wrap">
          <div class="product__title">${this.product.title}</div>
          <div class="product__rating-wrap">
            <div class="product__rating">${ratingStars}</div>
            <span class="product__rating-text">${this.product.rating}</span>
          </div>
          <div class="product__description">${this.product.titleDetail}</div>
          <div class="product__footer-wrap">
            <div class="product__price-wrap">
              <div class="product__price">${Symbol.Currence} ${initialPrice}</div>
              <div class="product__price_discount">${Symbol.Currence} ${this.product.price}</div>
            </div>
          </div>
        </div> 
      </div>
      `;
    const product: HTMLElement = this.convertFromStringToHTML(productString);

    const addButton: HTMLDivElement = document.createElement('div');
    addButton.classList.add('product__add-to-cart');

    if (LocalStorage.isProductExists(this.product.id)) {
      addButton.classList.add('product__remove-from-cart');
    } else {
      addButton.classList.remove('product__remove-from-cart');
    }

    addButton.addEventListener('click', () => {
      Product.addProductToCart(addButton, this.product, 'product__remove-from-cart');
    });

    const productFooter: HTMLElement | null = product.querySelector('.product__footer-wrap');

    if (productFooter) {
      productFooter.append(addButton);
    }

    return product;
  }
}

export default Product;
