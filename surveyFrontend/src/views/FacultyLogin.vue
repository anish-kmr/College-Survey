<template>
    <div>
        <app-header></app-header>
        <div class="box flip-box faculty">
            <div class="login-form" v-if="login_shown">
                <div class="form-box">
                    <!-- <h4 class="form-heading">Login To College Survey </h4> -->
                     <div class="logo">
                        <span>Log in To</span>
                        <img src="../assets/logo.png" alt="">
                        <h2>College Survey</h2>
                        <h2 class="designation">Faculty</h2>
                    </div>
                    <form >
                        <div class="form-group">
                            <label for="username">Email : </label>
                            <input type="text" name="username" id="username" v-model="login.email">
                        </div>

                        <div class="form-group">
                            <label for="password">Password :  </label>
                            <input type="password" name="password" id="password" v-model="login.password">
                            <router-link to="/student/forgotpassword" class="sm-text">
                                Forgot Password?
                            </router-link>
                        </div>
                        <div class="form-group">
                            <div class="submit-btn">
                                <button class="btn" @click="authenticate">Login</button>
                            </div>

                        </div>
                    </form>
                    <div class="signin" @click="toggleForm">
                        Dont have an Account? Create One Now !
                    </div>
                </div>
            </div>

            <div class="signin-form" v-if="signin_shown">
                <div class="form-box">
                    <!-- <h4 class="form-heading">Login To College Survey </h4> -->
                     <div class="logo">
                        <span>Signin in To</span>
                        <img src="../assets/logo.png" alt="">
                        <h2>College Survey</h2>
                        <h2 class="designation">Faculty</h2>
                    </div>
                    <form >

                        <div class="form-group multi-group">
                            <div class="form-group-half">
                                <label for="firstname">First Name :</label>
                                <input type="text" id="firstname" v-model="signin.first_name">
                            </div>
                            <div class="form-group-half">
                                <label for="lastname">Last Name :</label>
                                <input type="text" id="lastname" v-model="signin.last_name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Email: </label>
                            <input type="email" name="email" id="email" v-model="signin.email" @keyup="validateEmail" @change="validateEmail">
                            <span v-if="email_validated" class="validate_success">
                               <i class="fas fa-check-circle"></i>
                            </span>
                            <span v-if="!email_valid" class="validate_msg">
                                Email Id is not Valid !;
                            </span>
                            <span v-else-if="email_taken" class="validate_msg">
                                Email Id is Alrerady taken !;
                            </span>
                        </div>

                        <div class="form-group">
                            <label for="department">Department: </label>
                            <input type="text" name="department" id="department" v-model="signin.department">
                        </div>

                        <div class="form-group">
                            <label for="subjects">Subjects: </label>
                            <custom-select :options="options" :add="true" :onSelect="selectSubject" :selected_options="signin.selected_options"> </custom-select>
                        </div>
                       
                        <div class="form-group">    
                            <label for="password">Password :  </label>
                            <input type="password" name="password" id="password" v-model="signin.password" @keyup="validatePassword">
                        </div>

                        <div class="form-group">    
                            <label for="cnfpassword"> Confirm Password :  </label>
                            <input type="password" name="cnfpassword" id="cnfpassword" v-model="signin.cnfpassword" @keyup="validatePassword" :class="{match:!match}">
                            <span v-if="!match" class="matchmsg">
                                Passwords do not match.
                            </span>
                        </div>

                        <div class="form-group">
                            <div class="submit-btn">
                                <button class="btn" @click="toggleSubjectDetails">Next</button>
                            </div>

                        </div>
                    </form>
                    <div class="login" @click="toggleForm">
                        Alrerady have an Account? Login Now !
                    </div>
                </div>
            </div>

            <div class="subjects-form" v-if="subjects_shown">
                <div class="form-box subject-box">
                    <div class="form-group">
                       <label for="batches">Batches: </label>
                       <div class="batch-selection">
                           <div class="subject headers">
                               <div class="subject-heading">
                                   <h2>Subjects</h2>
                               </div>
                               <div class="classes">
                                   <h2>1st Year</h2>
                                   <h2>2nd Year</h2>
                                   <h2>3rd Year</h2>
                                   <h2>4th Year</h2>
                               </div>
                           </div>
                           <div class="subject" v-for="(sub,i) in signin.selected_options" :key="i" >   
                               <div class="subject-name">
                                   <h2>{{sub}}</h2>
                               </div>
                               <div class="classes">
                                   <div class="year" v-for="i in 4" :key="i">
                                        <!-- <div class="batch"> -->
                                            <custom-select :options="batch_options" :selected_options="signin.selected_classes[sub]['year'+i]" :add="true"></custom-select>
                                        <!-- </div> -->
                                   </div>
                               </div>
                               
                           </div>
                       </div>
                    </div>
                    <div class="form-group">
                        <div class="submit-btn">
                            <button class="btn" @click="createAccount">Create Account</button>
                        </div>
                        <div class="back-btn">
                            <button class="btn" @click="toggleSubjectDetails">Go Back</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>

