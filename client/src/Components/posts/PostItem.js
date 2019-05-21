import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, user, likes, comments, date },
  showActions
}) => (
  <div>
    <div>
      <Link to={`/profile/${user}`}>
        <img src="" alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p>{text}</p>
      <p>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button
            type='button'

          >
            <i className='fas fa-thumbs-up' />{' '}
          </button>
          <button
            type='button'

          >
            <i className='fas fa-thumbs-down' />
          </button>
          { user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'

            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);