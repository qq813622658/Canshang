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
      colors: ["#2d8cf0", "#FFFFFF", "#FDCC47"]
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      // type: Object,
      // default: () => {}
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

    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    title: [
        {
            text: '金山片区',
            bottom: '10%',
            left: '5%',
            textStyle: {
                color: '#fff',
                fontWeight : 'none'
            },
        },
        {
            text: '橘园洲区',
            bottom: '10%',
            left: '25%',
            textStyle: {
                color: '#fff',
                fontWeight : 'none'
            },
        },
        {
            text: '浦上片区',
            bottom: '10%',
            left: '45%',
            textStyle: {
                color: '#fff',
                fontWeight : 'none'
            },
        },
        {
            text: '福湾片区',
            bottom: '10%',
            left: '65%',
            textStyle: {
                color: '#fff',
                fontWeight : 'none'
            },
        },
        {
            text: '义序片区',
            bottom: '10%',
            left: '85%',
            textStyle: {
                color: '#fff',
                fontWeight : 'none'
            },
        },

    ],
    legend: { // 图列
        icon: "rect",
        itemWidth: 15,  // 设置宽度
        itemHeight:15, // 设置高度
        itemGap: 20 ,// 设置间距
        show : true,
        textStyle : {
            color: '#fff',
            fontSize: 16
        },
    },
     color : [ '#6a6cff', '#5d38a1', '#d88f40', '#df555c'],
    grid: {
        left: '70%',
        top: 'center',
        right: '1%',
    },
    series: [
        {

            tooltip: {
                trigger: 'item',
                show:false,
                formatter: "{b} : {c} ({d}%)"
            },
            type: 'pie',
            center: ['10%', '60%'],
            radius: ['10%', '39%'],
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    value: this.data.JSSG,
                    name: '规上工业企业'
                },
                {
                    value: this.data.JSFW,
                    name: '规上服务业'
                },
                {
                    value: this.data.JSSG,
                    name: '限上商贸企业'
                },
                {
                    value: this.data.JSQT,
                    name: '其他类型企业'
                }
            ]
        },
        {
            tooltip: {
                trigger: 'item',
                show:false,
                formatter: "{b} : {c} ({d}%)"
            },
            type: 'pie',
            center: ['30%', '60%'],
            radius: ['10%', '39%'],
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    value: this.data.JYGY,
                    name: '规上工业企业'
                },
                {
                    value: this.data.JYFW,
                    name: '规上服务业'
                },
                {
                    value: this.data.JYSS,
                    name: '限上商贸企业'
                },
                {
                    value: this.data.JYQT,
                    name: '其他类型企业'
                }
            ]
        },
        {
            tooltip: {
                trigger: 'item',
                show:false,
                formatter: "{b} : {c} ({d}%)"
            },
            type: 'pie',
            center: ['50%', '60%'],
            radius: ['10%', '39%'],
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    value: this.data.PSGY,
                    name: '规上工业企业'
                },
                {
                    value: this.data.PSFW,
                    name: '规上服务业'
                },
                {
                    value: this.data.PSSS,
                    name: '限上商贸企业'
                },
                {
                    value: this.data.PSQT,
                    name: '其他类型企业'
                }
            ]
        },
        {
            tooltip: {
                trigger: 'item',
                show:false,
                formatter: "{b} : {c} ({d}%)"
            },
            type: 'pie',
            center: ['70%', '60%'],
            radius: ['10%', '39%'],
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    value: this.data.FWGT,
                    name: '规上工业企业'
                },
                {
                    value: this.data.FWFW,
                    name: '规上服务业'
                },
                {
                    value: this.data.FWSS,
                    name: '限上商贸企业'
                },
                {
                    value: this.data.FWQT,
                    name: '其他类型企业'
                }
            ]
        },
        {
            tooltip: {
                trigger: 'item',
                show:false,
                formatter: "{b} : {c} ({d}%)"
            },
            type: 'pie',
            center: ['90%', '60%'],
            radius: ['10%', '39%'],
            label: {
                show: false
            },
            labelLine: {
                show: false,
            },
            data: [
                {
                    value: this.data.YXGY,
                    name: '规上工业企业'
                },
                {
                    value: this.data.YXFW,
                    name: '规上服务业'
                },
                {
                    value: this.data.YXSS,
                    name: '限上商贸企业'
                },
                {
                    value: this.data.YXQT,
                    name: '其他类型企业'
                }
            ]
        },
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
