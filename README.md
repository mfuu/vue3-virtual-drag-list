# vue-virtual-draglist

[![npm](https://img.shields.io/npm/v/vue-virtual-draglist/next.svg)](https://www.npmjs.com/package/vue-virtual-draglist)  [![npm](https://img.shields.io/npm/dm/vue-virtual-draglist.svg)](https://www.npmjs.com/package/vue-virtual-draglist)  [![vue2](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)  [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

A virtual scrolling list component that can be sorted by dragging, support vue3

If you use vue with 2.x, see [here](https://github.com/mfuu/vue-virtual-drag-list)

### [Live demo](https://mfuu.github.io/vue-virtual-drag-list/)

## Simple usage

```bash
npm i vue-virtual-draglist@next
```

Root component:
```vue
<template>
  <div>
    <!--
      :dataSource="items"
      :handle="'i'" // use tagName 
      :handle="'.drag'" // use class
      :handle="'#drag'" // use id
    -->
    <VirtualList
      v-model:dataSource="items"
      :dataKey="'id'"
      :handle="'#drag'"
      style="height: 500px;"
    >
      <template v-slot:item="{ record, index, dataKey }">
        <i id="drag" class="drag">drag me</i>
        <span>{{ record.text }}</span>
      </template>
    </VirtualList>
  </div>
</template>

<script setup lang="ts">
import VirtualList from 'vue-virtual-draglist';

// const items = ref([{id: '1', text: 'abc'}, {id: '2', text: 'def'}]);
const items = computed({
  get() {
    return [];
  },
  set(val) {
    // trigger when drag state changed if you use then `v-model:dataSource`
    console.log(val);
  }
})
</script>

```
## Emits

|   **Emit**   | **Description** |
|--------------|-----------------|
| `top`        | Event fired when scroll to top |
| `bottom`     | Event fired when scroll to bottom |
| `drag`       | Event fired when the drag is started |
| `drop`       | Event fired when the drag is completed |
| `add`        | Event fired when element is dropped into the list from another |
| `remove`     | Event fired when element is removed from the list into another |

## Props

### Required props

| **Prop** | **Type**  | **Description** |
|------------------|-------------|------------------|
| `data-key`       | String      | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `data-source`    | Array/Ref   | The list you want to render  |

### Optional props

**Commonly used**

|   **Prop**   |  **Type**  | **Default** | **Description** |
| ------------ | ---------  | ----------- | --------------- |
| `keeps`      | `Number`   | `30`        | The number of lines rendered by the virtual scroll |
| `size`       | `Number`   | `-`         | The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated |
| `handle`     | `Function/String` | `-`  | Drag handle selector within list items |
| `group`      | `Object/String` | `-`  | string: 'name' or object: `{ name: 'group', put: true/false, pull: true/false }` |
| `keepOffset` | `Boolean`  | `false`     | When scrolling up to load data, keep the same offset as the previous scroll |
| `direction`  | `String`   | `vertical`  | `vertical/horizontal`, scroll direction |


**Uncommonly used**

|  **Prop**    | **Type**   | **Default** | **Description** |
|  --------    | --------   | ----------- | --------------- |
| `draggable`  | `Function/String` | `-`  | Specifies which items inside the element should be draggable. If does not set a value, the default list element can be dragged |
| `disabled`   | `Boolean`  | `false`     | Disables the sortable if set to true |
| `delay`      | `Number`   | `0`         | Delay time of debounce function |
| `animation`  | `Number`   | `150`       | Animation speed moving items when sorting |
| `autoScroll` | `Boolean`  | `true`      | Automatic scrolling when moving to the edge of the container |
| `scrollThreshold` | `Number` | `55`     | Threshold to trigger autoscroll |
| `pressDelay` | `Number`   | `0`         | Time in milliseconds to define when the sorting should start |
| `pressDelayOnTouchOnly` | `Boolean`   | `false`         | Only delay on press if user is using touch |
| `fallbackOnBody` | `Boolean` | `false`  | Appends the ghost element into the document's body |
| `rootTag`    | `String`   | `div`       | Label type for root element |
| `wrapTag`    | `String`   | `div`       | Label type for list wrap element |
| `itemTag`    | `String`   | `div`       | Label type for list item element |
| `headerTag`  | `String`   | `div`       | Label type for header slot element |
| `footerTag`  | `String`   | `div`       | Label type for footer slot element |
| `wrapClass`  | `String`   | `''`        | List wrapper element class |
| `wrapStyle`  | `Object`   | `{}`        | List wrapper element style |
| `itemClass`  | `String`   | `''`        | List item element class |
| `itemStyle`  | `Object`   | `{}`        | List item element style |
| `ghostClass` | `String`   | `''`        | The class of the mask element when dragging |
| `ghostStyle` | `Object`   | `{}`        | The style of the mask element when dragging |
| `chosenClass`| `String`   | `''`        | The class of the selected element when dragging |

## Methods

| **Method**         | **Description** |
| ------------------ | --------------- |
| `reset()`          | Reset to initial |
| `getSize(key)`     | Get the size of the current item by unique key value |
| `getOffset()`      | Get the current scroll height |
| `scrollToTop()`    | Scroll to top of list |
| `scrollToBottom()` | Scroll to bottom of list |
| `scrollToIndex(index)`  | Scroll to the specified index position |
| `scrollToOffset(offset)` | Scroll to the specified offset |
