import styles from './trackerItem.module.scss';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  removeTrackerItemDataAndUpdateLocalStorage,
  updateTrackerItemLastPlayTimestampAndLocalStorage,
  updateTrackerItemPlayStatusAndLocalStorage,
  updateTrackerItemTimeCounterAndLocalStorage,
} from '../../slices/trackerItemsDataSlice';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment as any);

type TrackerItemProps = {
  identifier: string;
  name: string;
  initialPlayStatus: boolean;
  initialTimeCounter: number;
};

export const TrackerItem = ({
  identifier,
  name,
  initialPlayStatus,
  initialTimeCounter,
}: TrackerItemProps) => {
  const [timeCounter, setTimeCounter] = useState<number>(initialTimeCounter);
  const [playStatus, setPlayStatus] = useState<boolean>(initialPlayStatus);
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    updateTrackerItemPlayStatus();
    if (playStatus) {
      updateTrackerItemLastPlayTimestamp();
      setIntervalAndRef();
    } else {
      updateTrackerItemTimeCounter();
    }

    return cleanupOnPlayStatusChange;
  }, [playStatus]);

  const iterateInterval = () => {
    setTimeCounter((oldTimeDifference) => oldTimeDifference + 1000);
  };

  const setIntervalAndRef = () => {
    const intervalId = setInterval(iterateInterval, 1000);
    intervalRef.current = intervalId;
  };

  const cleanupOnPlayStatusChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    setPlayStatus((lastPlayStatus) => !lastPlayStatus);
  };

  const removeTrackerItem = () => {
    dispatch(removeTrackerItemDataAndUpdateLocalStorage(identifier));
  };

  const updateTrackerItemTimeCounter = () => {
    dispatch(
      updateTrackerItemTimeCounterAndLocalStorage({
        id: identifier,
        timeCounter,
      })
    );
  };

  const updateTrackerItemPlayStatus = () => {
    dispatch(
      updateTrackerItemPlayStatusAndLocalStorage({
        id: identifier,
        playStatus,
      })
    );
  };

  const updateTrackerItemLastPlayTimestamp = () => {
    dispatch(
      updateTrackerItemLastPlayTimestampAndLocalStorage({
        id: identifier,
        lastPlayTimestamp: moment().valueOf(),
      })
    );
  };

  return (
    <div
      className={`
      ${styles.trackerItem} 
      ${!playStatus ? styles.trackerItem_paused : ''}
      `}
    >
      <p>{name}</p>
      <div className={styles.trackerItem__rightSide}>
        <p className={styles.trackerItem__timeInfo}>
          {moment.duration(timeCounter, 'milliseconds').format('HH:mm:ss', {
            trim: false,
          })}
        </p>
        <div className={styles.trackerItem__buttonContainer}>
          {playStatus ? (
            <PauseCircleOutlineIcon
              className={styles.trackerItem__button}
              aria-label="pause tracker"
              onClick={togglePlay}
            />
          ) : (
            <PlayCircleOutlineIcon
              className={styles.trackerItem__button}
              aria-label="resume tracker"
              onClick={togglePlay}
            />
          )}
          <RemoveCircleOutlineIcon
            className={`${styles.trackerItem__button} ${styles.trackerItem__removeButton}`}
            aria-label="delete tracker"
            onClick={removeTrackerItem}
          />
        </div>
      </div>
    </div>
  );
};
