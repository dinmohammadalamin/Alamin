import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

interface TestScenario {
  id: string;
  name: string;
  tool: string;
  type: string;
  duration: string;
  testsCount: number;
  steps: {
    name: string;
    assertion: string;
    ms: number;
  }[];
}

const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'e2e-checkout',
    name: 'E2E Checkout & Payment Gateway',
    tool: 'Playwright + TypeScript',
    type: 'UI & Workflow E2E',
    duration: '1.24s',
    testsCount: 6,
    steps: [
      { name: 'Navigate to storefront & select product', assertion: 'expect(page).toHaveTitle(/Storefront/)', ms: 180 },
      { name: 'Add SKU-4091 to cart with coupon code', assertion: 'expect(cartBadge).toHaveText("1")', ms: 210 },
      { name: 'Fill customer shipping address & validate zip code', assertion: 'expect(addressForm).toBeValid()', ms: 190 },
      { name: 'Select Stripe test gateway token (tok_visa)', assertion: 'expect(paymentFrame).toBeVisible()', ms: 240 },
      { name: 'Submit order & verify webhook callback', assertion: 'expect(orderStatus).toBe("Confirmed")', ms: 220 },
      { name: 'Verify order confirmation email dispatched', assertion: 'expect(mailQueue).toContain(orderId)', ms: 200 }
    ]
  },
  {
    id: 'api-auth',
    name: 'REST API Auth & Payload Validation',
    tool: 'Postman / Newman Collection',
    type: 'Backend Contract & Security',
    duration: '0.86s',
    testsCount: 5,
    steps: [
      { name: 'POST /api/v1/auth/login with valid credentials', assertion: 'pm.response.to.have.status(200)', ms: 140 },
      { name: 'Verify JWT payload schema and expiry > 3600s', assertion: 'pm.expect(token.exp).to.be.above(now)', ms: 110 },
      { name: 'GET /api/v1/user/profile with Bearer Token', assertion: 'pm.response.to.have.status(200)', ms: 180 },
      { name: 'POST /api/v1/transfer negative balance injection', assertion: 'pm.response.to.have.status(400)', ms: 220 },
      { name: 'Verify rate limiter kicks in after 100 req/min', assertion: 'pm.response.to.have.status(429)', ms: 210 }
    ]
  },
  {
    id: 'performance-jmeter',
    name: 'JMeter Concurrent Load Benchmark',
    tool: 'Apache JMeter / BlazeMeter',
    type: 'Performance & Stress Testing',
    duration: '1.58s',
    testsCount: 4,
    steps: [
      { name: 'Warm up 1,000 virtual users across 3 thread groups', assertion: 'Throughput >= 650 RPS', ms: 320 },
      { name: 'Stress catalog search endpoint under peak concurrency', assertion: '95th percentile latency < 350ms', ms: 420 },
      { name: 'Execute concurrent cart checkout transactions', assertion: 'HTTP error rate = 0.00%', ms: 440 },
      { name: 'Cool down threads & aggregate response times', assertion: 'Heap memory usage stable (< 60%)', ms: 400 }
    ]
  }
];

