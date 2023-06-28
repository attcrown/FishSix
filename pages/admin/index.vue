<template>
    <div>
        <span>{{ firstName }}</span>  
        <span>{{ lastName }}</span>
        <button @click="getout()">out</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: 'ไม่มี',
        lastName: 'ไม่มี',
      }
    },
    computed: {
      
    },
    mounted(){
      this.check();
      this.fullName();
    },
    methods: {
      getout(){
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push("/login");
      },     
      check(){
        console.log('check');
        if(localStorage.getItem('firstName') == null && sessionStorage.getItem('firstName') == null){
          this.$router.push("/login");
        }
      },
      fullName(){
        if(localStorage.getItem('firstName') == null){
          const firstName = sessionStorage.getItem('firstName') || '';
          const lastName = sessionStorage.getItem('lastName') || '';
          this.firstName = firstName;
          this.lastName = lastName;
        }else{
          const firstName = localStorage.getItem('firstName') || '';
          const lastName = localStorage.getItem('lastName') || '';
          this.firstName = firstName;
          this.lastName = lastName;
        }
      },  
    },
  }
  </script>
  