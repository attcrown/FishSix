<template>
    <div>
        <!-- Header -->
        <v-card flat class="elevation-16 rounded-xl px-5 pt-8" style="background-color:#EBE4DE">
            <h5 class="px-4"><b>เลือกตารางเรียน</b></h5>
            <div class="d-flex">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" :rules="rules.name" label="วันที่เรียน" prepend-icon="mdi-calendar"
                            readonly v-bind="attrs" v-on="on" required class="date-picker-field"></v-text-field>
                    </template>

                    <v-date-picker v-model="date" no-title scrollable :events="arrayEvents" event-color="green lighten-1">
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date), search_date_teacher()">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-btn elevation="10" color="#322E2B" class="mt-3 ms-5" style="color:white" :disabled="!formIsValid"
                    type="submit" @click="search_date_teacher_All()" rounded>ค้นหาทั้งหมด<span
                        class="mdi mdi-magnify text-h6"></span></v-btn>

                <v-spacer></v-spacer>
                <v-btn elevation="10" color="#322E2B" class="me-5 mt-3" style="color:white" :disabled="!formIsValid"
                    type="submit" rounded>Export<span class="mdi mdi-microsoft-excel text-h6"></span></v-btn>


            </div>
        </v-card>

        <!-- Detail teacher -->
        <v-expansion-panels v-model="panel" multiple class="mt-8">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(items, index) in dessertsByTeacher"
                :key="index">
                <v-expansion-panel-header style="font-size:20px;"><b>{{ items[0].name }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table class="text-center" style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">รหัสนักเรียน</th>
                                <th class="p-2">ชื่อนักเรียน</th>
                                <th class="p-2">ประเภทคลาส</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เช็คชื่อ</th>
                                <th class="p-2">ส่งพัฒนาการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.keyStudent">
                                <td class="p-2">{{ item.studentId }}</td>
                                <td class="p-2">{{ item.namestu }}</td>
                                <td class="p-2">{{ item.style }}</td>
                                <td class="p-2">{{ item.subject }}</td>
                                <td class="p-2">{{ item.time_s }}</td>
                                <td class="p-2">{{ item.time_e }}</td>
                                <td class="p-2">{{ item.level }}</td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" v-if="item.sendplan == undefined"
                                        @click="check_sendplan(item)">
                                        <span class="mdi mdi-check text-h5"></span>
                                    </v-btn>
                                    <v-btn text icon elevation="5" v-if="item.sendplan != undefined" disabled>
                                        <span class="mdi mdi-check-all text-h5"></span>
                                    </v-btn>
                                </td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" :disabled="item.sendplan == undefined"
                                        @click="check_confirm(item)">
                                        <span class="mdi mdi-clipboard-text-outline text-h5"></span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-dialog v-model="dialog" max-width="570px">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card class="rounded-xl">
                    <v-card-title>
                        <b class="ms-5" style="font-size:16px">เชคชื่อวันที่ {{ edited.date }} | {{ edited.time_s }}-{{
                            edited.time_e }}</b>
                        <v-spacer></v-spacer>
                        <v-btn fab dark small color="#37474F" @click="dialog = false, clear_dialog()">
                            <v-icon dark class="text-h5">
                                mdi-close
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px;">รายระเอียดเกี่ยวกับครู/นักเรียน</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="ชื่อนักเรียน" v-model="edited.namestu" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="วิชาที่เรียน" v-model="edited.subject" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="ชื่อครู" v-model="edited.name" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="เรื่องที่เรียน" v-model="edited.because" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="เรทค่าจ้างครู" v-model="edited.rate" :rules="rules.name"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <img :src="imageURL" width="300" height="auto" alt="Image" v-if="imageURL">

                                    <v-file-input :rules="rules.img" v-model="fileToUpload"
                                        accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"
                                        label="รูปภาพ Check-In เข้าสอน"></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded color="#29CC39" class="mt-5 mb-5" dark @click="validate()">บันทึก <span
                                class="mdi mdi-content-save text-h6"></span></v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="dialog_confirm" max-width="700px">
            <v-form ref="form_confirm" v-model="valid_confirm" lazy-validation>
                <v-card class="rounded-xl">
                    <v-card-title>
                        <b class="ms-5" style="font-size:16px">เชคชื่อวันที่ {{ edited.date }} | {{ edited.time_s }}-{{
                            edited.time_e }}</b>
                        <v-spacer></v-spacer>
                        <v-btn fab dark small color="#37474F" @click="dialog_confirm = false, clear_dialog()">
                            <v-icon dark class="text-h5">
                                mdi-close
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" style="margin-top:-15px" v-if="check_time">
                                    <v-chip color="#29CC39" text-color="white">
                                        ส่งภายในเวลา
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" style="margin-top:-15px" v-if="!check_time">
                                    <v-chip color="#AD382F" text-color="white">
                                        ส่งล่าช้า
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" sm="12" style="margin-top:-20px">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px;">รายระเอียดเกี่ยวกับครู/นักเรียน</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="ชื่อนักเรียน" v-model="edited.namestu" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="วิชาที่เรียน" v-model="edited.subject" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="ชื่อครู" v-model="edited.name" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="จุดประสงค์ในการเรียน" v-model="edited.because"
                                        readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="วันนี้น้องเรียนเรื่อง" v-model="edited.learn" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select v-model="edited.understand" :items="items"
                                        :rules="[v => !!v || 'กรุณาลงคะแนน']" label="น้องมีความเข้าใจในเนื้อหา"
                                        required></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="สำหรับวันนี้น้องมีพัฒนาการที่เพิ่มขึ้น"
                                        v-model="edited.development" :rules="rules.text" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="ปัญหาที่เกิดกับน้องในการเรียน" v-model="edited.problem"
                                        :rules="rules.text" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="จึงใช้วิธี" v-model="edited.method" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="เพื่อพัฒนาน้อง" v-model="edited.to_development" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="การบ้านหรือแบบฝึกหัดที่ให้กับน้องในวันนี้"
                                        v-model="edited.homework" :rules="rules.text" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" style="margin-top:-30px">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px; color:#000;">Operation ตรวจสอบ</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select v-model="edited.status_development" :items="items_development"
                                        :rules="[v => !!v || 'กรุณาลงสถานะ']" label="สถานะพัฒนาการ" required></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Comment/อื่นๆ" v-model="edited.comment" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded color="#29CC39" class="mt-5 mb-5" dark @click="validate_confirm()">บันทึก <span
                                class="mdi mdi-content-save text-h6"></span></v-btn>
                        <v-btn rounded color="#42A5F5" class="mt-5 mb-5" dark @click="img_show = true">ดูรูปภาพ <span
                                class="mdi mdi-content-save text-h6"></span></v-btn>
                        <v-spacer></v-spacer>

                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="img_show" hide-overlay persistent width="500">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="img_show = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <img :src="edited.img" width="400px">
                </v-card-text>
            </v-card>
        </v-dialog>


        <v-dialog v-model="loadsave" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    กำลังบันทึก
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>


    </div>
</template>
<script>

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
export default {
    data() {
        return {
            check_time: false,

            img_show: false,

            loadsave: false,

            summ_hour: 0,

            valid: false,
            valid_confirm: false,

            imageURL: '', // เก็บ URL ของรูปภาพ
            fileToUpload: null,

            dialog: false,
            dialog_confirm: false,
            desserts: [],
            arrayEvents: [],

            panel: [],
            readonly: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            form: [],
            form_confirm: [],

            rules: {
                // age: [(val) => val < 10 || `I don't believe you!`],
                // animal: [(val) => (val || "").length > 0 || "This field is required"],
                name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล",
                (val) => /^[0-9]+$/.test(val) || "กรุณากรอกตัวเลขเท่านั้น",],
                text: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
                img: [value => !value || value.size < 10000000 || 'ภาพต้องมีขนาดไม่เกิน 10MB!',
                (val) => (val) != null || "กรุณาระบุข้อมูล"],
            },

            edited: [],
            time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
                , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
                , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
                , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
                , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
                , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],

            items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            items_development: ['Pending', 'Rejected', 'Approved'],
        }
    },
    mounted() {
        this.search_date_teacher();
        this.arrayEvent_search();
    },

    computed: {
        dessertsByTeacher() {
            // Use Array.reduce() to group items by teacher name
            const groupedByTeacher = this.desserts.reduce((acc, item) => {
                const teacherName = item.name;
                if (!acc[teacherName]) {
                    acc[teacherName] = [];
                }
                acc[teacherName].push(item);
                return acc;
            }, {});

            // Convert the object back to an array
            return Object.values(groupedByTeacher);
        },
        formIsValid() {
            return (
                this.date
            );
        },
    },

    watch: {

    },

    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.upload();
            }
        },

        validate_confirm() {
            if (this.$refs.form_confirm.validate()) {
                console.log(this.edited);
                this.dialog_confirm = false;
                this.save_confirm();
            }
        },
        check_sendplan(item) {
            this.dialog = true;
            this.edited = item;
            this.summ_hour = this.sum_hour(this.edited.time_s, this.edited.time_e);
            // console.log(this.edited ,this.summ_hour);
        },
        check_confirm(item) {
            this.edited = item;
            const db = this.$fireModule.database();
            db.ref(`send_plan/${item.Idsendplan}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.edited = { ...this.edited, ...childData }; // ใช้ spread operator เพื่อรวม object this.edited และ object childData เข้าด้วยกัน
                if (childData.check_save) {
                    this.check_time = true;
                } else if (parseInt(new Date(item.date).getTime().toString().substring(0, 5)) >= parseInt(new Date().getTime().toString().substring(0, 5))) {
                    this.check_time = true;
                } else {
                    this.check_time = false;
                }
                console.log(this.edited);
            });
            this.dialog_confirm = true;
        },

        clear_dialog() {
            this.imageURL = '';
            this.edited = [];
            this.fileToUpload = null;
            this.dialog = false;
        },

        upload() {
            this.loadsave = true;
            this.dialog = false;
            let id = new Date().getTime();
            const storageRef = firebase.storage().ref();
            const file = this.fileToUpload;
            const imageRef = storageRef.child(`send_check/${id}.jpg`);

            // อัปโหลดรูปภาพเสร็จสมบูรณ์ก่อนทำการอัพเดตค่าใน Firebase Realtime Database
            imageRef
                .put(file)
                .then(() => {
                    console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
                    const storage = firebase.storage();
                    const image = storage.ref(`send_check/${id}.jpg`);

                    image
                        .getDownloadURL()
                        .then((url) => {
                            this.imageURL = url;
                            console.log(this.imageURL);

                            // อัปเดตค่าใน Firebase Realtime Database เมื่อรูปภาพอัปโหลดเสร็จสิ้น
                            const db = this.$fireModule.database();
                            db.ref(`date_match/${this.edited.keyStudent}/${this.edited.date}/${this.edited.time_e}/`).update({
                                sendplan: true,
                                Idsendplan: id,
                            }).then(() => {
                                console.log('save date_match');
                            })

                            db.ref(`send_plan/${id}`).set({
                                img: this.imageURL,
                                rate: this.edited.rate,
                                hour: this.summ_hour,
                            }).then(() => {
                                console.log('save sendplan');
                                this.loadsave = false;
                                this.clear_dialog();
                            })
                        }).catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error);
                });
        },
        save_confirm() {
            const db = this.$fireModule.database();
            db.ref(`send_plan/${this.edited.Idsendplan}/`).update({
                learn: this.edited.learn,
                understand: this.edited.understand,
                development: this.edited.development,
                problem: this.edited.problem,
                method: this.edited.method,
                to_development: this.edited.to_development,
                homework: this.edited.homework,
                status_development: this.edited.status_development,
                comment: this.edited.comment,
                check_save: this.check_time
            }).then(() => {
                console.log('save send_plan');
                this.clear_dialog();
            })
        },

        sum_hour(start, end) {
            // console.log('ทำsum',start,end);
            let sum = 0;
            let set = 0;
            for (const key in this.time_full) {
                // console.log(this.time_full[key])
                if (end == this.time_full[key]) {
                    set = 0;
                    return sum;
                } else if (start == this.time_full[key] || set > 0) {
                    set++;
                    sum = sum + 0.5;
                    // console.log(sum);
                }
            }
        },

        arrayEvent_search() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                this.arrayEvents = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            if (timedata.status === "พร้อมเรียน") {
                                this.arrayEvents.push(date);
                            }
                        }
                    }
                }
            })
        },
        search_date_teacher() {
            console.log('ทำๆ');
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts = [];
                // this.arrayEvents = [];
                let item = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                            const getStudentPromise = db.ref(`user/${key}`).once("value");
                            const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                            const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                            Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise])
                                .then((snapshots) => {
                                    const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                    const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                    const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                    const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้

                                    const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                    const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                    const locationData = locationSnapshot.val();
                                    const studentData = studentSnapshot.val();

                                    const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                    const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                    const namesub = subjectData.name;
                                    if (timedata.status === "พร้อมเรียน" && date === this.date) {
                                        item.push({
                                            level: timedata.level,
                                            name: nametea,
                                            date: date,
                                            time_s: timedata.start,
                                            time_e: timedata.stop,
                                            style: locationData.name,
                                            keystyle: timedata.style_subject,
                                            // class: timedata.class,
                                            subject: namesub,
                                            keySubject: timedata.subject,
                                            keyStudent: key,
                                            keyTeacher: timedata.teacher,
                                            studentId: studentData.studentId || "-",
                                            namestu: namestu,
                                            sendplan: timedata.sendplan,
                                            because: timedata.because,
                                            Idsendplan: timedata.Idsendplan,
                                        });
                                        // this.arrayEvents.push(date);
                                    }
                                })
                        }
                    }
                }
                this.desserts = item;
                // console.log(this.desserts);
            })
        },

        search_date_teacher_All() {
            console.log('ทำๆ');
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts = [];
                // this.arrayEvents = [];
                let item = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                            const getStudentPromise = db.ref(`user/${key}`).once("value");
                            const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                            const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                            Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise])
                                .then((snapshots) => {
                                    const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                    const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                    const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                    const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้

                                    const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                    const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                    const locationData = locationSnapshot.val();
                                    const studentData = studentSnapshot.val();

                                    const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                    const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                    const namesub = subjectData.name;
                                    if (timedata.status === "พร้อมเรียน") {
                                        item.push({
                                            level: timedata.level,
                                            name: nametea,
                                            date: date,
                                            time_s: timedata.start,
                                            time_e: timedata.stop,
                                            style: locationData.name,
                                            keystyle: timedata.style_subject,
                                            // class: timedata.class,
                                            subject: namesub,
                                            keySubject: timedata.subject,
                                            keyStudent: key,
                                            keyTeacher: timedata.teacher,
                                            studentId: studentData.studentId || "-",
                                            namestu: namestu,
                                            sendplan: timedata.sendplan,
                                            because: timedata.because,
                                            Idsendplan: timedata.Idsendplan,
                                        });
                                        // this.arrayEvents.push(date);
                                    }
                                })
                        }
                    }
                }
                this.desserts = item;
                // console.log(this.desserts);
            })
        },

    },
}
</script>
<style>
.date-picker-field {
    max-width: 300px;
    /* กำหนดความกว้างตามที่คุณต้องการ */
}

.v-data-table-header th {
    background-color: #D4C1B2;
    /* เปลี่ยนเป็นสีที่คุณต้องการ */
}
</style>
