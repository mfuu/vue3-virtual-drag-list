# Getting Started

## Installation

::: code-group

```sh [npm]
$ npm i vue-virtual-draglist@next
```

```sh [yarn]
$ yarn add vue-virtual-draglist@next
```

:::

## Simple Usage

```vue
<template>
  <virtual-list
    v-model="list"
    data-key="id"
  >
    <template v-slot:item="{ record, index, dataKey }">
      <div>
        item slot content
      </div>
    </template>
  </virtual-list>
</template>

<script setup>
import VirtualList from 'vue-virtual-draglist';
import { ref } from 'vue';

const list = ref([{ id: 'a', text: 'a', id: 'b', text: 'b' }]);
</script>
```