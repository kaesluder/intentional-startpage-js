import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { update } from 'ramda';
import './WorldTimeConfig.css';

const WorldTimeConfig = function (props) {
  const [configFormState, setConfigFormState] = useState(props.ClockList);

  // wire up onChange
  const handleFormChange = function (event) {
    console.log(event.target.name, event.target.value);
    const fieldIndex = parseInt(event.target.name.match(/\d+/)[0]);
    setConfigFormState((configFormState) =>
      update(fieldIndex, event.target.value, configFormState)
    );
  };

  const createTextField = function (timeZone, i) {
    return (
      <div key={i}>
        <input
          type="text"
          value={timeZone}
          data-testid="WorldTimeEdit"
          key={`WorldTimeEdit[${i}]`}
          name={`WorldTimeEdit[${i}]`}
          onChange={handleFormChange}
        />
      </div>
    );
  };

  const genEditFields = function (ClockList) {
    return ClockList.map((tz, i) => createTextField(tz, i));
  };

  return (
    <div>
      <form>{genEditFields(configFormState)}</form>
    </div>
  );
};

export default WorldTimeConfig;
