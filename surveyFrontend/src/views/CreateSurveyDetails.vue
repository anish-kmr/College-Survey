<template>
    <div>
        <div class="details-header">
            <h2>{{active_template.type}} Survey</h2><span>-Template</span>
            <div class="controls">
                <div class="settings-icon" @click="toggleSettings">
                    <i class="fas fa-cog"></i>
                </div>  
            </div>
        </div>

        <div class="details-body">
            <div class="qs-container">
                <div class="question" v-for="(qs,i) in active_template.questions" :key="i" :class="'qs-'+i">
                   <span class="edit-icon" @click="toggleEdit(i)"><i class="fas fa-pen"></i></span> 
                    <div class="qs-statement">
                        <div :id="'qsst-'+i">
                             <span class="qno">{{i+1}}. </span> <h2> {{qs}} </h2>
                        </div>


                        <div class="edit-qs hidden" :id="'edit-'+i" @keyup.enter="toggleEdit(i)">
                            <input type="text" v-model="active_template.questions[i]">
                        </div>

                    </div>
                    <div class="qs-options">
                        <span class="option"><img src="../assets/emoticons/1.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/2.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/3.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/4.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/5.png" alt=""></span>

                    </div>

                </div>
            </div>
            <div class="secondary-btn" @click="addQs">
                <button><span class="plus"><i class="fas fa-plus"></i> </span> Question</button>
            </div>
            <div class="primary-btn" @click="openDialog">
                <button> Next </button>
            </div>
            <div class="cancel-btn">
                <button class="cancel">Cancel</button>
            </div>
        </div>

        <div class="survey-settings">
            <div class="settings-header">
                <h2>Survey Settings</h2>
                <div class="close" @click="toggleSettings">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="settings-body">
                <div class="setting">
                    <h2>Choose Faculties to include in this survey:</h2>
                    <div class="faculty-list">
                        <ul>
                            <li>
                                <label class="check-label" for="selectall">
                                    <!-- <div class="sno"></div> -->
                                    <div class="select-all">
                                        <h2>Select/Unselect All</h2>
                                        <!-- <h4>Select/Unselect All</h4> -->
                                    </div>
                                    <div class="checkbox-container">
                                        <input type="checkbox"  id="selectall" @change="toggleSelection">
                                        <span class="custom-checkbox"></span>
                                    </div>
                                </label>
                            </li>
                            <li v-for="(faculty,i) in faculty_list" :key="i">
                                <label class="check-label" :for="'id-'+i">
                                    <div class="sno">{{i+1}}.</div>
                                    <div class="faculty-name">
                                        <h2>{{faculty.name}}</h2>
                                        <h4>{{faculty.department}}</h4>
                                    </div>
                                    <div class="checkbox-container">
                                        <input type="checkbox" name="selected_faculties" :value="faculty.facultyID" v-model="selected_faculties" :id="'id-'+i">
                                        <span class="custom-checkbox"></span>
                                    </div>
                                </label>
                            </li>
                        </ul>
                        {{selected_faculties}}
                    </div>
                </div>
                <div class="done-btn" @click="toggleSettings">
                    <button> DONE</button>
                </div>
            </div>
        </div>

        <div class="dialog-container hidden">
            <div class="dialog-box">
                <div class="dialog-header">
                    <h2>Name the Survey</h2>
                    <div class="close" @click="closeDialog">
                         <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="dialog-msg">
                        <p>You must name the Survey before it gets live.It helps to distinguish between same type of Surveys.</p>
                    </div>
                    <div class="dialog-input">
                        <input type="text" v-model="survey_name">
                    </div>
                    <div class="buttons" @click="conductSurvey">
                        <button> Conduct Survey</button>
                        <button class="cancel" @click="closeDialog"> Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props:['active_template'],
    data(){
        return{
            faculty_list:[],
            selected_faculties:[],
            survey_name:"",
            adminID:"",
        }
    },
    beforeMount() {
        var user = JSON.parse(localStorage.getItem("user"));
        this.adminID = user.adminID;
        this.getFacultyList();
    },
    methods: {
        getFacultyList(){
            axios.get('http://www.localhost/surveyBackend/faculty/all').then(res=>{
                this.faculty_list = res.data;
            })
        },
        conductSurvey(){
            alert("Survey Now LIve");
            var payload = {
                name:this.survey_name,
                type:this.active_template.type,
                adminID:this.adminID,
                faculties:this.selected_faculties,
                questions:this.active_template.questions
            }
            axios.put('http://www.localhost/surveyBackend/survey/create',payload).then(res=>{
                console.log("survey res",res)
            })
            this.closeDialog();
        },
        selectAll(){
            this.faculty_list.forEach(f => {
                if(this.selected_faculties.indexOf(f.facultyID)<0){
                    this.selected_faculties.push(f.facultyID);
                }
            });
        },
        addQs(){
            this.active_template.questions.push("Enter new qs")
        },
        unselectAll(){
            this.selected_faculties.splice(0,this.selected_faculties.length);
        },
        toggleEdit(i){
            document.getElementById(`edit-${i}`).classList.toggle("hidden")
            document.getElementById(`qsst-${i}`).classList.toggle("hidden")
        },
        toggleSettings(){
            document.getElementsByClassName(`survey-settings`)[0].classList.toggle("open-settings")
        },
        toggleSelection(e){
            if(e.target.checked) this.selectAll();
            else this.unselectAll();
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
</style>