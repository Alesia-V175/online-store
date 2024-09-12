import { HashCartDataType } from 'types/types';
import { Pages, CartParam, Symbol } from 'types/enums';

class UrlHashCart {
  static hashCartData: HashCartDataType = {
    limit: '',
    page: '',
  };

  static setUrlHashCart(hashCartData: HashCartDataType) {
    const limit = `${CartParam.Limit}=${hashCartData.limit}`;
    const page = `${CartParam.Page}=${hashCartData.page}`;

    window.location.hash = `${Pages.Cart}?${limit}&${page}`;
  }

  static getHashCartData(hash: string): HashCartDataType {
    const hashCartData = this.hashCartData;
    const urlHashCartArray: string[] = hash.slice(Pages.Cart.length + 1).split(Symbol.Ampersand);

    for (let i = 0; i < urlHashCartArray.length; i++) {
      const [paramName, paramValue] = urlHashCartArray[i].split(Symbol.Equality);

      if (paramName === CartParam.Limit || paramName === CartParam.Page) {
        hashCartData[paramName] = paramValue;
      }
    }
    this.hashCartData = hashCartData;

    return this.hashCartData;
  }

  public static getUrlHashCartParam(param: CartParam.Limit | CartParam.Page): string {
    const currentHashCart = window.location.hash.slice(Pages.Cart.length + 2);
    this.getHashCartData(currentHashCart);
    return this.hashCartData[param];
  }

  public static setUrlHashCartParam(param: CartParam.Limit | CartParam.Page, value: string): void {
    this.hashCartData[param] = value;
    this.setUrlHashCart(this.hashCartData);
  }

  static clearCartHash() {
    window.location.hash = `#${Pages.Cart}`;
    this.hashCartData = {
      limit: '',
      page: '',
    };
  }
}

export default UrlHashCart;
