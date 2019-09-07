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