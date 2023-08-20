<template>
    <div>
        <div>
            <v-row>
                <v-col cols="12" class="d-flex justify-end">
                    <v-btn color="blue-grey lighten-5" @click="dialog = true">
                        <span class="mdi mdi-cog text-h6"></span>Setting
                    </v-btn>
                </v-col>
            </v-row>
        </div>

        <v-dialog v-model="dialog" max-width="400px">
            <v-card>
                <v-card-title>
                    ตั้งค่าเรดราคา
                </v-card-title>
                <v-card-text>
                    <v-btn color="primary" dark @click="dialog2 = !dialog2, subject()" class="mb-3">
                        ราคาต่อวิชา
                    </v-btn> <br>
                    <v-btn color="primary" dark @click="dialog3 = !dialog3, level_search()" class="mb-3">
                        ราคาต่อระดับชั้น
                    </v-btn> <br>
                    <v-btn color="primary" dark @click="dialog4 = !dialog4, type_search()" class="mb-3">
                        ราคา Type & Tier FlipClass
                    </v-btn> <br>
                    <v-btn color="primary" dark @click="dialog8 = !dialog8, type_private_search()" class="mb-3">
                        ราคา Type & Tier PrivateClass
                    </v-btn> <br>
                    <v-btn color="primary" dark @click="dialog5 = !dialog5, sheet_search()" class="mb-3">
                        ราคา Sheets
                    </v-btn> <br>
                    <v-btn color="primary" dark @click="dialog6 = !dialog6, style_search()" class="mb-3">
                        ราคารูปแบบการสอน
                    </v-btn> <br>
                    <v-btn color="primary" dark @click="dialog7 = !dialog7, optional_search() " class="mb-3">
                        ราคา Optional
                    </v-btn>      
                    <v-btn color="primary" dark @click="dialog9 = !dialog9, send_rate_search() " class="mb-3">
                        หัก%การส่งข้อมูลล่าช้า
                    </v-btn>              
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>รายวิชา</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-row v-for="item in subject_all" :key="item.key">
                        <v-col cols="8">
                            <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Amount" type="number" v-model="item.bath" prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog2 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="save_subject()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog3" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>ระดับชั้นการศึกษา</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    เพิ่มระดับการศึกษา
                    <v-text-field label="name" type="text" v-model="level.name"></v-text-field>
                    <v-text-field label="Amount" type="number" v-model="level.bath" prefix="฿"></v-text-field>
                    <v-btn @click="save_level" :disabled="!level.name || !level.bath">Add</v-btn>
                    <hr>
                    <v-row v-for="item in level_all" :key="item.key">
                        <v-col cols="4">
                            <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field label="Amount" type="number" v-model="item.bath" prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog3 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="save_level_bath()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog4" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>TYPE & TIER FlipClass</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    เพิ่ม TYPE & TIER FlipClass
                    <v-text-field label="name" type="text" v-model="type.name"></v-text-field>
                    <v-text-field label="Amount" type="number" v-model="type.bath" prefix="฿"></v-text-field>
                    <v-btn @click="save_type_add()" :disabled="!type.name || !type.bath">Add</v-btn>
                    <hr>
                    <v-row v-for="item in type_all" :key="item.key">
                        <v-col cols="8">
                            <v-text-field v-model="item.name"></v-text-field>
                            <!-- <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader> -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Amount" type="number" v-model="item.bath" prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog4 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="save_type_bath()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog5" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>Sheets สื่อการสอน</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    เพิ่ม Sheets
                    <v-text-field label="name" type="text" v-model="sheet.name"></v-text-field>
                    <v-text-field label="Amount" type="number" v-model="sheet.bath" prefix="฿"></v-text-field>
                    <v-btn @click="save_sheet_add()" :disabled="!sheet.name || !sheet.bath">Add</v-btn>
                    <hr>
                    <v-row v-for="item in sheet_all" :key="item.key">
                        <v-col cols="6">
                            <v-text-field v-model="item.name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Amount" type="number" v-model="item.bath" prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog5 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="save_sheet_bath()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog6" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>รูปแบบการสอน</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-row v-for="item in style_all" :key="item.key">
                        <v-col cols="8">
                            <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Amount" type="number" v-model="item.bath" prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog6 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="save_style_bath()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog7" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>Optional</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    เพิ่ม optional
                    <v-text-field label="name" type="text" v-model="optional.name"></v-text-field>
                    <v-text-field label="Amount" type="number" v-model="optional.bath" prefix="฿"></v-text-field>
                    <v-btn @click="save_optional_add()" :disabled="!optional.name || !optional.bath">Add</v-btn>
                    <hr>
                    <v-row v-for="item in optional_all" :key="item.key">
                        <v-col cols="6">
                            <v-text-field v-model="item.name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Amount" type="number" v-model="item.bath" prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog7 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="dialog7 = false">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog8" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>TYPE & TIER PrivateClass</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    เพิ่ม TYPE & TIER PrivateClass
                    <v-text-field label="name" type="text" v-model="type_private.name"></v-text-field>
                    <v-text-field label="Amount" type="number" v-model="type_private.bath" prefix="฿"></v-text-field>
                    <v-btn @click="save_type_private_add()" :disabled="!type_private.name || !type_private.bath">Add</v-btn>
                    <hr>
                    <v-row v-for="item in type_private_all" :key="item.key">
                        <v-col cols="8">
                            <v-text-field v-model="item.name"></v-text-field>
                            <!-- <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader> -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Amount" type_private="number" v-model="item.bath" prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog8 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="save_type_private_bath()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog9" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>Send Rate</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    แก้ไขการเช็คสาย ส่งสาย
                    <v-text-field label="name" type="text" v-model="send_rate.name"></v-text-field>
                    <v-text-field label="Amount" type="number" v-model="send_rate.bath" prefix="%"></v-text-field>
                    <v-btn @click="save_send_rate_add()" :disabled="!send_rate.name || !send_rate.bath">Add</v-btn>
                    <hr>
                    <v-row v-for="item in send_rate_all" :key="item.key">
                        <v-col cols="8">
                            <v-text-field v-model="item.name"></v-text-field>
                            <!-- <v-subheader style="font-size: 20px;">{{ item.name }}</v-subheader> -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Amount" send_rate="number" v-model="item.bath" prefix="%"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog9 = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="save_send_rate_bath()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            dialog6: false,
            dialog7: false,
            dialog8: false,
            dialog9: false,

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
        },
        save_type_bath(){
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
        },
        save_type_private_bath(){
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
        save_sheet_add(){
            const db = this.$fireModule.database();
            db.ref(`sheet_all/`).push({
                name: this.sheet.name,
                bath: this.sheet.bath,
            })
            console.log('success save sheet');
        },
        save_sheet_bath(){
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
        save_style_bath(){
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
        save_optional_add(){
            const db = this.$fireModule.database();
            db.ref(`optional_all/`).push({
                name: this.optional.name,
                bath: this.optional.bath,
            })
            console.log('success save optional');
        },
        save_optional_bath(){
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

        send_rate_search(){
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
        save_send_rate_add(){
            const db = this.$fireModule.database();
            db.ref(`send_rate_all/`).push({
                name: this.send_rate.name,
                bath: this.send_rate.bath,
            })
            console.log('success save send_rate');
        },
        save_send_rate_bath(){
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
        
    }
}
</script>