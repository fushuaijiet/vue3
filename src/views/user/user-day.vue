<template>
  <div> {{inputVal}}</div>
  <div class="">
    <div>
      输入框(可删除框内内容)
      <f-input v-model:value="inputVal" clear="true"/>
    </div>
    <div>
      密码框(点击图标可控制密码的隐藏与显示)
      <f-input v-model:value="passwordVal" placeholder="请输入内容" type="password"/>
    </div>
    <div>
      禁用状态及placehoder的显示
      <f-input placeholder="请输入内容" disabled/>
    </div>


    <div @click="lookShow">查看</div>


    <div>
      <f-radio v-model:value="radioVal" label="1">A</f-radio>
      <f-radio v-model:value="radioVal" label="2" disabled>B</f-radio>
    </div>

    <div>

      <f-checkbox v-model:value="checkVal" label="多选一">多选一</f-checkbox>
      <f-checkbox v-model:value="checkVal2" label="多选二">多选一</f-checkbox>
    </div>
  </div>
</template>

<script>
import { ref
} from 'vue'
export default {
  components:{},
  props:{},
  setup(){
    let inputVal = ref('123777');
    let passwordVal = ref('');
    let radioVal = ref('1');
    let checkVal = ref('多选一');
    let checkVal2 = ref('多选2')
    const lookShow = () => {
      console.log(inputVal.value)
      console.log(radioVal.value,`radiovalue`)
    };
    console.log(ref)
     return {
       inputVal,
       lookShow,
       radioVal,
       checkVal,
       checkVal2,
       passwordVal,
    }
  },
}
</script>
<style lang="scss" scoped>
</style>