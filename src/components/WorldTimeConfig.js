import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { update, all, reject } from 'ramda';
import './WorldTimeConfig.css';

const isTimeZoneValid = function (tzString) {
  return DateTime.local().setZone(tzString).isValid;
};

const WorldTimeConfig = function (props) {
  const [configFormState, setConfigFormState] = useState(props.ClockList);

  // wire up onChange
  const handleFormChange = function (event) {
    // console.log(event.target.name, event.target.value);
    const fieldIndex = parseInt(event.target.name.match(/\d+/)[0]);
    setConfigFormState((configFormState) =>
      update(fieldIndex, event.target.value, configFormState)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate time zones before changing anything
    if (all(isTimeZoneValid, configFormState)) {
      props.handleClockEdit(props.id, configFormState);
    } else {
      // display a list of time zones that are not valid.
      const invalids = reject(isTimeZoneValid, configFormState);
      alert(`invalid time zones: ${invalids.join(', ')}`);
    }
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
      <form onSubmit={handleSubmit}>
        {genEditFields(configFormState)}
        <input type="submit" value="Add Task"></input>
      </form>
    </div>
  );
};

export default WorldTimeConfig;
