export interface ResponseDataType<T = unknown> {
  data: T;
  msg: string;
  status: number;
}
