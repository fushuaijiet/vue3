<template>
  <!-- <div class="ul">
    <div v-for="(item, index) in lists" :key="index">
      <div v-show="item.value.length < 1">
        {{item.order}}
      </div>
      <div v-show="item.value.length" style="display:flex">
        <div v-for="(myx,sy) in item.value" :key="sy" style="margin:0 10px 0 0">
          {{myx.order}}
        </div>
      </div>
    </div>
  </div> -->
  <div>
    1111
  </div>
</template>
<script>

export default {
  name: "index",
  data() {
    return {
      arr:[ 
      {
        order:5,
        name:22,
        label:1
      },
      {
        order:-1,
        name:22,
        label:2
      },
      {
        order:0,
        name:22,
        label:3
      },
      {
        order:1,
        name:11,
        label:4
      },
      {
        order:1,
        name:22,
        label:5
      },
        {
        order:4,
        name:22,
        label:6
      },
      {
         order:3,
         name:33,
         label:7
      },
      {
         order:3,
         name:33,
         label:8
      },
    
       {
         order:9,
        name:33,
        label:9
      },

    ],
      lists: []
    };
  },
  created() {
    // 将order值相同的放到一行显示，order值不相同的独占一行显示，全部按升序显示


    this.init()
  },
  methods:{
    init(){
      const json = {}
    for (let i = 0; i < this.arr.length; i++) {
      if (json[this.arr[i].order]) {
        json[this.arr[i].order].push(this.arr[i])
      } else {
        const v = []
        console.log(this.arr[i],`i-----`)
        v.push(this.arr[i])
        json[this.arr[i].order]  = v
      }
    }
    const lists = []
    for (let key in json) {
      // console.log(json[key],`key----------`)
      lists.push({
        order: key,
        value: json[key],
        label:json[key][0].label
      })
    }
    console.log(lists)
    this.lists = lists;
    }
  }
};
</script>