<template>
    <div class="survey-body">
        <div class="side-list">
            <div class="side-list-header">
                <h2>{{status}} Surveys</h2>
            </div>
            <div class="side-list-body">
                <ul>
                    <li v-for="survey in surveys" @click="changeSelectedSurvey(survey)" :key="survey.surveyID">
                        <router-link :to="'/'+role+'/survey/'+status+'/'+survey.surveyID"> 
                            {{survey.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="survey-details">
            <router-view :selected_survey="selected_survey" ></router-view>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props:['status','id'],
    data(){
        return{
            surveys:[],
            selected_survey:{},
            faculties_included:[],
            role:"",
            user:"",
        }
    },
    beforeMount() {
        this.role=localStorage.getItem("role");
        this.user=JSON.parse(localStorage.getItem("user"));

        this.getSurveys();
    },
    methods: {
        changeSelectedSurvey(survey){
            this.selected_survey = survey;
            if (this.selected_survey.type == "faculty") this.getIncludedFaculties();
            console.log(this.selected_survey)

        },
        getSurveys(){
           axios.get('http://www.localhost/surveyBackend/surveys?status=active').then(res=>{
            //    this.surveys = res.data;        
            //     this.selected_survey = this.surveys[0]
            //     if(this.selected_survey.type == "faculty") this.getIncludedFaculties()
            //     if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                res.data.forEach(s => {

                    if(s.type == "faculty"){
                        axios.get(`http://www.localhost/surveyBackend/survey/faculties?surveyID=${s.surveyID}`).then(res=>{
                            s.faculties_included = res.data; 
                            if(this.role == 'faculty'){
                                // alert("aaya ek")
                                s.faculties_included.forEach(f=>{
                                   if(f.facultyID==this.user.facultyID){
                                       this.surveys.push(s)
                                   }
                                })
                                
                            }
                            else if(this.role == 'student') {
                                s.feedback=[];
                                for(var i=0;i<s.questions.length;i++) s.feedback[i]=0;
                                this.surveys.push(s)
                            }
                            else this.surveys.push(s)
                            
                        });
                    }
                    else{ 
                        if(this.role !='admin') {
                            s.feedback=[];
                            for(var i=0;i<s.questions.length;i++) s.feedback[i]=0;
                        }
                        this.surveys.push(s)
                    }
                });
                // this.surveys.filter(s=>{
                //     // return s.faculties_included.indexOf(fid)
                // })
                console.log(this.surveys)
                this.selected_survey=this.surveys[0];
                if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                
            })

        },
        // getIncludedFaculties(){
        //     axios.get(`http://www.localhost/surveyBackend/survey/faculties?surveyID=${this.selected_survey.surveyID}`).then(res=>{
        //         console.log("facincluded : ",res);
        //         this.faculties_included=res.data;
        //     })
        // },
        getIncludedFaculties(sid){
            var fi = [];
            axios.get(`http://www.localhost/surveyBackend/survey/faculties?surveyID=${sid}`).then(res=>{
                console.log("facincluded : ",res);
                fi=res.data;
                
            });
        },
    },
}
</script>
<style scoped>
@import '../assets/css/survey.css';
</style>