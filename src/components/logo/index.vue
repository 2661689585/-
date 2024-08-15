<template>
    <div class="logo" :style="'display:' + data.display">
        <div class="bg dragon" :class="data.style"></div>
        <p>啦啦啦</p>
    </div>
</template>

<script setup>
import { ref,watch,onBeforeMount } from 'vue'

const props = defineProps(['cur','reset']);

let Logo = {
    timeout : null
};

watch(props,(nextVal,oldVal) => {
    animate(nextVal);
    if(
        // 只有在游戏进入开始, 或结束时 触发改变
        ([oldVal.cur, nextVal.cur].indexOf(false) !== -1 &&
        oldVal.cur !== nextVal.cur) ||
        oldVal.reset !== nextVal.reset
    ){
        animate(nextVal);
    }
},{ deep: true });

const data = ref({
    style : 'r1',
    display : 'none',
});

onBeforeMount (() =>{    
    animate(props);
})

const animate = ({cur , reset}) =>{
    clearTimeout(Logo.timeout);
    data.value.style = 'r1';
    data.value.display = 'none';

    if (cur || reset) {
        data.value.display = 'none';
        return;
    }

    let m = 'r' ; //方向
    let count = 0 ;

    const set = (func, delay) =>{
        if(!func){
            return;
        }
        Logo.timeout = setTimeout(func,delay);
    }

    const show = func =>{
        // 显示
        set(() => {
            data.value.display = 'block';
            if (func) {
                func();
            }
        }, 150);
    }

    const hide = func => {
        // 隐藏
        set(() => {
            data.value.display = 'none'
            if (func) {
                func();
            }
        }, 150);
    }

    const eyes = (func, delay1, delay2) => {
        // 龙在眨眼睛
        set(() => {
            data.value.style = m + 2;
            set(() => {
            data.value.style = m + 1;
            if (func) {
                func();
            }
            }, delay2);
        }, delay1)
    }

    const run = func =>{
        // 跑
        set(() => {
            data.value.style = m + 4
            set(() => {
                data.value.style = m + 3
                count++
                if (count === 10 || count === 20 || count === 30) {
                    m = m === 'r' ? 'l' : 'r'
                }
                if (count < 40) {
                    run(func)
                    return
                }
                data.value.style = m + 1
                if (func) {
                    set(func, 4000)
                }
            }, 100)
        }, 100)
    }

    const dra = () => {
        count = 0
        eyes(
          () => {
            eyes(
              () => {
                eyes(
                  () => {
                    data.value.style = m + 2;
                    run(dra);
                  },
                  150,
                  150
                )
              },
              150,
              150
            )
          },
          1000,
          1500
        )
    }
    show(() => {
        // 忽隐忽现
        hide(() => {
            show(() => {
                hide(() => {
                    show(() => {
                        dra() // 开始运动
                    })
                })
            })
        })
    });
}

</script>

<style scoped>
    .logo {
        width: 224px;
        height: 200px;
        position: absolute;
        top: 100px;
        left: 12px;
        text-align: center;
        overflow: hidden;
    }
    .logo > p {
        position: absolute;
        width: 100%;
        line-height: 1.4;
        top: 100px;
        left: 0;
        font-family: initial;
        letter-spacing: 6px;
        text-shadow: 1px 1px 1px rgba(255, 255, 255, .35);
    }
    .dragon {
        width: 80px;
        height: 86px;
        margin: 0 auto;
        background-position: 0 -100px;
    }
    
    .r1,.l1{
        background-position: 0 -100px;
    }
    .r2,.l2{
        background-position: -100px -100px;
    }
    .r3,.l3{
        background-position: -200px -100px;
    }
    .r4,.l4{
        background-position: -300px -100px;
    }
    .l1,l2,l3,l4 {
        transform: scale(-1, 1);
        -webkit-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        -moz-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
    }
</style>