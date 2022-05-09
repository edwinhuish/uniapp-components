<template>
    <view class="content">
        <EPullRefresh v-model="refreshing" @refresh="onRefresh" @change="onChange" success-text="刷新完成!">
            <div class="block" v-for="item in list" :key="item">item-{{item}}</div>
        </EPullRefresh>
    </view>
</template>

<script>
    import EPullRefresh from '@/components/e-pull-refresh/e-pull-refresh.vue'
    export default {
        components: {
            EPullRefresh
        },
        data() {
            return {
                refreshing: false,
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        methods: {
            onRefresh() { // 下拉刷新
                setTimeout(() => {
                    this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    this.refreshing = false
                }, 1000 * 2)
            },
            onChange({
                status
            }) {
                console.log('change status: ', status)
            }
        }
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
