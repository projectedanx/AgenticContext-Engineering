export interface ActiveStateVector {
  dataSensitivity: number;
  actionImpact: number;
  toolchainEntropy: number;
  intentDivergence: number;
  contextualRisk: number;
}

export type TriageVerdict = 'QUARANTINE' | 'OVERRIDE' | 'TERMINATE';

export interface BreachRecord {
  breach_id: string;
  timestamp: string;
  agent_id: string;
  misuse_score: number;
  traceback_path: string[];
  triage_verdict: TriageVerdict | null;
}

export class LatticeBreakerHarness {
  private readonly misuseThreshold = 0.80;
  private readonly baselineCentroid: ActiveStateVector = {
    dataSensitivity: 0.1,
    actionImpact: 0.1,
    toolchainEntropy: 0.1,
    intentDivergence: 0.1,
    contextualRisk: 0.1,
  };
  private breachLog: BreachRecord[] = [];

  /**
   * Calculates the Euclidean distance between the active state vector and the normal baseline centroid.
   */
  public calculateMisuseScore(vAction: ActiveStateVector): number {
    const sumSquares =
      Math.pow(vAction.dataSensitivity - this.baselineCentroid.dataSensitivity, 2) +
      Math.pow(vAction.actionImpact - this.baselineCentroid.actionImpact, 2) +
      Math.pow(vAction.toolchainEntropy - this.baselineCentroid.toolchainEntropy, 2) +
      Math.pow(vAction.intentDivergence - this.baselineCentroid.intentDivergence, 2) +
      Math.pow(vAction.contextualRisk - this.baselineCentroid.contextualRisk, 2);

    const distance = Math.sqrt(sumSquares);
    // Normalize mapping (this is a simplified mapping for the harness)
    // Assume max theoretical distance scales to ~1.0 or higher. We clamp at 1.0.
    const normalizedScore = Math.min(distance / (Math.sqrt(5) * 0.8), 1.0);
    return normalizedScore;
  }

  /**
   * Synchronous Gated Interception. Evaluates the action and halts if it breaches the threshold.
   */
  public evaluateAction(
    agentId: string,
    vAction: ActiveStateVector,
    tracebackPath: string[]
  ): { isBreach: boolean; misuseScore: number; record?: BreachRecord } {
    const misuseScore = this.calculateMisuseScore(vAction);

    if (misuseScore >= this.misuseThreshold) {
      // Gated Checkpoint Halt triggered
      const record: BreachRecord = {
        breach_id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        agent_id: agentId,
        misuse_score: misuseScore,
        traceback_path: tracebackPath,
        triage_verdict: null, // Awaiting HITL Triage
      };
      this.breachLog.push(record);
      return { isBreach: true, misuseScore, record };
    }

    // Proceed Step
    return { isBreach: false, misuseScore };
  }

  public resolveBreach(breachId: string, verdict: TriageVerdict): void {
      const breach = this.breachLog.find(b => b.breach_id === breachId);
      if (breach) {
          breach.triage_verdict = verdict;
      }
  }

  public getBreachLogs(): BreachRecord[] {
      return this.breachLog;
  }
}

export const latticeBreaker = new LatticeBreakerHarness();
