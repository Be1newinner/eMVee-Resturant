import {
  ADD_SINGLE_CATEGORY,
  EDIT_SINGLE_CATEGORY,
  LOAD_CATEGORIES,
  REMOVE_SINGLE_CATEGORY,
  RESET_CATEGORIES,
} from "../constants/allCategories";

const initialState = {
  data: [],
  updateTime: 0,
};

interface actionType {
  payload: any;
  type: string;
}

const AllCategories = (state = initialState, action: actionType) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
        updateTime: Date.now(),
      };
    }
    case RESET_CATEGORIES: {
      return {
        ...state,
        data: [],
        updateTime: Date.now(),
      };
    }
    case ADD_SINGLE_CATEGORY: {
      return {
        ...state,
        data: [...state.data, action.payload],
        updateTime: Date.now(),
      };
    }
    case EDIT_SINGLE_CATEGORY: {
      return {
        ...state,
        data: state.data.map((e) =>
          e.k === action.payload.k ? action.payload : e
        ),
        updateTime: Date.now(),
      };
    }
    case REMOVE_SINGLE_CATEGORY: {
      return {
        ...state,
        data: state.data.filter((e) => e.k !== action.payload.k),
      };
    }
    default:
      return state;
  }
};

export default AllCategories;
