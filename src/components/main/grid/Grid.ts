import './grid.scss';
import { ClassListName, ClassMap } from 'constants/htmlConstants';
import UrlHash from 'helpers/router/UrlHash';
import { FiltersName } from 'types/enums';

const viewList = 'list';

class Grid {
  public changeGridList(): void {
    const catalogView = document.querySelector(ClassMap.catalog);
    const catalogListIcon = document.querySelector(ClassMap.catalogViewList);
    const catalogTableIcon = document.querySelector(ClassMap.catalogViewTable);

    if (catalogView && catalogListIcon && catalogTableIcon) {
      catalogView.classList.add(ClassListName.catalogListView);
      catalogTableIcon.classList.remove(ClassListName.catalogViewActive);
      catalogListIcon.classList.add(ClassListName.catalogViewActive);
    }
  }

  public changeGridTable(): void {
    const catalogView = document.querySelector(ClassMap.catalog);
    const catalogListIcon = document.querySelector(ClassMap.catalogViewList);
    const catalogTableIcon = document.querySelector(ClassMap.catalogViewTable);

    if (catalogView && catalogListIcon && catalogTableIcon) {
      catalogView.classList.remove(ClassListName.catalogListView);
      catalogListIcon.classList.remove(ClassListName.catalogViewActive);
      catalogTableIcon.classList.add(ClassListName.catalogViewActive);
    }
  }

  render(): void {
    const catalogHeader = document.querySelector(ClassMap.catalogHeader);

    if (!catalogHeader) {
      return;
    }

    const viewButtonTable: HTMLDivElement = document.createElement('div');
    viewButtonTable.classList.add(
      ClassListName.catalogView,
      ClassListName.catalogViewTable,
      ClassListName.catalogViewActive,
    );
    catalogHeader.append(viewButtonTable);

    const viewButtonList: HTMLDivElement = document.createElement('div');
    viewButtonList.classList.add(ClassListName.catalogView, ClassListName.catalogViewList);
    catalogHeader.append(viewButtonList);

    const currentGridValue = UrlHash.getUrlHashParam(FiltersName.View);

    if (currentGridValue === viewList) {
      this.changeGridList();
    } else {
      this.changeGridTable();
    }

    viewButtonList.addEventListener('click', () => {
      UrlHash.setUrlHashParam(FiltersName.View, viewList);
      this.changeGridList();
    });
    viewButtonTable.addEventListener('click', () => {
      UrlHash.setUrlHashParam(FiltersName.View, '');
      this.changeGridTable();
    });
  }
}

export default Grid;
