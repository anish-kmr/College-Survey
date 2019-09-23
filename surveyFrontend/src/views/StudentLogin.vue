<template>
    <div>
        <app-header></app-header>
        <div class="box flip-box">
            <div class="login-form" v-if="login_shown">
                <div class="form-box">
                    <!-- <h4 class="form-heading">Login To College Survey </h4> -->
                     <div class="logo">
                        <span>Log in To</span>
                        <img src="../assets/logo.png" alt="">
                        <h2>College Survey</h2>
                        <h2 class="designation">Student</h2>
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="email">Email : </label>
                            <input type="email" name="email" id="email" v-model="login.email">
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
                        <h2 class="designation">ADMIN</h2>
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="username">Enrollment No. : </label>
                            <input type="text" name="username" id="username" v-model="signin.eno">
                        </div>

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
                            <input type="email" name="email" id="email" v-model="signin.email">
                        </div>

                        <div class="form-group">
                            <label for="batch">Batch: </label>
                            <input type="text" name="batch" id="batch"  v-model="signin.batch">
                        </div>

                        <div class="form-group">
                            <label for="year">Year: </label>
                            <input type="number" name="year" id="year"  v-model="signin.year">
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

                        <div class="form-group type">
                            <label for="type">I am a  </label>
                            <input type="radio" name="type" value="Hosteller" v-model="signin.type"> Hosteller
                            <input type="radio" name="type" value="Day Scholar" v-model="signin.type"> Day Scholar
                        </div>
                        <div class="form-group">
                            <div class="submit-btn">
                                <button class="btn" @click="createAccount">Create Account</button>
                            </div>

                        </div>
                    </form>
                    <div class="login" @click="toggleForm">
                        Alrerady have an Account? Login Now !
                    </div>
                </div>
            </div>
            
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

import axios from 'axios';
export default {
    data(){
        return{
            login_shown:true,
            signin_shown:false,
            match:true,
            login:{
                email:"",
                password:"",
            },
            signin:{
                eno:"",
                first_name:"",
                last_name:"",
                batch:"",
                year:"",
                email:"",
                type:"",
                password:"",
                cnfpassword:"",
            }
        }
    },
    methods:{
        toggleForm(){
            this.login_shown=!this.login_shown;
            this.signin_shown=!this.signin_shown;
        },
        validatePassword(){
            if(this.signin.password != this.signin.cnfpassword){
                this.match = false;
            }else{
                this.match=true;
            }
        },
         authenticate(ev){
            ev.preventDefault();
            let payload = {
                email:this.login.email,
                password:this.login.password,
            }
            console.log(payload);
            axios.post("http://www.localhost/surveyBackend/student/login",payload).then(res=>{
                console.log("res aaya ",res);
            })
        },
        createAccount(ev){
            ev.preventDefault();
            let payload = {
                enrollment_no:this.signin.eno,
                first_name:this.signin.first_name,
                last_name:this.signin.last_name,
                email:this.signin.email,
                batch:this.signin.batch,
                type:this.signin.type,
                year:this.signin.year,
                password:this.signin.password,
            }
            console.log(payload);
            axios.put("http://www.localhost/surveyBackend/student/signin",payload).then(res=>{
                console.log("res of put  ",res);
            })
        }
    },
    components:{
    'app-header':Header,
    'app-footer':Footer,

  }
}
</script>

<style scoped>

@import '../assets/css/login.css';
</style>