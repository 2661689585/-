<template>
    <div class="matrix">
        <p v-for="(p,k1) in matrixRef.isOver ? matrixRef.overStart : getResult()" :key="k1">
            <b v-for="(e,k2) in p" :key="k2" 
                :class="{
                    'c' : e === 1,
                    'd' : e === 2,
                }" >

            </b>
        </p>
    </div>
</template>

<script setup>
    import { ref,watch,onUpdated } from 'vue'
    import { blankLine , fillLine } from '@/unit/const'
    import unit from '@/unit'
    import states from '@/control/states'

    const props = defineProps(['cur','propMatrix','reset']);

    watch(props,(val = {},oldVal) => {
        propsChange(val);
    },{ deep: true });

    const matrixRef = ref({
        animateColor : 2,
        overStart:null,
        isOver:false,
        clearLines: false,
    });

    onUpdated(()=>{
        
    })

    const propsChange = (val) => {
        const clears = unit.isClear(val.propMatrix);
        const overs = val.reset;
        setTimeout(()=>{
            matrixRef.value.clearLines = clears;
            matrixRef.value.isOver = overs;
        },0);
        if(clears && !matrixRef.value.clearLines){
            clearAnimate(clears);
        }
        if(!clears && overs && !matrixRef.value.isOver){
            over(val);
        }
    }

    const getResult = (value) =>{
        if(!value) {
            value = props;
        }
        const cur = value.cur;
        const shape = cur && cur.shape;
        const xy = cur && cur.xy;
        let matrix = JSON.parse(JSON.stringify(props.propMatrix));

        const clearLines = matrixRef.value.clearLines;
        if(clearLines) {
            const animateColor = matrixRef.value.animateColor;
            clearLines.forEach(index => {
                matrix[index] = [
                    animateColor,
                    animateColor,
                    animateColor,
                    animateColor,
                    animateColor,
                    animateColor,
                    animateColor,
                    animateColor,
                    animateColor,
                    animateColor,
                ]
            })
        }else if (shape) {

            shape.forEach((m,k1) => 
                m.forEach((n,k2) => {
                    if (n && xy[0] + k1 >= 0) {
                        // 竖坐标可以为负
                        let line = matrix[xy[0]+k1];
                        let color;
                        if (line[xy[1] + k2] === 1 && !clearLines) {
                            // 矩阵与方块重合
                            color = 2;
                        } else {
                            color = 1;
                        }
                        line[xy[1] + k2] = color;
                        matrix[xy[0] + k1] = line;
                    }
                })
            )
        }
        return matrix;
    }

    const clearAnimate = () =>{
        const anima = callback => {
            setTimeout(() => {
                matrixRef.value.animateColor = 0
                setTimeout(() => {
                    matrixRef.value.animateColor = 2
                if (typeof callback === 'function') {
                    callback()
                }
                }, 100)
            }, 100)
        }
        anima(() => {
            anima(() => {
                anima(() => {
                    setTimeout(() => {
                        states.clearLines(props.propMatrix, matrixRef.value.clearLines)
                    }, 100)
                })
            })
        })
    }

    const over = (nextProps) =>{
        let overStart = getResult(nextProps);
        matrixRef.value.overState = [...overStart];
        const exlink = index =>{
            if(index <= 19){
                overStart[19 - index] = fillLine;
            }else if(index >= 20 && index <= 39){
                overStart[index - 20] = blankLine;
            }else{
                states.overEnd();
                return
            }
            matrixRef.value.overStart = [...overStart];
        }
        for (let index = 0; index <= 40; index++) { // 40 是刷新效果的来回
            setTimeout(() => exlink(index), 40 * (index + 1));
        }
    }
</script>

<style scoped>
    .matrix{
       width: 228px;
       border: 2px solid #000; 
       padding:3px 1px 1px 3px;
    }
    p{
        width:220px;
        height:22px;
    }

    .c::after{
        background: #000;
    }

    .d::after{
        background: #ff1b1b;
    }


</style>