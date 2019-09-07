<template>
    <div>
        <app-header></app-header>
        <div class="box flip-box">
            <div class="login-form" v-if="login">
                <div class="form-box">
                    <!-- <h4 class="form-heading">Login To College Survey </h4> -->
                     <div class="logo">
                        <span>Log in To</span>
                        <img src="../assets/logo.png" alt="">
                        <h2>College Survey</h2>
                        <h2 class="designation">Student</h2>
                    </div>
                    <form action="" method="POST" >
                        <div class="form-group">
                            <label for="username">Enrollment No. : </label>
                            <input type="text" name="username" id="username">
                        </div>

                        <div class="form-group">
                            <label for="password">Password :  </label>
                            <input type="password" name="password" id="password">
                            <router-link to="/student/forgotpassword" class="sm-text">
                                Forgot Password?
                            </router-link>
                        </div>
                        <div class="form-group">
                            <div class="submit-btn">
                                <button class="btn">Login</button>
                            </div>

                        </div>
                    </form>
                    <div class="signin" @click="toggleForm">
                        Dont have an Account? Create One Now !
                    </div>
                </div>
            </div>

            <div class="signin-form" v-if="signin">
                <div class="form-box">
                    <!-- <h4 class="form-heading">Login To College Survey </h4> -->
                     <div class="logo">
                        <span>Signin in To</span>
                        <img src="../assets/logo.png" alt="">
                        <h2>College Survey</h2>
                        <h2 class="designation">ADMIN</h2>
                    </div>
                    <form action="" method="POST" >
                        <div class="form-group">
                            <label for="username">Enrollment No. : </label>
                            <input type="text" name="username" id="username">
                        </div>

                        <div class="form-group multi-group">
                            <div class="form-group-half">
                                <label for="firstname">First Name :</label>
                                <input type="text" id="firstname">
                            </div>
                            <div class="form-group-half">
                                <label for="lastname">Last Name :</label>
                                <input type="text" id="lastname">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="batch">Batch: </label>
                            <input type="text" name="batch" id="batch">
                        </div>

                        <div class="form-group">    
                            <label for="password">Password :  </label>
                            <input type="password" name="password" id="password" v-model="password" @keyup="validatePassword">
                        </div>

                        <div class="form-group">    
                            <label for="cnfpassword"> Confirm Password :  </label>
                            <input type="password" name="cnfpassword" id="cnfpassword" v-model="cnfpassword" @keyup="validatePassword" :class="{match:!match}">
                            <span v-if="!match" class="matchmsg">
                                Passwords do not match.
                            </span>
                        </div>

                        <div class="form-group type">
                            <label for="type">I am a  </label>
                            <input type="radio" name="type" id="type"> Hosteller
                            <input type="radio" name="type" id="type"> Day Scholar
                        </div>

                        <div class="form-group">
                            <div class="submit-btn">
                                <button class="btn">Create Account</button>
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
export default {
    data(){
        return{
            login:true,
            signin:false,
            password:"",
            cnfpassword:"",
            match:true,
        }
    },
    methods:{
        toggleForm(){
            this.login=!this.login;
            this.signin=!this.signin;
        },
        validatePassword(){
            console.log(this.password)
            console.log(this.cnfpassword)
            console.log(this.temp)
            if(this.password != this.cnfpassword){
                this.match = false;
            }else{
                this.match=true;
            }
        }
    },
    components:{
    'app-header':Header,
    'app-footer':Footer,

  }
}
</script>

<style scoped>

.box{
    margin-top: 10vh;
}
.logo{
    margin: 0 auto;
    display: flex;
    width: max-content;
    margin-bottom: 60px;;
    position: relative;
}
.logo img{
    width:65px;
    height:65px;
    
}
.logo span{
    align-self:center;
    margin-right: 10px;;
    font-size: 20px;
    font-weight: 600;
}
.logo h2{
    font-size: 26px;
    display: inline-block;
    align-self: center;
    color:#4b4a4a;
}
.logo .designation{
    font-size: 2rem;
    font-weight: normal;
    font-style: italic;
    position: absolute;
    bottom:-10px;
    right:-50px;
}
.login-form,.signin-form{
    margin:2rem 4rem;
    padding:2rem 4rem;
}
.form-box{
    padding:2rem 4rem;
    margin: 0 auto;
    width:50%;
    box-shadow: 0 0 10px #707070;
}
.form-heading{
    font-size: 3rem;
    font-weight: normal;
    text-align: center;
    color:#4e4c4c;
    margin-top: 2rem;;
    margin-bottom:5rem;
}
.form-group{
    width: 95%;
    margin:0 auto;
    margin-bottom: 2rem;
}
.form-group label,.type{
    display: block;
    font-size: 2rem;
    color: #4e4c4c;
    margin:1rem 0;
}
.form-group input{
    width: 100%;
    padding:1rem 1.4rem;
    border-radius: 8px;
    border:1px solid #a3a2a2d2;
    margin-bottom: .8rem;
}
.match{
    border:2px solid rgba(238, 49, 49, 0.548)!important;
}
.form-group input:focus{
    outline: none;
    border:2px solid rgba(49, 147, 238, 0.548)
}
.multi-group{
    display: grid;
    grid-template-columns: 50% auto;
}
.form-group-half:first-child{
    padding-right: 10px;

}
.form-group-half:last-child{
    padding-left: 10px;

}
.type label{
    display: inline-block;
    margin-left: 1.5rem;

}
.type input{
    width: max-content;
    display: inline;
}
.submit-btn{
    text-align: center;
    margin:2rem 0;
}
.btn{
    width: 100%;
    padding:1.5rem 4rem;
    font-size:2.4rem;
    letter-spacing: .3rem;
    text-transform: uppercase;
    background-color: #0c90b8;
    border:2px solid #0c90b8;
    color: #e2e1e1;
    transition: .3s all;
}
.btn:hover{
    background-color: #0d72a1;

    border:2px solid #0d72a1;
    color:#ffffff;
    cursor: pointer;
}
.signin,.login{
    padding:1rem 0;
    font-size: 2rem;
    text-align: center;
    color: rgba(86, 52, 211, 0.925);
}
.signin:hover,.login:hover{cursor: pointer;}
.sm-text{
    font-size: 1.2rem
}
.matchmsg{
    color:red;
    padding-left: 1rem;
}
</style>