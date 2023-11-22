<template>
    <div>
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="p-3 px-10 mt-3 rounded-xxl" style="background-color:#EBE4DE" elevation="10">
                    <v-autocomplete auto-select-first clearable v-model="selectitem" :items="Object.values(data_stu_copy)"
                        :item-text="item => item.name + ' ' + item.firstName" :item-value="item => item" @input="check()"
                        append-icon="mdi-magnify"></v-autocomplete>
                </v-card>
            </v-col>
            <v-col v-if="selectitem" cols="auto">
                <v-card elevation="10" class="d-flex rounded-xxl mt-3" style="background-color:#EBE4DE" height="315px">
                    <div class="d-flex align-center justify-center">
                        <v-avatar size="164" class="ms-5">
                            <v-img v-if="!selectitem.profilePic" class="text-center">
                                <v-icon style=" font-size: 164px;" color="grey">
                                    mdi-account-circle
                                </v-icon>
                            </v-img>
                            <v-img v-if="selectitem.profilePic" :src="selectitem.profilePic"></v-img>
                        </v-avatar>
                    </div>
                    <v-card-text class="me-3 ms-3">
                        <p style="font-size:20px" class="mt-5"><b>รหัสนักเรียน : {{ selectitem.name }}</b></p>
                        <p style="color: #322E2B;">ชื่อเล่น</p>
                        <p style="margin-top:-15px; font-size:20px"><b>{{ selectitem.nickname }}</b></p>
                        <p style="color: #322E2B;">ชื่อจริง</p>
                        <p style="margin-top:-15px; font-size:20px"><b>{{ selectitem.firstName }}</b></p>
                        <p style="color: #322E2B;">นามสกุล</p>
                        <p style="margin-top:-15px; font-size:20px"><b>{{ selectitem.lastName }}</b></p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-if="selectitem">
                <v-card elevation="10" class="rounded-xxl mt-3 ms-3" style="background-color:#EBE4DE" max-width="1300"
                    max-height="400px">
                    <v-card-text class="d-flex align-center">
                        <p style="font-size:20px" class="mt-5"><b>จำนวนชั่วโมงที่มีอยู่</b></p>
                        <v-chip class="ms-4" style="font-size:16px" color="#AD382F" dark>Flip class {{
                            min_change(selectitem.hourLeft) }} ชั่วโมง</v-chip>
                        <v-chip class="ms-4" style="font-size:16px" color="#26415B" dark>Private class {{
                            min_change(selectitem.privateHourLeft) }} ชั่วโมง</v-chip>
                    </v-card-text>

                    <v-card style="background-color:white;" class="px-8 pt-5 mb-8 mx-5" elevation="10">
                        <v-form ref="form" v-model="valid" lazy-validation class="d-flex">
                            <v-select filled :items="itemsFC" label="flipclass" :rules="[v => !!v || 'Item is required']"
                                @change="summath()" class="me-5" v-model="flipclass" required></v-select>
                            <v-icon class="text-h3">mdi-compare-horizontal</v-icon>
                            <v-select filled :items="itemsPV" label="privateclass" :rules="[v => !!v || 'Item is required']"
                                @change="summathprivate()" class="ms-5" v-model="privateclass" required></v-select>
                            <v-btn :disabled="!valid" color="success" class="ms-6 mt-4" @click="validate">
                                ยืนยัน
                            </v-btn>
                            <!-- <v-btn color="error" class="mr-4" @click="reset">
                                Reset Form
                            </v-btn> -->
                        </v-form>
                    </v-card>

                    <v-divider style="border-top-width: 3px;" color="black"></v-divider>

                    <v-card-text class="d-flex align-center" style="margin-top: -24px;">
                        <p style="font-size:20px" class="mt-5"><b>จำนวนชั่วโมงล่าสุด</b></p>
                        <v-chip class="ms-4" style="font-size:16px" color="#AD382F" dark>Flip class {{
                            min_change(newhourLeft) }} ชั่วโมง</v-chip>
                        <v-chip class="ms-4" style="font-size:16px" color="#26415B" dark>Private class {{
                            min_change(newprivateHourLeft) }} ชั่วโมง</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-snackbar v-model="snackbar" :timeout="3000" tile :color="colorsnackbar">
            {{ textalret }}
            <template v-slot:action="{ attrs }">
                <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>

    </div>
