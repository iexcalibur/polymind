import { SurfaceBlockSchema } from '@blockmind/polymind/blocks/surface';
import { BlockService } from '@blockmind/polymind/std';

export class MindmapSurfaceBlockService extends BlockService {
  static override readonly flavour = SurfaceBlockSchema.model.flavour;
}
