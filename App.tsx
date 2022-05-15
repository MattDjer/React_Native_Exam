import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import Navigation from './components/Navigation';
import chatReducer from './store/reducers/chat.reducer';
import postReducer from './store/reducers/post.reducer';
import userReducer from './store/reducers/user.reducer';
import commentReducer from './store/reducers/comment.reducer';
import profileReducer from './store/reducers/profile.reducer';

//test

const rootReducer = combineReducers({
  comment: commentReducer,
  chat: chatReducer,
  user: userReducer,
  post: postReducer,
  profile:profileReducer
});
export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
// const store = createStore(rootReducer);


export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

