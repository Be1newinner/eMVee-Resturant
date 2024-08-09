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
      state.data.push(...action.payload);
      state.updateTime = Date.now();
      return state;
    }
    case RESET_CATEGORIES: {
      state.data = [];
      state.updateTime = Date.now();
      return state;
    }
    case ADD_SINGLE_CATEGORY: {
      state.data.push(action.payload);
      state.updateTime = Date.now();
      return state;
    }
    case EDIT_SINGLE_CATEGORY: {
      state.data = state.data.filter((e) => e.k != action.payload.k);
      state.data.push(action.payload);
      state.updateTime = Date.now();
      return state;
    }
    case REMOVE_SINGLE_CATEGORY: {
      state.data = state.data.filter((e) => e.k != action.payload.k);
      return state;
    }
    default:
      return state;
  }
};

export default AllCategories;
