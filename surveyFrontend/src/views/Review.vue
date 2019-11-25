<template>
    <div class="container">
        <div class="side-list">
            <div class="side-list-header">
                <h2> Review </h2>
            </div>
            <div class="side-list-body">
                <div class="student" v-if="role=='student'">
                    <ul>
                        <li v-for="faculty in faculties" :key="faculty.facultyID" @click="changeSelected(faculty)">
                            <router-link :to="'/student/review/'+type+'/'+faculty.facultyID"> 
                                <div class="list-item">
                                    <h2>{{faculty.facultyName}}</h2>
                                    <p >{{faculty.subjectName}}</p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="faculty" v-if="role=='faculty'">
                    <ul>
                        <li v-for="subject in subjects" :key="subject.subjectID" @click="changeSelected(subject)">
                            <router-link :to="'/faculty/reviews/'+subject.subjectID"> 
                                <div class="list-item">
                                    <h2>{{subject.subjectName}}</h2>
                                    <!-- <p >{{subject.subjectName}}</p> -->
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>

        <div class="details-area">
            <router-view :selected="this.selected" :type="this.type"></router-view>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:["type","id"],
    data(){
        return{
            role:"",
            user:"",
            faculties:[],
            subjects:[],
            reviews:[],
            selected:{},
        }
    },
    beforeMount() {
        this.role = localStorage.getItem("role");
        this.user=JSON.parse(localStorage.getItem("user"));

        console.log("typep",this.type)
        if(this.role=="student"){
            if(this.type=="new") this.getFaculties();
            else this.getPastReviews();
        }
        else if(this.role=="faculty"){
            this.getSubjects()
        }
        
    },
    methods: {
        changeSelected(selected){
            this.selected=selected;
        },
        getFaculties(){
            axios.get(`http://www.localhost/surveyBackend/student/faculties?studentID=${this.user.studentID}`).then(res=>{
                console.log("faculties recieved", res.data)
                this.faculties=res.data.faculties;
                this.selected=this.faculties[0];
                if(!this.id) this.$router.push(`/student/review/${this.type}/${this.faculties[0].facultyID}`);
                
            })
        },
        getPastReviews(){
            axios.get(`http://www.localhost/surveyBackend/student/pastreviews?studentID=${this.user.studentID}`).then(res=>{
                console.log("faculties recieved", res.data)
                this.faculties=res.data.faculties;
                this.selected=this.faculties[0];
                if(!this.id) this.$router.push(`/student/review/${this.type}/${this.faculties[0].facultyID}`);
                
            })
        },
        getSubjects(){
            axios.get(`http://www.localhost/surveyBackend/faculty/subjects?facultyID=${this.user.facultyID}`).then(res=>{
                console.log("subjects recieved", res.data)
                this.subjects=res.data.subjects;
                this.selected=this.subjects[0];
                if(!this.id) this.$router.push(`/faculty/reviews/${this.subjects[0].subjectID}`);
                
            })
        }
    },
}
</script>
<style scoped>
@import '../assets/css/layout.css';
</style>
