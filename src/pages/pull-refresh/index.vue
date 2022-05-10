<template>
  <view class="content">
    <PullRefresh success-text="刷新完成!" @refresh="onRefresh" @change="onChange">
      <div v-for="item in list" :key="item" class="block">item-{{ item }}</div>
    </PullRefresh>
  </view>
</template>

<script>
import { PullRefresh } from '../../components'
export default {
  components: {
    PullRefresh,
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  },
  methods: {
    onRefresh(done) {
      console.log('onRefresh')
      // 下拉刷新
      setTimeout(() => {
        this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        console.log('refresh done!')
        done()
      }, 1000 * 2)
    },
    onChange({ status }) {
      console.log('change status: ', status)
    },
  },
}
</script>

<style>
.content {
  text-align: center;
  height: 100%;
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
