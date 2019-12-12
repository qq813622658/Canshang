<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  data() {
    return {
      dom: null,
      barData: 0,
      colors: ["#2d8cf0", "#14CC82", "#FDCC47"]
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      // type: Object,
      default: () => {}
    },
    yName: {
      type: String,
      default: "权数"
    }
  },
  watch: {
    barData(val) {}
  },
  created() {},
  methods: {
    resize(val) {
      this.dom.resize();
    },
    bar() {
      console.log(this.data);
      var colors = [{
            type: 'linear',
            x: 0, x2: 1, y: 0, y2: 0,
            colorStops: [{
                offset: 0,
                color: '#00B7EEFF'
            }]
        }, {
            type: 'linear',
            x: 0, x2: 1, y: 0, y2: 0,
            colorStops: [{
                offset: 0,
                color: 'red'
            }]
        }];
      const option = {
          color: colors,
           legend: {
              data: ['工业用地面积', '厂房'],
              textStyle: {
                  color: '#fff'          //legend字体颜色
              }
          },
          xAxis: {
              show : true, //设置为true时候显示
              data: ['金山片区', '橘园洲片', '浦上片区', '福湾片区','义序片区'],
              axisLabel : {
                  show : true ,
                  textStyle : {
                      color: '#fff',   //x轴上的字体颜色
                      fontSize:'16'    // x轴字体大小
                  }
              }
          },
          yAxis: {
            axisLabel: {
              show: false
            }
          },
          series: [{
              name: '工业用地面积',
              type: 'bar',
              data:[this.data.JinshanQUCF, this.data.JUYUANQUCF,this.data.PUSHANGCF, this.data.FUWANCGF, this.data.YIXUCF],
              itemStyle: {
		                normal: {
		                    label: {
		                        show: true,//是否展示
                            formatter : '{c}'+'亩',
                            position: 'top',
		                        textStyle: {
		                       		fontWeight:'bolder',
		                        	fontSize : '12',
		                          fontFamily : '微软雅黑',
                              color: '00B7EEFF'
		                        }
		                    },
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: "white" // 0% 处的颜色
                        }, {
                            offset: 0.02,
                            color: "#2b8df1" // 0% 处的颜色
                        },{
                            offset: 0.975,
                            color: "#277ff1" // 60% 处的颜色
                        }, {
                            offset: 1,
                            color: "white" // 100% 处的颜色
                        }], false)
		                }
              }
          }, {
              name: '厂房',
              type: 'bar',
              data:[this.data.JinshanQUGY, this.data.JUYUANQUGY, this.data.PUSHANGGY, this.data.FUWANGY, this.data.YIXUGY],
              itemStyle: {
		                normal: {
		                    label: {
		                        show: true,//是否展示
                            position: 'top',
		                        textStyle: {
		                       		fontWeight:'bolder',
		                        	fontSize : '12',
		                          fontFamily : '微软雅黑',
                              color: 'red'
		                        },
                            formatter : '{c}'+'栋'
		                    },
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: "white" // 0% 处的颜色
                        }, {
                            offset: 0.02,
                            color: "#cf596f" // 0% 处的颜色
                        },{
                            offset: 0.975,
                            color: "#cf596f" // 60% 处的颜色
                        }, {
                            offset: 1,
                            color: "white" // 100% 处的颜色
                        }], false)
		                }
              },
              symbolSize:[50, 50],
              symbolOffset:[0,-35],
          }]
      }
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option, true);
        on(window, "resize", this.resize);
        this.dom.on("click", params => {
          this.$emit("clickData", params);
        });
      });
    }
  },
  mounted() {
    this.bar();
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
