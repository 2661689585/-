import unit from '@/unit/'
import event from '@/unit/event'
import states from '@/control/states'
import { speeds, delays } from '@/unit/const'
import { music } from '@/unit/music'

const down = store => {
    store.key_right(true);
    event.down({
        key: 'right',
        begin: 200,
        interval: 100,
        callback: () =>{
            if (store.lock) {
                return
            }
            if (music.move) {
                music.move();
            }
            const cur = store.cur;
            if(cur !== null){
                if (store.pause) {
                    states.pause(false);
                    return
                }
                const next = cur.right();
                const delay = delays[store.speedRun - 1];
                let timeStamp;
                if(unit.want(next, store.matrix)) {
                    next.timeStamp += parseInt(delay, 10);
                    store.moveBlock(next);
                    timeStamp = next.timeStamp;
                }else{
                    cur.timeStamp += parseInt(parseInt(delay, 10) / 1.5, 10); // 真实移动delay多一点，碰壁delay少一点
                    store.moveBlock(cur);
                    timeStamp = cur.timeStamp;
                }
                const remain = speeds[store.speedRun - 1] - (Date.now() - timeStamp);
                states.auto(remain);
            } else{
                let speed = store.speedStart;
                speed = speed + 1 > 6 ? 1 : speed + 1;
                store.speedStart = speed;
            }
        }
    })
}

const up = store => {
    store.key_right(false);
    event.up({
      key: 'right'
    })
}

export default {
    down,
    up
}