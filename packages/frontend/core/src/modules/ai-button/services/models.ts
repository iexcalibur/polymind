import {
  createSignalFromObservable,
  type Signal,
} from '@blocksuite/polymind/shared/utils';
import { signal } from '@preact/signals-core';
import { LiveData, Service } from '@toeverything/infra';

import type { GlobalStateService } from '../../storage';

const AI_MODEL_ID_KEY = 'AIModelId';

export interface AIModel {
  name: string;
  id: string;
  version: string;
  category: string;
  isPro: boolean;
  isDefault: boolean;
}

export class AIModelService extends Service {
  modelId: Signal<string | undefined>;

  models: Signal<AIModel[]> = signal([]);

  private readonly modelId$ = LiveData.from(
    this.globalStateService.globalState.watch<string>(AI_MODEL_ID_KEY),
    undefined
  );

  constructor(private readonly globalStateService: GlobalStateService) {
    super();

    const { signal: modelId, cleanup } = createSignalFromObservable<
      string | undefined
    >(this.modelId$, undefined);
    this.modelId = modelId;
    this.disposables.push(cleanup);
  }

  resetModel = () => {
    this.globalStateService.globalState.set(AI_MODEL_ID_KEY, undefined);
  };

  setModel = (modelId: string) => {
    this.globalStateService.globalState.set(AI_MODEL_ID_KEY, modelId);
  };
}
