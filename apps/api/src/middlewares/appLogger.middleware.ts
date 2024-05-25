import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl, query } = request;
    const queries = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&' || '');
    this.logger.log(`Request ${method} ${baseUrl}/${queries}`);
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `Response ${method} ${baseUrl}/${queries} ${statusCode} ${contentLength}`
      );
    });

    next();
  }
}
