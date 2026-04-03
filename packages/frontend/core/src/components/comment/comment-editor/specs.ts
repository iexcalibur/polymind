import { CloudViewExtension } from '@polymind/core/blocksuite/view-extensions/cloud';
import { PolymindEditorViewExtension } from '@polymind/core/blocksuite/view-extensions/editor-view/editor-view';
import { PolymindThemeViewExtension } from '@polymind/core/blocksuite/view-extensions/theme';
import { I18n } from '@polymind/i18n';
import { CodeBlockViewExtension } from '@blocksuite/polymind/blocks/code/view';
import { DividerViewExtension } from '@blocksuite/polymind/blocks/divider/view';
import { LatexViewExtension as LatexBlockViewExtension } from '@blocksuite/polymind/blocks/latex/view';
import { ListViewExtension } from '@blocksuite/polymind/blocks/list/view';
import { NoteViewExtension } from '@blocksuite/polymind/blocks/note/view';
import { ParagraphViewExtension } from '@blocksuite/polymind/blocks/paragraph/view';
import { RootViewExtension } from '@blocksuite/polymind/blocks/root/view';
import {
  PeekViewExtension,
  type PeekViewService,
} from '@blocksuite/polymind/components/peek';
import {
  type ViewExtensionContext,
  ViewExtensionManager,
  ViewExtensionProvider,
} from '@blocksuite/polymind/ext-loader';
import { PlainTextClipboardConfig } from '@blocksuite/polymind/foundation/clipboard';
import { LatexInlineSpecExtension } from '@blocksuite/polymind/inlines/latex';
import { LatexViewExtension as LatexInlineViewExtension } from '@blocksuite/polymind/inlines/latex/view';
import { LinkInlineSpecExtension } from '@blocksuite/polymind/inlines/link';
import { LinkViewExtension } from '@blocksuite/polymind/inlines/link/view';
import { MentionInlineSpecExtension } from '@blocksuite/polymind/inlines/mention';
import { MentionViewExtension } from '@blocksuite/polymind/inlines/mention/view';
import {
  BackgroundInlineSpecExtension,
  BoldInlineSpecExtension,
  CodeInlineSpecExtension,
  ColorInlineSpecExtension,
  InlineSpecExtensions,
  ItalicInlineSpecExtension,
  StrikeInlineSpecExtension,
  UnderlineInlineSpecExtension,
} from '@blocksuite/polymind/inlines/preset';
import { ReferenceInlineSpecExtension } from '@blocksuite/polymind/inlines/reference';
import { ReferenceViewExtension } from '@blocksuite/polymind/inlines/reference/view';
import {
  DefaultOpenDocExtension,
  DocDisplayMetaService,
  DocModeService,
  FileSizeLimitService,
  FontConfigExtension,
  fontConfigSchema,
  FontLoaderService,
  PageViewportServiceExtension,
  ThemeService,
  ToolbarRegistryExtension,
} from '@blocksuite/polymind/shared/services';
import type { PolymindTextAttributes } from '@blocksuite/polymind/shared/types';
import { InlineManagerExtension } from '@blocksuite/polymind/std/inline';
import { LinkedDocViewExtension } from '@blocksuite/polymind/widgets/linked-doc/view';
import { ToolbarViewExtension } from '@blocksuite/polymind/widgets/toolbar/view';
import { ViewportOverlayViewExtension } from '@blocksuite/polymind/widgets/viewport-overlay/view';
import type { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';

import { createCommentLinkedWidgetConfig } from './linked-widget-config';

const commentEditorViewExtensionOptionsSchema = z.object({
  peekView: z.optional(z.custom<PeekViewService>()),
  fontConfig: z.optional(z.array(fontConfigSchema)),
});

export type CommentEditorViewExtensionOptions = z.infer<
  typeof commentEditorViewExtensionOptionsSchema
>;

class CommentEditorViewExtensionProvider extends ViewExtensionProvider<CommentEditorViewExtensionOptions> {
  override name = 'comment-editor';

  override schema = commentEditorViewExtensionOptionsSchema;

  override setup(
    context: ViewExtensionContext,
    options?: CommentEditorViewExtensionOptions
  ) {
    super.setup(context, options);
    context.register([
      ThemeService,
      DocModeService,
      DocDisplayMetaService,
      DefaultOpenDocExtension,
      FontLoaderService,
      ToolbarRegistryExtension,
      PageViewportServiceExtension,
      FileSizeLimitService,

      ...InlineSpecExtensions,
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
          MentionInlineSpecExtension.identifier,
        ],
      }),

      PlainTextClipboardConfig,
    ]);

    if (options?.fontConfig) {
      context.register(FontConfigExtension(options.fontConfig));
    }
    if (options?.peekView) {
      context.register(PeekViewExtension(options.peekView));
    }
  }
}

let manager: ViewExtensionManager | null = null;
export function getCommentEditorViewManager(framework: FrameworkProvider) {
  if (!manager) {
    manager = new ViewExtensionManager([
      CommentEditorViewExtensionProvider,

      // Blocks
      CodeBlockViewExtension,
      DividerViewExtension,
      LatexBlockViewExtension,
      ListViewExtension,

      NoteViewExtension,
      ParagraphViewExtension,
      RootViewExtension,

      // Inline
      LinkViewExtension,
      ReferenceViewExtension,
      MentionViewExtension,
      LatexInlineViewExtension,

      // Widget
      ToolbarViewExtension,
      ViewportOverlayViewExtension,
      LinkedDocViewExtension,

      // Polymind side
      PolymindThemeViewExtension,
      PolymindEditorViewExtension,

      // for rendering mentions
      CloudViewExtension,
    ]);

    manager.configure(ParagraphViewExtension, {
      getPlaceholder: () => {
        return I18n.t('com.polymind.notification.comment-prompt');
      },
    });

    manager.configure(
      LinkedDocViewExtension,
      createCommentLinkedWidgetConfig(framework)
    );

    manager.configure(CloudViewExtension, {
      framework,
      enableCloud: true,
    });
  }
  return manager;
}
