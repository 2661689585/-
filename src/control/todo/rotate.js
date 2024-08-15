import unit from '@/unit/'
import event from '@/unit/event'
import states from '@/control/states'
import { music } from '@/unit/music'


const down = store => {
    store.key_rotate(true);
    if (store.cur !== null){
        event.down({
            key: 'rotate',
            once: true,
            callback: () =>{
                if (store.lock) {
                    return
                }
                if (store.pause) {
                    states.pause(false);
                }
                const cur = store.cur;
                if (cur === null) {
                    return
                }
                if (music.rotate) {
                    music.rotate();
                }
                const next = cur.rotate();
                if (unit.want(next, store.matrix)) {
                    store.moveBlock(next);
                }
            }
        })
    } else {
        event.down({
            key: 'rotate',
            begin: 200,
            interval: 100,
            callback: () => {
                if (store.lock) {
                    return
                }   
                if (music.move) {
                    music.move();
                }
                const cur = store.cur;
                if(cur) {
                    return
                }
                let startLines = store.startLines;
                startLines = startLines + 1 > 10 ? 0 : startLines + 1
                store.startLines = startLines;
            }
        })
    }
}

const up = store => {
    store.key_rotate(false);
    event.up({
      key: 'rotate'
    })
}

export default {
    down,
    up
}