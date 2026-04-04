import { PolymindSchemas } from '@blocksuite/polymind/schemas';
import { Schema, Text, type Workspace } from '@blocksuite/polymind/store';
import { ZipTransformer } from '@blocksuite/polymind/widgets/linked-doc';
export async function affineSnapshot(collection: Workspace, id: string) {
  const doc = collection.createDoc(id);
  doc.load();
  const store = doc.getStore();
  // Add root block and surface block at root level
  const rootId = store.addBlock('polymind:page', {
    title: new Text('Polymind Snapshot Test'),
  });
  store.addBlock('polymind:surface', {}, rootId);

  const path = '/apps/starter/data/snapshots/affine-default.zip';
  const response = await fetch(path);
  const file = await response.blob();
  const schema = new Schema();
  schema.register(PolymindSchemas);
  await ZipTransformer.importDocs(collection, schema, file);
}

affineSnapshot.id = 'affine-snapshot';
affineSnapshot.displayName = 'Polymind Snapshot Test';
affineSnapshot.description = 'Polymind Snapshot Test';
