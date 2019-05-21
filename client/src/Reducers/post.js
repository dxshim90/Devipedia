

const initialState = {
  posts: [],
  post: null,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: payload,
      };
    case "GET_POST":
      return {
        ...state,
        post: payload,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
      };
    case "POST_ERROR":
      return {
        ...state,
        error: payload,
      };
    case "UPDATE_LIKES":
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case "ADD_COMMENT":
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case "REMOVE_COMMENT":
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
      };
    default:
      return state;
  }
}
