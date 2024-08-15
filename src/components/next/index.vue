<template>
    <div class="next">
        <div v-for="(item,index) in param.block" :key="index">
            <b :class="e ? 'c' : ''" v-for="(e,k2) in item" :key="k2"></b>
        </div>
    </div>
</template>

<script setup>
    import { watch,onMounted,ref } from 'vue';
    import { blockShape } from '@/unit/const'

    const xy = {
        // 方块在下一个中的坐标
        I: [1, 0],
        L: [0, 0],
        J: [0, 0], 
        Z: [0, 0],
        S: [0, 0],
        O: [0, 1],
        T: [0, 0]
    }
    const empty = [[0, 0, 0, 0], [0, 0, 0, 0]]

    const param = ref({
        block : empty,
    });

    const props = defineProps(['data']);
    onMounted(()=>{
        build(props.data)
    })

    watch(props,(nextVal)=>{
        build(nextVal.data);
    },{deep:true})

    const build = (type) =>{
        const shape = blockShape[type];
        const block = empty.map(e => [...e]);
        shape.forEach((m,k1) => {
            m.forEach((n,k2) => {
                if(n){
                    block[k1 + xy[type][0]][k2 + xy[type][1]] = 1;
                }
            })
        })
        param.value.block = block;
    }

</script>

<style scoped>
    .next div{
        height: 22px;
        width: 88px;
        float: right;
    }
    .c::after{
        background: #000;
    }
</style>