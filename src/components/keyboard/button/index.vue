<template>
    <div ref="thisRef" class="button" :class="color+' '+size" :style="'top:'+top+'px;'+'left:'+left+'px'">
        <i :class="{'active':active}"></i>
        <em :style="'transform:'+arrow+' scale(1,2)'" v-show="size==='s1'" />
        <span :class="position?'position':''">
            {{label}}
        </span>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const props = defineProps([
        'active',
        'color',
        'size',
        'top',
        'left',
        'label',
        'position',
        'arrow'
    ])

    const thisRef = ref(null);
    defineExpose({thisRef})
</script>

<style scoped>
    .button {
        position: absolute;
        text-align: center;
        color: #111;
        position: absolute;
        white-space: nowrap;
        line-height: 1.6;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    .s2 {
        font-size: 16px;
    }
    span .position {
        position: absolute;
        top: 5px;
        left: 102px;
    }
    i {
        display: block;
        position: relative;
        border: 1px solid #000;
        border-radius: 50%;
    }
    i::after , i::before{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        box-shadow: 0 5px 10px rgba(255, 255, 255, .8) inset;
    }
    i::after{
        box-shadow: 0 -5px 10px rgba(0, 0, 0, .8) inset;
    }
    .active {
        box-shadow: 0 3px 3px rgba(0, 0, 0, .2);
    }
    .active::after{
        box-shadow: 0 5px 5px rgba(0, 0, 0, .6) inset;
    }
    .active::before{
        box-shadow: 0 -3px 6px rgba(255, 255, 255, .6) inset;
    }
    .blue i {
        background: linear-gradient(to top,#6e77ef,#4652f3);
    }
    .green i {
        background: linear-gradient(to top,#4bc441,#0ec400);
    }
    .red i {
        background: linear-gradient(to top,#dc3333,#de0000);
    }
    .s0 i {
        width: 160px;
        height: 160px;
    }
    .s1 i {
        width: 100px;
        height: 100px; 
    }
    .s2 i {
        width: 52px;
        height: 52px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
    }
    .s2::before , .s2::after{
        box-shadow: 0px 3px 6px rgba(255, 255, 255, .8) inset;
    }
    .s2::after{
        box-shadow: 0px -3px 6px rgba(0, 0, 0, .8) inset;
    }
    .s2 .active::after{
        box-shadow: 0px 3px 3px rgba(0, 0, 0, .7) inset;
    }
    .s2 .active::before{
        box-shadow: 0px -1px 2px rgba(255, 255, 255, .6) inset;
    }

    em {
        display: block;
        width: 0;
        height: 0;
        border: 8px solid;
        border-color: transparent transparent #111;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -12px 0 0 -8px;
    }

    .position {
        position: absolute;
        top: 30px;
        left: 110px;
    }
</style>