import Header from '../components/Header.vue'
import Select from '../components/CustomSelect.vue'
import Footer from '../components/Footer.vue'

import axios from 'axios';
export default {
    data(){
        return{
            login_shown:true,
            signin_shown:false,
            subjects_shown:false,
            match:true,
            email_valid:true,
            email_validated:false,
            email_taken:false,
            login:{
                email:"",
                password:"",
            },
            signin:{
                first_name:"",
                last_name:"",
                department:"",
                selected_options:[],
                selected_classes:{},
                email:"",
                password:"",
                cnfpassword:"",
            },
            options:[],
            batch_options:["B1","B2","B3","B4"],
            year_options:["1st Year","2nd Year","3rd Year","4th Year"],
        }
    },
    beforeCreate() {
        if(localStorage.getItem("role") == "faculty"){
            this.$router.push("/faculty");
        }
    },
    beforeMount() {
        axios.get(`http://www.localhost/surveyBackend/subjects/all`).then(res=>{
            console.log("res aaya ",res);
            if(res.data.subjects){
                res.data.subjects.forEach(subject => {
                    this.options.push(subject['name'])
                });
            }

        })
    },
    methods:{
        selectSubject(sub_name){
            this.signin.selected_classes[sub_name]={year1:[],year2:[],year3:[],year4:[]}
            console.log("subbjecttt is ",sub_name)
        },
        selectYear(y){
            console.log("yearr",this.signin.selected_classes)
        },
        toggleForm(){
            this.login_shown=!this.login_shown;
            this.signin_shown=!this.signin_shown;
        },
        toggleSubjectDetails(ev){

            ev.preventDefault();
            this.subjects_shown=!this.subjects_shown;
            this.signin_shown=!this.signin_shown;
            console.log("signin",this.signin)
        },
        validatePassword(){
            console.log(this.password)
            console.log(this.cnfpassword)
            console.log(this.temp)
            if(this.signin.password != this.signin.cnfpassword){
                this.match = false;
            }else{
                this.match=true;
            }
        },
        validateEmail(){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.signin.email)){
              this.email_valid = true;
              axios.get(`http://www.localhost/surveyBackend/faculty/validate_email?email=${this.signin.email}`).then(res=>{
                  console.log("res aaya ",res);
                  if(res.data.available){
                    this.email_taken = false;
                    this.email_validated=true;
                  }
                  else{
                    this.email_taken = true;
                    this.email_validated = false;
                  }

              })
    
            }
            else{
                this.email_valid = false;
                this.email_taken = false;
                this.email_validated = false;
            }
        },
        authenticate(ev){
            ev.preventDefault();
            let payload = {
                email:this.login.email,
                password:this.login.password,
            }
            console.log(payload);
            axios.post("http://www.localhost/surveyBackend/faculty/login",payload).then(res=>{
                console.log("res aaya ",res);
                if(res.data.authenticated) {
                    localStorage.setItem("role","faculty");
                    localStorage.setItem("user",JSON.stringify(res.data.user));
                    this.$router.push("/faculty");
                }
                else{
                    alert("DIDNTT SIggned in")
                }
            })
        },
        createAccount(ev){
           ev.preventDefault();
           let payload = {
               first_name:this.signin.first_name,
               last_name:this.signin.last_name,
               email:this.signin.email,
               department:this.signin.department,
               subjects:this.signin.selected_options,
               batches:this.signin.selected_classes,
               password:this.signin.password,
           }
           console.log(payload);
           axios.put("http://www.localhost/surveyBackend/faculty/signin",payload).then(res=>{
               console.log("res of put  ",res);
               if(res.data.created) {
                    localStorage.setItem("role","faculty");
                    this.signin.name = this.signin.first_name+" "+this.signin.last_name;
                    localStorage.setItem("user",JSON.stringify(this.signin));
                    this.$router.push("/faculty");
                }
                else{
                    alert("DIDNTT SIggned in")
                }
           })
        }
    },
    components:{
        'app-header':Header,
        'custom-select':Select,
        'app-footer':Footer,
    }
}
</script>

<style scoped>
@import '../assets/css/login.css';
</style>