import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import './PageHeading.css';
import WorldTimeConfig from './WorldTimeConfig';

describe('WorldTimeConfig', () => {
  test('Renders Form', async () => {
    // Act
    render(
      <WorldTimeConfig
        ClockList={['America/New_York', 'America/Los_Angeles']}
      />
    );

    // Assert

    expect(await screen.findAllByTestId('WorldTimeEdit')).toHaveLength(2);
  });
});
