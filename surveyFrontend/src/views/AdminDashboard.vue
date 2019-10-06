<template>
    <div>
        <app-header :role="'admin'"></app-header>
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
        if(localStorage.getItem("role")=='admin'){
            this.user = JSON.parse(localStorage.getItem('user'));

        }
        else{
            this.$router.push("/admin/login");
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
    height: 90vh;
}
</style>