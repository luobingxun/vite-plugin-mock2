import { resolve, join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import type { Plugin, ViteDevServer } from 'vite';

export interface ServerModule {
  url: string;
  method: string;
  response: () => void;
}

interface Options {
  rootDir?: string;
}

export default function createViteMockPlugin(options?: Options): Plugin {
  const { rootDir = './mock' } = options || {};

  return {
    name: 'vite:plugin-mock',
    configureServer: async server => {
      const mockFile = await collectMockFiles(rootDir!);
      for await (const file of mockFile) {
        const fileModule = await import(`file://${file}`);
        if (fileModule.default) {
          createMockData(fileModule.default, server);
        }
      }
    }
  };
}

function createMockData(mockModule: ServerModule[], server: ViteDevServer) {
  server.middlewares.use((req, res, next) => {
    const matchedMocker = mockModule.find(
      m => m.url === req.url && req.method === m.method.toUpperCase()
    );
    if (matchedMocker) {
      const mockData = matchedMocker.response();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(mockData));
    } else {
      next();
    }
  });
}

async function collectMockFiles(dir: string) {
  const mockDirPath = resolve(process.cwd(), dir);
  const filePaths = await findMockFiles(mockDirPath);
  return filePaths;
}

async function findMockFiles(dirPath: string) {
  try {
    const collector: string[] = [];
    const dirs = await readdir(dirPath);
    for await (const dir of dirs) {
      const filePath = join(dirPath, dir);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        const childFile = await findMockFiles(filePath);
        collector.push(...childFile);
      } else {
        collector.push(filePath);
      }
    }
    return collector;
  } catch (error) {
    throw 'The file directory does not exist.';
  }
}
