<template>
    <div class="detail-wrap">
        <div class="text">
            详情1页面            
        </div>
        <div class="text">
                tab选项卡
        </div>
        <div class="tab-wrap">
            <div class="tab-head">
                <div v-for="(item,index) in tabHead" :key="item.id" class="head-item" @click="toggle(index)">
                    {{item.text}}
                    {{item.num}}
                </div>
            </div>
            <div class="tab-bar">
                <div :style="{background:'#409eff',width:'60px',height:'4px',transform: `translate(${translateX})`}"></div>
            </div>
            <div class="tab-msg">
                <div v-for="(item,index) in tabList" :key="item.id" v-show="index === tabIndex" class="msg-item">
                    <div v-for="(ele,sy) in item.children" :key="sy" class="msg-child">
                        <span>
                            {{ele.text}}
                        </span>
                        <span v-show="ele.state === 0" @click="readHandler(ele.id)">标为已读</span>
                        <span v-show="ele.state === 1" @click="readHandler(ele.id)">删除</span>
                        <span v-show="ele.state === 2" @click="readHandler(ele.id)">还原</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref,nextTick,watch } from 'vue';
export default{
    setup(){
        let detail = ref('1111');
        let tabIndex = ref(0)
        let tabHead = ref([
            {text:'未读',id:1,num:null},
            {text:'已读',id:2,num:null},
            {text:'回收站',id:3,num:null}
        ]);
        //state:0为未读 1为删除 2为回收站
        let tabList = ref([
            {text:'未读内容',id:'1',
            children:[{text:'未读内容11',id:'1-1',state:0,},{text:'未读内容22',id:'1-2',state:0,},]
            },
            { text:'已读内容',id:'2',children:[{text:'已读内容1',id:'2-1',state:1,},{text:'已读内容2',id:'2-2',state:1,},]
            },
            {
            text:'回收站内容',id:'3',children:[{text:'回收站内容1',id:'3-1',state:2,},{text:'回收站内容2',id:'3-2',state:2,},]
            }
        ])
        let translateX = ref('0');
        const toggle = (index) => {
            tabIndex.value = index;
            translateX.value = `${index * 135}px`
        };
        let findI = ref(null)
        let idx = ref(0);
        const setChild = (item,id,msg) => {
            findI.value = item.children.find(ele => ele.id == id);
            switch(msg.a){
                case  '未读内容':
                findI.value.state = 1
                break;
                case '已读内容':
                findI.value.state = 2
                break;
                case '回收站内容':
                findI.value.state = 1
                break
            }
            findI.value.text = findI.value.text.replace(msg.a,msg.b);
            idx.value = item.children.findIndex(ele => ele.id === id);
            item.children.splice(idx.value,1)
        };

       
        const addChild = (off,item) => {
            if(!off){
                item.children.push(findI.value)
            }else{
                nextTick(() => {
                    item.children.push(findI.value)
                })
            }
        }
        const readHandler = (id) => {
            tabList.value.map((item) => {
               if(tabIndex.value === 0 && item.text === '未读内容'){
                        setChild(item,id,{a:'未读内容',b:'已读内容'})
                }else if(tabIndex.value === 0 && item.text === '已读内容'){
                        addChild(false,item)
                }else if(tabIndex.value === 1 && item.text === '已读内容'){
                        setChild(item,id,{a:'已读内容',b:'回收站内容'})
                }else if(tabIndex.value === 1 && item.text === '回收站内容'){
                        addChild(true,item)
                }else if(tabIndex.value === 2 && item.text === '回收站内容'){
                        setChild(item,id,{a:'回收站内容',b:'已读内容'})
                }else if(tabIndex.value === 2 && item.text === '已读内容'){
                        addChild(true,item)
                }
                return item;
            })
        };

// 111111111
        watch(tabList.value,() => {
            tabHead.value.forEach((item,index) => {
                item.num = tabList.value[index].children.length;
            })
        },{immediate:true})

        return {    
            findI,detail,tabHead,tabList,readHandler,setChild,addChild,tabIndex,toggle,idx,translateX,
        }
    }
}
</script>
<style lang="scss" scoped>
.text{
    margin:20px 0 30px 0;
}
.tab-wrap{
    .tab-head{
        display:flex;

        .head-item{
            cursor:pointer;
            padding:0 40px 0 40px;
        }   
    }
    .tab-bar{
        width:95%;
        height:4px;
        margin:6px 0 0 0;
        background:grey;
    }

    .tab-msg{
        padding:20px 0 0 0;
        .msg-child{
            display:flex;
            margin:20px 0 10px 0;
            span:nth-child(1){
                flex:5;
            }
            span:nth-child(2){
                cursor:pointer;
            }
            span:nth-child(3){
                cursor:pointer;
            }
        }
    }
    div{
        padding:0 20px 0 20px;
    }
}
</style>