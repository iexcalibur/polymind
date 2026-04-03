import type { ReferenceInfo } from '@blocksuite/polymind-model';
import type { PolymindTextAttributes } from '@blocksuite/polymind-shared/types';
import type { BlockStdScope } from '@blocksuite/std';
import type { InlineEditor, InlineRange } from '@blocksuite/std/inline';

import { ReferencePopup } from './reference-popup';

export function toggleReferencePopup(
  std: BlockStdScope,
  docTitle: string,
  referenceInfo: ReferenceInfo,
  inlineEditor: InlineEditor<PolymindTextAttributes>,
  inlineRange: InlineRange,
  abortController: AbortController
): ReferencePopup {
  const popup = new ReferencePopup();
  popup.std = std;
  popup.docTitle = docTitle;
  popup.referenceInfo = referenceInfo;
  popup.inlineEditor = inlineEditor;
  popup.inlineRange = inlineRange;
  popup.abortController = abortController;

  document.body.append(popup);

  return popup;
}
