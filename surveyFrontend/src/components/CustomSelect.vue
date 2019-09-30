<template>
    <div id="custom-select">
         <i style="display:none"> {{a}}</i>
        <div class="selected-area" >
            <span v-for="(selected,key) in selected_options" :key="key" @click="unselect(key)" class="selected-tag">
                {{selected}}
                <span class="delete">&times;</span> 
            </span>
            <span class="arrow" @click="dropped=!dropped">
              <i class="fas fa-caret-down" ></i>
            </span>
        </div>
        <div class="options-area" v-if="dropped">
            <span v-for="option in options" :key="option" class="option-tag" @click="select(option)">
                {{option}}
            </span>
            <div class="add" v-if="add">
                <h2>Add Subject</h2>
                <span class="add-form">
                        <input type="text" v-model="addedOption" @keydown.enter=addOption>
                        <input type="button" value="Add" @click="addOption">                    
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selected_options:Array,
        options:Array,
        add:Boolean,
        onSelect:{
            type:Function,
            default:null,
        },
    },
    data(){
        return{
            addedOption:"",
            dropped:false,
            a:1,
        }
    },
    methods: {
        select(option){
            if(this.selected_options.indexOf(option)<0)  this.selected_options.push(option);
            console.log(this.selected_options)
            if(this.onSelect){
                this.onSelect(option)
                console.log("its a fn");
            };
            this.a = -this.a
        },
        unselect(key){
           var a= this.selected_options.splice(key,1);
        },
        addOption(ev){
            ev.preventDefault();    
            var op = this.addedOption;
            if (this.options.findIndex((o) => o.toLowerCase() === op.toLowerCase()) <0){ 
                this.options.push(op);
                this.selected_options.push(op);
            }
            
            this.addedOption = "";
        },
    },
}
</script>

<style scoped>
    .selected-area{
        min-height: 40px;
        border-top-right-radius:8px;
        border-top-left-radius:8px;
        border:1px solid #a3a2a2d2;
        padding:10px;
        position: relative;
        max-height: 160px;
        overflow-y: auto;
    }
    .options-area{
        border-bottom-right-radius:8px;
        border-bottom-left-radius:8px;
        border:1px solid #a3a2a2d2;
        min-height: 40px;
        padding:10px;
        padding-bottom: 0;
        box-sizing: border-box;
    }
    .arrow{
        position: absolute;
        top:5px;
        right:0px;
        font-size: 2rem;
        padding:5px 10px;
    }
    .arrow:hover{
        cursor: pointer;
    }
    .option-tag,.selected-tag{
        background-color: #3f3f3f;
        padding:4px 8px;
        min-width: 20px;
        display: inline-block;
        text-align: center;
        border-radius: 5px;
        color: white;
        font-size: 1.5rem;
        margin: 5px;
    }
    .delete{
        font-size: 1.5rem;
    }
    .selected-tag:hover,.option-tag:hover{
        cursor: pointer;
    }
    .add{
        padding:5px 10px;
        margin-top:5px;
        border-top: 1px solid #a3a2a2d2;
    }
    .add h2{
        display: inline-block;;
    }
    .add-form input:nth-child(1){
        display: inline-block;
        padding:8px;
        border-radius: 0;
        border:none;
        border-bottom: 2px solid #a3a2a2d2;
        max-width:200px;
    }
    .add-form input:nth-child(2){
        display: inline-block;
        width:50px;
    }
    

</style>