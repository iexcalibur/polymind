import type { SerializedXYWH } from '@blockmind/polymind/global/gfx';
import type { MindmapStyle } from '@blockmind/polymind/model';
import type { GfxModel } from '@blockmind/polymind/std/gfx';

import type { TemplateImage } from '../slides/template';

export interface ContextValue {
  selectedElements?: GfxModel[];
  content?: string;
  // make it real
  width?: number;
  height?: number;
  // mindmap
  node?: MindMapNode | null;
  style?: MindmapStyle;
  centerPosition?: SerializedXYWH;
  // slides
  contents?: Array<{ blocks: PolymindNode }>;
  images?: TemplateImage[][];
}

export interface PolymindNode {
  id: string;
  flavour: string;
  children: PolymindNode[];
}

type MindMapNode = {
  xywh?: SerializedXYWH;
  text: string;
  children: MindMapNode[];
};

export class AIContext {
  private _value: ContextValue;

  constructor(initData: ContextValue = {}) {
    this._value = initData;
  }

  get = () => {
    return this._value;
  };

  set = (data: ContextValue) => {
    this._value = {
      ...this._value,
      ...data,
    };
  };
}
