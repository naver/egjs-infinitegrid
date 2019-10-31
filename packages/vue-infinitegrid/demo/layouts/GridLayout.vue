<template>
    <GridLayout
		ref="ig"
        :options="{
            align: 'center',
            transitionDuration: 0.2,
            isOverflowScroll: false
        }"
        @append="onAppend"
        @layout-complete="onLayoutComplete"
        @image-error="onImageError"
    >
        <Loading><div>Loading</div></Loading>
        <div class="item" v-for="(item, i) in list" :key="item.key"
            @click="remove(i)">
            <div class="thumbnail">
                <img :src="`https://naver.github.io/egjs-infinitegrid/assets/image/${(item.num + 1) % 59}.jpg`"/>
            </div>
            <div class="info">
                egjs {{ item.num }}
            </div>
        </div>
    </GridLayout>
</template>
<script>
import infinitegrid from "../../src/index";
console.log(infinitegrid)

export default {
    components: {
        Loading: infinitegrid.Loading,
        GridLayout: infinitegrid.GridLayout,
    },
    data() {
        return {
            start: 0,
            loading: false,
            list: [],
        };
	}, 
    methods: {
        loadItems(groupKey, num) {
            const items = [];
            const start = this.start || 0;

            for (let i = 0; i < num; ++i) {
                items.push({
                    groupKey,
                    num: start + i,
                    key: start + i
                });
            }
            this.start = start + num;
            return items;
        },
        remove(index) {
            this.list.splice(index, 1);
        },
        onAppend({ groupKey }) {
            const list = this.list;
            const items = this.loadItems(parseFloat(groupKey || 0) + 1, 5);
			window.a = this.$refs.ig;

			this.$refs.ig.startLoading();
			console.log("start")
			this.list = list.concat(items);
        },
        onLayoutComplete({ isLayout }) {
			console.log("complete")
            if (!isLayout) {
                this.$refs.ig.endLoading();
            }
        },
        onImageError({ totalIndex }) {
            this.list.splice(totalIndex, 1);
        }
    }
}
</script>
<style scoped>
.item {
	width: 250px;
	opacity: 1;
}
.item .thumbnail {
	max-height: 300px;
	overflow: hidden;
	border-radius: 8px;
}
.item .thumbnail img {
	width: 100%;
}
.item .info {
	margin-top: 10px;
	font-weight: bold;
	color: #777;
}
.item.animate {
	transition: opacity ease 1s;
	transition-delay: 0.2s;
	opacity: 1;
}
.loading {
	position: absolute;
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-weight: bold;
}
</style>