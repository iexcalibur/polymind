import type {
  MermaidRenderRequest,
  MermaidRenderResult,
} from '@polymind/core/modules/mermaid/renderer';
import type {
  TypstRenderRequest,
  TypstRenderResult,
} from '@polymind/core/modules/typst/renderer';

export type PreviewRenderRequestMap = {
  mermaid: MermaidRenderRequest;
  typst: TypstRenderRequest;
};

export type PreviewRenderResultMap = {
  mermaid: MermaidRenderResult;
  typst: TypstRenderResult;
};
