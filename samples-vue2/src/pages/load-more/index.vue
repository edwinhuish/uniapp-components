<template>
  <view class="content">
    <div v-for="item in list" :key="item" class="block">item-{{ item }}</div>
    <LoadMore :loading="loading" :nomore="nomore"></LoadMore>
  </view>
</template>

<script>
import { LoadMore } from '../../../../index.js'
export default {
  components: {
    LoadMore,
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      loading: false,
    }
  },
  computed: {
    nomore() {
      return this.list.length >= 30
    },
  },
  methods: {
    onReachBottom() {
      this.loadmore()
    },
    loadmore() {
      if (this.nomore) {
        return
      }
      this.loading = true
      this.api().then(list => {
        this.list = [...this.list, ...list]
        this.loading = false
      })
    },
    api() {
      return new Promise(resolve => {
        // 下拉刷新
        setTimeout(() => {
          const last = this.list.length
          const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => value + last)
          console.log(list)
          resolve(list)
        }, 1000 * 2)
      })
    },
  },
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
