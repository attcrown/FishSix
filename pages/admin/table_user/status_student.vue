<template>
    <div class="mt-6">
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers_student" :items="desserts_student" sort-by="date"
                    :search="search_table_student" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat style="background-color:rgba(173, 28, 28, 0.425);">
                            <v-toolbar-title>สถานะการจองของนักเรียน</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-text-field class="me-10" v-model="search_table_student" append-icon="mdi-magnify"
                                label="Search" single-line hide-details></v-text-field>
                        </v-toolbar>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getColor(item.status)" dark>
                            {{ item.status }}
                        </v-chip>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{ item }">
                        <v-btn x-small color="secondary" @click="detail_match(item)">
                            <v-icon small class="mr-2">
                                mdi-account-details
                            </v-icon>
                            DETAIL
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>

        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_detail" persistent max-width="600px">
                    <v-card class="rounded-xl">
                        <v-card-title style="background-color:rgba(173, 28, 28, 0.425)">
                            <span class="text-h8"><b>Detail Teach</b></span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="4">
                                        <v-text-field label="วันที่ลงเรียน" v-model="detail_student.date"
                                            readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field label="ชื่อวิชา" v-model="detail_student.subject"
                                            readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field label="ระดับการศักษา" v-model="detail_student.level"
                                            readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Search teacher" v-model="detail_student.name_tea"
                                            readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Search student" v-model="detail_student.name_stu"
                                            readonly></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-text-field label="สถานที่สอน" v-model="detail_student.style"
                                            readonly></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-text-field label="รูปแบบการสอน" v-model="detail_student.class"
                                            readonly></v-text-field>
                                    </v-col>


                                    <v-col cols="12" sm="6">
                                        <v-text-field label="เริ่มเรียน" v-model="detail_student.time_s"
                                            readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="เลิกเรียน" v-model="detail_student.time_e"
                                            readonly></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12">
                                        <v-text-field label="วัตถุประสงค์ในการเรียนครั้งนี้"
                                            v-model="detail_student.because" readonly></v-text-field>
                                    </v-col>
                                </v-row>

                            </v-container>
                            <small>*รายละเอียดการจอง</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="clear()">
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
    </div>
</template>

<script>
export default {
    data: () => ({
        detail_student: [],
        dialog_detail: false,
        search_table_student: '',
        headers_student: [
            {
                text: 'Name Student',
                align: 'start',
                sortable: false,
                value: 'name_student',
            },
            {
                text: 'Name Teacher',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Date', value: 'date' },
            { text: 'Start', value: 'time_s' },
            { text: 'End', value: 'time_e' },
            // { text: 'Style', value: 'style' },
            // { text: 'class', value: 'class' },
            // { text: 'subject', value: 'subject' },
            { text: 'Status', value: 'status', align: 'start' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
        ],
        desserts_student: [],
        editedIndex: -1,
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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

    created() {
        this.search_date_student()
    },

    methods: {
        getColor(stutus) {
            if (stutus == 'active') return 'success'
            else if (stutus == 'Not active') return 'orange'
            else return 'red'
        },
        detail_match(item) {
            console.log(item);
            this.detail_student.name_tea = item.name;
            this.detail_student.name_stu = item.name_student;
            this.detail_student.because = item.because;
            this.detail_student.class = item.class;
            this.detail_student.date = item.date;
            this.detail_student.style = item.style;
            this.detail_student.subject = item.subject;
            this.detail_student.time_e = item.time_e;
            this.detail_student.time_s = item.time_s;
            this.detail_student.level = item.level;
            this.dialog_detail = true;
        },
        clear() {
            this.detail_student = [];
            this.dialog_detail = false;
        },
        search_date_student() {
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
                            const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                            const getStudentPromise = db.ref(`user/${key}`).once("value");
                            Promise.all([getTeacherPromise, getStudentPromise, timedata])
                                .then(([teacherSnapshot, studentSnapshot]) => {
                                    const teacherData = teacherSnapshot.val();
                                    const studentData = studentSnapshot.val();
                                    const nametea = "คุณครู " + teacherData.nickname + " " + teacherData.teacherId;
                                    const namestu = studentData.nickname + " " + studentData.firstName;
                                    item.push({
                                        name_student: namestu,
                                        name: nametea,
                                        subject: timedata.subject,
                                        date: date,
                                        time_s: timedata.start,
                                        time_e: timedata.stop,
                                        style: timedata.style_subject,
                                        status: timedata.status,
                                        class: timedata.class,
                                        because: timedata.because,
                                        key_student: key,
                                        key_teacher: timedata.teacher,
                                        level: timedata.level,
                                    });
                                })                            
                        }
                    }

                }
                this.desserts_student = item;
                console.log(this.desserts_student);
            })
        },
    },
}
</script>
