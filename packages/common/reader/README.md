# PolyMind Blocksuite format YDoc reader

## Usage

### read rootYDoc

```ts
import { readAllDocsFromRootDoc } from '@polymind/reader';

const docs = readAllDocsFromRootDoc(rootDoc);
console.log(Array.from(docsWithTrash.entries()));

// [
//   'doc-id-1', { title: 'test doc title' },
//   // ...
// ]
```

### read YDoc

```ts
import { readAllBlocksFromDoc } from '@polymind/reader';

const blocks = readAllBlocksFromDoc(doc);
```
