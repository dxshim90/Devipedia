

const initialState = {
  profile: null,
  profiles: [],
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_PROFILE":
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: payload,

      };
    case "GET_PROFILES":
      return {
        ...state,
        profiles: payload,

      };
    case "PROFILE_ERROR":
      return {
        ...state,
        error: payload,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
        repos: [],
      };
      case "GET_REPOS":
     return {
       ...state,
       repos: payload,
       loading: false
     };
     case "GET_IMAGE":
    return {
      ...state,
      image: payload,
      loading: false
    }
    default:
      return state;
  }
}
