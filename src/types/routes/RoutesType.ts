export interface CreateRouterOption {
  prefix?: string;
  parser?: `${RouterParserEnum}`;
}

export enum RouterParserEnum {
  Json = 'json',
  Form = 'form',
  File = 'file',
}
