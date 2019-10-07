<template>
    <div>
        <div class="details-header"> 
           <h2>{{selected_survey.name}}</h2>
           <div class="controls">
               <div class="settings-icon" @click="toggleSettings">
                   <i class="fas fa-info-circle"></i>
               </div>  
           </div>
        </div>

        <div class="details-body">
            <div class="qs-container">
                <div class="question" v-for="(qs,i) in selected_survey.questions" :key="i" :class="'qs-'+i">
                    <div class="qs-statement">
                        <div :id="'qsst-'+i">
                             <span class="qno">{{i+1}}. </span> <h2> {{qs.statement}} </h2>
                        </div>
                    </div>
                    <div class="qs-options" v-if="role!='student'">
                        <span class="option"><img src="../assets/emoticons/1.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/2.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/3.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/4.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/5.png" alt=""></span>
                    </div>


                    <div class="qs-options answerable" v-else-if="role=='student'">
                        <label v-for="j in 5" class="option" @click="answer(i,j)" :key="j">
                            <input type="radio" v-model="selected_survey.feedback[i].response" :value="j" id="">
                            <img :src="'/src/assets/emoticons/'+j+'.png'" alt="">
                        </label>
                        <span class="response" v-if="selected_survey.feedback[i].response" >
                            <label class="option"><img :src="'/src/assets/emoticons/'+selected_survey.feedback[i].response+'.png'" alt=""></label>
                        </span>
                        
                        
                    </div>
                </div>
                <div class="question">
                    <div class="qs-rating qs-statement">
                        <div id="qs-r">
                            <h2> How will you rate the Faculty?</h2>
                        </div>
                    </div>
                     <div class="qs-options rate-stars" v-if="role=='student'">
                        <span class="option star-option" v-for="s in stars" :key="s.rating" @click="rate(s.rating)" @mouseenter="hoveron" @mouseleave="hoveroff" :class="s.color">
                            <i class="fas fa-star"></i>
                        </span>
                        
                    </div>
                </div>
            </div>

            <div class="give-feedback" v-if="role=='student'">
                <button @click="giveFeedback">Give Feedack </button>
            </div>
        </div>


        <div class="survey-settings" :class="{'open-settings':settings_open}">
            <div class="settings-header">
                <h2>Survey Info</h2>
                <div class="close" @click="toggleSettings">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="settings-body">
                <div class="setting">
                    <h2>Faculties included in this survey:</h2>
                    <div class="faculty-list">
                        <ul>
                            <li></li>
                            <template v-if="selected_survey.faculties_included">
                                <li v-for="(faculty,i) in selected_survey.faculties_included" :key="i">
                                    <div class="faculty-included">
                                        <div class="sno">{{i+1}}.</div>
                                        <div class="faculty-name">
                                            <h2>{{faculty.name}}</h2>
                                        </div>
                                        <div class="faculty-dept">
                                            <h4>{{faculty.department}}</h4>
                                        </div>


                                    </div>
                                </li> 
                            </template>
                            <template v-if="analysis">
                                <li >
                                    <div class="analysis">
                                        <h2>
                                            {{analysis.total_feedbacks_given}} out of {{analysis.total_students}} Students
                                            have Submitted their feedbacks.
                                        </h2>
                                    </div>
                                </li> 
                            </template>
                            <template  v-else>
                                <li>
                                   <h2> No more Detils for this survey.</h2>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                <!-- <div class="done-btn" @click="toggleSettings">
                    <button> DONE</button>
                </div> -->
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    props:['selected_survey'],
    data(){
        return{
            role:"",
            user:"",
            analysis:{},
            settings_open:false,
            rated:0,
            stars:[
                {
                    rating:5,
                    color:"",
                    
                },
                {
                    rating:4,
                    color:"",
                },
                {
                    rating:3,
                    color:"",
                },
                {
                    rating:2,
                    color:"",
                },
                {
                    rating:1,
                    color:"",
                },
            ],

        }
    },
    
    
    beforeMount() {
        this.role = localStorage.getItem("role");
        this.user=JSON.parse(localStorage.getItem("user"));

        console.log("seleced sue",this.selected_survey)
    },
    
    methods: {
        giveFeedback(){
            console.log("ggoing to ffeedback",this.selected_survey)
            var payload = {
                adminID:this.selected_survey.adminID,
                facultyID:this.selected_survey.facultyID,
                surveyID:this.selected_survey.surveyID,
                studentID:this.user.studentID,
                feedback:this.selected_survey.feedback,
                rating:this.rated,
            }
            console.log("ss",payload)
            axios.put("http://www.localhost/surveyBackend/feedback/create",payload).then(res=>{
                console.log("rrres ",res.data);
                if (res.data.success) {
                    alert("successfully Subbmitted FFeedback")
                }
                else if(res.data.updated) alert("Changed Responses");
            })
        },
        answer(i,response){
            this.selected_survey.feedback[i].response = response;
            console.log(this.selected_survey.feedback)
        },        
        toggleSettings(){
            if(this.role == "faculty" && !this.settings_open){
                axios.get(`http://www.localhost/surveyBackend/survey/analysis?facultyID=${this.user.facultyID}&surveyID=${this.selected_survey.surveyID}`).then(res=>{
                    console.log("analusos",res);
                    this.analysis = res.data;
                    console.log(this.analysis);
                })
            };
            this.settings_open = !this.settings_open;
        },
        hoveron(){
            this.stars.forEach(s => {
                s.color="nostar"
            });
        },
        hoveroff(){
            this.rate(this.rated)
        },
        rate(rating){
            this.rated = rating;
            var color = ["very-bad","bad","average","good","very-good"]
            this.stars.forEach(s => {
                if(s.rating <= rating) s.color = color[rating-1];
                else s.color="nostar"
            });
        }

    },
   
}
</script>


<style scoped>  
    @import '../assets/css/surveyQuestion.css';
    
    .faculty-included{
        display: grid;
        grid-template-columns: 50px 70% auto;
        align-items: center;
    }
    .sno{
        font-size: 1.2rem;
    }
    .faculty-included h2{color: #555555;}
    .faculty-included h4{
        color: #8a8a8a;
        font-size: 1.8rem;
        text-transform: capitalize;
    }
</style>