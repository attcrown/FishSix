<template>
    <div>
        <h1>Test</h1>
        <v-btn @click="callMyFunction1()">1</v-btn>
        <v-btn @click="callMyFunction()">2</v-btn>
    </div>
</template>
<script>
import { myFunctions } from './controller.js'
export default {
    layout: 'login',
    data() {
        return {

        }
    },
    methods: {
    callMyFunction1() {
      myFunctions.myFunction1('123');
    },
    callMyFunction2() {
      myFunctions.myFunction2('456');
    },
    callMyFunction() {
      const valueToSend = 10;
      myFunctions.myFunctionWithCallback(valueToSend, result => {
        console.log('ค่าที่ถูกส่งกลับมา:', result);
      });
    },
  },
}
</script>
