<template>
    <div>
        <div>
            <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                    <p style="font-size:32px"><b>เงินเดือนครู</b></p>
                    <v-btn color="blue-grey lighten-5" @click="overlay = !overlay">
                        <span class="mdi mdi-cog text-h6"></span>Setting
                    </v-btn>
                </v-col>
            </v-row>
        </div>

        <v-dialog v-model="dialog2" max-width="585px">
            <v-card class="p-3 rounded-l-xl">
                <v-card-title class="mb-10">
                    <span class="ms-4">ราคาต่อวิชา</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog2 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row v-for="item in subject_all" :key="item.key" style="margin-top: -24px;">
                        <v-col cols="8" class="mt-6">
                            <p class="ms-4" style="font-size: 16px; color:black">{{ item.name }}</p>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="ค่าสอน" type="number" v-model="item.bath" suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_subject(), dialog2 = false">บันทึก <span
                            class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog3" max-width="585px">
            <v-card class="p-3 rounded-l-xl">
                <v-card-title class="mb-10">
                    <span class="ms-4">ราคาต่อระดับชั้นการศึกษา</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog3 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <!-- เพิ่มระดับการศึกษา
                    <v-text-field label="name" type="text" v-model="level.name"></v-text-field>
                    <v-text-field label="Amount" type="number" v-model="level.bath" prefix="฿"></v-text-field>
                    <v-btn @click="save_level" :disabled="!level.name || !level.bath">Add</v-btn>
                    <hr> -->
                    <v-row v-for="item in level_all" :key="item.key" style="margin-top: -24px;">
                        <v-col cols="8" class="mt-6">
                            <p class="ms-4" style="font-size: 16px; color:black">{{ item.name }}</p>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="ค่าสอน" type="number" v-model="item.bath" suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_level_bath(), dialog3 = false">บันทึก
                        <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog4" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span>ราคาต่อ Type & Tier Private class</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog4 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex">
                        <v-text-field class="me-3" label="เพิ่ม Type & Tier" type="text" v-model="type.name"></v-text-field>
                        <v-text-field class="me-3" label="ค่าสอน" type="number" v-model="type.bath"
                            suffix="บาท"></v-text-field>
                        <v-btn class="ms-3 mt-3 white--text" @click="save_type_add()" :disabled="!type.name || !type.bath"
                            color="#322E2B" rounded>
                            เพิ่ม<span class="mdi mdi-plus text-h6"></span>
                        </v-btn>
                    </div>
                    <hr style="color:black;">
                    <v-row v-for="item in type_all" :key="item.key">
                        <v-col cols="8">
                            <v-text-field v-model="item.name"></v-text-field>
                            <!-- <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader> -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="ค่าสอน" type="number" v-model="item.bath" suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_type_bath(), dialog4 = false">บันทึก <span
                            class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog5" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span>ราคาต่อสื่อการสอน</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog5 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex">
                        <v-text-field class="me-3" label="เพิ่มสื่อการสอน" type="text" v-model="sheet.name"></v-text-field>
                        <v-text-field class="me-3" label="ค่าสอน" type="number" v-model="sheet.bath"
                            suffix="บาท"></v-text-field>
                        <v-btn class="ms-3 mt-3 white--text" @click="save_sheet_add()"
                            :disabled="!sheet.name || !sheet.bath" color="#322E2B" rounded>
                            เพิ่ม<span class="mdi mdi-plus text-h6"></span>
                        </v-btn>
                    </div>
                    <hr>
                    <v-row v-for="item in sheet_all" :key="item.key">
                        <v-col cols="6">
                            <v-text-field v-model="item.name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="ค่าสอน" type="number" v-model="item.bath" suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_sheet_bath(), dialog5 = false">บันทึก
                        <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog6" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span class="ms-4">รูปแบบการสอน</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog6 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row v-for="item in style_all" :key="item.key" style="margin-top: -24px;">
                        <v-col cols="8" class="mt-6">
                            <p class="ms-4" style="font-size: 16px; color:black">{{ item.name }}</p>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="ค่าสอน" type="number" v-model="item.bath" suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_style_bath(), dialog6 = false">บันทึก
                        <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog7" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span>ราคาทดลองเรียน</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog7 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex">
                        <v-text-field class="me-3" label="เพิ่มทดลองเรียน" type="text"
                            v-model="optional.name"></v-text-field>
                        <v-text-field class="me-3" label="ค่าสอน" type="number" v-model="optional.bath"
                            suffix="บาท"></v-text-field>
                        <v-btn class="ms-3 mt-3 white--text" @click="save_optional_add()"
                            :disabled="!optional.name || !optional.bath" color="#322E2B" rounded>
                            เพิ่ม<span class="mdi mdi-plus text-h6"></span>
                        </v-btn>
                    </div>
                    <hr>
                    <v-row v-for="item in optional_all" :key="item.key">
                        <v-col cols="6">
                            <v-text-field v-model="item.name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="ค่าสอน" type="number" v-model="item.bath" suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_optional_bath(), dialog7 = false">บันทึก
                        <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog8" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span>ราคาต่อ TYPE & TIER PrivateClass</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog8 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex">
                        <v-text-field class="me-3" label="เพิ่ม Type & Tier" type="text"
                            v-model="type_private.name"></v-text-field>
                        <v-text-field class="me-3" label="ค่าสอน" type="number" v-model="type_private.bath"
                            suffix="บาท"></v-text-field>
                        <v-btn class="ms-3 mt-3 white--text" @click="save_type_private_add()"
                            :disabled="!type_private.name || !type_private.bath" color="#322E2B" rounded>
                            เพิ่ม<span class="mdi mdi-plus text-h6"></span>
                        </v-btn>
                    </div>
                    <hr>
                    <v-row v-for="item in type_private_all" :key="item.key">
                        <v-col cols="8">
                            <v-text-field v-model="item.name"></v-text-field>
                            <!-- <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader> -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="ค่าสอน" type_private="number" v-model="item.bath"
                                suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark
                        @click="save_type_private_bath(), dialog8 = false">บันทึก <span
                            class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog9" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span>หัก %</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog9 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <!-- <v-text-field label="name" type="text" v-model="send_rate.name"></v-text-field>
                    <v-text-field label="ค่าสอน" type="number" v-model="send_rate.bath" prefix="%"></v-text-field>
                    <v-btn @click="save_send_rate_add()" :disabled="!send_rate.name || !send_rate.bath">Add</v-btn>
                    <hr> -->
                    <v-row v-for="item in send_rate_all" :key="item.key">
                        <v-col cols="8">
                            <v-text-field v-model="item.name"></v-text-field>
                            <!-- <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader> -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="ค่าสอน" send_rate="number" v-model="item.bath" prefix="%"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_send_rate_bath(), dialog4 = false">บันทึก
                        <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog10" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span>เรทกรณีพิเศษ</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog10 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex">
                        <v-text-field  class="me-3" label="เพิ่มเรทกรณีพิเศษ" type="text" v-model="rate_special.name"></v-text-field>
                        <v-text-field class="me-3" label="ค่าสอน" type="number" v-model="rate_special.bath" suffix="บาท"></v-text-field>
                        <v-btn class="ms-3 mt-3 white--text" @click="save_rate_special_add()"
                            :disabled="!rate_special.name || !rate_special.bath" color="#322E2B" rounded>
                            เพิ่ม<span class="mdi mdi-plus text-h6"></span>
                        </v-btn>
                    </div>
                    <hr>
                    <v-row v-for="item in rate_special_all" :key="item.key">
                        <v-col cols="6">
                            <v-text-field v-model="item.name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="ค่าสอน" type="number" v-model="item.bath" suffix="บาท"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_rate_special_bath(), dialog10 = false">บันทึก
                        <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog11" max-width="585px">
            <v-card class="p-3 rounded-xl">
                <v-card-title class="mb-10">
                    <span class="ms-4">จำนวนคนใน Class</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="dialog11 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <!-- เพิ่ม จำนวนคนในClass
                    <v-text-field label="name" type="text" v-model="LimitedClass.name"></v-text-field>
                    <v-text-field label="จำนวน" type="number" v-model="LimitedClass.bath"></v-text-field>
                    <v-btn @click="save_LimitedClass_add()" :disabled="!LimitedClass.name || !LimitedClass.bath">Add</v-btn>
                    <hr> -->
                    <v-row v-for="item in LimitedClass_all" :key="item.key">
                        <v-col cols="6">
                            <v-text-field v-model="item.name" readonly></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="จำนวน" type="number" v-model="item.bath" suffix="คน"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" class="mb-5" dark @click="save_LimitedClass_bath(), dialog11 = false">บันทึก
                        <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-overlay :value="overlay" class="d-flex justify-end align-start">
            <v-card style="background-color: white; color:black;" max-width="400px" height="1000px">
                <v-card-title>
                    <span class="me-16">ตั้งค่าเรทราคา</span>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-16" fab dark small color="#37474F" @click="overlay = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-btn color="#322E2B" rounded dark @click="dialog2 = !dialog2, subject()" class="mb-3 mt-5">
                        ราคาต่อวิชา
                    </v-btn> <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog3 = !dialog3, level_search()" class="mb-3 mt-5">
                        ราคาต่อระดับชั้น
                    </v-btn> <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog4 = !dialog4, type_search()" class="mb-3 mt-5">
                        ราคา Type & Tier FlipClass
                    </v-btn> <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog8 = !dialog8, type_private_search()"
                        class="mb-3 mt-5">
                        ราคา Type & Tier PrivateClass
                    </v-btn> <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog5 = !dialog5, sheet_search()" class="mb-3 mt-5">
                        ราคาสื่อการสอน
                    </v-btn> <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog6 = !dialog6, style_search()" class="mb-3 mt-5">
                        ราคารูปแบบการสอน
                    </v-btn> <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog7 = !dialog7, optional_search()" class="mb-3 mt-5">
                        ราคาทดลองเรียน
                    </v-btn>
                    <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog9 = !dialog9, send_rate_search()" class="mb-3 mt-5">
                        หัก % การส่งข้อมูลล่าช้า
                    </v-btn>
                    <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog10 = !dialog10, rate_special_search()"
                        class="mb-3 mt-5">
                        ราคาเรทกรณีพิเศษ
                    </v-btn>
                    <br>
                    <v-btn color="#322E2B" rounded dark @click="dialog11 = !dialog11, LimitedClass_search()"
                        class="mb-3 mt-5">
                        จำนวนคนใน Class
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-overlay>

    </div>
