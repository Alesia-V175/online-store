export enum FiltersName {
  Category = 'category',
  Brand = 'brand',
  Price = 'price',
  Stock = 'stock',
  Search = 'search',
  Sort = 'sort',
  View = 'view',
}

export enum Pages {
  Main = 'main',
  ProductDetails = 'product-details',
  Price = 'price',
  Cart = 'cart',
}

export enum Symbol {
  Plus = '+',
  Ampersand = '&',
  Currence = '$',
  Query = '?',
  Equality = '=',
}

export enum CartText {
  ShoppingCart = 'Shopping Cart',
  ShowPage = 'Show per page ',
  Summary = 'Summary',

  TitlePromo = 'Apply Discount Code',
  InputMinValue = '1',
  InputMaxValue = '9',
  InputOptionalValue = '5',
  PromoInputPlaceholder = 'Enter your promo code',
  ButtonAdd = 'ADD',
  ButtonDrop = 'DROP',
  ButtonBuy = 'BUY NOW',
  EmptyCart = 'Your cart is empty',
  PageButtonLeft = '<',
  PageButtonRight = '>',
  PageStartValue = '1',
  ProductButtonMinus = '-',
  ProductButtonPlus = '+',
}

export enum CartParam {
  Limit = 'limit',
  Page = 'page',
}

export enum Validation {
  ErrorMessage = 'Invalid value',
  NameInvalidMessage = 'You need to enter your full name (first name and second name).',
  NumberInvalidMessage = 'You need to enter a full number with "+". Min length is 9 digits',
  AddressInvalidMessage = 'You need to enter your full address with country, city and street',
  EmailInvalidMessage = 'Entered value needs to be an e-mail address with @.',
  CardNumberInvalidMessage = 'You need to enter your card number with 16 digits',
  CardValidInvalidMessage = 'Invalid value',
  CardCvvInvalidMessage = 'Invalid CVV',
}
