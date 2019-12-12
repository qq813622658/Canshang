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

            };
        },
        props : {
            data : {
                type: Object,
                default: () => {}
            }
        },

        // watch: {
        //     barData(val) {}
        // },
        created() {},
        methods: {
            bar() {
                const option = {
                    color:['#6a6cff','#56e0ff'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                        hoverAnimation:false,  // 鼠标悬停不放大
                        show: false //显示提示框
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        itemWidth : 14, // 图列图标长度
                        itemGap: 90, // 图列间距
                        itemHeight: 14, // 图列图标高度
                        data: ['核心园区用地面积', '规划区用地面积'],
                        textStyle : {
                            color: '#fff',
                            fontSize: 16
                        },
                        show:true
                    },
                    series: [
                        {
                            name: '人员类型',
                            type: 'pie',
                                radius: [0, 100],
                                center: ['50%', '50%'],
                            label: {
                                normal: {
                                    formatter: '{c|{c}平方公里}',
                                    rich: {
                                        b: {
                                            fontSize: 10,
                                            color: '#12EABE',
                                            align: 'left',

                                        },
                                        hr: {
                                            borderColor: '#12EABE',
                                            width: '100%',
                                            borderWidth: 2,
                                            height: 0
                                        },
                                        d: {
                                            fontSize: 20,
                                            color: '#fff',
                                            align: 'left',
                                            padding: 4
                                        },
                                        c: {
                                            fontSize: 20,
                                            color: '#fff',
                                            align: 'left',
                                            padding: 4
                                        }
                                    }
                                }
                            },
                            data: [{
                                value:  this.data.kilometer,
                                name: '核心园区用地面积'
                            },
                                {
                                    value: this.data.planning,
                                    name: '规划区用地面积'
                                },

                            ]
                        },
                        {
                            type: 'pie',
                            radius: [110, 100],
                            center: ['50%', '50%'],
                            animation: false,
                            hoverAnimation:false,
                            data: [
                                {
                                    value: 1,
                                    itemStyle: {
                                        color: '#00A0E9FF'
                                    },
                                    label: {
                                        position: 'inside',
                                    }
                                }
                            ]
                        },
                        {
                            type: 'pie',
                            radius: [120, 110],
                            animation: false,
                            hoverAnimation:false,
                            center: ['50%', '50%'],
                            data: [
                                {
                                    value: 1,
                                    itemStyle: {
                                        color: 'rgba(255,255,255,0.2)'
                                    },
                                    label: {
                                        position: 'inside',
                                    }
                                }
                            ]
                        },
                        {
                            type: 'pie',
                            radius: [130, 120],
                            center: ['50%', '50%'],
                            hoverAnimation:false,
                            animation: false,
                            data: [
                                {
                                    value: 1,
                                    itemStyle: {
                                        color: 'rgba(255,255,255,0.1)'
                                    },
                                    label: {
                                        position: 'inside',
                                    }
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
