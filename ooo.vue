<template>
  <div>
    11111
    <router-link to="/hello"></router-link>
    <router-view></router-view>
  </div>
  <!-- <a-row class="wrap">
    <a-col :span="20">
      <a-table
        :key="tableKey"
        row-key="id"
        :data-source="studentList"
        :columns="studentColumns"
        :row-selection="rowSelection"
      >
        <template #operation="{ record, index }">
          <a-button
            v-if="record.state === false"
            @click="deleteRow(record, index)"
            >删除 {{ index }}</a-button
          >
        </template>
      </a-table>
    </a-col>
  </a-row> -->
</template>
<script>
import { reactive, ref,onMounted, toRefs } from "vue";
export default {
  name: "App",
  // setup() {
  //   const studentState = reactive({
  //     selectedRowKeys: [],
  //     loading: false,
  //   });

  //   const tableKey = ref(1);

  //   const state = reactive({
  //     selectedRowKeys: [],
  //     selectedRow: [],
  //   });

  //   const selectedChange = (selectedRowKeys, row) => {
  //     state.selectedRowKeys = selectedRowKeys;
  //     state.selectedRowKey = row;
  //   };

  //   // 是否可删除用 state 的 true/ false 表示即可。
  //   // true 代表可以操作，不展示删除，false 反之
  //   const studentList = reactive([
  //     {
  //       stuId: "1", //学号
  //       name: "111", //姓名
  //       cardNo: "1111111111111111111111", //身份证号
  //       studentType: "", //学员分类
  //       mobilePhone: 16716830907, //手机号
  //       schoolYear: "2020-09-01", //入学年份
  //       id: "0",
  //       state: false,
  //     },

     
  //   ]);

  //   let add = ref(false);

  //   onMounted(() => {
  //     // state.selectedRowKeys 给初始值加上内容， 如果接口返回的 studentList； 那么在接口返回之后的地方，加上初始值
  //     studentList.forEach((item) => {
  //       state.selectedRowKeys.push(item.id);
  //     });
  //   });


  //   const deleteRow = (data, index) => {
  //     console.log("data", data, studentList);
  //     data.state = true; // true 代表可以操作，不展示删除，false 反之
  //     data.name = "新修改---测试";
  //     tableKey.value = tableKey.value + 1;
  //     console.log(index)
  //     state.selectedRowKeys.splice(Number(data.id),1);
  //     console.log(state.selectedRowKeys,`state.selectedRowKeys`)
  //   };

  //   const rowSelection = {
  //     selectedRowKeys: { ...toRefs(state) }.selectedRowKeys,
  //     onChange: selectedChange,
  //     getCheckboxProps: (record) => {
  //       return {
  //         disabled: record.state === false, // fasle 的时候 代表不可操作。
  //       };
  //     },
  //   };

  //   return {
  //     add,
  //     deleteRow,
  //     studentState,
  //     studentList,
  //     state,
  //     tableKey,
  //     // getId,
  //     selectedChange,
  //     rowSelection,
  //     studentColumns: reactive([
  //       { title: "学号", dataIndex: "stuId" },
  //       { title: "姓名", dataIndex: "name", slots: { customRender: "name" } },
  //       { title: "身份证号", dataIndex: "cardNo", ellipsis: true },
  //       { title: "学员分类", dataIndex: "studentType" },
  //       { title: "手机号", dataIndex: "phone" },
  //       { title: "入学年份", dataIndex: "schoolYear" },
  //       {
  //         title: "操作",
  //         dataIndex: "operation",
  //         slots: { customRender: "operation" },
  //       },
  //     ]),
  //   };
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrap {
  margin: 0 0 0 300px;
}
</style>
