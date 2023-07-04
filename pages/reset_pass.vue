<template>
  <div>
    <v-col cols="12" md="4" v-show="login_go === 'on'" class="text-center container">
      <v-alert elevation="24" prominent type="success">ท่านสามารถ login ในระบบได้เลย >>
        <nuxt-link to="/login">Go to About Page</nuxt-link>
      </v-alert>
    </v-col>
    <div>
      <h2 class="text-center" style="background-color:rgba(240, 248, 255, 0.575); color: rgb(95, 15, 15);"><b>Reset Password</b></h2>
    </div>
    <div class="d-flex justify-center align-center">
      <v-sheet class="pa-1 text-center rounded-5 m-2" style="background: rgba(156, 154, 154, 0.719) ;width: 500px;" elevation="16"
        v-show="login_go === 'off'">
        <v-sheet style="background: rgba(255, 255, 255, 0.918)" class="rounded-5 p-4 m-3" elevation="16">
          <form class="">
            <v-text-field v-model="name" :error-messages="nameErrors" :counter="10" label="Username" required
              @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>

            <v-text-field v-model="pass" :error-messages="passErrors" :counter="20" label="Password" type="password"
              required @input="$v.pass.$touch()" @blur="$v.pass.$touch()"></v-text-field>

            <v-text-field v-model="conpass" :error-messages="conpassErrors" :counter="20" label="New Password"
              type="password" required @input="$v.conpass.$touch()" @blur="$v.conpass.$touch()"></v-text-field>

            <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Confirm " required
              @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

            <v-btn class="me-4" color="green darken-3" @click="submit">
              <v-icon class="me-3">mdi-content-save-settings-outline</v-icon>
              submit
            </v-btn>
            <v-btn color="deep-orange darken-4" @click="clear">
              <v-icon class="me-3">mdi-backspace-reverse</v-icon> clear
            </v-btn>
          </form>
        </v-sheet>
      </v-sheet>
    </div>
    <div class="text-center d-flex justify-center align-center">
        <v-icon class="white--text">mdi-account-multiple-plus</v-icon>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

export default {
  layout: 'session',
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10), minLength: minLength(6) },
    pass: { required, maxLength: maxLength(20), minLength: minLength(6) },
    conpass: { required, maxLength: maxLength(20), minLength: minLength(6) },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    login_go: "off",
    name: '',
    pass: '',
    conpass: '',
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },    
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.minLength &&
        errors.push('Name must be at least 6 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },    
    passErrors() {
      const errors = []
      if (!this.$v.pass.$dirty) return errors
      if (!this.$v.pass.maxLength) {
        errors.push('Password must be at most 20 characters long')
      }
      if (!this.$v.pass.minLength) {
        errors.push('Password must be at least 6 characters long')
      }
      if (!this.$v.pass.required) {
        errors.push('Password is required')
      }
      return errors
    },
    conpassErrors() {
      const errors = []
      if (!this.$v.conpass.$dirty) return errors
      if (!this.$v.conpass.maxLength) {
        errors.push('Password must be at most 20 characters long')
      }
      if (!this.$v.conpass.minLength) {
        errors.push('Password must be at least 6 characters long')
      }
      if (!this.$v.conpass.required) {
        errors.push('Password is required')
      }
      return errors
    },

  },

  methods: {
    submit() {
      this.$v.$touch()
      if (this.passErrors.length === 0 && this.nameErrors.length === 0 
        && this.checkboxErrors.length === 0) {
        this.saveuser();
      } else { console.log("errors save"); }
    },
    clear() {
      // this.login_go = 'on'
      this.$v.$reset();
      this.name = '';
      this.pass = '';
      this.conpass = '';
      this.checkbox = false;
    },

    saveuser() {
      const db = this.$fireModule.database();
      db.ref(`user/${this.encode(this.name)}/`).on("value", (snapshot) => {
        const childData = snapshot.val();
        if(childData && childData.password == this.pass){
          db.ref(`user/${this.encode(this.name)}/`).update({
            password: this.conpass,
          });
          this.login_go = 'on';
          this.clear();
        }else{console.log('Error pass')};
      });
      // let key = new Date().getTime();
    },

    encode(a) {
      const encodedData = btoa(a);
      return encodedData;
    },

  },
}
</script>