import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import Navigation from './components/Navigation';
import postReducer from './store/reducers/post.reducer';
import userReducer from './store/reducers/user.reducer';
import commentReducer from './store/reducers/comment.reducer';
import profileReducer from './store/reducers/profile.reducer';
import eventReducer from './store/reducers/event.reducer';
import { QueryClientProvider, QueryClient } from 'react-query'


const rootReducer = combineReducers({
  comment: commentReducer,
  user: userReducer,
  post: postReducer,
  profile: profileReducer,
  event: eventReducer
});
export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </QueryClientProvider>
  )
}

