<template>
    <div>
        <p>{{ param.label }}</p>
        <Number :number="param.number"/>
    </div>
</template>

<script setup>
    import { watch,ref,onMounted } from 'vue';

    import Number from '@/components/number/index.vue'

    let Point = {
        timeout : null,
    }

    const props = defineProps(['cur' , 'point' , 'max']);
    const param = ref({
        label: '',
        number:0
    });

    onMounted(()=>{
        onChange(props);
    })

    watch(props,(nextVal)=>{
        onChange(nextVal);
    },{deep:true})

    const onChange = ({cur, point, max}) =>{       
        clearInterval(Point.timeout);
        if(cur) {
            //游戏进行中
            param.value.label = point >= max ? '最高分' : '得分';
            param.value.number = point;
        }else {
            //游戏未开始
            const toggle = () =>{
                // 最高分与上轮得分交替出现
                param.value.label = '上轮得分';
                param.value.number = point;
                Point.timeout = setTimeout(()=>{
                    param.value.label = '最高分';
                    param.value.number = max;
                    Point.timeout = setTimeout(()=>toggle,3000);
                },3000);
            }

            if(point !== 0){
                // 如果为上轮没玩, 也不用提示了
                toggle();
            }else {
                param.value.label = '最高分';
                param.value.number = max;
            }
        }
    }

</script>

<style scoped>

</style>