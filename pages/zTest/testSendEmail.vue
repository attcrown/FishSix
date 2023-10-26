<template>
  <div>
    SENDEMAIL
    <v-btn @click="sendTest()">send</v-btn>
  </div>
</template>
<script>
export default {
  layout: 'register',
  data() {
    return {
      property: 'value',
    }
  },
  mounted() {
    
  },
  methods: {
    sendTest() {
        console.log("Do>>>>>");
    }
  },
}
</script>
