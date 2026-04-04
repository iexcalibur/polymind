import { registerAIEditorEffects } from '@polymind/core/blockmind/ai/effects/editor';
import { editorEffects } from '@polymind/core/blockmind/editors';

import { registerTemplates } from './register-templates';

editorEffects();
registerAIEditorEffects();
registerTemplates();

export * from './blockmind-editor';
