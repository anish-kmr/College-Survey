<template>
    <div id="header" :class={logged_in:logged_in}>
		<div>
            <router-link to="/" class="logo-link" v-if="!logged_in">
                <img src="../assets/logo.png" alt="" class="logo-img">
                <span >COLLEGE SURVEYS</span>
            </router-link>

            <router-link to="/admin" class="logo-link" v-if="role=='admin'">
                <img src="../assets/logo.png" alt="" class="logo-img">
            </router-link>

            <router-link to="/student" class="logo-link"  v-if="role=='student'">
                <img src="../assets/logo.png" alt="" class="logo-img">
            </router-link>

            <router-link to="/faculty" class="logo-link"  v-if="role=='faculty'">
                <img src="../assets/logo.png" alt="" class="logo-img">
            </router-link>
        </div>

        <div class="nav" v-if="logged_in">
            <ul>
                <li>{{email}}</li>
                <li @click="logout">Logout</li>
            </ul>
        </div>
       
        
        
    </div>
    
</template>

<script>
export default {
    props:{
        role:{
            value:String,
            default:null,
        },
    },
    data(){
        return{
            logged_in:null,
            name:"",
            email:"",
        }
    },
    beforeMount() {
        if(this.role==null) this.logged_in = false;
        else{ 
            this.logged_in = true;
            this.email  = localStorage.getItem("email")
        }
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push("/")
        }
    },
}
</script>

<style scoped>

#header{
    position: fixed;
    left:0;
    top:0;
    transition: 1s all;
    background: #2b9ed3;
    min-height: 60px;
    height: 10vh;
    z-index: 999;
    padding: 1rem;width: 100%;

}
.logged_in{
    position: relative !important;
    background:transparent !important;
    border-bottom: 2px solid #b4b4b4;
    transition: none !important;
}
.logo-link{
    /* text-transform: uppercase; */
    font-size: 2.6rem;
    color:rgb(235, 235, 235);
}
.logo-link span{
    display: inline-block;
    transform: translateY(-15px);
}
.logo-img{
    height:45px;
    width:45px;
}

.nav{
    display: inline-block;
    position: absolute;
    top:0;
    right: 0;
    height: 100%;
    padding:2rem;
    font-size: 2rem;
    font-weight: bolder;
}
.nav ul li{

    display: inline-block;
}
.nav ul li:hover{
    cursor: pointer;
}
</style>