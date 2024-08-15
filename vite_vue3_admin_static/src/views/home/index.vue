<template>
  <div class="dashboard">
    <!-- 第一排图标 -->
    <div class="firstbox">
      <!-- 1-1 -->
      <div class="yearcategory">
        <h1>全年支出类别</h1>
      </div>
      <!-- 1-2 -->
      <div class="yearie">
        <div class="yearExpenditure">
          <h1>2022年总支出</h1>
          <span>-51297</span>
        </div>
        <div class="yearIncome">
          <h1>2022年总收入</h1>
          <span>57000</span>
        </div>
        <div class="ieCategory">
          <h1>全年收入类别</h1>
          <div class="ieCategory_charts" style="width: 150px; height: 180px; padding-top: 30px"></div>
        </div>
      </div>
      <!-- 1-3 -->
      <div class="assetAllocation"></div>
    </div>
    <!-- 第二排 -->
    <div class="secondbox"></div>
    <!-- 第三排 -->
    <div class="thirdbox">
      <div class="monthlyie"></div>
      <div class="monthlysurplus"></div>
    </div>
    <CopyR></CopyR>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import * as echarts from 'echarts';

nextTick(()=>{
  //@ts-ignore
  let mCharts = echarts.init(document.querySelector(".ieCategory_charts"))
  let pieData = [
    {
      name:'工作收入',
      value: 40000
    },
    {
      name:'其他收入',
      value: 17000
    }
  ]
let option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'center',// 图例居中放置
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10
    // bottom: 1 // 图例与饼图之间的距离
  },
  series: [
    {
      name: '全年收入类别',
      type: 'pie',
      radius: '50%',
      data: pieData,
      center: ['50%', '50%'],  //调整饼图的位置
      label: {show: false  },
      color: ['rgb(85,198,239)','rgb(83,131,241)'],
      itemStyle:{ //有间隙
        borderWidth:2,
        borderColor:'#fff',
      },
    }
  ]
};
  mCharts.setOption(option)
  document.addEventListener('click',(params:any)=>{
    console.log(params);

  })

})



</script>

<style scoped lang="scss">
.dashboard {
  width: 100%;
  height: 900px;
  padding: 20px;
  h1 {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;
  }
  /*第一排图标 */
  .firstbox {
    width: 100%;
    height: 500px;
    // border: 2px solid orange;
    display: flex;
    justify-content: space-between;
    /* 1-1 */
    .yearcategory {
      margin-right: 15px;
      width: 33%;
      height: 100%;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
    }
    .yearcategory:hover {
      border: 3px solid rgb(194,212,255);
    }
    .yearcategory:active {
      border: 3px solid rgb(20,86,240);
    }
    /* 1-2 支出数字 */
    .yearie {
      width: 33%;
      height: 100%;
      // background-color: yellow;
      margin-right: 15px;

      // display: flex;
      .yearExpenditure {
        width: 100%;
        height: 250px;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 20px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        span {
          color: rgb(247,105,100);
          display: inline-block;
          // background-color: red;
          font-size: 4em;
          font-weight: 700;
          margin-top: 55px;
          margin-left: 45px;
        }
      }
         
      .yearExpenditure:hover { border: 3px solid rgb(194,212,255);}
      .yearIncome {
        width: 48%;
        height: calc(100% - 250px - 15px);
        // background-color: yellow;
        background-color: #fff;
        border-radius: 10px;
        float: left;
        padding: 20px;
        span {
          font-family:Verdana, Geneva, Tahoma, sans-serif;
          color: rgb(51,112,255);
          display: inline-block;
          // background-color: red;
          font-size: 2em;
          font-weight: 700;
          margin-top: 65px;
          margin-left: 20px;
        }
      }
      .yearIncome:hover { border: 3px solid rgb(194,212,255);}
      
      .ieCategory{
        padding: 20px;
        width: 48%;
        height: calc(100% - 250px - 15px);
        border-radius: 10px;
        background-color: #fff;
        float: right;
      }
      .ieCategory:hover{border: 3px solid rgb(194,212,255);}
    }
    .assetAllocation{
      width: 33%;
      height: 100%;
      background-color: green;

    }
  }

  .secondbox {

  }

  .thirdbox {

  }
}

</style>