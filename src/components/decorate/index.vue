<template>
    <div class="decorate">
        <div class="topBorder">
            <span class="mr" style="width: 40px;"></span>
            <span class="mr"></span>
            <span class="mr"></span>
            <span class="mr"></span>
            <span class="mr"></span>
            <span class="ml" style="width: 40px;"></span>
            <span class="ml"></span>
            <span class="ml"></span>
            <span class="ml"></span>
            <span class="ml"></span>
        </div>
        <h1>{{ "俄罗斯方块" }}</h1>

        <div class="view">
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>

            <p></p>

            <em />
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>

            <p></p>

            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>

            <p></p>
            
            <b class="c"></b>
            <em />
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <em />
            
            <p></p>

            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <em />
            <div class="clear"></div>
            <b class="c"></b>
            <em />

            <p></p>

            <em />
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>
        </div>


        <div class="view l">
            <em />
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <em />

            <p></p>

            <b class="c"></b>
            <em />
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <em />

            <p></p>

            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>

            <p></p>
            
            <em />
            <b class="c"></b>
            <div class="clear"></div>
            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>
            
            <p></p>

            <b class="c"></b>
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>
            <div class="clear"></div>
            <em />
            <b class="c"></b>

            <p></p>

            <b class="c"></b>
            <em />
            <div class="clear"></div>
            <b class="c"></b>
            <em />
            <div class="clear"></div>
            <b class="c"></b>
            <em />
            <div class="clear"></div>
            <b class="c"></b>
            <em />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .decorate{
        position: absolute;
        left: 50%;
        transform: translate(-50%,-45px);
        display: flex;
        justify-content: center;
        position: relative;
    }
    .topBorder{
        width: 100%;
        height:10px;
        position: absolute;

        top: 0;
    }
    .topBorder span {
        display: block;
        overflow:hidden;

        width: 10px;
        height: 10px;
        background: #000;
    }
    .mr {
        float: left;
        margin-right: 10px;
    }
    .ml{
        float: right;
        margin-left: 10px;
    }

    h1 {
        width: 100%;
        position: absolute;
        font-size: 30px;
        text-align: center;
        font-weight: normal;
        top: -12px;
        left: 0;
    }

    b::after{
        background: #000;
    }

    p{
        height: 22px;
        clear: both;
    }

    .view{
        width: 44px;
        position: absolute;
        right: -70px;
        top: 30px;
    }
    
</style>