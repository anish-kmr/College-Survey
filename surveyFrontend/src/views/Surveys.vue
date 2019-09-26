<template>
    <div class="survey-body">
        <div class="side-list">
            <div class="side-list-header">
                <h2>{{status}} Surveys</h2>
            </div>
            <div class="side-list-body">
                <ul>
                    <li v-for="survey in surveys" @click="changeSelectedSurvey(survey)" :key="survey.surveyID">
                        <router-link :to="'/admin/survey/'+status+'/'+survey.surveyID"> 
                            {{survey.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="survey-details">
            <router-view :selected_survey="selected_survey"></router-view>
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
        }
    },
    beforeMount() {
        this.getSurveys();
    },
    methods: {
        changeSelectedSurvey(survey){
            this.selected_survey = survey;
            console.log(this.selected_survey)

        },
        getSurveys(){
           axios.get('http://www.localhost/surveyBackend/surveys?status=active').then(res=>{
                this.surveys = res.data;
                this.selected_survey = this.surveys[0]
                if(!this.id) this.$router.push(`/admin/survey/${this.status}/${this.surveys[0].surveyID}`);
            })
        }
    },
}
</script>
<style scoped>
@import '../assets/css/survey.css';
</style>