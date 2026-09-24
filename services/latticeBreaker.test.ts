import { describe, it, expect, beforeEach } from 'vitest';
import { LatticeBreakerHarness, ActiveStateVector } from './latticeBreaker';

describe('LatticeBreakerHarness', () => {
  let harness: LatticeBreakerHarness;

  beforeEach(() => {
    harness = new LatticeBreakerHarness();
  });

  it('should allow laminar actions (Score < 0.80)', () => {
    const vAction: ActiveStateVector = {
      dataSensitivity: 0.2,
      actionImpact: 0.2,
      toolchainEntropy: 0.15,
      intentDivergence: 0.1,
      contextualRisk: 0.1,
    };

    const result = harness.evaluateAction('agent-1', vAction, ['read_db']);
    expect(result.isBreach).toBe(false);
    expect(result.misuseScore).toBeLessThan(0.80);
  });

  it('should trigger Gated Checkpoint Halt for high-risk actions (Score >= 0.80)', () => {
    const vAction: ActiveStateVector = {
      dataSensitivity: 0.9,
      actionImpact: 0.9,
      toolchainEntropy: 0.85,
      intentDivergence: 0.8,
      contextualRisk: 0.9,
    };

    const result = harness.evaluateAction('agent-1', vAction, ['read_db', 'escalate_privilege', 'delete_records']);
    expect(result.isBreach).toBe(true);
    expect(result.misuseScore).toBeGreaterThanOrEqual(0.80);
    expect(result.record).toBeDefined();
    expect(result.record?.triage_verdict).toBeNull();
  });

  it('should resolve escrow state with deterministic triage', () => {
     const vAction: ActiveStateVector = {
      dataSensitivity: 0.9,
      actionImpact: 0.9,
      toolchainEntropy: 0.85,
      intentDivergence: 0.8,
      contextualRisk: 0.9,
    };

    const result = harness.evaluateAction('agent-1', vAction, ['attack_vector']);
    expect(result.record).toBeDefined();

    const breachId = result.record!.breach_id;
    harness.resolveBreach(breachId, 'TERMINATE');

    const logs = harness.getBreachLogs();
    const updatedBreach = logs.find(b => b.breach_id === breachId);
    expect(updatedBreach?.triage_verdict).toBe('TERMINATE');
  });
});
