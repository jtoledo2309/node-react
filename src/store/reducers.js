// auth: true/false
// adverts: []
// ui: {
//   isLoading: true/false
//   error: error/null
// }

import {
  AUTH_LOGIN_SUCESS,
  AUTH_LOGOUT,
  ADVERTS_LOADED_SUCESS,
  UI_RESET_ERROR,
  ADVERT_LOADED_SUCESS,
  ADVERT_CREATED_SUCESS,
  ADVERT_DELETED_SUCESS,
  TAGS_LOADED_SUCESS,
} from "./types.js";

export const defaultState = {
  auth: false,
  adverts: {
    areLoaded: false,
    data: null,
    tags: null,
  },
  ui: {
    isLoading: false,
    error: null,
  },
};

// export default function reducer(state = defaultState, action) {
//   switch (action.type) {
//     case AUTH_LOGIN:
//       return { ...state, auth: true };

//     case AUTH_LOGOUT:
//       return { ...state, auth: false };

//     case ADVERTS_LOADED:
//       return { ...state, adverts: action.payload };

//     default:
//       return state;
//   }
// }

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCESS:
      return true;

    case AUTH_LOGOUT:
      return false;

    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  if (action.type === ADVERTS_LOADED_SUCESS) {
    return { ...state, areLoaded: true, data: action.payload };
  }
  if (action.type === ADVERT_LOADED_SUCESS) {
    return { ...state, data: [action.payload] };
  }
  if (action.type === ADVERT_CREATED_SUCESS) {
    return { ...state, data: [...state.data, action.payload] };
  }
  if (action.type === ADVERT_DELETED_SUCESS) {
    return {
      ...state,
      data: state.data.filter((advert) => advert.id !== action.payload),
    };
  }
  if (action.type === TAGS_LOADED_SUCESS) {
    return { ...state, tags: action.payload };
  }
  return state;
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return {
      isLoading: false,
      error: action.payload,
    };
  }
  if (/_REQUEST$/.test(action.type)) {
    return {
      error: null,
      isLoading: true,
    };
  }
  if (/SUCESS$/.test(action.type)) {
    return {
      error: null,
      isLoading: false,
    };
  }
  if (action.type === UI_RESET_ERROR) {
    return {
      ...state,
      error: null,
    };
  }
  return state;
}
// switch (action.type) {
//   case AUTH_LOGIN_REQUEST:
//     return {
//       error: null,
//       isLoading: true,
//     };
//   case AUTH_LOGIN_SUCESS:
//     return {
//       error: null,
//       isLoading: false,
//     };
//   case AUTH_LOGIN_FAILURE:
//     return {
//       error: action.payload,
//       isLoading: false,
//     };
//   case UI_RESET_ERROR:
//     return {
//       ...state,
//       error: null,
//     };
//   default:
//     return state;
// }
// export default function reducer(state = defaultState, action) {
//   return {
//     auth: auth(state.auth, action),
//     adverts: adverts(state.adverts, action),
//   };
// }
