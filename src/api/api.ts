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

// 获取到当前文件夹下的文件/电影
export function pathFiles(data: any) {
  return service.post('/path_files', data)
}

// 插入文本的接口
export function renameInsertionText(data: any) {
  return service.post('/batch-rename-insertion', data)
}
