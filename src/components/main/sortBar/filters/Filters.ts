import './filters.scss';
import {
  FiltersValueType,
  FiltersValueDataType,
  FiltersRangeType,
  FiltersRangeDataType,
  SearchType,
} from 'types/types';
import { IProduct, IQuantity, IValueRange } from 'types/interfaces';
import Catalog from 'components/main/catalog/Catalog';
import ProductsDB from 'database/ProductsDB';
import RangeSliderControl from 'components/main/sortBar/filters/rangeSliderControl/RangeSliderControl';
import { FiltersName, Symbol } from 'types/enums';
import SortCatalog from 'components/main/sortCatalog/SortCatalog';
import { ClassMap } from 'constants/htmlConstants';
import UrlHash from 'helpers/router/UrlHash';

import FilterCatalog from '../FilterCatalog';

class Filters {
  private currentCatalog: IProduct[];

  constructor(
    private readonly filterName: FiltersValueType | FiltersRangeType | SearchType,

    private readonly catalog: Catalog,

    private readonly sortCatalog: SortCatalog,

    private readonly productsDB: ProductsDB,
  ) {
    this.currentCatalog = [];
    this.filterName = filterName;
    this.initialFilter();
  }

  //* append HTML elements to the parentElement
  public appendFilterList(parentElement: HTMLElement): void {
    const filterTitle: HTMLParagraphElement = document.createElement('p');

    filterTitle.classList.add('value-filters__title');
    filterTitle.textContent = `${this.filterName[0].toUpperCase() + this.filterName.slice(1)}`;

    parentElement.append(filterTitle, this.valueFilterList());
  }

  private valueFilterList(): HTMLElement {
    const valueFilterList = document.createElement('div');
    valueFilterList.classList.add('value-filters__list');

    const setElements: Set<string> = new Set();

    this.productsDB.getProducts().forEach((el) => {
      if (this.filterName === FiltersName.Category) {
        setElements.add(el.category);
      }

      if (this.filterName === FiltersName.Brand) {
        setElements.add(el.brand);
      }
    });

    setElements.forEach((el) => {
      const elQuantity: IQuantity = {
        total: this.getProductsQuantity(el, this.productsDB.getProducts()),
        current: this.getProductsQuantity(el, this.currentCatalog),
      };

      const elementValue = this.valueFilterListElement(el, elQuantity);
      valueFilterList.append(elementValue);
    });
    return valueFilterList;
  }

  private valueFilterListElement(elementValue: string, elementQuantity: IQuantity): HTMLElement {
    const element = document.createElement('div');
    element.classList.add('value-filters__list-element');

    const elementLabel = document.createElement('label');
    elementLabel.classList.add('value-filters__element-label');
    element.append(elementLabel);

    const elementInput = document.createElement('input');
    elementInput.classList.add('value-filters__element-input');
    elementLabel.innerText = elementValue;
    elementInput.setAttribute('type', 'checkbox');
    elementLabel.prepend(elementInput);

    const elementCountAll = document.createElement('span');
    elementCountAll.classList.add('value-filters__count-all');
    elementCountAll.innerText = `${elementQuantity.current}/${elementQuantity.total}`;
    element.append(elementCountAll);

    this.checkActiveElement(elementValue, elementInput);

    elementInput.addEventListener('click', () => {
      UrlHash.controlFilter(this.filterName as FiltersValueType, elementValue);
      this.filterProducts();
      this.reRenderFilters();
      this.appendTotalFoundQuantity();
    });

    return element;
  }

  private initialFilter(): void {
    if (!window.location.hash.includes(Symbol.Query)) {
      UrlHash.clearHash();
    } else {
      UrlHash.getHashData(window.location.hash.slice(1));
    }
    this.filterProducts();
    this.appendTotalFoundQuantity();
  }

  //* render Catalog
  public filterProducts(): void {
    const { filtersValue, filtersRange, search } = UrlHash.hashData;

    let filteredCatalog: IProduct[] = this.filterValueProducts(this.productsDB.getProducts().slice(), filtersValue);
    filteredCatalog = this.filterRangeProducts(filteredCatalog, filtersRange);
    filteredCatalog = this.searchProducts(filteredCatalog, search);

    this.currentCatalog = filteredCatalog;
    this.catalog.products = filteredCatalog;
    this.sortCatalog.selectOrder();
    this.catalog.render();
  }

  //* Value filter
  private filterValueProducts(filteredProducts: IProduct[], filterValue: FiltersValueDataType): IProduct[] {
    let newProducts: IProduct[] = filteredProducts;
    let isEmptyFilters = true;

    for (const key in filterValue) {
      if (filterValue[key as FiltersValueType]?.length) {
        newProducts = this.filterByValue(filterValue[key as FiltersValueType], newProducts, key as FiltersValueType);
        isEmptyFilters = false;
      }
    }
    return isEmptyFilters ? this.productsDB.getProducts().slice() : newProducts;
  }

  private filterByValue(filterValues: string[], items: IProduct[], filterName: FiltersValueType): IProduct[] {
    return items.filter((item) => filterValues.find((filterValue) => item[filterName] === filterValue));
  }

  //* Range filters
  public appendFilterRange(parentElement: HTMLElement, char: string): void {
    const filterTitle: HTMLParagraphElement = document.createElement('p');
    filterTitle.classList.add('range-filters__title');
    filterTitle.textContent = `${this.filterName[0].toUpperCase() + this.filterName.slice(1)}`;

    parentElement.append(filterTitle, this.valueFilterRange(char));
  }

