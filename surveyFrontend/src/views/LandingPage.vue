<template>
  <div class="full-page">
    <app-header></app-header>
    <div class="banner">
        <h4>
            You Feedback is important to us !
        </h4>
    </div>
        <div class="section split-section">
            <div class="box admin-section">
                <div class="box-heading">
                    <h4>
                        A teacher is like a candle, it consumes itself to light the way for others.
                    </h4>
                    <h2>
                        ADMIN
                    </h2>
                </div>
                <div class="box-content">
                    <ul class="box-list">
                        <li>Put different types of surveys</li>
                        <li>View the Analysis of all Surveys</li>
                         <li>Create/Edit questions of any survey</li>
                    </ul>
                    <div class="login-btn">
                       <router-link to="/admin/login" class="btn">
                            Login
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="box student-section">
                <div class="box-heading">
                    <h4>
                       STUDENTS ARE LIKE WET CEMENT, WHATEVER FALLS ON THEM MAKES AN IMPRESSION.
                    </h4>
                    <h2>
                        STUDENT
                    </h2>
                </div>
                <div class="box-content">
                    <ul class="box-list circle-type">
                        <li>Give Feedback to surveys</li>
                        <li>Recieve credit points after reviewing</li>
                         <li>Send Personal Suggestions anonymously to Admin</li>
                    </ul> 
                    <div class="login-btn">
                        <router-link to="/student/login" class="btn">
                            Login
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="banner-section">
            <div class="box-heading">
                <h4>If you earn enough credit points, you might get to buy a thing or two for yourself!</h4>
				<h2>Give Feedback Now</h2>
            </div>
        </div>

        <div class="float-section">
            <div class="box-container">
                <div class="box">
                    <div class="box-heading">
                        <h4>Now give Feedbacks Anonymously without any hesitation.</h4>
                        <h2>Anonymmous Feedback</h2>
                    </div>
                    <div class="box-content">
                        <p>
                            Students will be able to give true feedbacks to respective faculties anonymously.
                        </p>
                    </div>
                </div>
            </div>
            <div class="box-container">
                <div class="box">
                    <div class="box-heading">
                        <h4>Now give Feedbacks Anonymously without any hesitation.</h4>
                        <h2>Feedback Analysis</h2>
                    </div>
                    <div class="box-content">
                        <p>
                            Faculty may be ableto view a detailed analysis of his feedbacks given by all their batches and improve on specific points.
                            They can get anonymmous recommendations also if any student wants to give 
                        </p>
                    </div>
                </div>
            </div>
            <div class="box-container">
                <div class="box">
                    <div class="box-heading">
                        <h4>Now give Feedbacks Anonymously without any hesitation.</h4>
                        <h2>Survey Categories</h2>
                    </div>
                    <div class="box-content">
                        <p>
                            Surveys will be conducted in categories.Other than faculty surveys, we also have Mess Surveys,Hostel Surveys,etc.
                            COllege can improve in areas which student are not comfortable with.
                        </p>
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
  data () {
    return {
        scrollY:null,
    }
  },
  components:{
    'app-header':Header,
    'app-footer':Footer,
  },
  mounted() {
    //   alert('kej')
      var a = document.getElementById("header")
      a.classList.add("trans-color")
      console.log(a)

      window.addEventListener('scroll', (event) => {
        this.scrollY = Math.round(window.scrollY);
        if(this.scrollY >=321){
            a.classList.remove("trans-color")
        }
        else{
            a.classList.add("trans-color")
        }
      console.log(this.scrollY)
    });
  },
}
</script>


<style scoped>
.trans-color{
    background: #2b9ed33d !important;
}
.full-page{
    background-color: #f2f2f2;
    position: relative;
}

.banner{
    height:60vh;
    background: #2b9ed3;
    background-image: url("../assets/banner1.jpg");
    background-position: 70%;
    filter:brightness(70%);
    background-size: cover;
    /* transform: translateY(-2vh); */
    z-index: -1;;
    /* outline: 2px solid red; */
}
.banner h4{
    text-align: center;
    font-size: 5rem;
    font-weight: normal;
    padding-top: 40vh;;
    color:rgb(12, 12, 12);
}
.section{
    margin:8rem auto;
    padding:2rem 4rem ;
}
.split-section{
    justify-content: center;
    display:grid;
    grid-template-columns: 45% 45%;
    grid-column-gap:5%;  
}
.box{
    padding:6rem ;
    background-color: white;
    box-shadow: 0px 0px 10px rgb(90, 90, 90);
}
.box-heading h4{
    text-align: center;
    font-weight: normal;
    text-transform: uppercase;
    color:#999999;
    letter-spacing: .25rem;
    font-size: 1.2rem;
    position: relative;
}
.box-heading h4::after{
    content: "" ;
    position: absolute;
    bottom:-10px;
    left:50%;
    transform: translateX(-50%);
    width:70%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.125);
}
.box-heading h2{
    margin-top: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2.8rem;
    letter-spacing: .5rem;
    font-weight: 500;
    color:#1b1b1b;
}
.box-list{
    font-size: 1.4rem;
    padding:1.5rem 2rem;
    color:#4e4c4c;
    margin:2rem 0;

}
.box-list li{
    padding:.3rem;
    list-style-type: square;
}

.login-btn{
    text-align: center;
}
.login-btn .btn{
    color: #4e4c4c;
    padding:1.2rem 3rem;
    font-size: 1.6rem;
    background-color:transparent;
    border:2px solid #bbb9b9;
    transition: .3s all;
    text-transform: uppercase
}
.btn:hover{
    cursor:pointer;
    background-color: rgba(199, 197, 197, 0.466);

}
.banner-section{
    background-color: black;
    padding:8rem 4rem;
    height: 20rem;
}

.banner-section .box-heading h4::after{
    bottom:-20px;
    width:40%;
    background-color: rgba(189, 189, 189, 0.973);
}
.banner-section .box-heading h2{
    letter-spacing: 0;
    font-weight: normal;
    color:rgb(230, 228, 228);
}
.float-section{
    margin:0 auto;
    padding:2rem 8rem;
}
.float-section .box{
    min-height:30rem;
    margin:2rem 0;
    width: 45%;
}
.box-container{
    position: relative;
    height: 30vh;
}
.box-container:nth-child(2) .box{
    position: absolute;
    right:0;
}
.box-content p{
    margin-top:6rem;
    line-height: 25px;
    font-size: 1.4rem;
    color:#707070
}
.footer{
    margin-top:30vh;
}


</style>