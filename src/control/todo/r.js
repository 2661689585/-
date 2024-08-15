import event from '@/unit/event'
import states from '@/control/states'

const down = store =>{
    store.key_reset(true);
    if (store.lock) {
        return
    }
    if (store.cur !== null) {
        event.down({
            key: 'r',
            once: true,
            callback: () => {
                states.overStart()
            }
        })
    }else{
        event.down({
            key: 'r',
            once: true,
            callback: () => {
              if (store.lock) {
                return
              }
              states.start()
            }
        })
    }
}

const up = store => {
    store.key_reset(false)
    event.up({
      key: 'r'
    })
}

export default {
    down,
    up
}
  