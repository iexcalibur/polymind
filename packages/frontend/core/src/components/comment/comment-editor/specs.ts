import { CloudViewExtension } from '@polymind/core/blockmind/view-extensions/cloud';
import { PolymindEditorViewExtension } from '@polymind/core/blockmind/view-extensions/editor-view/editor-view';
import { PolymindThemeViewExtension } from '@polymind/core/blockmind/view-extensions/theme';
import { I18n } from '@polymind/i18n';
import { CodeBlockViewExtension } from '@blockmind/polymind/blocks/code/view';
import { DividerViewExtension } from '@blockmind/polymind/blocks/divider/view';
import { LatexViewExtension as LatexBlockViewExtension } from '@blockmind/polymind/blocks/latex/view';
import { ListViewExtension } from '@blockmind/polymind/blocks/list/view';
import { NoteViewExtension } from '@blockmind/polymind/blocks/note/view';
import { ParagraphViewExtension } from '@blockmind/polymind/blocks/paragraph/view';
import { RootViewExtension } from '@blockmind/polymind/blocks/root/view';
import {
  PeekViewExtension,
  type PeekViewService,
} from '@blockmind/polymind/components/peek';
import {
  type ViewExtensionContext,
  ViewExtensionManager,
  ViewExtensionProvider,
} from '@blockmind/polymind/ext-loader';
import { PlainTextClipboardConfig } from '@blockmind/polymind/foundation/clipboard';
import { LatexInlineSpecExtension } from '@blockmind/polymind/inlines/latex';
import { LatexViewExtension as LatexInlineViewExtension } from '@blockmind/polymind/inlines/latex/view';
import { LinkInlineSpecExtension } from '@blockmind/polymind/inlines/link';
import { LinkViewExtension } from '@blockmind/polymind/inlines/link/view';
import { MentionInlineSpecExtension } from '@blockmind/polymind/inlines/mention';
import { MentionViewExtension } from '@blockmind/polymind/inlines/mention/view';
import {
  BackgroundInlineSpecExtension,
  BoldInlineSpecExtension,
  CodeInlineSpecExtension,
  ColorInlineSpecExtension,
  InlineSpecExtensions,
  ItalicInlineSpecExtension,
  StrikeInlineSpecExtension,
  UnderlineInlineSpecExtension,
} from '@blockmind/polymind/inlines/preset';
import { ReferenceInlineSpecExtension } from '@blockmind/polymind/inlines/reference';
import { ReferenceViewExtension } from '@blockmind/polymind/inlines/reference/view';
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
} from '@blockmind/polymind/shared/services';
import type { PolymindTextAttributes } from '@blockmind/polymind/shared/types';
import { InlineManagerExtension } from '@blockmind/polymind/std/inline';
import { LinkedDocViewExtension } from '@blockmind/polymind/widgets/linked-doc/view';
import { ToolbarViewExtension } from '@blockmind/polymind/widgets/toolbar/view';
import { ViewportOverlayViewExtension } from '@blockmind/polymind/widgets/viewport-overlay/view';
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
