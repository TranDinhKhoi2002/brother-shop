import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = React.memo(function Backdrop({ isVisible, onHideSidebar }) {
  const cssClasses = [styles.Backdrop, isVisible ? styles.BackdropOpen : styles.BackdropClosed];

  return <div onClick={onHideSidebar} className={cssClasses.join(' ')}></div>;
});

export default Backdrop;