</template>
<script>
export default {
    data() {
        return {
            overlay: false,

            dialog: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            dialog6: false,
            dialog7: false,
            dialog8: false,
            dialog9: false,
            dialog10: false,
            dialog11: false,

            subject_all: [],
            level: [],
            level_all: [],
            type: [],
            type_all: [],
            sheet: [],
            sheet_all: [],
            style: [],
            style_all: [],
            optional: [],
            optional_all: [],
            type_private: [],
            type_private_all: [],
            send_rate: [],
            send_rate_all: [],
            rate_special: [],
            rate_special_all: [],
            LimitedClass: [],
            LimitedClass_all: [],
        }
    },
    methods: {
        subject() {
            const db = this.$fireModule.database();
            db.ref(`subject_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (key != '00000') {
                        item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                    }

                }
                this.subject_all = item;
            })
        },

        save_subject() {
            const db = this.$fireModule.database();
            for (const key in this.subject_all) {
                console.log(this.subject_all[key]);
                db.ref(`subject_all/${this.subject_all[key].key}/`).update({
                    bath: this.subject_all[key].bath,
                })
            }
            console.log('success save subject');
        },

        level_search() {
            const db = this.$fireModule.database();
            db.ref(`level_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.level_all = item;
                console.log(this.level_all);
            })
        },
        save_level_bath() {
            const db = this.$fireModule.database();
            for (const key in this.level_all) {
                console.log(this.level_all[key]);
                db.ref(`level_all/${this.level_all[key].key}/`).update({
                    bath: this.level_all[key].bath,
                })
            }
            console.log('success save level bath');
        },
        save_level() {
            const db = this.$fireModule.database();
            db.ref(`level_all/`).push({
                name: this.level.name,
                bath: this.level.bath,
            })
            console.log('success save level');
            this.level_search();
            this.level = [];
        },

        type_search() {
            const db = this.$fireModule.database();
            db.ref(`type_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.type_all = item;
                console.log(this.type_all);
            })
        },
        save_type_add() {
            const db = this.$fireModule.database();
            db.ref(`type_all/`).push({
                name: this.type.name,
                bath: this.type.bath,
            })
            console.log('success save type');
            this.type_search();
            this.type = [];
        },
        save_type_bath() {
            const db = this.$fireModule.database();
            for (const key in this.type_all) {
                console.log(this.type_all[key]);
                db.ref(`type_all/${this.type_all[key].key}/`).update({
                    bath: this.type_all[key].bath,
                    name: this.type_all[key].name,
                })
            }
            console.log('success save type bath');
        },

        type_private_search() {
            const db = this.$fireModule.database();
            db.ref(`type_private_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.type_private_all = item;
                console.log(this.type_private_all);
            })
        },
        save_type_private_add() {
            const db = this.$fireModule.database();
            db.ref(`type_private_all/`).push({
                name: this.type_private.name,
                bath: this.type_private.bath,
            })
            console.log('success save type_private');
            this.type_private_search();
            this.type_private = [];
        },
        save_type_private_bath() {
            const db = this.$fireModule.database();
            for (const key in this.type_private_all) {
                console.log(this.type_private_all[key]);
                db.ref(`type_private_all/${this.type_private_all[key].key}/`).update({
                    bath: this.type_private_all[key].bath,
                    name: this.type_private_all[key].name,
                })
            }
            console.log('success save type_private bath');
        },

        sheet_search() {
            const db = this.$fireModule.database();
            db.ref(`sheet_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.sheet_all = item;
                console.log(this.sheet_all);
            })
        },
        save_sheet_add() {
            const db = this.$fireModule.database();
            db.ref(`sheet_all/`).push({
                name: this.sheet.name,
                bath: this.sheet.bath,
            })
            console.log('success save sheet');
            this.sheet_search();
            this.sheet = [];
        },
        save_sheet_bath() {
            const db = this.$fireModule.database();
            for (const key in this.sheet_all) {
                console.log(this.sheet_all[key]);
                db.ref(`sheet_all/${this.sheet_all[key].key}/`).update({
                    bath: this.sheet_all[key].bath,
                    name: this.sheet_all[key].name,
                })
            }
            console.log('success save sheet bath');
        },

        style_search() {
            const db = this.$fireModule.database();
            db.ref(`location/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.style_all = item;
                console.log(this.style_all);
            })
        },
        save_style_bath() {
            const db = this.$fireModule.database();
            for (const key in this.style_all) {
                console.log(this.style_all[key]);
                db.ref(`location/${this.style_all[key].key}/`).update({
                    bath: this.style_all[key].bath,
                    // name: this.style_all[key].name,
                })
            }
            console.log('success save style bath');
        },

        optional_search() {
            const db = this.$fireModule.database();
            db.ref(`optional_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.optional_all = item;
                console.log(this.optional_all);
            })
        },
        save_optional_add() {
            const db = this.$fireModule.database();
            db.ref(`optional_all/`).push({
                name: this.optional.name,
                bath: this.optional.bath,
            })
            console.log('success save optional');
            this.optional_search();
            this.optional = [];
        },
        save_optional_bath() {
            const db = this.$fireModule.database();
            for (const key in this.optional_all) {
                console.log(this.optional_all[key]);
                db.ref(`optional_all/${this.optional_all[key].key}/`).update({
                    bath: this.optional_all[key].bath,
                    name: this.optional_all[key].name,
                })
            }
            console.log('success save optional bath');
        },

        send_rate_search() {
            const db = this.$fireModule.database();
            db.ref(`send_rate_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.send_rate_all = item;
                console.log(this.send_rate_all);
            })
        },
        save_send_rate_add() {
            const db = this.$fireModule.database();
            db.ref(`send_rate_all/`).push({
                name: this.send_rate.name,
                bath: this.send_rate.bath,
            })
            console.log('success save send_rate');
            this.send_rate_search();
            this.send_rate = [];
        },
        save_send_rate_bath() {
            const db = this.$fireModule.database();
            for (const key in this.send_rate_all) {
                console.log(this.send_rate_all[key]);
                db.ref(`send_rate_all/${this.send_rate_all[key].key}/`).update({
                    bath: this.send_rate_all[key].bath,
                    name: this.send_rate_all[key].name,
                })
            }
            console.log('success save send_rate bath');
        },

        rate_special_search() {
            const db = this.$fireModule.database();
            db.ref(`rate_special_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.rate_special_all = item;
                console.log(this.rate_special_all);
            })
        },
        save_rate_special_add() {
            const db = this.$fireModule.database();
            db.ref(`rate_special_all/`).push({
                name: this.rate_special.name,
                bath: this.rate_special.bath,
            })
            console.log('success save rate_special');
            this.rate_special_search();
            this.rate_special = [];
        },
        save_rate_special_bath() {
            const db = this.$fireModule.database();
            for (const key in this.rate_special_all) {
                console.log(this.rate_special_all[key]);
                db.ref(`rate_special_all/${this.rate_special_all[key].key}/`).update({
                    bath: this.rate_special_all[key].bath,
                    name: this.rate_special_all[key].name,
                })
            }
            console.log('success save rate_special bath');
        },

        LimitedClass_search() {
            const db = this.$fireModule.database();
            db.ref(`LimitedClass_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.LimitedClass_all = item;
                console.log(this.LimitedClass_all);
            })
        },
        save_LimitedClass_add() {
            const db = this.$fireModule.database();
            db.ref(`LimitedClass_all/`).push({
                name: this.LimitedClass.name,
                bath: this.LimitedClass.bath,
            })
            console.log('success save LimitedClass');
            this.LimitedClass_search();
            this.LimitedClass = [];
        },
        save_LimitedClass_bath() {
            const db = this.$fireModule.database();
            for (const key in this.LimitedClass_all) {
                console.log(this.LimitedClass_all[key]);
                db.ref(`LimitedClass_all/${this.LimitedClass_all[key].key}/`).update({
                    bath: this.LimitedClass_all[key].bath,
                    name: this.LimitedClass_all[key].name,
                })
            }
            console.log('success save LimitedClass bath');
        },
    }
}
</script>