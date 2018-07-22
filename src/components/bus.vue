<template>
  <el-radio-group v-model="radioType">
    <el-radio :label="1">个人</el-radio>
    <el-radio :label="2">企业</el-radio>
    <el-radio :label="3">媒体</el-radio>
  </el-radio-group>
</template>

<script>

import Vue from 'vue';
export default new Vue({
    name: 'bus',
    data () {
        return {
            // code
        }
    }
})
</script>
<style>
</style>
