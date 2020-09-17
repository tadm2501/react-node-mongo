import React, { Component } from "react";
import { Route } from "react-router-dom";
import Groups from "../components/super-admin-dash/groups/groups.jsx";

const routes = [
  {
    path: "",
    component: Groups
  },
  {
    path: "groups",
    component: Groups
  }
];

class AdminRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {" "}
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })
      } </div>
    );
  }
}

export default AdminRouter;