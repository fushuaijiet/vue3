<template>
    <h2>todoList</h2>
    <div class="detail">
        <div>
            <input v-model="inputVal" placeholder="添加Todo" @keyup.enter="addTodo"/>
        </div>
        <div>
            <span>正在进行</span>
            <span>{{successArr.length}}</span>
        </div>
        <div v-show="successArr.length">
            <div v-for="(item,index) in successArr" :key="item.id">
                <span>
                    <input type="checkbox" :id="item.id" v-model="item.text" :checked="item.text" 
                            @change="selectChange('waiting')">
                    <label for="item.id">{{item.value}}</label>
                    <span class="error" @click.self="deletSeleted(index,'waiting')">X</span>
                </span>
            </div>
        </div>
<!-- 更新更新更新更新 -->
        <!-- 已完成 -->
        <div>
            <div>
                <span>已完成</span>
                <span>{{lastArr.length}}</span>
            </div>
            <div v-show="lastArr.length">
                <div v-for="item in lastArr" :key="item.id">
                        <span>
                            <input type="checkbox" :id="item.id" v-model="item.text" :checked="item.text" 
                            @change="selectChange('success')">
                            <label for="item.id">{{item.value}}</label>
                            <span class="error" @click.self="deletSeleted(index,'success')">X</span>
                        </span>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import { ref,getCurrentInstance } from 'vue';
import createMessage from '@/components/Message.js'
export default{
    setup(){
        let detail = ref('1111');
        let inputVal = ref('');
        let successArr = ref([]);
        let lastArr = ref([]);
        let i = ref(0);
        const ctx = getCurrentInstance();
        const message = ctx.appContext.config.globalProperties.$message;
        
        const addTodo = () => {
            if(inputVal.value!==''){
                i.value++;
                successArr.value.push({id:i.value,value:inputVal.value,text:false,})
                inputVal.value = '';
            }else{
                createMessage({
                    dialogVisible:true,
                    time:1000,
                    msg:'请输入内容',
                    states:'error'
                })
            }
        };

        const deletSeleted = (index,state) => {
            if(state === 'waiting'){
                successArr.value.splice(index,1);
            }else if(state === 'success'){
                lastArr.value.splice(index,1);
            }
        }

        const selectChange = (text) => {
            let findEle,
                idx;
            if(text === 'waiting'){
                findEle = successArr.value.find(item => item.text);
                idx = successArr.value.findIndex(item => item.text === findEle.text);
                successArr.value.splice(idx,1);
                lastArr.value.push(findEle)
            }else{
                findEle = lastArr.value.find(item => !item.text);
                idx = lastArr.value.findIndex(item => item.text === findEle.text);
                lastArr.value.splice(idx,1);
                successArr.value.push(findEle)
            }
        };
        return {    
            detail,i,addTodo,inputVal,lastArr,successArr,deletSeleted,selectChange,
            ctx,message
        }
    }
}
</script>
<style lang="scss" scoped>
.error{
    cursor:pointer;
    font-size:14px;
    margin:0 0 0 50px;
    display:inline-block;

}

</style>