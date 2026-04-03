import { Button, notify, Skeleton } from '@affine/component';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { type ReactNode, useMemo } from 'react';

import { IntegrationSettingHeader } from '../setting';
import MCPIcon from './MCP.inline.svg';
import * as styles from './setting-panel.css';

export const McpServerSettingPanel = () => {
  return <McpServerSetting />;
};

const McpServerSettingHeader = ({ action }: { action?: ReactNode }) => {
  const t = useI18n();

  return (
    <IntegrationSettingHeader
      icon={<img src={MCPIcon} />}
      name={t['com.affine.integration.mcp-server.name']()}
      desc={t['com.affine.integration.mcp-server.desc']()}
      action={action}
    />
  );
};

const McpServerSetting = () => {
  const workspaceService = useService(WorkspaceService);
  const workspaceName = useLiveData(workspaceService.workspace.name$);
  const t = useI18n();

  const code = useMemo(() => {
    return JSON.stringify(
      {
        mcpServers: {
          [`affine_workspace_${workspaceService.workspace.id}`]: {
            type: 'streamable-http',
            url: `${location.origin}/api/workspaces/${workspaceService.workspace.id}/mcp`,
            note: `Read docs from AFFiNE workspace "${workspaceName}"`,
          },
        },
      },
      null,
      2
    );
  }, [workspaceName, workspaceService]);

  return (
    <div>
      <McpServerSettingHeader />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Server Config</div>
          <Button
            variant="primary"
            onClick={() => {
              if (!code) return;
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              navigator.clipboard.writeText(code);
              notify.success({
                title: t['Copied to clipboard'](),
              });
            }}
          >
            Copy json
          </Button>
        </div>
        <pre className={styles.preArea}>{code}</pre>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Support tools</div>
        </div>
        <br />

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>doc-read</div>
          </div>
          <div className={styles.sectionDescription}>
            Return the complete text and basic metadata of a single document
            identified by docId; use this when the user needs the full content
            of a specific file rather than a search result.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>doc-semantic-search</div>
          </div>
          <div className={styles.sectionDescription}>
            Retrieve conceptually related passages by performing vector-based
            semantic similarity search across embedded documents; use this tool
            only when exact keyword search fails or the user explicitly needs
            meaning-level matches (e.g., paraphrases, synonyms, broader
            concepts, recent documents).
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>doc-keyword-search</div>
          </div>
          <div className={styles.sectionDescription}>
            Fuzzy search all workspace documents for the exact keyword or phrase
            supplied and return passages ranked by textual match. Use this tool
            by default whenever a straightforward term-based or keyword-base
            lookup is sufficient.
          </div>
        </div>
      </div>
    </div>
  );
};
