import {render} from '@testing-library/react-native';
import React from 'react';
import {HomeScreen} from '../HomeScreen';

describe('HomeScreen', () => {
  it('Should render correctly', () => {
    const {getByTestId} = render(<HomeScreen />);
    expect(getByTestId('home-screen')).toBeDefined();
  });

  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(946684800000);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('Should contain current date', async () => {
      const {getByText} = render(<HomeScreen />);

      expect(getByText('Jan 01, 2000')).toBeDefined();
    });

    it('Should contain current day', () => {
      const {getByText} = render(<HomeScreen />);

      expect(getByText('Saturday')).toBeDefined();
    });
  });
});
