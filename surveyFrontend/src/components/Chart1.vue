<template>
    <div class="chart1">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
export default {
    props:['statements','data'],
    data() {
        return {
            
            chartOptions: {
                chart:{
                    type:"bar",
                },

                title:{
                    text:"",
                },
                credits: {
                  enabled: false
                },
                xAxis:{
                    categories:this.statements,
                    labels: {
                        useHTML:true,//Set to true
                        style: {
                            color: "#2e2e2e",
                            fontSize: "18px",  
                            width:"450px"                    
                        }
                    },
                    gridLineWidth: 0,
                    offset:0,
                    
                },
                yAxis: {
                    tickPixelInterval:200,
                    gridLineWidth: 1,
                    lineWidth: 1,
                    min:0,
                    max:4,
                    labels: {
                        allowDecimals:true,
                      useHTML: true,
                      formatter:function(){
                          var emoji=["😖", "😣", "😐", "😊", "😁"];
                          return emoji[this.value];
                      },
                      tickPixelInterval:0,
                      x:0,
                      y:40,
                      style: {
                          
                        "font-size": "48px"
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