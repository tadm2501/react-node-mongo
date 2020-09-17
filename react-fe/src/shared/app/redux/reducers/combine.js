import { combineReducers } from 'redux';
import sidebarReducer from "./sidebar-reducer";
import groupReducer from "./group-reducer";


const reducers = combineReducers({
    sidebar:sidebarReducer,
    group:groupReducer,
});

export default reducers;