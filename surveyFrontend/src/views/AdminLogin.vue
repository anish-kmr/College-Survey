<template>
    <div>
        <!-- header -->
        <app-header></app-header>
        <div class="box flip-box">
            <div class="login-form" v-if="login_shown">
                <login :type="'admin'" :toggleForm="toggleForm"></login> 
            </div>

            <div class="signin-form" v-if="signin_shown">
                <div class="form-box">
                     <div class="logo">
                        <span>Signin in To</span>
                        <img src="../assets/logo.png" alt="">
                        <h2>College Survey</h2>
                        <h2 class="designation">ADMIN</h2>
                    </div>
                    <form action="" >
        
                        <div class="form-group multi-group">
                            <div class="form-group-half">
                                <label for="firstname">First Name :</label>
                                <input type="text" id="firstname" v-model="signin.first_name" required>
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
                                Email Id is not Valid !
                            </span>
                            <span v-else-if="email_taken" class="validate_msg">
                                Email Id is Alrerady taken !
                            </span>
                        </div>

                        <div class="form-group">
                            <label for="dept">Deparment: </label>
                            <input type="text" name="dept" id="dept" v-model="signin.department">
                        </div>

                        <div class="form-group">    
                            <label for="password">Password :  </label>
                            <input type="password" name="password" id="password" v-model="signin.password" @keyup="validatePassword">
                        </div>

                        <div class="form-group">    
                            <label for="cnfpassword"> Confirm Password :  </label>
                            <input type="password" name="cnfpassword" id="cnfpassword" v-model="signin.cnfpassword" @keyup="validatePassword" :class="{password_match:!password_match}">
                            <span v-if="!password_match" class="validate_msg">
                                Passwords do not match.
                            </span>
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
import Login from '../components/Login.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios';
export default {
    data(){
        return{
            login_shown:true,
            signin_shown:false,
            password_match:true,
            email_valid:true,
            email_validated:false,
            email_taken:false,
            
            signin:{
                first_name:"",
                last_name:"",
                name:"",
                department:"",
                email:"",
                password:"",
                cnfpassword:"",
            }
        }
    },
    components:{
        'app-header':Header,
        'app-footer':Footer,
        'login':Login,
    },
    beforeCreate() {
        if(localStorage.getItem("role") == "admin"){
            this.$router.push("/admin");
        }
    },
    methods:{
        toggleForm(){
            this.login_shown=!this.login_shown;
            this.signin_shown=!this.signin_shown;
        },
        validatePassword(){
            console.log(this.signin.password)
            console.log(this.signin.cnfpassword)
            console.log(this.temp)
            if(this.signin.password != this.signin.cnfpassword){
                this.password_match = false;
            }else{
                this.password_match=true;
            }
        },
        validateEmail(){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.signin.email)){
              this.email_valid = true;
              axios.get(`http://www.localhost/surveyBackend/admin/validate_email?email=${this.signin.email}`).then(res=>{
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
        
        createAccount(ev){
            ev.preventDefault();
            let payload = {
                first_name:this.signin.first_name,
                last_name:this.signin.last_name,
                email:this.signin.email,
                department:this.signin.department,
                password:this.signin.password,
            }
            console.log(payload);
            var ok=true;
            for(const field in payload){
                console.log("f",payload[field])
                if(payload[field].trim() == ""){
                    ok=false;
                    alert("All Fields are required");
                    break;
                }
            }
            if(ok && !this.email_validated){
                alert("Email must be valid");
                ok=false
            }
            if(ok && this.signin.password!=this.signin.cnfpassword){
                alert("Password do not match")
                ok=false
            }
            if(ok){
                 axios.put("http://www.localhost/surveyBackend/admin/signin",payload).then(res=>{
                    console.log("res of put  ",res);
                    if(res.data.created) {
                        var user=res.data.user
                        localStorage.setItem("role","admin");
                        localStorage.setItem("user",JSON.stringify(user));
                        this.$router.push("/admin");
                    }
                    else{
                        alert("DIDNTT SIggned in")
                    }
                })
            }
           
        }
    },  
}
</script>

<style scoped>

@import '../assets/css/login.css';

</style>