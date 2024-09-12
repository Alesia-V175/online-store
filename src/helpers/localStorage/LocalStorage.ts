import { ICartProduct } from 'types/interfaces';

class LocalStorage {
  public static addProductToCart(product: ICartProduct): void {
    const cartStorage: ICartProduct[] = this.getCart();
    product.count = 1;
    cartStorage.push(product);
    localStorage.setItem('cart', JSON.stringify(cartStorage));
  }

  public static updateProductToCart(id: number, count: number): void {
    const cartProducts = this.getCart();
    cartProducts.forEach((item) => {
      if (item.id === id) {
        item.count = count;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }

  public static removeProductFromCart(id: number): void {
    const cartArr = this.getCart();
    const filteredCart = cartArr.filter((product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  }

  public static getCart(): ICartProduct[] {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      return JSON.parse(cartString);
    }
    return [];
  }

  public static isProductExists(id: number): boolean {
    const cartArr = this.getCart();
    return !!cartArr.find((product) => product.id === id);
  }

  public static removeProductsFromCart() {
    localStorage.setItem('cart', '[]');
  }

  public static getPromo(): string[] {
    const promoStorage = localStorage.getItem('promo');
    if (promoStorage) {
      return JSON.parse(promoStorage);
    }
    return [];
  }

  public static addPromo(promo: string): void {
    const promoStorage = this.getPromo();
    promoStorage.push(promo);
    localStorage.setItem('promo', JSON.stringify(promoStorage));
  }

  public static removePromo(promo: string): void {
    const promoStorage = this.getPromo();
    const filteredPromo = promoStorage.filter((item) => item !== promo);
    localStorage.setItem('promo', JSON.stringify(filteredPromo));
  }

  public static isPromoExist(promo: string): boolean {
    const promoStorage = this.getPromo();
    return promoStorage.indexOf(promo) !== -1;
  }
}

export default LocalStorage;
