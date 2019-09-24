<template>
    <div>
        <div class="details-header">
            <h2>{{active_template.type}} Survey</h2><span>-Template</span>
        </div>

        <div class="details-body">
            <div class="qs-container">
                <div class="question" v-for="(qs,i) in active_template.questions" :key="i" :class="'qs-'+i">
                   <span class="edit-icon" @click="toggleEdit(i)"><i class="fas fa-pen"></i></span> 
                    <div class="qs-statement">
                        <div :id="'qsst-'+i">
                             <span class="qno">{{i+1}}. </span> <h2> {{qs}} </h2>
                        </div>


                        <div class="edit-qs hidden" :id="'edit-'+i" @keyup.enter="toggleEdit(i)">
                            <input type="text" v-model="active_template.questions[i]">
                        </div>

                    </div>
                    <div class="qs-options">
                        <span class="option"><img src="../assets/emoticons/angry.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/sad.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/neutral.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/slight_smile.png" alt=""></span>
                        <span class="option"><img src="../assets/emoticons/smile.png" alt=""></span>

                    </div>

                </div>
            </div>
            <div class="secondary-btn" @click="addQs">
                <button><span class="plus"><i class="fas fa-plus"></i> </span> Question</button>
            </div>
            <div class="primary-btn" @click="addQs">
                <button> Conduct Survey</button>
            </div>
            <div class="cancel-btn" @click="addQs">
                <button>Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['active_template'],
    data(){
        return{

        }
    },
    methods: {
        toggleEdit(i){
            document.getElementById(`edit-${i}`).classList.toggle("hidden")
            document.getElementById(`qsst-${i}`).classList.toggle("hidden")
        },
        addQs(){
            this.active_template.questions.push("Enter new qs")
        }
    },
}
</script>
<style >
    .details-header{
        padding:2rem 1rem;
        height: 7.5rem;
        border-bottom: 2px solid #b8b8b8;
    }
    .details-header h2{
        display: inline-block;
        font-size: 3rem;
        color: #707070;
        text-transform: capitalize;
    }
    .details-header span{
        padding:0 2rem;
        font-size: 1.2rem;
        font-style: italic;
    }
    .details-body{
        height:calc(90vh - 10rem);
        overflow-y: scroll;
    }
    .qs-container{
        width: 88%;
        margin:2rem auto;
    }
    .question{
        margin-bottom: 4rem;
        position: relative;
    }
    .qs-statement{
        color: #3a3939;
        margin-bottom: 1rem;
    }
    .qno{
        display: inline-block;
        font-size: 1.5rem;
        margin-right: 1rem;
        font-weight: bolder
    }
    .qs-statement h2{
        display: inline-block;
        font-size: 2rem;
    }
    .qs-options{
        margin-left:2rem;
    }
    .option{
        margin: .4rem;
        width: 30px;
        height:30px;
    }
    .option img{
        width: 30px;
        height: 30px;
    }
    .edit-icon{
        position: absolute;
        top: 5px;;
        left:-30px;
    }
    .edit-icon i{
        color: #707070;
        font-size: 1.6rem;
    }
    .edit-qs input{
        background: none;
        padding:0 1.2rem;
        box-shadow:none;
        border: none;
        width: 100%;
        font-size: 2rem;
        border-bottom: 1px dashed #707070;
    }
    input:focus{
        outline: none;
    }

    .secondary-btn,.cancel-btn,.primary-btn{
        position: absolute;
        bottom:50px;
    }
    .secondary-btn{left: 25px;}
    .cancel-btn{right: 25px;}
    .primary-btn{right: 150px;}
    button{
        background: #1447b6;
        border: 2px solid #1447b6;
        padding:1rem 2rem;
        font-size: 1.4rem;
        color: white;
        font-weight: bold;
    }
    .cancel-btn button{
        background: transparent;
        color:#1447b6;
    }
    button:hover{
        cursor: pointer;
    }
    .hidden{
        display: none !important;
    }
</style>