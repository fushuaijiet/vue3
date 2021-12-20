<template>
<div>
    <input type="checkbox" :value="$attrs.label" :checked="value === $attrs.label? true : false" 
            @change="chexkboxChange"/>
    <label>
        <slot></slot>
    </label>
</div>

</template>

<script>
export default {
    props:{
        value:{
            type:String || Array
        },
    },
    setup(props,context){
        console.log(props,context);
        const chexkboxChange = (e) => {
            context.emit('update:value',e.target.value)
        }
        return {
            chexkboxChange
        }
    }
}
</script>
<style lang="scss" scoped>


</style>