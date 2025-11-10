import type { Signal } from '../entities';
import type { SignalsRepository } from '../repositories';

type Params = {
  pair?: string;
  limit?: number;
};

export class GetSignalsHistoryUseCase {
  constructor(private readonly signalsRepository: SignalsRepository) {}

  execute(params: Params = {}): Promise<Signal[]> {
    if (params.pair) {
      return this.signalsRepository.getByPair(params.pair, params.limit);
    }
    return this.signalsRepository.getRecent(params.limit);
  }
}
