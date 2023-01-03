import React from 'react';
import { render, screen } from '@testing-library/react';
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
