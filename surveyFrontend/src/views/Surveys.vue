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
                            {{survey.name}}
                            {{survey.surveyID}}
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
                                    s.faculties_included = res.data; 
                                    s.faculties_included.forEach(f=>{
                                       if(f.facultyID==this.user.facultyID){
                                           this.surveys.push(s);
                                       };
                                    });

                                    if(this.surveys[0]){
                                        this.selected_survey=this.surveys[0];
                                         if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                                    }
                                    
                                });
                            }; 
                        })
                    }
                    // console.log("sueu",this.surveys[0])
                    // this.selected_survey=this.surveys[0];
                    // console.log("selected",this.selected_survey)
                    //  if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                   

                })
                
            }
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