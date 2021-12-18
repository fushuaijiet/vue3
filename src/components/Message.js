import {createApp} from "vue"
import MinDialg from "./Message.vue"
// const createMinDialog = () => {
//     var app = createApp(MinDialg,{
//         dialogVisible:true
//     })
//     var divEle = document.createElement("div")
//     // 让我们节点挂在到一个dom元素上
//     document.body.appendChild(divEle)
//     app.mount(divEle)
//     // 解除绑定的时候
//    onUnmounted(()=>{
//        app.unmount(divEle)
//        document.body.removeChild(divEle)
//    })
// }
var app = createApp(MinDialg,{dialogVisible:false})
var divEle = document.createElement("div");
const init = (value,msg,states) => {
    console.log(states,`states`)
        app = createApp(MinDialg,
                {dialogVisible:value,text:msg,state:states})
        // 让我们节点挂在到一个dom元素上
        document.body.appendChild(divEle)
        app.mount(divEle)
};
const reset = () =>{
        // 解除绑定的时候

        // app = createApp(MinDialg,{dialogVisible:false})
        // onUnmounted(()=>{
            app.unmount(divEle)
            document.body.removeChild(divEle)
        // })
};
const createMinDialog = ({dialogVisible,time,msg,states}) => {
        init(dialogVisible,msg,states);
        setTimeout(() => {
            reset()
        },time)
   
}
 
export default createMinDialog;