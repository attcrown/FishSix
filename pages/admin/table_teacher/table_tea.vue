<template>
    <div>
        <div class="pt-5">
            <v-row align="center">
                <!-- <v-col cols="12">
                    <div>
                        <div class="subheading">
                            <h3>Teacher</h3>
                        </div>
                        <v-date-picker class="hide-on-desktop" v-model="date1" :events="arrayEvents"
                            :allowed-dates="allowedDates" show-adjacent-months event-color="green lighten-1"
                            @input="dialog_detail = true, mode = 'save', clear_item()"></v-date-picker>
                    </div>
                </v-col> -->
                <v-col cols="12">
                    <v-data-table :items-per-page="-1" :headers="headers" :items="desserts" :search="search_table"
                        sort-by="date" class="elevation-16 rounded-xl">
                        <!--:search="search"-->
                        <template v-slot:top>
                            <v-toolbar flat color="#F8F9FB" class="rounded-t-xl">
                                <v-toolbar-title><b>ตารางสอนครู</b></v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-text-field class="me-10" v-model="search_table" append-icon="mdi-magnify" label="Search"
                                    single-line hide-details style="max-width: 200px;"></v-text-field>

                                <v-dialog v-model="dialogDelete" max-width="300px" class="text-center">
                                    <template v-slot:activator="{}">
                                        <v-btn elevation="10" small dark color="#322E2B" class="mb-2 mt-5 hide-on-mobile"
                                            @click="dialog_detail = true, mode = 'save', clear_item()">
                                            เพิ่มตารางสอน<span class="mdi mdi-plus text-h6"></span>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <v-spacer></v-spacer>
                                            <v-btn fab dark small color="#37474F" @click="closeDelete">
                                                <v-icon dark class="text-h5">
                                                    mdi-close
                                                </v-icon>
                                            </v-btn>
                                        </v-card-title>
                                        <div class="text-center">
                                            <img :src="require('~/assets/Frame.png')">
                                        </div>
                                        <div class="text-center mt-5">
                                            <b>ยืนยันลบตารางสอนหรือไม่</b>
                                        </div>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn rounded color="#29CC39" @click="deleteItemConfirm"
                                                class="mt-5 mb-5">ยืนยัน</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </v-toolbar>
                        </template>
                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                        <template v-slot:item.actions="{ item }">
                            <v-btn text icon elevation="5" @click="editItem(item), dialog_detail = true, mode = 'edit'"
                                v-if="!(parseInt(item.invite) > 0)">
                                <v-icon class="text-h5" color="#26415B">
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                            <v-btn text icon elevation="5" @click="deleteItem(item)" v-if="!(parseInt(item.invite) > 0)">
                                <v-icon class="text-h5" color="#AD382F">
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </div>

        <template>
            <v-dialog v-model="dialog_detail" persistent max-width="600px">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card class="rounded-xl">
                        <v-card-title class="d-flex justify-space-between">
                            <span v-if="mode == 'save'"><b>เพิ่มตารางสอน</b></span>
                            <span v-if="mode == 'edit'"><b>แก้ไขตารางสอน</b></span>
                            <v-btn fab dark small color="#37474F"
                                @click="dialog_detail = false, dialog_select_date = false, clear_item()">
                                <v-icon dark class="text-h5">
                                    mdi-close
                                </v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="12" v-if="mode == 'save'">
                                        <v-text-field v-model="date1" label="วันที่เรียน" @click="dialog_select_date = true"
                                            :rules="rules.text" readonly>
                                            <template #prepend>
                                                <span class="mdi mdi-calendar-outline text-h6"></span>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12" v-if="mode == 'edit'">
                                        <v-text-field v-model="date1" label="วันที่เรียน" readonly>
                                            <template #prepend>
                                                <span class="mdi mdi-calendar-outline text-h6"></span>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-autocomplete v-model="value" :items="items" label="Search teacher"
                                            item-text="name" item-value="key" :readonly="mode == 'edit'"
                                            @change="check_time_start(), search_subject_tea(value), search_style_tea(value)"
                                            @input="check_tea = false" :rules="[v => !!v || 'กรุณาเลือกครู']"
                                            required></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="time_standart" v-model="picker_start" label="เวลาเริ่มต้น"
                                            @change="validateTime(), picker_stop = null"
                                            :rules="[v => !!v || 'กรุณาเลือกเวลา']" :disabled="mode == 'edit'"
                                            required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="time_standart_stop" v-model="picker_stop" @change="validateTime()"
                                            :rules="[v => !!v || 'กรุณาเลือกเวลา']" label="เวลาสิ้นสุด"
                                            :disabled="mode == 'edit'" required></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="12">
                                        <v-select :items="style_subject" item-text="name" item-value="key"
                                            :rules="[v => !!v || 'กรุณาเลือกประเภทคลาส']" label="ประเภทคลาส"
                                            v-model="save_detail.style" required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-select :items="subject" item-text="name" item-value="key" label="วิชาเปิดสอน"
                                            :rules="[v => !!v || 'กรุณาเลือกวิชา']" v-model="save_detail.subject"
                                            required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field label="จำนวนคนที่รับสูงสุดต่อชม." v-model="save_detail.sum_people"
                                            :rules="rules.text" :disabled="mode == 'edit'" type="number"
                                            required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn rounded color="#29CC39" class="mt-5 mb-5" @click="validate()">
                                บันทึก <span class="mdi mdi-content-save text-h6"></span>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>
        </template>

        <template>
            <v-dialog v-model="dialog_save_error" max-width="300px" class="text-center">
                <v-card>
                    <v-card-title>
                    </v-card-title>
                    <div class="text-center">
                        <img :src="require('~/assets/Frame.png')">
                    </div>
                    <div class="text-center mt-5">
                        <b>กรุณากรอกข้อมูลให้ถูกต้อง</b>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded color="#322E2B" @click="dialog_save_error = false" dark
                            class="mt-5 mb-5">ตกลง</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

        <template>
            <v-dialog v-model="dialog_select_date" max-width="350px">
                <v-card class="px-3 text-center" style="background-color: rgba(247, 245, 245, 0.212)">
                    <v-card-title class="text-h6">
                        <!-- <span class="mdi mdi-plus-box"></span> เลือกวันที่สอน -->
                    </v-card-title>
                    <v-date-picker v-model="date1" :events="arrayEvents" multiple :allowed-dates="allowedDates"
                        show-adjacent-months event-color="green lighten-1"></v-date-picker>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded color="#29CC39" dark class="mb-5" @click="dialog_select_date = false, mode = 'save'">
                            ยืนยัน
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

    </div>
