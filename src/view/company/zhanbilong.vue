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
                    title: {
                        text:'30%',
                        left:'center',
                        top:'40%',
                        textStyle:{
                            color:'#ffc799',
                            fontSize : 32,
                        },
                        subtext : '千万产值企业占比',
                        subtextStyle : {
                            color: '#81d7f5',
                            fontWeight : 700,
                            fontSize:14
                        },
                    },
                    series: [
                        {
                            animationDuration: 3000,
                            name: "",
                            type: "pie",
                            radius: ["50%", "75%"],
                            center: ["50%", "50%"], // 移动圆位置
                            label: {
                                formatter: "{b}\n\n{c}",
                                fontSize: 15,
                                color: "#fff"
                            },
                            labelLine: {
                                show: true,
                                length: 0.0001,
                                position: 'center',
                                show : false
                            },
                            data: [
                                {
                                    value: 323,
                                    name: "龙头企业数量",
                                    itemStyle: {color :'#7dafe1'}
                                },
                                {
                                    value: 132,
                                    name: "千万以上产值\n企业占比(家)",
                                    itemStyle: {color :'#2d8ae8'}
                                }
                            ],
                            color: ["#0a60b7", "#7dafe1"]
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
