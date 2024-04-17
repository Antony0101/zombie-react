import { getFileWithExt } from '../utils/file.utils.js';

export function resolveNotFoundHandler(basePath: string) {
  const userHandler = getFileWithExt(basePath, '_404');
  if (userHandler) {
    return import(userHandler).then((file) => file.default);
  }
}
