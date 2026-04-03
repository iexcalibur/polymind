import type { PackageName } from '@polymind-tools/utils/workspace';

import { Option, PackageSelectorCommand } from './command';

export class DevCommand extends PackageSelectorCommand {
  static override paths = [['dev'], ['d']];

  protected override availablePackages: PackageName[] = [
    '@polymind/web',
    '@polymind/server',
    '@polymind/electron',
    '@polymind/electron-renderer',
    '@polymind/mobile',
  ];

  protected deps = Option.Boolean('--deps', {
    description: 'Run dev with dependencies',
  });

  async execute() {
    const name = await this.getPackage();
    const args = [];

    if (this.deps) {
      args.push('--deps');
    }

    args.push(name, 'dev');

    await this.cli.run(args);
  }
}
