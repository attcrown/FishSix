<template>
    <div>
        <div class="mb-3 hide-on-mobile">
            <v-row class="fill-height">
                <v-col>
                    <v-sheet height="64">
                        <v-toolbar flat>
                            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                                Today
                            </v-btn>
                            <v-btn fab text small color="grey darken-2" @click="prev">
                                <v-icon small>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn fab text small color="grey darken-2" @click="next">
                                <v-icon small>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>

                            <v-toolbar-title v-if="$refs.calendar">
                                {{ $refs.calendar.title }}
                            </v-toolbar-title>

                            <v-spacer></v-spacer>
                            <v-menu bottom right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
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
                </v-col>
            </v-row>
        </div>

        <v-card>
            <v-container fluid>
                <v-row align="center">
                    <v-col cols="12">
                        <div>
                            <div class="subheading">
                                <!-- <h3>Student</h3> -->
                            </div>
                            <v-date-picker class="hide-on-desktop" v-model="date1" :events="arrayEvents"
                                :allowed-dates="allowedDates" show-adjacent-months event-color="green lighten-1"
                                @input="dialog_detail = true, mode = 'save', clear_item()"></v-date-picker>
                        </div>
                    </v-col>

                    <v-col cols="4">
                        <v-autocomplete v-model="search_value" :items="items" label="Search teacher"
                            @change="search_date_teacher()" item-text="name" item-value="key"></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete v-model="search_class" :items="style_class" @change="search_date_teacher()"
                            label="Search Class"></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete v-model="search_style_sub" :items="style_subject" @change="search_date_teacher()"
                            label="Search Style"></v-autocomplete>
                    </v-col>

                    <v-col cols="12">
                        <v-data-table :headers="headers" :items="desserts" :search="search_table_teacher" sort-by="date"
                            class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat style="background-color:rgba(37, 110, 8, 0.425);">
                                    <v-toolbar-title>ตารางที่สามารถจองคิวได้เลย</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-text-field class="me-10" v-model="search_table_teacher" append-icon="mdi-magnify"
                                        label="Search" single-line hide-details></v-text-field>
                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                        <template v-slot:activator="{}">
                                            <v-btn color="primary" dark class="mb-2" @click="dialog_select_date = true">
                                                จองคิวนอกตาราง
                                            </v-btn>
                                        </template>
                                        <!-- <v-card>
                                                <v-card-title class="text-h5">Are you sure you want to delete this
                                                    item?</v-card-title>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                                    <v-spacer></v-spacer>
                                                </v-card-actions>
                                            </v-card> -->
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.actions="{ item }">
                                <v-icon xl class="mr-2" @click="editItem(item), dialog_detail = true, mode = 'edit'">
                                    mdi-plus-box-multiple
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_detail" persistent max-width="600px">
                    <v-card class="rounded-xl">
                        <v-card-title style="background-color:rgba(32, 124, 4, 0.733)">
                            <span class="text-h8"><b>ADD Teach [{{ date1 }}]</b></span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row :hidden="mode === 'edit'">
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete v-model="save_detail.subject" :items="subject_select"
                                            label="ชื่อวิชา*" item-text="name" item-value="key" style="font-weight: bold;"
                                            @input="search_level_select()"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete v-model="save_detail.level" :items="level_select"
                                            label="ระดับการศักษา*" :disabled="save_detail.subject === undefined"
                                            style="font-weight: bold;" @input="search_teacher()"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-autocomplete v-model="value" :items="items_select_tea" label="Search teacher"
                                            item-text="name" item-value="key" @change="check_time_start();"
                                            :disabled="mode === 'edit' || save_detail.level === undefined"
                                            style="font-weight: bold;"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-autocomplete v-model="value_student" :items="items_student"
                                            label="Search student" item-text="name" item-value="key"
                                            style="font-weight: bold;"></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-select :items="style_subject" label="สถานที่สอน" v-model="save_detail.style"
                                            style="font-weight: bold;"></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" :hidden="mode === 'save'">
                                        <v-select :items="style_class" label="รูปแบบการสอน" v-model="save_detail.class"
                                            style="font-weight: bold;" disabled></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" :hidden="mode === 'edit'">
                                        <v-select :items="style_class" label="รูปแบบการสอน" v-model="save_detail.class"
                                            style="font-weight: bold;"></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-text-field label="เริ่มเรียน" v-model="picker_start" @click="dialog_time = true"
                                            style="font-weight: bold;"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="เลิกเรียน" v-model="picker_stop"
                                            @click="dialog_time_stop = true" style="font-weight: bold;"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12">
                                        <v-text-field label="วัตถุประสงค์ในการเรียนครั้งนี้" v-model="save_detail.because"
                                            style="font-weight: bold;"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row :hidden="mode === 'save'">
                                    <v-col cols="12" sm="6" :hidden="save_detail.subject === 'ทุกวิชา'">
                                        <v-text-field v-model="save_detail.subject"
                                            :readonly="save_detail.subject !== 'ทุกวิชา'"
                                            style="font-weight: bold;"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" :hidden="save_detail.subject !== 'ทุกวิชา'">
                                        <v-autocomplete v-model="save_detail.subject" :items="subject_select_tea"
                                            label="ชื่อวิชา" item-text="name" item-value="key" style="font-weight: bold;"
                                            @input="search_level_select2()"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete v-model="save_detail.level" :items="level_select_add"
                                            label="ระดับการศักษา" :disabled="save_detail.subject === undefined"
                                            style="font-weight: bold;"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-autocomplete v-model="value" :items="items" label="Search teacher"
                                            item-text="name" item-value="key" style="font-weight: bold;"
                                            readonly></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-autocomplete v-model="value_student" :items="items_student"
                                            label="Search student" item-text="name" item-value="key"
                                            style="font-weight: bold;"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="style_subject" label="สถานที่สอน" v-model="save_detail.style"
                                            readonly style="font-weight: bold;"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="style_class" label="รูปแบบการสอน" v-model="save_detail.class"
                                            style="font-weight: bold;" readonly></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-text-field label="เริ่มเรียน" v-model="picker_start" @click="dialog_time = true"
                                            style="font-weight: bold;"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="เลิกเรียน" v-model="picker_stop"
                                            @click="dialog_time_stop = true" style="font-weight: bold;"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12">
                                        <v-text-field label="วัตถุประสงค์ในการเรียนครั้งนี้" v-model="save_detail.because"
                                            style="font-weight: bold;"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*หากกดบันทึกแล้วไม่สามารถแก้ไขได้</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="clear_item(), dialog_detail = false">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save_detail_data()">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_time" persistent max-width="400px">
                    <v-card class="rounded-xl">
                        <v-card-title>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="space-around" align="center">
                                    <v-time-picker v-model="picker_start" :allowed-hours="allowedHours" format="24hr"
                                        :max="picker_stop"></v-time-picker>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click=" dialog_time = false">
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_time_stop" persistent max-width="400px">
                    <v-card class="rounded-xl">
                        <v-card-title>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="space-around" align="center">
                                    <v-time-picker v-model="picker_stop" format="24hr" :allowed-hours="allowedHours"
                                        :min="picker_start"></v-time-picker>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click=" dialog_time_stop = false">
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <template>
            <v-dialog v-model="dialog_save_error" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">กรุณากรอกข้อมูลให้ครบ</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog_save_error = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog_save_error = false">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

        <template>
            <v-dialog v-model="dialog_select_date" max-width="350px">
                <v-card class="px-3 text-center" style="background-color: rgba(247, 245, 245, 0.842)">
                    <v-card-title class="text-h6"><span class="mdi mdi-plus-box"></span> <b>เพิ่มตารางสอน</b></v-card-title>
                    <v-date-picker v-model="date1" :events="arrayEvents" :allowed-dates="allowedDates" show-adjacent-months
                        event-color="green lighten-1"
                        @input="dialog_detail = true, mode = 'save', clear_item()"></v-date-picker>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog_select_date = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog_select_date = false">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

    </div>
