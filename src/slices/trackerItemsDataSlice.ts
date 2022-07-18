import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { TrackerItemData } from '../models';
import { AppDispatch, RootState } from '../store';

const updateTrackerItemDataAndLocalStorageOnPlayStatusTrue = ({
  id,
  name,
  timeCounter,
  lastPlayTimestamp,
  playStatus,
}: TrackerItemData): TrackerItemData => {
  const currentTimestamp = moment().valueOf();
  const newTimeCounter = timeCounter + currentTimestamp - lastPlayTimestamp;
  const updatedPayload = {
    name,
    timeCounter: newTimeCounter,
    lastPlayTimestamp: currentTimestamp,
    playStatus,
  };
  localStorage.setItem(
    id,
    JSON.stringify({
      ...updatedPayload,
    })
  );
  return { id, ...updatedPayload };
};

const compareTrackerItems = (
  firstItem: TrackerItemData,
  secondItem: TrackerItemData
): number => {
  return Number(secondItem.id) - Number(firstItem.id);
};

const initialState = (): Array<TrackerItemData> => {
  return Object.entries(localStorage)
    .reduce((acc, el) => {
      const id = el[0];
      const { name, timeCounter, lastPlayTimestamp, playStatus } = JSON.parse(
        el[1]
      );
      const incomingTrackerItemData: TrackerItemData = {
        id,
        name,
        timeCounter: Number(timeCounter),
        lastPlayTimestamp: Number(lastPlayTimestamp),
        playStatus: JSON.parse(playStatus),
      };

      const finalTrackerItemData = JSON.parse(playStatus)
        ? updateTrackerItemDataAndLocalStorageOnPlayStatusTrue(
            incomingTrackerItemData
          )
        : incomingTrackerItemData;

      acc.push({
        ...finalTrackerItemData,
      });

      return acc;
    }, [] as Array<TrackerItemData>)
    .sort(compareTrackerItems);
};

export const trackerItemsDataSlice = createSlice({
  name: 'trackerItemsData',
  initialState,
  reducers: {
    addTrackerItemData: (state, action: PayloadAction<TrackerItemData>) => {
      state.unshift(action.payload);
    },
    removeTrackerItemData: (state, action: PayloadAction<string>) => {
      return state.filter((item) => action.payload !== item.id);
    },
    updateTrackerItemTimeCounter: (
      state,
      action: PayloadAction<{ id: string; timeCounter: number }>
    ) => {
      state.map((item) => {
        if (action.payload.id === item.id) {
          item.timeCounter = action.payload.timeCounter;
        }
        return item;
      });
    },
    updateTrackerItemPlayStatus: (
      state,
      action: PayloadAction<{ id: string; playStatus: boolean }>
    ) => {
      state.map((item) => {
        if (action.payload.id === item.id) {
          item.playStatus = action.payload.playStatus;
        }
        return item;
      });
    },
    updateTrackerItemLastPlayTimestamp: (
      state,
      action: PayloadAction<{ id: string; lastPlayTimestamp: number }>
    ) => {
      state.map((item) => {
        if (action.payload.id === item.id) {
          item.lastPlayTimestamp = action.payload.lastPlayTimestamp;
        }
        return item;
      });
    },
  },
});

export const addTrackerItemDataAndUpdateLocalStorage = (
  payload: TrackerItemData
) => {
  return function addTrackerItemDataAndLocalStorageThunk(
    dispatch: AppDispatch
  ) {
    dispatch(addTrackerItemData(payload));
    localStorage.setItem(
      payload.id,
      JSON.stringify({
        name: payload.name,
        timeCounter: payload.timeCounter,
        playStatus: payload.playStatus,
        lastPlayTimestamp: payload.lastPlayTimestamp,
      })
    );
  };
};

export const removeTrackerItemDataAndUpdateLocalStorage = (id: string) => {
  return function removeTrackerItemDataAndLocalStorageThunk(
    dispatch: AppDispatch
  ) {
    dispatch(removeTrackerItemData(id));
    localStorage.removeItem(id);
  };
};

export const updateTrackerItemTimeCounterAndLocalStorage = ({
  id,
  timeCounter,
}: {
  id: string;
  timeCounter: number;
}) => {
  return function updateTrackerItemTimeCounterAndLocalStorageThunk(
    dispatch: AppDispatch
  ) {
    dispatch(updateTrackerItemTimeCounter({ id, timeCounter }));
    const item = JSON.parse(localStorage.getItem(id)!);
    item.timeCounter = timeCounter;
    localStorage.setItem(id, JSON.stringify(item));
  };
};

export const updateTrackerItemPlayStatusAndLocalStorage = ({
  id,
  playStatus,
}: {
  id: string;
  playStatus: boolean;
}) => {
  return function updateTrackerItemPlayStatusAndLocalStorageThunk(
    dispatch: AppDispatch
  ) {
    dispatch(updateTrackerItemPlayStatus({ id, playStatus }));
    const item = JSON.parse(localStorage.getItem(id)!);
    item.playStatus = playStatus;
    localStorage.setItem(id, JSON.stringify(item));
  };
};

export const updateTrackerItemLastPlayTimestampAndLocalStorage = ({
  id,
  lastPlayTimestamp,
}: {
  id: string;
  lastPlayTimestamp: number;
}) => {
  return function updateTrackerItemLastPlayTimestampAndLocalStorageThunk(
    dispatch: AppDispatch
  ) {
    dispatch(updateTrackerItemLastPlayTimestamp({ id, lastPlayTimestamp }));
    const item = JSON.parse(localStorage.getItem(id)!);
    item.lastPlayTimestamp = lastPlayTimestamp;
    localStorage.setItem(id, JSON.stringify(item));
  };
};

export const {
  addTrackerItemData,
  removeTrackerItemData,
  updateTrackerItemTimeCounter,
  updateTrackerItemPlayStatus,
  updateTrackerItemLastPlayTimestamp,
} = trackerItemsDataSlice.actions;

export const selectTrackerItemsData = (state: RootState) =>
  state.trackerItemsData;

export default trackerItemsDataSlice.reducer;
