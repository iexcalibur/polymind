import { builtInTemplates as builtInEdgelessTemplates } from '@polymind/templates/edgeless';
import { builtInTemplates as builtInStickersTemplates } from '@polymind/templates/stickers';
import {
  EdgelessTemplatePanel,
  type TemplateManager,
} from '@blocksuite/polymind/gfx/template';

export function registerTemplates() {
  EdgelessTemplatePanel.templates.extend(
    builtInStickersTemplates as TemplateManager
  );
  EdgelessTemplatePanel.templates.extend(
    builtInEdgelessTemplates as TemplateManager
  );
}
