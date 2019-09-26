<template>
    <div>
        <div class="details-header">
           <h2>{{selected_survey.name}}</h2>
           <div class="controls">
               <div class="settings-icon">
                   <i class="fas fa-cog"></i>
               </div>  
           </div>
        </div>

        <div class="details-body">
            <div class="qs-container">
                <div class="question" v-for="(qs,i) in selected_survey.questions" :key="i" :class="'qs-'+i">
                    <div class="qs-statement">
                        <div :id="'qsst-'+i">
                             <span class="qno">{{i+1}}. </span> <h2> {{qs}} </h2>
                        </div>
                    </div>
                    <div class="qs-options">
                        <span class="option"><img src="../assets/emoticons/angry.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/sad.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/neutral.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/slight_smile.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/smile.png" alt=""></span>

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
        }
    },
   
}
</script>

