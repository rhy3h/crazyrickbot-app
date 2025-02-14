import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import packageJSON from './package.json'

const name = packageJSON.productName
const version = packageJSON.version

const copyright = `Copyright (c) 2025 ${name}. All rights reserved.`

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: name,
    appCopyright: copyright,
    buildVersion: version,
    appVersion: version,
    win32metadata: {
      CompanyName: name,
      FileDescription: name,
      ProductName: name
    }
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupExe: `${name}Setup-x64-${version}.exe`,
      name: name,
      version,
      authors: name,
      owners: name,
      copyright,
      description: `${name} Setup`
    }),
    new MakerZIP({}, ['win32'])
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'rhy3h',
          name: 'crazyrickbot-app'
        },
        prerelease: true
      }
    }
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/electron/main.ts',
          config: 'vite/vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/electron/preload.ts',
          config: 'vite/vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite/vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
