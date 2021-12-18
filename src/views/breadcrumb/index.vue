<template>
  <div class="breadcrumb-tab">
    <div v-for="(item,index) in breadTabList" :key="item.name"
         @click="returnBread(item)" class="tab-item">
          <span>{{item.name}}</span>
          <span class="ml10" v-show="index !== breadTabList.length - 1"> > </span>
    </div>
  </div>
  <div class="breadcrumb-wrap">
    
    <div v-for="(item,index) in sourceList" :key="item.title" class="item-breadcrumb">
        <div @click="returnRoute(item.path)"
              :class="[route.meta.title === item.title ? 'breadcrumb-cox' : 'breadcrumb-box']">
              <span>{{item.title}}</span>
              <span class="breadcrumb-error" @click.stop="deleteBreadCrub(item.title,item.path)" v-show="index !== 0">×</span>
        </div>   
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted,computed} from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  components:{},
  setup(){
     const route = useRoute();
     const router = useRouter();
     const store = useStore();
     const deleteCrub = (title) => store.dispatch('deleteBreadCrub',title);
     const updateTab = (path) => store.dispatch('updateTabList',path);
     let sourceList = computed(() => store.state.breadCurmbList);
     let barList = computed(() => store.state.barList);
     let breadTabList = computed(() => store.state.breadTabList);
     let deleteBreadCrub = (title,path) => {
        deleteCrub(title)    
        route.matched.forEach((item,index) => {
          if(item.meta.title && (item.path === path || item.title === title)){
            route.matched.splice(index,1);
          }
        })
      let lastPath = sourceList.value[ sourceList.value.length - 1].path;
       router.push({
         path: lastPath
       })

       updateTab(lastPath)

     };
     const returnRoute = (path) => {
          router.push({path,})
          updateTab(path)

        // console.log(breadTabList.value,`breat tab list value---`)
     }

     const returnBread = (myx) => {
       if(myx.path){
          updateTab(myx.path)
          router.push({path:myx.path,})
       }
     }

     onMounted(() => {
        //  console.log(props.sourceList,`sourceList----`)
     })



     console.log(reactive,ref);

     return {
         route,
         store,
         router,
         returnRoute,
         sourceList,
         deleteBreadCrub,
         deleteCrub,
         barList,
         returnBread,
         updateTab,
         breadTabList,
    }
  },
  methods:{},
}
</script>
<style lang="scss" scoped>
.breadcrumb-tab{
  display: flex;
  margin:0 0 15px 0;
  .tab-item{
    font-size:14px;
    cursor:pointer;
    .ml10{
      margin:0 5px 0 5px;
    }
  }
}
.breadcrumb-wrap{
    display:flex;
    .item-breadcrumb{
        cursor:pointer;
        display:flex;
        .breadcrumb-box{
            height:30px;
            line-height:30px;
            padding:0 10px 0 10px;
            margin:0 3px 0 0;
            text-align:center;
            display:inline-block;
            font-size:13px;
            border-radius:3px;
            border:1px solid rgba(124,141,181,.3);
            box-sizing:border-box;
        }

        .breadcrumb-cox{
            height:30px;
            line-height:30px;
            color:white;
            background:#5ddab4;
            padding:0 10px 0 10px;
            margin:0 3px 0 0;
            text-align:center;
            display:inline-block;
            font-size:13px;
            border:1px solid rgba(124,141,181,.3);
            box-sizing:border-box;
        }

        .breadcrumb-error{
            width:14px;
            height:14px;
            font-size:14px;
            display:inline-block;
            margin:0 0 0 10px;
            font-weight:bold;
        }
    }
}
</style>