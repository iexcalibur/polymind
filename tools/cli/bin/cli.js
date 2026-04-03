#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

spawnSync('yarn', ['r', 'polymind.ts', ...process.argv.slice(2)], {
  stdio: 'inherit',
});
