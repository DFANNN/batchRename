import service from '@/utils/service'

// 重命名接口
export function renameFiles(data: any) {
  return service.post('/rename-files', data)
}

// 获取本次磁盘
export function getDisk() {
  return service.get('/get-disk')
}

// 获取当前磁盘下的文件夹
export function currentDiskFile(data: any) {
  return service.post('/current-disk-file', data)
}
