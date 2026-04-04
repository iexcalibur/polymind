import { AIChatBlockSchema } from '@polymind/core/blockmind/ai/blocks/ai-chat-block/model';
import { TranscriptionBlockSchema } from '@polymind/core/blockmind/ai/blocks/transcription-block/model';
import { PolymindSchemas } from '@blockmind/polymind/schemas';
import { Schema } from '@blockmind/polymind/store';

let _schema: Schema | null = null;
export function getPolyMindWorkspaceSchema() {
  if (!_schema) {
    _schema = new Schema();

    _schema.register([
      ...PolymindSchemas,
      AIChatBlockSchema,
      TranscriptionBlockSchema,
    ]);

    // Register legacy 'affine:*' flavour aliases for backward compatibility
    // so that imported documents with old flavour names can be loaded
    for (const [flavour] of _schema.flavourSchemaMap) {
      if (flavour.startsWith('polymind:')) {
        const legacyFlavour = 'affine:' + flavour.slice('polymind:'.length);
        _schema.registerAliases({ [legacyFlavour]: flavour });
      }
    }
  }

  return _schema;
}
