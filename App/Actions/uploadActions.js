import axios from 'axios';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

export const uploadImage = (data) => dispatch => {
  dispatch({
    type: UPLOAD_IMAGE_REQUEST,
  });
  axios.post('https://dev-app.api.january.ai/lambda_app/data/log', {
    "skin": [
      {
        "ts": 1515110600,
        "encoded_images": [
          data,
        ]
      },
    ]
  })
  .then(response => {
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
    });
  })
  .catch(err => {
    dispatch({
      type: UPLOAD_IMAGE_FAILURE,
      error: err,
    });
  });
}
