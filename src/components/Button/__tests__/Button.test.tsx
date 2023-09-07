import {fireEvent, render} from '@testing-library/react-native';
import Button from '../Button';
import React = require('react');

describe('Button', () => {
  it('Should render correctly', () => {
    const {getByTestId} = render(<Button label="" onPress={jest.fn()} />);

    expect(getByTestId('button')).toBeDefined();
  });

  it('Should render loader when loading', () => {
    const {getByTestId} = render(
      <Button label="" onPress={jest.fn()} loading />,
    );

    expect(getByTestId('button-loading')).toBeDefined();
  });

  it('Should call given onPress when clicked', () => {
    const mockOnPress = jest.fn();
    const {getByTestId} = render(<Button label="" onPress={mockOnPress} />);

    const button = getByTestId('button');

    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('Should render given label', () => {
    const {getByText} = render(
      <Button label="mock-label" onPress={jest.fn()} />,
    );

    expect(getByText('mock-label')).toBeDefined();
  });

  it('Should accept custom touchable props', () => {
    const {getByTestId} = render(
      <Button label="" onPress={jest.fn()} testID="mock-test-id" />,
    );

    expect(getByTestId('mock-test-id')).toBeDefined();
  });
});
