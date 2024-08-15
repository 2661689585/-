import { 
    blankMatrix , 
    eachLines , 
    clearPoints,
    blankLine ,
    speeds } from '@/unit/const.js'
import unit from '@/unit'
import pinia from  '@/stores/pinia'
import { d } from '@/stores/store'
import { music } from '@/unit/music'

const store = d(pinia);

const getStartMatrix = startLines => {
    // 生成startLines
    const getLine = (min, max) => {
      // 返回标亮个数在min~max之间一行方块, (包含边界)
      const count = parseInt((max - min + 1) * Math.random() + min, 10)
      const line = []
      for (let i = 0; i < count; i++) {
        // 插入高亮
        line.push(1)
      }
      for (let i = 0, len = 10 - count; i < len; i++) {
        // 在随机位置插入灰色
        const index = parseInt((line.length + 1) * Math.random(), 10)
        line.splice(index, 0, 0)
      }
  
      return line
    }
    let startMatrix = []
  
    for (let i = 0; i < startLines; i++) {
      if (i <= 2) {
        // 0-3
        startMatrix.push(getLine(5, 8))
      } else if (i <= 6) {
        // 4-6
        startMatrix.push(getLine(4, 9))
      } else {
        // 7-9
        startMatrix.push(getLine(3, 9))
      }
    }
    for (let i = 0, len = 20 - startLines; i < len; i++) {
      // 插入上部分的灰色
      startMatrix.unshift(blankLine)
    }
    return startMatrix
}

const states = {
    // 自动下落setTimeout变量
    fallInterval: null,

    // 游戏开始
    start: () => {
        if (music.start) {
            music.start();
        }
        states.dispatchPoints(0);
        store.speedRun = store.speedStart;
        const startLines = store.startLines;
        const startMatrix = getStartMatrix(startLines);
        store.matrix = startMatrix;
        store.moveBlock({ type: store.next });
        store.nextBlock('');
        states.auto();
    },

     // 自动下落
    auto: timeout => {
        const out = timeout < 0 ? 0 : timeout
        let cur = store.cur
        const fall = () => {
            cur = store.cur;
            const next = cur.fall();
            if (unit.want(next, store.matrix)) {
                store.moveBlock(next);
                states.fallInterval = setTimeout(fall, speeds[store.speedRun - 1])
            } else {
                let matrix = JSON.parse(JSON.stringify(store.matrix));
                const shape = cur && cur.shape
                const xy = cur && cur.xy
                shape.forEach((m, k1) =>
                    m.forEach((n, k2) => {
                        if (n && xy[0] + k1 >= 0) {
                            // 竖坐标可以为负
                            let line = matrix[xy[0] + k1];
                            line[xy[1] + k2] = 1;
                            matrix[xy[0] + k1] = line;
                        }
                    })
                )
                states.nextAround(matrix)
            }
        }
        clearTimeout(states.fallInterval)
        states.fallInterval = setTimeout(
            fall,
            out === undefined ? speeds[store.speedRun - 1] : out
        )
    },

      // 一个方块结束, 触发下一个
    nextAround: (matrix, stopDownTrigger) => {
        clearTimeout(states.fallInterval)
        store.lock = true;
        store.matrix = matrix;
        if (typeof stopDownTrigger === 'function') {
            stopDownTrigger()
        }
        const addPoints = store.points + 10 + (store.speedRun - 1) * 2; // 速度越快, 得分越高
        states.dispatchPoints(addPoints);

        if (unit.isClear(matrix)) {
            if (music.clear) {
                music.clear();
            }
            return
        }
        if (unit.isOver(matrix)) {
            if (music.gameover) {
                music.gameover();
            }
            states.overStart();
            return
        }
        setTimeout(() => {
            store.lock = false;
            store.moveBlock({ type: store.next });
            store.nextBlock('');
            states.auto();
        }, 100)
    },


    // 消除行
    clearLines: (matrix, lines) => {
        lines.forEach(n => {
            matrix.splice(n, 1);
            matrix.unshift(blankLine);
        })
        store.matrix = matrix;
        store.moveBlock({ type: store.next });
        store.nextBlock('');
        states.auto();
        store.lock = false;
        const clearLines = store.clearLines + lines.length;
        
        store.clearLines = clearLines;
        const addPoints = store.points + clearPoints[lines.length - 1]; // 一次消除的行越多, 加分越多
        states.dispatchPoints(addPoints);
        const speedAdd = Math.floor(clearLines / eachLines); // 消除行数, 增加对应速度
        let speedNow = store.speedStart + speedAdd;
        speedNow = speedNow > 6 ? 6 : speedNow
        store.speedRun = speedNow;
    },

    // 暂停
    pause: isPause => {
        store.pause = isPause;
        if (isPause) {
            clearTimeout(states.fallInterval)
            return
        }
        states.auto()
    },

    // 游戏结束, 触发动画
    overStart: () => {
        clearTimeout(states.fallInterval)
        store.lock = true;
        store.reset = true;
        store.pause = false;
    },

    // 游戏结束动画完成
    overEnd: () => {
        store.matrix = blankMatrix;
        store.moveBlock({ reset: true });
        store.reset = false;
        store.lock = false;
        store.clearLines = 0;
    },

    // 写入分数
    dispatchPoints: point => {
        // 写入分数, 同时判断是否创造最高分
        store.points = point;
        if (point > 0 && point > store.max) {
            store.max = point;
        }
    }


}

export default states;