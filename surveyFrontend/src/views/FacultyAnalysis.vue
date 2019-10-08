<template>
    <div class="analysis">

        <div class="participation section">
            <h2> Participation </h2>
            <div class="chart">
                <chart3></chart3>
            </div>
        </div>
        <div class="average section">
            <h2>Average Response </h2>
            <div class="chart">
                <chart1 :statements="avg_response.statements" :data="avg_response.data"></chart1>
            </div>
        </div>
        <div class="question-wise">
            <h2>Question Wise Analysis</h2>
            <div class="section" v-for="q in question_wise" :key="q.qsID">
                <h2 > {{q.statement}} </h2>
                <div class="chart">
                    <chart2 :data="q.percentage_response"></chart2>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import chart1 from '../components/Chart1.vue'
import chart2 from '../components/Chart2.vue'
import chart3 from '../components/Chart3.vue'

export default {
    components: {
      chart1,
      chart2,
      chart3,
    },
    data(){
        return{
            role:"",
            user:{},
            analysis:{},
            avg_response:{
                statements:[],
                data:[],
            },
            question_wise:[],

            
        }
    },
    beforeMount() {
        this.role = localStorage.getItem("role");
        this.user=JSON.parse(localStorage.getItem("user"));
        this.getAnalysis();

    },
    methods: {
        getAnalysis(){

            axios.get(`http://localhost/surveyBackend/survey/faculty/analysis?facultyID=${this.user.facultyID}&surveyID=5000`).then(res=>{
                this.analysis = res.data;
                console.log("analysis",this.analysis.questions);
                this.analysis.avg_response.forEach(a => {
                    this.avg_response.statements.push(a.statement);
                    this.avg_response.data.push(parseFloat(a.average));
                });
                for (const qsID in this.analysis.questions) {
                    // console.log("qsid",qsID)
                    // console.log("details",this.analysis.questions[qsID])
                    var q = this.analysis.questions[qsID]
                    var percentage_response = [];
                    var count = [];
                    q.analysis.forEach(e => {
                        var p = (parseInt(e.count)/parseInt(q.total_responses))*100;
                        percentage_response.push(p);
                        count.push(e.count);
                    });

                    // console.log("per",percentage_response)
                    var obj = {
                        qsID:qsID,
                        statement:q.statement,
                        percentage_response:percentage_response,
                        count:count
                    }
                    this.question_wise.push(obj)
                    
                }
                console.log("data",this.question_wise);
                
            })
        },
    },
}
</script>

<style scoped>
.analysis{
    margin: 25px ;
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
}

.section .chart{
    text-align: center;
}
.section h2{
    color: #707070;
    font-size: 2.2rem;
    margin-bottom: 2rem;;
}
.question-wise>h2{
    font-size: 2.2rem;
    color: #707070;
    margin-bottom: 2rem;
}
.question-wise .section h2{
    color: #4d4d4d;
    padding: 2rem;
}
.question-wise .chart{
    margin: 0 auto;
    width: 70%;
}
.participation,.average,.question-wise{
    margin-bottom: 2rem;
    border-bottom: 2px solid #707070;
}
</style>