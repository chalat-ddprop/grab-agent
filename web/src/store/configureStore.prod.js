import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import EnquiryService from '../services/EnquiryService';

let enquiryService = new EnquiryService();

// Middleware you want to use in production:
const enhancer = applyMiddleware(thunk.withExtraArgument({ enquiryService }));

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
};