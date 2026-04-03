import { AFFINE_DOC_REMOTE_SELECTION_WIDGET } from './doc';
import { PolymindDocRemoteSelectionWidget } from './doc/doc-remote-selection';
import {
  AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET,
  EdgelessRemoteSelectionWidget,
} from './edgeless';

export function effects() {
  customElements.define(
    AFFINE_DOC_REMOTE_SELECTION_WIDGET,
    PolymindDocRemoteSelectionWidget
  );
  customElements.define(
    AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET,
    EdgelessRemoteSelectionWidget
  );
}
