<template>
  <div>
    我是first页面
    {{add}}

    <firstChild am="111">
      <template v-slot:header>
        <div>
          12345
        </div>
      </template>
    </firstChild>



  </div>
</template>

<script>
import {readonly, ref} from 'vue';
import firstChild from './first-child.vue';
export default {
  name:'detail',
    components:{
      firstChild
    },
    setup(){
      let add = ref('111');
      //ref可以将一个普通的类型，转化成一个对象，这个对象中有value属性，指向原来的值(script里是这样的,在模板里直接用变量就可以了)

      let pr = readonly(add);
      console.log(pr.value,`pr----`)

      
      return {
        add,
        pr
      }
  }
}
</script>
<style scoped>
</style>