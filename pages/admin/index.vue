<template>
  <div>
    <dashboard></dashboard>
    <table_now></table_now>
  </div>
</template>
  
<script>
import dashboard from './dashboard.vue';
import table_now from './table_now.vue';

export default {
  data() {
    return {
      
    }
  },

  components: {
    dashboard,
    table_now,
  },
  created(){
    
  },
  mounted() {
    this.fullName();
  },
  methods: {
    fullName() {
      if (localStorage.getItem('firstName') == null) {
        this.firstName = sessionStorage.getItem('firstName') || '';
        this.keyuser = sessionStorage.getItem('lastName') || '';
      } else {
        this.firstName = localStorage.getItem('firstName') || '';
        this.keyuser = localStorage.getItem('lastName') || '';
      }
    },
  },
}
</script>
  
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>