<template>
       <div class="form-box">
            <!-- <h4 class="form-heading">Login To College Survey </h4> -->
             <div class="logo">
                <span>Log in To</span>
                <img src="../assets/logo.png" alt="">
                <h2>College Survey</h2>
                <h2 class="designation">{{type}}</h2>
            </div>
            <form >
                <div class="form-group">
                    <label for="email">Email : </label>
                    <div class="input">
                        <div class="icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <input type="text" name="email" id="email" v-model="login.email">
                    </div>
                    
                </div>
                <div class="form-group">
                    <label for="password">Password :  </label>
                        <div class="input">
                            <div class="icon">
                                <i class="fas fa-key"></i>
                            </div>
                            <input type="password" name="password" id="password" v-model="login.password">
                            <div class="show-password" @click="toggleVisibility">
                                <i class="fas fa-eye" v-if="password_visible"></i>
                                <i class="fas fa-eye-slash" v-else></i>
                            </div>
                        </div>
                    <router-link to="/student/forgotpassword" class="sm-text" >
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

</template>



<script>
import axios from 'axios';
export default {
    props:['type','toggleForm'],
    data() {
        return {
            login:{
                email:"",
                password:"",
            },
            password_visible:true,
        }
    },
    methods: {
        authenticate(ev){
            ev.preventDefault();
            let payload = {
                email:this.login.email,
                password:this.login.password,
            }
            console.log(payload);
            axios.post(`http://www.localhost/surveyBackend/${this.type}/login`,payload).then(res=>{
                console.log("res aaya ",res);
                if(res.data.authenticated) {
                    localStorage.setItem("role",`${this.type}`);
                    localStorage.setItem("user",JSON.stringify(res.data.user));
                    this.$router.push(`/${this.type}`);
                }
                else{
                    alert("DIDNTT SIggned in")
                }
            })
        },
        toggleVisibility(){
            if(this.password_visible) document.getElementById("password").type="text";
            else  document.getElementById("password").type="password";
            this.password_visible=!this.password_visible;
        }
    },
}
</script>


<style scoped>
    .designation{text-transform: uppercase;}
</style>