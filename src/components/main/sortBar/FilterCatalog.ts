import { IdMap } from 'constants/htmlConstants';
import { FiltersName, Symbol } from 'types/enums';
import Filters from 'components/main/sortBar/filters/Filters';
import Catalog from 'components/main/catalog/Catalog';
import ProductsDB from 'database/ProductsDB';
import SortCatalog from 'components/main/sortCatalog/SortCatalog';
import ResetButton from './filters/resetButton/ResetButton';
import CopyLinkButton from './filters/copyLinkButton/CopyLinkButton';

class FilterCatalog {
  constructor(
    private catalog: Catalog,

    private sortCatalog: SortCatalog,

    private productsDB: ProductsDB,
  ) {}

  public renderSearch(): void {
    const searchContainer = document.querySelector(IdMap.search) as HTMLElement;
    searchContainer.innerHTML = '';

    const search = new Filters(FiltersName.Search, this.catalog, this.sortCatalog, this.productsDB);
    search.appendSearchField(searchContainer);
  }

  public render(): void {
    const resetButton = new ResetButton();
    resetButton.render();

    const copyLinkButton = new CopyLinkButton();
    copyLinkButton.render();

    const filtersContainer = document.querySelector(IdMap.valueFilters) as HTMLElement;
    const filtersRangeContainer = document.querySelector(IdMap.rangeFilters) as HTMLElement;

    const filterCategory = new Filters(FiltersName.Category, this.catalog, this.sortCatalog, this.productsDB);
    filterCategory.appendFilterList(filtersContainer);

    const filterBrand = new Filters(FiltersName.Brand, this.catalog, this.sortCatalog, this.productsDB);
    filterBrand.appendFilterList(filtersContainer);

    const filterPrice = new Filters(FiltersName.Price, this.catalog, this.sortCatalog, this.productsDB);
    filterPrice.appendFilterRange(filtersRangeContainer, Symbol.Currence);

    const filterStock = new Filters(FiltersName.Stock, this.catalog, this.sortCatalog, this.productsDB);
    filterStock.appendFilterRange(filtersRangeContainer, '');
  }

  public clear(): void {
    const resetButtonContainer = document.querySelector(IdMap.resetButton) as HTMLElement;
    const filtersContainer = document.querySelector(IdMap.valueFilters) as HTMLElement;
    const filtersRangeContainer = document.querySelector(IdMap.rangeFilters) as HTMLElement;

    resetButtonContainer.innerHTML = '';
    filtersContainer.innerHTML = '';
    filtersRangeContainer.innerHTML = '';
  }
}

export default FilterCatalog;
