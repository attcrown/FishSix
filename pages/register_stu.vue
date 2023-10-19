<template>
    <div>
        <div class="text-center" style="font-size:24px; background-color: rgba(112, 49, 3, 0.589);">
            สมัครสมาชิคนักเรียน
        </div>
        <v-form ref="form" v-model="valid" lazy-validation class="container" style="max-width:500px">

            <div class="text-center ">
                <img :src="require('@/assets/fishsixLogo.png')" style="max-width: 300px;">
            </div>
            <v-chip style="font-size:16px;" outlined color="green"> ข้อมูลส่วนตัว </v-chip>
            <v-text-field v-model="dataDetail.firstName" :counter="50" :rules="nameRules" label="ชื่อจริง"
                required></v-text-field>
            <v-text-field v-model="dataDetail.lastName" :counter="50" :rules="nameRules" label="นามสกุล"
                required></v-text-field>
            <v-text-field v-model="dataDetail.nickname" :counter="50" :rules="nameRules" label="ชื่อเล่น"
                required></v-text-field>
            <v-text-field v-model="dataDetail.studentMobile" :counter="10" :rules="phoneRules" label="เบอร์โทรศัพท์"
                type="number" required></v-text-field>

            <v-text-field v-model="dataDetail.email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-select v-model="dataDetail.sex" :items="items" :rules="[v => !!v || 'ระบุเพศ']" label="เพศ"
                required></v-select>

            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'กรุณายืนยันข้อมูล']" label="ตรวจสอบข้อมูลถูกต้อง?"
                required></v-checkbox>
            <div class="text-center">
                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                    ยืนยันข้อมูล
                </v-btn>
            </div>
        </v-form>

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <!-- <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Open Dialog
                    </v-btn>
                </template> -->
                <v-card>
                    <v-card-title >
                        สมัครสมาชิคสำเร็จ
                    </v-card-title>
                    <v-card-text>กรุณารอพนักงานตรวจสอบ</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>   
                            <router-link to="/login">
                                <v-btn color="green darken-1" text @click="dialog = false">
                                    ตกลง
                                </v-btn>
                            </router-link>                   
                        <v-spacer></v-spacer> 
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

    </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
export default {
    layout: 'register',
    data: () => ({
        dialog: false,
        dataDetail: {},
        valid: true,
        checkbox: null,
        phoneRules: [
            v => !!v || 'กรุณากรอกข้อมูล',
            v => (v && v.length <= 10) || 'ใส่ได้มากสุด 10 ตัวเลข',
        ],
        nameRules: [
            v => !!v || 'กรุณากรอกข้อมูล',
            v => (v && v.length <= 50) || 'ใส่ได้มากสุด 50 ตัวอักษร',
        ],
        emailRules: [
            v => !!v || 'E-mail ไม่ถูกต้อง',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        items: [
            'ชาย',
            'หญิง',
            'ไม่ระบุ',
        ],
    }),

    methods: {
        validate() {
            this.$refs.form.validate()
            console.log(this.$refs.form.validate());
            if (this.$refs.form.validate()) {
                this.saveData(this.dataDetail);
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        saveData(items) {
            const uniqueId = uuidv4();
            items.status = "user";   
            items.createdAt = new Date(); 
            console.log(uniqueId ,items);
            
            const db = this.$fireModule.database()
            db.ref(`student_register/`).update({
                [uniqueId]: items,
            }).then(() => {
                this.dialog = true;
            })
        }
    },
}
</script>