</template>
<script>
import { CheckedEventBus } from './history.vue';
import { mapState } from 'vuex';
import { Timestamp } from "firebase/firestore";
export default {
    data() {
        return {
            data_setting: [],
            property: 'value',
            data_stu_copy: [],
            selectitem: null,

            newhourLeft: 0,
            newprivateHourLeft: 0,

            valid: true,
            flipclass: 0,
            privateclass: 0,
            nameRules: [
                v => !!v || 'Null',
            ],

            textalret: 'Error',
            snackbar: false,
            colorsnackbar: " ",

            itemsFC: [],
            itemsPV: [],
        };
    },
    computed: {
        ...mapState(['firstName', 'status']),
    },
    mounted() {
        this.search_stu();
        this.setting_rate();
    },
    methods: {
        async search_stu() {
            await this.$nextTick();
            console.log('>>>', this.firstName, this.status);
            let x = "";
            if(this.status === "user"){
                x = `user/${this.firstName}`;
                const db = this.$fireModule.database();
                db.ref(`${x}`).on("value", (snapshot) => {
                    let userData = snapshot.val();
                    let id = { idkey: this.firstName };
                    userData = { ...userData, ...id };
                    let obje = {[this.firstName]:userData};
                    this.data_stu_copy = obje;
                    console.log(obje);
                })
            }else{
                const db = this.$fireModule.database();
                const ref = db.ref(`user`);
                ref.orderByChild("status").equalTo("user").once("value")
                    .then((snapshot) => {
                        let userData = snapshot.val();
                        for (const key in userData) {
                            let id = { idkey: key };
                            userData[key] = { ...userData[key], ...id };
                        }
                        this.data_stu_copy = userData;
                        console.log(this.data_stu_copy);
                    })
                    .catch((error) => {
                        console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูล: ", error);
                    });
            }
        },
        setting_rate() {
            const db = this.$fireModule.database();
            db.ref(`setting_moveHour/-Nj5UsWpQDoZQxQAQrsU`).on("value", (snapshot) => {
                const childData = snapshot.val();
                let id = { idkey: "-Nj5UsWpQDoZQxQAQrsU" }
                this.data_setting = { ...childData, ...id };
                this.select_times();
            })
        },
        check() {
            console.log(this.selectitem);
            if (this.selectitem) {
                this.newhourLeft = parseFloat(this.selectitem.hourLeft);
                this.newprivateHourLeft = parseFloat(this.selectitem.privateHourLeft);
                this.check_send_stu(this.selectitem.idkey);
            } else {
                this.check_send_stu(this.selectitem);
                this.newhourLeft = 0;
                this.newprivateHourLeft = 0;
            }
        },
        async validate() {
            await this.$nextTick();
            console.log('>>>', this.firstName, this.status);

            if (this.$refs.form.validate()) {
                console.log('update', this.newhourLeft, this.newprivateHourLeft);
                if (this.newhourLeft < 0 || this.newprivateHourLeft < 0) {
                    this.snackbar = true;
                    this.textalret = 'ชั่วโมงไม่เพียงพอสำหรับการแลกชั่วโมง';
                    this.colorsnackbar = "red darken-4"
                    return;
                } else if (parseFloat(this.flipclass) % parseFloat(this.data_setting.flipclass) != 0 ||
                    parseFloat(this.privateclass) % parseFloat(this.data_setting.privateclass) != 0) {
                    this.snackbar = true;
                    this.textalret = 'กรุณาปรับให้ชั่วโมงให้เป็นจำนวนเต็ม';
                    this.colorsnackbar = "red darken-4"
                    return;
                } else {
                    const db = this.$fireModule.database();
                    db.ref(`history_move_hour/${this.selectitem.idkey}/`).push({
                        createAt: this.timefirebase(),
                        OldHourLeft: this.selectitem.hourLeft,
                        OldPrivateHourLeft: this.selectitem.privateHourLeft,
                        NewHourLeft: this.newhourLeft,
                        NewPrivateHourLeft: this.newprivateHourLeft,
                        exchange_flipclass: this.flipclass,
                        exchange_privateclass: this.privateclass,
                        Rate_hour: this.data_setting,
                        user_set: this.encode(this.firstName),
                    });

                    db.ref(`user/${this.selectitem.idkey}/`).update({
                        hourLeft: this.newhourLeft,
                        privateHourLeft: this.newprivateHourLeft,
                    }).then(() => {
                        this.snackbar = true;
                        this.textalret = 'บันทึกสำเร็จ';
                        this.colorsnackbar = "light-green darken-2"
                        this.data_stu_copy[this.selectitem.idkey].hourLeft = this.newhourLeft;
                        this.data_stu_copy[this.selectitem.idkey].privateHourLeft = this.newprivateHourLeft;
                        this.reset();
                    });
                }
            }
        },
        reset() {
            this.flipclass = 0;
            this.privateclass = 0;
            this.newhourLeft = 0;
            this.newprivateHourLeft = 0;
        },
        summath() {
            this.newhourLeft = parseFloat(this.selectitem.hourLeft) - parseFloat(this.flipclass);
            this.privateclass = (parseFloat(this.flipclass)) / parseFloat(this.data_setting.flipclass) * parseFloat(this.data_setting.privateclass);
            this.newprivateHourLeft = this.privateclass + parseFloat(this.selectitem.privateHourLeft);
        },
        summathprivate() {
            this.newprivateHourLeft = parseFloat(this.selectitem.privateHourLeft) - parseFloat(this.privateclass);
            this.flipclass = parseFloat(this.privateclass) / parseFloat(this.data_setting.privateclass) * parseFloat(this.data_setting.flipclass);
            this.newhourLeft = this.flipclass + parseFloat(this.selectitem.hourLeft);
        },
        timefirebase() {
            const timestamp = Timestamp.fromDate(new Date());
            const jsDate = timestamp.toDate();
            const isoString = jsDate.toISOString();
            let createdAte = isoString;
            return createdAte;
        },
        encode(a) {
            const encodedData = btoa(encodeURIComponent(a));
            return encodedData;
        },
        check_send_stu(item) {
            CheckedEventBus.$emit('read_history', item, (result) => {
                this.handleCalendarResult(result);
            });
            console.log('check_send_stu');
        },
        handleCalendarResult(result) {
            console.log('result:', result);
        },
        select_times() {
            this.itemsFC = [];
            this.itemsPV = [];
            for (let x = 1; x <= 5; x++) {
                this.itemsFC.push(x * parseFloat(this.data_setting.flipclass));
            }

            for (let x = 1; x <= 5; x++) {
                this.itemsPV.push(x * parseFloat(this.data_setting.privateclass));
            }
        },
        min_change(item) {
            const numberString = item.toString();
            const integerPart0 = parseFloat(numberString.split('.')[0]);
            const integerPart = parseFloat(numberString.split('.')[1]);
            console.log(integerPart);
            let sum = 0;
            if(integerPart){
                sum = integerPart * 60 / 100;
            }
            return `${integerPart0}.${sum}`;
        }
    },
}
</script>