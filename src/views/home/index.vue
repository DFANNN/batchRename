<template>
  <div>
    <el-upload
      directory
      drag
      multiple
      :auto-upload="false"
      :http-request="handleUpload"
      :on-change="handleChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drag files here or click to upload</div>
    </el-upload>
    <el-button type="primary" @click="submit">Submit</el-button>
    <el-table :data="fileList">
      <el-table-column prop="name" label="File Name"></el-table-column>
      <el-table-column prop="relativePath" label="Relative Path"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const fileList = ref<Array<{ name: string; relativePath: string }>>([])

const handleChange = (file: any, files: any) => {
  fileList.value = files.map((f: any) => ({
    name: f.name,
    relativePath: f.webkitRelativePath
  }))
}

const beforeUpload = () => {
  return false
}

const handleUpload = (request: any) => {
  // No actual upload logic, handled by the submit function
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
