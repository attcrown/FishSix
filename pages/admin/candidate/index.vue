<template>
    <div>
        <v-col cols="12" md="4" v-show="login_go === 'on'" class="text-center container">
            <v-alert elevation="24" prominent type="success">ท่านสามารถ login ในระบบได้เลย >>
                <nuxt-link to="/login">Go to About Page</nuxt-link>
            </v-alert>
        </v-col>
        <div class="d-flex justify-center align-center">
            <v-sheet class="pa-1 text-center rounded-5 m-2" style="background: rgba(156, 154, 154, 0.719) ;width: 500px;"
                elevation="16" v-show="login_go === 'off'">
                <v-sheet style="background: rgba(255, 255, 255, 0.918)" class="rounded-5 p-4 m-3" elevation="16">
                    <form class="">
                        <v-text-field v-model="name" :error-messages="nameErrors" :counter="20" label="Username" required
                            @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>

                        <v-text-field v-model="pass" :error-messages="passErrors" :counter="20" label="Password"
                            type="password" required @input="$v.pass.$touch()" @blur="$v.pass.$touch()"></v-text-field>

                        <v-text-field v-model="conpass" :error-messages="conpassErrors" :counter="20"
                            label="Confirm Password" type="password" required @input="$v.pass.$touch()"
                            @blur="$v.pass.$touch()"></v-text-field>

                        <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required
                            @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>

                        <v-select v-model="select" :items="items" :error-messages="selectErrors" label="sex" required
                            @change="$v.select.$touch()" @blur="$v.select.$touch()"></v-select>

                        <v-select v-model="status" :items="status_items" :error-messages="statusErrors" label="ตำแหน่ง"
                            required @change="$v.status.$touch()" @blur="$v.status.$touch()"></v-select>

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
    layout: 'login',
    mixins: [validationMixin],

    validations: {
        name: { required, maxLength: maxLength(20), minLength: minLength(6) },
        email: { required, email },
        select: { required },
        status: { required },
        pass: { required, maxLength: maxLength(20), minLength: minLength(6) },
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
        email: '',
        select: null,
        status: null,
        items: ['MEN', 'WOMEN'],
        status_items: ['admin', 'teacher', 'user','opFS','opsupFS'],
        checkbox: false,
    }),

    computed: {
        checkboxErrors() {
            const errors = []
            if (!this.$v.checkbox.$dirty) return errors
            !this.$v.checkbox.checked && errors.push('You must agree to continue!')
            return errors
        },
        selectErrors() {
            const errors = []
            if (!this.$v.select.$dirty) return errors
            !this.$v.select.required && errors.push('Item is required')
            return errors
        },
        statusErrors() {
            const errors = []
            if (!this.$v.status.$dirty) return errors
            !this.$v.status.required && errors.push('Item is required')
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
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
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
            if (this.pass !== this.conpass) {
                errors.push('รหัสผ่านไม่ตรงกัน')
            }
            return errors
        },

    },

    methods: {
        submit() {
            this.$v.$touch()
            if (this.emailErrors.length === 0 && this.passErrors.length === 0
                && this.nameErrors.length === 0 && this.selectErrors.length === 0
                && this.checkboxErrors.length === 0 && this.pass == this.conpass) {
                console.log("Save");
                this.saveuser();
                console.log(this.name + " " + this.pass + " " + this.email + " " + this.select + " " + this.checkbox);
            } else { console.log("errors save"); }
        },
        clear() {
            // this.login_go = 'on'
            this.$v.$reset();
            this.name = '';
            this.email = '';
            this.pass = '';
            this.conpass = '';
            this.select = null;
            this.status = null;
            this.checkbox = false;
        },

        saveuser() {
            const db = this.$fireModule.database();
            // let key = new Date().getTime();
            db.ref(`user/${this.encode(this.name)}/`).set({
                name: this.name,
                password: this.pass,
                email: this.email,
                sex: this.select,
                status: this.status,
            });
            this.login_go = 'on';
            this.clear();
        },

        encode(a) {
            const encodedData = btoa(a);
            return encodedData;
        },

    },
}
</script>