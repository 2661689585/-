import { useLastRecord } from '@/stores/lastRecord'
import pinia from  '@/stores/pinia'

const lastRecordData = useLastRecord(pinia);

export const blockShape = { // 方块类型
    I: [[1, 1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1]]
}

export const origin = { // ??
    I: [[-1, 1], [1, -1]],
    L: [[0, 0]],
    J: [[0, 0]],
    Z: [[0, 0]],
    S: [[0, 0]],
    O: [[0, 0]],
    T: [[0, 0], [1, 0], [-1, 1], [0, -1]]
}

export const blockType = Object.keys(blockShape);

export const blankLine = [0,0,0,0,0,0,0,0,0,0];

export const fillLine = [1,1,1,1,1,1,1,1,1,1];

export const clearPoints = [100, 300, 700, 1500];

export const speeds = [800, 650, 500, 370, 250, 160]; // 速度

export const eachLines = 20; // 每消除eachLines行, 增加速度

export const delays = [50, 60, 70, 80, 90, 100];

export const maxPoint = 999999;

export const blankMatrix = (()=>{
    let Matrix = [];
    for (let index = 0; index < 20; index++) {
        Matrix.push(blankLine);
    }
    return Matrix;
})();


// 获取上一把数据
export const lastRecord = (()=>{
    let data = lastRecordData.Data;
    if(!data){
        return false;
    }

    return data;
})();