import { GlobalContextService } from '@affine/core/modules/global-context';
import { SpaceService } from '@affine/core/modules/space';
import {
  useIsActiveView,
  ViewBody,
  ViewHeader,
  ViewIcon,
  ViewTitle,
} from '@affine/core/modules/workbench';
import { useLiveData, useServices } from '@toeverything/infra';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PageNotFound } from '../../404';
import { AllDocSidebarTabs } from '../layouts/all-doc-sidebar-tabs';
import { SpaceDetail } from './space-detail';

export const Component = function SpacePage() {
  const { spaceService, globalContextService } = useServices({
    SpaceService,
    GlobalContextService,
  });

  const params = useParams();
  const spaceId = params.spaceId ?? '';
  const space = useLiveData(spaceId ? spaceService.space$(spaceId) : null);
  const name = useLiveData(space?.name$);
  const isActiveView = useIsActiveView();

  useEffect(() => {
    if (isActiveView && space) {
      const ctx = globalContextService.globalContext;
      ctx.isSpace.set(true);
      ctx.spaceId.set(space.id);

      return () => {
        ctx.isSpace.set(false);
        ctx.spaceId.set(null);
      };
    }
    return;
  }, [space, globalContextService, isActiveView]);

  if (!space) {
    return <PageNotFound />;
  }

  return (
    <>
      <ViewIcon icon="folder" />
      <ViewTitle title={name ?? 'Space'} />
      <AllDocSidebarTabs />
      <ViewHeader>{null}</ViewHeader>
      <ViewBody>
        <SpaceDetail space={space} />
      </ViewBody>
    </>
  );
};
