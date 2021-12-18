import { createStore } from 'vuex';
export default createStore({
    // state:() => ({
    //    breadCurmbList:[11,22,33,44,55]
    // })
    state:{
       barList:[
           {name:'首页',id:'0',isShow:false,path:'/home'},
           {
            name:'引导页',id:'1',isShow:false,children:[{id:'1-1',name:'引导页1',path:'/detail/detailOne',isShow:false},
                                                       {id:'1-2',name:'引导页2',path:'/detail/detailTwo',isShow:false},]
           },
           {
              name:'个人信息',id:'2',isShow:false,path:'/user',children:[{id:'2-1',name:'天数信息',path:'/user/userday',isShow:false},
                                                      {id:'2-2',name:'月数信息',path:'/user/usermonth',isShow:false},]
           }
       ],
       breadCurmbList:[{title:'首页',path:'/home'}],
       breadTabList:[],
       colorId:0
     },
     mutations:{
        increment(state,todo){
            state.breadCurmbList.push(todo);
        },
         // 删除breadcrumb及设置导航状态
        deleteBreadCrub(state,title){
           state.breadCurmbList = state.breadCurmbList.filter((item) => item.title !== title);
           state.barList.forEach((item) => {
              if(item.children){
                 //子级
                  item.children.forEach((ele) => {
                     if(ele.name === title){
                        //通过对比查找到父级
                        ele.isShow = false;
                        let isSuccess = item.children.every((item) => item.isShow === false);
                        item.isShow = isSuccess ? false : true;
                        //当某个item.children内所有item.isShow都为false的时候，再关闭对应父级的isShow
                     }
                  })
              }
           })
        },
        updateBarList(state,id){
            state.barList.reduce((acc,cur) => {
               //限制其他导航 cur.isShow = cur.id === id ? !cur.isShow : false;
                 // return cur
               //不限制其他导航
               if(cur.id === id){
                    cur.isShow = !cur.isShow
                    cur.children.forEach((item) => {
                       item.isShow = true;
                    })
               }
               return cur
            },[])
            
        },
        setNavColor(state,myx){
           if(myx instanceof Object){
               state.colorId = myx.id;
           }else{
               state.colorId = myx;
           }
        },
        updateTabList(state,path){
           let setAllShow = () => {
              state.barList.forEach((item) => {
                 item.isShow = false;
                 if(item.children){
                   item.children.forEach((ele) => {
                      ele.isShow = false;
                   })
                 }
              })
           }
            state.barList.forEach((item) => {
               if(item.path === path){
                 state.breadTabList = [{name:item.name}]
                 setAllShow();
               }else if(item.path !== path){
                 if(item.children){
                   item.children.forEach((ele) => {
                     if(ele.path === path){
                       state.breadTabList = [{name:'首页',path:'/home'},{name:item.name},{name:ele.name,path,}]
                     }
                   })
                  }
               }
           })
        }
     },
     actions:{
        increment:({ commit },todo) => commit('increment',todo),
        deleteBreadCrub:({ commit },title) => commit('deleteBreadCrub',title),
        updateBarList:({ commit },id) => commit('updateBarList',id),
        setNavColor:({ commit },myx) => commit('setNavColor',myx),
        updateTabList:({ commit },path) => commit('updateTabList',path),
        
     }
});