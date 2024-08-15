<template>
    <div class="bg pause" :class="{'c' : param.showPause}"></div>
</template>

<script setup>
    import { ref,onMounted,watch } from 'vue';

    let Pause = {
        timeout : null,
    }
    const param = ref({
        showPause : false,
    })
    const props = defineProps(['data']);

    watch(props,(nextVal)=>{
        setShake(nextVal);
    },{deep:true})

    onMounted(()=>{
        setShake(props.data);
    })

    const setShake = (bool) =>{
        if(bool && !Pause.timeout) {
            Pause.timeout = setInterval(()=>{
                param.value.showPause = !param.value.showPause;
            },250)
        }
        if(!bool && Pause.timeout) {
            clearInterval(Pause.timeout);
            param.value.showPause = false;
            Pause.timeout = null;
        }

    }

</script>

<style scoped>
    .pause {
        width: 20px;
        height: 18px;
        background-position: -100px -75px;
        position: absolute;
        top: 3px;
        left: 18px;
    }
    .c {
        background-position: -75px -75px;
    }
</style>