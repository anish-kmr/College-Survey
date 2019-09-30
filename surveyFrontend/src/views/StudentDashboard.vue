<template>
    <div>
        <app-header :role="'student'"></app-header>
        <div class="grid">
            <sidebar ></sidebar>
            <div class="main-area">
                <router-view :key="compKey"></router-view>
            </div>
        </div>
       
        
    </div>
</template>

<script>

import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
export default {
    components:{
        'app-header':Header,
        'sidebar':Sidebar,
    },
    data(){
        return{
            user :"",
            status:null,
            compKey:1,
        }
    },
    beforeMount() {
        if(localStorage.getItem("role")=='student'){
            this.user = JSON.parse(localStorage.getItem('user'));

        }
        else{
            this.$router.push("/student/login");
        }
    },  
    methods: {
        forceRender(){
            this.compKey=-this.compKey;
        }
    },
}
</script>


<style scoped>
.grid{
    display: grid;
    grid-template-columns: 20vw auto
}
.main-area{
    height: 90h;
}
</style>