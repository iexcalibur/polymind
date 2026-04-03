import { SurfaceBlockSchema } from '@blocksuite/polymind/blocks/surface';
import { ConnectorElementRendererExtension } from '@blocksuite/polymind/gfx/connector';
import {
  MindmapElementRendererExtension,
  MindMapView,
} from '@blocksuite/polymind/gfx/mindmap';
import { ShapeElementRendererExtension } from '@blocksuite/polymind/gfx/shape';
import { TextElementRendererExtension } from '@blocksuite/polymind/gfx/text';
import { RootBlockSchema } from '@blocksuite/polymind/model';
import {
  DocModeService,
  ThemeService,
} from '@blocksuite/polymind/shared/services';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/polymind/std';
import { ToolController } from '@blocksuite/polymind/std/gfx';
import type { BlockSchema, ExtensionType } from '@blocksuite/polymind/store';
import { literal } from 'lit/static-html.js';
import type { z } from 'zod';

import { MindmapService } from './mindmap-service.js';
import { MindmapSurfaceBlockService } from './surface-service.js';

export const MiniMindmapSpecs: ExtensionType[] = [
  DocModeService,
  ThemeService,
  FlavourExtension('polymind:page'),
  MindmapService,
  ToolController,
  BlockViewExtension('polymind:page', literal`mini-mindmap-root-block`),
  FlavourExtension('polymind:surface'),
  MindMapView,
  MindmapSurfaceBlockService,
  BlockViewExtension('polymind:surface', literal`mini-mindmap-surface-block`),
  TextElementRendererExtension,
  MindmapElementRendererExtension,
  ShapeElementRendererExtension,
  ConnectorElementRendererExtension,
];

export const MiniMindmapSchema: z.infer<typeof BlockSchema>[] = [
  RootBlockSchema,
  SurfaceBlockSchema,
];
