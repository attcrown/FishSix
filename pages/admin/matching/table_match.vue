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
                        <v-toolbar-title><b>คำร้องขอจองเวลาเรียน</b></v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>
                        <v-dialog v-model="dialog" max-width="600px">
                            <!-- <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    New Item
                                </v-btn>
                            </template> -->
                            <v-card class="p-4 rounded-xl">
                                <v-card-title>
                                    <span style="font-size: 16px">
                                        <b>ยืนยันครูกับนักเรียน</b>
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
                                            <!-- <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.name" label="ครูผู้สอน"
                                                    disabled></v-text-field>
                                            </v-col> -->
                                            <v-col cols="12" sm="12">
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                    :return-value.sync="date" transition="scale-transition" offset-y
                                                    min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="date" label="วันที่เรียน"
                                                            prepend-icon="mdi-calendar" readonly v-bind="attrs"
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
                                                <v-select :items="time_standart" v-model="editedItem.time_s" label="เวลาเริ่มต้น"
                                                    @change="validateTime(), editedItem.time_e = null"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="time_standart_stop" v-model="editedItem.time_e"
                                                    @change="validateTime()" label="เวลาสิ้นสุด"></v-select>
                                            </v-col>

                                            <!-- <v-col cols="12" sm="6">
                                                <v-text-field label="เวลาเริ่มต้น" v-model="editedItem.time_s">
                                                    <template #prepend>
                                                        <span class="mdi mdi-timer-alert-outline text-h6"></span>
                                                    </template></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="เวลาสิ้นสุด" v-model="editedItem.time_e">
                                                    <template #prepend>
                                                        <span class="mdi mdi-timer-cancel-outline text-h6"></span>
                                                    </template>
                                                </v-text-field>
                                            </v-col> -->
                                            <v-col cols="12" sm="6">
                                                <v-select :items="select_class" label="รูปแบบการสอน"
                                                    v-model="editedItem.class"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="select_location" label="สถานที่สอน"
                                                    v-model="editedItem.style" item-text="name" item-value="key"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="select_subject" label="วิชา" item-text="name"
                                                    item-value="key" v-model="editedItem.subject" disabled></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="ระดับชั้น" v-model="editedItem.level" disabled>
                                                </v-text-field>
                                            </v-col>
                                            <!-- <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.time_s" label="เริ่มเรียน"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.time_e" label="เลิกเรียน"></v-text-field>
                                            </v-col> -->
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
                                    <v-btn color="#29CC39" dark :disabled="!formIsValid" @click="save" elevation="16"
                                        rounded>
                                        <b>ยืนยันการจองเรียน</b>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
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
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        old_item: [],
        select_location: [],
        select_class: [],
        select_subject: [],
        search: '',
        dialog: false,
        dialogDelete: false,
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
            { text: 'ประเภทคลาส', value: 'class', align: 'center' },
            { text: 'รูปแบบการเรียน', value: 'name_style', align: 'center' },
            { text: 'วิชาที่สอน', value: 'name_subject', align: 'center' },
            { text: 'ระดับชั้น', value: 'level', align: 'center' },
            { text: 'วันที่สอน', value: 'date', align: 'center' },
            { text: 'เวลาเริ่มเรียน', value: 'time_s', align: 'center' },
            { text: 'เวลาเลิกเรียน', value: 'time_e', align: 'center' },
            { text: 'สถานะ', value: 'status', sortable: false, align: 'center' },
            { text: 'ดูข้อมูล', value: 'actions', sortable: false, align: 'center' },
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
        time_standart_stop: [],
        time_standart_sum: [],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Class'
        },
        formIsValid() {
            return (
                this.editedItem.key_student &&
                this.editedItem.date &&
                this.editedItem.time_e &&
                this.editedItem.name &&
                this.date &&
                this.editedItem.style &&
                this.editedItem.class &&
                this.editedItem.subject &&
                this.editedItem.time_s &&
                this.editedItem.time_e
            );
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
                            if (timedata.status == 'รอยืนยัน') {
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
                                            name_student: "น้อง" + studentData.nickname + " " + studentData.firstName,
                                            name: "ครู" + teacherData.nickname + " " + teacherData.teacherId,
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
                                            class: timedata.class,
                                            level: timedata.level,
                                            because: timedata.because,
                                        });
                                    })
                                    .catch((error) => {
                                        alert("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
                                    });
                            }
                        }
                    }
                }
                this.desserts = item;
                // console.log(this.desserts);
            })
        },

        editItem(item) {
            this.old_item = item;
            // console.log('item>>', item);
            this.time_standart_stop = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
            this.date = item.date;
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.search_select_location_class(item.key_teacher);
            this.dialog = true
        },

        search_select_location_class(key) {
            const db = this.$fireModule.database();
            db.ref(`user/${key}`).on("value", (snapshot) => {
                this.select_location = [];
                this.select_subject = [];
                const childData = snapshot.val();
                for (const key in childData.classLocation) {
                    db.ref(`location/${childData.classLocation[key]}`).once("value", (snapshot) => {
                        const location_data = snapshot.val();
                        this.select_location.push({ name: location_data.name, key: childData.classLocation[key] });
                    })
                }
                for (const subject_key in childData.subject_all) {
                    db.ref(`subject_all/${subject_key}`).once("value", (snapshot) => {
                        const subject_data = snapshot.val();
                        this.select_subject.push({ name: subject_data.name, key: subject_key });
                    });
                }
                this.select_class = childData.classType;
            });
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
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            // console.log('update>>', this.editedItem ,this.date);
            this.delete_match();
            const db = this.$fireModule.database();
            db.ref(`date_match/${this.editedItem.key_student}/${this.date}/${this.editedItem.time_e}/`).update({
                teacher: this.editedItem.key_teacher,
                subject: this.editedItem.subject,
                style_subject: this.editedItem.style,
                level: this.editedItem.level,
                class: this.editedItem.class,
                start: this.editedItem.time_s,
                stop: this.editedItem.time_e,
                start_tea: this.editedItem.time_s,
                stop_tea: this.editedItem.time_e,
                because: this.editedItem.because,
                status: "พร้อมเรียน",
            });
            db.ref(`date_teacher/${this.editedItem.key_teacher}/${this.date}/${this.editedItem.time_e}/`).update({
                invite: '1',
                sum_people: '1',
                subject: this.editedItem.subject,
                style_subject: this.editedItem.style,
                class: this.editedItem.class,
                start: this.editedItem.time_s,
                stop: this.editedItem.time_e,
            });
            this.close();
        },

        delete_match() {
            // console.log('del>>', this.editedItem);
            const db = this.$fireModule.database();
            db.ref(`date_match/${this.old_item.key_student}/${this.old_item.date}/${this.old_item.time_e}`).remove()
                .then(() => {
                    console.log("success del");
                });
            db.ref(`date_match/${this.old_item.key_teacher}/${this.old_item.date}/${this.old_item.time_e_tea}`).remove()
                .then(() => {
                    console.log("success del");
                    this.close();
                });
        },

        getColor(stutus) {
            if (stutus === 'พร้อมเรียน') return '#29CC39'
            else if (stutus === 'รอยืนยัน') return '#FFCB33'
            else return 'red'
        },

        validateTime() {
            // this.time_standart_stop = [];
            if (true){//this.editedItem.time_e == null) {
                this.time_standart_stop = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.editedItem.time_s == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        if (sum > 1) {
                            // console.log(this.time_standart[key]);
                            this.time_standart_stop.push(this.time_standart[key]);
                        }
                    }
                }
            }if (this.editedItem.time_e != null && this.editedItem.time_s != null) {
                this.time_standart_sum = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.editedItem.time_e == this.time_standart[key]) {
                        sum = 0;
                        this.time_standart_sum.push(this.time_standart[key]);
                        break;
                    }
                    else if (this.editedItem.time_s == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        this.time_standart_sum.push(this.time_standart[key]);
                    }
                }
                console.log(this.time_standart_sum);
            } 
            // else {
            //     alert("ลงเวลาไม่ถูกต้อง");
            // }
        },
    },
}
</script>
