<template>
    <div class="survey-body">
        <div class="side-list">
            <div class="side-list-header">
                <h2>Create Surveys</h2>
            </div>
            <div class="side-list-body">
                <ul>
                    <li v-for="(qs,type) in template" @click="changeActiveSurvey(type)" :key="type">
                        <router-link :to="'/admin/survey/create/'+type"> 
                            {{type}} Survey
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="survey-details">
            <router-view :active_template="active_template"></router-view>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
           template:{},
           active_template:{
               type:"faculty",
               questions:[],
            },
        }
    },
    beforeMount() {
        axios.get('http://www.localhost/surveyBackend/templates').then(res=>{
            console.log("rres aaya ",res);
            this.template = res.data;
            this.active_template.questions = res.data["faculty"]   //Faculty is selected by default in routes also
        })
    },
    methods: {
        changeActiveSurvey(type){
            this.active_template.type = type;
            this.active_template.questions = this.template[type];

        }
    },
    
}
</script>
<style scoped>
@import '../assets/css/survey.css';
</style>