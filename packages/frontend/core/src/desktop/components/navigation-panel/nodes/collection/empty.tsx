import { type DropTargetDropEvent, useDropTarget } from '@polymind/component';
import type { AffineDNDData } from '@polymind/core/types/dnd';
import { useI18n } from '@polymind/i18n';

import { EmptyNodeChildren } from '../../layouts/empty-node-children';

export const Empty = ({
  onDrop,
}: {
  onDrop: (data: DropTargetDropEvent<AffineDNDData>) => void;
}) => {
  const { dropTargetRef } = useDropTarget(
    () => ({
      onDrop,
    }),
    [onDrop]
  );
  const t = useI18n();
  return (
    <EmptyNodeChildren ref={dropTargetRef}>
      {t['com.polymind.collection.emptyCollection']()}
    </EmptyNodeChildren>
  );
};
