import React, { useState } from 'react';
import { find, assoc, propEq, findIndex, update, partial } from 'ramda';
import 'bulma/css/bulma.min.css';
import PageHeading from './components/PageHeading';
import WorldTime from './components/WorldTime';

/* 
Ramda documentation: https://ramdajs.com/
 */

// Default widget spec.
const config = [
  {
    widget: 'bookmarks',
    title: 'Comms',
    id: 'Bookmarks1',
    'bookmark-list': [
      { url: 'https://app.fastmail.com', text: 'fastmail' },
      { url: 'https://discord.com/channels/@me', text: 'discord' },
    ],
  },
  {
    widget: 'bookmarks',
    title: 'Comms',
    id: 'Bookmarks2',
    'bookmark-list': [
      { url: 'https://app.fastmail.com', text: 'fastmail' },
      { url: 'https://discord.com/channels/@me', text: 'discord' },
    ],
  },
  {
    widget: 'clocks',
    id: 'clocks1',
    title: 'Clocks',
    clockList: ['America/New_York', 'America/Los_Angeles'],
  },
  {
    widget: 'weather',
    id: 'test-weather',
    title: 'Weather',
    latitude: 40.73,
    longitude: -74.0,
    'hour-intervals': 4,
    'total-hours': 25,
  },
];
const latitude = 40.73;
const longitude = -74.0;

// Pull pageHeadingText from local storage, or use default.
const pageHeadingText = localStorage.getItem('pageHeadingText')
  ? localStorage.getItem('pageHeadingText')
  : 'Hello World!';

// findWidgetByid: searches through a widgetList and returns the
// widget with id.
// Arguments:
// id: string
// configList: list of widget spec objects
//
// Returns:
// widgetSpec (object)
const findWidgetByid = (id, widgetList) => find(propEq('id', id), widgetList);

// replaceWidget: Replaces an existing widget in widgetList with a
// new widget with matching id.
// Arguments:
// newWidget: widgetSpec object
// widgetList: list of widgetSpec objects
//
// Returns:
// modified copy of original widgetList
const replaceWidget = function (newWidget, widgetList) {
  const index = findIndex(propEq('id', newWidget.id), widgetList);

  // findIndex returns -1 on failure.
  // Check before update.
  if (index >= 0) {
    return update(index, newWidget, widgetList);
  } else {
    return undefined;
  }
};

function App() {
  const [pageHeadingState, setPageHeading] = useState(pageHeadingText);

  // set the page heading text to newText and
  // save state to localStorage.
  const pageHeadingEditHandler = function (newText) {
    setPageHeading(newText);
    localStorage.setItem('pageHeadingText', newText);
  };

  const [configState, setConfigState] = useState(config);

  /*
  handleClockEdit: callback function for editing exiting clocks.
  Arguments: 
  id: string id
  clockList: list of timeZone strings
  
  Modifies: state and localLocal storage. Triggers redraw of clock widgets.
  */
  const handleClockEdit = function (id, clockList) {
    console.log(`handleClockEdit: ${id}`);
    const newWidgetSpec = assoc(
      'clockList',
      clockList,
      findWidgetByid(id, configState)
    );

    // sanity check, only setConfigState if the above was successful.
    if (newWidgetSpec) {
      // curry replaceWidget and pass to setConfigState
      setConfigState(partial(replaceWidget, [newWidgetSpec]));
    }
  };

  return (
    <div>
      <PageHeading
        pageHeadingState={pageHeadingState}
        setter={pageHeadingEditHandler}
      ></PageHeading>
      <WorldTime
        widgetSpec={configState[2]} // test function
        handleClockEdit={handleClockEdit}
      />
    </div>
  );
}

// export helper apps so that we can test with jest
export { App, config, findWidgetByid, replaceWidget };
