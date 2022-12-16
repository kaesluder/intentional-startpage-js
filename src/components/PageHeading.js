import React, { useState } from 'react';
import './PageHeading.css';

const PageHeading = function (props) {
  const [stateClass, setStateClass] = useState('state-display');

  const toggleStateClass = function (e) {
    console.log('toggleStateClass ' + stateClass);
    if (stateClass === 'state-edit') {
      setStateClass('state-display');
    } else {
      setStateClass('state-edit');
    }
  };

  const localEditHandler = function (e) {
    console.log('localEditHandler: ' + e.target.value);
    const newText = e.target.value;
    props.setter(newText);
    toggleStateClass(e);
  };

  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <h1 className="title">
          <span className={stateClass}>{props.pageHeadingState}</span>
          <input
            id="headerEdit"
            type="text"
            className={stateClass}
            defaultValue={props.pageHeadingState}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                localEditHandler(event);
              }
            }}
          />
          <button className="button is-primary" onClick={toggleStateClass}>
            ✎
          </button>
        </h1>
      </div>
    </section>
  );
};

export default PageHeading;
