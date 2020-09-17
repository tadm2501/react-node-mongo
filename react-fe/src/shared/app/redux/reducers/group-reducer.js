import { Types } from "../constants/group-types";
const initialState = {
  groupList: [],
  userList:[],
  saveGroupMessage:"",
  saveStatus:true,
  saveUserStatus:true,
  saveUserMessage:"",
  existingUser:{}
};
export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case Types.SAVE_GROUP_LIST:
      return { ...state,groupList: action.payload  };
    case Types.SAVE_USER_LIST:
      return { ...state, userList: action.payload };
    case Types.SAVE_GROUP_MESSAGE:
        return { ...state, saveGroupMessage: action.payload };
    case Types.SAVE_GROUP_STATUS:
      return { ...state, saveStatus: action.payload };
    case Types.SAVE_USER_MESSAGE:
      return { ...state, saveUserMessage: action.payload };
    case Types.SAVE_USER_STATUS:
      return { ...state, saveUserStatus: action.payload };
    case Types.SAVE_EXISTING_USER:
      return { ...state, existingUser: action.payload };
    default:
      return state;
  }
}