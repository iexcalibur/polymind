import { Button, Menu } from '@polymind/component';
import { SettingHeader } from '@polymind/component/setting-components';
import { useWorkspaceInfo } from '@polymind/core/components/hooks/use-workspace-info';
import { WorkspacePropertyManager } from '@polymind/core/components/properties/manager';
import { CreatePropertyMenuItems } from '@polymind/core/components/properties/menu/create-doc-property';
import type { DocCustomPropertyInfo } from '@polymind/core/modules/db';
import { WorkspaceService } from '@polymind/core/modules/workspace';
import { Trans, useI18n } from '@polymind/i18n';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useCallback } from 'react';

import * as styles from './styles.css';

const WorkspaceSettingPropertiesMain = () => {
  const t = useI18n();

  const onCreated = useCallback((_property: DocCustomPropertyInfo) => {}, []);

  const onPropertyInfoChange = useCallback(
    (_property: DocCustomPropertyInfo, _field: string) => {},
    []
  );

  return (
    <div className={styles.main}>
      <div className={styles.listHeader}>
        <Menu items={<CreatePropertyMenuItems onCreated={onCreated} />}>
          <Button variant="primary">
            {t['com.polymind.settings.workspace.properties.add_property']()}
          </Button>
        </Menu>
      </div>
      <WorkspacePropertyManager onPropertyInfoChange={onPropertyInfoChange} />
    </div>
  );
};

export const WorkspaceSettingProperties = () => {
  const t = useI18n();
  const workspace = useService(WorkspaceService).workspace;
  const workspaceInfo = useWorkspaceInfo(workspace);
  const title = workspaceInfo?.name || 'untitled';

  if (workspace === null) {
    return null;
  }

  return (
    <FrameworkScope scope={workspace.scope}>
      <SettingHeader
        title={t['com.polymind.settings.workspace.properties.header.title']()}
        subtitle={
          <Trans
            values={{
              name: title,
            }}
            i18nKey="com.polymind.settings.workspace.properties.header.subtitle"
          >
            Manage workspace <strong>name</strong> properties
          </Trans>
        }
      />
      <WorkspaceSettingPropertiesMain />
    </FrameworkScope>
  );
};
