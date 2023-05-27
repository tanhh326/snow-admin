import { defineComponent, h, ref } from "vue";

// 过滤器 @filter="node => node._selected = true"
const onFilter = "filter";

/**
 * 渲染 dom
 * @param   {Object}  ctx         上下文 vue对象
 * @param   {Object}  parentNode  父节点
 * @param   {Array}   nodes       节点集合
 * @param   {Number}  depth       深度
 * @returns {Array}   VNode
 */
function renderNodes(ctx, parentNode, nodes, depth) {
    nodes = nodes || [];
    return nodes.map(node => {
        // 节点层级
        node._depth = depth;
        // 父节点
        node._parent = parentNode;
        // 节点路径
        const parentPath = (parentNode && parentNode._path) || [];
        node._path = [].concat(parentPath, node);
        // 节点选中状态
        node._selected = false;
        // 节点隐藏状态
        node._hide = false;
        // 过滤器
        ctx.$emit(onFilter, node);

        // 节点关闭状态
        if (node._closed === undefined) {
            node._closed = !node._selected;
            // 如果节点展开，展开祖先节点
            if (!node._closed) {
                parentPath.forEach(parent => {
                    parent._closed = false;
                });
            }
        }

        if (node._hide) {
            return undefined;
        }
        // 节点标签
        const title =
            (ctx.$slots.title && ctx.$slots.title({ node })) || node.title;
        // 递归
        const subNodes = renderNodes(ctx, node, node.children, depth + 1);
        // 子节点dom
        const subMenu = h(
            "div",
            {
                style: {
                    height: node._closed ? 0 : "auto",
                    overflow: "hidden"
                }
            },
            subNodes
        );
        // 节点dom
        return h("div", {}, [title, subMenu]);
    });
}

/**
 * 模块定义
 */
export default defineComponent({
    props: {
        items: Array
    },

    emits: [onFilter],

    setup() {
        const selected = ref([]);
        return {
            selected
        };
    },

    render() {
        return h("div", {}, renderNodes(this, null, this.items, 0));
    }
});

