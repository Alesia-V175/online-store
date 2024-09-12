import UrlHashCart from 'helpers/router/UrlHashCart';
import { HashCartDataType } from 'types/types';

describe('UrlHashCart: getHashCartData', () => {
  test('should be defined', () => {
    expect(UrlHashCart.getHashCartData).toBeDefined();
  });

  test('should return hashCartData', () => {
    const urlHash = '#cart?limit=5&page=1';

    const result: HashCartDataType = {
      limit: '5',
      page: '1',
    };

    UrlHashCart.hashCartData = result;

    expect(UrlHashCart.getHashCartData(urlHash)).toEqual(result);
  });
});
