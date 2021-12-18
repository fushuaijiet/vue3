<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name:'detail',
    setup(){
      let add = ref('111');
      let arr = ref([
        {
          a:1
        },
        {
          a:1
        },
        {
          a:2
        }
      ]);
      let brr = ref([]);
      arr.value.forEach((item) => {
        brr.value.push(item)
      })
      brr.value = [...new Set(brr.value)]
      // console.log(brr,`brr`)
      //ref可以将一个普通的类型，转化成一个对象，这个对象中有value属性，指向原来的值(script里是这样的,在模板里直接用变量就可以了)
      // console.log(add.value)
      return {
        add,
        arr,
        brr
      }
  }
}
</script>
<style scoped>
</style>