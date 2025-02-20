import { CreateNodesV2, ProjectConfiguration } from '@nx/devkit';
import { dirname } from 'path';

export const createNodesV2: CreateNodesV2 = [
  /* This will look for all `index.ts` files that follow your file structure convention. */
  'libs/implicit/*/**/index.ts',
  (indexPathList) =>
    indexPathList.map((indexPath) => {
      const root = dirname(indexPath);
      const name = root.replaceAll('/', '-');

      return [
        /* This is used by Nx to track which matching file was used by the plugin
         * It is shown in the project detail web view. */
        indexPath,
        {
          projects: {
            /* This will add a project to the Nx graph for the detected library. */
            [indexPath]: {
              root,
              name,
              sourceRoot: root,
              projectType: 'library',
              tags: [],
              targets: {
                lint: {
                  executor: '@nx/eslint:lint',
                },
              },
            } satisfies ProjectConfiguration,
          },
        },
      ];
    }),
];
