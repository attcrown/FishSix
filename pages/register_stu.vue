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
            <v-text-field v-model="dataDetail.studentMobile" :counter="10" :rules="phoneRules" label="เบอร์โทรศัพท์นักเรียน"
                type="number" required></v-text-field>
            <v-text-field v-model="dataDetail.parentMobile" :counter="10" :rules="phoneRules" label="เบอร์โทรศัพท์ผู้ปกครอง"
                type="number" required></v-text-field>
            <v-text-field v-model="dataDetail.email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-select v-model="dataDetail.sex" :items="items" :rules="[v => !!v || 'ระบุเพศ']" label="เพศ"
                required></v-select>

            <v-chip style="font-size:16px;" outlined color="green" class="mt-3 mb-3"> ที่อยู่ปัจจุบัน </v-chip>
            <v-text-field v-model="dataDetail.address.houseNo" :rules="addressRules" label="บ้านเลขที่"
                required></v-text-field>

            <v-combobox v-model="dataDetail.address.amphoe" clearable :items="amphoe" :rules="[v => !!v || 'ระบุข้อมูล']"
                label="เขต/อำเภอ"></v-combobox>

            <v-combobox v-model="dataDetail.address.tambon" clearable :items="tambons" :rules="[v => !!v || 'ระบุข้อมูล']"
                label="เเขวง/ตำบล"></v-combobox>

            <v-combobox v-model="dataDetail.address.province" clearable :items="province"
                :rules="[v => !!v || 'ระบุข้อมูล']" label="จังหวัดฯ"></v-combobox>

            <v-text-field v-model="dataDetail.address.zipcode" :rules="addressRules" label="รหัสไปรษณีย์" type="number"
                required></v-text-field>

            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'กรุณายืนยันข้อมูล']" label="ตรวจสอบข้อมูลถูกต้อง?"
                required></v-checkbox>
            <div class="text-center">
                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                    ยืนยันข้อมูล
                </v-btn>
                <router-link to="/login">
                    <v-btn color="amber lighten-1" class="mr-4" >                       
                        กลับไปหน้า LOGIN
                    </v-btn>
                </router-link>
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
                    <v-card-title>
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
        dataDetail: {
            firstName: '',
            lastName: '',
            nickname: '',
            studentMobile: '',
            email: '',
            sex: '',
            address: {
                houseNo: '',
                amphoe: '',
                province: '',
                tambon: '',
                zipcode: '',
            }
        },
        amphoe: [],
        tambons: [],
        province: [],
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
        addressRules: [
            v => !!v || 'กรุณากรอกข้อมูล'
        ],
        items: [
            'ชาย',
            'หญิง',
            'ไม่ระบุ',
        ],
    }),

    mounted() {
        this.search_amphoe();
        this.search_tambons();
        this.search_province();
    },

    methods: {
        search_amphoe() {
            const db = this.$fireModule.database();
            db.ref("RECORDS_amp/").once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push(childData[key].name_th);
                }
                console.log(item);
                this.amphoe = item;
            })
        },
        search_tambons() {
            const db = this.$fireModule.database();
            db.ref("RECORDS_tambons/").once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push(childData[key].name_th);
                }
                console.log(item);
                this.tambons = item;
            })
        },
        search_province() {
            const db = this.$fireModule.database();
            db.ref("RECORDS_city/").once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push(childData[key].name_th);
                }
                console.log(item);
                this.province = item;
            })
        },

        validate() {
            this.$refs.form.validate()
            console.log(this.$refs.form.validate());

            console.log(this.dataDetail);
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
            console.log(uniqueId, items);

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