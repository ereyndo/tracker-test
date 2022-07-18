import { configureStore } from '@reduxjs/toolkit';
import trackerItemsDataSlice from './slices/trackerItemsDataSlice';

const store = configureStore({
  reducer: {
    trackerItemsData: trackerItemsDataSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
