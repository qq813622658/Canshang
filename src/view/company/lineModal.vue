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
                // console.log(this.data);
                var arr = [this.data[3].assetsLastYear,this.data[3].assetsBeforeLastYear,this.data[3].taking ]
                arr.forEach((value,index) => {
                      if (value == "/") {
                          arr[index] = 0;
                      }
                })
                var arrMax = Math.min(...arr)
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
                    title: {
                        text: '近三年收入以及增长趋势',
                        textStyle: {
                            align: 'center',
                            color: '#fff',
                            fontSize: 20,
                        },
                        top: '3%',
                        left: 'center',
                    },
                    // backgroundColor: '#0f375f',
                    grid: {
                        top: "25%",
                        bottom: "10%"
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                            label: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: ["营业额度", "增长率"],
                        top: "15%",
                        textStyle: {
                            color: "#ffffff"
                        }
                    },
                    xAxis: {
                        data: [
                            "2016",
                            "2017",
                            "2018",

                        ],
                        axisLine: {
                            show: true //隐藏X轴轴线
                        },
                        axisTick: {
                            show: true //隐藏X轴刻度
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#ebf8ac" //X轴文字颜色
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#01FCE3'
                            }
                        },
                    },
                    yAxis: [{
                        show:true,
                        type: "value",
                        name: "亿元",
                        nameTextStyle: {
                            color: "#ebf8ac"
                        },
                        splitLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#ebf8ac"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                    },
                        {
                            show: false,
                            type: "value",
                            name: "同比",
                            nameTextStyle: {
                                color: "#ebf8ac"
                            },
                            position: "right",
                            splitLine: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                formatter: "{value} %", //右侧Y轴文字显示
                                textStyle: {
                                    color: "#ebf8ac"
                                }
                            }
                        },
                        {
                            type: "value",
                            gridIndex: 0,
                            min: 10,
                            max: 100,
                            splitNumber: 8,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                                areaStyle: {
                                    color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                                }
                            }
                        }
                    ],
                    series: [{
                        name: "营业额度",
                        type: "bar",
                        barWidth: 35,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,//是否展示
                                    formatter : '{c}'+'亿元',
                                    position: 'top',
                                    textStyle: {
                                        fontWeight:'bolder',
                                        fontSize : '12',
                                        fontFamily : '微软雅黑',
                                        color: '00B7EEFF'
                                    }
                                },

                                color: function (params) {
                                    var index_num = params.value;
                                    // console.log(arrMax , index_num)
                                    if (arrMax == index_num) {
                                        return  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: "white" // 0% 处的颜色
                                        }, {
                                            offset: 0.02,
                                            color: "#fa6b72" // 0% 处的颜色
                                        },{
                                            offset: 0.975,
                                            color: "#fa6b72" // 60% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: "white" // 100% 处的颜色
                                        }], false)
                                    }else{
                                        return  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: "white" // 0% 处的颜色
                                        }, {
                                            offset: 0.02,
                                            // color: "#fa6b72" // 0% 处的颜色
                                            color: '#2b8df1'
                                        },{
                                            offset: 0.975,
                                            // color: "#fa6b72" // 60% 处的颜色
                                            color : '#277ff1'
                                        }, {
                                            offset: 1,
                                            color: "white" // 100% 处的颜色
                                        }], false)
                                    }

                                }
                                // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                //     offset: 0,
                                //     color: "white" // 0% 处的颜色
                                // }, {
                                //     offset: 0.02,
                                //     color: "#2b8df1" // 0% 处的颜色
                                // },{
                                //     offset: 0.975,
                                //     color: "#277ff1" // 60% 处的颜色
                                // }, {
                                //     offset: 1,
                                //     color: "white" // 100% 处的颜色
                                // }], false)
                            }
                        },
                        data: arr
                    },
                        {
                            name: "增长率",
                            type: "line",
                            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                            smooth: true, //平滑曲线显示
                            showAllSymbol: true, //显示所有图形。
                            symbol: "emptyCircle", //标记的图形为实心圆
                            symbolSize: 10, //标记的大小
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#df555c"
                                    },
                                        {
                                            offset: 1,
                                            color: "#df555c"
                                        }
                                    ])
                                }
                            },
                            data: arr
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
