<template>
    <div class="survey-body">
        <div class="side-list">
            <div class="side-list-header">
                <h2>{{status}} Surveys</h2>
            </div>
            <div class="side-list-body">
                <div class="student-surveys" v-if="role=='student'">
                    <div class="select_fac_survey" v-if="isSelect>1">
                        <select v-model="selected_fac_survey" @change="facSurvey">
                            <option :value="surveyName" v-for="(facs,surveyName) in surveys.faculty" :key="surveyName">
                                {{surveyName}}
                            </option>
                        </select>
                    </div>
                    <ul>
                        <li  class="list-section-name">
                            {{selected_fac_survey}}
                        </li>
                        <template v-if="selected_fac_survey">
                            <li  v-for="survey in surveys.faculty[selected_fac_survey]" @click="changeSelectedSurvey(survey)" :key="survey.sid">
                                <router-link :to="'/'+role+'/survey/'+status+'/'+survey.sid"> 
                                    <div class="survey-name">
                                        <h2>{{survey.name}}</h2>
                                        <p >{{survey.subjectName}}</p>
                                    </div>
                                </router-link>
                            </li>
                        </template>


                       <li class="list-section-name">
                            Mess Survey
                        </li>
                        <li v-for="survey in surveys.mess" @click="changeSelectedSurvey(survey)" :key="survey.sid">
                            <router-link :to="'/'+role+'/survey/'+status+'/'+survey.surveyID"> 
                                <div class="survey-name">
                                    <h2>{{survey.name}}</h2>
                                </div>
                            </router-link>
                        </li>
                        <!-- <li v-if="!surveys.mess.length">No Mess Surveys Yet</li> -->



                        <li  class="list-section-name">
                            Hostel Survey
                        </li>
                        <li v-for="survey in surveys.hostel" @click="changeSelectedSurvey(survey)" :key="survey.sid">
                            <router-link :to="'/'+role+'/survey/'+status+'/'+survey.surveyID"> 
                                <div class="survey-name">
                                    <h2>{{survey.name}}</h2>
                                </div>
                            </router-link>
                        </li>
                         <!-- <li v-if="!surveys.hostel.length">No Hostel Surveys Yet</li> -->
                    </ul>
                </div>
                <div class="surveys" v-else>
                    <ul >
                        <li v-for="survey in surveys" @click="changeSelectedSurvey(survey)" :key="survey.sid">
                            <router-link :to="'/'+role+'/survey/'+status+'/'+survey.sid"> 
                                <div class="survey-name">
                                    <h2>{{survey.name}}</h2>
                                    <p >{{survey.subjectName}}</p>
                                </div>
                            </router-link>
                        </li>
                        
                    </ul>
                </div>
                
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
            selected_fac_survey:"",
            faculties_included:[],
            student_surveys:[],
            role:"",
            user:"",
            isSelect:1
        }
    },
    
    beforeMount() {
        this.role=localStorage.getItem("role");
        this.user=JSON.parse(localStorage.getItem("user"));
 
        this.getSurveys();
    },
    methods: {
        facSurvey(){
            this.changeSelectedSurvey(this.surveys.faculty[this.selected_fac_survey][0])
            this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys['faculty'][this.selected_fac_survey][0].sid}`);
            
            
        },
        
        changeSelectedSurvey(survey){
            this.selected_survey = survey;
            console.log("sssss",survey)
            // if (this.role != "student" && this.selected_survey.type == "faculty") this.getIncludedFaculties();
            console.log(this.selected_survey);
            this.compKey=-this.compKey;

        },
        getSurveys(){
            if(this.role == "student"){
                axios.get(`http://www.localhost/surveyBackend/student/surveys?sid=${this.user.studentID}`).then(res=>{
                    console.log("aa ya ",res);
                    this.student_surveys = res.data;
                    this.isSelect=Object.keys(res.data['faculty']).length
                    this.surveys["faculty"]=res.data['faculty']
                    this.surveys["mess"]=res.data['mess']
                    this.surveys["hostel"]=res.data['hostel']
                    var last_survey=Object.keys(res.data['faculty'])[0]
                    this.selected_fac_survey=last_survey
                    // this.surveys=this.surveys.concat(res.data['faculty']);
                    // this.surveys=this.surveys.concat(res.data['mess']);
                    // this.surveys=this.surveys.concat(res.data['hostel']);
                    
                    this.selected_survey=this.surveys['faculty'][last_survey][0]
                   
                    
                    


                    console.log("sel_fac_sur",this.selected_fac_survey)
                    console.log("len",this.isSelect)
                    console.log("surveys",this.surveys)
                    // this.selected_survey.feedback = Array(this.selected_survey.questions.length).fill(0);
                    // console.log("ss on parrrenttt",this.selected_survey)

                     console.log("selectted suvvey",this.selected_survey)
                     console.log("sid",this.surveys['faculty'][last_survey][0].sid)
                    if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys['faculty'][last_survey][0].sid}`);
                    // else{
                    //     var selected=false
                    //     if(!selected){
                    //         for(var i=0;i<this.surveys.faculty[last_survey];i++){
                    //             if(this.surveys.faculty[last_survey][i].sid==this.id){
                    //                 this.selected_survey=this.surveys.faculty[last_survey][i]
                    //                 this.selected_fac_survey=last_survey
                    //                 selected=true
                    //                 break;
                    //             }
                    //         }
                    //     }
                    //     if(!selected){
                    //         for(var i=0;i<this.surveys.mess;i++){
                    //             if(this.surveys.mess[i].sid==this.id){
                    //                 this.selected_survey=this.surveys.mess[i]
                    //                 selected=true
                    //                 break;
                    //             }
                    //         }
                    //     }
                    //     if(!selected){
                    //         for(var i=0;i<this.surveys.hostel;i++){
                    //             if(this.surveys.hostel[i].sid==this.id){
                    //                 this.selected_survey=this.surveys.hostel[i]
                    //                 selected=true
                    //                 break;
                    //             }
                    //         }
                    //     }
                    //     if(!selected)  this.selected_survey=this.surveys['faculty'][last_survey][0]
                    // }
                })
            }
            else{
                axios.get('http://www.localhost/surveyBackend/surveys?status=active').then(res=>{
                    console.log("res " , res);
                    
                    if(this.role == "admin"){
                        res.data.forEach(s => {
                            if(s.type == "faculty"){
                                axios.get(`http://www.localhost/surveyBackend/survey/faculties?surveyID=${s.surveyID}`).then(res=>{
                                    s.faculties_included = res.data; 
                                });
                            }
                            s.sid=s.surveyID;
                            this.surveys.push(s);
                        });
                        if(this.surveys[0]){
                            this.selected_survey=this.surveys[0];
                            if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                        }   
                        console.log("surveys",this.surveys);
                        
                    }
                    else if(this.role=="faculty"){
                        res.data.forEach(s => {
                            if (s.type=="faculty") {
                                axios.get(`http://www.localhost/surveyBackend/survey/faculties?surveyID=${s.surveyID}`).then(res=>{
                                    res.data.forEach(f=>{
                                       if(f.facultyID==this.user.facultyID){
                                             s.sid=s.surveyID;
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

        
    },
}
</script>
<style scoped>
@import '../assets/css/survey.css';
</style>