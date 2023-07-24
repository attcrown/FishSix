<template>
  <v-app class="fonts500">
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
.fonts500 {
  font-family: 'Prompt', sans-serif;  /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
  font-weight: 500;
}
</style>
