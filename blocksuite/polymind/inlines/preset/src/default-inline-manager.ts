import { CommentInlineSpecExtension } from '@blocksuite/polymind-inline-comment';
import { FootNoteInlineSpecExtension } from '@blocksuite/polymind-inline-footnote';
import { LatexInlineSpecExtension } from '@blocksuite/polymind-inline-latex';
import { LinkInlineSpecExtension } from '@blocksuite/polymind-inline-link';
import { MentionInlineSpecExtension } from '@blocksuite/polymind-inline-mention';
import { ReferenceInlineSpecExtension } from '@blocksuite/polymind-inline-reference';
import type { PolymindTextAttributes } from '@blocksuite/polymind-shared/types';
import { InlineManagerExtension } from '@blocksuite/std/inline';

import {
  BackgroundInlineSpecExtension,
  BoldInlineSpecExtension,
  CodeInlineSpecExtension,
  ColorInlineSpecExtension,
  ItalicInlineSpecExtension,
  StrikeInlineSpecExtension,
  UnderlineInlineSpecExtension,
} from './inline-spec';

export const DefaultInlineManagerExtension =
  InlineManagerExtension<PolymindTextAttributes>({
    id: 'DefaultInlineManager',
    specs: [
      BoldInlineSpecExtension.identifier,
      ItalicInlineSpecExtension.identifier,
      UnderlineInlineSpecExtension.identifier,
      StrikeInlineSpecExtension.identifier,
      CodeInlineSpecExtension.identifier,
      BackgroundInlineSpecExtension.identifier,
      ColorInlineSpecExtension.identifier,
      LatexInlineSpecExtension.identifier,
      ReferenceInlineSpecExtension.identifier,
      LinkInlineSpecExtension.identifier,
      FootNoteInlineSpecExtension.identifier,
      MentionInlineSpecExtension.identifier,
      CommentInlineSpecExtension.identifier,
    ],
  });