</template>
<script>
export default {
    data: () => ({
        subject_select: [],
        subject_select_teacher: [],
        subject_select_tea: [],
        level_select: [],
        level_select_add: [],
        subject_sum: '',
        search_table_teacher: '',
        mode: '',
        delday: '',
        save_detail: [],
        dialog_detail: false,
        dialog_time: false,
        dialog_time_stop: false,
        dialog_save_error: false,
        dialog_select_date: false,
        items: [],
        items_select_tea: [],
        items_student: [],
        style_subject: ['Online', 'On-site'],
        style_class: ['Flipclass online', 'Flipclass สาขา', 'Private class'],
        picker_start: null,
        picker_stop: null,
        search_value: null,
        search_style_sub: null,
        search_class: null,
        value: null,
        value_student: null,
        style_sub: null,
        arrayEvents: null,
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

        dialog: false,
        dialogDelete: false,

        arrayEvents: [],
        headers: [
            {
                text: 'Name Teacher',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Date', value: 'date', align: 'center' },
            { text: 'Start', value: 'time_s', align: 'start' },
            { text: 'End', value: 'time_e', align: 'start' },
            { text: 'Style', value: 'style', align: 'start' },
            { text: 'class', value: 'class', align: 'start' },
            { text: 'subject', value: 'subject', align: 'start' },
            { text: 'จำนวนเปิดรับ', value: 'sum_people', align: 'center' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
        ],

        desserts: [],
        editedIndex: -1,

        hour_tea: 0,
        min_tea: 0,

        focus: '',
        type: 'month',
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

    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        allowedHours() {
            if (this.mode == 'edit') {
                return v => v >= parseInt(this.picker_start_tea.substring(0, 3))
                    && v <= parseInt(this.picker_stop_tea.substring(0, 3));
            } else {
                return v => v >= this.hour_tea;
            }
        },
        // search_check(){
        //     this.search_date_teacher();
        // },
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

    mounted() {
        this.search_teacher();
        this.search_student();
        this.search_date_teacher();
        this.search_subject_select();
        this.$refs.calendar.checkChange();
    },

    methods: {
        getColor(stutus) {
            if (stutus == 'active') return 'success'
            else if (stutus == 'Not active') return 'orange'
            else return 'red'
        },
        detail_match(item) {
            console.log(item);
        },
        getRandomColor() {
            const randomIndex = Math.floor(Math.random() * this.colors.length)
            const randomColor = this.colors[randomIndex]
            // Remove the color from the array so it won't be used again
            return randomColor
        },
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
            console.log(this.focus);
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
                console.log(this.selectedEvent);
                console.log(this.selectedElement);
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
        check_status() {
            if (this.mode == 'edit') {
                return 'พร้อมเรียน';
            }
            if (this.mode == 'save') {
                return 'รอยืนยัน';
            } else { return 'error'; }
        },

        save_detail_data() {
            console.log(this.mode);
            if (this.save_detail.subject == null ||
                this.save_detail.level == null ||
                this.save_detail.style == null ||
                this.save_detail.because == null ||
                this.save_detail.class == null ||
                this.picker_start == null ||
                this.picker_stop == null ||
                this.value == null ||
                this.value_student == null ||
                this.date1 == null) {
                this.dialog_save_error = true; 
                return;
            }
            const db = this.$fireModule.database();
            if (this.mode === 'save') {
                db.ref(`subject_all/${this.save_detail.subject}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`date_match/${this.value_student}/${this.date1}/${this.picker_stop}`).update({
                        teacher: this.value,
                        subject: childData.name,
                        style_subject: this.save_detail.style,
                        level: this.save_detail.level,
                        start: this.picker_start,
                        class: this.save_detail.class,
                        stop: this.picker_stop,
                        because: this.save_detail.because,
                        status: this.check_status(),
                    });
                })
            } else if (this.mode === 'edit') {
                db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop_tea}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    if (parseInt(childData.invite) < parseInt(childData.sum_people)) {
                        // console.log('save', childData.invite);
                        db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop_tea}`).update({
                            invite: parseInt(childData.invite) + 1,
                        })
                        db.ref(`date_match/${this.value_student}/${this.date1}/${this.picker_stop}`).update({
                            teacher: this.value,
                            subject: this.save_detail.subject,
                            style_subject: this.save_detail.style,
                            level: this.save_detail.level,
                            class: this.save_detail.class,
                            start: this.picker_start,
                            stop: this.picker_stop,
                            because: this.save_detail.because,
                            start_tea: this.picker_start_tea,
                            stop_tea: this.picker_stop_tea,
                            status: this.check_status(),
                        });
                    } else { alert('error'); }
                })
            } else {
                this.dialog_save_error = true;
            }
            this.clear_item();
            this.dialog_detail = false;
        },
        clear_item() {
            this.value = null;
            this.value_student = null;
            this.hour_tea = 0;
            this.min_tea = 0;
            this.save_detail = [];
            this.level_select = [];
            this.items_select_tea = [];
            this.picker_start_tea = null;
            this.picker_stop_tea = null;
            this.picker_start = null;
            this.picker_stop = null;
        },
        allowedDates: val => {
            const currentDate = new Date();
            const selectedDate = new Date(val);
            return selectedDate >= currentDate;
        },
        search_teacher() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                const childData = snapshot.val();
                let item = [];
                if (this.save_detail.subject != undefined &&
                    this.save_detail.level != undefined) {
                    for (const key in childData) {
                        if (childData[key].status === 'teacher' &&
                            this.check_sub(this.save_detail.subject, key) &&
                            this.check_level(this.save_detail.level, this.save_detail.subject, key)
                        ) {
                            item.push({ key: key, name: childData[key].nickname + " " + childData[key].teacherId });
                            console.log('items_select_tea', item);
                        }
                    }
                    this.items_select_tea = item;

                } else {
                    for (const key in childData) {
                        if (childData[key].status == 'teacher') {
                            item.push({ key: key, name: childData[key].nickname + " " + childData[key].teacherId });
                        }
                    }
                    this.items = item;
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
                    // console.log('check_sub', detail.name, name);
                    subject.push(detail.name);
                }
            })
            if (subject.includes(name)) {
                // console.log('ถูกต้อง>>', subject);
                return true;
            } else {
                return false;
            }
        },

        check_level(level, sub, key) {
            // console.log(level,sub,key);
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
                    console.log('check_sub', detail.name, detail.level, name);
                    if (detail.name === name) {
                        console.log('หยุด');
                        levels = detail.level;
                        console.log(levels);
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
        search_subject_select() {
            const db = this.$fireModule.database();
            db.ref("subject_all/").on("value", (snapshot) => {
                const childData = snapshot.val();
                let item = [];
                for (const key in childData) {
                    const detail = childData[key];
                    item.push({ key: key, name: detail.name, level: detail.level });
                }
                this.subject_select = item;
            })
        },
        search_level_select() {
            const db = this.$fireModule.database();
            db.ref(`subject_all/${this.save_detail.subject}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.level_select = childData.level;
            })
        },
        search_student() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                const childData = snapshot.val();
                let item = [];
                for (const key in childData) {
                    if (childData[key].status == 'user') {
                        item.push({ key: key, name: childData[key].nickname + " " + childData[key].firstName });
                    }
                }
                this.items_student = item;
            })
        },
        search_date_teacher() {
            const db = this.$fireModule.database();
            db.ref(`date_teacher/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                const now = new Date();
                let item = [];
                this.desserts = [];
                this.events = [];
                // this.arrayEvents =[];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (new Date(date).getTime().toString().substring(0, 5) >= now.getTime().toString().substring(0, 5)) {
                            const datedata = keydata[date];
                            // this.arrayEvents.push(date);
                            for (const time in datedata) {
                                const timedata = datedata[time];
                                const getTeacherPromise = db.ref(`user/${key}`).once("value");
                                const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                Promise.all([getTeacherPromise, getSubjectPromise])
                                    .then((snapshots) => {
                                        const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                        const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                        const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const nametea = "ครู" + teacherData.nickname + " " + teacherData.teacherId;
                                        const namesub = subjectData.name;
                                        if (parseInt(timedata.invite) < parseInt(timedata.sum_people)) {
                                            // console.log('New');
                                            if (this.search_value == key &&
                                                this.search_style_sub == timedata.style_subject &&
                                                this.search_class == timedata.class) {
                                                // console.log('หาทั้งสอง');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == key &&
                                                this.search_style_sub == null &&
                                                this.search_class == null) {
                                                // console.log('หาครู');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == null &&
                                                this.search_style_sub == timedata.style_subject &&
                                                this.search_class == null) {
                                                // console.log('หารูปแบบ');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == null &&
                                                this.search_style_sub == null &&
                                                this.search_class == timedata.class) {
                                                // console.log('หาหมด');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == key &&
                                                this.search_style_sub == timedata.style_subject &&
                                                this.search_class == null) {
                                                // console.log('หาหมด');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == key &&
                                                this.search_style_sub == timedata.style_subject &&
                                                this.search_class == timedata.class) {
                                                // console.log('หาหมด');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == key &&
                                                this.search_style_sub == null &&
                                                this.search_class == timedata.class) {
                                                // console.log('หาหมด');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == null &&
                                                this.search_style_sub == timedata.style_subject &&
                                                this.search_class == timedata.class) {
                                                // console.log('หาหมด');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                this.events.push(
                                                    {
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
                                            } else if (
                                                this.search_value == null &&
                                                this.search_style_sub == null &&
                                                this.search_class == null) {
                                                // console.log('หาหมด');
                                                item.push({
                                                    name: nametea,
                                                    date: date,
                                                    class: timedata.class,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: timedata.style_subject,
                                                    subject: namesub,
                                                    sum_people: timedata.invite + '/' + timedata.sum_people,
                                                    key: key,
                                                });
                                                // console.log(item);
                                                this.events.push(
                                                    {
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
                                            } else {
                                                console.log('Error');
                                            }
                                        }
                                    })
                            }
                        } else { 
                            // console.log('Old day'); 
                        }
                    }
                }
                this.desserts = item;
            })
        },
        check_time_start() {
            const db = this.$fireModule.database();
            db.ref(`date_teacher/${this.value}/${this.date1}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                if (childData == null) {
                    this.hour_tea = 0;
                    this.min_tea = 0;
                }
                for (const key in childData) {
                    // console.log(key);
                    this.hour_tea = key.substring(0, 2);
                    this.min_tea = key.substring(3, 5);
                }
            })
        },

        editItem(item) {
            // console.log('editadd',item);
            this.delday = item.time_e;
            this.editedIndex = this.desserts.indexOf(item);
            // console.log(item);
            this.value = item.key;
            this.date1 = item.date;
            this.save_detail.class = item.class;
            this.save_detail.style = item.style;
            this.save_detail.subject = item.subject;
            this.picker_start_tea = item.time_s;
            this.picker_stop_tea = item.time_e;
            this.dialog_detail = true;
            if (item.subject != 'ทุกวิชา') {
                this.search_level_select_edit(item);
            } else {
                this.search_subject_teacher(item);
            }
        },

        search_level_select_edit(item) {
            let level = [];
            const db = this.$fireModule.database();
            db.ref(`user/${item.key}/subject_all`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const detail = childData[key];
                    if (detail.name === item.subject) {
                        level = detail.level;
                        console.log(level);
                        break;
                    }
                }
                this.level_select_add = level;
            })
        },

        search_level_select2() {
            let level = [];
            const db = this.$fireModule.database();
            db.ref(`user/${this.value}/subject_all`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const detail = childData[key];
                    if (detail.name === this.save_detail.subject) {
                        level = detail.level;
                        console.log(level);
                        break;
                    }
                }
                this.level_select_add = level;
            })
        },

        search_subject_teacher(item) {
            const subject = [];
            const db = this.$fireModule.database();
            db.ref(`user/${item.key}/subject_all`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const detail = childData[key];
                    // console.log('check_sub', detail.name, name);
                    subject.push(detail.name);
                }
                this.subject_select_tea = subject;
            })
        },

        deleteItem(item) {
            this.delcon = item;
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            // console.log(this.delcon);
            const db = this.$fireModule.database();
            db.ref(`date_teacher/${this.delcon.key}/${this.delcon.date}/${this.delcon.time_e}`).remove();
            this.closeDelete();
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

        // save() {
        //     const db = this.$fireModule.database();
        //     db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop}`).update({
        //         subject : this.save_detail.subject,
        //         style_subject : this.save_detail.style,
        //         start : this.picker_start,
        //         stop : this.picker_stop,
        //     });
        // },

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