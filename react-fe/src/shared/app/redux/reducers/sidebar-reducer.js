import { Types } from "../constants/sidebar-types";
const initialState = {
  sidebar: false
};
export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case Types.TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    default:
      return state;
  }
}
