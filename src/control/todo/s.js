import event from '@/unit/event'

const down = store => {
    store.key_music(true);
    if (store.lock) {
        return
    }
    event.down({
        key: 's',
        once: true,
        callback: () => {
          if (store.lock) {
            return
          }
          store.music = !store.music;
        }
    })
}

const up = store => {
    store.key_music(false);
    event.up({
      key: 's'
    })
}

export default {
    down,
    up
}