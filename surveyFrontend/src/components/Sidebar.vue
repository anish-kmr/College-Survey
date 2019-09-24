<template>
    <div class="sidebar">
        <div class="create-survey" v-if="role=='admin'">
            <span class="plus"><i class="fas fa-plus"></i> </span>
            <h2>Survey</h2>
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


</style>