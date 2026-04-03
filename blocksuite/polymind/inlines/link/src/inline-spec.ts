import type { PolymindTextAttributes } from '@blocksuite/polymind-shared/types';
import { StdIdentifier } from '@blocksuite/std';
import { InlineSpecExtension } from '@blocksuite/std/inline';
import { html } from 'lit';
import { z } from 'zod';

export const LinkInlineSpecExtension =
  InlineSpecExtension<PolymindTextAttributes>('link', provider => {
    const std = provider.get(StdIdentifier);
    return {
      name: 'link',
      schema: z.object({
        link: z.string().optional().nullable().catch(undefined),
      }),
      match: delta => {
        return !!delta.attributes?.link;
      },
      renderer: ({ delta }) => {
        return html`<polymind-link .std=${std} .delta=${delta}></polymind-link>`;
      },
    };
  });
