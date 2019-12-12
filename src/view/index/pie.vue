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
      type: Object,
      default: () => {}
    },
    yName: {
      type: String,
      default: "权数"
    }
  },
    watch: {
        data: {
            deep: true,  // 深度监听
            handler(newVal,oldVal) {
                this.bar();
            }
        }
    },
  created() {},
  methods: {
    resize(val) {
      this.dom.resize();
    },
    bar() {
      // const option = {
      //   // 更改圆饼图颜色
      //   color: ["#5EF2FF", "#766AFF"],
      //
      //   series: [
      //     {
      //       animationDuration: 4000,
      //       type: "pie",
      //       radius: "80%",
      //       center: ["50%", "50%"],
      //       data: this.data.data,
      //       labelLine: {
      //         show: false,
      //         length: 0.0001
      //       },
      //     }
      //   ]
      // };
        const option = {
            // 更改圆饼图颜色
              color: ["#5EF2FF", "#766AFF"],
            // title : {
            //     show:true,
            //     formatter: ' {c|GDP比重{d}%\n产业化规模{c}亿元}',
            // },

            legend: {
                height:100,
                width:600,
                orient: 'horizontal',
                textStyle: {color: '#FFFFFF',fontSize:18},
                padding:[10,350,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                x: 'center',
                y : 'top',
                data:[`数字产业化规模`,
                    `产业数字化规模`]
            },
            series: [
                {
                    type:'pie',
                    // radius: "100%",
                    radius: "80%",
                    center: ["50%", "55%"],
                    avoidLabelOverlap: false,
                    selectedMode: 'single',
                    label: {
                        normal: {
                            // formatter: ' {c|GDP比重{d}%\n\产业化规模{c}亿元}',//图形外文字上下显示
                            formatter: [
                                '{c|GDP比重{d}%}',
                                '{b|产业化规模{c}亿元}'
                            ].join('\n'),
                            borderWidth: 20,
                            borderRadius: 4,
                            rich: {
                                c: {                   //value 文字样式
                                    fontSize: 18,
                                    lineHeight: 20,
                                    width: 10,
                                    color: '#FFFFFF',
                                    // marginLeft : '120px'
                                    align:"right"
                                },
                                b: {                   //value 文字样式
                                    fontSize: 16,
                                    lineHeight: 20,
                                    width: 220,
                                    color: '#FFFFFF',
                                    // marginLeft : '120px'
                                    align:"right"
                                }
                            },
                            position :'inner',
                            // padding:[90,-130,40,-110],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                            padding:[0,0,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    // data:[
                    //     {value:this.data.data[0], name:`数字产业化规模${ this.data.data[0] }亿元\n占全区数字经济规模GDP比重${this.data.data[2]}`},
                    //     {value:this.data.data[1], name:`产业数字化规模${ this.data.data[1] }亿\n元占全区数字经济规模GDP比重达${this.data.data[3]}`},
                    // ]
                    data:[
                        {value:this.data.data[0], name:`数字产业化规模`},
                        {value:this.data.data[1], name:`产业数字化规模`},
                    ]
                    // data : [this.data.data[0],this.data.data[1]]
                }
            ]
        };
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
