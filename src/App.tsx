import styles from './app.module.scss';
import { TrackerInput } from './components/TrackerInput';
import { TrackerItem } from './components/TrackerItem';
import { useAppSelector } from './hooks/reduxHooks';
import { selectTrackerItemsData } from './slices/trackerItemsDataSlice';

export const App = () => {
  const trackerItemsData = useAppSelector(selectTrackerItemsData);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>tracker</h1>
      <TrackerInput />
      {trackerItemsData.map((itemData) => (
        <TrackerItem
          key={itemData.id}
          identifier={itemData.id}
          name={itemData.name}
          initialPlayStatus={itemData.playStatus}
          initialTimeCounter={itemData.timeCounter}
        />
      ))}
    </div>
  );
};
