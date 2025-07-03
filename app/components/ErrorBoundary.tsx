import React, {Component, ErrorInfo, ReactNode} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, TEXT_STYLES} from '../constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({hasError: false, error: undefined});
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            An unexpected error occurred. Please try again.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={this.handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.title,
    color: COLORS.WHITE,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE_70,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: COLORS.ACCENT_PINK,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE,
  },
});

export default ErrorBoundary;
