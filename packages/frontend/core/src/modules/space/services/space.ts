import { LiveData, ObjectPool, Service } from '@toeverything/infra';
import { map } from 'rxjs';

import type { DocPropertiesStore } from '../../doc/stores/doc-properties';
import { Space } from '../entities/space';
import type { SpaceStore } from '../stores/space';

export class SpaceService extends Service {
  constructor(
    private readonly store: SpaceStore,
    private readonly docPropertiesStore: DocPropertiesStore
  ) {
    super();
  }

  pool = new ObjectPool<string, Space>({
    onDelete(obj) {
      obj.dispose();
    },
  });

  /**
   * All Spaces as a reactive list
   */
  readonly spaces$ = LiveData.from(
    this.store.watchAllSpaces$().pipe(
      map(records =>
        records.map(record => {
          const existing = this.pool.get(record.id);
          if (existing) {
            return existing.obj;
          }
          const space = this.framework.createEntity(Space, { id: record.id });
          this.pool.put(record.id, space);
          return space;
        })
      )
    ),
    [] as Space[]
  );

  /**
   * Root Spaces only (no parent)
   */
  readonly rootSpaces$ = LiveData.from(
    this.store.watchRootSpaces$().pipe(
      map(records =>
        records.map(record => {
          const existing = this.pool.get(record.id);
          if (existing) {
            return existing.obj;
          }
          const space = this.framework.createEntity(Space, { id: record.id });
          this.pool.put(record.id, space);
          return space;
        })
      )
    ),
    [] as Space[]
  );

  /**
   * Child Spaces of a given parent
   */
  childSpaces$(parentId: string) {
    return LiveData.from(
      this.store.watchChildSpaces$(parentId).pipe(
        map(records =>
          records.map(record => {
            const existing = this.pool.get(record.id);
            if (existing) {
              return existing.obj;
            }
            const space = this.framework.createEntity(Space, {
              id: record.id,
            });
            this.pool.put(record.id, space);
            return space;
          })
        )
      ),
      [] as Space[]
    );
  }

  space$(id: string): LiveData<Space | undefined> {
    return this.spaces$.selector(spaces => spaces.find(s => s.id === id));
  }

  createSpace(name: string, parentSpaceId?: string): string {
    return this.store.createSpace(name, parentSpaceId);
  }

  deleteSpace(id: string) {
    // Cascade-delete child spaces
    const children = this.childSpaces$(id).value;
    for (const child of children) {
      this.deleteSpace(child.id);
    }
    this.store.deleteSpace(id);
  }

  /**
   * Returns the doc IDs belonging to a given Space.
   * Reads spaceId from docProperties and filters by the given Space ID.
   */
  getSpaceDocIds$(spaceId: string) {
    return LiveData.from(
      this.docPropertiesStore.watchPropertyAllValues('spaceId').pipe(
        map(allValues => {
          const docIds: string[] = [];
          for (const [docId, value] of allValues.entries()) {
            if (value === spaceId) {
              docIds.push(docId);
            }
          }
          return docIds;
        })
      ),
      [] as string[]
    );
  }

  /**
   * Assign a doc to a Space by setting its spaceId property.
   */
  addDocToSpace(docId: string, spaceId: string) {
    this.docPropertiesStore.updateDocProperties(docId, { spaceId });
  }

  /**
   * Remove a doc from its Space.
   */
  removeDocFromSpace(docId: string) {
    this.docPropertiesStore.updateDocProperties(docId, {
      spaceId: undefined,
    });
  }
}
