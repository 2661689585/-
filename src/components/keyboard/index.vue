<template>
    <div class="keyboard">
        <vbutton
          color="blue"
          size="s1"
          :top="0"
          :left="374"
          :label="'旋转'"
          arrow="translate(0, 63px)"
          :position="true"
          :active="keyboard['rotate']"
          ref="dom_rotate"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="180"
          :left="374"
          :label="'下移'"
          arrow="translate(0,-71px) rotate(180deg)"
          :active="keyboard['down']"
          ref="dom_down"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="90"
          :left="284"
          :label="'左移'"
          arrow="translate(60px, -12px) rotate(270deg)"
          :active="keyboard['left']"
          ref="dom_left"
        />
        <vbutton
          color="blue"
          size="s1"
          :top='90'
          :left='464'
          :label="'右移'"
          arrow="translate(-60px, -12px) rotate(90deg)"
          :active="keyboard['right']"
          ref="dom_right"
        />
        <vbutton
          color="blue"
          size="s0"
          :top="100"
          :left="52"
          :label="'掉落'"
          :active="keyboard['drop']"
          ref="dom_space"
        />
        <vbutton
          color="red"
          size="s2"
          :top="0"
          :left="196"
          :label="'重玩'"
          :active="keyboard['reset']"
          ref="dom_r"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="106"
          :label="'音效'"
          :active="keyboard['music']"
          ref="dom_s"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="16"
          :label="'暂停'"
          :active="keyboard['pause']"
          ref="dom_p"
        />
    </div>
</template>

<script setup>
    import { ref,watch,computed,nextTick } from 'vue';
    import { d } from '@/stores/store' 
    import todo from '@/control/todo'


    import vbutton from './button/index.vue'

    const store = d();
    const props = defineProps(['filling']);

    const dom_rotate = ref(null);
    const dom_down = ref(null);
    const dom_left = ref(null);
    const dom_right = ref(null);
    const dom_space = ref(null);
    const dom_r = ref(null);
    const dom_s = ref(null);
    const dom_p = ref(null);
    
    const domList = {
      dom_rotate,
      dom_down,
      dom_left,
      dom_right,
      dom_space,
      dom_r,
      dom_s,
      dom_p,
    };

    const param = ref({
        fillingNum : 0,
    })

    const keyboard = computed(() => {
      return store.keyboard;
    })

    watch(props,(nextVal)=>{
        param.value.fillingNum = nextProps.filling + 20;
    },{deep:true})

    const touchEventCatch = {} // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件
    
    // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
    const mouseDownEventCatch = {}

    document.addEventListener(
        'touchstart',
        e => {
            if (e.preventDefault) {
                e.preventDefault()
            }
        },
        true
    );

    document.addEventListener('touchend', (e) => {
        if (e.preventDefault) {
            e.preventDefault();
        }
    }, true);

    // 阻止双指放大
    document.addEventListener('gesturestart', (event) => {
        event.preventDefault();
    });

    document.addEventListener(
        'mousedown',
        e => {
            if (e.preventDefault) {
                e.preventDefault()
            }
        },
        true
    );
    
    nextTick(()=>{
      Object.keys(todo).forEach(key =>{
        domList[`dom_${key}`].value.thisRef.addEventListener(
          'mousedown',
          () => {
            if (touchEventCatch[key] === true) {
              return
            }
            todo[key].down(store)
            mouseDownEventCatch[key] = true
          },
          true
        )
        domList[`dom_${key}`].value.thisRef.addEventListener(
          'mouseup',
          () => {
            if (touchEventCatch[key] === true) {
              touchEventCatch[key] = false
              return
            }
            todo[key].up(store)
            mouseDownEventCatch[key] = false
          },
          true
        )
        domList[`dom_${key}`].value.thisRef.addEventListener(
          'mouseout',
          () => {
            if (mouseDownEventCatch[key] === true) {
              todo[key].up(store)
            }
          },
          true
        )
        domList[`dom_${key}`].value.thisRef.addEventListener(
          'touchstart',
          () => {
            touchEventCatch[key] = true
            todo[key].down(store)
          },
          true
        )
        domList[`dom_${key}`].value.thisRef.addEventListener(
          'touchend',
          () => {
            todo[key].up(store)
          },
          true
        )
      })
  })
    



</script>

<style scoped>
  .keyboard {
    width: 570px;
    height: 330px;
    margin: 50px auto 0;
    position: relative;
    margin-top: 30px;
  }
</style>