import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
