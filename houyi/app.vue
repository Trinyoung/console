<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>
<!-- 使用nuxt.js作为qiankun.js 的子应用 -->
<script>
    export default {
        mounted() {
            console.log('mounted')
        },
        methods: {
            // qiankun 生命周期钩子 - 加载子应用前
            async bootstrap(props) {
                console.log('vue app bootstraped', props)
            },
            // qiankun 生命周期钩子 - 挂载后
            async mount(props) {
                console.log('vue app mount', props)
            },
            // qiankun 生命周期钩子 - 卸载后
            async unmount(props) {
                console.log('vue app unmount', props)
            }
        }
    }
    
</script>