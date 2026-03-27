import { Entity, LiveData } from '@toeverything/infra';

import type { SpaceRecord, SpaceStore } from '../stores/space';

export class Space extends Entity<{ id: string }> {
  constructor(private readonly store: SpaceStore) {
    super();
  }

  id = this.props.id;

  private readonly record$ = LiveData.from<SpaceRecord | null>(
    this.store.watchSpace$(this.id),
    null
  );

  name$ = this.record$.map(r => r?.name ?? '');
  index$ = this.record$.map(r => r?.index ?? '');

  rename(name: string) {
    this.store.updateSpace(this.id, { name });
  }

  delete() {
    this.store.deleteSpace(this.id);
  }
}
