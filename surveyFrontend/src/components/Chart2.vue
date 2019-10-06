<template>
    <div class="chart2">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
export default {
    props:['data'],
    data() {
        return {
            
            chartOptions: {
                chart:{
                    type:"column",
                    height:350
                },

                title:{
                    text:"",
                },
                credits: {
                  enabled: false
                },
                xAxis:{
                    categories:["😖", "😣", "😐", "😊", "😁"],    
                    labels: {
                      useHTML: true,
                      tickPixelInterval:0,
                      x:0,
                      y:40,
                      style: {
                        "font-size": "48px"
                      },
                    }
                },
                yAxis: {
                    min:0,
                    max:100,
                    gridLineWidth: 1,
                    lineWidth: 1,
                    title:{
                        text:"Percentage Responses",
                        style:{
                            "font-size":"18px"
                        }
                    },
                    labels:{
                        formatter:function(){
                            return this.value+"%";
                        },
                        style: {
                          "font-size": "17px"
                        }

                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.3,
                    },
                     series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%',
                            style:{
                                "color":"#4d4d4d"
                            }
                        }
                    }
                },
                series: [
                    {
                      name: "",
                      data: this.data,
                      color: "#5c81e7"
                    }
                ],
                legend:{
                    enabled:false
                }
            }
        }
    },
}
</script>

<style scoped>
</style>