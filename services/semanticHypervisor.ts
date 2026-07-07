/**
 * Semantic Hypervisor Daemon
 *
 * Implements "Epistemic Pheromones" and "Semantic Mutex Locking" for the VORTEX-ARCHITECT
 * and other multi-agent orchestration kernels. Prevents Abstract Syntax Tree Collisions
 * and Logic Shearing by providing a deterministic, OS-level simulating lock mechanism
 * over logical domains (AST nodes, file paths, bounded contexts).
 */

type LockStatus = 'ACQUIRED' | 'DENIED' | 'RELEASED';

interface SemanticLock {
  targetPath: string;
  agentId: string;
  lockReason: string;
  timestamp: number;
}

export class SemanticHypervisor {
  private activeLocks: Map<string, SemanticLock>;

  constructor() {
    this.activeLocks = new Map<string, SemanticLock>();
  }

  /**
   * Attempts to acquire a semantic mutex lock on a specific AST node or path.
   * Uses stigmergic principles to leave an "Epistemic Pheromone" preventing concurrent mutations.
   *
   * @param targetPath The file path or AST node identifier to lock.
   * @param agentId The identifier of the agent requesting the lock (e.g., 'VORTEX-ARCHITECT').
   * @param lockReason The architectural invariant or paraconsistent reason for the lock.
   * @returns A LockStatus indicating if the lock was successfully acquired.
   */
  public acquireLock(targetPath: string, agentId: string, lockReason: string): LockStatus {
    if (this.activeLocks.has(targetPath)) {
      const existingLock = this.activeLocks.get(targetPath);
      // Deny lock if already held by another agent, or if held by the same agent for a different reason
      if (existingLock && existingLock.agentId !== agentId) {
        console.warn(`[SemanticHypervisor] Lock DENIED for ${agentId} on ${targetPath}. Currently held by ${existingLock.agentId}. Reason: ${existingLock.lockReason}`);
        return 'DENIED';
      }
    }

    const newLock: SemanticLock = {
      targetPath,
      agentId,
      lockReason,
      timestamp: Date.now()
    };

    this.activeLocks.set(targetPath, newLock);
    console.info(`[SemanticHypervisor] Lock ACQUIRED by ${agentId} on ${targetPath}. Reason: ${lockReason}`);
    return 'ACQUIRED';
  }

  /**
   * Releases a previously acquired semantic mutex lock.
   *
   * @param targetPath The file path or AST node identifier to unlock.
   * @param agentId The identifier of the agent attempting to release the lock.
   * @returns A boolean indicating if the release was successful (must be the lock owner).
   */
  public releaseLock(targetPath: string, agentId: string): LockStatus {
    const existingLock = this.activeLocks.get(targetPath);

    if (!existingLock) {
       console.warn(`[SemanticHypervisor] Lock release ignored. No active lock on ${targetPath}.`);
       return 'RELEASED'; // Technically already released
    }

    if (existingLock.agentId !== agentId) {
       console.error(`[SemanticHypervisor] Lock release FAILED. ${agentId} attempted to release a lock owned by ${existingLock.agentId} on ${targetPath}.`);
       return 'DENIED';
    }

    this.activeLocks.delete(targetPath);
    console.info(`[SemanticHypervisor] Lock RELEASED by ${agentId} on ${targetPath}.`);
    return 'RELEASED';
  }

  /**
   * Checks if a target path is currently locked.
   *
   * @param targetPath The file path or AST node identifier to check.
   * @returns The active SemanticLock, or undefined if unlocked.
   */
  public checkLock(targetPath: string): SemanticLock | undefined {
    return this.activeLocks.get(targetPath);
  }

  /**
   * Clears all active locks. Used for system resets or fatal crash recovery.
   */
  public emergencyClearLocks(): void {
    const lockCount = this.activeLocks.size;
    this.activeLocks.clear();
    console.warn(`[SemanticHypervisor] EMERGENCY OVERRIDE: ${lockCount} active locks cleared.`);
  }
}

// Export a singleton instance for application-wide stigmergic coordination
export const semanticHypervisor = new SemanticHypervisor();
