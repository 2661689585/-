import event from '@/unit/event'
import states from '@/control/states'

const down = store => {
    store.key_pause(true);
    event.down({
        key: 'p',
        once: true,
        callback: () => {
            if (store.lock) {
                return
            }
            const cur = store.cur;
            const isPause = store.pause;
            if(cur !== null){
                // 暂停
                states.pause(!isPause);
            }else{
                // 新的开始
                states.start();
            }
        }
    })
}

const up = store => {
    store.key_pause(false)
    event.up({
        key: 'p'
    })
}

export default {
    down,
    up
}