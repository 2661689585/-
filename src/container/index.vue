<script setup>
import { onMounted } from 'vue'
import { useLastRecord } from '@/stores/lastRecord'
import { d } from '@/stores/store' 
import states from '@/control/states'

import decorate from '@/components/decorate/index.vue'
import matrix from '@/components/matrix/index.vue'
import Logo from '@/components/logo/index.vue'
import Point from '@/components/point/index.vue'
import Number from '@/components/number/index.vue'
import Next from '@/components/next/index.vue'
import Music from '@/components/music/index.vue'
import Pause from '@/components/pause/index.vue'
import keyboard from '@/components/keyboard/index.vue'

const store = d();
const lastRecord = useLastRecord();

onMounted(()=>{
    start()
})

const start = ()=>{
    let lastRecords = lastRecord.Data;
    if(lastRecords){
        // 读取记录
        if(lastRecords.cur && !lastRecords.pause){
            // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
            let timeout = speeds[speedRun - 1] / 2 // 继续时, 给予当前下落速度一半的停留时间
            
            timeout = speedRun < speeds[speeds.length - 1]
                ? speeds[speeds.length - 1]
                : speedRun;
            states.auto(timeout);
        } 

        if (!lastRecords.cur) {
            states.overStart();
        }
    }else{
        states.overStart();
    }
};

</script>


<template>
    <div class="app">
        <div class="rect">
            <decorate />
            <div class="screen">
                <div class="panel">
                    <matrix :propMatrix=store.matrix :reset="store.reset" :cur="store.cur" />
                    <Logo :cur="!!store.cur" :reset="store.reset" />
                    <div class="state">
                        <Point :cur="!!store.cur" :max="store.max" :point="store.points" />
                        <p>{{ store.cur ? '消除行' : '起始行' }}</p>
                        <Number :number='store.cur ? store.clearLines : store.startLines' />
                        <p>{{ '级别' }}</p>
                        <Number :number='store.cur ? store.speedRun : store.speedStart' :length="1" />
                        <p>{{'下一个'}}</p>
                        <Next :data="store.next" />
                        <div class="bottom">
                            <Music :data="store.music" />
                            <Pause :data="store.pause" />
                            <Number :propTime="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <keyboard />
    </div>
</template>


<style scoped>
    .app{
        box-sizing: border-box;
        width:95%;
        max-width: 678px;
        height: 99%;
        border-radius: 20px;
        
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%,-50%);

        padding: 48px 10px;
        background: #efcc19;
        box-shadow: 0 0 10px #fff inset;
    }

    .rect{
        width: 480px;
        margin: 0 auto;
        border:solid #000;
        border-width: 0 10px 10px 10px;
        border-top: none;
        padding: 45px 0 35px;
        box-sizing: border-box;
    }

    .screen{
        width: 390px;
        height: 478px;
        border: 5px solid;
        border-color: #987f0f #fae36c #fae36c #987f0f;
        margin: 0 auto;
        position: relative;
    }
    .panel{
        width: 380px;
        height: 468px;
        margin: 0 auto;
        background: #9ead86;
        padding: 8px;
        border: 2px solid #494536;
    }

    .state{
        width: 108px;
        position: absolute;
        top: 0;
        right: 15px;
    }
    
    
</style>

<style>
    .state p{
        line-height: 47px;
        height: 57px;
        padding: 10px 0 0;
        white-space: nowrap;
        clear: both;
    }

    .state .bottom {
        position: absolute;
        width: 114px;
        top: 426px;
        left: 0;
    }
</style>