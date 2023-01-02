import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import PageHeading from './components/PageHeading';
import WorldTime from './components/WorldTime';

const config = [
  {
    widget: 'bookmarks',
    title: 'Comms',
    'bookmark-list': [
      { url: 'https://app.fastmail.com', text: 'fastmail' },
      { url: 'https://discord.com/channels/@me', text: 'discord' },
    ],
  },
  {
    widget: 'bookmarks',
    title: 'Comms',
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

function App() {
  const [pageHeadingState, setPageHeading] = useState(pageHeadingText);
  const pageHeadingEditHandler = function (newText) {
    console.log('pageHeadingEditHandler: ' + newText);
    setPageHeading(newText);
    localStorage.setItem('pageHeadingText', newText);
  };
  return (
    <div>
      <PageHeading
        pageHeadingState={pageHeadingState}
        setter={pageHeadingEditHandler}
      ></PageHeading>
      <WorldTime widgetSpec={config[2]} />
    </div>
  );
}

export default App;
