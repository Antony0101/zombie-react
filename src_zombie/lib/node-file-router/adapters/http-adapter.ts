import { URL } from 'node:url';
import { withoutTrailingSlashes } from '../utils/string.utils.js';
import * as defaultNotFoundHandler from '../components/default-not-found.js';
import type { IncomingMessage } from 'node:http';
import type { Adapter } from '../types/adapter.js';

export const httpAdapter: Adapter = {
  getPathname(req: IncomingMessage) {
    const { pathname } = new URL(
      withoutTrailingSlashes(req.url || ''),
      `https://${req.headers.host}`
    );
    return pathname;
  },
  getMethod(req: IncomingMessage): string | undefined {
    return req.method?.toLowerCase();
  },
  defaultNotFoundHandler: defaultNotFoundHandler.default
};
