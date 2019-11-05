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
        <div  v-if="role=='faculty'">
            <div class="rating" :class="starColor"> 
                <span class="rating-value">{{rating}}</span>
                <span class="star" ><i class="fas fa-star"></i> </span>  
            </div>
        </div>

        <div class="nav">
            <ul>
                <li @click="f">
                    <router-link :to="'/'+role+'/survey/active'">
                        <span class="nav-icon">
                            <i class="fas fa-list-alt"></i>
                        </span>
                        Active Surveys
                    </router-link>
                </li>
                <li v-if="role=='faculty'">
                    <router-link :to="'/faculty/analysis'">
                        <span class="nav-icon">
                            <i class="fas fa-poll"></i>
                        </span>
                        Analysis
                    </router-link>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            user:{},
            role:"",
            starColor:"",
            rating:0,
        }
    },
    beforeMount() {
        this.role = localStorage.getItem("role");
        this.user = JSON.parse(localStorage.getItem("user"));
        if(this.role=="faculty"){
            this.getRating();
        }
        

    },
    methods: {
        getRating(){
            axios.get(`http://www.localhost/surveyBackend/faculty/rating?facultyID=${this.user.facultyID}`).then(res=>{
                this.rating = res.data.rating;
                var r = this.rating;
                if(r<1) this.starColor="very-bad";
                else if(r<2) this.starColor="bad";
                else if(r<3) this.starColor="average";
                else if(r<4) this.starColor="good";
                else if(r<5) this.starColor="very-good";
            })
        },
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
    background-color: #2b4fd3;
    width: 80%;
    padding:10px 20px;
    font-size: 1.5rem;
    color:white;
    margin: 0 auto;       
    display:grid;
    grid-template-columns: 50px auto;
    align-items: center;
    border-radius:8px;
    /* box-shadow: 2px 2px 10px 2px #2b4fd3; */
    transition: .3s all;
              
}
.create-survey:hover{
    box-shadow: 2px 2px 10px 2px #2b4fd3;
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
.rating{
    display: grid;
    grid-template-columns: 70% 30%;
    align-items: center;
    padding:.25rem 1.25rem;
    width: max-content;
    margin: 0 auto;
}
.rating-value{
    text-align: left;
    font-size: 4.5rem;
    letter-spacing: -2px;
    font-weight: 700;
}
.star{

    text-align: left;
    font-size: 3.5rem;
}
.rating-value,.star i{
    color: white;
}

.nostar{background-color:#acacac;}
.very-bad{background-color: #FF5254;}
.bad{background-color: #FF6C35;}
.average{background-color: #FF9900;}
.good{background-color: #3F9E37;}
.very-good{background-color: #10580a;}
</style>