<template>
  <div>
    <dashboard></dashboard>
  </div>
</template>
  
<script>
import dashboard from './dashboard.vue';

export default {
  data() {
    return {
      
    }
  },

  components: {
    dashboard,
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