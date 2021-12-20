<template>
  <div class="input">
      <input v-show="$attrs.type!='password'" :type="$attrs.type" :value="value" @input="searchInput" :disabled="disabled"
              :placeholder="$attrs.placeholder" 
              :class="[disabled ? 'disabled':'default']"
              />
      <input v-show="$attrs.type==='password'" :type="pasType" :value="value" @input="searchInput" :disabled="disabled"
              :placeholder="$attrs.placeholder" 
              :class="[disabled ? 'disabled':'default']"
              />
       <span v-show="$attrs.type === 'password'" @click="toggle" class="show" >
         <img :src="bagkImg">
       </span>

       <span v-show="$attrs.clear" @click="deletValue">
         x
       </span>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  components:{},
  props:{
    value:{
      type:String
    },
    disabled:{
      type:Boolean,
      default:false
    },
  },
  setup(props,context){
    let pasType = ref('password');
    let bagkImg = require('@/assets/password.png');
    const searchInput = (e) => {
      context.emit('update:value',e.target.value)
    };

    const toggle = () => {
      pasType.value = pasType.value === 'password' ? 'input' :'password';
    };

    const deletValue = () => {
        context.emit('update:value','')
    }

     return {
       toggle,
       pasType,
       bagkImg,
       deletValue,
       searchInput,
    }
  },
}
</script>
<style lang="scss" scoped>
.disabled{
  cursor:not-allowed;
}
.show{
  display:inline-block;
  width:20px;
  height:20px;
  vertical-align:middle;
  img{
    width:20px;
    height:17px;
  }
}

</style>
