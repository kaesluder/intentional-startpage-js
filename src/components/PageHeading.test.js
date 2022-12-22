import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PageHeading from './PageHeading';
import './PageHeading.css';

describe('PageHeading', () => {
  test('Renders PageHeadingState', () => {
    // Act
    render(
      <PageHeading
        pageHeadingState="Hello, World!"
        setter={(e) => console.log(e)}
      />
    );

    // Assert
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('edit form initially hidden', () => {
    render(
      <PageHeading
        pageHeadingState="Hello, World!"
        setter={(e) => console.log(e)}
      />
    );
    const hiddenInput = screen.getByTestId('headerEdit');
    expect(hiddenInput).toHaveClass('state-display');
  });

  test('edit form revealed after click', async () => {
    render(
      <PageHeading
        pageHeadingState="Hello, World!"
        setter={(e) => console.log(e)}
      />
    );
    const button = screen.getByTestId('revealEditForm');
    await fireEvent.click(button);
    const hiddenInput = screen.getByTestId('headerEdit');
    expect(hiddenInput).toHaveClass('state-edit');
  });

  test('edit form triggers setter function', async () => {
    const setter = jest.fn();

    render(<PageHeading pageHeadingState="Hello, World!" setter={setter} />);
    const hiddenInput = screen.getByTestId('headerEdit');
    await fireEvent.keyDown(hiddenInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });
    expect(setter).toHaveBeenCalledTimes(1);
  });
});
