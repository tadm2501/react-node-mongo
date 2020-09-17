import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button,Select, Row, Col, message,Divider } from "antd";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as groupActions from "../../../../redux/actions/group-actions";
const { Option } = Select;
class AddUserView extends Component {
  constructor(props){
      super(props);
      this.state ={
          userColor:""
      }
      this.onChange = this.onChange.bind(this)
  }
  onChange(evt){
      if(this.state.userColor !== ""){
          this.setState({userColor:""});
          this.props.resetExistingUser();
      }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.AddUser(values);
        if (this.props.saveUserStatus) {
          message.success(this.props.saveUserMessage);
          this.props.form.resetFields();
        } else {
            message.error(this.props.saveUserMessage);
            if(this.props.existingUser && this.props.existingUser.color){
                debugger;
                this.setState({userColor:this.props.existingUser.color})
            }
        }
      }
    });
  };
  _bindGroups() {
    return this.props.groups.map((group, index) => (
      <Option key={"group" + index} value={group.name}>
        {group.name}
      </Option>
    ));
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row gutter={24}>
          <Col xs={12} sm={12} md={16} lg={16} xl={16}>
            <h2>Add User</h2>
          </Col>
        </Row>
        <Divider />
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please enter user name!" }
                  ]
                })(<Input onChange={this.onChange} style={{"border-color" : this.state.userColor}} placeholder="User Name" />)}
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <Form.Item>
                {getFieldDecorator("color", {
                  rules: [
                    { required: true, message: "Please enter color name!" }
                  ]
                })(<Input placeholder="Color Name" />)}
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <Form.Item>
                {getFieldDecorator("group", {
                  rules: [
                    { required: true, message: "Please select group!" }
                  ]
                })(<Select
                    placeholder="Select User"
                    style={{ width: 200 }}
                    onChange={this.onChange}
                  >
                    {this._bindGroups()}
                  </Select>)}
              </Form.Item>
            </Col>
            </Row>
          <Row gutter={24}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ textAlign: "right", paddingRight: "25px" }}
            >
              <Form.Item>
                <Button htmlType="submit" className="ant-btn-primary">Add User</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedUserAddView = Form.create({ name: "add_user" })(AddUserView);

AddUserView.propTypes = {
  saveUserMessage: PropTypes.string,
  saveUserStatus: PropTypes.bool,
  existingUser:PropTypes.object,
  resetExistingUser:PropTypes.func
};

function mapStateToProps(state) {
  return {
    ...state.group
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...groupActions }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    WrappedUserAddView
  )
);
