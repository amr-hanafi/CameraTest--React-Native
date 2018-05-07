import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers';

let initialState = {};

// Creating store
export default () => {
  let store = null;
  let middleware = null;
  middleware = applyMiddleware(thunk);
 
  // Create store
  // with initial state if it exists
  store = createStore(
    rootReducer,
    initialState,
    middleware
  );

  // Return store only
  // But as an object for consistency
  return {
    store,
  };
};