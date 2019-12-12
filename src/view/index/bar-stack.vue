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
      const option = {
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true
        },
        legend: {
          data: ["智能产业规模占全区GDP", "数字经济规模占全市GDP"],
          textStyle: {
            color: "#fff",
            fontSize: "15"
          }
        },
        xAxis: [
          {
            type: "category",
            data: this.data.xData,
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 15 // 设置x轴字体
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1 // 这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: [
          {
            show: false
          },
          {
            show: false
          }
        ],
        series: [
          {
            name: "数字经济规模占全市GDP",
            animationDuration: 5000,
            type: "bar",
            data: this.data.data1,
            color: "#1E81FA",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontSize: 16
                  },
                  formatter: "{c}%" // 百分比显示
                }
              }
            }
          },
          {
            name: "智能产业规模占全区GDP",
            animationDuration: 5000,
            type: "bar",
            data: this.data.data2,
              barGap:'70%',//柱图间距
            color: "#F54F55",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontSize: 16
                  },
                  formatter: ">{c}%" // 百分比显示
                }
              }
            }
          }
        ],
        barWidth: 30
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
  },
};
</script>
