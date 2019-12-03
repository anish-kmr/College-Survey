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
                        <template v-if="surveys.length">
                            <li v-for="survey in surveys" @click="changeSelectedSurvey(survey)" :key="survey.sid">
                                <router-link :to="'/'+role+'/survey/'+status+'/'+survey.sid"> 
                                    <div class="survey-name">
                                        <h2>{{survey.name}}</h2>
                                        <p >{{survey.subjectName}}</p>
                                    </div>
                                </router-link>
                            </li>
                        </template>
                        <template v-else>
                            <li>
                                <div class="no-survey">
                                    <h2>No Surveys Yet</h2>
                                </div>
                            </li>
                        </template>
                        
                    </ul>
                </div>
                
            </div>
        </div>
        <div v-if="selected_survey=='empty'">
            <div class="no-details">
                <h2>There are No Surveys Yet. Wait for one to be conducted</h2>
            </div>
        </div>
        <div class="survey-details" v-else>
            <router-view :selected_survey="selected_survey" :compKey="compKey" ref="child"></router-view>
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
            console.log("this.selected_survey",this.selected_survey)
            if(this.role=="student" &&  this.id && parseInt(this.id.toString()[0])==3){
                console.log("calling rate")
                this.$refs.child.rate(this.selected_survey.rating);
            }
            // if (this.role != "student" && this.selected_survey.type == "faculty") this.getIncludedFaculties();
           
            this.compKey=-this.compKey;

        },
        findSurveyFromURL(id){
            var found=false;
            var od = parseInt(id.toString()[0])
            console.log("od",od)
            if(this.role=="student"){
                console.log("arr",this.surveys['mess'])
                if(od==3){//search in faculties 
                    this.surveys['faculty'][this.selected_fac_survey].forEach(s => {
                        if(s.facultyID == id){
                            this.changeSelectedSurvey(s);
                            found=true;
                            return true;
                        }
                    });
                }
                else if(od==5){//mess or hostel surveys
                    this.surveys['mess'].forEach(s => {
                        if(s.surveyID == id){
                            this.changeSelectedSurvey(s);
                            found=true;
                            return true;
                        }
                    });
                    this.surveys['hostel'].forEach(s => {
                        if(s.surveyID == id){
                            this.changeSelectedSurvey(s);
                            found=true;
                            return true;
                        }
                    });
                }

            }
            else{
                this.surveys.forEach(s => {
                    console.log("id",s.surveyID)
                    if(s.surveyID==id){
                        console.log("found",s)
                        this.changeSelectedSurvey(s);
                        found=true;
                    }
                });
            }
            return found;
        },
        getSurveys(){
            if(this.role == "student"){
                axios.get(`http://www.localhost/surveyBackend/student/surveys?sid=${this.user.studentID}&status=${this.status}`).then(res=>{
                    console.log("aa ya ",res.data);
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
                    
                    this.changeSelectedSurvey(this.surveys['faculty'][last_survey][0],this.surveys['faculty'][last_survey][0].sid);
                   
                    
        
                    // this.selected_survey.feedback = Array(this.selected_survey.questions.length).fill(0);
                    console.log("sel sur",this.selected_survey)
                    if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys['faculty'][last_survey][0].sid}`);
                    else{
                        var found= this.findSurveyFromURL(this.id);
                        if(!found) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys['faculty'][last_survey][0].sid}`);
                    }
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
                axios.get(`http://www.localhost/surveyBackend/surveys?status=${this.status}`).then(res=>{
                   
                    
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
                            this.changeSelectedSurvey(this.surveys[0]);
                            if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                            else{
                                var found= this.findSurveyFromURL(this.id);
                                console.log("value of found var",found)
                                if(!found) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                            }
                        }   
                        console.log("surveys",this.surveys)
                        
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
                                        this.changeSelectedSurvey(this.surveys[0]);
                                        if(!this.id) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys[0].surveyID}`);
                                        else{
                                            var found= this.findSurveyFromURL(this.id);
                                            if(!found) this.$router.push(`/${this.role}/survey/${this.status}/${this.surveys['faculty'][last_survey][0].sid}`);
                                        }
                                    }
                                    
                                })
                            }; 
                        })
                        if (Object.keys(this.selected_survey).length === 0 ) {
                            console.log("asdas")
                            this.selected_survey="empty";
                        }
                        console.log("selerf",this.selected_survey)
                    }
                })
                
            }
        },

        
    },
}
</script>
<style scoped>
@import '../assets/css/survey.css';
.no-survey{
    color:rgb(73, 73, 73);
    text-align: center;
    font-size: 1.4rem;
    padding-top: 2rem;
}
.no-details{
    margin:2rem 5rem;
}
.no-details h2{
    background: white;
    padding:3rem 6rem;
    color: #5c5c5c
}
</style>