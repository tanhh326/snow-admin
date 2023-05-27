<script lang="ts" setup></script>

<!-- 调用 -->
<template>
  <div>
    <i-tree :items="items" @filter="treeFilter">
      <template #title="{ node }">
        <div
            :style="{
            display: 'flex',
            paddingLeft: `${node._depth * 20}px`,
            color: node._selected ? 'blue' : 'black'
          }"
            @click="clickNode(node)"
        >
          <div style="cursor: pointer; flex: 1;">
            {{ node.title }}
          </div>
          <div
              v-if="node.children && node.children.length"
              style="flex: 0 0 20px; text-align: center; cursor: pointer"
          >
            {{ node._closed ? "+" : "-" }}
          </div>
        </div>
      </template>
    </i-tree>
  </div>
</template>

<script>
import ITree from "src/pages/components/ITree.js";

const treeData = [
  {
    id: "page",
    title: "Page",
    children: [
      {
        id: "page1-1",
        title: "Page1",
        path: "/page1",
        children: [
          {
            id: "page1-1-1",
            title: "Page1-1",
            path: "/page1-1",
            children: [

            ]
          },
          {
            id: "page1-1-2",
            title: "Page1-2",
            path: "/page1-2"
          }
        ]
      },
      {
        id: "page1-2",
        title: "Page2",
        path: "/page2",
        children: [
          {
            id: "page2-1-1",
            title: "Page2-1",
            path: "/page2-1",
          },
          {
            id: "page2-1-2",
            title: "Page2-2",
            path: "/page2-2"
          }
        ]
      }
    ]
  }
];

export default {
  name: "SearchableTreeView",
  components: { ITree },
  data: () => ({
    items: treeData,
    activePath: ""
  }),
  methods: {
    clickNode(node) {
      console.log(node)
      if (node.children && node.children.length) {
        node._closed = !node._closed;
      } else {
        this.activePath = node.path;
        console.log("=========================")
        console.log(this.activePath)
        // this.$router.push(node.path);
      }
    },
    treeFilter(node) {
      node._selected = node.path === this.activePath;
    }
  },
  created() {
    this.activePath = this.$route.path;
  }
};
</script>

