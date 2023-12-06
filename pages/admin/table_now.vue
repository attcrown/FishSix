<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers_student" :items="desserts_student" sort-by="date" :items-per-page="10"
                    :search="search_table_student" class="elevation-1 rounded-xl rounded-t-xl fonts300">
                    <template v-slot:top>
                        <!-- Toolbar section -->
                        <v-toolbar flat style="background-color: #EBE4DE;" class="rounded-t-xl">
                            <!-- Search Date Dropdown -->
                            <v-toolbar-title>
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                                    transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="date" label="วันที่เริ่มค้นหา"
                                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            class="mt-10 ms-5"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" :events="arrayEvents" event-color="green lighten-1"
                                        no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn text color="primary"
                                            @click="$refs.menu.save(date), search_date = null, search_table_student = null">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-toolbar-title>   

                            <v-toolbar-title>
                                <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="date_end"
                                    transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <div class="d-flex">
                                            <v-text-field v-model="date_end" label="วันที่สิ้นสุดค้นหา"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                class="mt-10 ms-5"></v-text-field>
                                            <!-- Search Field -->
                                            <v-text-field v-if="!showder" v-model="search_table_student" append-icon="mdi-magnify"
                                                label="Search" class="ms-8" single-line hide-details dense style="max-width: 200px; margin-top: 46px">
                                            </v-text-field>
                                        </div>
                                    </template>
                                    <v-date-picker v-model="date_end" :events="arrayEvents" event-color="green lighten-1"
                                        no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu2 = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn text color="primary"
                                            @click="$refs.menu2.save(date_end), search_date = null, search_table_student = null">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-toolbar-title>                             
                                                   
                            <!-- <v-select :items="items" v-model="search_date" label="Search Date" class="mt-10 ms-5"
                                @input="date = null, search_table_student = null, search_date_student()"
                                style="max-width: 250px;">
                            </v-select> -->
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-btn elevation="10" color="#322E2B" class="ms-5 mt-8" style="color:white" type="submit"
                                rounded @click="search_date_student_test()" :disabled="date === null || date_end === null">
                                    ค้นหา
                            </v-btn>

                            <v-btn elevation="10" color="#322E2B" class="ms-5 mt-8" style="color:white" type="submit"
                                rounded @click="dialog_excel = true"
                                v-if="status == 'admin' || status == 'opFS' || status == 'opsupFS'">
                                Export
                                <span class="mdi mdi-microsoft-excel text-h6"></span>
                            </v-btn>
                        </v-toolbar>

                        <!-- mobile -->
                        <v-container v-if="showder" style="background-color: #EBE4DE;">
                            <v-row justify="center" class="mt-3">
                                <v-col cols="auto">
                                    <v-card height="150" width="300" class="rounded-5" style="background-color: #AD382F;"
                                        elevation="16">
                                        <v-row class="fill-height pt-3" align="center">
                                            <div align="start" style="font-size:32px; color:rgb(255, 255, 255);">
                                                <img :src="require('~/assets/сolleagues discussing team project.png')"
                                                    class="" height="90"
                                                    style="margin-top:-10px; margin-start:10px; margin-end:50px;">
                                                {{ dash_all }}
                                            </div>
                                            <div>
                                                <p style="font-size: 16px; color:rgb(255, 255, 255);" class="text-center">
                                                    จำนวนคลาสเรียนทั้งหมด</p>
                                            </div>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col cols="auto">
                                    <v-card height="150" width="130" class="rounded-5" style="background-color: #322E2B;"
                                        elevation="16">
                                        <v-row class="fill-height pt-3" align="center">
                                            <div align="start" style="font-size:32px; color:rgb(255, 255, 255);">
                                                <img :src="require('~/assets/young woman at work with laptop writing.png')"
                                                    height="60" style="margin-top:-10px; margin-start:10px">
                                                {{ dash_active }}
                                            </div>
                                            <div>
                                                <p style="font-size: 16px; color:rgb(255, 255, 255);" class="text-center">
                                                    จำนวนคลาสเรียน<br>ที่พร้อมเรียน</p>
                                            </div>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col cols="auto">
                                    <v-card height="150" width="130" class="rounded-5" style="background-color: #B6A7A2;"
                                        elevation="16">
                                        <v-row class="fill-height pt-3" align="center">
                                            <div align="start" style="font-size:32px; color:rgb(255, 255, 255);">
                                                <img :src="require('~/assets/young woman at work with laptop writing.png')"
                                                    height="60" style="margin-top:-10px; margin-start:10px">
                                                {{ dash_notactive }}
                                            </div>
                                            <div>
                                                <p style="font-size: 16px; color:rgb(255, 255, 255);" class="text-center">
                                                    จำนวนคลาสเรียน<br>ที่รอยืนยัน</p>
                                            </div>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>


                        <!-- Hover Cards -->
                        <v-card-group v-if="!showder" class="d-flex pt-8 pb-8 fonts500" style="background-color: #EBE4DE;">
                            <v-hover v-slot="{ hover }">
                                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-8"
                                    style="background: #AD382F;" height="159px" width="300px">
                                    <v-row>
                                        <v-col cols="auto" class="mr-auto">
                                            <img :src="require('~/assets/сolleagues discussing team project.png')"
                                                class="pt-5 ps-5">
                                        </v-col>
                                        <v-col cols="auto" class="me-5" style="font-size:50px; color:white;">
                                            {{ dash_all }}
                                        </v-col>
                                        <v-col cols="auto" class="ml-auto me-7">
                                            <p style="font-size: 16px; margin-top: -50px; color:white">จำนวนนักเรียนทั้งหมด
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-hover>
                            <v-hover v-slot="{ hover }">
                                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                                    style="background: #322E2B;" height="159px" width="300px">
                                    <v-row>
                                        <v-col cols="auto" class="mr-auto">
                                            <img :src="require('~/assets/young woman at work with laptop writing.png')"
                                                class="pt-5 ps-5">
                                        </v-col>
                                        <v-col cols="auto" class="me-5" style="font-size:50px;color:white;">
                                            {{ dash_active }}
                                        </v-col>
                                        <v-col cols="auto" class="ml-auto me-7">
                                            <p style="font-size: 16px; margin-top: -50px; color:white">
                                                จำนวนนักเรียนที่พร้อมเรียน</p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-hover>
                            <v-hover v-slot="{ hover }">
                                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                                    style="background: #B6A7A2;" height="159px" width="300px">
                                    <v-row>
                                        <v-col cols="auto" class="mr-auto">
                                            <img :src="require('~/assets/сolleagues discussing team project.png')"
                                                class="pt-5 ps-5">
                                        </v-col>
                                        <v-col cols="auto" class="me-5" style="font-size:50px; color:white;">
                                            {{ dash_notactive }}
                                        </v-col>
                                        <v-col cols="auto" class="ml-auto me-7">
                                            <p style="font-size: 16px; margin-top: -50px; color:white">
                                                จำนวนนักเรียนที่รอยืนยัน</p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-hover>
                        </v-card-group>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getColor(item.status)" dark>
                            {{ item.status }}
                        </v-chip>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{ item }">

                        <v-icon class="text-h5" @click="detail_match(item)" color="#B6A7A2"
                            style="text-decoration: underline;">
                            mdi-eye
                        </v-icon>

                    </template>
                </v-data-table>
            </v-col>
        </v-row>

        <div>
            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialog_detail" persistent max-width="600px">
                        <!-- <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                Open Dialog
                            </v-btn>
                        </template> -->
                        <v-card class="rounded-xl">
                            <v-card-title class="d-flex justify-space-between">
                                <span style="font-size: 16px" v-if="detail_user.status === 'พร้อมเรียน'">
                                    <b>รายละเอียดการจองเรียน</b><br v-if="showder">
                                    <v-chip class="ma-2" color="#29CC39" text-color="white">
                                        {{ detail_user.status }}
                                    </v-chip>
                                </span>
                                <span style="font-size: 16px" v-if="detail_user.status === 'รอยืนยัน'">
                                    <b>รายละเอียดการจองเรียน</b><br v-if="showder">
                                    <v-chip class="ma-2" color="#FFCB33" text-color="white">
                                        {{ detail_user.status }}
                                    </v-chip>
                                </span>
                                <span style="font-size: 16px" v-if="detail_user.status === 'ยกเลิกการจอง'">
                                    <b>รายละเอียดการจองเรียน</b><br v-if="showder">
                                    <v-chip class="ma-2" color="#F44336" text-color="white">
                                        {{ detail_user.status }}
                                    </v-chip>
                                </span>
                                <v-btn fab dark small color="#37474F" @click="dialog_detail = false">
                                    <v-icon dark class="text-h5">
                                        mdi-close
                                    </v-icon>
                                </v-btn>

                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field v-model="detail_user.date" label="วันที่เริ่มเรียน" readonly>
                                                <template #prepend>
                                                    <span class="mdi mdi-calendar-outline text-h6"></span>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="เวลาเริ่มต้น" v-model="detail_user.time_s" readonly>
                                                <template #prepend>
                                                    <span class="mdi mdi-timer-alert-outline text-h6"></span>
                                                </template></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="เวลาสิ้นสุด" v-model="detail_user.time_e" readonly>
                                                <template #prepend>
                                                    <span class="mdi mdi-timer-cancel-outline text-h6"></span>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <!-- <v-col cols="12" sm="6">
                                            <v-text-field label="ประเภทคลาส" v-model="detail_user.class"
                                                readonly></v-text-field>
                                        </v-col> -->
                                        <v-col cols="12" sm="12">
                                            <v-text-field label="รูปแบบการเรียน" v-model="detail_user.name_style"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="วิชาที่เรียน" v-model="detail_user.name_subject" readonly>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="ระดับชั้น" v-model="detail_user.level" readonly>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field label="จุดประสงค์ในการเรียนครั้งนี้" v-model="detail_user.because"
                                                readonly>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <!-- <small>*รายละเอียดการจองของลูกค้าที่สำเร็จแล้ว</small> -->
                            </v-card-text>

                            <hr style="border: 2px solid #000; background-color: #000; margin-top: -30px;">

                            <v-card-title style="margin-top: -20px;">
                                <span style="font-size:16px"><b>รายละเอียดเกี่ยวกับครู/นักเรียน</b></span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="name student" v-model="detail_user.name_student"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="phone number"
                                                v-if="status != 'teacher' && status != 'user'"
                                                v-model="detail_user.phone_student" readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="name teacher" v-model="detail_user.name"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="phone number"
                                                v-if="status != 'teacher' && status != 'user'"
                                                v-model="detail_user.phone_teacher" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>


                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <!-- <v-btn color="blue darken-1" text @click="dialog_detail = false">
                                    Save
                                </v-btn> -->
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>
        </div>

        <v-dialog v-model="dialog_excel" max-width="600px">
            <v-card class="p-4 rounded-xl">
                <v-card-title>
                    <span style="font-size: 16px">
                        <b>กรุณาเลือกข้อมูลที่ต้องการ Export</b>
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="dialog_excel = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row no-gutters>
                            <v-checkbox class="m-0" v-model="isExportAll" @change="check_excel()"
                                label="ข้อมูลทั้งหมด"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[0]" label="วันที่" :disabled="isExportAll"
                                value="วันที่"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[1]" label="เริ่มเรียน" :disabled="isExportAll"
                                value="เริ่มเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[2]" label="เลิกเรียน" :disabled="isExportAll"
                                value="เลิกเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[3]" label="รหัสครู" :disabled="isExportAll"
                                value="รหัสครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[4]" label="ชื่อเล่นครู" :disabled="isExportAll"
                                value="ชื่อเล่นครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[5]" label="รหัสนักเรียน"
                                :disabled="isExportAll" value="รหัสนักเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[6]" label="ชื่อจริงน้อง"
                                :disabled="isExportAll" value="ชื่อจริงน้อง"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[7]" label="นามสกุลน้อง" :disabled="isExportAll"
                                value="นามสกุลน้อง"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[8]" label="ชื่อเล่นน้อง"
                                :disabled="isExportAll" value="ชื่อเล่นน้อง"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[9]" label="วิชาที่เรียน"
                                :disabled="isExportAll" value="วิชาที่เรียน"></v-checkbox>
                        </v-row>
                    </v-container>
                </v-card-text>
                <hr style="border: 2px solid #000; background-color: #000; margin-top: -30px;">
                <v-card-title style="margin-top: -20px;">
                    <v-btn class="text-white" @click="exportToExcel()" color="green">ยืนยัน
                        <v-icon color="white" small> mdi-content-save</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-dialog>

    </div>
