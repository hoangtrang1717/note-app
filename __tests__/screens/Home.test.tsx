import {describe, it} from '@jest/globals';
import React from 'react';
import 'react-native';
import Home from '../../app/screens/Home';
import {render} from '../../app/utils/test-utils';

describe('Home Screen', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<Home />, {});
    expect(getByTestId('Screen.Home')).toBeTruthy();
  });

  it('displays welcome message', () => {
    const {getByText} = render(<Home />, {});
    expect(getByText('Welcome back!')).toBeTruthy();
    expect(getByText("Here's what you've been working on")).toBeTruthy();
  });

  it('displays recently created notes section', () => {
    const {getByText} = render(<Home />, {});
    expect(getByText('Recently created notes')).toBeTruthy();
  });
});
