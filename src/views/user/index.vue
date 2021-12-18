<template>
  <div class="">
  个人信息
  <router-view></router-view>
  </div>
</template>

<script>
import { reactive, ref, 
} from 'vue'
export default {
  components:{},
  props:{},
  setup(){
console.log(reactive,ref)
     return {
    }
  },
  methods:{},
}
</script>
<style lang="scss" scoped>
</style>