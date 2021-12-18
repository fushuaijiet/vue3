import {createApp} from "vue"
import MinDialg from "./Message.vue"
let app = createApp(MinDialg,{dialogVisible:false});
let divEle = document.createElement("div");
divEle.setAttribute('class','message');
const init = (value,msg,states) => {
    console.log(states,`states`)
        app = createApp(MinDialg,
                {dialogVisible:value,text:msg,state:states})
        // 将节点挂在到一个dom元素上
        if(app._container === null){
                document.body.appendChild(divEle)
                app.mount(divEle)
        }
        
};
const reset = (time) =>{
        // 解除绑定的时候
        // onUnmounted(()=>{
                setTimeout(() => {
                        if(app._container !== null){
                                app.unmount(divEle)
                                document.body.removeChild(divEle)
                        }
                }, time);
};
const createMinDialog = ({dialogVisible,time,msg,states}) => {
        init(dialogVisible,msg,states);
        reset(time)  
}
 
export default createMinDialog;