import { type DropTargetDropEvent, useDropTarget } from '@polymind/component';
import type { PolymindDNDData } from '@polymind/core/types/dnd';
import { useI18n } from '@polymind/i18n';

import { EmptyNodeChildren } from '../../layouts/empty-node-children';

export const Empty = ({
  onDrop,
}: {
  onDrop: (data: DropTargetDropEvent<PolymindDNDData>) => void;
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
      {t['com.polymind.rootAppSidebar.tags.no-doc']()}
    </EmptyNodeChildren>
  );
};
