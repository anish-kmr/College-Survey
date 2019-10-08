<template>
<div class="details">
    <div class="info">
        <div class="total">
            <h2>Total Students : </h2>
            <h4> {{total}} </h4>
        </div>
        <div class="given">
            <h2>Total Students who gave feedback : </h2>
            <h4> {{participated}} </h4>
        </div>
        
    </div>
    <div class="chart">
        <highcharts :options="chartOptions()"></highcharts>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
export default {
   created() {
        this.role = localStorage.getItem("role");
        this.user=JSON.parse(localStorage.getItem("user"));
        axios.get(`http://www.localhost/surveyBackend/survey/analysis?facultyID=${this.user.facultyID}&surveyID=${5000}`).then(res=>{
                console.log("analusos",res);
                this.participated=parseInt(res.data.total_feedbacks_given);
                this.total=parseInt(res.data.total_students);
                this.filled=(this.participated/this.total)*100;
            })

    },
    data() {
        return {
            participated: 0,
            total: 0,
            filled:0,
        }  

    },
    methods: {
        chartOptions(){
            return{
              chart: {
                height:300,
                width:300,
                type: "pie",
                align: "center",
                verticalAlign: "middle",
              },
              title: {
                useHTML: true,
                text: this.filled + "%",
                verticalAlign: "middle",
                style: {
                  "font-size": "60px",
                  "font-weight": "300",
                  "line-height": "1.18",
                  "transform":"translateY(40px)",
                  color: "#707070",
                }
              },
              credits: {
                enabled: false
              },
              plotOptions: {
                pie: {
                  shadow: false
                }
              },
              tooltip: {
                enabled: false
              },
              series: [
                {
                  data: [
                    { name: "Participated", y: parseInt(this.filled), color: "#5c81e7" },
                    {
                      name: "Didn't feedback",
                      y: 100 - parseInt(this.filled),
                      color: "#c2c1c1"
                    }
                  ],
                  size: "100%",
                  innerSize: "90%",
                  showInLegend: false,
                  dataLabels: {
                    enabled: false
                  }
                }
              ]
            }
        }
           
    },
}
</script>

<style scoped>
.details{
    display: grid;
    grid-template-columns: 60% auto;
    align-items: center
}
.info{
    padding: 2rem;
}
.total,.given{
    display: grid;
    grid-template-columns: 85% auto;
    margin-bottom: 2rem;
    text-align: right;
    color:#222222  ;
    font-size: 1.2rem  ;
}
.info h4{font-size: 2rem;}

</style>