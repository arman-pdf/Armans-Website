import React from 'react';

// Catches render errors so one failing part never blanks the whole page.
export default class ErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Visible in the browser console to help diagnose on any device.
    console.error('[portfolio]', error);
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
