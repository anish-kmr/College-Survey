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
                            <input type="radio" v-model="selected_survey.feedback[i]" :value="j" id="">
                            <img :src="'/src/assets/emoticons/'+j+'.png'" alt="">
                        </label>
                        <span class="response" v-if="selected_survey.feedback[i]" >
                            <label class="option"><img :src="'/src/assets/emoticons/'+selected_survey.feedback[i]+'.png'" alt=""></label>
                        </span>
                    </div>
                </div>
            </div>

            <div class="give-feedback" v-if="role=='student'">
                <button>Give Feedack </button>
            </div>
        </div>


        <div class="survey-settings">
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
                            <template>
                                <li>
                                   <h2> No more Details for this survey.</h2>
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
        }
    },
    
    
    beforeMount() {
        this.role = localStorage.getItem("role");
        console.log("feedbbback",this.selected_survey)
    },
    methods: {
        answer(i,response){
            this.selected_survey.feedback[i] = response;
            console.log(this.selected_survey.feedback)
        },        
        toggleSettings(){
            document.getElementsByClassName(`survey-settings`)[0].classList.toggle("open-settings")
        },

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