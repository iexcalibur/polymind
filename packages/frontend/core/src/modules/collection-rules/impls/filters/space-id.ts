import type { DocsService } from '@affine/core/modules/doc';
import { Service } from '@toeverything/infra';
import { map, type Observable } from 'rxjs';

import type { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';

/**
 * Filters docs by their `spaceId` property.
 *
 * Used to:
 * - Exclude system canvas docs (`spaceId === '__system__'`) from All Docs
 * - Show only docs belonging to a specific Space
 */
export class SpaceIdFilterProvider extends Service implements FilterProvider {
  constructor(private readonly docsService: DocsService) {
    super();
  }

  filter$(params: FilterParams): Observable<Set<string>> {
    const method = params.method as 'is' | 'is-not';

    return this.docsService.propertyValues$('spaceId').pipe(
      map(values => {
        const match = new Set<string>();
        for (const [id, value] of values) {
          const matches =
            method === 'is' ? value === params.value : value !== params.value;
          if (matches) match.add(id);
        }
        return match;
      })
    );
  }
}
