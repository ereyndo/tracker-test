import styles from './app.module.scss';
import { TrackerInput } from './components/TrackerInput';
import { TrackerItem } from './components/TrackerItem';

export const App = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>tracker</h1>
      <TrackerInput />
      <TrackerItem />
    </div>
  );
};
