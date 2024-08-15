import { blockType } from './const'
import pinia from  '@/stores/pinia'
import { useLastRecord } from '@/stores/lastRecord'

const lastRecord = useLastRecord(pinia);

const unit = {
  getNextType() {
    // 随机获取下一个方块类型
    const len = blockType.length
    return blockType[Math.floor(Math.random() * len)]
  },
  want(next, matrix) {
    // 方块是否能移到到指定位置
    const xy = next.xy
    const shape = next.shape
    const horizontal = shape[0].length
    return shape.every((m, k1) =>
      m.every((n, k2) => {
        if (xy[1] < 0) {
          // left
          return false
        }
        if (xy[1] + horizontal > 10) {
          // right
          return false
        }
        if (xy[0] + k1 < 0) {
          // top
          return true
        }
        if (xy[0] + k1 >= 20) {
          // bottom
          return false
        }
        if (n) {
          if (matrix[xy[0] + k1][xy[1] + k2]) {
            return false
          }
          return true
        }
        return true
      })
    )
  },
  isClear(matrix) {
      // 是否达到消除状态
      const clearLines = []
      matrix.forEach((m, k) => {
        if (m.every(n => !!n)) {
          clearLines.push(k)
        }
      })
      if (clearLines.length === 0) {
        return false
      }
      return clearLines
  },
  isOver(matrix) {
    // 游戏是否结束, 第一行落下方块为依据
    return matrix[0].some(n => !!n)
  },
  subscribeRecord(store) {
    // 将状态记录到 localStorage
    store.subscribe(() => {
      let data = store.state
      if (data.lock) {
        // 当状态为锁定, 不记录
        return
      }
      lastRecord.Data = data;
    })
  },
}


export default unit;