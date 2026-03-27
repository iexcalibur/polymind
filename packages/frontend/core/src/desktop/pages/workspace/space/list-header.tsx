import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { PageListNewPageButton } from '@affine/core/components/page-list';
import type { Space } from '@affine/core/modules/space';
import { SpaceService } from '@affine/core/modules/space';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { FolderIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';

import * as styles from './index.css';

export const SpaceListHeader = ({ space }: { space: Space }) => {
  const { spaceService, workspaceService } = useServices({
    SpaceService,
    WorkspaceService,
  });
  const name = useLiveData(space.name$);
  const workspace = workspaceService.workspace;
  const { createPage } = usePageHelper(workspace.docCollection);

  const handleCreateDoc = () => {
    const newDoc = createPage();
    spaceService.addDocToSpace(newDoc.id, space.id);
  };

  return (
    <header className={styles.spaceHeader}>
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbItem}>
          <WorkbenchLink to="/spaces" className={styles.breadcrumbLink}>
            All Spaces
          </WorkbenchLink>
        </div>
        <div className={styles.breadcrumbSeparator}>/</div>
        <div className={styles.breadcrumbItem} data-active={true}>
          <FolderIcon className={styles.breadcrumbIcon} />
          {name}
        </div>
      </div>

      <div className={styles.headerActions}>
        <PageListNewPageButton
          size="small"
          data-testid="space-new-page-button"
          onCreateDoc={handleCreateDoc}
          onCreateEdgeless={handleCreateDoc}
          onCreatePage={handleCreateDoc}
        >
          <div className={styles.newPageButtonText}>New Page</div>
        </PageListNewPageButton>
      </div>
    </header>
  );
};