</template>
<script>
import { Timestamp } from "firebase/firestore";
export default {
    data: () => ({
        keyuser: null,
        status: null,
        valid: false,
        form: [],
        check_tea: true,
        search_table: '',
        search: '',
        mode: '',
        delday: '',
        save_detail: [],
        dialog_detail: false,
        dialog_time: false,
        dialog_time_stop: false,
        dialog_save_error: false,
        dialog_select_date: false,
        items: [],
        style_subject: [],
        class_flip: [],
        subject: [],
        search_value: null,
        search_style_sub: null,
        search_class: null,
        value: null,
        style_sub: null,
        arrayEvents: [],
        date1: [],

        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'ID',
                align: 'start',
                sortable: false,
                value: 'userid',
            },
            { text: 'ชื่อครู', value: 'name' },
            // { text: 'ประเภทคลาส', value: 'class', align: 'center' },
            { text: 'ประเภทคลาส', value: 'style', align: 'center' },
            { text: 'วิชาที่สอน', value: 'subject', align: 'center' },
            { text: 'วันที่สอน', value: 'date', align: 'center' },
            { text: 'เวลาเริ่มต้น', value: 'time_s', align: 'center' },
            { text: 'เวลาสิ้นสุด', value: 'time_e', align: 'center' },
            { text: 'จำนวนนักเรียน', value: 'sum_people', align: 'center' },
            { text: 'แก้ไขข้อมูล', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,

        hour_tea: 0,
        min_tea: 0,
        time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
        time_standart: [],
        time_standart_stop: [],
        time_standart_sum: [],
        picker_start: null,
        picker_stop: null,

        rules: {
            name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล",
            (val) => /^[0-9]+$/.test(val) || "กรุณากรอกตัวเลขเท่านั้น",],
            text: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
        },
    }),
    components: {

    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        allowedHours() {
            return v => v > this.hour_tea;
        },
        // allowedMinutes() {
        //     return v => v > this.min_tea;
        // },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {

    },

    mounted() {
        this.fullName();
        this.search_date_teacher();
        this.search_teacher();
    },

    methods: {
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.keyuser = sessionStorage.getItem('lastName') || '';
                this.status = sessionStorage.getItem('status') || '';
            } else {
                this.keyuser = localStorage.getItem('lastName') || '';
                this.status = localStorage.getItem('status') || '';
            }
            console.log(">>>>>", this.keyuser, this.status);
        },
        validateTime() {
            if (true) {//this.picker_stop == null) {
                this.time_standart_stop = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.picker_start == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        if (sum > 1) {
                            // console.log(this.time_standart[key]);
                            this.time_standart_stop.push(this.time_standart[key]);
                        }
                    }
                }
            }
            if (this.picker_stop != null && this.picker_start != null) {
                this.time_standart_sum = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.picker_stop == this.time_standart[key]) {
                        sum = 0;
                        // this.time_standart_sum.push(this.time_standart[key]);
                        break;
                    }
                    else if (this.picker_start == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        this.time_standart_sum.push(this.time_standart[key]);
                    }
                }
                console.log(this.time_standart_sum);
            }
            // else {
            //     alert("ลงเวลาไม่ถูกต้อง");
            //     this.close();
            //     this.clear_item();
            // }
        },
        getRandomColor() {
            const randomIndex = Math.floor(Math.random() * this.colors.length)
            const randomColor = this.colors[randomIndex]
            // Remove the color from the array so it won't be used again
            return randomColor
        },

        validate() {
            if (this.$refs.form.validate()) {
                this.save_detail_data();
            } else { this.dialog_save_error = true; }
        },

        save_detail_data() {
            console.log('บันทึก');
            const timestamp = Timestamp.fromDate(new Date());
            const jsDate = timestamp.toDate();
            const isoString = jsDate.toISOString();

            let id = new Date().getTime();
            const db = this.$fireModule.database();
            if (//this.save_detail.class == '' ||
                this.save_detail.style == '' ||
                this.save_detail.subject == '' ||
                this.picker_start == '' ||
                this.picker_stop == '' ||
                this.value == null ||
                this.date1 == '' ||
                this.save_detail.sum_people == '') {
                this.dialog_save_error = true;
                return;
            }
            if (this.mode == 'edit') {
                console.log('ทำๆ');
                db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop}`).update({
                    sum_people: this.save_detail.sum_people,
                    subject: this.save_detail.subject,
                    style_subject: this.save_detail.style,
                    invite: '0',
                });
                this.clear_item();
                this.dialog_detail = false;
                this.dialog_select_date = false;
            }
            const getTimePromise = db.ref(`Time_teacher/${this.value}/${this.date1}`).once("value");
            Promise.all([getTimePromise])
                .then(([timeSnapshot]) => {
                    if (timeSnapshot.exists()) {
                        const timeData = timeSnapshot.val();
                        const ed_timeData = Object.keys(timeData).map(key => key.substring(2, 7));
                        if (this.time_standart_sum.some(time => ed_timeData.includes(time))) {
                            alert('ใส่เวลาไม่ถูกต้องกรุณาลงใหม่อีกครั้ง');
                        } else {
                            if (this.mode == 'save') {
                                for (const keydate in this.date1) {
                                    db.ref(`date_teacher/${this.value}/${this.date1[keydate]}/${this.picker_stop}`).set({
                                        createAt: new Date(),
                                        style_subject: this.save_detail.style,
                                        sum_people: this.save_detail.sum_people,
                                        invite: '0',
                                        subject: this.save_detail.subject,
                                        start: this.picker_start,
                                        stop: this.picker_stop,
                                        ID: id,
                                    });
                                    console.log(this.time_standart_sum);
                                    for (const key in this.time_standart_sum) {
                                        db.ref(`Time_teacher/${this.value}/${this.date1[keydate]}/S:${this.time_standart_sum[key]}:${this.save_detail.sum_people}:${id}`).set({
                                            0: ''
                                        });
                                    };
                                }
                                this.clear_item();
                                this.dialog_detail = false;
                                this.dialog_select_date = false;
                                // this.search_date_teacher();
                            }
                        }
                    } else {
                        if (this.mode == 'save') {
                            for (const keydate in this.date1) {
                                db.ref(`date_teacher/${this.value}/${this.date1[keydate]}/${this.picker_stop}`).set({
                                    // class: this.save_detail.class,
                                    createAt: new Date(),
                                    style_subject: this.save_detail.style,
                                    sum_people: this.save_detail.sum_people,
                                    invite: '0',
                                    subject: this.save_detail.subject,
                                    start: this.picker_start,
                                    stop: this.picker_stop,
                                    ID: id,
                                });
                                for (const key in this.time_standart_sum) {
                                    db.ref(`Time_teacher/${this.value}/${this.date1[keydate]}/S:${this.time_standart_sum[key]}:${this.save_detail.sum_people}:${id}`).set({
                                        0: ''
                                    });
                                };
                            }
                            this.clear_item();
                            this.dialog_detail = false;
                            this.dialog_select_date = false;
                            // this.search_date_teacher();
                        }
                    }
                })
        },

        clear_item() {
            this.value = null;
            this.hour_tea = 0;
            this.min_tea = 0;
            this.save_detail = [];
            this.time_standart = [];
            this.time_standart_stop = [];
            this.time_standart_sum = [];
            this.picker_start = null;
            this.picker_stop = null;
            this.date1 = [];
        },
        allowedDates: val => {
            const currentDate = new Date();
            const selectedDate = new Date(val);
            return selectedDate >= currentDate;
        },

        search_style_tea(item) {
            const db = this.$fireModule.database();
            db.ref(`user/${item}/classLocation`).on("value", (snapshot) => {
                this.style_subject = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    // console.log(">>>", childData[key]);
                    const getLocationPromise = db.ref(`location/${childData[key]}`).once("value");
                    Promise.all([getLocationPromise])
                        .then(([location]) => {
                            const location_name = location.val();
                            this.style_subject.push({ key: childData[key], name: location_name.name });
                        })
                }
            })
        },

        search_subject_tea(item) {
            const db = this.$fireModule.database();
            db.ref(`user/${item}`).on("value", (snapshot) => {
                this.subject = [];
                const childData = snapshot.val();
                for (const details in childData.subject_all) {
                    const sub = childData.subject_all[details];
                    this.subject.push({ key: details, name: sub.name });
                }
                this.subject.push({ key: '00000', name: 'ทุกวิชา' });
                // console.log(this.subject);
            })
        },

        search_date_teacher() {
            const db = this.$fireModule.database();
            db.ref(`date_teacher/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                const now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
                this.desserts = [];
                this.arrayEvents = [];
                let item = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (parseInt(new Date(date).getTime()) >= parseInt(now.getTime())) {
                            const datedata = keydata[date];
                            for (const time in datedata) {
                                const timedata = datedata[time];
                                if (this.status == 'admin') {
                                    const getTeacherPromise = db.ref(`user/${key}`).once("value");
                                    const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                    const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                    Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise])
                                        .then((snapshots) => {
                                            const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                            const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                            const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้

                                            const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const locationData = locationSnapshot.val();

                                            const nametea = `ครู${teacherData.nickname} (${teacherData.firstName})`;
                                            const namesub = subjectData.name;
                                            if (true) {//this.search_value == key && this.search_style_sub == timedata.style_subject && this.search_class == timedata.class) {
                                                item.push({
                                                    userid: teacherData.teacherId,
                                                    name: nametea,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: locationData.name,
                                                    keystyle: timedata.style_subject,
                                                    // class: timedata.class,
                                                    subject: namesub,
                                                    keySubject: timedata.subject,
                                                    people: timedata.sum_people,
                                                    sum_people: timedata.invite + "/" + timedata.sum_people,
                                                    invite: timedata.invite,
                                                    key: key,
                                                    IdTime: timedata.ID,
                                                });
                                                this.arrayEvents.push(date);
                                            }
                                        })
                                } else if (this.status == 'teacher' && this.keyuser == key) {
                                    const getTeacherPromise = db.ref(`user/${key}`).once("value");
                                    const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                    const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                    Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise])
                                        .then((snapshots) => {
                                            const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                            const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                            const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้

                                            const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const locationData = locationSnapshot.val();

                                            const nametea = `ครู${teacherData.nickname} (${teacherData.firstName})`;
                                            const namesub = subjectData.name;
                                            if (true) {//this.search_value == key && this.search_style_sub == timedata.style_subject && this.search_class == timedata.class) {
                                                item.push({
                                                    userid: teacherData.teacherId,
                                                    name: nametea,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: locationData.name,
                                                    keystyle: timedata.style_subject,
                                                    // class: timedata.class,
                                                    subject: namesub,
                                                    keySubject: timedata.subject,
                                                    people: timedata.sum_people,
                                                    sum_people: timedata.invite + "/" + timedata.sum_people,
                                                    invite: timedata.invite,
                                                    key: key,
                                                    IdTime: timedata.ID,
                                                });
                                                this.arrayEvents.push(date);
                                            }
                                        })
                                }

                            }
                        }
                    }
                }
                this.desserts = item;
            })
        },
        check_time_start() {
            const db = this.$fireModule.database();
            db.ref(`Time_teacher/${this.value}/${this.date1}`).on("value", (snapshot) => {
                if (snapshot.exists()) {
                    this.time_standart = [];
                    const childData = snapshot.val();
                    const details = Object.keys(childData).map(key => key.substring(2, 7));
                    // this.time_standart = this.time_full.filter(time => !details.includes(time));
                    this.time_standart = this.time_full;
                    console.log(this.time_standart, details);
                    // const childData = snapshot.val();
                    // console.log(childData);
                    // for (const key in childData) {
                    //     const detail = key.substring(2,7);
                    //     console.log(detail);
                    // }
                } else {
                    this.time_standart = this.time_full;
                }

            })
        },

        editItem(item) {
            console.log(item);
            this.time_standart_stop = this.time_full;
            this.time_standart = this.time_standart_stop;
            // this.search_class_tea(item.key);
            this.search_style_tea(item.key);
            this.search_subject_tea(item.key);
            this.delday = item.time_e;
            this.editedIndex = this.desserts.indexOf(item);
            this.value = item.key;
            this.date1 = item.date;
            this.save_detail.subject = item.keySubject;
            // this.save_detail.class = item.class;
            this.save_detail.sum_people = item.people;
            this.save_detail.style = item.keystyle;
            this.picker_start = item.time_s;
            this.picker_stop = item.time_e;
            this.dialog_detail = true;
        },

        deleteItem(item) {
            this.delcon = item;
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            let delcon_key = this.delcon.key;
            let delcon_date = this.delcon.date;
            let delcon_IdTime = this.delcon.IdTime;
            console.log(this.delcon);
            const db = this.$fireModule.database();
            db.ref(`Time_teacher/${this.delcon.key}/${this.delcon.date}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const detail = key.split(":");
                    if (detail[4] == delcon_IdTime) {
                        db.ref(`Time_teacher/${delcon_key}/${delcon_date}/${key}`).remove();
                        console.log('ลบ', key, detail[4], delcon_key, delcon_date);
                    }
                }
            })
            db.ref(`date_teacher/${this.delcon.key}/${this.delcon.date}/${this.delcon.time_e}`).remove();

            this.delcon = [];
            this.closeDelete()
        },

        close() {
            this.dialog_detail = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.clear_item())
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.clear_item())
                this.editedIndex = -1
            })
        },
        search_teacher() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                const childData = snapshot.val();
                let item = [];
                for (const key in childData) {
                    if (childData[key].status == 'teacher') {
                        item.push({ key: key, name: childData[key].teacherId + " ครู" + childData[key].nickname });
                    }
                }
                this.items = item;
            })
        },

    },
}
</script>
<style>
@media only screen and (max-width: 600px) {

    /* ซ่อน element ที่ไม่ต้องการแสดงผล */
    .hide-on-mobile {
        display: none;
    }
}

@media only screen and (min-width: 600px) {

    /* ซ่อน element ที่ไม่ต้องการแสดงผล */
    .hide-on-desktop {
        display: none;
    }
}
</style>
