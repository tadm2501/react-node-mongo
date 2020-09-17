import { Types } from "../constants/sidebar-types";

export function toggleSidebar() {
  return async function(dispatch, getState) {
    dispatch({ type: Types.TOGGLE_SIDEBAR, payload: {} });
  };
}
