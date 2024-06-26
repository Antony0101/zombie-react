import type { ParsedDynamicSegment } from '../components/dynamic-routes/common/route-params-parser.js';

export interface DynamicRouteSegment {
  type: string;
  isMatch(route: string): boolean;
  parse(route: string): ParsedDynamicSegment;
}
