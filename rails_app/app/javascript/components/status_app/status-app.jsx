import React from 'react';
import useStatus from './check-status-hook/use-status';
import styles from './styles.module.css';

export default function StatusApp() {
  const status = useStatus();
  const className = styles[status];

  return (
    <div className={styles.container}>
      The server is <span className={className}>{ status }</span>
    </div>
  );
}
