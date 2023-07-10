<template>
  <div class="container input-container" style="height: 100%">
    <v-sheet width="400" class="mx-auto p-5 rounded-5" style="background-color:#F5F6F7; border-radius: 15px;">
      <div class="text-h5 text-center">เข้าสู่ระบบ</div>
      <v-form ref="form" @submit.prevent="submitForm">
        <div class="input-container">
          <span class="mdi mdi-account-key large-icon"></span>
          <v-text-field v-model="firstName" label="Username" :rules="firstNameRules" placeholder ="กรุณากรอกชื่อ" required></v-text-field>
        </div>
        <div class="input-container">
          <span class="mdi mdi-lock large-icon"></span>
          <v-text-field v-model="lastName" type="password" label="Password" placeholder ="กรุณากรอกรหัสผ่าน" :rules="lastNameRules"
            required></v-text-field>
        </div>
        <div>
          <v-checkbox v-model="ex4" label="save" color="success" value="success" hide-details></v-checkbox>
        </div>
        <div class="text-center"><v-btn type="submit" class="mt-3 mb-3 "
            style="border-radius: 32px; border: 1px solid #000;background: #FFF;color: #C3CAD9;" 
            @click="validate()">เข้าสู่ระบบ</v-btn>
        </div>
        <p class="text-center">ลืมรหัสผ่าน ?  <nuxt-link style="color: var(--gray-blue-grey-blue-70, #7D8FB3);font-size: 14px;font-weight: 400;"
          to="/reset_pass">ลืมรหัสผ่าน</nuxt-link> </p>
      
      </v-form>
    </v-sheet>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 red lighten-2">
            <span class="mdi mdi-message-alert"></span> Failed
          </v-card-title>
          <v-card-text>
            <br>
            <h5>กรุณากรอก Username หรือ Password ให้ถูกต้อง</h5>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </div>
</template>

<script>
import { exit } from 'process'

export default {
  layout: 'login',
  data: () => ({
    dialog: false,
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
  mounted() {
    this.checkuser();
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()
      if (valid) alert('Form is valid')
    },
    submitForm() {
      if (!this.firstName == "" && !this.lastName == "") {
        const db = this.$fireModule.database();
        db.ref(`user/${this.encode(this.firstName)}/`).on("value", (snapshot) => {
          const childData = snapshot.val();
          if (childData != undefined &&
            childData.name == this.firstName &&
            childData.password == this.lastName) {
            if (this.ex4) {
              localStorage.setItem('firstName', childData.name);
              localStorage.setItem('lastName', this.encode(this.firstName));
              localStorage.setItem('status', childData.status);
              this.$router.push(`/${localStorage.getItem('status')}`);
            } else {
              sessionStorage.setItem('firstName', childData.name);
              sessionStorage.setItem('lastName', this.encode(this.firstName));
              sessionStorage.setItem('status', childData.status);
              this.$router.push(`/${sessionStorage.getItem('status')}`);
            }
          } else { this.dialog = true; }
        })
      }
    },

    checkuser() {
      if (localStorage.getItem('status') == 'admin' || sessionStorage.getItem('status') == 'admin') {
        this.$router.push("/admin");
      }
      if (localStorage.getItem('status') == 'user' || sessionStorage.getItem('status') == 'user') {
        this.$router.push("/user");
      }
      if (localStorage.getItem('status') == 'teacher' || sessionStorage.getItem('status') == 'teacher') {
        this.$router.push("/teacher");
      }
    },

    encode(a) {
      const encodedData = btoa(a);
      return encodedData;
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
