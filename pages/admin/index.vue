<template>
  <div>
    <!-- <calendar></calendar> -->
    <dashboard></dashboard>
    <tablematch></tablematch>
    <tableactive></tableactive>
  </div>
</template>
  
<script>
import dashboard from './dashboard.vue';
import tablematch from './table_match.vue';
import calendar from './calendar.vue';
import tableactive from './table_active.vue';
export default {
  components: { dashboard },
  data() {
    return {
      
    }
  },

  components: {
    dashboard,
    tablematch,
    calendar,
    tableactive
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