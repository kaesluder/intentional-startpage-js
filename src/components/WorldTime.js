import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import './WorldTime.css';
import WorldTimeConfig from './WorldTimeConfig';

const timeFormat = 'HH:mm ZZZZZ';

const WorldTime = function (props) {
  const [timeState, setTimeState] = useState(DateTime.utc());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeState(DateTime.utc());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Generate a list element from zoneString containing
  // current time.
  const listElement = function (zoneString) {
    return (
      <li key={zoneString} className="is-family-monospace">
        {timeState.setZone(zoneString).toFormat(timeFormat)}
      </li>
    );
  };

  return (
    <div>
      <div className="menu">
        <h3 className="menu-label">{props.title}</h3>
        <ul className="menu-list">{props.ClockList.map(listElement)}</ul>
      </div>
      <WorldTimeConfig ClockList={props.ClockList} />
    </div>
  );
};

export default WorldTime;
