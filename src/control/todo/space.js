import unit from "@/unit/";
import event from "@/unit/event";
import states from "@/control/states";
import { music } from "@/unit/music";

const down = store => {
    store.key_drop(true);
    event.down({
        key: "space",
        once: true,
        callback: () => {
            if (store.lock) {
                return
            }
            const cur = store.cur;
            if(cur !== null) {
                // 置底
                if (store.pause) {
                    states.pause(false);
                    return
                }
                if (music.fall) {
                    music.fall();
                }
                let index = 0;
                let bottom = cur.fall(index);
                
                while (unit.want(bottom, store.matrix)) {
                    bottom = cur.fall(index);
                    index++;
                }
                let matrix = JSON.parse(JSON.stringify(store.matrix));
                bottom = cur.fall(index - 2);
                store.moveBlock(bottom);
                const shape = bottom.shape;
                const xy = bottom.xy;
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
                store.drop = true;
                setTimeout(() => {
                    store.drop = false;
                }, 100);
                states.nextAround(matrix);
            }else {
                states.start();
            }
        }
    })
}

const up = store => {
    store.key_drop(false);
    event.up({
      key: "space"
    });
};

export default {
    down,
    up
};