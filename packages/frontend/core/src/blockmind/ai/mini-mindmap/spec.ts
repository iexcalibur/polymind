import { SurfaceBlockSchema } from '@blockmind/polymind/blocks/surface';
import { ConnectorElementRendererExtension } from '@blockmind/polymind/gfx/connector';
import {
  MindmapElementRendererExtension,
  MindMapView,
} from '@blockmind/polymind/gfx/mindmap';
import { ShapeElementRendererExtension } from '@blockmind/polymind/gfx/shape';
import { TextElementRendererExtension } from '@blockmind/polymind/gfx/text';
import { RootBlockSchema } from '@blockmind/polymind/model';
import {
  DocModeService,
  ThemeService,
} from '@blockmind/polymind/shared/services';
import { BlockViewExtension, FlavourExtension } from '@blockmind/polymind/std';
import { ToolController } from '@blockmind/polymind/std/gfx';
import type { BlockSchema, ExtensionType } from '@blockmind/polymind/store';
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
