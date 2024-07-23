<template>
  <div>
    <el-upload multiple :auto-upload="false" :on-change="handleChange" :show-file-list="false">
      <el-button type="primary">选择文件</el-button>
    </el-upload>

    <el-table :data="fileList">
      <el-table-column prop="name" label="File Name"></el-table-column>
      <el-table-column prop="relativePath" label="Relative Path"></el-table-column>
    </el-table>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="修改文件地址：">
        <el-input v-model="formInline.path" clearable />
      </el-form-item>
      <el-form-item label="查询：">
        <el-input v-model="formInline.old_substring" clearable />
      </el-form-item>
      <el-form-item label="替换为：">
        <el-input v-model="formInline.new_substring" clearable />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submit">执行</el-button>
  </div>
</template>

<script setup lang="ts">
import { renameFiles } from '@/api/api'
import { ElMessage } from 'element-plus'

const formInline = ref({
  path: '',
  old_substring: '',
  new_substring: ''
})

const fileList = ref<Array<{ name: string; relativePath: string }>>([])

const handleChange = (file: any) => {
  console.log(file)

  fileList.value.push({ name: file.name, relativePath: '' })
  console.log(fileList.value)
}

const submit = async () => {
  const { data: res } = await renameFiles(formInline.value)
  console.log(res)
}
</script>

<style scoped></style>
