<template>
    <div class="pt-10">
        <template>
            <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="date"
                class="elevation-16 rounded-xl">
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.status="{ item }">
                    <v-chip :color="getColor(item.status)" dark>
                        {{ item.status }}
                    </v-chip>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="#F8F9FB" class="rounded-t-xl">
                        <v-toolbar-title><b>จองเวลาเรียนสำเร็จ</b></v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>

                        <v-dialog v-model="dialog" max-width="600px">
                            <v-card class="p-4 rounded-xl">
                                <v-card-title>
                                    <span style="font-size: 16px">
                                        <b>ยกเลิกคลาสครูกับนักเรียน</b>
                                    </span>
                                    <v-spacer></v-spacer>
                                    <v-btn fab dark small color="#37474F" @click="close">
                                        <v-icon dark class="text-h5">
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="12">
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    :return-value.sync="date" transition="scale-transition" offset-y
                                                    min-width="auto">
                                                    <template v-slot:activator="{}">
                                                        <v-text-field v-model="editedItem.date" label="วันที่เรียน"
                                                            prepend-icon="mdi-calendar" v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="date" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu = false">
                                                            Cancel
                                                        </v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                            OK
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>

                                            <v-col cols="12" sm="6">
                                                <v-select :items="time_standart" v-model="editedItem.time_s"
                                                    label="เวลาเริ่มต้น" readonly></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="time_standart" v-model="editedItem.time_e" readonly
                                                    label="เวลาสิ้นสุด"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="รูปแบบการสอน" v-model="editedItem.name_style"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="วิชา" v-model="editedItem.name_subject"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="ระดับชั้น" v-model="editedItem.level" readonly>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <hr style="border: 2px solid #000; background-color: #000; margin-top: -30px;">

                                <v-card-title style="margin-top: -20px;">
                                    <span style="font-size:16px"><b>รายละเอียดเกี่ยวกับครู/นักเรียน</b></span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.name_student" label="ชื่อนักเรียน"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.phone_student" label="เบอร์โทรนักเรียน"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.name" label="ชื่อคุณครู"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.phone_teacher" label="เบอร์โทรคุณครู"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions class="d-flex justify-center">
                                    <v-btn class="me-5" color="#FC0405" dark @click="dialogDelete = true" elevation="16"
                                        rounded>
                                        <b>ยกเลิกการจองเรียน</b>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogDelete" max-width="300px" class="text-center">
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
                                    <b>ยืนยันยกเลิกคลาสหรือไม่</b>
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
                    <v-btn text icon elevation="5" @click="editItem(item)">
                        <v-icon class="text-h5" color="#AD382F">
                            mdi-delete
                        </v-icon>
                    </v-btn>

                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </template>
    </div>
