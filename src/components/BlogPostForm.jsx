import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

function BlogPostForm({
  onTitleChange,
  onPostDescriptionChange,
  title,
  description,
  onCancel,
  onSubmit,
}) {
  return (
    <div>
      <Form key="create-blog-form">
        <Form.Item
          label="Title"
          rules={[
            {
              required: true,
              message: "post Title is required",
            },
          ]}
        >
          <Input onChange={onTitleChange} value={title} key="blogTitleInput" />
        </Form.Item>
        <Form.Item label="Post">
          <Input.TextArea
            allowClear
            onChange={onPostDescriptionChange}
            value={description}
            key="blogDescriptionField"
            rules={[
              {
                required: true,
                message: "Post body is required",
              },
            ]}
          />
        </Form.Item>
        <Row justify="center" align="center" gutter={16}>
          <Col lg={12} sm={18}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onSubmit()}
              size="large"
              style={{ width: "100%" }}
            >
              Post
            </Button>
          </Col>
          <Col lg={12} sm={18}>
            <Button
              htmlType="button"
              onClick={() => onCancel()}
              size="large"
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BlogPostForm;
