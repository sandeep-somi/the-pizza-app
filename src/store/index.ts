import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from '../containers/user/reducer';
import recipe from '../containers/recipe/reducer';

const store = configureStore({
  reducer: {
    user,
    recipe
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
