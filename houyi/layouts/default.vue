<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="header">
                    <div class="header-left">
                        后羿
                    </div>
                    <div class="header-main">

                    </div>
                    <div class="header-right">
                        <el-button type="danger">登 录</el-button>
                        <el-button type="success"></el-button>
                    </div>
                </div>
            </el-header>
            <el-main>
                <div class="">
                    1234
                </div>
                <slot></slot>
            </el-main>
            <el-footer>@Trinyoung</el-footer>
        </el-container>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.header {
    max-width: 1200px;
    // background: #CCC;
    flex-grow: 1;
    background: #fff;
    // width: 800px;
}
.common-layout {
    el-container {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        el-header {
            display: flex;
            justify-content: center;
            flex: 1;
            // border-color: #f0f0f0;
            // box-shadow: 1px #CCC;
            width: 100%;
            height: 60px;
        }

        el-main {
            max-width: 1200px;
            width: 100%;
        }
    }
    
}

</style>