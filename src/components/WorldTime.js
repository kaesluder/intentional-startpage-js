import React, { useState } from 'react';
import { DateTime } from 'luxon';
import './WorldTime.css';

const timeFormat = 'HH:mm ZZZZZ';

const WorldTime = function (props) {
  // Generate a list element from zoneString containing
  // current time.
  const listElement = function (zoneString) {
    return (
      <li key={zoneString} className="is-family-monospace">
        {DateTime.utc().setZone(zoneString).toFormat(timeFormat)}
      </li>
    );
  };

  return (
    <div className="menu">
      <h3 className="menu-label">{props.title}</h3>
      <ul className="menu-list">{props.ClockList.map(listElement)}</ul>
    </div>
  );
};

export default WorldTime;
