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
                var arr = [ this.data[0].taking, this.data[0].fieldRevenue] ;
                arr.forEach((value,index) => {
                    if (value === "/") {
                        arr[index] = 0 ;
                    }
                })
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: { // 图列
                        icon: "rect",
                        itemWidth: 15,  // 设置宽度
                        itemHeight:15, // 设置高度
                        itemGap: 10 ,// 设置间距
                        show : true,
                        textStyle : {
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 700
                        },
                        top: 'bottom',
                        formatter: function(name) {
                                var index = 0;
                                var clientlabels = ['总营业收入','细分领域营业收入'];
                                var clientcounts = arr;
                                clientlabels.forEach(function(value,i){
                                    if(value == name){
                                        index = i;
                                    }
                            });
                            return name + "  " + clientcounts[index] + '亿元';
                        }
                    },
                    color : [ '#6a6cff' , '#df555c', '#6a6cff', '#d88f40', '#df555c'],
                    grid: {
                        left: 'bottom',
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
                            center: ['50%', '40%'],
                            radius: ['10%', '70%'],

                            label: {
                                show: false
                            },
                            labelLine: {
                                show: true
                            },
                            data: [
                                {
                                    value: arr[0],
                                    name: '总营业收入'
                                },
                                {
                                    value: arr[1],
                                    name: '细分领域营业收入'
                                },
                            ]
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
