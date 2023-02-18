/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-29 22:14:30
 * @LastEditors: JupSat
 * @LastEditTime: 2023-01-29 22:32:39
 */
import { ElMessage } from 'element-plus'

export function message(message = '', type = 'success', duration = 2000, grouping = false) {
  ElMessage.closeAll()
  ElMessage({
    message,
    type,
    grouping,
    duration
  })
}
