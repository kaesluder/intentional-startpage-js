import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import './PageHeading.css';
import WorldTime from './WorldTime';

describe('WorldTime', () => {
  test('Renders Clocks', () => {
    // Act
    render(
      <WorldTime
        widgetSpec={{
          widget: 'clocks',
          id: 'clocks1',
          title: 'Clocks',
          clockList: ['America/New_York', 'America/Los_Angeles'],
        }}
      />
    );

    // Assert
    //expect(screen.getByText('Clocks')).toBeInTheDocument();
    expect(screen.getByText(/Eastern/)).toBeInTheDocument();
    expect(screen.getByText(/Pacific/)).toBeInTheDocument();
  });
});
