import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function Post({ getPost, post: { post, loading }, match }) {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
    <Link to='/posts' className="btn btn-light">Back To Posts </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm id={post._id} />
      <div className="comments">
         {post.Comments.map(comment=>(
            <CommentItem key={comment._id} comment={comment} id={post._id} />
         ))}
      </div>
    </>
  );
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
