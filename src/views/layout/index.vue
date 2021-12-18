<template>
  <div class="wrap">
  <!-- 左侧导航 -->
    <div class="side-bar">
        <sideBar/>
    </div>
    <!-- 右侧内容 -->
    <div class="main">
        <div class>
            <bread-crumb/>
        </div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref,onMounted,watch,computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute,useRouter } from 'vue-router';
import BreadCrumb from '@/views/breadcrumb'
import sideBar from './sidebar'
export default {
  components:{
      sideBar,
      BreadCrumb
  },
  setup(){
      const route = useRoute();
      const router = useRouter();
      const store = useStore();
      const breadCurbList = computed(() => store.state.breadCurmbList)
      const increment = (data) => store.dispatch('increment',data);
      watch(route,(newV) => {
            let newVLen = newV.matched.length;
           if(newVLen){
                newV.matched.forEach((item) => {
                    let obj = {}
                    if(item.meta.title !== undefined ){
                        obj['path'] = item.path;
                        obj['title'] = item.meta.title;
                        let repeat = breadCurbList.value.find((ele) => ele.title === item.meta.title);
                        if(!repeat){
                            increment(obj)
                        }
                    }
                })
                
          }
      },)

    //   },
    //   {immediate:true})
      onMounted(() => {

      })

      console.log(ref,)
        return {
            route,
            router,
            store,
            breadCurbList,
            increment,
        }
  },
  methods:{},
}
</script>
<style lang="scss" scoped>
*{
    margin:0 auto;
    padding:0 auto;
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
    background-color: #324157!important;
}

.main{
    width:85%;
    background:#f2f7ff;
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 14.6%;
    position: relative;
    margin-top:-8px;
    padding:15px;
}

</style>