import type { ReactToLit } from '@polymind/component';
import type { PolymindReference } from '@blocksuite/polymind/inlines/reference';
import { ReferenceNodeConfigExtension } from '@blocksuite/polymind/inlines/reference';
import type { ExtensionType } from '@blocksuite/polymind/store';

export type ReferenceReactRenderer = (
  reference: PolymindReference
) => React.ReactElement;

export function patchReferenceRenderer(
  reactToLit: ReactToLit,
  reactRenderer: ReferenceReactRenderer
): ExtensionType {
  const customContent = (reference: PolymindReference) => {
    const node = reactRenderer(reference);
    return reactToLit(node, true);
  };

  return ReferenceNodeConfigExtension({
    customContent,
    hidePopup: BUILD_CONFIG.isMobileEdition,
  });
}
