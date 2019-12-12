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
                let num = 0;
                this.data.forEach(value => {
                    // console.log(value)
                    num += value.sum;
                })
                // console.log(this.data)
                // var m2R2Data= [
                //     {value:289, legendname:'服务企业',name:"种类01  335",
                //         itemStyle:{color:"#8d7fec", fontSize: '26'}},
                //     {value:310, legendname:'工业企业',name:"种类02  310",
                //         itemStyle:{color:"#5085f2"}},
                //     {value:234, legendname:'其他类型企业',name:"种类03  234",
                //         itemStyle:{color:"#e75fc3"}},
                // ];
               const  option = {
                    title: [
                        {
                            show:false,
                            text: `共有企业${num}家`,
                            textStyle: {
                                fontSize: 26,
                                color: "#ffffff"
                            },
                            left: "center"
                        },
                        {
                            text: '总计',
                            subtext: num+'家',
                            textStyle:{
                                fontSize:20,
                                color:"#5085f2"
                            },
                            subtextStyle: {
                                fontSize: 30,
                                color: '#5085f2'
                            },
                            textAlign:"center",
                            x: '50%',
                            y: '40%',
                        }],

                    series: [
                        {
                            name:'标题',
                            type:'pie',
                            center: ['50%', '50%'],
                            radius: ['40%', '65%'],
                            clockwise: false, //饼图的扇区是否是顺时针排布
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    formatter: '{a|{b}}\n{a|{c}家}',
                                    borderWidth: 20,
                                    borderRadius: 4,
                                    // padding: [0, -70],
                                    rich: {
                                        a: {
                                            fontSize: 16,
                                        },
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    length:20,
                                    length2:5,
                                    smooth:true,
                                }
                            },
                            data: [{
                                  value: this.data[0].sum,
                                  name: '龙头企业',
                                  itemStyle:{color:"#8d7fec"}
                              }, {
                                value: this.data[1].sum,
                                name: '人工智能',
                                itemStyle: {color :'#91a9c0'}
                            },{
                                  value: this.data[2].sum,
                                  name: '互联网+',
                                itemStyle : {color:'#0855a3'}
                              },{
                                value: this.data[3].sum,
                                name: '北斗应用',
                                itemStyle:{color:"#7dafe1"}
                            }, {
                                value: this.data[4].sum,
                                name: '5G+',
                                itemStyle: {color :'#677fd7'}
                            },{
                                value: this.data[5].sum,
                                name: '虚拟现实',
                                itemStyle : {color:'#2d8ae8'}
                            }]
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

        beforeDestroy() {
            off(window, "resize", this.resize);
        }
    };
</script>
