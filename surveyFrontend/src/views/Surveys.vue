<template>
    <div class="survey-body">
        <div class="side-list">
            <div class="side-list-header">
                <h2>{{status}} Surveys</h2>
            </div>
            <div class="side-list-body">
                <!-- <ul v-if="role=='student'">
                    <li v-for="survey in surveys" :key="survey.surveyID">
                      <router-link :to="'/'+role+'/survey/'+status+'/'+survey.surveyID"> 
                            {{survey.name}}
                        </router-link>
                    </li>
                </ul> -->
                <ul >
                    <li v-for="survey in surveys" @click="changeSelectedSurvey(survey)" :key="survey.surveyID">
                        <router-link :to="'/'+role+'/survey/'+status+'/'+survey.surveyID"> 
                            <div class="survey-name">
                                <h2>{{survey.name}}</h2>
                                <p >{{survey.subjectName}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="survey-details">
            <router-view :selected_survey="selected_survey" :compKey="compKey"></router-view>
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
            compKey:1,
            selected_survey:{},
            faculties_included:[],
            student_surveys:[],
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
            console.log("sssss",survey)
            if (this.role != "student" && this.selected_survey.type == "faculty") this.getIncludedFaculties();
            console.log(this.selected_survey);
            this.compKey=-this.compKey;

        },
        getSurveys(){
            if(this.role == "student"){
                axios.get(`http://www.localhost/surveyBackend/student/surveys?sid=${this.user.studentID}`).then(res=>{
                    console.log("aa ya ",res);
                    this.student_surveys = res.data;

                    this.surveys=this.surveys.concat(res.data['faculty']);
                    this.surveys=this.surveys.concat(res.data['mess']);
                    this.surveys=this.surveys.concat(res.data['hostel']);
                    

                    this.selected_survey=this.surveys[0];
                    console.log("selectd",this.selected_survey)
                    // this.selected_survey.feedback = Array(this.selected_survey.questions.length).fill(0);
                    console.log("ss on parrrenttt",this.selected_survey)

                     console.log("selectted suvvey",this.selected_survey)
                    if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                })
            }
            else{
                axios.get('http://www.localhost/surveyBackend/surveys?status=active').then(res=>{
                    if(this.role == "admin"){
                        res.data.forEach(s => {
                            if(s.type == "faculty"){
                                axios.get(`http://www.localhost/surveyBackend/survey/faculties?surveyID=${s.surveyID}`).then(res=>{
                                    s.faculties_included = res.data; 
                                });
                            }
                            this.surveys.push(s);
                        });
                        if(this.surveys[0]){
                            this.selected_survey=this.surveys[0];
                            if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                        }   
                    }
                    else if(this.role=="faculty"){
                        res.data.forEach(s => {
                            if (s.type=="faculty") {
                                axios.get(`http://www.localhost/surveyBackend/survey/faculties?surveyID=${s.surveyID}`).then(res=>{
                                    res.data.forEach(f=>{
                                       if(f.facultyID==this.user.facultyID){
                                           axios.get(`http://www.localhost/surveyBackend/survey/analysis?facultyID=${f.facultyID}&surveyID=${s.surveyID}`).then(res=>{
                                               console.log("analusos",res);
                                               s.analysis = res.data;
                                           })
                                           this.surveys.push(s);
                                       };
                                    });

                                    if(this.surveys[0]){
                                        this.selected_survey=this.surveys[0];
                                         if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                                    }
                                    
                                })
                            }; 
                        })
                    }
                })
                
            }
        },
        getSurveyAnalysis(){
            
        }

        
    },
}
</script>
<style scoped>
@import '../assets/css/survey.css';
</style>