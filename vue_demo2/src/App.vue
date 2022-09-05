<template>
  <div id="app">
     <div>
      <el-form>
        
        <el-input 
        v-model="inputValue1" 
        placeholder="请输入"  
        style="width:120px"
        @input="inputValue"></el-input>
        {{inputValue1}}

        <el-input 
        v-model.trim="formData.payDivisionProp" 
        @keyup.native="formData.payDivisionProp =   handleOninput(formData.payDivisionProp,'2')">
        </el-input>

      </el-form>
     </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data(){
    return {
      inputValue1:"",
      formData:{
        payDivisionProp:""
      }
    }
  },
  methods:{
    inputValue(val){
      this.inputValue1 = val.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, "$1")
    },
    handleOninput(value,type){
    let str = value;
    let len1 = str.substr(0, 1);
    let len2 = str.substr(1, 1);
    //如果第一位是0，第二位不是点，就用数字把点替换掉
    if (str.length > 1 && len1 == 0 && len2 != ".") {
      str = str.substr(1, 1);
    }
    //第一位不能是.
    if (len1 == ".") {
      str = "";
    }
    if (len1 == "+") {
      str = "";
    }
    if (len1 == "-") {
      str = "";
    }

    //限制只能输入一个小数点
    if (str.indexOf(".") != -1) {
      let str_ = str.substr(str.indexOf(".") + 1);
      if (str_.indexOf(".") != -1) {
        str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
      }
    }
    //正则替换
    str = str.replace(/[^\d.]+/g, "");// 保留数字和小数点
    if(type == '2'){
      str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, "$1"); // 小数点后只能输 3 位
    }else{
      str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, "$1"); // 小数点后只能输 2 位
    }
    return str;
  }
  }
}
</script>

<style>

</style>
