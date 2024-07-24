<template>
  <div class="common-layout">
    <el-container class="container">
      <div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="2" class="icon-menu">
            <el-icon>
              <img src="../assets/images/dfan-icon.png" class="dfan-icon" />
            </el-icon>
            <template #title>
              <div class="dfan-text">DFAN-Rename</div>
            </template>
          </el-menu-item>
          <el-menu-item index="2" @click="router.push('/')">
            <el-icon><icon-menu /></el-icon>
            <template #title>
              <span style="margin-left: 20px">替换文本</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3" @click="router.push('/layout/insertionText')">
            <el-icon><document /></el-icon>
            <template #title>
              <span style="margin-left: 20px">插入文本</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <el-container>
        <el-header class="header">
          <div class="fold-box">
            <el-icon class="expand" v-if="isCollapse" @click="isCollapse = !isCollapse"><Expand /></el-icon>
            <el-icon class="expand" v-else @click="isCollapse = !isCollapse"><Fold /></el-icon>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Document, Menu as IconMenu, Expand, Fold } from '@element-plus/icons-vue'

const router = useRouter()
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 100vh;
}
.el-menu-vertical-demo.el-menu--collapse {
  height: 100vh;
}

.common-layout {
  .container {
    min-height: 100vh;
  }
  .header {
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .fold-box {
      height: 100%;
      display: flex;
      align-items: center;
      .expand {
        cursor: pointer;
        font-size: 20px;
      }
    }
  }
  .icon-menu {
    height: 60px;
    cursor: auto;
    &:hover {
      background-color: #fff;
    }
    .dfan-icon {
      width: 40px;
    }
    .dfan-text {
      width: 100%;
      height: 60px;
      font-size: 20px;
      color: #000;
      line-height: 60px;
      margin-left: 20px;
    }
  }
}
</style>
