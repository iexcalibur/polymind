import { PackageList, type PackageName } from './yarn';

export const PackageToDistribution = new Map<
  PackageName,
  BUILD_CONFIG_TYPE['distribution']
>([
  ['@affine/admin', 'admin'],
  ['@affine/web', 'web'],
  ['@affine/electron-renderer', 'desktop'],
  ['@affine/electron', 'desktop'],
]);

export const AliasToPackage = new Map<string, PackageName>([
  ['admin', '@affine/admin'],
  ['web', '@affine/web'],
  ['electron', '@affine/electron'],
  ['desktop', '@affine/electron-renderer'],
  ['renderer', '@affine/electron-renderer'],
  ['server', '@affine/server'],
  ['gql', '@affine/graphql'],
  ...PackageList.map(
    pkg => [pkg.name.split('/').pop()!, pkg.name] as [string, PackageName]
  ),
]);
