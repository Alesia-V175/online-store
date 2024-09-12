export type FiltersValueType = 'brand' | 'category';
export type FiltersRangeType = 'price' | 'stock';

export type FiltersValueDataType = Record<FiltersValueType, string[]>;
export type FiltersRangeDataType = Record<FiltersRangeType, number[]>;

export type FiltersDataType = {
  filtersValue: FiltersValueDataType;
  filtersRange: FiltersRangeDataType;
};

export type SortOption = {
  Name: string;
  Price: string;
  Rating: string;
};

export type HashDataType = {
  filtersValue: FiltersValueDataType;
  filtersRange: FiltersRangeDataType;
  search: string;
  sort: string;
  view: string;
};

export type HashCartDataType = {
  limit: string;
  page: string;
};

export type SearchType = 'search';
