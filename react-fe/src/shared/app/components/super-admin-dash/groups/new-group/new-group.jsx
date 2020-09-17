import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Col, message,Divider } from "antd";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as groupActions from "../../../../redux/actions/group-actions";
class AddGroupView extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.AddGroup(values);
        if (this.props.saveStatus) {
          message.success(this.props.saveGroupMessage);
          this.props.form.resetFields();
        } else message.error(this.props.saveGroupMessage);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row gutter={24}>
          <Col xs={12} sm={12} md={16} lg={16} xl={16}>
            <h2>Add Group</h2>
          </Col>
        </Row>
        <Divider />
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please enter group name!" }
                  ]
                })(<Input placeholder="Group Name" />)}
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
                <Button htmlType="submit" className="ant-btn-primary">Add Group</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedGroupAddView = Form.create({ name: "add_group" })(AddGroupView);

AddGroupView.propTypes = {
  saveGroupMessage: PropTypes.string,
  saveStatus: PropTypes.bool,
  getGroupList:PropTypes.func,
  todoList:PropTypes.array,
  AddGroup:PropTypes.func
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
    WrappedGroupAddView
  )
);