  private valueFilterRange(char: string): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add('range-filters__filter');

    const value: number[] = [];
    const valueCurrent: number[] = [];

    if (this.filterName === FiltersName.Price) {
      this.productsDB.getProducts().forEach((el) => value.push(el.price));
      this.currentCatalog.forEach((el) => valueCurrent.push(el.price));
    }

    if (this.filterName === FiltersName.Stock) {
      this.productsDB.getProducts().forEach((el) => value.push(el.stock));
      this.currentCatalog.forEach((el) => valueCurrent.push(el.stock));
    }

    const valueData: IValueRange = {
      min: Math.floor(Math.min(...value)),
      max: Math.ceil(Math.max(...value)),
      minCurrent: Math.floor(Math.min(...valueCurrent)),
      maxCurrent: Math.ceil(Math.max(...valueCurrent)),
    };

    const range = new RangeSliderControl(element, valueData, char, this);

    range.fromSlider.addEventListener('input', () => {
      range.controlFromSlider(range.fromSlider, range.toSlider, range.formValueLeft);
      this.filterProducts();
    });

    range.toSlider.addEventListener('input', () => {
      range.controlToSlider(range.fromSlider, range.toSlider, range.formValueRight);
      this.filterProducts();
    });

    range.fromSlider.addEventListener('change', () => {
      UrlHash.controlSlider(this.filterName as FiltersRangeType, [range.minCurrentValue, range.maxCurrentValue]);
      this.reRenderFilters();
    });

    range.toSlider.addEventListener('change', () => {
      UrlHash.controlSlider(this.filterName as FiltersRangeType, [range.minCurrentValue, range.maxCurrentValue]);
      this.reRenderFilters();
    });

    return element;
  }

  private filterRangeProducts(filteredProducts: IProduct[], filterRange: FiltersRangeDataType): IProduct[] {
    let newProducts: IProduct[] = filteredProducts;
    let isEmptyFilters = true;

    for (const key in filterRange) {
      if (filterRange[key as FiltersRangeType]?.length) {
        newProducts = this.filterByRangeFilter(
          filterRange[key as FiltersRangeType],
          newProducts,
          key as FiltersRangeType,
        );
        isEmptyFilters = false;
      }
    }
    return isEmptyFilters ? filteredProducts : newProducts;
  }

  private filterByRangeFilter(filterRange: number[], items: IProduct[], filterName: FiltersRangeType): IProduct[] {
    return items.filter((item) => item[filterName] >= filterRange[0] && item[filterName] <= filterRange[1]);
  }

  // check for activity on saved
  private checkActiveElement(elementValue: string, element: HTMLInputElement): void {
    if (window.location.hash.includes(Symbol.Query)) {
      const filteredCatalog = UrlHash.hashData.filtersValue[this.filterName as FiltersValueType];
      element.checked = filteredCatalog.includes(elementValue);
    }
  }

  private getProductsQuantity(elementValue: string, catalog: IProduct[]): number {
    let count = 0;

    catalog.forEach((elem) => {
      for (const key in elem) {
        if (elem[key as FiltersValueType] === elementValue) {
          count += 1;
        }
      }
    });

    return count;
  }

  private appendTotalFoundQuantity() {
    const totalFound = document.querySelector(ClassMap.catalogQuantity);

    if (totalFound instanceof HTMLElement) {
      totalFound.innerHTML = '';
      totalFound.innerHTML = `Found: ${this.currentCatalog.length}`;
    }
  }

  private reRenderFilters() {
    const newSortCatalog = new FilterCatalog(this.catalog, this.sortCatalog, this.productsDB);
    newSortCatalog.clear();
    newSortCatalog.render();
  }

  //* Search filter
  public appendSearchField(parentElement: HTMLElement): void {
    const search: HTMLDivElement = document.createElement('div');
    search.classList.add('search');
    parentElement.append(search);

    const searchInput: HTMLInputElement = document.createElement('input');
    searchInput.classList.add('search__input');
    searchInput.type = 'search';
    searchInput.name = 'q';
    searchInput.autocomplete = 'off';
    searchInput.placeholder = 'Search product';
    search.append(searchInput);

    const searchIcon: HTMLDivElement = document.createElement('div');
    searchIcon.classList.add('search__icon');
    search.append(searchIcon);

    searchInput.value = UrlHash.getUrlHashParam(FiltersName.Search);

    searchInput.addEventListener('change', () => {
      this.filterProducts();
      this.appendTotalFoundQuantity();
      UrlHash.setUrlHashParam(FiltersName.Search, searchInput.value);
    });
  }

  private searchProducts(filteredProducts: IProduct[], currentInput: string): IProduct[] {
    if (currentInput === '') {
      return filteredProducts;
    }

    return filteredProducts.filter((item) => {
      const titleDetail = item.titleDetail.toLocaleLowerCase();
      const category = item.category.toLocaleLowerCase();
      const stock = String(item.stock);
      const price = String(item.price);
      const description = item.description.join().toLocaleLowerCase();

      return (
        titleDetail.includes(currentInput.toLowerCase()) ||
        category.includes(currentInput.toLowerCase()) ||
        stock.includes(currentInput) ||
        price.includes(currentInput) ||
        description.includes(currentInput.toLowerCase())
      );
    });
  }
}

export default Filters;
