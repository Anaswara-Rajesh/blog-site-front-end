import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import blogReducer from '../features/blogSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
