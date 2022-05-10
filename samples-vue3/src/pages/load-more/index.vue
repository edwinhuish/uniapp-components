<template>
  <view class="content">
    <scroll-view>
      <div v-for="item in data.list" :key="item" class="block">item-{{ item }}</div>
      <LoadMore :loading="data.loading" :nomore="nomore"></LoadMore>
    </scroll-view>
  </view>
</template>

<script setup>
import { LoadMore } from '../../../../index.js'
import { reactive, computed } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'

const data = reactive({
  list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  loading: false,
})

onReachBottom(() => loadmore())

const nomore = computed(() => data.list.length >= 30)

function loadmore(){
  if(nomore.value){
    return
  }
  data.loading = true
  api().then(list => {
    data.list = [...data.list, ...list]
    data.loading = false
  })
}

function api() {
  return new Promise(resolve => {
    // 下拉刷新
    setTimeout(() => {
      const last = data.list.length
      const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => value + last)
      console.log(list)
      resolve(list)
    }, 1000 * 2)
  })
}
</script>

<style>
.content {
  text-align: center;
  /* height: 100%; */
  min-height: 101vh;
}

.content .block {
  height: 200px;
  line-height: 200px;
  text-align: center;
  margin: 10px;
  background-color: aquamarine;
  width: calc(100% - 20px);
}
</style>
