import { type SlashMenuConfig } from '@blocksuite/polymind-widget-slash-menu';

export const codeSlashMenuConfig: SlashMenuConfig = {
  disableWhen: ({ model }) => {
    return model.flavour === 'polymind:code';
  },
  items: [],
};
