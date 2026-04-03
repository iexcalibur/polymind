import { PackageList, type PackageName } from './yarn';

export const PackageToDistribution = new Map<
  PackageName,
  BUILD_CONFIG_TYPE['distribution']
>([
  ['@polymind/admin', 'admin'],
  ['@polymind/web', 'web'],
  ['@polymind/electron-renderer', 'desktop'],
  ['@polymind/electron', 'desktop'],
  ['@polymind/mobile', 'mobile'],
]);

export const AliasToPackage = new Map<string, PackageName>([
  ['admin', '@polymind/admin'],
  ['web', '@polymind/web'],
  ['electron', '@polymind/electron'],
  ['desktop', '@polymind/electron-renderer'],
  ['renderer', '@polymind/electron-renderer'],
  ['mobile', '@polymind/mobile'],
  ['server', '@polymind/server'],
  ['gql', '@polymind/graphql'],
  ...PackageList.map(
    pkg => [pkg.name.split('/').pop()!, pkg.name] as [string, PackageName]
  ),
]);
