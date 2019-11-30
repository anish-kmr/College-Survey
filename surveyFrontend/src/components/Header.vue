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
                <li v-if="role=='student'">
                    <div class="coins">
                        <i class="fas fa-coins"></i>
                        <h2> {{user.coins}} </h2>
                    </div>
                </li>
                <li>
                    <h4>{{user.name}}</h4>
                </li>
                <li>
                    <div class="profile-icon" @click="toggleDrop">
                        <img src="../assets/profile.jpg" alt="">
                    </div>
                    <div class="profile-dropdown" v-if="dropped">
                        <ul>
                            <li>
                                <div class="drop-icon">
                                    <i class="fas fa-cog"></i>
                                </div>
                                <h2>Settings</h2>
                            </li>
                            <li>
                                <div class="drop-icon">
                                    <i class="fas fa-sign-out-alt"></i>
                                </div>
                                <h2 @click="logout">Logout</h2>
                            </li >
                        </ul>
                    </div>
                </li>
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
            user:"",
            dropped:false,
        }
    },
    beforeMount() {
        if(this.role==null) this.logged_in = false;
        else{ 
            this.logged_in = true;
            this.user  = JSON.parse(localStorage.getItem("user"))
            console.log("user",this.user)
        }
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push("/")
        },
        toggleDrop(){
            this.dropped=!this.dropped;
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
    /* background: #2b9ed3; */
    background: #2b4fd3;
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
    /* display: inline-block; */
    position: absolute;
    top:0;
    right: 0;
    height: 100%;
    font-size: 2rem;
    font-weight: bolder;
    
}
.nav>ul{
    height: 100%;;
    display: grid;
    grid-template-columns: repeat(4,max-content);
}
.nav>ul>li{
    margin-right: 1.5rem;
    height: 100%;
    /* display: inline-block; */
}
.nav>ul>li>h4,.profile-icon{
    position: relative;
    top:50%;
    transform:translateY(-50%);

    color: #2e2e2e;
}
.nav>ul li:hover{
    cursor: pointer;
    
}

.profile-icon img{
    border:1px solid #707070;
    vertical-align: top;
    border-radius: 50%;
    width: 50px;
    height: 50px;

}
.profile-dropdown{
    position: absolute;
    top: 100%;
    right:10px;
    background-color: #707070;
    min-width: 150px;
    border-radius: 5px;
    padding:.4rem; 
}
.profile-dropdown::before{
    content:"";
    position: absolute;
    width:0px;
    height:0px;
    border:10px solid  transparent;
    border-bottom: 12px solid #707070;
    top:-20px;
    right:17%;
}
.profile-dropdown ul li{
    display: grid;
    padding: .5rem;
    grid-template-columns: 30px auto;
    align-items: center;
}
.profile-dropdown .drop-icon{
    color:#f5f5f5;
    text-align: center;
}
.profile-dropdown h2{
    padding-left: .8rem;
    line-height: 2rem;
    font-size: 1.2rem;
    color:#f5f5f5;
}

.coins{
    /* outline: 2px solid red; */
    display: grid;
    grid-template-columns: 50% 50%;

    /* height:100%; */
}
.coins *{
    padding: 1.5rem 1rem ;
}

.coins i{
    font-size: 2.4rem;
    color: #2b4fd3;
}
.coins h2{
    font-size: 2.2rem;
    color: #2e2e2e;
    padding-top: 1.75rem;
}
</style>