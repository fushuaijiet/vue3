<!--
 * @Author: your name
 * @Date: 2021-12-04 18:32:59
 * @LastEditTime: 2021-12-08 11:52:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hello-vue3\src\views\first-child.vue
-->
<template>
  <div class="wrap">
      <!-- <button @click="modalOpen = true">打开对话框</button> -->
      <button @click="updateArray">点击改变</button>
      <!-- <teleport to="html">
          <div v-if="modalOpen" class="dialog">
              在这xxx
              <button @click="modalOpen = false">关闭对话框</button>
          </div>
      </teleport> -->
      <p style="background:orange;width:100px">{{arr}}</p>
      <p style="background:grey;width:100px">{{brr}}</p>
      <p style="background:red;width:100px">{{obj}}</p>
      <p style="background:blue;width:100px">{{name}}</p>



      <slot name="header"></slot>
  </div>
</template>

<script>
import { reactive, ref,watch,watchEffect,toRefs} from 'vue'
export default {
  components:{},
  props:{},
  setup(){
    //接收的参数为props和context 在这里是没有this的，而是通过context对象来替代当前上下文绑定的对象
    //context对象包含4个属性：attrs、slots、emit、expose
    /**
    setup函数注意点:
      1、由于在执行setup函数的时候，还没有执行created钩子函数，所以在setup函数中，无法使用data和methods的变量和方法
      2、由于不能在setup函数中使用data和methods，所以vue为了避免使用错误，直接将setup函数中的this修改为了undefined
      3、setup函数只能是同步的，不能是异步的
  
      console.log(props,`props----`)
      console.log(context,`context----`)
      console.log(context.attrs,`attrs----`)可以拿到组件本身的attr，即没有使用动态传入的属性
      console.log(context.slots,`slots----`)可以拿到组件本身的slots

      console.log(context.modalOpen,`modalOpen----`)


     */

    /*
    
    
    
    
    */

    

    let modalOpen = ref(false);
    // console.log(reactive,ref)

    let arr = ref([1,2,3])
    let brr = reactive([1,2,3])
    let obj = reactive({
      a:11,
      b:22,
      c:33
    })

    /*
    生命周期钩子:
      vue2.x                          vue3.x
          beforeCreate                  setup
          created                       setup
          beforeMount                   onBeforeMount  
          mounted                       onMounted
          beforeUpdate                  onBeforeUpdate
          updated                       onUpdated
          beforeUnmount                 onBeforeUnmount
          unmounted                     onUnmounted
          errorCaptured                 onErrorCaptured
          renderTracked                 onRenderTracked
          renderTriggered               onRenderTriggered
          activated                     onActivated
          deactivated                   onDeactivated
        在vue3.x里beforeCreate和created已不需要了，因为setup是围绕beforeCreate和created生命周期钩子运行的，
        所以不需要显示地定义它们，换句话说，在3.x里，这些钩子函数都应该放在setup中编写，这些钩子接收一个回调函数
        当钩子被组件调用时就被执行。
          例如
          onMounted(() => {
            console.log(xxxx)
          })
    setup:
      在以下方法前执行
        components
        props
        data
        methods
        computed Properties
      在setup里可以不在使用难于理解的this
      有两个可选参数
          props:属性(响应式对象，可以用watch监听)
          context:上下文对象，用于替代以前的this方法可以访问的属性
    script setup语法糖：
        虽然compositionAPI使用起来已经很方便了，但是很多地方都需要引入、注册，属性和方法都要在setup函数中返回，
        有时候仅一个return就十几行或者是几十行，这是很麻烦的一点，所以script setup语法糖就出现了，解决这种问题
        只需要在script标签中增加setup即可，组件只需引入不用注册，属性和方法也不用返回,setup函数也不需要，
        甚至export default都不用写了，不仅是数据，计算属性和方法，甚至是自定义的指令都可以在template中自动获得，
        但是不好的一点是无法直接获取props,emits,attrs，script setup语法糖提供了三个api来供我们使用，
        分别是defineProps,defineEmit,useContext,
          defineProps:用来接收父组件传来的值 props
          defineEmit:用来声明触发的事件表
          useContext:用来获取组件上下文context
        这三个api都是需要引入的
    script setup注意事项
        script setup定义的变量默认不会暴露出去，因为变量这时候包含在setup的闭包中。
        如果在父组件中通过ref='xxxx'的方法来获取子组件实例，子组件正好使用了script setup语法糖，那么相应的子组件
        可以使用definExpose({ })来暴露组件内部属性给父组件使用
    普通script和script setup是可以并存的
      
    
    watch：与vue2中的watch配置功能基本一致
      参数1：要监听的数据，参数2：回调函数，
      参数3:配置(比如需要让该watch进行深度监听或者默认监听{immediate:true,deep:true})
      watch监听多个数据，需要使用数组的形式去监听(特定多响应式对象监听)
        例如
            watch([arr,brr],([newV,oldV],[newVV,oldVV]) => {
              console.log(newV,oldV,`newV----`)
              console.log(newVV,oldVV,`newVV----`)
            })
      特定响应式对象监听
        watch(user,() => {
          console.log(xxx)
        })

      特定响应式对象监听，可以获取旧值或新值
        watch(user,(newV,oldV) => {
          console.log(newV,oldV)
        })

      非懒加载方式监听，可以设置初始值
      watch(user,(newV,oldV) => {
        console.log(newV,oldV)
      },
      {immediate:true}
      )
    我们在组件中创建的watch监听，会在组件被销毁时自动停止，如果在组件销毁之前想要停掉某个监听，可以调用watch()函数的
    返回值，操作如下
                const stopWatchRoom = watch(() => state.room, (newType, oldType) => {
                    console.log("新值:", newType, "老值:", oldType);
                }, {deep:true});

                setTimeout(()=>{
                    // 停止监听
                    stopWatchRoom()
                }, 3000)

      
    watchEffect:监视数据发生变化时执行回调，不需要直接指定要监视的数据,响应式数据都可以被监听到
    回调函数中使用的哪些响应式数据就监视哪些响应式数据，默认初始时就会执行第一次, 从而可以收集需要监视的数据。
      watchEffect不需要传入依赖，watchEffect会自动收集依赖,只要指定一个回调函数，在组件初始化时，会先执行一次
      来收集依赖，然后当收集到的依赖中数据发生变化时，就会再次执行回调函数。所以对比如下
          watchEffect 不需要手动传入依赖
          watchEffect 会先执行一次用来自动收集依赖
          watchEffect 无法获取到变化前的值， 只能获取变化后的值
    ref:定义一个响应式的数据(对数据进行装箱操作，使其成为一个响应式对象，可以跟踪数据变化)，
    ref适合用来声明原始数据或数组

    toRefs:将响应式数据对象转化为单一响应式对象

    在script中如果想要操作使用ref定义的变量的数据，需要使用xxx.value的形式，在模板中则不需要(模板会自动拆箱)
    reactive:定义多个数据的响应式，接受一个普通对象然后返回该对象的响应式代理器对象(proxy)，响应式转换是深层的，
    会印象对象内部所有嵌套的属性，所有的数据都是响应式的，
    用reactive声明的数组如果直接赋值的话数据会更新，页面不会更新，失去了响应性，reactive更适合用来声明对象
    因为reactive底层使用proxy实现的,对于对象或者数组都不能直接赋值
    1、修改数组(数组整个赋值/替换)
      使用vue的变异数组方法可以对用reactive声明的数组方法进行响应式更新
    2、修改对象(对象整个赋值/替换)
      可以使用object.assign方法将指定对象替换掉
      例如
        let obj = reactive({a:1,b:2,c:3})
        
        obj = Object.assign(obj,{a:33,b:44,c:55})利用Object.assign方法将源数据替换掉，
        然后再将替换掉的数据赋值给源数据
        Object.assign(target,source) 返回值:目标对象
        如果目标对象中的属性和源数据对象的属性相同，则属性将被源对象中的属性覆盖，如果不一样，则进行合并
    新增组件:
      Teleport:独立组件(瞬移组件) 它可以让包裹的组件挂载到任何想挂载的DOM上，不会嵌套在#app中，这样就互不干扰了，
      可以把Teleport看成是一个传送门，把组件传送到任何地方，使用的时候to属性可以确定任何想要挂载的DOM节点下面，
      所以是很自由很独立的
    slot具名插槽语法：
      在vue2.x中，具名插槽的写法
        在子组件中
        <slot name="xxx"></slot>

        在父组件中
        <template slot="xxx">

        </template>
        如果要在slot上绑定数据，可以使用作用域插槽，实现如下：
              // 子组件
              <slot name="content" :data="data"></slot>
              export default {
                  data(){
                      return{
                          data:["走过来人来人往","不喜欢也得欣赏","陪伴是最长情的告白"]
                      }
                  }
              }
              <!-- 父组件中使用 -->
              <template slot="content" slot-scope="scoped">
                  <div v-for="item in scoped.data">{{item}}</div>
              <template>
            在 Vue2.x 中具名插槽和作用域插槽分别使用slot和slot-scope来实现， 
            在 Vue3.0 中将slot和slot-scope进行了合并同意使用。
            Vue3.0 中v-slot：
            <!-- 父组件中使用 -->
            <template v-slot:content="scoped">
              <div v-for="item in scoped.data">{{item}}</div>
            </template>

            <!-- 也可以简写成： -->
            <template #content="{data}">
                <div v-for="item in data">{{item}}</div>
            </template>

    */

    let state = reactive({
      name:'asd'
    });

    let stateTwo = toRefs(state);

    const updateArray = () => {
      arr.value = [3,2,1]
      brr.splice(0,brr.length,...[4,5,6])
      obj = Object.assign(obj,{a:33,b:44,c:55})
      // console.log(arr,`arr`)
      // console.log(brr,`brr`)
      // console.log(obj,`obj`)
        state.name = '333'
    }




  // watch([()=>user.firstName,()=>user.lastName,fullName3],()=>{console.log('我执行了')}) 
//     watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
//   /* ... */
// })
    watch(arr,(newV) => {
      console.log(newV)
    })
    watchEffect(() => {
      // console.log(arr.value,`arr---11`)
      // console.log(brr,`brr---22`)

    })
    // watch([arr,brr],([newV,oldV],[newVV,oldVV]) => {
    //   console.log(newV,oldV,`newV----`)
    //   console.log(newVV,oldVV,`newVV----`)
    // })
    // let oObj = reactive({a:1,b:2})
    // let cObj = reactive({c:1,d:2})
    // let aObj = Object.assign(oObj,cObj)
    // console.log(aObj,`aObj----`)

     return {
        modalOpen,
        state,
        ...stateTwo,
        arr,
        brr,
        obj,
        // oObj,
        // cObj,
        // aObj,
        updateArray
    }
  },
  methods:{},
}
</script>
<style  scoped>
.dialog{
  z-index: 1000;
  width:100%;
  height:700px;
  position: absolute;
  top:0;
  left:0;
  background: rgb(14, 12, 12);
}
</style>