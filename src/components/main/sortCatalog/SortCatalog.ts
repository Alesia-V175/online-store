import Catalog from 'components/main/catalog/Catalog';
import './sortCatalog.scss';
import { IProduct } from 'types/interfaces';
import { SortOption } from 'types/types';
import { SortOptionMap, optionNames, ClassMap, valueOptionAsc, ClassListName } from 'constants/htmlConstants';
import UrlHash from 'helpers/router/UrlHash';
import { FiltersName } from 'types/enums';

class SortCatalog {
  constructor(private readonly catalog: Catalog) {}

  render(): void {
    const catalogHeader = document.querySelector(ClassMap.catalogHeader);

    if (!catalogHeader) {
      return;
    }

    const selectSortContainer: HTMLDivElement = document.createElement('div');
    selectSortContainer.classList.add('catalog__selectSort-wrap');
    catalogHeader.append(selectSortContainer);

    const labelTextSelect: HTMLLabelElement = document.createElement('label');
    labelTextSelect.classList.add(ClassListName.catalogLabelText);
    labelTextSelect.textContent = 'Sort by:';
    selectSortContainer.append(labelTextSelect);

    const selectSortButton: HTMLSelectElement = document.createElement('select');
    selectSortButton.classList.add(ClassListName.selectSort);
    selectSortButton.textContent = 'Sort by:';
    selectSortContainer.append(selectSortButton);

    const currSelectedOrder = UrlHash.getUrlHashParam(FiltersName.Sort);

    optionNames.forEach((item) => {
      const isSelected = currSelectedOrder === item;
      this.createOptionsSort(item, selectSortButton, isSelected);
    });

    selectSortButton.addEventListener('change', () => this.selectOrder());
  }

  public selectOrder(): void {
    const selectSortButton: HTMLSelectElement | null = document.querySelector(ClassMap.selectSort);
    if (!selectSortButton) {
      return;
    }

    const currentOption: HTMLOptionElement = selectSortButton.options[selectSortButton.selectedIndex];
    currentOption.selected = true;
    const currentOptionValue: string = currentOption.value;

    const [firstValue, secondValue] = currentOptionValue.split('-');
    const currentField = SortOptionMap[firstValue as keyof SortOption];
    const currentOrder = secondValue;

    this.sortCatalog(currentField, currentOrder);

    const oldCatalog = document.querySelector(ClassMap.catalog);

    if (!oldCatalog) {
      return;
    }
    oldCatalog.childNodes.forEach((child) => oldCatalog.removeChild(child));

    UrlHash.setUrlHashParam(FiltersName.Sort, currentOptionValue);
    this.catalog.render();
  }

  private sortCatalog(field: string, order: string): void {
    const typedField = field as keyof IProduct;
    const products: IProduct[] = this.catalog.products.sort((a, b) => {
      if (order === valueOptionAsc) {
        return a[typedField] < b[typedField] ? -1 : 1;
      }
      return a[typedField] > b[typedField] ? -1 : 1;
    });
    this.catalog.products = products;
  }

  private createOptionsSort(optionName: string, parentElem: HTMLSelectElement, isSelected: boolean): void {
    const optionSort: HTMLOptionElement = document.createElement('option');
    optionSort.textContent = optionName;
    optionSort.value = optionName;
    optionSort.selected = isSelected;

    if (optionName === optionNames[0]) {
      optionSort.hidden = true;
    }

    parentElem.append(optionSort);
  }
}

export default SortCatalog;
