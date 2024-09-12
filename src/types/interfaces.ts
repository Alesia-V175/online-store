export interface IProduct {
  id: number;
  titleDetail: string;
  title: string;
  description: string[];
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ICartProduct extends IProduct {
  count: number;
}

//  JSON database structure
export interface IProducts {
  products: IProduct[];
  limit: number;
  skip: number;
  total: number;
}

export interface IQuantity {
  current: number;
  total: number;
}

export interface IValueRange {
  min: number;
  max: number;
  minCurrent: number;
  maxCurrent: number;
}
