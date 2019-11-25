<template>
    <div>
        <div class="details-header"> 
            <template v-if="role=='student'">  
                <h2>{{selected.facultyName}}</h2>
                <span>-{{selected.subjectName}}</span>                  
            </template>
            <template v-else>  
                <h2>{{selected.subjectName}}</h2>                  
            </template>
          
           <div class="controls">
               <div class="settings-icon">
                   <i class="fas fa-info-circle"></i>
               </div>  
           </div>
        </div>
        <div class="details-body">
            <div class="review-form" v-if="type=='new'">
                <div class="form-group">
                    <label for="title">Title : </label>
                    <input type="text" id="title" v-model="title">
                </div>
                <div class="form-group">
                    <label for="review">Review :  </label>
                    <textarea  id="review" v-model="review"></textarea>
                </div>
                
                <div class="send">
                    <button @click="sendReview">Send Review </button>
                </div>
            </div>
            <div class="past-reviews" v-else>
                <ul>
                    <template v-if="selected.reviews">
                        <li v-for="review in selected.reviews" :key="review.reviewID">
                            <div class="review-card" :class="{faculty_review:role=='faculty'}">
                                <div class="card-title">
                                    <h2>{{review.title}}</h2>
                                    <h4>{{review.created_at}}</h4>
                                </div>
                                <div class="card-body">
                                    <p>{{review.review}}</p>
                                </div>
                                
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <div class="null">
                            <h2>No Reviews </h2>
                        </div>
                    </template>
                   
                </ul>
            </div>

            
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {

    props:['selected',"type"],
    data(){
        return{
            role:"",
            user:"",
            title:"",
            review:"",
        }
    },
    beforeMount() {
         this.role = localStorage.getItem("role");
         this.user=JSON.parse(localStorage.getItem("user"));
         console.log("type",this.type)
         
    },
    methods: {
        sendReview(){
            var payload={
                facultyID:this.selected.facultyID,
                studentID:this.user.studentID,
                subjectID:this.selected.subjectID,
                title:this.title,
                review:this.review,
            }
            console.log("pl",payload)
            axios.put('http://www.localhost/surveyBackend/faculty/review',payload).then(res=>{
                console.log("sent",res.data.qry);
                alert("REVIEW Send")
            });
        },
    },
}
</script>

<style scoped>
@import '../assets/css/details.css';
.review-form{
    margin: 0rem 2.5rem;
}
.form-group:first-child{
    margin-bottom:2.5rem; 
}
.form-group label{
    display: block;
    font-size: 2rem;
    padding: .5rem 0;
    color: #3b3b3b;
}
.form-group input{
    width: 100%;
    padding:1rem;
    border-radius: 5px;
    border:none;
    font-size: 1.6rem;
}
.form-group textarea{
    resize:none;
    width:100%;
    height:25rem; 
    font-size: 1.6rem;
    padding:1rem 1.5rem;
    border-radius: 5px;
    line-height: 2.5rem;
}
input:focus,textarea:focus{
    outline: none;
}
.send{
    text-align: right;
    margin: 1rem 2.5rem;
    margin-bottom: 0;;
}

.review-card::before{
    content:"";
    position: absolute;
    width:00px;
    height:00px;
    border:5px solid transparent;
    border-top: 5px solid white;
    border-left:5px solid white;;
    right:0px;
    transform: translateX(100%);
}
.faculty_review::before{
    left:0;
    border:5px solid transparent;
    border-top: 5px solid white;
    border-right:5px solid white;;
    transform: translateX(-100%);
}
.review-card{
    position: relative;
    background-color: white;
    margin:1rem 2.5rem;
    border-radius: .5rem;
    border-top-right-radius: 0rem;
    margin-bottom: 2rem;
}
.card-title,.card-body{
    padding:.5rem 2rem;
}
.card-title h2{
    color:#3b3b3b;
    font-size: 1.8rem;
    padding:.5rem 0;
    text-transform: capitalize;
}
.card-title h4{
    color: #707070;
    font-size: 1.4rem;
    font-style: italic;
}
.card-body p{
    font-size: 1.6rem;
    padding:.5rem 1rem;
    color:#858383;
}
.null{
    padding:3rem;
    background-color: #fff;
    border-radius: 5px;
}
.null h2{
    font-size: 2rem;
    text-align: center;
    color:#3b3b3b
}
</style>