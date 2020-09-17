import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SideBar from "../sidebar/sidebar.jsx";
import AdminRouter from "../../routes/admin-route";
import AdminHeader from "./admin-header/header.jsx";
import { Layout } from "antd";
import options from "../sidebar/options";
import * as sidebarAction from "../../redux/actions/sidebar-actions";
const { Header, Sider, Content } = Layout;
class SuperAdminDash extends Component {
  async componentDidMount() {
    
  }
  render() {
    const { url } = this.props.match;
    return (
      <div id="components-layout-demo-custom-trigger">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={!this.props.sidebar}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              top: 0,
              left: 0
            }}
            width={300}
          >
            <SideBar options={options.adminOptions} />
          </Sider>
          <Layout>
            <Header
              className="header"
              style={{
                background: "#fff",
                position: "sticky",
                zIndex: 100,
                top: 0,
                left: 0,
                width: "100%",
                padding: 0
              }}
              location={this.props.location}
              history={this.props.history}
            >
              <AdminHeader />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                overflowX: "hidden",
                maxWidth: "100%",
                position: "relative",
                minHeight: 280
              }}
            >
              <AdminRouter url={url} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

SuperAdminDash.propTypes = {
  sidebar:PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    ...state.sidebar
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {...sidebarAction },
    dispatch
  );
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    SuperAdminDash
  )
);
