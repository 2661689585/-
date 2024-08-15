import unit from "@/unit/";
import event from "@/unit/event";
import states from "@/control/states";
import { music } from "@/unit/music";

const down = store => {
    store.key_down(true);
    if(store.cur !== null){
        event.down({
            key:"down",
            begin:40,
            interval:40,
            callback : stopDownTrigger => {
                if(store.lock) {
                    return
                }
                if (music.move){
                    music.move();
                }
                const cur = store.cur;
                if (cur === null) {
                    return;
                }
                if(store.pause) {
                    states.pause(false);
                    return
                }
                const next = cur.fall();
                if(unit.want(next, store.matrix)) {
                    store.moveBlock(next);
                    states.auto();
                } else{
                    let matrix = JSON.parse(JSON.stringify(store.matrix));
                    const shape = cur.shape;
                    const xy = cur.xy
                    shape.forEach((m, k1) =>
                        m.forEach((n, k2) => {
                          if (n && xy[0] + k1 >= 0) {
                            // 竖坐标可以为负
                            let line = matrix[xy[0] + k1];
                            line[xy[1] + k2] = 1;
                            matrix[xy[0] + k1] = line;
                          }
                        })
                    );
                    states.nextAround(matrix, stopDownTrigger);
                }
            }
        })
    } else {
        event.down ({
            key:'down',
            begin:200,
            interval:100,
            callback:() => {
                if(store.lock){
                    return
                }
                const cur = store.cur;
                if(cur){
                    return
                }
                if (music.move){
                    music.move();
                }
                let startLines = store.startLines;
                startLines = startLines - 1 < 0 ? 10 : startLines - 1;
                store.startLines = startLines;
            }
        })
    }
};

const up = store => {
    store.key_down(false);
    event.up({
        key:'down'
    })
}

export default {
    down,
    up
}