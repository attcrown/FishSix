<template> 
  <div class="container input-container" style="height: 800px">
    <v-sheet
      width="400"
      class="mx-auto p-5"
    >
      <v-form ref="form" @submit.prevent="submitForm">
        <div class="input-container" >
          <span class="mdi mdi-account-key large-icon"></span>
          <v-text-field
            v-model="firstName"
            label="Username"
            :rules="firstNameRules"
            required
          ></v-text-field>
        </div>
        <div class="input-container">
          <span class="mdi mdi-lock large-icon"></span>
          <v-text-field
            v-model="lastName"
            label="Password"
            :rules="lastNameRules"
            required
          ></v-text-field>
        </div>
        <div>
          <v-checkbox
            v-model="ex4"
            label="save"
            color="success"
            value="success"
            hide-details
          ></v-checkbox>
        </div>
        <v-btn type="submit" block class="mt-2" color="success" @click="validate()">LOGIN</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  layout: 'session',
  data: () => ({
    ex4: false,
    firstName: '',
    firstNameRules: [
      (value) => {
        if (value?.length > 1) return true
        return 'กรุณาใส่ Username'
      },
    ],
    lastName: '',
    lastNameRules: [
      (value) => {
        if (value?.length > 1) return true
        return 'กรุณาใส่ Password'
      },
    ],
  }),
  mounted(){

  },
  methods: {
    async validate () {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },
    submitForm() {
      if(!this.firstName == "" && !this.lastName == ""){
        if(this.ex4){
          localStorage.setItem('firstName', this.firstName);
          localStorage.setItem('lastName', this.lastName);
        }else{          
          sessionStorage.setItem('firstName', this.firstName);
          sessionStorage.setItem('lastName', this.lastName);
        }
        this.$router.push("/admin");
      }else{}
    },
  },
}
</script>

<style>
.input-container {
  display: flex;
  align-items: center;
}

.input-container .mdi {
  margin-right: 8px;
}

.large-icon {
  font-size: 24px;
}
.sheet-container {
    position: relative;
    top: 50%;
    transform: translateY(0%);
  }
</style>
