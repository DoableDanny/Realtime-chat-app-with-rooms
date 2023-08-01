import { C8CoverageProvider } from './provider.js';
import 'node:inspector';
import 'vitest/coverage';
import 'vitest';
import 'vitest/node';

declare const _default: {
    getProvider(): Promise<C8CoverageProvider>;
    startCoverage(): void;
    takeCoverage(): Promise<unknown>;
    stopCoverage(): void;
};

export { _default as default };
