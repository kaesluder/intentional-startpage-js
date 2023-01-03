import React from 'react';
import { find, assoc, propEq, findIndex, update, partial } from 'ramda';
import { render, screen } from '@testing-library/react';
import { App, findWidgetByid, replaceWidget } from './App';

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

describe('App Functions', () => {
  test('Find Widget by ID Returns Found Widget', async () => {
    const result1 = findWidgetByid('Bookmarks1', config);
    const result2 = findWidgetByid('clocks1', config);
    expect(result1.title).toBe('Comms');
    expect(result2.title).toBe('Clocks');
  });
  test('Find Widget empty list returns undefined', async () => {
    const result1 = findWidgetByid('Bookmarks1', []);
    expect(result1).toBeUndefined();
  });
  test('Find Widget bad field returns undefined', async () => {
    const result1 = findWidgetByid('null', config);
    expect(result1).toBeUndefined();
  });

  test('Replace widget returns new widget list', async () => {
    const newWidget = { id: 'Bookmarks1', title: 'Test Me!' };
    const result1 = replaceWidget(newWidget, config);
    expect(result1[0].title).toBe('Test Me!');
    expect(result1[0]).toMatchObject(newWidget);
  });

  test('Replace widget returns undefined on invalid input', async () => {
    const newWidget = { id: 'bogusghth', title: 'Test Me Momma!' };
    const result1 = replaceWidget(newWidget, config);
    expect(result1).toBeUndefined();
  });
});
