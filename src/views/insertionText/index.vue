<template>
  <div>
    <h1 class="title">插入文本</h1>
    <SelectDick @getSonViewPath="getSonViewPath" />
    <div class="form-box">
      <el-form :model="formInline" ref="formRef" label-width="auto" class="demo-form-inline">
        <el-form-item prop="path" label="修改文件地址：">
          <el-input v-model="formInline.path" disabled />
        </el-form-item>
        <el-form-item prop="type" label="插入规则：">
          <el-select v-model="formInline.type" placeholder="请选择插入规则" clearable>
            <el-option v-for="item in ruleOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="插入文本：" prop="text">
          <el-input v-model="formInline.text" placeholder="请输入插入文本" clearable />
        </el-form-item>
        <el-form-item label="操作：">
          <el-button type="primary" class="btn" @click="resetForm">重置 </el-button>
          <el-button type="primary" @click="preview" class="btn"> 预览 </el-button>
          <el-button type="primary" class="btn" @click="submit">执行 </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="fileList" :border="true" height="400px">
      <el-table-column prop="name" label="文件名"></el-table-column>
      <el-table-column prop="newName" label="预览插入结果"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { renameInsertionText, pathFiles } from '@/api/api'
import SelectDick from '@/components/SelectDick.vue'
import { ElMessage, FormInstance } from 'element-plus'
// ref
const formRef = ref<FormInstance>()
// 表单
const formInline = ref({
  path: '',
  type: '',
  text: ''
})

// 插入规则
const ruleOptions = [
  { value: '1', label: '插入到开头' },
  { value: '2', label: '插入到结尾' }
]

const fileList = ref<Array<{ name: string; newName: string }>>([])

// 提交函数
const submit = async () => {
  if (formInline.value.path === '' && formInline.value.type === '') {
    ElMessage.error('请输入文件地址和插入规则！')
    return
  } else {
    const { data: res } = await renameInsertionText(formInline.value)
    if (res.code === 0) {
      ElMessage.success('替换成功！')
      fileList.value = res.data.renamed_files.map((item: any) => {
        return {
          name: item.new_name,
          newName: ''
        }
      })
      formInline.value.text = ''
      formInline.value.type = ''
    }
  }
}

// 在文件名最后插入文本（已经考虑了.mkv）
const insertBeforeExtension = (filename: string, insertString: string) => {
  // 使用正则表达式找到最后一个 . 的位置
  const position = filename.lastIndexOf('.')

  // 如果找不到 . ，说明文件没有后缀，直接返回原字符串加上插入字符串
  if (position === -1) {
    return filename + insertString
  }

  // 在找到的位置前插入字符串
  return filename.substring(0, position) + insertString + filename.substring(position)
}
// 预览
const preview = () => {
  fileList.value = fileList.value.map((item: { name: string; newName: string }) => {
    return {
      name: item.name,
      newName:
        formInline.value.type === '1'
          ? formInline.value.text + item.name
          : insertBeforeExtension(item.name, formInline.value.text)
    }
  })
}

// 重置
const resetForm = () => {
  fileList.value = []
  formRef.value?.resetFields()
}

// 获取当当前文件夹下的电影
const getPathFiles = async (path: string) => {
  const { data: res } = await pathFiles({ path })
  if (res.code === 0) {
    fileList.value = res.data.map((item: { name: string }) => {
      return {
        name: item,
        newName: ''
      }
    })
  }
}
// 获取子组件的路径
const getSonViewPath = (path: string) => {
  formInline.value.path = path
  getPathFiles(path)
}
</script>

<style scoped lang="less">
.el-button {
  margin-left: 0;
}

.title {
  text-align: center;
}

.form-box {
  margin: 50px 0;
  width: 50%;

  .btn {
    width: 30%;
    margin-right: 5%;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
