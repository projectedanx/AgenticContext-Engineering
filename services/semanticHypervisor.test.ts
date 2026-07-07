import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SemanticHypervisor } from './semanticHypervisor';

describe('SemanticHypervisor', () => {
  let hypervisor: SemanticHypervisor;

  beforeEach(() => {
    hypervisor = new SemanticHypervisor();
    // Spy on console to keep test output clean and verify logging
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should successfully acquire a lock when none exists', () => {
    const status = hypervisor.acquireLock('/src/App.tsx', 'VORTEX-ARCHITECT', 'Preventing concurrent AST mutation');
    expect(status).toBe('ACQUIRED');

    const lock = hypervisor.checkLock('/src/App.tsx');
    expect(lock).toBeDefined();
    expect(lock?.agentId).toBe('VORTEX-ARCHITECT');
  });

  it('should deny a lock request if already held by another agent', () => {
    hypervisor.acquireLock('/src/App.tsx', 'VORTEX-ARCHITECT', 'Preventing concurrent AST mutation');

    const status = hypervisor.acquireLock('/src/App.tsx', 'SYMBIONT-PRIME', 'Injecting symbiosis hooks');
    expect(status).toBe('DENIED');
  });

  it('should successfully release a lock if requested by the owner', () => {
    hypervisor.acquireLock('/src/App.tsx', 'VORTEX-ARCHITECT', 'Preventing concurrent AST mutation');

    const releaseStatus = hypervisor.releaseLock('/src/App.tsx', 'VORTEX-ARCHITECT');
    expect(releaseStatus).toBe('RELEASED');

    const lock = hypervisor.checkLock('/src/App.tsx');
    expect(lock).toBeUndefined();
  });

  it('should deny lock release if requested by a non-owner agent', () => {
    hypervisor.acquireLock('/src/App.tsx', 'VORTEX-ARCHITECT', 'Preventing concurrent AST mutation');

    const releaseStatus = hypervisor.releaseLock('/src/App.tsx', 'SYMBIONT-PRIME');
    expect(releaseStatus).toBe('DENIED');

    const lock = hypervisor.checkLock('/src/App.tsx');
    expect(lock).toBeDefined();
    expect(lock?.agentId).toBe('VORTEX-ARCHITECT');
  });

  it('should clear all active locks during an emergency override', () => {
    hypervisor.acquireLock('/src/App.tsx', 'VORTEX-ARCHITECT', 'Lock 1');
    hypervisor.acquireLock('/src/main.tsx', 'SYMBIONT-PRIME', 'Lock 2');

    expect(hypervisor.checkLock('/src/App.tsx')).toBeDefined();
    expect(hypervisor.checkLock('/src/main.tsx')).toBeDefined();

    hypervisor.emergencyClearLocks();

    expect(hypervisor.checkLock('/src/App.tsx')).toBeUndefined();
    expect(hypervisor.checkLock('/src/main.tsx')).toBeUndefined();
  });
});
