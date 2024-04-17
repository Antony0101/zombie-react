import { pipe } from '../../utils/fp.utils.js';
import { filterValues, mapKeys, mapValues } from '../../utils/object.utils.js';
import { decodeSlugParam } from '../slug-param/slug-param.js';
import type { Dictionary } from '../../types/dictionary.js';
import type { ParamExtractor } from '../dynamic-routes/common/route-params-parser.js';

import type { RequestHandler } from '../../types/request-handlers.js';

interface Props {
  method?: string;
  fileName: string;
  handler: RequestHandler | Record<string, RequestHandler>;
  regex: RegExp;
  paramExtractors: Record<string, ParamExtractor>;
  nestingLevel: number;
}

export class RouteHandler {
  method?: string;
  fileName: string;
  handler: RequestHandler | Record<string, RequestHandler>;
  regex: RegExp;
  nestingLevel: number;

  private paramExtractors: Record<string, ParamExtractor>;

  constructor(props: Props) {
    // Object.assign(this, props);
    this.method = props.method;
    this.fileName = props.fileName;
    this.handler = props.handler;
    this.regex = props.regex;
    this.paramExtractors = props.paramExtractors;
    this.nestingLevel = props.nestingLevel;
  }

  getRouteParams(pathname: string): Dictionary<string> {
    const groups = new RegExp(this.regex).exec(pathname)?.groups || {};
    return pipe(
      filterValues<string>(Boolean),
      mapValues<string, string | string[]>((group, key) =>
        this.paramExtractors[key](group)
      ),
      mapKeys(decodeSlugParam)
    )(groups);
  }
}
