<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>




<style>
*{
  padding: 0;
  margin:0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace;
}
/* Custom checkbox */
.checkbox-container{
    position: relative;
}
input[type="checkbox"]{
    visibility: hidden;
}
.custom-checkbox{
    position: absolute;
    z-index: 99;
    top: 0;
    left: 00px;
    width: 18px;
    height: 18px;
    background-color: #b8b8b8;
    transition: .2s all;
}
.check-label:hover{
    cursor: pointer;
}
.check-label:hover .custom-checkbox{
    background-color: #707070;
}
input[type="checkbox"]:checked~ .custom-checkbox{
    background-color: #1447b6 !important;
}
input[type="checkbox"]:checked~ .custom-checkbox::after{
    display: block;
}
.custom-checkbox::after{
    display: none;
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height:6px;
    border-bottom: 3px solid white;
    border-left: 3px solid white;
	-webkit-transform: rotate(-45deg); 
	-ms-transform: rotate(-45deg); 
	transform: rotate(-45deg); 
}

/* Custom Button */
button{
    background: #1447b6;
    border: 2px solid #1447b6;
    padding:1rem 2rem;
    font-size: 1.4rem;
    color: white;
    font-weight: bold;
}
button.cancel{
    background: transparent;
    color:#1447b6;
}
button:hover{
    cursor: pointer;
}


/* Dialog Box with Input */
.dialog-box{
    position: fixed;    
    top:50%;
    left: 50%;
    width:50vw;
    height: 50vh;
    transform: translate(-50%,-50%);
    background: #fff;
}
.dialog-container{
    position: fixed;
    width:100vw;
    height: 100vh;
    top:0;
    left:0;
    background: rgba(0, 0, 0, 0.733);
}
.dialog-header{
    height: 5rem;
    padding:2rem 1rem;
    padding-bottom: 1.5rem;
    border-bottom:2px solid  #b8b8b8;
}
.dialog-header h2{
    color: #707070;
    font-size: 2.5rem;
    letter-spacing: 2px;
}
.dialog-header .close{
    position: absolute !important;
    top:10px;
    right: 10px;
}
.dialog-body{
    padding:2rem 4rem;
}
.dialog-msg p{
    font-size: 1.4rem;
    line-height: 25px;
}
.dialog-input{
    margin:4rem auto;
    width: 80%;

}
.dialog-input input{
    width: 100%;
    padding:1rem;
    border-radius: 5px;
    border:1px solid rgb(51, 51, 51);
}
.dialog-body .buttons{
    text-align: right;
}
.dialog-body .buttons button:hover{
    cursor: pointer;
}



html {
    font-size: 62.5%
}

@media only screen and (max-width: 37.5em) {
    html {
        font-size: 56.25%;
    }
}

@media only screen and (max-width: 56.25em) {
    html {
        font-size: 50%;
    }
}

@media only screen and (min-width: 112.5em) {
    html {
        font-size: 75%
    }
}
</style>