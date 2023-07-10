<template>
    <div class="container-fluid">
        <v-row>

            <div class="col-sm-12">
                <div class="d-flex justify-center align-center">
                    <v-sheet class="pa-1 text-center rounded-5 m-2" style="background: #F5F6F7 ;width: 500px;">
                        <v-sheet style="background: rgba(255, 255, 255, 0.918)" class="rounded-5 p-4 m-3" elevation="16">
                            <form class="">
                                <v-text-field v-model="name" :error-messages="nameErrors" :counter="10" label="Username"
                                    required @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>

                                <v-text-field v-model="pass" :error-messages="passErrors" :counter="20" label="Password"
                                    type="password" required @input="$v.pass.$touch()"
                                    @blur="$v.pass.$touch()"></v-text-field>

                                <v-text-field v-model="conpass" :error-messages="conpassErrors" :counter="20"
                                    label="Confirm Password" type="password" required @input="$v.pass.$touch()"
                                    @blur="$v.pass.$touch()"></v-text-field>

                                <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required
                                    @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>

                                <v-select v-model="select" :items="items" :error-messages="selectErrors" label="sex"
                                    required @change="$v.select.$touch()" @blur="$v.select.$touch()"></v-select>

                                <v-select v-model="status" :items="status_items" :error-messages="statusErrors"
                                    label="ตำแหน่ง" required @change="$v.status.$touch()"
                                    @blur="$v.status.$touch()"></v-select>

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
        </v-row>
    </div>
</template>
<script>
export default {
    layout: 'default',
    data() {
        return {
            firstname: null,
            lastName: null,
            nickname: null,
            mobile: null,
            email: null,
            currJob: null,
            address: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },
            currAddress: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },
            idCardNumber: null,
            contract: null,
            workType: null,
            startDate: null,
            university: null,
            faculty: null,
            major: null,
            subjects: [
                {
                    subjectName:null,
                    level:null,
                },
             
            ]
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {

    },
}
</script>