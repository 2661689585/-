import { defineStore } from "pinia"
import Block from '@/unit/block'
import unit from '@/unit'
import { 
    blankMatrix,
    lastRecord,
    maxPoint,
} from '@/unit/const.js'
import { hasWebAudioAPI } from '@/unit/music'

let clearLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.clearLines, 10))
  ? parseInt(lastRecord.clearLines, 10)
  : 0

if (clearLinesInitState < 0) {
  clearLinesInitState = 0
}

const matrixInitState = lastRecord && Array.isArray(lastRecord.matrix)
    ? lastRecord.matrix
    : blankMatrix;

const resetInitState = lastRecord && lastRecord.reset 
    ? !!lastRecord.reset 
    : false;

const pauseInitState = lastRecord && lastRecord.pause !== undefined
    ? !!lastRecord.pause
    : false;

const lockInitState = lastRecord && lastRecord.lock !== undefined
    ? !!lastRecord.lock
    : false

const nextInitState = lastRecord && blockType.indexOf(lastRecord.next) !== -1
    ? lastRecord.next
    : unit.getNextType()

const dropInitState = lastRecord && lastRecord.drop !== undefined
    ? !!lastRecord.drop
    : false

let musicInitState = lastRecord && lastRecord.music !== undefined
    ? !!lastRecord.music
    : true
if (!hasWebAudioAPI.data) {
    musicInitState = false
}

let startLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.startLines, 10))
  ? parseInt(lastRecord.startLines, 10)
  : 0
if (startLinesInitState < 0 || startLinesInitState > 10) {
  startLinesInitState = 0
}


let speedRunInitState = lastRecord && !isNaN(parseInt(lastRecord.speedRun, 10))
    ? parseInt(lastRecord.speedRun, 10)
    : 1
if (speedRunInitState < 1 || speedRunInitState > 6) {
    speedRunInitState = 1
}

let pointsInitState = lastRecord && !isNaN(parseInt(lastRecord.points, 10))
    ? parseInt(lastRecord.points, 10)
    : 0
if (pointsInitState < 0) {
    pointsInitState = 0
} else if (pointsInitState > maxPoint) {
    pointsInitState = maxPoint
}

let maxInitState = lastRecord && !isNaN(parseInt(lastRecord.max, 10))
    ? parseInt(lastRecord.max, 10)
    : 0
if (maxInitState < 0) {
    maxInitState = 0
} else if (maxInitState > maxPoint) {
    maxInitState = maxPoint
}

let speedStartInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.speedStart, 10))
  ? parseInt(lastRecord.speedStart, 10)
  : 1
if (speedStartInitState < 1 || speedStartInitState > 6) {
  speedStartInitState = 1
}

const curInitState = (()=>{
    if(lastRecord || !lastRecord.cur){
        return null;
    }
    const cur = lastRecord.cur;
    const option = {
        type : cur.type,
        rotateIndex : cur.rotateIndex,
        shape : cur.shape,
        xy : cur.xy,
    }
    return new Block(option);
})();


export const d = defineStore ('store',{
    state: () => {
        return { 
            music: musicInitState,
            matrix: matrixInitState,
            reset : resetInitState,
            pause : pauseInitState,
            cur : curInitState,
            max : maxInitState,
            next: nextInitState,
            points : pointsInitState,
            clearLines : clearLinesInitState,
            startLines: startLinesInitState,
            speedStart: speedStartInitState,
            speedRun: speedRunInitState,
            drop: dropInitState,

            keyboard: {
                drop: false,
                down: false,
                left: false,
                right: false,
                rotate: false,
                reset: false,
                music: false,
                pause: false
              },
            lock: lockInitState,
        }
    },

    actions:{
        moveBlock(data) {
            this.cur = data.reset === true ? null : new Block(data);
        },
        nextBlock(data) {
            if (!data) {
              data = unit.getNextType()
            }
            this.next = data
        },
        key_down(data) {
            this.keyboard['down'] = data;
        },
        key_left(data) {
            this.keyboard['left'] = data;
        },
        key_pause(data) {
            this.keyboard['pause'] = data;
        },
        key_reset(data) {
            this.keyboard['reset'] = data;
        },
        key_right(data) {
            this.keyboard['right'] = data;
        },
        key_rotate(data) {
            this.keyboard['rotate'] = data;
        },
        key_music(data) {
            this.keyboard['music'] = data;
        },
        key_drop(data) {
            this.keyboard['drop'] = data;
        },
    }
})