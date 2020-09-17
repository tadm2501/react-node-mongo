import Axios from '../../shared/services/axios-service';

const getGroupList = () => {
	return Axios.get("/group/get-all-groups", undefined, undefined);
};

const addGroup = (group) => {
	return Axios.post("/group/save-group", group, undefined);
};

const AddUser = (group) => {
	return Axios.post("/group/add-user-to-group", group, undefined);
};



export default {
    getGroupList,
    addGroup,
    AddUser
};