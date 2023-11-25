<template>
    <div>
        <v-btn :hidden="!showder" @click="switch_calendar()" class="mb-5 rounded-xl font-weight-bold"
            style="font-size: 20px;" color="brown lighten-4">
            แสดงตารางสอน <v-icon class="mdi mdi-calendar-month text-h8"></v-icon>
        </v-btn>

        <div class="mb-3 " :hidden="show_date"> <!--hide-on-mobile-->
            <v-row class="fill-height">
                <v-col>
                    <v-sheet height="64">
                        <v-toolbar flat style="background-color:#AD382F;" class="rounded-t-xl elevation-16">
                            <v-btn outlined class="mr-4" color="grey lighten-5" @click="setToday">
                                Today
                            </v-btn>
                            <v-btn fab text small color="grey lighten-5" @click="prev">
                                <v-icon small>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn fab text small color="grey lighten-5" @click="next">
                                <v-icon small>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                            <v-toolbar-title v-if="$refs.calendar" style="color:#FAFAFA">
                                {{ $refs.calendar.title }}
                            </v-toolbar-title>

                            <v-spacer></v-spacer>
                            <v-menu bottom right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn outlined color="grey lighten-5" v-bind="attrs" v-on="on">
                                        <span>{{ typeToLabel[type] }}</span>
                                        <v-icon right>
                                            mdi-menu-down
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="type = 'day'">
                                        <v-list-item-title>Day</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'week'">
                                        <v-list-item-title>Week</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'month'">
                                        <v-list-item-title>Month</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                            :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay"
                            @click:date="viewDay"></v-calendar>
                        <!-- <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement"
                            offset-x>
                            <v-card color="grey lighten-4" min-width="350px" flat>
                                <v-toolbar :color="selectedEvent.color" dark>
                                    <v-btn icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn> -->
                        <!--eslint-disable-next-line vue/no-v-text-v-html-on-component-->
                        <!-- <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <span v-html="selectedEvent.details"></span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text color="secondary" @click="selectedOpen = false">
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu> -->
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
        <div v-if="!showder" class="mt-5">
            <v-text-field append-icon="mdi-magnify" v-model="search" label="ค้นหา " outlined />
        </div>
        <template>
            <v-data-table :headers="headers" :items-per-page="15" :items="filteredDesserts" sort-by="date" :search="search"
                class="elevation-16 rounded-xl"> <!-- desserts -->
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.sum_people="{ item }">
                    <v-chip color="amber lighten-3" class="rounded-xl">
                        {{ item.sum_people }}
                    </v-chip>
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.actions="{ item }">
                    <v-btn class="rounded-xl" color="green darken-2" @click="editItem(item)" elevation="24">
                        <v-icon small class="text-h5" color="white">
                            mdi-plus
                        </v-icon>
                    </v-btn>

                    <!-- <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon> -->
                </template>

                <template v-slot:top>
                    <v-toolbar flat color="#F8F9FB" class="rounded-t-xl">
                        <v-toolbar-title v-if="!showder" style="font-size:16px"><b>ตารางจองเวลาเรียน</b></v-toolbar-title>
                        <v-toolbar-title v-if="showder"><b>ตารางจองเวลาเรียน</b></v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-text-field v-if="showder" class="me-10" append-icon="mdi-magnify" v-model="classSearch"
                            label="Search Class" single-line hide-details style="max-width: 200px;" />
                        <v-text-field v-if="showder" class="me-10" append-icon="mdi-magnify" v-model="subjectSearch"
                            label="Search Subject" single-line hide-details style="max-width: 200px;" />
                        <v-text-field v-if="showder" class="me-10" append-icon="mdi-magnify" v-model="dateSearch"
                            label="Search Date" single-line hide-details style="max-width: 200px;" />

                        <v-text-field v-if="showder" class="me-10" v-model="search" append-icon="mdi-magnify"
                            label="Search All" single-line hide-details style="max-width: 200px;"></v-text-field>
                        <v-dialog v-model="dialog" max-width="600px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark v-bind="attrs" v-on="on" elevation="10" color="green darken-2"
                                    class="mb-2 mt-5">
                                    จองคิวนอกตาราง<span class="mdi mdi-plus text-h6"></span>
                                </v-btn>
                            </template>
                            <v-card class="rounded-l-xl">
                                <v-card-title>
                                    <span class="text-h8"><b>{{ formTitle }}</b></span>
                                    <v-spacer></v-spacer>
                                    <v-btn fab dark small color="#37474F" @click="close(), dialog = false">
                                        <v-icon dark class="text-h5">
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form ref="form_add" v-model="valid_add" lazy-validation>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date"
                                                        persistent width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="date" label="วันที่เรียน"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                :rules="[v => (v || '').length > 0 || 'กรุณาระบุข้อมูล']"
                                                                v-on="on" required></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="date" scrollable multiple
                                                            :rules="[v => !!v || 'กรุณาเลือกวันที่']" required
                                                            :readonly="mode == 'พร้อมเรียน'">
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="modal = false">
                                                                Cancel
                                                            </v-btn>
                                                            <v-btn text color="primary" @click="$refs.dialog.save(date)">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-dialog>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-autocomplete v-model="All_data.subject" :items="subject_select"
                                                        item-value="key" item-text="name" label="ชื่อวิชา"
                                                        @input="search_level()" :rules="[v => !!v || 'กรุณาเลือก']"
                                                        required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-autocomplete v-model="All_data.level" :items="level_select"
                                                        label="ระดับการศักษา" @input="search_teacher()"
                                                        :rules="[v => !!v || 'กรุณาเลือก']" required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-autocomplete v-model="All_data.teacher" :items="teacher_select"
                                                        item-value="key" item-text="name" label="เลือกคุณครู"
                                                        :readonly="mode == 'พร้อมเรียน'" :rules="[v => !!v || 'กรุณาเลือก']"
                                                        required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-autocomplete v-model="All_data.student" :items="student_select"
                                                        item-value="key" item-text="name" label="เลือกนักเรียน"
                                                        :rules="[v => !!v || 'กรุณาเลือก']" required
                                                        @input="search_location()"></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-autocomplete v-model="All_data.style_subject"
                                                        :items="location_select" item-value="key" item-text="name"
                                                        label="สถานที่สอน" :rules="[v => !!v || 'กรุณาเลือก']"
                                                        @input="select_class(All_data.style_subject)"
                                                        required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" md="6" v-if="All_data.show_time_flip">
                                                    <p>ชั่วโมง FlipClass เหลือ {{ All_data.show_time_flip }}Hr.</p>
                                                </v-col>
                                                <v-col cols="12" md="6" v-if="All_data.show_time_private">
                                                    <p>ชั่วโมง PrivateClass เหลือ {{ All_data.show_time_private }}Hr.</p>
                                                </v-col>
                                                <v-col cols="12" md="6" v-if="All_data.show_time_flip_match">
                                                    <p>ชั่วโมง FlipClass ที่จองไป {{ All_data.show_time_flip_match }}Hr.</p>
                                                </v-col>
                                                <v-col cols="12" md="6" v-if="All_data.show_time_private_match">
                                                    <p>ชั่วโมง PrivateClass ที่จองไป {{ All_data.show_time_private_match
                                                    }}Hr.</p>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-autocomplete :items="time_standart" v-model="All_data.start"
                                                        label="เริ่มเรียน"
                                                        @input="validateTime(All_data.start, All_data.stop), All_data.stop = null"
                                                        :rules="[v => !!v || 'กรุณาเลือก']" required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-autocomplete :items="time_standart_stop" v-model="All_data.stop"
                                                        @input="validateTime(All_data.start, All_data.stop)"
                                                        label="เลิกเรียน" :rules="[v => !!v || 'กรุณาเลือก']"
                                                        required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6" style="margin-top:-20px"
                                                    v-if="status != 'user'">
                                                    <v-checkbox v-model="All_data.match_test"
                                                        label="ทดลองเรียน"></v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6" style="margin-top:-20px"
                                                    v-if="status != 'user'">
                                                    <v-checkbox v-model="All_data.match_vip" label="กรณีพิเศษ(Private)"
                                                        @click="select_class(All_data.style_subject)"></v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-text-field label="วัตถุประสงค์ในการเรียนครั้งนี้/หัวข้อที่เรียน"
                                                        v-model="All_data.because"
                                                        :rules="[v => (v || '').length > 0 || 'กรุณาระบุข้อมูล']"
                                                        required></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn rounded color="#29CC39" class="mb-5" @click="validate_add(), dialog_load = true"
                                        dark>
                                        บันทึก<span class="mdi mdi-content-save text-h6"></span>
                                    </v-btn>
                                    <v-spacer></v-spacer>
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

                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </template>

        <v-dialog v-model="dialogError" max-width="300px" class="text-center">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="dialogError = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <div class="text-center">
                    <img :src="require('~/assets/Frame.png')">
                </div>
                <div class="text-center mt-5">
                    <b>{{ textError }}</b>
                    <br>
                </div>
                <v-card-actions>
                    <!-- <v-spacer></v-spacer>
                    <v-btn rounded color="#29CC39" @click="ErrorItemConfirm" class="mt-5 mb-5">ยืนยัน</v-btn>
                    <v-spacer></v-spacer> -->
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog_load" hide-overlay persistent width="300">
            <v-overlay :value="dialog_load">
                <v-card color="primary" dark>
                    <v-card-text>
                        Please stand by
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-overlay>
        </v-dialog>

    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    layout: 'login',
    data: () => ({
        showder: true,
        show_date: true,
        search: '',
        subjectSearch: '',
        dateSearch: '',
        classSearch: '',
        dialog_date: false,
        classMatchData: ['hello', 'boot'],

        dialog_load: false,
        textError: '',
        dialogError: false,

        date: [],
        modal: false,

        valid: true,
        valid_add: true,

        All_data: [],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        LimitedClass_all: [],
        time_standart: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
        time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
        time_standart_stop: [],
        time_standart_sum: [],
        picker_start: null,
        picker_stop: null,

        //------TABLE---------
        dialog: false,
        dialogDelete: false,

        arrayEvents: [],
        headers: [
            {
                text: 'ชื่อครู',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            // { text: 'ประเภทคลาส', value: 'class', align: 'center' },
            { text: 'ประเภทคลาส', value: 'style', align: 'center' },
            { text: 'วิชาที่สอน', value: 'subject', align: 'start' },
            { text: 'วันที่สอน', value: 'date', align: 'center' },
            { text: 'เวลาเริ่มต้น', value: 'time_s', align: 'center' },
            { text: 'เวลาสิ้นสุด', value: 'time_e', align: 'center' },
            { text: 'จำนวนนักเรียน', value: 'sum_people', align: 'center' },
            { text: 'จองคิว', value: 'actions', sortable: false, align: 'center' },
        ],
        desserts: [],
        editedIndex: -1,
        defaultItem: [],
        //-----------------------

        subject_select: [],
        level_select: [],
        teacher_select: [],
        student_select: [],
        location_select: [],

        mode: null,

        //-----------CALENDAR------------------------------
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        focus: '',
        type: 'week',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day', '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        //-----------CALENDAR------------------------------

        location_all: [],
    }),
    mounted() {
        //-----------CALENDAR------------------------------
        this.$refs.calendar.checkChange();
        //-----------CALENDAR------------------------------

    },
    computed: {
        ...mapState(['firstName', 'status']),
        formTitle() {
            this.mode = this.editedIndex === -1 ? 'รอยืนยัน' : 'พร้อมเรียน'
            return this.editedIndex === -1 ? 'จองเวลาเรียนนอกตาราง' : 'จองเวลาเรียนในตาราง'
        },
        filteredDesserts() {
            // ใช้ this.subjectSearch และ this.dateSearch เพื่อกรองรายการ desserts
            return this.desserts.filter(dessert => {
                const subjectMatch = dessert.subject.toLowerCase().includes(this.subjectSearch.toLowerCase());
                const dateMatch = dessert.date.toLowerCase().includes(this.dateSearch.toLowerCase());
                const classMatch = dessert.style.toLowerCase().includes(this.classSearch.toLowerCase());
                return subjectMatch && dateMatch && classMatch;
            });
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
        this.search_location_all();
        this.isMobile();
        this.LimitedClass_search();
        this.search_subject_select();
        this.search_student();
        this.search_date_teacher();
    },
    methods: {
        checknameLocation(item) {
            let namelocation = '';
            if (Array.isArray(item)) {
                for (const key in item) {
                    for (const keyloca in this.location_all) {
                        if (keyloca === item[key]) {
                            namelocation += this.location_all[keyloca].name;
                            if (item.length != (parseInt(key) + 1)) {
                                namelocation += ` ,`;
                            }
                        }
                    }
                }
                return namelocation;
            } else {
                for (const key in this.location_all) {
                    if (key === item) {
                        return this.location_all[key].name;
                    }
                }
                return namelocation;
            }
        },
        search_location_all() {
            const db = this.$fireModule.database();
            db.ref(`location/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    let obj = { [key]: { key: key, name: childData[key].name, location: childData[key].location } }
                    item = { ...item, ...obj };
                }
                this.location_all = item;
            })
        },
        isMobile() {
            if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                this.showder = false;
                // this.$router.push({ path: 'student_m/'});
            }
            console.log(this.showder);
        },
        switch_calendar() {
            if (this.show_date) {
                this.show_date = false;
            } else {
                this.show_date = true;
            }
        },
        //-----------CALENDAR------------------------------
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = ''
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange({ start, end }) {
            const events = []

            const min = new Date(`${start.date}T00:00:00`)
            const max = new Date(`${end.date}T23:59:59`)
            const days = (max.getTime() - min.getTime()) / 86400000
            const eventCount = this.rnd(days, days + 20)

            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                const second = new Date(first.getTime() + secondTimestamp)

                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                })
            }

            this.events = events
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        //-----------CALENDAR------------------------------

        getRandomColor() {
            const randomIndex = Math.floor(Math.random() * this.colors.length)
            const randomColor = this.colors[randomIndex]
            return randomColor
        },
        sum_hour(start, end) {
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
        select_class(items) {
            console.log(this.All_data, this.mode);
            if (!this.All_data.teacher) {
                return;
            }
            if (this.All_data.match_vip) {
                this.All_data.select = '-NcQsHB9vgG53lJKPA-i';
                return;
            }
            const selectedObject = this.location_select.find(item => item.key === items);
            if (selectedObject.name.includes('Flip')) {
                this.All_data.select = '-NcQsFxCcoNS-uwmKUqE';
            } else if (selectedObject.name.includes('Private')) {
                this.All_data.select = '-NcQsHB9vgG53lJKPA-i';
            }
        },
        search_location() {
            this.All_data.show_time_flip = "0";
            this.All_data.show_time_private = "0";
            this.All_data.show_time_flip_match = "0";
            this.All_data.show_time_private_match = "0";
            const db = this.$fireModule.database();
            if (this.mode == 'รอยืนยัน') {
                this.location_select = [];
            }
            const getTeacherPromise = db.ref(`user/${this.All_data.teacher}`).once("value");
            const getStudentPromise = db.ref(`user/${this.All_data.student}`).once("value");
            const getHourMatchPromise = db.ref(`hour_match/${this.All_data.student}`).once("value");
            Promise.all([getTeacherPromise, getStudentPromise, getHourMatchPromise])
                .then((snapshots) => {
                    const teacherSnapshot = snapshots[0];
                    const studentSnapshot = snapshots[1];
                    const hourmatchSnapshot = snapshots[2];
                    const location = teacherSnapshot.val();
                    const studentData = studentSnapshot.val();
                    const hourmatchData = hourmatchSnapshot.val();
                    for (const key in location.classLocation) {
                        db.ref(`location/${location.classLocation[key]}`).once("value", (snapshot) => {
                            const childData = snapshot.val();
                            if (studentData.hourLeft && childData.name.includes('Flip')) {
                                if (this.mode == 'รอยืนยัน') {
                                    this.location_select.push({ name: childData.name, key: location.classLocation[key] });
                                }
                                this.All_data.show_time_flip = studentData.hourLeft;
                            }
                            if (studentData.privateHourLeft && childData.name.includes('Private')) {
                                if (this.mode == 'รอยืนยัน') {
                                    this.location_select.push({ name: childData.name, key: location.classLocation[key] });
                                }
                                this.All_data.show_time_private = studentData.privateHourLeft;
                            }
                        })
                    }
                    if (hourmatchData && hourmatchData.hour) {
                        this.All_data.show_time_flip_match = hourmatchData.hour;
                    }
                    if (hourmatchData && hourmatchData.hourprivate) {
                        this.All_data.show_time_private_match = hourmatchData.hourprivate;
                    }
                })

        },
        async search_student() {
            await this.$nextTick();
            console.log(this.firstName, this.status);
            const db = this.$fireModule.database();
            if (this.status.includes("user")) {
                db.ref(`user/${this.firstName}`).on("value", (snapshot) => {
                    const childData = snapshot.val();
                    let item = [];
                    item.push({ key: this.firstName, name: childData.studentId + " น้อง" + childData.nickname });
                    this.student_select = item;
                })
            } else {
                db.ref("user/").on("value", (snapshot) => {
                    const childData = snapshot.val();
                    let item = [];
                    for (const key in childData) {
                        if (childData[key].status == 'user') {
                            item.push({ key: key, name: childData[key].studentId + " น้อง" + childData[key].nickname });
                        }
                    }
                    this.student_select = item;
                })
            }
        },

        search_teacher() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                const childData = snapshot.val();
                let item = [];
                if (this.All_data.subject != undefined &&
                    this.All_data.level != undefined) {
                    for (const key in childData) {
                        if (childData[key].status === 'teacher' &&
                            this.check_sub(this.All_data.subject, key) &&
                            this.check_level(this.All_data.level, this.All_data.subject, key)
                        ) {
                            item.push({ key: key, name: childData[key].teacherId + " ครู" + childData[key].nickname });
                        }
                    }
                    this.teacher_select = item;
                } else {
                    for (const key in childData) {
                        if (childData[key].status == 'teacher') {
                            item.push({ key: key, name: childData[key].teacherId + " ครู" + childData[key].nickname });
                        }
                    }
                    this.teacher_select = item;
                }
            })
        },
        check_sub(sub, key) {
            let name;
            const subject = [];
            const db = this.$fireModule.database();
            db.ref(`subject_all/${sub}`).once("value", (snapshot) => {
                const childData = snapshot.val();
                name = childData.name;
            })
            db.ref(`user/${key}/subject_all`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const detail = childData[key];
                    subject.push(detail.name);
                }
            })
            if (subject.includes(name)) {
                return true;
            } else {
                return false;
            }
        },
        check_level(level, sub, key) {
            let name;
            let levels = [];
            const db = this.$fireModule.database();
            db.ref(`subject_all/${sub}`).once("value", (snapshot) => {
                const childData = snapshot.val();
                name = childData.name;
            })
            db.ref(`user/${key}/subject_all`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const detail = childData[key];
                    if (detail.name === name) {
                        levels = detail.level;
                        break;
                    }
                }
            })
            if (levels.includes(level)) {
                return true;
            } else {
                return false;
            }
        },
        search_level() {
            console.log(this.subject_select, this.All_data.subject);
            const selectedObject = this.subject_select.find(item => item.key === this.All_data.subject);
            this.level_select = selectedObject.level;
            console.log(selectedObject);
        },
        search_subject_select() {
            const db = this.$fireModule.database();
            db.ref("subject_all/").on("value", (snapshot) => {
                const childData = snapshot.val();
                let item = [];
                for (const key in childData) {
                    const detail = childData[key];
                    if (key != "00000") { // ตรวจสอบชื่อก่อนเพิ่มข้อมูลเข้า array
                        item.push({ key: key, name: detail.name, level: detail.level });
                    }
                }
                this.subject_select = item;
                console.log(this.subject_select);
            })
        },

        search_subject_match(item) {
            let items = [];
            for (const key in item) {
                const detail = item[key];
                if (key != "00000") { // ตรวจสอบชื่อก่อนเพิ่มข้อมูลเข้า array
                    items.push({ key: key, name: detail.name, level: detail.level });
                }
            }
            this.subject_select = items;
            console.log(this.subject_select);
        },



        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.All_data = Object.assign({}, item);
            console.log(this.All_data);
            this.dialog = true;
            this.check_time_select(item);
            this.location_select = this.select_locatio_all_map(this.All_data.style_subject);
            // this.location_select.push({ name: this.All_data.full_location.name, key: this.All_data.full_location.key });
            this.teacher_select.push({ name: this.All_data.full_teacher.name, key: this.All_data.full_teacher.key })
            this.date = [this.All_data.date];
            console.log(this.All_data);
            if (this.All_data.keysubject == '00000') {
                this.search_subject_match(this.All_data.teacher_subject);
            } else {
                this.subject_select = [{ name: this.All_data.full_subject.name, key: this.All_data.full_subject.key, level: this.All_data.full_subject.level }];
            }
        },

        select_locatio_all_map(item) {
            let namelocation = [];
            if (Array.isArray(item)) {
                for (const key in item) {
                    for (const keyloca in this.location_all) {
                        if (keyloca === item[key]) {
                            namelocation.push(this.location_all[keyloca]);
                        }
                    }
                }
                return namelocation;
            } else {
                for (const key in this.location_all) {
                    if (key === item) {
                        return this.location_all[key];
                    }
                }
            }
        },

        check_time_select(item) {
            this.time_standart = [];
            this.time_standart_stop = [];
            let sum = 0;
            for (const key in this.time_full) {
                if (item.time_e == this.time_full[key]) {
                    sum = 0;
                    this.time_standart.push(this.time_full[key]);
                    this.time_standart_stop.push(this.time_full[key]);
                    break;
                }
                else if (item.time_s == this.time_full[key] || (sum != 0)) {
                    sum++;
                    this.time_standart.push(this.time_full[key]);
                    this.time_standart_stop.push(this.time_full[key]);
                }
            }
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.All_data = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.date = [];
            this.$nextTick(() => {
                this.All_data = Object.assign({}, this.defaultItem);
                this.time_standart = this.time_full;
                this.time_standart_stop = null;
                this.subject_select = [];
                this.level_select = [];
                this.teacher_select = [];
                this.student_select = [];
                this.location_select = [];
                this.LimitedClass_search();
                this.search_subject_select();
                this.search_student();
                this.editedIndex = -1
                this.resetValidation();
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.All_data = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save(item) {
            if (this.editedIndex > -1) { //------EDIT----------
                this.save_time();
                // Object.assign(this.desserts[this.editedIndex], this.All_data)
            } else { //------SAVE----------
                // this.desserts.push(item); 
                this.save_time();
            }
            // this.close();
            console.log(item, this.editedIndex);
        },
        initialize() {
            this.desserts = [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                },
            ]
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
        validateTime(start, stop) {
            this.time_standart_stop = [];
            let sum = 0;
            for (const key in this.time_standart) {
                if (start == this.time_standart[key] || (sum != 0)) {
                    sum++;
                    if (sum > 1) {
                        this.time_standart_stop.push(this.time_standart[key]);
                    }
                }
            }
            if (stop != null && start != null) {
                this.All_data.time_sum = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (stop == this.time_standart[key]) {
                        sum = 0;
                        break;
                    }
                    else if (start == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        this.All_data.time_sum.push(this.time_standart[key]);
                    }
                }
            }
            console.log(this.All_data.time_sum);
        },

        //------------CHECK_new-------------------------
        validate_add() {
            if (this.$refs.form_add.validate()) {
                console.log('บันทึกผ่าน>>>', this.All_data);
                this.save(this.All_data);
            } else {
                setTimeout(() => (this.dialog_load = false), 300)
            }
        },
        //----------------------------------------------

        validate_del() {
            if (this.$refs.form_add.validate()) {
                console.log('บันทึกผ่าน', this.All_data);
                this.deleteAndReorder();
            }
        },
        reset() {
            this.$refs.form_add.reset()
        },
        resetValidation() {
            this.$refs.form_add.resetValidation()
        },

        generateRandomId(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charactersLength);
                result += characters.charAt(randomIndex);
            }

            return result;
        },

        async save_time() {
            const db = this.$fireModule.database();
            const selectedObject = this.LimitedClass_all.find(item => item.key === this.All_data.select);
            const selectedObjectFC = this.LimitedClass_all.find(item => item.key === "-NcQsFxCcoNS-uwmKUqE");
            console.log('Selected item:', selectedObject ,selectedObjectFC);
            const data = this.All_data;
            let isSave = 0;
            let maxKeyOut = 0;
            let hour = this.sum_hour(data.start, data.stop);
            console.log("hour", hour);

            if (data.match_vip) {
                if (parseFloat(data.show_time_flip) + parseFloat(data.show_time_flip_match) < hour * parseInt(this.date.length)) {
                    this.textError = 'ชั่วโมงเรียน Flip Class ไม่พอ';
                    setTimeout(() => (this.dialog_load = false), 300)
                    this.dialogError = true;

                    return;
                }
            }
            else if (parseFloat(data.show_time_flip) + parseFloat(data.show_time_flip_match) < hour * parseInt(this.date.length) && data.select == "-NcQsFxCcoNS-uwmKUqE") {
                this.textError = 'ชั่วโมงเรียน Flip Class ไม่พอ';
                setTimeout(() => (this.dialog_load = false), 300)
                this.dialogError = true;

                return;
            }
            else if (parseFloat(data.show_time_private) + parseFloat(data.show_time_private_match) < hour * parseInt(this.date.length) && data.select == "-NcQsHB9vgG53lJKPA-i") {
                this.textError = 'ชั่วโมงเรียน Private Class ไม่พอ';
                setTimeout(() => (this.dialog_load = false), 300)
                this.dialogError = true;

                return;
            }

            for (const keydate in this.date) {
                let text = '';
                let textadd = '';
                for (const key in data.time_sum) {
                    await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).orderByValue().equalTo(data.student).once("value")
                        .then(snapshot => {
                            if (snapshot.exists()) {
                                textadd = textadd.concat(' ', data.time_sum[key])
                                isSave++;
                            }
                            else {
                                return db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).once("value");
                            }

                            if (data.time_sum.length == parseInt(key) + 1 && textadd.length != 0) {
                                this.textError = 'จองไปแล้ว ซ้ำ' + textadd + " " + this.date[keydate];
                                this.dialogError = true;
                                setTimeout(() => (this.dialog_load = false), 300)
                            }
                        })
                        .then(snapshot => {
                            if (snapshot) {
                                let maxKey = 0;
                                snapshot.forEach(childSnapshot => {
                                    const childKey = parseInt(childSnapshot.key);
                                    if (childKey >= maxKey) {
                                        maxKey = childKey + 1;
                                        maxKeyOut = maxKey;
                                    }
                                });
                                if (maxKey >= selectedObject.bath) {
                                    text = text.concat(" ", data.time_sum[key]);
                                    isSave++;
                                }
                                if(data.style_subject === '-Nk3w7bsmBEoOk9V0mtm' ||
                                    data.style_subject === '-Nk3wCgpi5_m5g7DO4kJ' ||
                                    data.style_subject === '-Nk3wFoslv3edqH8oe82' && maxKey >= selectedObjectFC.bath){
                                        console.log("ไปๆๆ");
                                        text = text.concat(" ", data.time_sum[key]);
                                        isSave--;
                                }
                                if (data.time_sum.length == parseInt(key) + 1 && text.length != 0) {
                                    this.textError = 'เต็มแล้ว' + text + " " + this.date[keydate];
                                    this.dialogError = true;
                                    setTimeout(() => (this.dialog_load = false), 300)
                                }
                                if (maxKey < selectedObject.bath && data.time_sum.length == parseInt(key) + 1) {
                                    console.log('send save');
                                }
                                if (maxKey < selectedObject.bath && data.time_sum.length == parseInt(key) + 1 && textadd.length != 0) {
                                    this.textError = textadd;
                                    this.dialogError = true;
                                    setTimeout(() => (this.dialog_load = false), 300)
                                }
                                console.log('WorkData', maxKey, selectedObject.bath, data.time_sum.length, parseInt(key) + 1, isSave);
                                console.log('>>>>>>', textadd.length);
                            }
                        });
                }
            }

            if (isSave == 0) {
                console.log('save success');
                for (const keydate in this.date) {
                    console.log(this.date[keydate]);
                    for (const key in data.time_sum) {
                        const snapshot = await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).once("value");
                        if (selectedObject.key == '-NcQsHB9vgG53lJKPA-i' &&
                            data.style_subject != '-Nk3w7bsmBEoOk9V0mtm' &&
                            data.style_subject != '-Nk3wCgpi5_m5g7DO4kJ' &&
                            data.style_subject != '-Nk3wFoslv3edqH8oe82') {
                            for (let x = 0; x < this.LimitedClass_all[0].bath; x++) {
                                await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).update({
                                    [x]: data.student
                                });
                            }
                        } else if (selectedObject.key == '-NcQsHB9vgG53lJKPA-i' &&
                            data.style_subject === '-Nk3w7bsmBEoOk9V0mtm' ||
                            data.style_subject === '-Nk3wCgpi5_m5g7DO4kJ' ||
                            data.style_subject === '-Nk3wFoslv3edqH8oe82') {
                            if (snapshot) {
                                let maxKey = 0;
                                snapshot.forEach(childSnapshot => {
                                    const childKey = parseInt(childSnapshot.key);
                                    if (childKey >= maxKey) {
                                        maxKey = childKey + 1;
                                    }
                                });
                                await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).update({
                                    [maxKey]: data.student
                                });
                            } else {
                                await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).update({
                                    [maxKeyOut]: data.student
                                });
                            }
                        } else if (selectedObject.key == '-NcQsFxCcoNS-uwmKUqE') {
                            if (snapshot) {
                                let maxKey = 0;
                                snapshot.forEach(childSnapshot => {
                                    const childKey = parseInt(childSnapshot.key);
                                    if (childKey >= maxKey) {
                                        maxKey = childKey + 1;
                                    }
                                });
                                await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).update({
                                    [maxKey]: data.student
                                });
                            } else {
                                await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).update({
                                    [maxKeyOut]: data.student
                                });
                            }
                        }
                    }
                    await db.ref(`date_match/${data.student}/${this.date[keydate]}/${data.stop}/`).update({
                        // idclass : this.generateRandomId(10),
                        select_class: data.select,
                        teacher: data.teacher,
                        date: this.date[keydate],
                        subject: data.subject,
                        style_subject: data.style_subject,
                        level: data.level,
                        start: data.start,
                        stop: data.stop,
                        because: data.because,
                        status: this.mode,
                        createAt: new Date(),
                        match_test: data.match_test || false,
                        match_vip: data.match_vip || false,
                        hour: hour,
                    });
                    if (this.mode == 'พร้อมเรียน') {
                        const inviteData = await db.ref(`date_teacher/${data.teacher}/${data.date}/${data.time_s}E${data.time_e}/invite/`).once("value");
                        // const idclassTea = await db.ref(`date_teacher/${data.teacher}/${data.date}/${data.start}E${data.stop}/idclass/`).once("value");
                        let people_sum = 1;
                        console.log('showพร้อมเรียน', data);
                        // console.log(idclassTea.val());
                        // if(idclassTea.exists()){
                        //     await db.ref(`date_match/${data.student}/${this.date[keydate]}/${data.stop}/`).update({
                        //         idclass : idclassTea.val(),
                        //     });
                        // }
                        if (inviteData.exists()) {
                            people_sum = people_sum + inviteData.val();
                        }
                        await db.ref(`date_teacher/${data.teacher}/${this.date[keydate]}/${data.time_s}E${data.time_e}`).update({
                            invite: people_sum,
                        });
                    }
                    const hourMatch = await db.ref(`hour_match/${data.student}`).once("value");
                    if (data.match_vip && data.match_test != true) {
                        if (hourMatch.exists()) {
                            let huorMatch_data = hourMatch.val();
                            await db.ref(`hour_match/${data.student}/`).update({
                                hour: parseFloat(hour) + parseFloat(huorMatch_data.hour),
                            });
                            console.log('ทดชม Flip');
                        } else {
                            await db.ref(`hour_match/${data.student}/`).update({
                                hour: parseFloat(hour),
                                hourprivate: 0,
                            });
                            console.log('ทดชม Flip');
                        }
                    }
                    else if (hourMatch.exists() && data.match_test != true) {
                        let huorMatch_data = hourMatch.val();
                        if (data.match_test == undefined || data.match_test == false) {
                            console.log('Add_hour_match', huorMatch_data);
                            if (data.select == '-NcQsFxCcoNS-uwmKUqE') {
                                await db.ref(`hour_match/${data.student}/`).update({
                                    hour: parseFloat(hour) + parseFloat(huorMatch_data.hour),
                                });
                                console.log('ทดชม Flip');
                            }
                            if (data.select == '-NcQsHB9vgG53lJKPA-i') {
                                await db.ref(`hour_match/${data.student}/`).update({
                                    hourprivate: parseFloat(hour) + parseFloat(huorMatch_data.hourprivate),
                                });
                                console.log('ทดชม Private');
                            }
                        }
                    } else if (data.match_test != true) {
                        if (data.select == '-NcQsFxCcoNS-uwmKUqE') {
                            await db.ref(`hour_match/${data.student}/`).update({
                                hour: parseFloat(hour),
                                hourprivate: 0,
                            });
                            console.log('ทดชม Flip');
                        }
                        if (data.select == '-NcQsHB9vgG53lJKPA-i') {
                            await db.ref(`hour_match/${data.student}/`).update({
                                hour: 0,
                                hourprivate: parseFloat(hour),
                            });
                            console.log('ทดชม Private');
                        }
                    }

                }
                this.close();
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        },


        deleteAndReorder() {
            const db = this.$fireModule.database();
            this.All_data.time = this.time_standart_sum;
            const data = this.All_data;
            // ลบข้อมูลออกจากพาท
            for (const key in data.time) {
                db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).orderByValue().equalTo(data.IDstu).once("value")
                    .then(snapshot => {
                        snapshot.forEach(childSnapshot => {
                            childSnapshot.ref.remove()
                                .then(() => {
                                    console.log("Data removed successfully");
                                    this.renewDate(data, data.time[key]);
                                })
                                .catch(error => {
                                    console.error("Error removing data:", error);
                                    return;
                                });
                        });
                    });
            }

        },

        renewDate(item, time) {
            const data = item;
            // ดึงข้อมูลทั้งหมดที่เหลือในพาท
            const db = this.$fireModule.database();
            db.ref(`test_time/${data.Tea}/${this.date}/${time}/`).once("value")
                .then(snapshot => {
                    const remainingData = [];
                    snapshot.forEach(childSnapshot => {
                        const value = childSnapshot.val();
                        if (value !== data.IDstu) {
                            remainingData.push(value);
                        }
                    });

                    // ลบข้อมูลเดิมทั้งหมดออกจากพาท
                    db.ref(`test_time/${data.Tea}/${this.date}/${time}/`).remove()
                        .then(() => {
                            // เพิ่มข้อมูลใหม่เพื่อเรียงลำดับคีย์ใหม่
                            remainingData.forEach((value, index) => {
                                db.ref(`test_time/${data.Tea}/${this.date}/${time}/`).update({
                                    [index]: value
                                });
                            });
                            console.log("Data reordered successfully");
                        })
                        .catch(error => {
                            console.error("Error reordering data:", error);
                        });
                });
        },
        search_date_teacher() {
            const db = this.$fireModule.database();
            db.ref(`date_teacher/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                const now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
                let item = [];
                this.desserts = [];
                this.events = [];
                let index = 0;
                this.arrayEvents = [];
                let subject_show = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (parseInt(new Date(date).getTime()) >= parseInt(now.getTime())) {
                            const datedata = keydata[date];
                            for (const time in datedata) {
                                const timedata = datedata[time];
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
                                        const nametea = teacherData.teacherId + " ครู" + teacherData.nickname;
                                        let namesub = subjectData.name;
                                        if (timedata.subject == '00000') {
                                            namesub = '';
                                            subject_show = { name: namesub, key: timedata.subject };
                                            for (const id in teacherData.subject_all) {
                                                namesub += `${teacherData.subject_all[id].name} || `;
                                            }
                                        } else {
                                            subject_show = { name: namesub, key: timedata.subject, level: teacherData.subject_all[timedata.subject].level };
                                        }
                                        if (true) {//parseInt(timedata.invite) < parseInt(timedata.sum_people)) {
                                            item.push({
                                                idclass: timedata.idclass,
                                                name: nametea,
                                                date: date,
                                                time_s: timedata.start,
                                                time_e: timedata.stop,
                                                style: this.checknameLocation(timedata.style_subject),
                                                style_subject: timedata.style_subject,
                                                Class: timedata.Class,
                                                select: timedata.Class.key,
                                                subject: namesub,
                                                keysubject: timedata.subject,
                                                people: timedata.sum_people,
                                                sum_people: timedata.invite, //+ "/" + timedata.sum_people,
                                                invite: timedata.invite,
                                                teacher: key,
                                                teacher_subject: teacherData.subject_all,
                                                full_subject: subject_show,
                                                // full_location: { name: locationData.name, key: timedata.style_subject },
                                                full_teacher: { name: nametea, key: key },
                                            });
                                            this.events.push(
                                                {
                                                    array: index,
                                                    name: namesub,
                                                    start: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                        date.substring(8, 10), timedata.start.substring(0, 2),
                                                        timedata.start.substring(3, 5)),
                                                    end: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                        date.substring(8, 10), timedata.stop.substring(0, 2),
                                                        timedata.stop.substring(3, 5)),
                                                    color: this.getRandomColor(),
                                                    timed: true,
                                                },
                                            );
                                            index++;
                                            this.arrayEvents.push(date);
                                        }
                                    })
                            }
                        }
                    }
                }
                this.desserts = item;
                console.log(this.desserts);
            })
        },

    },
}
</script>

<style>
.v-data-table-header th {
    background-color: #D4C1B2;
    /* เปลี่ยนเป็นสีที่คุณต้องการ */
}

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
}</style>