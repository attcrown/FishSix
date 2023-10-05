<template>
    <div>
        <div>
            <center>
                <v-img :src="require('~/assets/fishsixlogo.png')" max-width="250"></v-img>    
            </center>
            <h1 class="text-center mb-5">สมัครสมาชิก</h1>
        </div>
        <div>
            <template>
                <v-form ref="form" v-model="valid" lazy-validation class="container">
                    <v-row justify="center">
                        <v-col cols="4">
                            <v-text-field v-model="All_data.name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="All_data.name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="All_data.name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                        </v-col>
                    </v-row>
                    

                    <v-text-field v-model="All_data.email" :rules="emailRules" label="E-mail" required></v-text-field>

                    <v-select v-model="All_data.select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item"
                        required></v-select>

                    <v-checkbox v-model="All_data.checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                        label="Do you agree?" required></v-checkbox>

                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                        Validate
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                        Reset Form
                    </v-btn>

                    <v-btn color="warning" @click="resetValidation">
                        Reset Validation
                    </v-btn>
                </v-form>
            </template>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
export default {
    layout: 'register',
    data: () => ({
        All_data:[],
        valid: true,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
    }),

    methods: {
        validate() {
            this.$refs.form.validate()
            console.log(this.All_data);
        },
        reset() {
            this.$refs.form.reset()
            console.log(this.All_data);
        },
        resetValidation() {
            this.$refs.form.resetValidation()
            console.log(this.All_data);
        },
    },
}
</script>