import styles from './trackerInput.module.scss';
import { mdiPlayCircle } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTrackerItemDataAndUpdateLocalStorage } from '../../slices/trackerItemsDataSlice';
import moment from 'moment';
import { TrackerItemData } from '../../models';

type TrackerInputProps = {};

export const TrackerInput = () => {
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const addTrackerOnEnterHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTrackerHandler();
    }
  };

  const addTrackerHandler = () => {
    const currentPlayTimestamp = moment().valueOf();
    const trackerId = currentPlayTimestamp.toString();
    const trackerName = input ? input : `No name tracker #${trackerId}`;
    const trackerItemData: TrackerItemData = {
      id: trackerId,
      name: trackerName,
      timeCounter: 0,
      playStatus: true,
      lastPlayTimestamp: currentPlayTimestamp,
    };

    dispatch(addTrackerItemDataAndUpdateLocalStorage(trackerItemData));
    setInput('');
  };

  return (
    <div className={styles.trackerInput}>
      <input
        type="text"
        className={styles.trackerInput__inputField}
        aria-label="enter tracker name"
        placeholder="Enter tracker name"
        value={input}
        onChange={inputChangeHandler}
        onKeyUp={addTrackerOnEnterHandler}
      />
      <a
        className={styles.trackerInput__addIcon}
        aria-label="launch new tracker"
        onClick={addTrackerHandler}
      >
        <Icon path={mdiPlayCircle} />
      </a>
    </div>
  );
};
