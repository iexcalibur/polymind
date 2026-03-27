import { FlexWrapper } from '@affine/component';
import { ExplorerDisplayMenuButton } from '@affine/core/components/explorer/display-menu';
import { ViewToggle } from '@affine/core/components/explorer/display-menu/view-toggle';
import { ExplorerNavigation } from '@affine/core/components/explorer/header/navigation';
import type { ExplorerDisplayPreference } from '@affine/core/components/explorer/types';
import { Header } from '@affine/core/components/pure/header';

import * as styles from './index.css';

export type SpaceViewMode = 'list' | 'canvas';

export const SpaceDetailHeader = ({
  displayPreference,
  onDisplayPreferenceChange,
  viewMode,
  onViewModeChange,
}: {
  displayPreference: ExplorerDisplayPreference;
  onDisplayPreferenceChange: (pref: ExplorerDisplayPreference) => void;
  viewMode: SpaceViewMode;
  onViewModeChange: (mode: SpaceViewMode) => void;
}) => {
  return (
    <Header
      left={<ExplorerNavigation active="spaces" />}
      right={
        <FlexWrapper gap={16} alignItems="center">
          {/* List / Canvas mode toggle */}
          <div className={styles.modeToggle}>
            <button
              className={styles.modeToggleButton}
              data-active={viewMode === 'list'}
              onClick={() => onViewModeChange('list')}
            >
              List
            </button>
            <button
              className={styles.modeToggleButton}
              data-active={viewMode === 'canvas'}
              onClick={() => onViewModeChange('canvas')}
            >
              Canvas
            </button>
          </div>
          {/* Only show explorer display options in list mode */}
          {viewMode === 'list' && (
            <>
              <ViewToggle
                view={displayPreference.view ?? 'list'}
                onViewChange={view => {
                  onDisplayPreferenceChange({ ...displayPreference, view });
                }}
              />
              <ExplorerDisplayMenuButton
                displayPreference={displayPreference}
                onDisplayPreferenceChange={onDisplayPreferenceChange}
              />
            </>
          )}
        </FlexWrapper>
      }
    />
  );
};
