# Emits

## `top`

scrolled to the top of list

## `bottom`

scrolled to the bottom of list

## `drag`

drag is started

```ts
const {
  item,
  key,
  index,
  event,
} = dragEvent
```

## `drop`

drag is completed

```ts
const {
  key,
  item,
  list,
  event,
  changed,
  oldList,
  oldIndex,
  newIndex,
} = dropEvent
```

## `rangeChange`

drag is completed

```ts
const {
  start,
  end,
  front,
  behind,
} = range;
```
