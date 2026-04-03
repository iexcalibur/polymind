import { ExplorerNavigation } from '@polymind/core/components/explorer/header/navigation';
import { Header } from '@polymind/core/components/pure/header';

export const AllTagHeader = () => {
  return <Header left={<ExplorerNavigation active={'tags'} />} />;
};
