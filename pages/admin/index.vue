<template>
  <div class="mx-10">
    <table_now></table_now>
  </div>
</template>
  
<script>
import table_now from './table_now.vue';

export default {
  data() {
    return {
      
    }
  },

  components: {
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