import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio Error Boundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('din_portfolio_data_v1');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">
              Something went wrong while rendering
            </h2>
            
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              An unexpected issue occurred. You can restore the clean default state of the SQA portfolio and reload the page.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <span>Reset to Clean Default Data</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
