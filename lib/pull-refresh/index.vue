<template>
  <view class="wrapper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchcancel">
    <!-- 提示信息 -->
    <view class="notice-wrapper">
      <slot name="notice">
        <text>{{ noticeText }}</text>
      </slot>
    </view>
    <!-- 内容 -->
    <view
      class="content-wrapper"
      :style="{
        transform: `translateY( ${deviation}px )`,
        transition: `${transition}ms`,
      }"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PullRefresh',
  props: {
    // 下拉过程提示文案
    pullingText: {
      type: String,
      default: '下拉即可刷新...',
    },
    // 释放过程提示文案
    loosingText: {
      type: String,
      default: '释放即可刷新...',
    },
    // 加载过程提示文案
    loadingText: {
      type: String,
      default: '加载中...',
    },
    // 刷新成功提示文案
    successText: {
      type: String,
      default: '',
    },
    // 刷新成功提示展示时长(ms)
    successDuration: {
      type: Number,
      default: 500,
    },
    // 动画时长
    animationDuration: {
      type: Number,
      default: 300,
    },
    // 触发下拉刷新的距离
    pullDistance: {
      type: Number,
      default: 50,
    },
    // 越界阻尼系数
    outDamping: {
      type: Number,

      default: 100,
    },
    // 是否禁用下拉刷新

    disabled: {
      type: Boolean,

      default: false,
    },
  },
  data() {
    return {
      deviation: 0, // 下偏移量
      transition: 0, // 动画时长
      status: 0, // 0 初始状态， 1 准备刷新， 2 刷新中， 3 刷新完成
      startY: 0, // 拖动开始的Y点
      touching: false, // 触控中
    }
  },
  computed: {
    noticeText() {
      switch (this.status) {
        case 0:
          return this.pullingText
        case 1:
          return this.loosingText
        case 2:
          return this.loadingText
        case 3:
          return this.successText
        default:
          return this.loosingText
      }
    },
  },
  watch: {
    status(newVal) {
      this.$emit('change', { status: newVal })
    },
  },
  methods: {
    touchstart(e) {
      if (this.disabled) {
        return
      }
      this.touching = true
      this.status = 0
      this.transition = 0
      this.startY = this.startY || e.touches[0].pageY // 避免还没有结束再次点击
    },
    touchmove(e) {
      if (this.disabled) {
        return
      }
      // 如果没有标记触碰中，则直接返回
      if (!this.touching) {
        return
      }

      const distance = e.touches[0].pageY - this.startY
      if (distance >= this.pullDistance) {
        this.status = 1
        const diff = distance - this.pullDistance
        const dumping = this.outDamping > 1 ? this.outDamping : 1
        const add = diff / dumping
        this.deviation = this.pullDistance + add
      } else {
        this.status = 0
        this.deviation = distance
      }
    },
    touchend(e) {
      if (this.disabled) {
        return
      }
      this.touching = false

      // 可刷新
      if (this.status === 1) {
        this.status = 2 // 标记为刷新中
        this.$emit('refresh', this.success)
      } else {
        this.restore()
      }
    },
    touchcancel(e) {
      if (this.disabled) {
        return
      }
      this.touching = false
    },
    success() {
      console.log('refresh finished')
      this.status = 3
      setTimeout(this.restore(), this.successDuration)
    },
    restore() {
      this.transition = this.animationDuration
      this.deviation = 0
      this.startY = 0
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}
/* 提示栏 */
.notice-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 12px;
  z-index: 0;
}
</style>
