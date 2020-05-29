import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useStatus() {
  const [status, setStatus] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(true);

  useEffect(() => {
    if (updateStatus) {
      axios.get('/status')
        .then(response => setStatus(response.data.status))
        .catch(_ => setStatus('error'));

      setUpdateStatus(false);
    }

    if (intervalId === null) {
      setIntervalId(setInterval(() => setUpdateStatus(true), 5000));
    }
  }, [updateStatus]);
  return status || 'error';
}
