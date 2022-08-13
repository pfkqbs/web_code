<template>
<div>
  <div v-if="showDetail" >
    <div class="group-input">
      <span>性别：</span>
        <el-radio v-model="sex" label="男">男</el-radio>
        <el-radio v-model="sex" label="女">女</el-radio>
    </div>
    <div>
    <p>radioArray：{{form.radioArray}}</p>
    <div v-for="(item,index) of list2" :key="index">
   
      <el-radio-group v-model="form.radioArray[index]">
        <el-radio v-for="it of item.list" :key="it.id" :label="it.id"  @change="handleRadioChanges(item,it.id)">
          {{it.anames}}
        </el-radio>
      </el-radio-group>
    </div>结果：{{reslist}}</div>

    <el-table
      ref="multipleTable0"
      :data="tableData"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
     @row-click="clickRow0"
     :height="tableHeight">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120"> <template slot-scope="scope">{{ scope.row.date }}</template> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
      <!-- show-overflow-tooltip当内容过长被隐藏时显示  -->
    </el-table>

    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="goSon()">跳转子页面</el-button>
    </div>

  </div>

  <div v-if="showDetail2" >
    <el-table
      ref="multipleTable"
      :data="tableData2"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
       @row-click="clickRow">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120"> <template slot-scope="scope">{{ scope.row.date }}</template> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
      <!-- show-overflow-tooltip当内容过长被隐藏时显示  -->
    </el-table>
    <el-button @click="goFather()">返回</el-button>
    </div>

</div>

  
</template>


<script>
// import {TableDemoSon} from '@/components/TableDemoSon'
    export default {
      name: 'TableDemoSon',
      // components:{TableDemoSon},
      data() {
        return {
          tableHeight: 300,
          tableData: [
          { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'}, 
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'}, 
          { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄'},
          { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'}],
          tableData2: [
          { date: '2016-05-02', name: '22', address: '222'}, 
          { date: '2016-05-04', name: '22', address: '222'}, 
          { date: '2016-05-01', name: '22', address: '222'},
          { date: '2016-05-03', name: '22', address: '222'}],
          multipleSelection: [],
          showDetail:true,
          showDetail2:false,
          sex:false,
          hobby:false,
          hobbyLabel:[
            {value:1,label:"篮球"},
            {value:2,label:"足球"},
            {value:3,label:"排球"},
          ],
          form: {
          radioArray:[]
        },
        reslist: [],
        list2: [
          {
            id:'000',
            list: [
                {id:'11', anames: '备选项1', pcStatus: null},
                {id:'12', anames: '备选项2', pcStatus: null},
                {id:'13', anames: '备选项3', pcStatus: null}
              ]
          },
          {
            id:'001',
            list: [
                {id:'14', anames: '备选项4', pcStatus: 1},
                {id:'15', anames: '备选项5', pcStatus: null},
                {id:'16', anames: '备选项6', pcStatus: null}
              ]
          },
          {
            id:'002',
            list: [
                {id:'11', anames: '备选项1', pcStatus: null},
                {id:'12', anames: '备选项2', pcStatus: null},
                {id:'13', anames: '备选项3', pcStatus: null}
              ]
          }
         ]
      

        }
      },
      
      methods: {  
        //选中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //选中数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //前往子页面
      goSon(){
        console.log("111");
        this.showDetail=false;
        this.showDetail2=true;
        console.log("this.showDetail",this.showDetail);
        // console.log("this.showDetail2",this.showDetail2);

      },
      //单选一行的内容  实现选中
      clickRow(row){
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      //单选一行的内容  实现选中
      clickRow0(row){
        this.$refs.multipleTable0.toggleRowSelection(row)
      },
      //前往父页面
      goFather(){
        this.showDetail2=false;
        this.showDetail=true;
      },

      handCheck(){
      const aaa = []
      this.list2.forEach((item,index) => {
        item.list.forEach(it => {
            if(it.pcStatus === 1){
              aaa.push(it.id)
             }
          }) 
        if(aaa.length!==index+1){
          aaa.push(null)
        }
      })
      this.form.radioArray = aaa
    },
    // 取值
    handleRadioChanges(item, id) {
      this.writeText2 = item
      this.writeText3 = id
      item.list.forEach(res => {
        if(res.id === id){
          res.pcStatus = 1 
        }else {
          res.pcStatus = 0
        }
      })
      this.reslist.push(item)
      let newArry=this.reslist;
      //数组去重选择最后一条数据
          for(var i=0;i<newArry.length;i++){
            for(var j=i+1;j<newArry.length;j++){
              if(newArry[i].id==newArry[j].id){
                newArry.splice(i,1);
                j--;
              }
            }
          } 
          this.reslist=newArry;
     }
    

    }
  
    }
  </script>

<style scoped>

</style>

