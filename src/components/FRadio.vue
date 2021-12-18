<template>
    <div>
         <input type="radio"  :value="$attrs.label" name="drone"  @change="radioChange"
                :checked="value === $attrs.label ? true : false" :disabled="disabled">
        <label>
            <slot></slot>    
        </label>       
    </div>
</template>
<script>
export default {
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
        console.log(props,context);
        const radioChange = (e) => {
            context.emit('update:value',e.target.value)
        }
        return {
            radioChange
        }
    }
}
</script>
<style lang="scss" scoped>


</style>