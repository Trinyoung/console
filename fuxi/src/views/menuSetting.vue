<!-- 写一个页面表格 -->
<template>
  <div>
    <div></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    created() {},
    methods: {}
}

</script>
