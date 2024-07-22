<template>
  <div>
    <el-upload multiple :auto-upload="false" :on-change="handleChange" :show-file-list="false">
      <el-button type="primary">选择文件</el-button>
    </el-upload>

    <el-table :data="fileList">
      <el-table-column prop="name" label="File Name"></el-table-column>
      <el-table-column prop="relativePath" label="Relative Path"></el-table-column>
    </el-table>

    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const fileList = ref<Array<{ name: string; relativePath: string }>>([])

const handleChange = (file: any) => {
  console.log(file)

  fileList.value.push({ name: file.name, relativePath: '' })
  console.log(fileList.value)
}

const submit = async () => {
  try {
    const response = await fetch('http://localhost:5000/rename-files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: '/path/to/your/folder', // You might need to adjust this
        files: fileList.value
      })
    })

    const data = await response.json()
    if (data.error) {
      ElMessage.error(data.error)
    } else {
      ElMessage.success('Files renamed successfully!')
    }
  } catch (error) {
    ElMessage.error('Failed to rename files.')
  }
}
</script>

<style scoped></style>
