<template>
    <div>
        <div class="mb-3 "> <!--hide-on-mobile-->
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


        <v-row align="center">
            <!-- <v-col cols="12">
                <div>
                    <div class="subheading">
                    </div>
                    <v-date-picker class="hide-on-desktop" v-model="date1" :events="arrayEvents"
                        :allowed-dates="allowedDates" show-adjacent-months event-color="green lighten-1"
                        @input="dialog_detail = true, mode = 'save', clear_item()"></v-date-picker>
                </div>
            </v-col> -->


            <v-col cols="12">
                <v-data-table :items-per-page="-1" :headers="headers" :items="desserts" :search="search_table_teacher"
                    sort-by="date" class="elevation-16 rounded-xl">
                    <template v-slot:top>
                        <v-toolbar flat color="#F8F9FB" class="rounded-t-xl">
                            <v-toolbar-title><b>ตารางจองเวลาเรียน</b></v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-text-field class="me-10" v-model="search_table_teacher" append-icon="mdi-magnify"
                                label="Search" single-line hide-details style="max-width: 200px;"></v-text-field>

                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <template v-slot:activator="{}">
                                    <v-btn elevation="10" small dark color="#322E2B" class="mb-2 mt-5"
                                        @click="dialog_detail = true, clear_item(), mode = 'save'">
                                        จองคิวนอกตาราง<span class="mdi mdi-plus text-h6"></span>
                                    </v-btn>
                                </template>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{ item }">
                        <v-btn text icon elevation="5" @click="editItem(item), dialog_detail_edit = true, mode = 'edit'">
                            <v-icon class="text-h5">
                                mdi-plus-box-multiple
                            </v-icon>
                        </v-btn>

                    </template>
                </v-data-table>
            </v-col>
        </v-row>


        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_detail" persistent max-width="600px">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card class="rounded-xl">
                            <v-card-title class="d-flex justify-space-between">
                                <span class="text-h8"><b>จองเวลาเรียนนอกตาราง</b></span>
                                <v-btn fab dark small color="#37474F"
                                    @click="clear_item(), dialog_detail = false, dialog_select_date = false">
                                    <v-icon dark class="text-h5">
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>

                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field v-model="date1" label="วันที่เรียน"
                                                @click="dialog_select_date = true" :rules="rules.text" readonly>
                                                <template #prepend>
                                                    <span class="mdi mdi-calendar-outline text-h6"></span>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-autocomplete v-model="save_detail.subject" :items="subject_select"
                                                label="ชื่อวิชา*" item-text="name" item-value="key"
                                                style="font-weight: bold;" @input="search_level_select()"
                                                :rules="[v => !!v || 'กรุณาเลือกวิชา']" required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-autocomplete v-model="save_detail.level" :items="level_select"
                                                label="ระดับการศักษา*" :disabled="save_detail.subject === undefined"
                                                style="font-weight: bold;" @input="search_teacher()"
                                                :rules="[v => !!v || 'กรุณาเลือกระดับการศักษา']" required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete v-model="value" :items="items_select_tea" label="Search teacher"
                                                item-text="name" item-value="key"
                                                @change="check_time_start(), search_location()"
                                                :disabled="mode === 'edit' || save_detail.level === undefined"
                                                style="font-weight: bold;" :rules="[v => !!v || 'กรุณาเลือกครู']"
                                                required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete v-model="value_student" :items="items_student"
                                                label="Search student" item-text="name" item-value="key"
                                                style="font-weight: bold;" :rules="[v => !!v || 'กรุณาเลือกนักเรียน']"
                                                required></v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" sm="12">
                                            <v-select :items="style_subject" label="ประเภทคลาส" v-model="save_detail.style"
                                                style="font-weight: bold;" item-text="name"
                                                :rules="[v => !!v || 'กรุณาเลือกประเภทคลาส']" required
                                                item-value="key"></v-select>
                                        </v-col>

                                        <v-col cols="12" sm="6">
                                            <v-select :items="time_standart" v-model="picker_start" label="เริ่มเรียน"
                                                @change="validateTime(), picker_stop = null"
                                                :rules="[v => !!v || 'กรุณาเลือกเวลา']" required></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-select :items="time_standart_stop" v-model="picker_stop"
                                                @change="validateTime()" label="เลิกเรียน"
                                                :rules="[v => !!v || 'กรุณาเลือกเวลา']" required></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <v-text-field label="จุดประสงค์ในการเรียนครั้งนี้/หัวข้อในการเรียน"
                                                v-model="save_detail.because" style="font-weight: bold;"
                                                :rules="rules.text"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12" style="margin-top:-40px">
                                            <v-checkbox v-model="checkbox" label="ทดลองเรียน"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn rounded color="#29CC39" class="mb-5" @click="validate()" dark
                                    style="margin-top:-40px">
                                    บันทึก<span class="mdi mdi-content-save text-h6"></span>
                                </v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
            </v-row>
        </template>

        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_detail_edit" persistent max-width="600px">
                    <v-form ref="form_edit" v-model="valid_edit" lazy-validation>
                        <v-card class="rounded-xl">
                            <v-card-title class="d-flex justify-space-between">
                                <span class="text-h8"><b>จองเวลาเรียน</b></span>
                                <v-btn fab dark small color="#37474F"
                                    @click="clear_item(), dialog_detail_edit = false, dialog_select_date = false">
                                    <v-icon dark class="text-h5">
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field v-model="date1" label="วันที่เรียน" :rules="rules.text" readonly>
                                                <template #prepend>
                                                    <span class="mdi mdi-calendar-outline text-h6"></span>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" :hidden="save_detail.subject === '00000'">
                                            <v-autocomplete v-model="save_detail.subject" item-text="name" item-value="key"
                                                :items="subject_select_tea" @input="search_level_select2()"
                                                :readonly="save_detail.subject != '00000'"
                                                :rules="[v => !!v || 'กรุณาเลือกวิชา']" required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" sm="6" :hidden="save_detail.subject !== '00000'">
                                            <v-autocomplete v-model="save_detail.subject" :items="subject_select_tea"
                                                label="ชื่อวิชา" item-text="name" item-value="key"
                                                @input="search_level_select2()" :rules="[v => !!v || 'กรุณาเลือกวิชา']"
                                                required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-autocomplete v-model="save_detail.level" :items="level_select_add"
                                                label="ระดับการศักษา" :disabled="save_detail.subject === undefined"
                                                :rules="[v => !!v || 'กรุณาเลือก']" required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete v-model="value" :items="items" label="Search teacher"
                                                item-text="name" item-value="key" readonly
                                                :rules="[v => !!v || 'กรุณาเลือก']" required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete v-model="value_student" :items="items_student"
                                                label="Search student" item-text="name" item-value="key"
                                                :rules="[v => !!v || 'กรุณาเลือก']" required></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" sm="8">
                                            <v-select :items="style_subject" item-text="name" item-value="key"
                                                label="ประเภทคลาส" v-model="save_detail.style" readonly
                                                :rules="[v => !!v || 'กรุณาเลือก']" required></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-select :items="time_standart" v-model="picker_start" label="เริ่มเรียน"
                                                @change="validateTime(), picker_stop = null"
                                                :rules="[v => !!v || 'กรุณาเลือก']" required></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-select :items="time_standart_stop" v-model="picker_stop"
                                                @change="validateTime()" label="เลิกเรียน"
                                                :rules="[v => !!v || 'กรุณาเลือก']" required></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <v-text-field label="วัตถุประสงค์ในการเรียนครั้งนี้"
                                                v-model="save_detail.because" :rules="rules.text" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12" style="margin-top:-40px">
                                            <v-checkbox v-model="checkbox" label="ทดลองเรียน"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn rounded color="#29CC39" class="mb-5" @click="validate_edit()" dark
                                    style="margin-top:-40px">
                                    บันทึก<span class="mdi mdi-content-save text-h6"></span>
                                </v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
            </v-row>
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

        <!-- <template>
            <v-dialog v-model="dialog_select_date" max-width="350px">
                <v-card class="px-3 text-center" style="background-color: rgba(247, 245, 245, 0.212)">
                    <v-card-title class="text-h6">
                        <span class="mdi mdi-plus-box"></span> เลือกวันที่สอน
                    </v-card-title>
                    <v-date-picker v-model="date1" :events="arrayEvents" :allowed-dates="allowedDates" show-adjacent-months
                        event-color="green lighten-1"
                        @input="dialog_detail = true, mode = 'save', clear_item()"></v-date-picker>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template> -->
        <template>
            <v-dialog v-model="dialog_select_date" max-width="350px">
                <v-card class="px-3 text-center" style="background-color: rgba(247, 245, 245, 0.212)">
                    <v-card-title class="text-h6">
                        <!-- <span class="mdi mdi-plus-box"></span> เลือกวันที่สอน -->
                    </v-card-title>
                    <v-date-picker v-model="date1" multiple :events="arrayEvents" 
                        show-adjacent-months event-color="green lighten-1"></v-date-picker> <!------:allowed-dates="allowedDates"------>
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
        checkbox: false,

        valid: false,
        form: [],
        valid_edit: false,
        form_edit: [],
        rules: {
            name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล",
            (val) => /^[0-9]+$/.test(val) || "กรุณากรอกตัวเลขเท่านั้น",],
            text: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
        },

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
        dialog_detail_edit: false,
        dialog_time: false,
        dialog_time_stop: false,
        dialog_save_error: false,
        dialog_select_date: false,
        dialog_select_date_multiple: false,
        items: [],
        items_select_tea: [],
        items_student: [],
        style_subject: [],
        style_class: [],
        picker_start: null,
        picker_stop: null,
        search_value: null,
        search_style_sub: null,
        search_class: null,
        sum_peoples: null,
        value: null,
        idTea: null,
        value_student: null,
        style_sub: null,
        arrayEvents: null,
        // date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date1: [],
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
            { text: 'วิชาที่สอน', value: 'subject', align: 'center' },
            { text: 'วันที่สอน', value: 'date', align: 'center' },
            { text: 'เวลาเริ่มต้น', value: 'time_s', align: 'center' },
            { text: 'เวลาสิ้นสุด', value: 'time_e', align: 'center' },
            { text: 'จำนวนนักเรียน', value: 'sum_people', align: 'center' },
            { text: 'จองคิว', value: 'actions', sortable: false, align: 'center' },
        ],

        desserts: [],
        editedIndex: -1,

        hour_tea: 0,
        min_tea: 0,

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
        menu: false,
        modal: false,
        menu2: false,
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
        validateTime() {
            if (true) {
                this.time_standart_stop = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.picker_start == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        if (sum > 1) {
                            this.time_standart_stop.push(this.time_standart[key]);
                        }
                    }
                }
            } if (this.picker_stop != null && this.picker_start != null) {
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
            }
            // console.log(this.sum_hour(this.picker_start, this.picker_stop));
        },
        getColor(stutus) {
            if (stutus == 'active') return 'success'
            else if (stutus == 'Not active') return 'orange'
            else return 'red'
        },

        getRandomColor() {
            const randomIndex = Math.floor(Math.random() * this.colors.length)
            const randomColor = this.colors[randomIndex]
            return randomColor
        },
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
                requestAnimationFrame(() => requestAnimationFrame(() => this.editItem(this.desserts[this.selectedEvent.array]), this.mode = 'edit'))//this.selectedOpen = true ))
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

        validate() {
            if (this.$refs.form.validate()) {
                this.save_detail_data();
            } else {
                this.dialog_save_error = true;
                console.log(this.save_detail);
            }
        },

        validate_edit() {
            if (this.$refs.form_edit.validate()) {
                this.save_detail_data();
            } else { this.dialog_save_error = true; }
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

        save_detail_data() {
            if (this.save_detail.subject == null ||
                this.save_detail.level == null ||
                this.save_detail.style == null ||
                this.save_detail.because == null ||
                this.picker_start == null ||
                this.picker_stop == null ||
                this.value == null ||
                this.value_student == null ||
                this.date1 == null) {
                this.dialog_save_error = true;
                return;
            }
            let sum_hour = this.sum_hour(this.picker_start, this.picker_stop);
            let id = new Date().getTime();
            const db = this.$fireModule.database();
            const getTimePromise = db.ref(`Time_student/${this.value_student}/${this.date1}`).once("value");
            const getTimeTeaPromise = db.ref(`Time_teacher/${this.value}/${this.date1}`).once("value");
            const getStudentPromise = db.ref(`user/${this.value_student}`).once("value");
            const getlocationPromise = db.ref(`location/${this.save_detail.style}`).once("value");
            const getHourPromise = db.ref(`hour_match/${this.value_student}`).once("value");
            Promise.all([getTimePromise, getTimeTeaPromise, getStudentPromise, getlocationPromise, getHourPromise])
                .then(([timeSnapshot, timeteaSnapshot, studentData, locationName, hourmatchData]) => {
                    const Student_data = studentData.val();
                    const location_data = locationName.val();
                    const hourmatch_data = hourmatchData.val();
                    console.log(">>>hourmatchData", hourmatch_data);
                    let plan_min = 0;
                    let plan_min_private = 0;
                    let plan_hour = 0;
                    let plan_hour_private = 0;
                    if (Student_data.hourLeft != undefined) {
                        plan_hour = Student_data.hourLeft.toString().split(".");
                        if (plan_hour[1] == 5) {
                            plan_min = 50 * 60 / 100;
                        } else if (plan_hour[1]) {
                            plan_min = plan_hour[1] * 60 / 100;
                        } else {
                            plan_min = 0;
                        }
                    }
                    if (Student_data.privateHourLeft != undefined) {
                        plan_hour_private = Student_data.privateHourLeft.toString().split(".");
                        if (plan_hour_private[1] == 5) {
                            plan_min_private = 50 * 60 / 100;
                        } else if (plan_hour_private[1]) {
                            plan_min_private = plan_hour_private[1] * 60 / 100;
                        } else {
                            plan_min_private = 0;
                        }
                    }

                    if (!this.checkbox) {
                        if (Student_data.privateHourLeft == undefined && location_data.name.includes("Private")) {
                            alert("ไม่มี Private Class");
                            return;
                        }
                        if (Student_data.hourLeft == undefined && location_data.name.includes("Flip")) {
                            alert("ไม่มี Flip Class");
                            return;
                        }

                        if (location_data.name.includes("Flip") && Student_data.hourLeft < sum_hour) {
                            alert("เวลา Flip Class ไม่พอ \n Flip Class เหลือ " + plan_hour[0] + "ชม." + plan_min + "นาที");
                            return;
                        }
                        if (location_data.name.includes("Private") && Student_data.privateHourLeft < sum_hour) {
                            alert("เวลา Private Class ไม่พอ \n Private Class เหลือ" + plan_hour_private[0] + "ชม." + plan_min_private + "นาที");
                            return;
                        }
                    }

                    if (timeSnapshot.exists() || timeteaSnapshot.exists()) {
                        if (true) {
                            if (this.mode === 'save') {
                                if (timeSnapshot.exists()) {
                                    const timeData = timeSnapshot.val();
                                    const ed_timeData = Object.keys(timeData).map(key => key.substring(2, 7));
                                    if (this.time_standart_sum.some(time => ed_timeData.includes(time))) {
                                        alert('เวลาซ้ำกับของตนเองกรุณาลงใหม่อีกครั้ง');
                                        return;
                                    }
                                }
                                if (timeteaSnapshot.exists()) {
                                    const timeteaData = timeteaSnapshot.val();
                                    const ed_timeteaData = Object.keys(timeteaData).map(key => key.substring(2, 7));
                                    if (this.time_standart_sum.some(time => ed_timeteaData.includes(time))) {
                                        alert('เวลาซ้ำกับตารางสอนครูกรุณาลงใหม่อีกครั้ง');
                                        return;
                                    }
                                }
                                
                                if (hourmatchData.exists() && !this.checkbox) {
                                    const data = hourmatchData.val();
                                    let sum_hour_match = 0;
                                    let sum_hour_match_pri = 0;
                                    if (data.hour != undefined && location_data.name.includes("Flip")) {
                                        sum_hour_match = sum_hour + data.hour;
                                        if (Student_data.hourLeft < sum_hour_match) {
                                            alert("ชั่วโมง Flip ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hour + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.hourLeft + "Hour");
                                            return;
                                        }
                                    }
                                    if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                        sum_hour_match_pri = sum_hour + data.hourprivate;
                                        if (Student_data.privateHourLeft < sum_hour_match_pri) {
                                            alert("ชั่วโมง Private ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hourprivate + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.privateHourLeft + "Hour");
                                            return;
                                        }
                                    }

                                    if (data.hour != undefined && location_data.name.includes("Flip")) {
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hour: data.hour + sum_hour,
                                        });
                                    }
                                    if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hourprivate: data.hourprivate + sum_hour,
                                        });
                                    }

                                } else if (!hourmatchData.exists() && !this.checkbox) {
                                    if (location_data.name.includes("Flip")) {
                                        console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hour: sum_hour,
                                            hourprivate: 0,
                                        });
                                    }
                                    if (location_data.name.includes("Private")) {
                                        console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hour: 0,
                                            hourprivate: sum_hour,
                                        });
                                    }
                                }
                                this.dialog_detail = false;
                                for (const keydate in this.date1) {
                                    db.ref(`date_match/${this.value_student}/${this.date1[keydate]}/${this.picker_stop}`).update({
                                        teacher: this.value,
                                        subject: this.save_detail.subject,
                                        style_subject: this.save_detail.style,
                                        level: this.save_detail.level,
                                        start: this.picker_start,
                                        stop: this.picker_stop,
                                        start_tea: this.picker_start,
                                        stop_tea: this.picker_stop,
                                        because: this.save_detail.because,
                                        status: this.check_status(),
                                        createAt: new Date(),
                                        ID: id,
                                        match_test: this.checkbox,
                                        hour: sum_hour,
                                    });
                                    for (const key in this.time_standart_sum) {
                                        db.ref(`Time_student/${this.value_student}/${this.date1[keydate]}/S:${this.time_standart_sum[key]}:1:${id}`).update({
                                            0: ''
                                        });
                                    };
                                }

                            } else if (this.mode === 'edit') {
                                if (timeSnapshot.exists()) {
                                    const timeData = timeSnapshot.val();
                                    const ed_timeData = Object.keys(timeData).map(key => key.substring(2, 7));
                                    if (this.time_standart_sum.some(time => ed_timeData.includes(time))) {
                                        alert('เวลาซ้ำกันกรุณาลงใหม่อีกครั้ง');
                                        return;
                                    }
                                }
                                
                                if (hourmatchData.exists() && !this.checkbox) {
                                    const data = hourmatchData.val();
                                    let sum_hour_match = 0;
                                    let sum_hour_match_pri = 0;
                                    if (data.hour != undefined && location_data.name.includes("Flip")) {
                                        sum_hour_match = sum_hour + data.hour;
                                        if (Student_data.hourLeft < sum_hour_match) {
                                            alert("ชั่วโมง Flip ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hour + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.hourLeft + "Hour");
                                            return;
                                        }
                                    }
                                    if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                        sum_hour_match_pri = sum_hour + data.hourprivate;
                                        if (Student_data.privateHourLeft < sum_hour_match_pri) {
                                            alert("ชั่วโมง Private ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hourprivate + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.privateHourLeft + "Hour");
                                            return;
                                        }
                                    }

                                    if (data.hour != undefined && location_data.name.includes("Flip")) {
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hour: data.hour + sum_hour,
                                        });
                                    }
                                    if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hourprivate: data.hourprivate + sum_hour,
                                        });
                                    }
                                } else if (!hourmatchData.exists() && !this.checkbox) {
                                    if (location_data.name.includes("Flip")) {
                                        console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hour: sum_hour,
                                            hourprivate: 0,
                                        });
                                    }
                                    if (location_data.name.includes("Private")) {
                                        console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                        db.ref(`hour_match/${this.value_student}/`).update({
                                            hourprivate: sum_hour,
                                            hour: 0,
                                        });
                                    }
                                }
                                this.dialog_detail_edit = false;
                                db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop_tea}`).once("value", (snapshot) => {
                                    const childData = snapshot.val();
                                    if (parseInt(childData.invite) < parseInt(childData.sum_people)) {
                                        db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop_tea}`).update({
                                            invite: parseInt(childData.invite) + 1,
                                        })
                                        db.ref(`date_match/${this.value_student}/${this.date1}/${this.picker_stop}`).update({
                                            teacher: this.value,
                                            subject: this.save_detail.subject,
                                            style_subject: this.save_detail.style,
                                            level: this.save_detail.level,
                                            createAt: new Date(),
                                            start: this.picker_start,
                                            stop: this.picker_stop,
                                            because: this.save_detail.because,
                                            start_tea: this.picker_start_tea,
                                            stop_tea: this.picker_stop_tea,
                                            status: this.check_status(),
                                            ID: this.idTea,
                                            match_test: this.checkbox,
                                            hour: sum_hour,
                                        });
                                        for (const key in this.time_standart_sum) {
                                            db.ref(`Time_student/${this.value_student}/${this.date1}/S:${this.time_standart_sum[key]}:${this.sum_peoples}:${this.idTea}`).update({
                                                0: ''
                                            });
                                            // db.ref(`Time_teacher/${this.value}/${this.date1}/S:${this.time_standart_sum[key]}:${this.sum_peoples}:${this.idTea}/${this.value_student}`).update({
                                            // });
                                        };
                                    } else { alert('error'); }
                                })
                            } else {
                                this.dialog_save_error = true;
                            }
                            this.clear_item();
                            this.dialog_select_date = false;
                        }
                    } else {
                        if (this.mode === 'save') {                            
                            if (hourmatchData.exists() && !this.checkbox) {
                                const data = hourmatchData.val();
                                let sum_hour_match = 0;
                                let sum_hour_match_pri = 0;
                                if (data.hour != undefined && location_data.name.includes("Flip")) {
                                    sum_hour_match = sum_hour + data.hour;
                                    if (Student_data.hourLeft < sum_hour_match) {
                                        alert("ชั่วโมง Flip ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hour + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.hourLeft + "Hour");
                                        return;
                                    }
                                }
                                if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                    sum_hour_match_pri = sum_hour + data.hourprivate;
                                    if (Student_data.privateHourLeft < sum_hour_match_pri) {
                                        alert("ชั่วโมง Private ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hourprivate + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.privateHourLeft + "Hour");
                                        return;
                                    }
                                }

                                if (data.hour != undefined && location_data.name.includes("Flip")) {
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hour: data.hour + sum_hour,
                                    });
                                }
                                if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hourprivate: data.hourprivate + sum_hour,
                                    });
                                }
                            } else if (!hourmatchData.exists() && !this.checkbox) {
                                if (location_data.name.includes("Flip")) {
                                    console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hour: sum_hour,
                                        hourprivate: 0,
                                    });
                                }
                                if (location_data.name.includes("Private")) {
                                    console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hourprivate: sum_hour,
                                        hour: 0,
                                    });
                                }
                            }
                            this.dialog_detail = false;
                            for (const keydate in this.date1) {
                                db.ref(`date_match/${this.value_student}/${this.date1[keydate]}/${this.picker_stop}`).update({
                                    teacher: this.value,
                                    subject: this.save_detail.subject,
                                    style_subject: this.save_detail.style,
                                    level: this.save_detail.level,
                                    start: this.picker_start,
                                    stop: this.picker_stop,
                                    start_tea: this.picker_start,
                                    stop_tea: this.picker_stop,
                                    because: this.save_detail.because,
                                    status: this.check_status(),
                                    createAt: new Date(),
                                    ID: id,
                                    match_test: this.checkbox,
                                    hour: sum_hour,
                                });
                                for (const key in this.time_standart_sum) {
                                    db.ref(`Time_student/${this.value_student}/${this.date1[keydate]}/S:${this.time_standart_sum[key]}:1:${id}`).update({
                                        0: ''
                                    });
                                };
                            }
                        } else if (this.mode === 'edit') {
                            if (hourmatchData.exists() && !this.checkbox) {
                                const data = hourmatchData.val();
                                let sum_hour_match = 0;
                                let sum_hour_match_pri = 0;
                                if (data.hour != undefined && location_data.name.includes("Flip")) {
                                    sum_hour_match = sum_hour + data.hour;
                                    if (Student_data.hourLeft < sum_hour_match) {
                                        alert("ชั่วโมง Flip ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hour + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.hourLeft + "Hour");
                                        return;
                                    }
                                }
                                if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                    sum_hour_match_pri = sum_hour + data.hourprivate;
                                    if (Student_data.privateHourLeft < sum_hour_match_pri) {
                                        alert("ชั่วโมง Private ไม่พอเนื่องจากมีการจองไปแล้ว" + data.hourprivate + "Hour" + " และมีเวลาในตัวเหลืออยู่" + Student_data.privateHourLeft + "Hour");
                                        return;
                                    }
                                }

                                if (data.hour != undefined && location_data.name.includes("Flip")) {
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hour: data.hour + sum_hour,
                                    });
                                }
                                if (data.hourprivate != undefined && location_data.name.includes("Private")) {
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hourprivate: data.hourprivate + sum_hour,
                                    });
                                }
                            } else if (!hourmatchData.exists() && !this.checkbox) {
                                if (location_data.name.includes("Flip")) {
                                    console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hour: sum_hour,
                                        hourprivate: 0,
                                    });
                                }
                                if (location_data.name.includes("Private")) {
                                    console.log('ทำสร้าง', `hour_match/${this.value_student}/`);
                                    db.ref(`hour_match/${this.value_student}/`).update({
                                        hourprivate: sum_hour,
                                        hour: 0,
                                    });
                                }
                            }
                            this.dialog_detail_edit = false;
                            db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop_tea}`).once("value", (snapshot) => {
                                const childData = snapshot.val();
                                if (parseInt(childData.invite) < parseInt(childData.sum_people)) {
                                    db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop_tea}`).update({
                                        invite: parseInt(childData.invite) + 1,
                                    })
                                    db.ref(`date_match/${this.value_student}/${this.date1}/${this.picker_stop}`).update({
                                        teacher: this.value,
                                        subject: this.save_detail.subject,
                                        style_subject: this.save_detail.style,
                                        level: this.save_detail.level,
                                        start: this.picker_start,
                                        stop: this.picker_stop,
                                        because: this.save_detail.because,
                                        start_tea: this.picker_start_tea,
                                        stop_tea: this.picker_stop_tea,
                                        status: this.check_status(),
                                        ID: this.idTea,
                                        createAt: new Date(),
                                        match_test: this.checkbox,
                                        hour: sum_hour,
                                    });
                                } else { alert('error'); }
                            })
                            for (const key in this.time_standart_sum) {
                                db.ref(`Time_student/${this.value_student}/${this.date1}/S:${this.time_standart_sum[key]}:${this.sum_peoples}:${this.idTea}`).update({
                                    0: ''
                                });
                                // db.ref(`Time_teacher/${this.value}/${this.date1}/S:${this.time_standart_sum[key]}:${this.sum_peoples}:${this.idTea}/${this.value_student}`).push({
                                // });
                            };
                        } else {
                            this.dialog_save_error = true;
                        }
                        this.clear_item();
                        this.dialog_select_date = false;
                    }
                })
        },

        clear_item() {
            this.idTea = null;
            this.value = null;
            this.sum_peoples = null;
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
            this.time_standart = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
                , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
                , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
                , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
                , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
                , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
            this.time_standart_stop = [];
            this.time_standart_sum = [];
            this.date1 = [];
        },
        allowedDates: val => {
            const currentDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);
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
                            item.push({ key: key, name: childData[key].teacherId + " ครู" + childData[key].nickname });
                        }
                    }
                    this.items_select_tea = item;

                } else {
                    for (const key in childData) {
                        if (childData[key].status == 'teacher') {
                            item.push({ key: key, name: childData[key].teacherId + " ครู" + childData[key].nickname });
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
                        item.push({ key: key, name: childData[key].studentId + " น้อง" + childData[key].nickname });
                    }
                }
                this.items_student = item;
            })
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
                                        const namesub = subjectData.name;
                                        if (parseInt(timedata.invite) < parseInt(timedata.sum_people)) {
                                            item.push({
                                                name: nametea,
                                                date: date,
                                                time_s: timedata.start,
                                                time_e: timedata.stop,
                                                style: locationData.name,
                                                // class: timedata.class,
                                                class_all: teacherData.classType,
                                                subject: namesub,
                                                keySubject: timedata.subject,
                                                people: timedata.sum_people,
                                                sum_people: timedata.invite + "/" + timedata.sum_people,
                                                invite: timedata.invite,
                                                key: key,
                                                full_location: { name: locationData.name, key: timedata.style_subject },
                                                keyLocation: timedata.style_subject,
                                                id: timedata.ID
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
                    this.hour_tea = key.substring(0, 2);
                    this.min_tea = key.substring(3, 5);
                }
            })
        },

        editItem(item) {
            this.idTea = item.id;
            this.delday = item.time_e;
            this.editedIndex = this.desserts.indexOf(item);
            this.value = item.key;
            this.date1 = item.date;
            this.style_class = item.class_all;
            this.style_subject = item.full_location;
            this.sum_peoples = item.people;
            this.save_detail.style = item.keyLocation;
            this.save_detail.subject = item.keySubject;
            this.save_detail.keysubject = item.keySubject;
            this.picker_start_tea = item.time_s;
            this.picker_stop_tea = item.time_e;

            if (item.subject != 'ทุกวิชา') {
                this.search_level_select_edit(item);
                this.search_subject_teacher(item);
            } else {
                this.search_subject_teacher(item);
            }
            this.check_time_select(item);
        },

        check_time_select(item) {
            this.time_standart = [];
            this.time_standart_stop = [];
            this.time_all = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
                , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
                , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
                , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
                , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
                , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
            let sum = 0;
            for (const key in this.time_all) {
                if (item.time_e == this.time_all[key]) {
                    sum = 0;
                    this.time_standart.push(this.time_all[key]);
                    this.time_standart_stop.push(this.time_all[key]);
                    break;
                }
                else if (item.time_s == this.time_all[key] || (sum != 0)) {
                    sum++;
                    this.time_standart.push(this.time_all[key]);
                    this.time_standart_stop.push(this.time_all[key]);
                }
            }
        },
        search_level_select_edit(item) {
            let level = [];
            const db = this.$fireModule.database();
            db.ref(`user/${item.key}/subject_all`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const detail = childData[key];
                    if (key === item.keySubject) {
                        level = detail.level;
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
                    if (key === this.save_detail.subject) {
                        level = detail.level;
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
                    subject.push({ name: detail.name, key: key });
                }
                this.subject_select_tea = subject;
            })
        },

        search_location() {
            this.style_subject = [];
            const db = this.$fireModule.database();
            const getTeacherPromise = db.ref(`user/${this.value}`).once("value");
            Promise.all([getTeacherPromise])
                .then((snapshots) => {
                    const teacherSnapshot = snapshots[0];
                    const location = teacherSnapshot.val();
                    this.style_class = location.classType;

                    for (const key in location.classLocation) {
                        db.ref(`location/${location.classLocation[key]}`).once("value", (snapshot) => {
                            const childData = snapshot.val();
                            this.style_subject.push({ name: childData.name, key: location.classLocation[key] });
                        })
                    }
                })

        },

        close() {
            this.dialog_detail = false;
            this.dialog_detail_edit = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.clear_item())
                this.editedIndex = -1
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
}
</style>