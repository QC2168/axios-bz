export interface ResponseDataType<Data = any> {
  data: Data;
  msg: string;
  status: number;
}
