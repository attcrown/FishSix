<template>
    <div class="">
        <template>
            <div>
                <div class="mb-3" style="max-width:100%;"> <!--style="max-width:900px"-->
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
                                    <!-- <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 days</v-list-item-title>
                            </v-list-item> -->
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                            :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay"
                            @click:date="viewDay"></v-calendar>
                        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement"
                            offset-x>
                            <v-card color="grey lighten-4" min-width="350px" flat>
                                <v-toolbar :color="selectedEvent.color" dark>
                                    <v-btn icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <!--eslint-disable-next-line vue/no-v-text-v-html-on-component-->
                                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
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
                        </v-menu>
                    </v-sheet>
                </div>
            </div>
        </template>
        <template>
            <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="date" :items-per-page="-1"
                class="elevation-16 rounded-xl mt-10">
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
                                    <v-chip color="#FFA726" text-color="white" dark v-if="editedItem.match_test"
                                        class="ms-3">
                                        ทดลองเรียน
                                    </v-chip>
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
                                                <v-select :items="time_standart" v-model="editedItem.time_s"
                                                    label="เวลาเริ่มต้น"
                                                    @change="validateTime(), editedItem.time_e = null"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="time_standart_stop" v-model="editedItem.time_e"
                                                    @change="validateTime()" label="เวลาสิ้นสุด"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="select_location" label="รูปแบบการสอน"
                                                    v-model="editedItem.style" item-text="name" item-value="key"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="select_subject" label="วิชา" item-text="name"
                                                    item-value="key" v-model="editedItem.subject"
                                                    @input="search_select_level(editedItem.subject), editedItem.level = null"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="select_level" label="ระดับชั้น"
                                                    v-model="editedItem.level">
                                                </v-select>
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
                                    <v-btn color="#29CC39" dark :disabled="!formIsValid" @click="save" elevation="16"
                                        rounded>
                                        <b>ยืนยันการจองเรียน</b>
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

                        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog> -->

                    </v-toolbar>
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.actions="{ item }">
                    <!-- <v-btn color="amber darken-3" small outlined>
                        <v-icon center class="text-h6" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                    </v-btn> -->
                    <v-btn text icon elevation="5" @click="editItem(item)">
                        <v-icon class="text-h5" color="#26415B">
                            mdi-pencil
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
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        old_item: [],
        select_location: [],
        select_level: [],
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
            // { text: 'ประเภทคลาส', value: 'class', align: 'center' },
            { text: 'รูปแบบการเรียน', value: 'name_style', align: 'center' },
            { text: 'วิชาที่สอน', value: 'name_subject', align: 'center' },
            { text: 'ระดับชั้น', value: 'level', align: 'center' },
            { text: 'วันที่สอน', value: 'date', align: 'center' },
            { text: 'เวลาเริ่มเรียน', value: 'time_s', align: 'center' },
            { text: 'เวลาเลิกเรียน', value: 'time_e', align: 'center' },
            { text: 'เวลาคำร้อง', value: 'createAt', align: 'center' },
            { text: 'สถานะ', value: 'status', sortable: false, align: 'center' },
            { text: 'ยืนยันคลาส', value: 'actions', sortable: false, align: 'center' },
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
        time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
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
                // this.editedItem.class &&
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
        this.$refs.calendar.checkChange();
    },

    methods: {
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
        getRandomColor() {
            const randomIndex = Math.floor(Math.random() * this.colors.length)
            const randomColor = this.colors[randomIndex]
            // Remove the color from the array so it won't be used again
            return randomColor
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                // console.log(this.selectedEvent);
                // console.log(this.selectedElement);
                requestAnimationFrame(() => requestAnimationFrame(() => this.editItem(this.desserts[this.selectedEvent.array])))//this.selectedOpen = false))
                console.log(this.selectedEvent);
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },

        initialize() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts_student = [];
                let item = [];
                let index = 0;
                this.events = [];
                let now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        // if (new Date(date).getTime().toString().substring(0, 5) >= now.getTime().toString().substring(0, 5)) {
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
                                        let sumx_date = "-";
                                        if (timedata.createAt) {
                                            let sum_date = new Date(timedata.createAt).toString().split(" ");
                                            sumx_date = `${sum_date[1]} ${sum_date[2]} ${sum_date[3]} ${sum_date[4]}`
                                        }
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
                                            createAt: sumx_date,
                                            match_test: timedata.match_test,
                                            hour: timedata.hour
                                        });
                                        this.events.push(
                                            {
                                                array: index,
                                                name: subjectData.name,
                                                start: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                    date.substring(8, 10), timedata.start.substring(0, 2),
                                                    timedata.start.substring(3, 5)),
                                                end: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                    date.substring(8, 10), timedata.stop.substring(0, 2),
                                                    timedata.stop.substring(3, 5)),
                                                color: this.getRandomColor(),
                                                timed: true,
                                            }
                                        );
                                        index++;
                                    })
                                    .catch((error) => {
                                        alert("Match เกิดข้อผิดพลาดในการดึงข้อมูล", error);
                                    });
                            }
                        }
                        // }

                    }
                }
                this.desserts = item;
                console.log(this.desserts);
            })
        },

        editItem(item) {
            this.old_item = item;
            console.log('item>>', item);
            this.time_standart_stop = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
                , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
                , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
                , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
                , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
                , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
            this.date = item.date;
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.search_select_location_class(item.key_teacher);
            this.dialog = true;
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
            });
            db.ref(`user/${key}/subject_all/${this.editedItem.subject}/level`).on("value", (snapshot) => {
                this.select_level = [];
                const childData = snapshot.val();
                this.select_level = childData;
            })
            console.log(">>>>", key, this.select_level);
        },

        search_select_level(key) {
            const db = this.$fireModule.database();
            db.ref(`user/${this.editedItem.key_teacher}/subject_all/${key}/level`).on("value", (snapshot) => {
                this.select_level = [];
                const childData = snapshot.val();
                this.select_level = childData;
            })
            console.log(key, this.select_level);
        },

        deleteItemConfirm() {
            this.delete_match()
            this.closeDelete()
        },

        close() {
            this.dialog = false;
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

        save() {
            this.validateTime();
            const db = this.$fireModule.database();
            const getTimePromise = db.ref(`Time_student/${this.editedItem.key_student}/${this.date}`).once("value");
            const getTimeTeaPromise = db.ref(`Time_teacher/${this.editedItem.key_teacher}/${this.date}`).once("value");
            let sum_hour = this.sum_hour(this.editedItem.time_s, this.editedItem.time_e);
            Promise.all([getTimePromise, getTimeTeaPromise])
                .then(([timeSnapshot, timeteaSnapshot]) => {
                    // if (timeSnapshot.exists()) {
                    //     const timeData = timeSnapshot.val();
                    //     const ed_timeData = Object.keys(timeData).map(key => key.substring(2, 7));
                    //     if (this.time_standart_sum.some(time => ed_timeData.includes(time))) {
                    //         alert('เวลาซ้ำกันกรุณาลงใหม่อีกครั้ง');
                    //         return;
                    //     }
                    // }
                    if (timeteaSnapshot.exists()) {
                        const timeteaData = timeteaSnapshot.val();
                        const ed_timeteaData = Object.keys(timeteaData).map(key => key.substring(2, 7));
                        if (this.time_standart_sum.some(time => ed_timeteaData.includes(time))) {
                            alert('เวลาทับกับของครูกรุณาลงใหม่อีกครั้ง');
                            return;
                        }
                    }
                    if (true) {
                        console.log('update>>', this.editedItem, this.date);
                        let id = new Date().getTime();//this.editedItem.id;
                        db.ref(`date_match/${this.editedItem.key_student}/${this.date}/${this.editedItem.time_e}/`).update({
                            teacher: this.editedItem.key_teacher,
                            subject: this.editedItem.subject,
                            style_subject: this.editedItem.style,
                            level: this.editedItem.level,
                            createAt: new Date(),
                            start: this.editedItem.time_s,
                            stop: this.editedItem.time_e,
                            start_tea: this.editedItem.time_s,
                            stop_tea: this.editedItem.time_e,
                            because: this.editedItem.because,
                            status: "พร้อมเรียน",
                            ID: id,
                            hour: sum_hour,
                        });
                        db.ref(`date_teacher/${this.editedItem.key_teacher}/${this.date}/${this.editedItem.time_e}/`).update({
                            invite: '1',
                            sum_people: '1',
                            subject: this.editedItem.subject,
                            style_subject: this.editedItem.style,
                            createAt: new Date(),
                            start: this.editedItem.time_s,
                            stop: this.editedItem.time_e,
                            ID: id
                        });

                        let keystudent = this.old_item;
                        let keystudent_new = this.editedItem;
                        console.log('>>>>>',keystudent_new.name_style.includes("Flip") , !keystudent_new.match_test);
                        if (keystudent_new.name_style.includes("Flip") && !keystudent_new.match_test) {
                            db.ref(`hour_match/${keystudent_new.key_student}`).once("value", (snapshot) => {
                                const childData = snapshot.val();
                                console.log(childData.hour , keystudent.hour , keystudent_new.hour);
                                db.ref(`hour_match/${keystudent.key_student}`).update({
                                    hour: (childData.hour - keystudent.hour) + sum_hour,
                                });
                            })
                        }
                        if (keystudent_new.name_style.includes("Private") && !keystudent_new.match_test) {
                            db.ref(`hour_match/${keystudent_new.key_student}`).once("value", (snapshot) => {
                                const childData = snapshot.val();
                                db.ref(`hour_match/${keystudent.key_student}`).update({
                                    hourprivate: (childData.hourprivate - keystudent.hour) + sum_hour,
                                });
                            })
                        }

                        for (const key in this.time_standart_sum) {
                            db.ref(`Time_teacher/${this.editedItem.key_teacher}/${this.date}/S:${this.time_standart_sum[key]}:1:${id}/`).set({
                                0: this.editedItem.key_student
                            });
                        };
                        for (const key in this.time_standart_sum) {
                            db.ref(`Time_student/${this.editedItem.key_student}/${this.date}/S:${this.time_standart_sum[key]}:1:${id}/`).set({
                                0: this.editedItem.key_teacher
                            });
                        };
                        if (this.date != this.old_item.date || this.editedItem.time_e != this.old_item.time_e || this.editedItem.ID != id) {
                            this.delete_match(id);
                        }
                        this.close();
                    }
                })

        },

        delete_match(id) {
            console.log('del>>', this.old_item);
            const db = this.$fireModule.database();
            let keystudent = this.editedItem;
            let olditem = this.old_item;
            if(!(this.editedItem.ID != id)){
                db.ref(`date_match/${this.old_item.key_student}/${this.old_item.date}/${this.old_item.time_e}`).remove()
                .then(() => {
                    console.log("success del");
                });
            }
            
            db.ref(`Time_student/${olditem.key_student}/${olditem.date}`).once("value", (snapshot) => {
                const childData = snapshot.val();
                console.log('sssss',childData);
                for (const key in childData) {
                    const detail = key.split(":");
                    if (detail[4] == olditem.id) {
                        db.ref(`Time_student/${olditem.key_student}/${olditem.date}/${key}`).remove();
                        console.log('ลบ', key, detail[4]);
                    }
                }
            });
            if (this.editedItem.name_style.includes("Flip") && !this.editedItem.match_test) {
                db.ref(`hour_match/${this.editedItem.key_student}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.key_student}`).update({
                        hour: childData.hour - keystudent.hour,
                    });
                })
            }
            if (this.editedItem.name_style.includes("Private") && !this.editedItem.match_test) {
                db.ref(`hour_match/${this.editedItem.key_student}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.key_student}`).update({
                        hourprivate: childData.hourprivate - keystudent.hour,
                    });
                })
            }
        },

        getColor(stutus) {
            if (stutus === 'พร้อมเรียน') return '#29CC39'
            else if (stutus === 'รอยืนยัน') return '#FFCB33'
            else return 'red'
        },

        validateTime() {
            // this.time_standart_stop = [];
            if (true) {//this.editedItem.time_e == null) {
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
            } if (this.editedItem.time_e != null && this.editedItem.time_s != null) {
                this.time_standart_sum = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.editedItem.time_e == this.time_standart[key]) {
                        sum = 0;
                        // this.time_standart_sum.push(this.time_standart[key]);
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
