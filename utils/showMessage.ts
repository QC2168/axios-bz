import { ElMessage } from 'element-plus';

type ElMessageType = 'success' | 'warning' | 'info' | 'error'
export default function eMessage(
  message: string,
  type: ElMessageType = 'success',
) {
  ElMessage({ message, type });
}

export function messageSucceed(message: string) {
  eMessage(message);
}
export function messageFailed(message: string) {
  eMessage(message, 'error');
}

export function messageWaring(message: string) {
  eMessage(message, 'warning');
}
