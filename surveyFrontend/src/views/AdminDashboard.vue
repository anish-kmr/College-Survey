<template>
    <div>
        <app-header :role="'admin'"></app-header>
        <sidebar></sidebar>
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
            name:"",
            email:"",
        }
    },
    beforeMount() {
        if(localStorage.getItem("role")=='admin'){
            this.name = localStorage.getItem("name");
            this.email = localStorage.getItem("email");
        }
        else{
            this.$router.push("/admin/login");
        }
    },  
}
</script>