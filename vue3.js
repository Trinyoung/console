
// Vue3 是如何实现runtime 的初始化和更新的
// 1. 通过 createApp 创建一个应用实例
function createApp(rootComponent, rootProps = null) {
    return {
        mount(rootContainer) {
            let isMounted = false;
            let prevNode = null;
            // 更新函数
            function updateComponent() {
                if (isMounted) {
                    const nextNode = rootComponent.render(rootProps);
                    patch(prevNode, nextNode, rootContainer);
                    prevNode = nextNode;
                } else {
                    // 首次渲染
                    const nextNode = rootComponent.render(rootProps);
                    mount(nextNode, rootContainer);
                    prevNode = nextNode;
                    isMounted = true;
                }
            }
            updateComponent();
        }
    }
}
// 2. 通过 mount 方法挂载到指定的dom上
// 3. 通过 render 方法渲染组件
// 4. 通过 createVNode 方法创建虚拟节点
// 5. 通过 patch 方法将虚拟节点转换成真实节点
// 6. 通过 setup 方法初始化组件的状态
// 7. 通过 render 方法渲染组件
// 8. 通过 createVNode 方法创建虚拟节点
// 9. 通过 patch 方法将虚拟节点转换成真实节点
// 10. 通过 createVNode 方法创建虚拟节点
// 11. 通过 patch 方法将虚拟节点转换成真实节点

// Path: vue3.js
