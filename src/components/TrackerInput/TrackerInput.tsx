import styles from './trackerInput.module.scss';
import { mdiPlayCircle } from '@mdi/js';
import Icon from '@mdi/react';

type TrackerInputProps = {};

export const TrackerInput = () => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.inputField}
        aria-label="enter tracker name"
        placeholder="Enter tracker name"
      />
      <Icon
        path={mdiPlayCircle}
        className={styles.addIcon}
        aria-label="launch new tracker"
      />
    </div>
  );
};
