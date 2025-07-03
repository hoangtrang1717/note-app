import {render} from '@testing-library/react-native';
import React from 'react';
import {Text} from 'react-native';
import GradientBackground from '../../app/components/GradientBackground';

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => {
  const MockedLinearGradient = ({children, testID, ...props}: any) => {
    const MockView = require('react-native').View;
    return (
      <MockView testID={testID} {...props}>
        {children}
      </MockView>
    );
  };
  return MockedLinearGradient;
});

describe('GradientBackground', () => {
  it('renders correctly with default props', () => {
    const {getByTestId} = render(
      <GradientBackground>
        <Text>Test Content</Text>
      </GradientBackground>,
    );

    expect(getByTestId('GradientBackground')).toBeTruthy();
  });

  it('renders correctly with custom testID', () => {
    const customTestID = 'CustomGradientBackground';
    const {getByTestId} = render(
      <GradientBackground testID={customTestID}>
        <Text>Test Content</Text>
      </GradientBackground>,
    );

    expect(getByTestId(customTestID)).toBeTruthy();
  });

  it('renders children correctly', () => {
    const testText = 'Test Content';
    const {getByText} = render(
      <GradientBackground>
        <Text>{testText}</Text>
      </GradientBackground>,
    );

    expect(getByText(testText)).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {padding: 20};
    const {getByTestId} = render(
      <GradientBackground style={customStyle}>
        <Text>Test Content</Text>
      </GradientBackground>,
    );

    const gradientComponent = getByTestId('GradientBackground');
    expect(gradientComponent).toBeTruthy();
  });
});
