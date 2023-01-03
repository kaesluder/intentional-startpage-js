import React, { useState } from 'react';
import { find, assoc, propEq, findIndex, update, partial } from 'ramda';
import 'bulma/css/bulma.min.css';
import PageHeading from './components/PageHeading';
import WorldTime from './components/WorldTime';

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

const pageHeadingText = localStorage.getItem('pageHeadingText')
  ? localStorage.getItem('pageHeadingText')
  : 'Hello World!';

const findWidgetByid = (id, xs) => find(propEq('id', id), xs);

const replaceWidget = function (newWidget, widgetList) {
  const index = findIndex(propEq('id', newWidget.id), widgetList);

  if (index >= 0) {
    return update(index, newWidget, widgetList);
  } else {
    return undefined;
  }
};

function App() {
  const [pageHeadingState, setPageHeading] = useState(pageHeadingText);
  const pageHeadingEditHandler = function (newText) {
    console.log('pageHeadingEditHandler: ' + newText);
    setPageHeading(newText);
    localStorage.setItem('pageHeadingText', newText);
  };

  const [configState, setConfigState] = useState(config);

  const handleClockEdit = function (id, clockList) {
    console.log(`handleClockEdit: ${id}`);
    const newWidgetSpec = assoc(
      'clockList',
      clockList,
      findWidgetByid(id, configState)
    );

    // sanity check, only seConfigState if the above was successful.
    if (newWidgetSpec) {
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
        widgetSpec={configState[2]}
        handleClockEdit={handleClockEdit}
      />
    </div>
  );
}

export { App, config, findWidgetByid, replaceWidget };
