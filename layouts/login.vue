<template>
  <v-app>
    <div class="image-container">
      <nuxt />
    </div>
  </v-app>
</template>
  
<style>
.image-container {
  background-image: url("~/assets/loginBG.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}

.white-bg {
  background-color: #ffffff;
}
</style>
