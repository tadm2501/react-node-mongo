import { Types } from "../constants/group-types";
import  API  from "../api/group-api";

export function getGroupList() {
  return async function (dispatch, getState) {
    try {
      var groupList = await API.getGroupList();
      if(groupList && groupList.groups && groupList.groups.length > 0){
        var groups = groupList.groups;
        dispatch({ type: Types.SAVE_GROUP_LIST, payload: groups });
      }
    } catch (e) {}
  };
}

export function AddGroup(values) {
  return async function (dispatch, getState) {
    try {
      var addObject = {
          group_name:values.name
      }
      var groupList = await API.addGroup(addObject);
      debugger;
      if(groupList && groupList.groups && groupList.groups.length > 0 && groupList.sucess){
        var groups = groupList.groups;
        dispatch({ type: Types.SAVE_GROUP_LIST, payload: groups });
        dispatch({ type: Types.SAVE_GROUP_MESSAGE, payload: "Saved Sucessfully!" });
        dispatch({ type: Types.SAVE_GROUP_STATUS, payload: true });
      }else{
        dispatch({ type: Types.SAVE_GROUP_MESSAGE, payload: groupList.message });
        dispatch({ type: Types.SAVE_GROUP_STATUS, payload: false });
      }
    } catch (e) {}
  };
}

export function AddUser(values) {
  return async function (dispatch, getState) {
    try {
      var addObject = {
        group_name:values.group,
        user_name:values.name,
        color:values.color
    }
      var groupList = await API.AddUser(addObject);
      if(groupList && groupList.groups && groupList.groups.length > 0 && groupList.sucess){
        var groups = groupList.groups;
        dispatch({ type: Types.SAVE_GROUP_LIST, payload: groups });
        dispatch({ type: Types.SAVE_USER_MESSAGE, payload: "Saved Sucessfully!" });
        dispatch({ type: Types.SAVE_USER_STATUS, payload: true });
      }else if(groupList.message === "User already exist"){
        dispatch({ type: Types.SAVE_EXISTING_USER, payload: groupList.user });
        dispatch({ type: Types.SAVE_USER_MESSAGE, payload: groupList.message });
        dispatch({ type: Types.SAVE_USER_STATUS, payload: false });
      }else{
        dispatch({ type: Types.SAVE_USER_MESSAGE, payload: groupList.message });
        dispatch({ type: Types.SAVE_USER_STATUS, payload: false });
      }
    } catch (e) {}
  };
}

export function resetExistingUser() {
  return async function (dispatch, getState) {
    try {
        dispatch({ type: Types.SAVE_EXISTING_USER, payload: {} });
    } catch (e) {}
  };
} 
