<!--
 * @Author: your name
 * @Date: 2021-12-17 15:10:13
 * @LastEditTime: 2021-12-18 09:30:05
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hello-vue3\src\components\Message.vue
-->
<template>
        <!-- <teleport to="body"> -->
            <transition v-if="dialogVisible" name="fade">
                <div class="msg-wrap">
                   <div v-show="state === 'success'" class="success">
                        {{text}}
                   </div>
                   <div v-show="state === 'error'" class="error">
                        {{text}}
                   </div>
                </div>  
            </transition>
</template>
<script>
import { ref } from 'vue';
export default{
    props:{
        dialogVisible:{
            type:Boolean,
            default:false
        },
        state:{
            type:String,
        },
        text:{
            type:String
        }
    },
    setup(prop,context){
        let texts = ref('1111')
        console.log(prop,context)
        const confirm = () => {
            context.emit('confirm')
        };

        return {
            texts,
            confirm,
        }
    }
}

</script>
<style lang="scss" scoped>
.msg-wrap{
    transform:translateY(-230px) translateX(600px);
    z-index:99999;
    width:400px;
    height:40px;
    text-align:center;
    border:1px solid #ebeef5;
    border-radius:3px;
    line-height:40px;
}

.fade-enter-active,
.fade-leave-active {
  transform:translateY(100px);
  transition: opacity 3s ease;
}

.fade-enter-from,
.fade-leave-to {
  transition: opacity 3s ease;
  transform:translateY(100px);
}

.success{
    background:#F0F9EB;
    color:#F0F9EB;
}

.error{
    background:#FEF0F0;
    color:red;
}
</style>