<template>
  <div class="work-wrap">
    <img :src="workLogo"/>
    <span>
      study vue3
    </span>
  </div>
  <div class="side-bar-wrap">
      <div v-for="item in barList" :key="item.id" class="bar-item">
          <div @click="showName(item.id,item)" class="bar-item-leavl">
            <div class="leavl-text"  :class="[colorId === item.id ? 'color-active':'color-default']">
              {{item.name}}
            </div>
            <div v-if="item.children!== undefined">
               <div class="leavl-img">
                  <div :class="[item.isShow? 'icon-top':'icon-btm']"></div>
                </div>
            </div>
          </div>
          <!-- 子导航 -->
          <transition name="fade">
              <div v-if="item.isShow">
                <div v-for="myx in item.children" :key="myx.id" class="bar-item-child" @click="returnRoute(myx)">
                <!-- 子导航内容 -->
                  <div :class="[colorId === myx.id ? 'color-active':'color-default']" class="child-text" 
                         >
                    {{myx.name}}
                  </div>
                </div>
              </div>
          </transition>
          
      </div>
  </div>
</template>

<script>
import { reactive, ref,onMounted,computed,watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute,useRouter } from 'vue-router';
export default {
    components:{},
    props:{},
    setup(){
        console.log(reactive,ref)
        const store = useStore();
        const updateBarList = (id) => store.dispatch('updateBarList',id);
        const setNavColor = (myx) => store.dispatch('setNavColor',myx);
        const updateTab = (path) => store.dispatch('updateTabList',path)
        let colorId = computed(() => store.state.colorId);
        let barList = computed(() => store.state.barList);
        let breadCurmbList = computed(() => store.state.breadCurmbList);
        let workLogo = require('@/assets/work-logo.png')
        const showName = (id,myx) => {
            if(myx.name === '首页'){
              updateTab('/home')
            }
            if(myx.children === undefined){
              router.push({
                path:`${myx.path}`
              })
            }else{
              updateBarList(id)
            }
        };

        const route = useRoute();
        const router = useRouter();

        const returnRoute = (row) => {
          setNavColor(row);
          updateTab(row.path)
          router.push({path:`${row.path}`})
        }

        watch(route,(newV) => {
          let path = newV.path;
          let brValue = breadCurmbList.value;
           if(brValue.length){
            let lastItem = brValue[brValue.length - 1];
             barList.value.forEach((item) => {
               if(!item.children && item.path === path){
                  setNavColor(item.id)
                  item.isShow = true;
               }else if(item.children){
                 item.children.forEach((ele) => {
                    if(ele.name === lastItem.title && ele.path === path){
                      setNavColor(ele.id)
                      item.isShow = true;
                    }
                 })
               }
             })
          }
        },
        {immediate:true})

        onMounted(() => {
              updateTab('/home')
        })  
        
        return {
          route,
          router,
          colorId,
          barList,
          showName,
          returnRoute,
          setNavColor,
          updateTab,
          workLogo,
          updateBarList,
        }
    },
}
</script>
<style lang="scss">
.work-wrap{
  color:#435EBE;
  font-size:19px;
  text-align:center;
  line-height:90px;
  font-weight:bold;
  img{
    width:10%;
    height:30px;
    vertical-align:middle;
  }
}
.side-bar-wrap{
  .bar-item{
    line-height: 40px;
    text-indent: 1em;
    color: rgb(34, 30, 30);
    transition: 1s ease;

   

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .color-default{
      color:black;
    }
    .color-active{
      color:#5ddab4;
    }

    .bar-item-leavl{
      display:flex;
      &:hover{
          background:rgb(0, 153, 255);
        }
      .leavl-text{
        width:80%;
        height:40px
      }
      .icon-top{
        height: 6px;
        width: 6px;
        border-right: 2px solid black;
        border-top: 2px solid black;
        transition: 0.3s ease;
        transform: rotate(-45deg);
      }
      .icon-btm{
        height: 6px;
        width: 6px;
        border-right: 2px solid black;
        border-top: 2px solid black;
        transition: 0.3s ease;
        transform: rotate(-230deg);
      }
      .leavl-img{
        width:10%;
        height:16px;
        padding:15px 0 0 30px;
      }
    }

    .bar-item-child{
      display:flex;
      padding:0 0 0 10px;
      &:hover{
          background:rgb(0, 153, 255);
        }
      .child-text{
        height:40px;
      }
    }
  }
}
</style>