import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
//import LogoMain from "../shared/svg/svg/logo-main.jsx";
import { Menu } from "antd";

const { SubMenu } = Menu;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  getMenuItem = ({ singleOption }) => {
    const { key, label, leftIcon, children } = singleOption;
    if (children) {
      return (
        <SubMenu
          key={key}
          title={
            <span className="isoMenuHolder">
              {leftIcon}
              <span className="nav-text">{label}</span>
            </span>
          }
        >
          {children.map((child) => {
            return (
              singleOption.roles &&
              singleOption.roles.indexOf(this.state.roleName) !== -1 && (
                <Menu.Item key={child.key}>
                  <Link to={child.key}>
                    {child.leftIcon}
                    {child.label}
                    {child.alertsCount}
                  </Link>
                </Menu.Item>
              )
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={key}>
        <Link to={`${key}`}>
          <span className="isoMenuHolder">
            {leftIcon}
            <span className="nav-text">{label}</span>
          </span>
        </Link>
      </Menu.Item>
    );
  };

  render() {
    return (
      <div className="menu">
        <div className="logo">
          <img
            style={{ marginLeft: "17px" }}
            src="data:image/png;base64,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"
            alt="logo"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.props.history.location.pathname]}
        >
          {this.props.options &&
            this.props.options.map((singleOption) =>
              this.getMenuItem({ singleOption })
            )}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SideBar);
