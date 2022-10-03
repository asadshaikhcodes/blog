import React, { useEffect, useState } from "react";
import {
  Modal,
  Layout,
  Row,
  Col,
  Card,
  Spin,
  Menu,
  Divider,
  Button,
} from "antd";
import BlogPostForm from "./BlogPostForm";
import { Link, Routes, Route } from "react-router-dom";
import Post from "./Post";

const { Header, Content } = Layout;

function AllPosts({ posts }) {
  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[16, 16]}>
        {posts &&
          posts.map((post) => {
            return (
              <Col sm={24} lg={8}>
                <Link to={`${post.id}`}>
                  <Card
                    hoverable
                    title={post.title}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    bodyStyle={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.body}
                  </Card>
                </Link>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

function Posts({ posts }) {
  return (
    <>
      <Routes>
        <Route index element={<AllPosts posts={posts} />} />
        <Route path=":postId" element={<Post />} />
        <Route path="*" element={<h2>No Post found</h2>} />
      </Routes>
    </>
  );
}

function Blog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [posts, setPosts] = useState([]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPostDescriptionChange = (e) => {
    setPostBody(e.target.value);
  };

  const onPostSubmit = () => {
    //post id post title hyphen based: post-title
    const postId = title && title.replace(/\s+/g, "-").toLowerCase();
    const post = { postId, title, body: postBody, userId: null };
    setPosts([...posts, post]);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseData) => {
        setPosts(responseData);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Layout>
                <Header style={{ backgroundColor: "#fff" }}>
                  <Row>
                    <Col>
                      <h2>Blog</h2>
                    </Col>
                    <Col>
                      <Divider type="vertical" />
                    </Col>
                    <Col>
                      <Menu
                        mode="horizontal"
                        items={[
                          {
                            key: "posts-link",
                            label: <Link to="/posts">See All Posts</Link>,
                          },
                        ]}
                      />
                    </Col>
                    <Col>
                      <Divider type="vertical" />
                    </Col>
                    <Col push={18}>
                      <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Create New Post
                      </Button>
                    </Col>
                  </Row>
                </Header>
                <Content>
                  <Routes>
                    <Route path="posts/*" element={<Posts posts={posts} />} />
                  </Routes>
                </Content>
              </Layout>
            </>
          }
        />
        <Route path="*" element={<h1>No Routes Matched</h1>} />
      </Routes>
      <Modal
        open={isModalOpen}
        footer={null}
        centered
        maskClosable={false}
        title="Create Blog"
        onCancel={() => handleCancel()}
      >
        <BlogPostForm
          title={title}
          onTitleChange={onTitleChange}
          onPostDescriptionChange={onPostDescriptionChange}
        />
      </Modal>
    </div>
  );
}

export default Blog;
