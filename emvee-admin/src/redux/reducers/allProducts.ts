import {
  LOAD_PRODUCTS,
  RESET_PRODUCTS,
  ADD_SINGLE_PRODUCT,
  EDIT_SINGLE_PRODUCT,
  REMOVE_SINGLE_PRODUCT,
} from "../constants/allProducts";

const initialState = {
  data: [],
  updateTime: 0,
};

interface actionType {
  payload: any;
  type: string;
}

const allProducts = (state = initialState, action: actionType) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }
    case RESET_PRODUCTS: {
      return {
        ...state,
        data: [],
      };
    }
    case ADD_SINGLE_PRODUCT: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case EDIT_SINGLE_PRODUCT: {
      return {
        ...state,
        data: [
          ...state.data.filter((e) => e.k != action.payload.k),
          action.payload,
        ],
      };
    }
    case REMOVE_SINGLE_PRODUCT: {
      return {
        ...state,
        data: [...state.data.filter((e) => e.k != action.payload.k)],
      };
    }
    default:
      return state;
  }
};

export default allProducts;
