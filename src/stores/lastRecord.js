import { defineStore } from "pinia"

export const useLastRecord = defineStore ('lastRecord',{
    state: () => {
        return { 
            Data : null,
        }
    },

    actions:{

    },
    persist: true, //持久化
})