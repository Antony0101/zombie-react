import { createRouteSegmentParamsParser } from './common/route-params-parser.js';
import type { DynamicRouteSegment } from '../../types/dynamic-route-segment.js';

const pattern = /\[(\w+)]/g;

export const exactSlugSegment: DynamicRouteSegment = {
  type: 'exact-slug',
  parse: createRouteSegmentParamsParser({
    pattern,
    paramExtractor: (value) => value,
    sanitizeParam: (param) => param.slice(1, -1),
    routeParamPattern: '(?<:key>[^/]+)'
  }),
  isMatch: (route) => new RegExp(pattern).test(route)
};
