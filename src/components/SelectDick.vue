<template>
  <div>
    <el-button type="primary" @click="openDialog">选择文件夹</el-button>
    <el-dialog
      v-model="dialogVisible"
      title="选择文件夹"
      width="50%"
      align-center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form" label-position="top">
        <el-form-item label="文件夹地址：">
          <el-input v-model="form.path" />
        </el-form-item>
      </el-form>
      <div class="disk-box">
        <div class="disk-item" v-for="item in diskList" @click="getDiskFile(item)">
          <div class="file-icon">
            <svg viewBox="0 0 1024 1024" width="20" height="20">
              <path
                d="M941.3 297.8v-94c0-23.3-19-42.3-42.3-42.3H337.6l-19.4-19.4H104c-21.4 0-38.9 17.5-38.9 38.9v662c0 21.4 17.5 38.9 38.9 38.9h817.7c21.4 0 38.9-17.5 38.9-38.9V297.8h-19.3zM899 200.5c2 0 3.3 1.4 3.3 3.3v94h-39v-45.3c0-17.9-14.6-32.5-32.5-32.5H396.1l-19.5-19.5H899z m-55.1 97.3H474l-58.4-58.4h415.2c7.3 0 13.1 5.7 13.1 13.1v45.3z m77.9 545.1l-817.7 0.1-0.1-0.1V181.1l0.1-0.1h198l144.4 144.4 11.4 11.4H921.8v506.1z"
                p-id="4840"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div class="disk-name">{{ item.name }}</div>

          <div>></div>
        </div>
      </div>
      <el-button type="primary" class="confirm-btn" @click="confirm">确定</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getDisk, currentDiskFile } from '@/api/api'
import { ElMessage } from 'element-plus'

interface IDisck {
  name: string
  path: string
  type: number
}

const emit = defineEmits(['getSonViewPath'])

// modal开关
const dialogVisible = ref(false)
// 本地磁盘
const diskList = ref<IDisck[]>([])

const form = ref({
  path: ''
})

// 打开dialog
const openDialog = () => {
  dialogVisible.value = true
  getDiskList()
}

// 获取本地磁盘信息的函数
const getDiskList = async () => {
  const { data: res } = await getDisk()
  if (res.code === 0) {
    diskList.value = res.data
    form.value.path = ''
  }
}

const getDiskFile = async (item: IDisck) => {
  const str1 = item.path.lastIndexOf('\\')
  let str2 = item.path.slice(0, str1)
  if (str2.indexOf('\\') === -1) {
    str2 = str2.concat('\\')
  }

  form.value.path = item.path
  const { data: res } = await currentDiskFile({ path: item.path })
  if (res.code === 0) {
    diskList.value = res.data
    diskList.value.unshift({
      name: '返回上一级',
      path: str2,
      type: 0
    })
  }
}

// 确定按钮
const confirm = () => {
  if (!form.value.path) return ElMessage.error('请先选择文件夹！')
  emit('getSonViewPath', form.value.path)
  cancel()
}

// 取消按钮
const cancel = () => {
  dialogVisible.value = false
  form.value.path = ''
  diskList.value = []
}
</script>

<style scoped lang="less">
.disk-box {
  height: 500px;
  border: 1px solid #cdd0d6;
  overflow-y: scroll;
  .disk-item {
    cursor: pointer;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #cdd0d6;
    display: flex;
    align-items: center;
    font-size: 16px;
    .file-icon {
      margin-right: 40px;
    }
    .disk-name {
      flex: 1;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }
}
.confirm-btn {
  width: 100%;
  margin-top: 20px;
}
</style>
