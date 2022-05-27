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
      :style="contentWrapperStyle"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
const STATUS_DEFAULT = 0
const STATUS_READY = 1
const STATUS_LOADING = 2
const STATUS_DONE = 3

export default {
  name: 'PullRefresh',
  props: {
    // 下拉过程提示文案
    pullingText: {
      type: String,
      default: '下拉即可刷新...',
    },
    // 释放过程提示文案
    readyText: {
      type: String,
      default: '释放即可刷新...',
    },
    // 加载过程提示文案
    loadingText: {
      type: String,
      default: '加载中...',
    },
    // 刷新完成提示文案
    doneText: {
      type: String,
      default: '',
    },
    // 刷新完成提示展示时长(ms)
    doneDuration: {
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
        case STATUS_DEFAULT:
          return this.pullingText
        case STATUS_READY:
          return this.readyText
        case STATUS_LOADING:
          return this.loadingText
        case STATUS_DONE:
          return this.doneText
        default:
          return this.readyText
      }
    },
    contentWrapperStyle() {
      if (this.status !== STATUS_DEFAULT) {
        return {
          transform: `translateY( ${this.deviation}px )`,
          transition: `${this.transition}ms`,
        }
      } else {
        return {}
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
      if (e.cancelable) {
        e.preventDefault()
      }

      if (this.disabled) {
        this.touching = false
        return
      }
      this.touching = true
      this.status = STATUS_DEFAULT
      this.transition = 0
      this.startY = this.startY || e.touches[0].pageY // 避免还没有结束再次点击
    },
    touchmove(e) {
      if (e.cancelable) {
        e.preventDefault()
      }
      if (this.disabled) {
        this.touching = false
        return
      }
      // 如果没有标记触碰中，则直接返回
      if (!this.touching) {
        return
      }

      const distance = e.touches[0].pageY - this.startY
      if (distance >= this.pullDistance) {
        this.status = STATUS_READY
        const diff = distance - this.pullDistance
        const dumping = this.outDamping > 1 ? this.outDamping : 1
        const add = diff / dumping
        this.deviation = this.pullDistance + add
      } else {
        this.status = STATUS_DEFAULT
        this.deviation = distance
      }
    },
    touchend(e) {
      if (e.cancelable) {
        e.preventDefault()
      }

      if (this.disabled) {
        this.touching = false
        return
      }
      this.touching = false

      // 可刷新
      if (this.status === STATUS_READY) {
        this.status = STATUS_LOADING // 标记为刷新中
        this.$emit('refresh', this.done)
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
    done() {
      // console.log('refresh done')
      this.status = STATUS_DONE
      setTimeout(this.restore(), this.doneDuration)
    },
    restore() {
      this.transition = this.animationDuration
      this.deviation = 0
      this.startY = 0
      // 将 status 恢复到初始状态
      setTimeout(() => (this.status = STATUS_DEFAULT), this.animationDuration)
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
