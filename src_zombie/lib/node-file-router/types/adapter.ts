import type { RequestHandler } from './request-handlers.js';

export interface Adapter {
  getPathname(...args: unknown[]): string;
  getMethod?(...args: unknown[]): string | undefined;
  defaultNotFoundHandler: RequestHandler;
}
