<template>
  <div>
    <h1 class="title">替换文本</h1>
    <SelectDick />
    <div class="form-box">
      <el-form
        :model="formInline"
        ref="formRef"
        label-width="auto"
        class="demo-form-inline"
      >
        <el-form-item prop="path" label="修改文件地址：">
          <el-input v-model="formInline.path" disabled />
        </el-form-item>
        <el-form-item prop="old_substring" label="查找：">
          <el-input v-model="formInline.old_substring" clearable />
        </el-form-item>
        <el-form-item label="替换：" prop="new_substring">
          <el-input v-model="formInline.new_substring" clearable />
        </el-form-item>
        <el-form-item label="操作：">
          <el-button type="primary" class="btn" @click="resetForm"
            >重置
          </el-button>
          <el-button type="primary" @click="preview" class="btn">
            预览
          </el-button>
          <el-button type="primary" class="btn" @click="submit"
            >执行
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="fileList" :border="true" height="400px">
      <el-table-column prop="name" label="文件名"></el-table-column>
      <el-table-column prop="newName" label="替换结果"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { renameFiles } from "@/api/api";
import SelectDick from "@/components/SelectDick.vue";
import { FormInstance } from "element-plus";
// ref
const formRef = ref<FormInstance>();
// 表单
const formInline = ref({
  path: "",
  old_substring: "",
  new_substring: "",
});

const fileList = ref<Array<{ name: string; newName: string }>>([]);

// 提交函数
const submit = async () => {
  const { data: res } = await renameFiles(formInline.value);
  console.log(res);
};

// 预览
const preview = () => {
  fileList.value.forEach((item) => {
    item.newName = item.name.replace(
      formInline.value.old_substring,
      formInline.value.new_substring,
    );
  });
};

// 重置
const resetForm = () => {
  fileList.value = [];
  formRef.value?.resetFields();
};
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
