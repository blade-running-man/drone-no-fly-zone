import { Outlet } from 'react-router-dom';
import * as styles from './DefaultLayout.css';

function DefaultLayout() {
  return (
    <main className={styles.mainContainer}>
      <Outlet />
    </main>
  );
}

export default DefaultLayout;
