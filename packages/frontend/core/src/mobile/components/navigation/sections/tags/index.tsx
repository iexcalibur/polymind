import { NavigationPanelTreeRoot } from '@polymind/core/desktop/components/navigation-panel';
import { NavigationPanelService } from '@polymind/core/modules/navigation-panel';
import { TagService } from '@polymind/core/modules/tag';
import { useI18n } from '@polymind/i18n';
import { AddTagIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';

import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelTagNode } from '../../nodes/tag';
import { TagRenameDialog } from '../../nodes/tag/dialog';

export const TagDesc = ({ input }: { input: string }) => {
  const t = useI18n();

  return input
    ? t['com.polymind.m.explorer.tag.new-tip-not-empty']({ value: input })
    : t['com.polymind.m.explorer.tag.new-tip-empty']();
};

export const NavigationPanelTags = () => {
  const { tagService, navigationPanelService } = useServices({
    TagService,
    NavigationPanelService,
  });
  const path = useMemo(() => ['tags'], []);
  const tags = useLiveData(tagService.tagList.tags$);
  const [showNewTagDialog, setShowNewTagDialog] = useState(false);

  const t = useI18n();

  const handleNewTag = useCallback(
    (name: string, color: string) => {
      setShowNewTagDialog(false);
      tagService.tagList.createTag(name, color);
      navigationPanelService.setCollapsed(path, false);
    },
    [navigationPanelService, path, tagService]
  );

  return (
    <CollapsibleSection
      path={path}
      title={t['com.polymind.rootAppSidebar.tags']()}
    >
      <NavigationPanelTreeRoot>
        {tags.map(tag => (
          <NavigationPanelTagNode
            key={tag.id}
            tagId={tag.id}
            parentPath={path}
          />
        ))}
        <AddItemPlaceholder
          icon={<AddTagIcon />}
          data-testid="navigation-panel-add-tag-button"
          onClick={() => setShowNewTagDialog(true)}
          label={t[
            'com.polymind.rootAppSidebar.explorer.tag-section-add-tooltip'
          ]()}
        />
        <TagRenameDialog
          open={showNewTagDialog}
          onOpenChange={setShowNewTagDialog}
          onConfirm={handleNewTag}
          enableAnimation
          descRenderer={TagDesc}
        />
      </NavigationPanelTreeRoot>
    </CollapsibleSection>
  );
};
