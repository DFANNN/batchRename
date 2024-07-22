<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="aside">Aside</el-aside>
      <el-container>
        <el-header class="header">Header</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.common-layout {
  .container {
    min-height: 100vh;
    .aside {
      background-color: #e6e8eb;
      width: 200px;
    }
    .header {
      background-color: #e6e8eb;
    }
  }
}
</style>
