import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as groupActions from "../../../redux/actions/group-actions";
import { Table, Input, Button, Icon,Row, Col,Divider } from "antd";
import Highlighter from "react-highlight-words";
import NewGroup from "./new-group/new-group.jsx";
import AddUser from "./add-user/add-user.jsx";
class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }

  handleViewClick = async (key, e) => {
    e.preventDefault();
    //this.props.history.push("projects/view-project/" + key);
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  componentDidMount() {
    this.initialize();
  }

  componentWillReceiveProps(props) {
    this.bindUserList(); 
  }

  async initialize(){
    await this.props.getGroupList();
    this.bindUserList();    
  }

  bindUserList(){
    var groups = this.props.groupList;
    if(groups && groups.length > 0){
      var usresList = [];
      groups.map(group => {
        if(group && group.users && group.users.length > 0){
          group.users.map(user => {
            var objUser = {
              group: group.name,
              name: user.name,
              color:user.color
            }
            usresList.push(objUser);
            return false;
        })
        }
        return false;
      })
      this.setState({ userList: usresList });
    }
  }
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
        width: "20%",
        ...this.getColumnSearchProps("color"),
      },
      {
        title: "Group",
        dataIndex: "group",
        key: "group",
        width: "20%",
        ...this.getColumnSearchProps("group"),
      }
    ];

    return (
      <div>
        <NewGroup />
        <Row gutter={24}>
          <Col xs={12} sm={12} md={16} lg={16} xl={16}>
            <h2>Group List</h2>
          </Col>
        </Row>
        <Divider />
        <br></br>
        <br></br>
        <Table
          columns={columns}
          dataSource={this.state.userList}
        />
        <br></br>
        <AddUser groups={this.props.groupList}/>
      </div>
    );
  }
}

GroupList.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  groupList: PropTypes.array,
  getGroupList: PropTypes.func,
};
function mapStateToProps(state) {
  return {
    ...state.group,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...groupActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    GroupList
  )
);
