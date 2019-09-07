<template>
    <div id="header">
        <div >
		    <div>
                <router-link to="/" class="logo-link">
                    <img src="../assets/logo.png" alt="" class="logo">
                    <span>COLLEGE SURVEYS</span>
                </router-link>
            </div>
	    </div>
        
    </div>
    
</template>


<style scoped>

#header{
    position: fixed;
    left:0;
    top:0;
    transition: 1s all;
    background: #2b9ed3;
    height: 10vh;
    z-index: 999;
    padding: 1rem;width: 100%;

}
.logo-link{
    /* text-transform: uppercase; */
    font-size: 2.6rem;
    color:rgb(235, 235, 235);
}
.logo-link span{
    display: inline-block;
    transform: translateY(-15px);
}
.logo{
    height:45px;
    width:45px;
}
</style>