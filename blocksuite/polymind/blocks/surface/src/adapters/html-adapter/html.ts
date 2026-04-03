import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
} from '@blocksuite/polymind-shared/adapters';

export const surfaceBlockHtmlAdapterMatcher: BlockHtmlAdapterMatcher = {
  flavour: 'polymind:surface',
  toMatch: () => false,
  fromMatch: o => o.node.flavour === 'polymind:surface',
  toBlockSnapshot: {},
  fromBlockSnapshot: {
    enter: (_, context) => {
      context.walkerContext.skipAllChildren();
    },
  },
};

export const SurfaceBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  surfaceBlockHtmlAdapterMatcher
);
