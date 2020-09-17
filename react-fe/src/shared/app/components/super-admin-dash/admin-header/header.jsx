import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Row, Col } from "antd";
import * as sidebarAction from "../../../redux/actions/sidebar-actions"
class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }
  
  toggle = () => {
    this.props.toggleSidebar();
  };

  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col xs={3}>
            <Icon
              className="trigger"
              type={!this.props.sidebar ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

AdminHeader.propTypes = {
  toggleSidebar: PropTypes.func,
  LogOutUser:PropTypes.func,
  user:PropTypes.object
};

function mapStateToProps(state) {
  return {
    ...state.sidebar
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...sidebarAction}, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
);
