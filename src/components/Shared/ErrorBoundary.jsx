import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Structured, sanitized logging without exposing personal or security tokens
    console.error('[Sunvine Error Boundary Caught]:', {
      message: error?.message || 'Unknown render error',
      componentStack: errorInfo?.componentStack?.slice(0, 300),
      timestamp: new Date().toISOString()
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F9FF] text-[#181C20] flex items-center justify-center p-4 sm:p-6 font-sans">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 text-center flex flex-col items-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[32px]">warning</span>
            </div>

            <h2 className="text-xl font-bold font-headline text-slate-900 tracking-tight">
              Application Encountered an Issue
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              We encountered an unexpected interface error. Your cached quotations and configuration data are safe.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Return to Home
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#6CBF3D] hover:bg-[#5EAB34] text-white text-xs font-semibold shadow-md shadow-[#6CBF3D]/20 transition-all cursor-pointer"
              >
                Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
