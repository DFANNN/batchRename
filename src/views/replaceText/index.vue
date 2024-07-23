<template>
  <div>
    <h1 class="title">替换文本</h1>
    <SelectDick />
    <div class="form-box">
      <el-form :model="formInline" label-width="auto" class="demo-form-inline">
        <el-form-item label="修改文件地址：">
          <el-input v-model="formInline.path" clearable />
        </el-form-item>
        <el-form-item label="查找：">
          <el-input v-model="formInline.old_substring" clearable />
        </el-form-item>
        <el-form-item label="替换：">
          <el-input v-model="formInline.new_substring" clearable />
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="fileList">
      <el-table-column prop="name" label="File Name"></el-table-column>
      <el-table-column prop="relativePath" label="Relative Path"></el-table-column>
    </el-table>

    <el-button type="primary" @click="submit">执行</el-button>
  </div>
</template>

<script setup lang="ts">
import { renameFiles, getDisk } from '@/api/api'
import SelectDick from '@/components/SelectDick.vue'
import { ElMessage } from 'element-plus'

// 表单
const formInline = ref({
  path: '',
  old_substring: '',
  new_substring: ''
})

const fileList = ref<Array<{ name: string; relativePath: string }>>([])

// 提交函数
const submit = async () => {
  const { data: res } = await renameFiles(formInline.value)
  console.log(res)
}
</script>

<style scoped lang="less">
.title {
  text-align: center;
}
.form-box {
  margin: 50px 0;
  max-width: 50%;
}
</style>
