import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  private logger = new Logger('HTTP');

  async requestDidStart(
    requestContext: GraphQLRequestContext<any>
  ): Promise<GraphQLRequestListener<any>> {
    const operation = requestContext.request.operationName;
    const query = requestContext.request.query;
    this.logger.log(`Request ${operation ? operation : ''} : ${query}`);
    return {
      willSendResponse: async () => {
        this.logger.log(`Response ${operation ? operation : ''} : ${query}`);
      },
    };
  }
}
