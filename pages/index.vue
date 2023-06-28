<template>
  <div>
    <v-progress-linear
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted(){
      this.getout();
  },
  methods: {
      getout(){
        this.$router.push("/admin");
      },
      
    },
}
</script>
