import ProductsDB from 'database/ProductsDB';
import Catalog from 'components/main/catalog/Catalog';
import SortCatalog from 'components/main/sortCatalog/SortCatalog';
import Grid from 'components/main/grid/Grid';
import FilterCatalog from 'components/main/sortBar/FilterCatalog';
import Cart from 'components/main/cart/cart';

class MainPage {
  container: HTMLElement;

  constructor(
    container: HTMLElement,
    private productsDB = new ProductsDB(),
    private catalog = new Catalog(productsDB.getProducts()),
    private sortCatalog = new SortCatalog(catalog),
    private filterCatalog = new FilterCatalog(catalog, sortCatalog, productsDB),
    private grid = new Grid(),
  ) {
    this.container = container;
    this.renderPage();
    this.sortCatalog.render();
    this.grid.render();
    this.filterCatalog.render();
    this.filterCatalog.renderSearch();
    Cart.fillHeaderCounter();
  }

  public renderPage(): void {
    const mainContainer: HTMLElement = document.createElement('div');
    mainContainer.classList.add('main__wrap');
    this.container.append(mainContainer);

    const filtersBar: HTMLElement = document.createElement('section');
    filtersBar.classList.add('filter-bar');
    mainContainer.append(filtersBar);

    const catalogQuantity: HTMLDivElement = document.createElement('div');
    catalogQuantity.classList.add('filter-quantity');
    filtersBar.prepend(catalogQuantity);

    const searchField: HTMLDivElement = document.createElement('div');
    searchField.classList.add('search-field');
    searchField.id = 'search-field';
    filtersBar.append(searchField);

    const valueFilters: HTMLDivElement = document.createElement('div');
    valueFilters.classList.add('value-filters');
    valueFilters.id = 'value-filters';
    filtersBar.append(valueFilters);

    const rangeFilters: HTMLDivElement = document.createElement('div');
    rangeFilters.classList.add('range-filters');
    rangeFilters.id = 'range-filters';
    filtersBar.append(rangeFilters);

    const resetBtn: HTMLElement = document.createElement('div');
    resetBtn.classList.add('reset-btn');
    resetBtn.id = 'reset-button';
    filtersBar.append(resetBtn);

    const copyBtn: HTMLElement = document.createElement('div');
    copyBtn.classList.add('copy-btn');
    copyBtn.id = 'copy-button';
    filtersBar.append(copyBtn);

    const catalog: HTMLElement = document.createElement('section');
    catalog.classList.add('catalog-wrap');
    mainContainer.append(catalog);

    const catalogHeader: HTMLDivElement = document.createElement('div');
    catalogHeader.classList.add('catalog__header');
    catalog.append(catalogHeader);

    const catalogBody: HTMLDivElement = document.createElement('div');
    catalogBody.classList.add('catalog');
    catalogBody.id = 'catalog';
    catalog.append(catalogBody);
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default MainPage;
