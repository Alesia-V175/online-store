import ProductsDB from 'database/ProductsDB';
import ProductDetails from 'components/main/productDetails/ProductDetails';
import ErrorPage from './errorPage/errorPage';
import Cart from 'components/main/cart/cart';

class ProductDetailsPage {
  container: HTMLElement;

  hash: string;

  constructor(container: HTMLElement, hash: string, private products = new ProductsDB().getProducts()) {
    this.container = container;
    this.hash = hash;
    this.renderPage();
    Cart.fillHeaderCounter();
  }

  public renderPage(): void {
    const hashId = Number(this.hash.split('/').at(-1));
    const productItem = this.products.find((elem) => elem.id === hashId);

    const productDetailsContainer: HTMLElement = document.createElement('div');
    productDetailsContainer.classList.add('product-details');
    this.container.append(productDetailsContainer);

    if (productItem) {
      const productDetails = new ProductDetails(productItem);
      this.container.prepend(productDetails.renderHeader());
      productDetailsContainer.append(productDetails.renderDescription());
      productDetailsContainer.append(productDetails.renderGallery());
    } else {
      this.container.innerHTML = '';
      new ErrorPage();
    }
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default ProductDetailsPage;
