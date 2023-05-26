<script lang="ts" setup></script>


<template>
  <div>
    <div class="container">树形列表</div>
    <input type="text" v-model="searchTerm" />
    <button @click="search">Search</button>
    <ul>
      <li v-for="item in filteredData" :key="item.id">
        {{ item.name }}
        <tree-view v-if="item.children" :data="item.children"></tree-view>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchableTreeView",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    filteredData() {
      const filterNodes = (nodes) => {
        return nodes.filter((node) => {
          if (node.name.includes(this.searchTerm)) {
            return true;
          }
          if (node.children) {
            return filterNodes(node.children).length > 0;
          }
          return false;
        });
      };
      return filterNodes(this.data);
    },
  },
  methods: {
    search() {
      // 获取搜索结果
      const result = this.filteredData;
      // 处理搜索结果
      console.log(result);
      // 清空搜索框
      this.searchTerm = "";    },
  },
};
</script>
