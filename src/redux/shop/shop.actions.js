import  shopTypes  from './shop.types';

export const updateShopCollection = payload => {
      return {
            type: shopTypes.UPDATE_SHOP_COLLECTIONS,
            payload
      }
}