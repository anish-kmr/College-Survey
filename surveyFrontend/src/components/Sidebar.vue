<template>
    <div class="sidebar">
        <div  v-if="role=='admin'">
            <router-link to="/admin/survey/create">
                <div class="create-survey">
                    <span class="plus"><i class="fas fa-plus"></i> </span>
                    <h2>Survey</h2>
                </div>
            </router-link>
        </div>

        <div class="nav">
            <ul>
                <li @click="f">
                    <router-link to="/admin/survey/active">
                        <span class="nav-icon">
                            <i class="fas fa-poll"></i>
                        </span>
                        Active Surveys
                    </router-link>
                </li>
                <li >
                    <router-link to="/admin/survey/scheduled">
                        <span class="nav-icon">
                            <i class="fas fa-calendar-alt"></i>
                        </span>
                        Scheduled Surveys
                    </router-link>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            role:"",
        }
    },
    beforeMount() {
        this.role = localStorage.getItem("role")
    },
    methods: {
        f(){
            this.$parent.forceRender();
        }
    },
}
</script>


<style  scoped>
.sidebar{
    width:20vw;
    height: 90vh;
    border-right: 2px solid #b4b4b4;
    padding:1rem;
}
.create-survey{
    background-color: #2b9ed3;
    width: 80%;
    padding:10px 20px;
    font-size: 1.5rem;
    color:white;
    margin: 0 auto;       
    display:grid;
    grid-template-columns: 50px auto;
    align-items: center;
    border-radius:8px;
    box-shadow: 2px 2px 10px 2px #05628d;
              
}
.create-survey:hover{
    box-shadow: 2px 2px 10px 2px #1885b8;
    cursor: pointer;
}
.create-survey .plus{
    display: inline-block;
    font-size: 4rem;
}
.create-survey h2{
    display: inline-block;
    font-size: 2.4rem

}
.nav{
    margin: 0 auto;
    margin-top:4rem;
    
}
.nav li a{
    display: grid;
    grid-template-columns: 50px auto;
    align-items: center;
    padding:1.5rem 0;
    font-size: 1.8rem;
    font-weight: bold;
    color:#1447b6 ;
}
.nav li a:hover,
.router-link-exact-active{
    color: #06227c !important;
}
.nav-icon{
    margin-right: 1rem;
    font-size: 3.5rem;
}

</style>