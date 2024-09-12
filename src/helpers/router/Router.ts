import { Container } from 'constants/htmlConstants';
import MainPage from 'components/pages/mainPage';
import ProductDetailsPage from 'components/pages/productDetailsPage';
import CartPage from 'components/pages/cartPage';
import ErrorPage from 'components/pages/errorPage/errorPage';
import { Pages, Symbol } from 'types/enums';
import UrlHash from './UrlHash';

class Router {
  private location: Location;

  private currentPage: MainPage | ProductDetailsPage | CartPage | null = null;

  constructor() {
    this.location = window.location;
    this.setPage(this.location.hash.slice(1));
    this.hashChange();
  }

  private hashChange() {
    window.addEventListener('hashchange', () => {
      if (this.currentPage) {
        this.currentPage.removePage();
      }

      this.setPage(this.location.hash.slice(1));
    });
  }

  private setPage(hash: string) {
    if (window.location.hash.length === 0) {
      window.location.hash = `#${Pages.Main}`;
    } else if (hash === Pages.Main) {
      UrlHash.clearHash();
      this.currentPage = new MainPage(Container);
    } else if (hash.includes(Pages.Cart)) {
      this.currentPage = new CartPage(Container, hash);
    } else if (hash.includes(Pages.ProductDetails)) {
      this.currentPage = new ProductDetailsPage(Container, hash);
    } else if (hash.includes(Symbol.Query)) {
      this.currentPage = new MainPage(Container);
    } else {
      new ErrorPage();
    }
  }
}

export default Router;