</template>



<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export default {
    data: () => ({
        showder: false,
        keyuser: null,
        status: null,

        isExportAll: false,
        selectedHeaders: [],
        dialog_excel: false,
        date: null,
        date_end: null,
        menu: false,
        menu2: false,
        modal: false,
        menu2: false,

        dash_all: 0,
        dash_active: 0,
        dash_notactive: 0,
        dialog_detail: false,
        detail_user: [],
        search_date: '',
        search_table_student: '',
        items: ['Day', 'Week', 'Month', 'All'],
        headers_student: [
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
            { text: 'สถานที่เรียน', value: 'name_style', align: 'center' },
            { text: 'วิชาที่สอน', value: 'name_subject', align: 'center' },
            { text: 'ระดับชั้น', value: 'level', align: 'center' },
            { text: 'วันที่สอน', value: 'date', align: 'center' },
            { text: 'เวลาเริ่มเรียน', value: 'time_s', align: 'center' },
            { text: 'เวลาเลิกเรียน', value: 'time_e', align: 'center' },
            { text: 'สถานะ', value: 'status', sortable: false, align: 'center' },
            { text: 'ดูข้อมูล', value: 'actions', sortable: false, align: 'center' },
        ],
        desserts_student: [],
        editedIndex: -1,
        arrayEvents: [],
        subject_all: [],
        location_all: [],
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
    mounted() {
        this.fullName();
        this.search_subject_all();
        this.search_location_all();
        // this.search_date_student();
    },
    created() {
        this.isMobile();
        this.arrayEvent_search();
    },

    methods: {
        isMobile() {
            if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                this.showder = true;
            }
        },
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
        search_date_input() {
            this.search_date_student();
        },
        getColor(stutus) {
            if (stutus === 'พร้อมเรียน') return '#29CC39'
            else if (stutus === 'รอยืนยัน') return '#FFCB33'
            else return 'red'
        },

        detail_match(item) {
            this.dialog_detail = true;
            this.detail_user = item;
            // console.log(item);
        },

        arrayEvent_search() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                this.arrayEvents = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        this.arrayEvents.push(date);
                    }
                }
            })
        },

        search_date_student_test() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                this.dash_all = 0;
                this.dash_active = 0;
                this.dash_notactive = 0;
                this.desserts_student = [];
                let item = [];
                let Day_start = this.date;
                let Day_end = this.date_end;
                let Day_array = this.genarateDay(Day_start, Day_end);
                snapshot.forEach((keySnapshot) => {
                    keySnapshot.forEach((dateSnapshot) => {
                        if (Day_array.includes(dateSnapshot.key)) {
                            dateSnapshot.forEach((timeSnapshot) => {
                                let timedata = timeSnapshot.val();
                                const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                const getStudentPromise = db.ref(`user/${keySnapshot.key}`).once("value");
                                const getsubjectPromise = this.subject_all[timedata.subject];
                                const getlocationPromise = this.location_all[timedata.style_subject];
                                Promise.all([getTeacherPromise, getStudentPromise])
                                    .then(([teacherSnapshot, studentSnapshot]) => {
                                        const teacherData = teacherSnapshot.val();
                                        const studentData = studentSnapshot.val();
                                        const subjectData = getsubjectPromise;
                                        const locationData = getlocationPromise;
                                        item.push({
                                            nametea_first: teacherData.firstName,
                                            nametea_last: teacherData.lastName,
                                            nickname_tea: teacherData.nickname,
                                            namestu_first: studentData.firstName,
                                            namestu_last: studentData.lastName,
                                            nickname_stu: studentData.nickname,
                                            name_student: studentData.studentId + " น้อง" + studentData.nickname + " " + studentData.firstName,
                                            name: teacherData.teacherId + " ครู" + teacherData.nickname,
                                            teacherId: teacherData.teacherId,
                                            studentId: studentData.studentId,
                                            teachernickname: teacherData.nickname,
                                            subject: timedata.subject,
                                            name_subject: subjectData.name,
                                            date: dateSnapshot.key,
                                            time_s: timedata.start,
                                            time_e: timedata.stop,
                                            style: timedata.style_subject,
                                            name_style: locationData.name,
                                            status: timedata.status,
                                            key_student: keySnapshot.key,
                                            key_teacher: timedata.teacher,
                                            phone_student: studentData.studentMobile,
                                            phone_teacher: teacherData.mobile,
                                            // class: timedata.class,
                                            level: timedata.level,
                                            because: timedata.because,
                                        })
                                        this.dash_all += 1;
                                        if (timedata.status === 'พร้อมเรียน') {
                                            this.dash_active += 1;
                                        } else if (timedata.status === 'รอยืนยัน') {
                                            this.dash_notactive += 1;
                                        } else {
                                            console.log('Error', timedata.status);
                                        }
                                    })
                            })
                        }
                    })
                })
                this.desserts_student = item;

            })
        },
        search_subject_all() {
            const db = this.$fireModule.database();
            db.ref(`subject_all/`).on("value", (snapshot) => {
                this.subject_all = snapshot.val();
                console.log(this.subject_all);
            })
        },
        search_location_all() {
            const db = this.$fireModule.database();
            db.ref(`location/`).on("value", (snapshot) => {
                this.location_all = snapshot.val();
                console.log(this.location_all);
            })
        },
        genarateDay(dayStart, dayEnd) {
            const dateArray = [];
            const currentDate = new Date(dayStart);
            while (currentDate <= new Date(dayEnd)) {
                dateArray.push(new Date(currentDate).toISOString().slice(0, 10));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dateArray;
        },

        search_date_student() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                this.dash_all = 0;
                this.dash_active = 0;
                this.dash_notactive = 0;
                const childData = snapshot.val();
                this.desserts_student = [];
                let item = [];
                let now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
                const formattedDate = now.toISOString().split('T')[0];
                let end = null;
                let edit = '';
                if (this.search_date == 'Day') {
                    end = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`);
                } else if (this.search_date == 'Week') {
                    if ((parseInt(formattedDate.substring(8, 10)) + 7) >= 30) {
                        edit = formattedDate.substring(0, 8) + 30;
                        end = new Date(edit);
                    } else if ((parseInt(formattedDate.substring(8, 10)) + 7) >= 31) {
                        edit = formattedDate.substring(0, 8) + 31;
                        end = new Date(edit);
                    } else {
                        edit = formattedDate.substring(0, 8) + (parseInt(formattedDate.substring(8, 10)) + 7);
                        end = new Date(edit);
                    }
                } else if (this.search_date == 'Month') {
                    now = new Date(formattedDate.substring(0, 5) + (parseInt(formattedDate.substring(5, 7))) + '-01');
                    edit = formattedDate.substring(0, 5) + (parseInt(formattedDate.substring(5, 7)) + 1) + '-01';
                    end = new Date(edit);
                } else if (this.search_date == 'All') {
                    edit = (parseInt(formattedDate.substring(0, 4)) + 5) + formattedDate.substring(4, 10);
                    end = new Date(edit);
                    now = new Date('2022-01-01');
                } else {
                    end = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`);
                }

                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        // เพิ่มการตรวจสอบว่ามีข้อมูลใน datedata ก่อนทำการดำเนินการต่อไป
                        const datedata = keydata[date];
                        if (this.date == null) {
                            // console.log(now, new Date(date), end);
                            if (end.getTime() >= new Date(date).getTime() &&
                                new Date(date).getTime() >= now.getTime()) {
                                for (const time in datedata) {
                                    const timedata = datedata[time];
                                    if (this.status == 'admin' || this.status == 'finance' || this.status == 'opFS' || this.status == 'opsupFS') {
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
                                                    nametea_first: teacherData.firstName,
                                                    nametea_last: teacherData.lastName,
                                                    nickname_tea: teacherData.nickname,
                                                    namestu_first: studentData.firstName,
                                                    namestu_last: studentData.lastName,
                                                    nickname_stu: studentData.nickname,
                                                    name_student: studentData.studentId + " น้อง" + studentData.nickname + " " + studentData.firstName,
                                                    name: teacherData.teacherId + " ครู" + teacherData.nickname,
                                                    teacherId: teacherData.teacherId,
                                                    studentId: studentData.studentId,
                                                    teachernickname: teacherData.nickname,
                                                    subject: timedata.subject,
                                                    name_subject: subjectData.name,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
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
                                                });
                                                this.dash_all += 1;
                                                if (timedata.status === 'พร้อมเรียน') {
                                                    this.dash_active += 1;
                                                } else if (timedata.status === 'รอยืนยัน') {
                                                    this.dash_notactive += 1;
                                                } else {
                                                    console.log('Error', timedata.status);
                                                }
                                                // ให้ตรวจสอบว่า item มีข้อมูลทั้งหมดแล้ว ถึงนำข้อมูลไปแสดงหน้า UI
                                                if (item.length === Object.keys(datedata).length) {
                                                    this.desserts_student = item;
                                                }
                                            })
                                            .catch((error) => {
                                                alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
                                            });
                                    } else if (this.status == 'teacher' && this.keyuser == timedata.teacher) {
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
                                                    nametea_first: teacherData.firstName,
                                                    nametea_last: teacherData.lastName,
                                                    nickname_tea: teacherData.nickname,
                                                    namestu_first: studentData.firstName,
                                                    namestu_last: studentData.lastName,
                                                    nickname_stu: studentData.nickname,
                                                    name_student: studentData.studentId + " น้อง" + studentData.nickname + " " + studentData.firstName,
                                                    name: teacherData.teacherId + " ครู" + teacherData.nickname,
                                                    teacherId: teacherData.teacherId,
                                                    studentId: studentData.studentId,
                                                    teachernickname: teacherData.nickname,
                                                    subject: timedata.subject,
                                                    name_subject: subjectData.name,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
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
                                                });
                                                this.dash_all += 1;
                                                if (timedata.status === 'พร้อมเรียน') {
                                                    this.dash_active += 1;
                                                } else if (timedata.status === 'รอยืนยัน') {
                                                    this.dash_notactive += 1;
                                                } else {
                                                    console.log('Error', timedata.status);
                                                }
                                                // ให้ตรวจสอบว่า item มีข้อมูลทั้งหมดแล้ว ถึงนำข้อมูลไปแสดงหน้า UI
                                                if (item.length === Object.keys(datedata).length) {
                                                    this.desserts_student = item;
                                                }
                                            })
                                            .catch((error) => {
                                                alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
                                            });
                                    } else if (this.status === "user" && this.keyuser === key) {
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
                                                    nametea_first: teacherData.firstName,
                                                    nametea_last: teacherData.lastName,
                                                    nickname_tea: teacherData.nickname,
                                                    namestu_first: studentData.firstName,
                                                    namestu_last: studentData.lastName,
                                                    nickname_stu: studentData.nickname,
                                                    name_student: studentData.studentId + " น้อง" + studentData.nickname + " " + studentData.firstName,
                                                    name: teacherData.teacherId + " ครู" + teacherData.nickname,
                                                    teacherId: teacherData.teacherId,
                                                    studentId: studentData.studentId,
                                                    teachernickname: teacherData.nickname,
                                                    subject: timedata.subject,
                                                    name_subject: subjectData.name,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
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
                                                });
                                                this.dash_all += 1;
                                                if (timedata.status === 'พร้อมเรียน') {
                                                    this.dash_active += 1;
                                                } else if (timedata.status === 'รอยืนยัน') {
                                                    this.dash_notactive += 1;
                                                } else {
                                                    console.log('Error', timedata.status);
                                                }
                                                // ให้ตรวจสอบว่า item มีข้อมูลทั้งหมดแล้ว ถึงนำข้อมูลไปแสดงหน้า UI
                                                if (item.length === Object.keys(datedata).length) {
                                                    this.desserts_student = item;
                                                }
                                            })
                                            .catch((error) => {
                                                alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
                                            });
                                    }
                                }
                            }
                        } else {
                            // console.log(new Date(date).getTime() , new Date(this.date).getTime());
                            if (new Date(date).getTime() >= new Date(this.date).getTime() &&
                                new Date(date).getTime() <= new Date(this.date).getTime()) {
                                for (const time in datedata) {
                                    const timedata = datedata[time];
                                    if (this.status == 'admin' || this.status == 'finance' || this.status == 'opFS' || this.status == 'opsupFS') {
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
                                                    nametea_first: teacherData.firstName,
                                                    nametea_last: teacherData.lastName,
                                                    nickname_tea: teacherData.nickname,
                                                    namestu_first: studentData.firstName,
                                                    namestu_last: studentData.lastName,
                                                    nickname_stu: studentData.nickname,
                                                    name_student: "น้อง" + studentData.nickname + " " + studentData.firstName,
                                                    name: "ครู" + teacherData.nickname + " " + teacherData.teacherId,
                                                    subject: timedata.subject,
                                                    name_subject: subjectData.name,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
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
                                                });
                                                this.dash_all += 1;
                                                if (timedata.status === 'พร้อมเรียน') {
                                                    this.dash_active += 1;
                                                } else if (timedata.status === 'รอยืนยัน') {
                                                    this.dash_notactive += 1;
                                                } else {
                                                    console.log('Error', timedata.status);
                                                }
                                                // ให้ตรวจสอบว่า item มีข้อมูลทั้งหมดแล้ว ถึงนำข้อมูลไปแสดงหน้า UI
                                                if (item.length === Object.keys(datedata).length) {
                                                    this.desserts_student = item;
                                                }
                                            })
                                            .catch((error) => {
                                                alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
                                            });
                                    } else if (this.status == 'teacher' && this.keyuser == timedata.teacher) {
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
                                                    nametea_first: teacherData.firstName,
                                                    nametea_last: teacherData.lastName,
                                                    nickname_tea: teacherData.nickname,
                                                    namestu_first: studentData.firstName,
                                                    namestu_last: studentData.lastName,
                                                    nickname_stu: studentData.nickname,
                                                    name_student: "น้อง" + studentData.nickname + " " + studentData.firstName,
                                                    name: "ครู" + teacherData.nickname + " " + teacherData.teacherId,
                                                    subject: timedata.subject,
                                                    name_subject: subjectData.name,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
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
                                                });
                                                this.dash_all += 1;
                                                if (timedata.status === 'พร้อมเรียน') {
                                                    this.dash_active += 1;
                                                } else if (timedata.status === 'รอยืนยัน') {
                                                    this.dash_notactive += 1;
                                                } else {
                                                    console.log('Error', timedata.status);
                                                }
                                                // ให้ตรวจสอบว่า item มีข้อมูลทั้งหมดแล้ว ถึงนำข้อมูลไปแสดงหน้า UI
                                                if (item.length === Object.keys(datedata).length) {
                                                    this.desserts_student = item;
                                                }
                                            })
                                            .catch((error) => {
                                                alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
                                            });
                                    } else if (this.status === "user" && this.keyuser === key) {
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
                                                    nametea_first: teacherData.firstName,
                                                    nametea_last: teacherData.lastName,
                                                    nickname_tea: teacherData.nickname,
                                                    namestu_first: studentData.firstName,
                                                    namestu_last: studentData.lastName,
                                                    nickname_stu: studentData.nickname,
                                                    name_student: studentData.studentId + " น้อง" + studentData.nickname + " " + studentData.firstName,
                                                    name: teacherData.teacherId + " ครู" + teacherData.nickname,
                                                    teacherId: teacherData.teacherId,
                                                    studentId: studentData.studentId,
                                                    teachernickname: teacherData.nickname,
                                                    subject: timedata.subject,
                                                    name_subject: subjectData.name,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
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
                                                });
                                                this.dash_all += 1;
                                                if (timedata.status === 'พร้อมเรียน') {
                                                    this.dash_active += 1;
                                                } else if (timedata.status === 'รอยืนยัน') {
                                                    this.dash_notactive += 1;
                                                } else {
                                                    console.log('Error', timedata.status);
                                                }
                                                // ให้ตรวจสอบว่า item มีข้อมูลทั้งหมดแล้ว ถึงนำข้อมูลไปแสดงหน้า UI
                                                if (item.length === Object.keys(datedata).length) {
                                                    this.desserts_student = item;
                                                }
                                            })
                                            .catch((error) => {
                                                alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
                                            });
                                    }

                                }
                            }
                        }
                    }
                }
                this.desserts_student = item;
                // console.log(this.desserts_student);
            });
        },
        check_excel() {
            if (this.isExportAll) {
                this.selectedHeaders = ['วันที่', 'เริ่มเรียน', 'เลิกเรียน', 'รหัสครู', 'ชื่อเล่นครู', 'รหัสนักเรียน', 'ชื่อจริงน้อง', 'นามสกุลน้อง', 'ชื่อเล่นน้อง', 'วิชาที่เรียน']
            } else { this.selectedHeaders = []; }
        },
        exportToExcel() {
            // หัวข้อเอกสาร Excel
            let newdate = new Date().getFullYear() + ' ' + (parseInt(new Date().getMonth()) + 1) + ' ' + new Date().getDate();
            const headers = this.selectedHeaders;

            // แปลง this.desserts_student เป็นอาร์เรย์ของอาร์เรย์ (array of arrays) และเพิ่มหัวข้อไว้ด้านบน
            const data = [headers, ...this.desserts_student.map(item => {
                const row = [];
                if (this.isExportAll) {
                    if (this.selectedHeaders[0]) {
                        if (item.date) {
                            row.push(item.date);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[1]) {
                        if (item.time_s) {
                            row.push(item.time_s);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[2]) {
                        if (item.time_e) {
                            row.push(item.time_e);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[3]) {
                        if (item.teacherId) {
                            row.push(item.teacherId);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[4]) {
                        if (item.teachernickname) {
                            row.push(item.teachernickname);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[5]) {
                        if (item.studentId) {
                            row.push(item.studentId);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[6]) {
                        if (item.namestu_first) {
                            row.push(item.namestu_first);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[7]) {
                        if (item.namestu_last) {
                            row.push(item.namestu_last);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[8]) {
                        if (item.nickname_stu) {
                            row.push(item.nickname_stu);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[9]) {
                        if (item.name_subject) {
                            row.push(item.name_subject);
                        } else {
                            row.push("");
                        }
                    }
                } else {
                    if (this.selectedHeaders[0]) {
                        if (item.date) {
                            row.push(item.date);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[1]) {
                        if (item.time_s) {
                            row.push(item.time_s);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[2]) {
                        if (item.time_e) {
                            row.push(item.time_e);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[3]) {
                        if (item.teacherId) {
                            row.push(item.teacherId);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[4]) {
                        if (item.teachernickname) {
                            row.push(item.teachernickname);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[5]) {
                        if (item.studentId) {
                            row.push(item.studentId);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[6]) {
                        if (item.namestu_first) {
                            row.push(item.namestu_first);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[7]) {
                        if (item.namestu_last) {
                            row.push(item.namestu_last);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[8]) {
                        if (item.nickname_stu) {
                            row.push(item.nickname_stu);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[9]) {
                        if (item.name_subject) {
                            row.push(item.name_subject);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                }
                return row;
            })];
            console.log(data);

            // สร้างเอกสาร Excel
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

            // แปลงข้อมูลให้เป็นรูปแบบไฟล์ Excel
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // สร้าง Blob และบันทึกไฟล์
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `${newdate}-dashboard.xlsx`);
        },

    },
}
</script>
<style>
.v-data-table-header th {
    background-color: #D4C1B2;
    /* เปลี่ยนเป็นสีที่คุณต้องการ */
}

.fonts500 {
    font-family: 'Prompt', sans-serif;
    /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
    font-weight: 500;
}

.fonts300 {
    font-family: 'Prompt', sans-serif;
    /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
    font-weight: 300;
}</style>
