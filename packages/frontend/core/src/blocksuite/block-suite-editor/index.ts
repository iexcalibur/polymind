import { registerAIEditorEffects } from '@polymind/core/blocksuite/ai/effects/editor';
import { editorEffects } from '@polymind/core/blocksuite/editors';

import { registerTemplates } from './register-templates';

editorEffects();
registerAIEditorEffects();
registerTemplates();

export * from './blocksuite-editor';
