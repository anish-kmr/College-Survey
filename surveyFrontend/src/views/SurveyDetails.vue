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
                <div class="question" v-if="role=='student' && selected_survey.type=='faculty'">
                    <div class="qs-rating qs-statement">
                        <div id="qs-r">
                            <h2> How will you rate the Faculty?</h2>
                        </div>
                    </div>
                     <div class="qs-options rate-stars" >
                        <span class="option star-option" v-for="s in stars" :key="s.rating" @click="rate(s.rating)" @mouseenter="hoveron" @mouseleave="hoveroff" :class="s.color">
                            <i class="fas fa-star"></i>
                        </span>
                        
                    </div>
                </div>
            </div>

            <div class="give-feedback" v-if="role=='student' && selected_survey.status=='active'">
                <button @click="giveFeedback">Give Feedack </button>
            </div>
            <div class="close-survey" v-if="role=='admin' && selected_survey.status=='active'">
                <button @click="closeSurvey">Close Survey </button>
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
                    <h2  v-if="selected_survey.faculties_included">Faculties included in this survey:</h2>
                    <div class="faculty-list">
                        <ul>
                            <li></li>
                            <template v-if="analysis && role=='faculty'">
                                <li>
                                    <div class="analysis">
                                        <h2>
                                            {{analysis.total_feedbacks_given}} out of {{analysis.total_students}} Students
                                            have Submitted their feedbacks.
                                        </h2>
                                    </div>
                                </li> 
                            </template>
                            <template v-else-if="analysis && role=='admin'"> 
                                <ul class="admin-analysis">
                                    <li v-for="(faculty,name,i) in analysis" :key="faculty.facultyID">
                                        <label class="check-label" :for="'id-'+faculty.facultyID">
                                            <div class="sno">{{i+1}}.</div>
                                            <div class="faculty-name">
                                                <h2>{{name}}</h2>
                                                <h4>{{faculty.department}}</h4>
                                            </div>
                                            <div class="checkbox-container" >
                                               <h2 class=""> {{faculty.total_feedbacks_given}}/{{faculty.total_students}} </h2>
                                            </div>
                                        </label>
                                    <li >
                                        <label class="check-label">
                                            <div class="sno"></div>
                                            <div class="faculty-name total-feedbacks">
                                                <h2>Total </h2>
                                                <h4></h4>
                                            </div>
                                            <div class="checkbox-container total-feedbacks" >
                                               <h2 class=""> {{total_feedbacks_given}}/{{total_feedbacks_required}} </h2>
                                            </div>
                                        </label>
                                    </li>
                                </ul>
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



        <div class="dialog-container hidden">
            <div class="dialog-box">
                <div class="dialog-header">
                    <h2>{{message.title}}</h2>
                    <div class="close" @click="closeDialog">
                         <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="dialog-content">
                        <div class="dialog-image">
                            <img src="../assets/coins.png" alt="">
                        </div>
                        <div class="dialog-msg">
                            <p>{{message.body}}</p>
                        </div>
                    </div>
                    
                    
                    <div class="buttons" @click="closeDialog">
                        <button> OK </button>
                    </div>
                </div>
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
            total_feedbacks_given:0,
            total_feedbacks_required:0,
            message:{
                title:"sample",
                body:"sample text",
            },
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
        this.rate(this.selected_survey.rating);

    },
    
    methods: {
        closeSurvey(){
            console.log("close ",this.selected_survey);
            var payload = {
                surveyID:this.selected_survey.surveyID
            }
            axios.post("http://www.localhost/surveyBackend/survey/close",payload).then(res=>{
                console.log(res);
                this.$parent.surveys=[];
                this.$parent.getSurveys();
            })

        },
        giveFeedback(){
            console.log("ggoing to ffeedback",this.selected_survey)
            if(this.selected_survey.type=="faculty"){
                var payload = {
                    adminID:this.selected_survey.adminID,
                    facultyID:this.selected_survey.facultyID,
                    surveyID:this.selected_survey.surveyID,
                    studentID:this.user.studentID,
                    feedback:this.selected_survey.feedback,
                    rating:this.rated,
                }
            }
            else{
                console.log("elsed")
                var payload = {
                    adminID:this.selected_survey.adminID,
                    facultyID:0,
                    surveyID:this.selected_survey.surveyID,
                    studentID:this.user.studentID,
                    feedback:this.selected_survey.feedback,
                    rating:-1,
                }
            }
            console.log("ss",payload)
            axios.put("http://www.localhost/surveyBackend/feedback/create",payload).then(res=>{
                console.log("rrres ",res);
                if (res.data.success) {
                    this.message.title="Coins Earned"
                    this.message.body="Congratulations! You have earned 5 coins for answering the survey.Collect more for exciting gifts."
                    this.openDialog();
                    var data = {
                        studentID:this.user.studentID,
                        coins:5,
                    }
                    axios.put(`http://www.localhost/surveyBackend/student/updatecoins`,data).then(response=>{
                        console.log("added coins",response)     
                    });
                }
                else if(res.data.updated) {
                    this.message.title="Feedback Changed"
                    this.message.body="Your earlier response for this feedback has been changed. Complete other surveys to earn more coins.\nIf already done, wait for next survey."
                    this.openDialog();
                    // alert("Changed Responses");
                }
            })
        },
        answer(i,response){
            this.selected_survey.feedback[i].response = response;
            console.log(this.selected_survey)
            
            
        },        
        toggleSettings(){
            console.log("sel sur",this.selected_survey)
            console.log("open",this.role)
            if( this.role == "faculty" && !this.settings_open){
                console.log("aaya");
                
                axios.get(`http://www.localhost/surveyBackend/survey/analysis?facultyID=${this.user.facultyID}&surveyID=${this.selected_survey.surveyID}`).then(res=>{
                    console.log("analusos",res);
                    this.analysis = res.data;
                    console.log(this.analysis);
                })
            }
            else if(this.role=="admin" && !this.settings_open ){
                console.log("aaya");
                
                axios.get(`http://www.localhost/surveyBackend/survey/admin/analysis?surveyID=${this.selected_survey.surveyID}`).then(res=>{
                    console.log("analusos",res);
                    this.analysis = res.data;
                    console.log(this.analysis);
                    
                    var totalfeeds = 0;
                    var totalreq = 0;
                    for (const key in res.data) {
                        console.log("loop",res.data[key])
                        totalfeeds+=parseInt(res.data[key].total_feedbacks_given);
                        totalreq+=parseInt(res.data[key].total_students);
                        
                    }
                    this.total_feedbacks_given=totalfeeds;
                    this.total_feedbacks_required=totalreq;

                    if(res.data.total_feedbacks_given && res.data.total_feedbacks_required){
                        console.log("sdjfbnasdk")
                        this.total_feedbacks_given=res.data.total_feedbacks_given;
                        this.total_feedbacks_required=res.data.total_feedbacks_required;
                        this.analysis={};
                    }

                })
            }
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
            console.log("rated ",rating)
            this.rated = rating;
            var color = ["very-bad","bad","average","good","very-good"]
            this.stars.forEach(s => {
                if(s.rating <= rating) s.color = color[rating-1];
                else s.color="nostar"
            });
        },
        closeDialog(){
            document.getElementsByClassName("dialog-container")[0].classList.add("hidden");
        },
        openDialog(){
            document.getElementsByClassName("dialog-container")[0].classList.remove("hidden");
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
    /* .dialog-body{
        background-image: url('../assets/coinfall.png');
        background-size: cover;
        background-position-y: 50%;
    } */
    .dialog-content{
        display:grid;
        grid-template-columns: 30% auto;
    }
    .ratio{
        outline: 2px solid red;
    }
    .total-feedbacks h2{
        font-weight: 900;
        font-size: 2.3rem;
        margin-left: -1rem;
        color:black;
    }
</style>