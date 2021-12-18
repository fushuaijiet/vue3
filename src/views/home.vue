<template>
    <div class="wrap">
        我是Home
    </div>
</template>
<script>
import {reactive,ref} from 'vue';
export default {
    name:'home',
    components:{
        
    },
    setup(){
        let tabList = reactive([
            {
                path:'#/home/first',
                title:'美好第一',
            },
            {
                path:'#/home/second',
                title:'好美第二',
            }
        ])
        let off = ref(false);
        let tabNum = ref(0)

        const toggle = (index) => {
            tabNum.value = index;
            off.value = tabNum.value === index ? true : false
        }
        return {
            tabList,
            off,
            tabNum,
            toggle
        }
    }
}
</script>
<style  scoped>
*{
    margin:0;
    padding:0;
}
.default{
    text-decoration:none;
    color:#333;
}

span a{
    display:inline-block;
    width:90px;
    height:30px;
    line-height:30px;
    text-decoration:none;
    text-align:center;
}
.activated {
    display:inline-block;
    background:blue;
    color:white;
    text-align:center;
    
}

.wrap{
    display:flex;
    position:reactive;
}
.side-bar{
    width:15%;
    transition: width .28s;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: orange!important;
}

.main{
    width:85%;
    height:100px;
    background:rgb(245, 241, 241);
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 300px;
    position: relative;
}


</style>