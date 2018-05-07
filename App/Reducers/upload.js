import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from '../Actions/uploadActions';

const initialState = {
 uploaded: false,
 error: null,
 success: false,
};

const actionsMap = {
 // Async action
 [UPLOAD_IMAGE_REQUEST]: (state) => {
   return {
     ...state,
     uploaded: false,
     error: null,
   };
 },
 [UPLOAD_IMAGE_FAILURE]: (state, action) => {
   return {
     ...state,
     uploaded: false,
     error: action.error.message ? action.error.message : action.error.error.message,
   };
 },
 [UPLOAD_IMAGE_SUCCESS]: (state, action) => {
   return {
     ...state,
     uploaded: true,
     success: true,
   };
 },
};

export default function reducer(state = initialState, action = {}) {
 const fn = actionsMap[action.type];
 return fn ? fn(state, action) : state;
}
