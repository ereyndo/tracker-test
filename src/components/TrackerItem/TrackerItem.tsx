import styles from './trackerItem.module.scss';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type TrackerItemProps = {};

export const TrackerItem = () => {
  return (
    <div className={styles.trackerItem}>
      <p>Some name</p>
      <div className={styles.trackerItemRightSide}>
        <p className={styles.timeInfo}>00:12:12</p>
        <div className={styles.buttonContainer}>
          <PauseCircleOutlineIcon
            className={styles.button}
            aria-label="pause tracker"
          />
          <RemoveCircleOutlineIcon
            className={`${styles.button} ${styles.removeButton}`}
            aria-label="delete tracker"
          />
        </div>
      </div>
    </div>
  );
};
