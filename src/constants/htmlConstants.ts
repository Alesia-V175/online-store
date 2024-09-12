import { SortOption } from 'types/types';

export const Body = document.querySelector('body') as HTMLElement;
export const Container = document.querySelector('#main-container') as HTMLElement;

export const IdMap = {
  catalog: '#catalog',
  resetButton: '#reset-button',
  valueFilters: '#value-filters',
  rangeFilters: '#range-filters',
  search: '#search-field',
  popupName: '#name',
  popupPhone: '#phone',
  popupAddress: '#address',
  popupEmail: '#email',
  popupCardNumber: '#card-number',
  popupCardValid: '#card-valid',
  popupCardCVV: '#card-cvv',
};

export const ClassMap = {
  catalogHeader: '.catalog__header',
  selectSort: '.catalog__selectSort',
  catalog: '.catalog',
  catalogListView: '.catalog_list',
  catalogView: '.catalog__view',
  catalogViewActive: '.catalog__view_active',
  catalogViewTable: '.catalog__view_table',
  catalogViewList: '.catalog__view_list',
  catalogQuantity: '.filter-quantity',
  headerCartCounter: '.header__cart-counter',
  headerTotalPrice: '.header__total-price',
  cartContainer: '.cart-container',
  cartTotalQty: '.total-quantity',
  cartPriceWrap: '.total-price-container',
  cartTotalPrice: '.total-price',
  cartDiscountPrice: '.new-price',
  cartDiscountList: '.promo__list',
  paginationPageNum: '.page-value',
  cartPaginationInput: '.pagination__input',
};

export const ClassListName = {
  selectSort: 'catalog__selectSort',
  catalogListView: 'catalog_list',
  catalogView: 'catalog__view',
  catalogViewActive: 'catalog__view_active',
  catalogViewTable: 'catalog__view_table',
  catalogViewList: 'catalog__view_list',
  catalogLabelText: 'label-text',
  cartDiscountPriceActive: 'new-price_active',
  cartPrevPrice: 'old-price',
  cartContainerWrap: 'container-wrap',
  cartTitle: 'cart__title',
  cartSectionsWrap: 'cart__sections-wrap',
  cartProductWrap: 'cart__product-wrap',
  cartPaginationWrap: 'pagination-wrap',
  cartPaginationLimitPage: 'pagination__limit-page',
  cartPaginationLabel: 'pagination__label',
  cartContainer: 'cart-container',
  cartPaginationInput: 'pagination__input',
  paginationPageNumberWrap: 'pagination__page-number',
  paginationButton: 'pagination__button',
  paginationPageNum: 'page-value',
  priceContainerWrap: 'price__container-wrap',
  cartHeaderList: 'cart__list',
  cartHeaderItem: 'cart__item',
  cartTotalPriceTitle: 'price__title',
  cartTotalQty: 'total-quantity',
  cartTotalPriceContainer: 'total-price-container',
  cartTotalPrice: 'total-price',
  cartDiscountPrice: 'new-price',
  cartAppliedCodesWrap: 'promo__wrap',
  cartTotalPromoSubtitle: 'price__subtitle',
  cartTotalPromoList: 'promo__list',
  cartTotalPromoItem: 'promo__item',
  cartTotalPromoInput: 'promo__search',
  cartTotalPromoButton: 'promo__button',
  cartTotalPromoText: 'promo-text',
  cartInputPromoWrap: 'promo__search-wrap',
  emptyCart: 'empty-cart',
  productCard: 'product-card',
  productIndex: 'product__index',
  productItemWrap: 'product-card_wrap',
  productStock: 'product__stock',
  productImg: 'product__img',
  productDesc: 'product__description',
  productDescWrap: 'product-card_wrap',
  productCardTitle: 'product-card__title',
  productCardRating: 'product-details__rating',
  productCardRatingText: 'product__rating-text',
  productPriceDiscount: 'product__price_discount',
  productCardQty: 'quantity',
  productQtyButton: 'quantity-button',
  productQtyButtonMinus: 'minus',
  productQtyButtonPlus: 'plus',
  productQtyValue: 'quantity-number',
  productCartPrice: 'product-card__price',
};

export const SortOptionMap: SortOption = {
  Name: 'title',
  Price: 'price',
  Rating: 'rating',
};

export const optionNames = ['', 'Name-ASC', 'Name-DESC', 'Price-ASC', 'Price-DESC', 'Rating-ASC', 'Rating-DESC'];

export const itemsCart = ['№', 'Item', 'Description', 'Qty', 'Subtotal'];

export const promoCodes = ['RS', 'EPAM', 'METRO'];

export const valueOptionAsc = 'ASC';

export const fullStarIcon = '<i class="fa-solid fa-star rating-star"></i>';

export const halfStarIcon = '<i class="fa-regular fa-star-half-stroke rating-star"></i>';
