<template>
  <ul class="ul">
    <li v-for="(list, index) in lists" :key="index">{{list}}</li>
  </ul>
</template>
<script>

export default {
  name: "index",
  data() {
    return {
      lists: []
    };
  },
  created() {
    // 将order值相同的放到一行显示，order值不相同的独占一行显示，全部按升序显示
    const arr =[ 
      {
        order:1,
        name:11
      },
      {
        order:1,
        name:22
      },
      {
        order:2,
        name:33
      },
      {
        order:0,
        name:11
      }
    ]
    const json = {}
    for (let i = 0; i < arr.length; i++) {
      if (json[arr[i].order]) {
        json[arr[i].order].push(arr[i])
      } else {
        const v = []
        v.push(arr[i])
        json[arr[i].order]  = v
      }
    }
    const lists = []
    for (let key in json) {
      // let str = '';
      // if (json[key].length) {
      //   for (let i = 0; i< json[key].length; i++) {
      //     if (i == json[key].length -1) {
      //       str += `${JSON.stringify(json[key][i])}` 
      //     } else {
      //       str += `${JSON.stringify(json[key][i])} ` 
      //     }
      //   }
      //   console.log(str)
      // }
      lists.push({
        order: key,
        value: json[key]
      })
    }
    console.log(lists)
    this.lists = lists;
  },
};
</script>