import { SurfaceBlockSchema } from '@blocksuite/polymind/blocks/surface';
import { BlockService } from '@blocksuite/polymind/std';

export class MindmapSurfaceBlockService extends BlockService {
  static override readonly flavour = SurfaceBlockSchema.model.flavour;
}