export const InteractiveTestLab: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<TestScenario>(TEST_SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startTestRun = () => {
    setIsRunning(true);
    setIsCompleted(false);
    setCurrentStepIndex(0);
    setLogs([`[INIT] Starting test suite: ${selectedScenario.name}`, `[ENV] Runner: ${selectedScenario.tool}`]);
  };

  const resetRun = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setCurrentStepIndex(-1);
    setLogs([]);
  };

  useEffect(() => {
    if (!isRunning || currentStepIndex < 0) return;

    if (currentStepIndex < selectedScenario.steps.length) {
      const step = selectedScenario.steps[currentStepIndex];
      const timer = setTimeout(() => {
        setLogs(prev => [
          ...prev,
          `  ✓ [PASS] ${step.name} (${step.ms}ms) -> ${step.assertion}`
        ]);
        setCurrentStepIndex(prev => prev + 1);
      }, step.ms);
      return () => clearTimeout(timer);
    } else {
      // Completed all steps
      setIsRunning(false);
      setIsCompleted(true);
      setLogs(prev => [
        ...prev,
        `[SUCCESS] All ${selectedScenario.steps.length} test assertions passed!`,
        `[SUMMARY] Tests: ${selectedScenario.testsCount} passed, 0 failed | Time: ${selectedScenario.duration} | Quality Gate: 100% OK`
      ]);
    }
  }, [isRunning, currentStepIndex, selectedScenario]);

  return (
    <section id="test-lab" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>LIVE DEMONSTRATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Interactive SQA Automation Lab
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm">
            Experience how Din engineers, runs, and monitors automated quality gates. Choose a scenario below and launch live test validation!
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>

        {/* Lab Container */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl">
          
          {/* Top Scenario Selector Tabs */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-slate-800">
            {TEST_SCENARIOS.map(sc => (
              <button
                key={sc.id}
                onClick={() => {
                  if (!isRunning) {
                    setSelectedScenario(sc);
                    resetRun();
                  }
                }}
                disabled={isRunning}
                className={`flex-1 min-w-[220px] p-4 rounded-2xl text-left border transition-all ${
                  selectedScenario.id === sc.id
                    ? 'bg-slate-950 border-emerald-500/50 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-950/80 text-slate-400'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-1">
                  <span>{sc.type}</span>
                  <span className="text-slate-500">{sc.duration}</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">{sc.name}</div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-slate-400" />
                  <span>{sc.tool}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Test Runner Controls & Status */}
          <div className="py-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {!isRunning && !isCompleted && (
                <button
                  id="run-test-suite-btn"
                  onClick={startTestRun}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Run {selectedScenario.name}</span>
                </button>
              )}

              {isRunning && (
                <button
                  disabled
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-sm cursor-wait"
                >
                  <span className="inline-block w-3 h-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                  <span>Executing Test Assertions...</span>
                </button>
              )}

              {isCompleted && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Quality Gate Passed (0 Defect)</span>
                  </div>
                  <button
                    onClick={startTestRun}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rerun</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Est. Time: {selectedScenario.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Target: 100% Pass</span>
              </div>
            </div>
          </div>

          {/* Test Steps Progress & Terminal View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Step Checkpoints List */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 flex items-center justify-between">
                <span>Test Execution Pipeline</span>
                <span>{selectedScenario.steps.length} Assertions</span>
              </div>
              {selectedScenario.steps.map((step, idx) => {
                const isPassed = currentStepIndex > idx || isCompleted;
                const isCurrent = currentStepIndex === idx && isRunning;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${
                      isPassed
                        ? 'bg-emerald-500/5 border-emerald-500/30 text-slate-200'
                        : isCurrent
                        ? 'bg-slate-950 border-teal-500 text-white shadow-md ring-1 ring-teal-500/30'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="inline-block w-4 h-4 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-400">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-200">{step.name}</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5 truncate">
                        {step.assertion}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0">
                      {step.ms}ms
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Live Terminal Output Console */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs preserve-terminal">
                {/* Console Bar */}
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-slate-300">qa-console // test-runner.log</span>
                  </div>
                  <span className="text-[10px] text-slate-400">stdout</span>
                </div>

                {/* Logs Body */}
                <div className="p-4 h-72 overflow-y-auto space-y-1.5 text-slate-300 leading-relaxed select-text">
                  {logs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                      <Terminal className="w-8 h-8 text-slate-800 mb-2" />
                      <p>Lab runner idle. Click "Run {selectedScenario.name}" to initiate execution.</p>
                    </div>
                  ) : (
                    logs.map((line, i) => (
                      <div
                        key={i}
                        className={`${
                          line.includes('[PASS]')
                            ? 'text-emerald-400'
                            : line.includes('[SUCCESS]')
                            ? 'text-cyan-300 font-bold bg-cyan-950/20 p-1 rounded'
                            : line.includes('[INIT]')
                            ? 'text-slate-400'
                            : 'text-slate-300'
                        }`}
                      >
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
