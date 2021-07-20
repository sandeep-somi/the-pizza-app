import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from '../containers/user/reducer';

const store = configureStore({
  reducer: {
    user
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
