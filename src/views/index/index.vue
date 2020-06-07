<template>
  <div id="app">
    <a href="about.html">{{msg}}</a>
    <div class="box">
      <div class="color1"></div>
      <div class="color2"></div>
      <div class="color3"></div>
      <div class="color4"></div>
      <div class="color5"></div>
      <div class="color6"></div>
      <div class="color7"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: '',
  components:{

  },
  data () {
    return {
      msg:"首页"
    }
  },
  computed:{

  },
  methods:{
   
  },
  created(){

  },
  mounted(){
    
  },
  watch:{

  }
}
$(document).ready(function(){
  
})
</script>

<style lang="scss">
.box{
  width: 100%;
  .color1{
    width: 100%;
    height: 600px;
    background-color: #eee;
  }
  .color2{
    width: 100%;
    height: 600px;
    background-color: #ddd;
  }
  .color3{
    width: 100%;
    height: 600px;
    background-color: #ccc;
  }
  .color4{
    width: 100%;
    height: 600px;
    background-color: #bbb;
  }
  .color5{
    width: 100%;
    height: 600px;
    background-color: #aaa;
  }
  .color6{
    width: 100%;
    height: 600px;
    background-color: #999;
  }
  .color7{
    width: 100%;
    height: 600px;
    background-color: #888;
  }
}
</style>
