import React, { useEffect, useState } from "react";
import { Col, Row, Layout, Breadcrumb, Card } from "antd";
import { Link, useParams } from "react-router-dom";

const { Content, Header } = Layout;
function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({
    id: null,
    title: "",
    body: "",
    userId: null,
  });
  console.log("post id", postId);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
      .then((response) => response.json())
      .then((singlePostResponse) => {
        setPost({ ...post, ...singlePostResponse });
        console.log("single post response: ", singlePostResponse);
      });
  }, []);
  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: "#fff" }}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/posts">All Posts</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{post && post.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ height: "100vh" }}>
          <Row justify="center">
            <Col sm={24} lg={18}>
              <Card
                title={post && post.title}
                style={{ height: "100vh" }}
                bodyStyle={{ textAlign: "left" }}
              >
                {post && post.body}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default Post;
