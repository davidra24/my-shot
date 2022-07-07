import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import '../styles/loader.css';

export const Loader = () => {
  const [completed, setCompleted] = useState(0);

  useInterval(() => {
    if (completed === 112) {
      setCompleted(0);
    } else {
      setCompleted(completed + 1);
    }
  }, 35);

  return (
    <div id='container-loader'>
      <div id='loader'>
        <div id='lemon'></div>
        <div id='straw'></div>
        <div id='glass'>
          <div id='cubes'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div
            id='drink'
            style={{
              top: `${100 - completed * 0.9}%`
            }}
          ></div>
          <span id='counter'></span>
        </div>
        <div id='coaster'></div>
      </div>
    </div>
  );
};
