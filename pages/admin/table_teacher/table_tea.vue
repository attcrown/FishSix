<template>
    <div>
        <div class="pt-5">
            <v-row align="center">
                <v-col cols="12">
                    <div>
                        <div class="subheading">
                            <!-- <h3>Teacher</h3> -->
                        </div>
                        <v-date-picker class="hide-on-desktop" v-model="date1" :events="arrayEvents"
                            :allowed-dates="allowedDates" show-adjacent-months event-color="green lighten-1"
                            @input="dialog_detail = true, mode = 'save', clear_item()"></v-date-picker>
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-data-table :headers="headers" :items="desserts" :search="search_table" sort-by="date"
                        class="elevation-16 rounded-xl">
                        <!--:search="search"-->
                        <template v-slot:top>
                            <v-toolbar flat color="#F8F9FB" class="rounded-t-xl">
                                <v-toolbar-title><b>ตารางสอนครู</b></v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-text-field class="me-10" v-model="search_table" append-icon="mdi-magnify" label="Search"
                                    single-line hide-details style="max-width: 200px;"></v-text-field>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <template v-slot:activator="{}">
                                        <v-btn elevation="10" small dark color="#322E2B" class="mb-2 mt-5 hide-on-mobile"
                                            @click="dialog_select_date = true">
                                            เพิ่มตารางสอน<span class="mdi mdi-plus text-h6"></span>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="text-h5">Are you sure you want to delete this
                                            item?</v-card-title>
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
                            <v-icon v-if="!(parseInt(item.invite) > 0)" small class="mr-2"
                                @click="editItem(item), dialog_detail = true, mode = 'edit'">
                                mdi-pencil
                            </v-icon>
                            <v-icon v-if="!(parseInt(item.invite) > 0)" small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </div>

        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog_detail" persistent max-width="600px">
                    <v-card class="rounded-xl">
                        <v-card-title style="background-color:rgba(32, 124, 4, 0.733)">
                            <span class="text-h8"><b>{{ mode }} Teach [{{ date1 }}]</b></span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" class="mt-5" v-if="mode == 'save'">
                                        <v-autocomplete v-model="value" :items="items" label="Search teacher"
                                            item-text="name" item-value="key"
                                            @change="check_time_start(), search_subject_tea(value), search_class_tea(value), search_style_tea(value)"
                                            @input="check_tea = false"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" class="mt-5" v-if="mode == 'edit'">
                                        <v-autocomplete v-model="value" :items="items" label="Search teacher"
                                            item-text="name" item-value="key" readonly
                                            @change="check_time_start(), search_subject_tea(value), search_class_tea(value), search_style_tea(value)"
                                            @input="check_tea = false"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-select :items="class_flip" label="ประเภท" v-model="save_detail.class"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-select :items="style_subject" item-text="name" item-value="key"
                                            label="สถานที่สอน" v-model="save_detail.style"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field label="จำนวนคนเปิดรับ" v-model="save_detail.sum_people"
                                            number></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="4" v-if="value != null">
                                        <v-select :items="subject" item-text="name" item-value="key" label="วิชาเปิดสอน"
                                            v-model="save_detail.subject"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-select :items="time_standart" v-model="picker_start" label="เริ่มสอน"
                                            @change="validateTime(), picker_stop=null"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-select :items="time_standart_stop" v-model="picker_stop" @change="validateTime()"
                                            label="หยุดสอน"></v-select>
                                    </v-col>

                                    <!-- <v-col cols="12" sm="4">
                                        <v-text-field label="เริ่มสอน" v-model="picker_start"
                                            @click="dialog_time = true"></v-text-field>
                                    </v-col> -->
                                    <!-- <v-col cols="12" sm="4">
                                        <v-text-field label="หยุดสอน" v-model="picker_stop"
                                            @click="dialog_time_stop = true"></v-text-field>
                                    </v-col> -->
                                </v-row>
                            </v-container>
                            <small>*การลงเวลามีผลต่อการแสดงผลฝั่งลูกค้ากรุณาใช้ความชัวในกแารลงเวลา</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text
                                @click="dialog_detail = false; dialog_select_date = false; clear_item()">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save_detail_data()" :disabled="!formIsValid">
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
                            <v-btn color="blue darken-1" text @click="dialog_time = false">
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
                                    <v-time-picker v-model="picker_stop" format="24hr" :min="picker_start"></v-time-picker>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog_time_stop = false">
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
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

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
            { text: 'ประเภทคลาส', value: 'class', align: 'center' },
            { text: 'สถานที่สอน', value: 'style', align: 'center' },
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

        time_standart: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
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

    }),
    components: {

    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        formIsValid() {
            return (
                this.value &&
                this.save_detail.class &&
                this.save_detail.style &&
                this.save_detail.sum_people &&
                this.save_detail.subject &&
                this.picker_start &&
                this.picker_stop
            );
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
        this.search_date_teacher();
        this.search_teacher();
    },

    methods: {
        validateTime() {
            if (true){//this.picker_stop == null) {
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
                this.time_standart_sum=[];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.picker_stop == this.time_standart[key]) {
                        sum = 0;
                        this.time_standart_sum.push(this.time_standart[key]);
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

        save_detail_data() {
            // console.log(this.mode);
            if (this.save_detail.class == '' ||
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
            const db = this.$fireModule.database();
            if (this.mode == 'save') {
                db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop}`).set({
                    class: this.save_detail.class,
                    style_subject: this.save_detail.style,
                    sum_people: this.save_detail.sum_people,
                    invite: '0',
                    subject: this.save_detail.subject,
                    start: this.picker_start,
                    stop: this.picker_stop,
                });
            }
            else if (this.mode == 'edit') {
                if (this.delday != this.picker_stop) {
                    db.ref(`date_teacher/${this.value}/${this.date1}/${this.delday}`).remove();
                }
                db.ref(`date_teacher/${this.value}/${this.date1}/${this.picker_stop}`).update({
                    class: this.save_detail.class,
                    sum_people: this.save_detail.sum_people,
                    subject: this.save_detail.subject,
                    style_subject: this.save_detail.style,
                    start: this.picker_start,
                    stop: this.picker_stop,
                    invite: '0',
                });
            } else {
                this.dialog_save_error = true
            }
            this.clear_item();
            this.dialog_detail = false;
        },

        clear_item() {
            this.value = null;
            this.hour_tea = 0;
            this.min_tea = 0;
            this.save_detail = [];
            this.picker_start = null;
            this.picker_stop = null;
        },
        allowedDates: val => {
            const currentDate = new Date();
            const selectedDate = new Date(val);
            return selectedDate >= currentDate;
        },

        search_class_tea(item) {
            const db = this.$fireModule.database();
            db.ref(`user/${item}/classType`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.class_flip = childData;
            })
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
                this.desserts = [];
                this.arrayEvents = [];
                let item = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
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
                                            class: timedata.class,
                                            subject: namesub,
                                            keySubject: timedata.subject,
                                            people: timedata.sum_people,
                                            sum_people: timedata.invite + "/" + timedata.sum_people,
                                            invite: timedata.invite,
                                            key: key,
                                        });
                                        this.arrayEvents.push(date);
                                    } else { }
                                })
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
                } else {
                    for (const key in childData) {
                        // console.log(key);
                        this.hour_tea = key.substring(0, 2);
                        this.min_tea = key.substring(3, 5);
                    }
                }
            })
        },

        editItem(item) {
            console.log(item);
            this.time_standart_stop = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
            this.time_standart = this.time_standart_stop;
            this.search_class_tea(item.key);
            this.search_style_tea(item.key);
            this.search_subject_tea(item.key);
            this.delday = item.time_e;
            this.editedIndex = this.desserts.indexOf(item);
            this.value = item.key;
            this.date1 = item.date;
            this.save_detail.subject = item.keySubject;
            this.save_detail.class = item.class;
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
            // console.log(this.delcon);
            const db = this.$fireModule.database();
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
                        item.push({ key: key, name: childData[key].nickname + " " + childData[key].teacherId });
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
