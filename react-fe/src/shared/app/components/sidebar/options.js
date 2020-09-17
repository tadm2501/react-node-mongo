import React from "react";
import {
  Icon
} from "antd";
import {
  GroupSVG
} from "../shared/svg/sidebar/home-icon";

const GroupIcon = props => < Icon component={
  GroupSVG
} {
  ...props
  }
/>

const adminOptions = [{
  key: "/admin/projects",
  label: "Manage Groups",
  leftIcon: <GroupIcon />
}
];
export default {
  adminOptions
};
