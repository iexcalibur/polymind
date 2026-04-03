import {
  type DropTargetDropEvent,
  type DropTargetOptions,
  useDropTarget,
} from '@polymind/component';
import type { PolymindDNDData } from '@polymind/core/types/dnd';
import { useI18n } from '@polymind/i18n';

import { EmptyNodeChildren } from '../../layouts/empty-node-children';
import { draggedOverHighlight } from './empty.css';

export const FolderEmpty = ({
  canDrop,
  onDrop,
}: {
  onDrop?: (data: DropTargetDropEvent<PolymindDNDData>) => void;
  canDrop?: DropTargetOptions<PolymindDNDData>['canDrop'];
}) => {
  const { dropTargetRef } = useDropTarget(
    () => ({
      onDrop,
      canDrop,
    }),
    [onDrop, canDrop]
  );

  const t = useI18n();
  return (
    <EmptyNodeChildren ref={dropTargetRef} className={draggedOverHighlight}>
      {t['com.polymind.rootAppSidebar.organize.empty-folder']()}
    </EmptyNodeChildren>
  );
};