</template>
<script>
export default {
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        dialog_detali_del: false,
        headers: [
            {
                text: 'ชื่อครู',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text: 'ชื่อนักเรียน',
                align: 'start',
                sortable: false,
                value: 'name_student',
            },
            // { text: 'ประเภทคลาส', value: 'class', align: 'center' },
            { text: 'รูปแบบการเรียน', value: 'name_style', align: 'center' },
            { text: 'วิชาที่สอน', value: 'name_subject', align: 'center' },
            { text: 'ระดับชั้น', value: 'level', align: 'center' },
            { text: 'วันที่สอน', value: 'date', align: 'center' },
            { text: 'เวลาเริ่มเรียน', value: 'time_s', align: 'center' },
            { text: 'เวลาเลิกเรียน', value: 'time_e', align: 'center' },
            { text: 'สถานะ', value: 'status', sortable: false, align: 'center' },
            { text: 'ยกเลิกคลาส', value: 'actions', sortable: false, align: 'center' },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        time_standart: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Class'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    mounted() {
        this.initialize();
    },

    methods: {
        initialize() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts_student = [];
                let item = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            if (timedata.status == 'พร้อมเรียน' && timedata.Idsendplan == undefined) {
                                const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                const getStudentPromise = db.ref(`user/${key}`).once("value");
                                const getsubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                const getlocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                Promise.all([getTeacherPromise, getStudentPromise, getsubjectPromise, getlocationPromise])
                                    .then(([teacherSnapshot, studentSnapshot, subjectSnapshot, locationSnapshot]) => {
                                        const teacherData = teacherSnapshot.val();
                                        const studentData = studentSnapshot.val();
                                        const subjectData = subjectSnapshot.val();
                                        const locationData = locationSnapshot.val();
                                        item.push({
                                            name_student: studentData.studentId + " น้อง" + studentData.nickname + " " + studentData.firstName,
                                            name: teacherData.teacherId + " ครู" + teacherData.nickname,
                                            subject: timedata.subject,
                                            name_subject: subjectData.name,
                                            date: date,
                                            time_s: timedata.start,
                                            time_e: timedata.stop,
                                            time_s_tea: timedata.start_tea,
                                            time_e_tea: timedata.stop_tea,
                                            style: timedata.style_subject,
                                            name_style: locationData.name,
                                            status: timedata.status,
                                            key_student: key,
                                            key_teacher: timedata.teacher,
                                            phone_student: studentData.studentMobile,
                                            phone_teacher: teacherData.mobile,
                                            // class: timedata.class,
                                            level: timedata.level,
                                            because: timedata.because,
                                            id: timedata.ID,
                                            hour: timedata.hour
                                        });
                                    })
                                    .catch((error) => {
                                        alert("active เกิดข้อผิดพลาดในการดึงข้อมูล");
                                    });
                            }
                        }
                    }
                }
                this.desserts = item;
                console.log(this.desserts);
            })
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            console.log(">>>>", this.editedItem);
            this.dialog = true;
        },


        deleteItemConfirm() {
            this.delete_match()
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false;
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            // console.log('update>>', this.editedItem);
            this.close()
        },

        delete_match() {
            if (!this.editedItem) {
                alert("No data to delete");
                return;
            }
            console.log(">>>>", this.editedItem);
            let keystudent = this.editedItem;
            const db = this.$fireModule.database();
            // let sum = 0;
            // db.ref(`date_teacher/${this.editedItem.key_teacher}/${this.editedItem.date}/${this.editedItem.time_e_tea}/invite`).once("value", (snapshot) => {
            //     const childData = snapshot.val();
            //     sum = childData - 1;
            // })
            db.ref(`date_teacher/${this.editedItem.key_teacher}/${this.editedItem.date}/${this.editedItem.time_e_tea}`).remove();
            db.ref(`date_match/${this.editedItem.key_student}/${this.editedItem.date}/${this.editedItem.time_e}`).remove();
            if (this.editedItem.name_style.includes("Flip")) {
                db.ref(`hour_match/${this.editedItem.key_student}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.key_student}`).update({
                        hour: childData.hour - keystudent.hour,
                    });
                })
            }
            if (this.editedItem.name_style.includes("Private")) {
                db.ref(`hour_match/${this.editedItem.key_student}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.key_student}`).update({
                        hourprivate: childData.hourprivate - keystudent.hour,
                    });
                })
            }


            this.delete_time();
        },

        delete_time() {
            let idkey = this.editedItem.id;
            let key_stu = this.editedItem.key_student;
            let key_tea = this.editedItem.key_teacher;
            let date = this.editedItem.date
            console.log(this.editedItem);
            const db = this.$fireModule.database();

            db.ref(`Time_student/${this.editedItem.key_student}/${this.editedItem.date}`).once("value", (snapshot) => {
                const childData = snapshot.val();
                console.log('stu', childData, idkey);
                for (const key in childData) {
                    const detail = key.split(":");
                    if (detail[4] == idkey) {
                        db.ref(`Time_student/${key_stu}/${date}/${key}`).remove();
                        console.log('ลบ', key, detail[4]);
                    }
                }
            });
            db.ref(`Time_teacher/${this.editedItem.key_teacher}/${this.editedItem.date}`).once("value", (snapshot) => {
                const childData = snapshot.val();
                console.log('tea', childData);
                for (const key in childData) {
                    const detail = key.split(":");
                    if (detail[4] == idkey) {
                        db.ref(`Time_teacher/${key_tea}/${date}/${key}`).remove();
                        console.log('ลบ', key, detail[4]);
                    }
                }
            });
            this.editedItem = [];
        },


        getColor(stutus) {
            if (stutus === 'พร้อมเรียน') return '#29CC39'
            else if (stutus === 'รอยืนยัน') return '#FFCB33'
            else return 'red'
        },
    },
}
</script>
