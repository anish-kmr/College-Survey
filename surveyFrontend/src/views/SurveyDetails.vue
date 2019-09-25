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
                        <span class="option"><img src="../assets/emoticons/angry.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/sad.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/neutral.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/slight_smile.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/smile.png" alt=""></span>

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
                adminID:this,adminID,
                faculties:this.selected_faculties,
            }

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
<style >
    .details-header,.settings-header{
        position: relative;
        padding:2rem 1rem;
        height: 7.5rem;
        border-bottom: 2px solid #b8b8b8;
    }
    .details-header h2{
        display: inline-block;
        font-size: 3rem;
        color: #707070;
        text-transform: capitalize;
        margin-top: 1rem;
    }
    .settings-header h2{
        font-size: 2rem;
        margin-top: 1.4rem;
        color: #707070;
        text-transform: capitalize;
    }
    .details-header span{
        padding:0 2rem;
        font-size: 1.2rem;
        font-style: italic;
    }

    .controls{
        position: absolute;
        bottom: 0;
        right:50px;
        height: 80%;
        display: grid;
        align-items: center;
    }
    .controls i{
        font-size: 2.5rem;
    }
    .controls>div:hover{
        cursor: pointer;
    }

    .details-body{
        height:calc(90vh - 10rem);
        overflow-y: auto;
    }
    .qs-container{
        width: 88%;
        margin:2rem auto;
    }
    .question{
        margin-bottom: 4rem;
        position: relative;
    }
    .qs-statement{
        color: #3a3939;
        margin-bottom: 1rem;
    }
    .qno{
        display: inline-block;
        font-size: 1.5rem;
        margin-right: 1rem;
        font-weight: bolder
    }
    .qs-statement h2{
        display: inline-block;
        font-size: 2rem;
    }
    .qs-options{
        margin-left:2rem;
    }
    .option{
        margin: .4rem;
        width: 30px;
        height:30px;
    }
    .option img{
        width: 30px;
        height: 30px;
    }
    .edit-icon{
        position: absolute;
        top: 5px;;
        left:-30px;
    }
    .edit-icon i{
        color: #707070;
        font-size: 1.6rem;
    }
    .edit-qs input{
        background: none;
        padding:0 1.2rem;
        box-shadow:none;
        border: none;
        width: 100%;
        font-size: 2rem;
        border-bottom: 1px dashed #707070;
    }
    input:focus{
        outline: none;
    }

    .survey-settings{
        height: 90vh;
        width: 60%;
        position: absolute;
        top: 0;
        right: -60%;
        background-color: white;
        height: 100%;
        transition: .7s all;
    }
    .close{
        display: inline-block;
        position: absolute;
        top: 45%;
        right:50px;
        font-size: 2rem;
        color: #707070
    }
    .close:hover{
        cursor: pointer;
    }
    .open-settings{
        right: 0;
    }
    .settings-body{
        height:calc(90vh - 10rem) ;
        overflow-y: auto;
    }
    .setting,.faculty-list{
        padding:0 2rem;
        margin-top: 2.5rem;
    }
    .setting h2{
        color: #3a3939;
        font-size: 1.8rem;
    }
    .faculty-list ul li{
        margin-bottom: 1.6rem;
    }
    .faculty-list ul li label{
        font-size: 1.6rem;
        font-weight: bold;
        display: grid;
        grid-template-columns:8% 80% auto;
        align-items: center;
        text-transform: capitalize;
    }
    .sno{
        align-self: baseline;
        margin-top: .4rem;
    }
    .faculty-name h2{color: #555555;}
    .faculty-name h4{color: #8a8a8a;}
    .select-all{
        grid-column-start: 1;
        grid-column-end: 3;
        margin-bottom: 2rem;
    }
    .faculty-list ul li:nth-child(1){

        border-bottom: 2px solid #9c9c9c;
    }
    .secondary-btn,.cancel-btn,.primary-btn{
        position: absolute;
        bottom:50px;
    }
    .secondary-btn{left: 25px;}
    .cancel-btn{right: 25px;}
    .primary-btn{right: 150px;}
    .done-btn{
        text-align: right;
        padding:1rem 6rem;
        margin-bottom: 2rem;
    }

    .hidden{
        display: none !important;
    }
</style>