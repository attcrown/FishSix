<template>
    <div>
        <h1> Test Time DTAT</h1>
        <template>
            <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>My CRUD</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="600px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    New Item
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
                                                            :rules="[v => !!v || 'กรุณาเลือกวันที่']" required>
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
                                                        item-value="key" item-text="name" label="ชื่อวิชา" @input="search_level()
                                                        All_data.student = null,
                                                            All_data.style_subject = null,
                                                            All_data.teacher = null,
                                                            All_data.level = null" :rules="[v => !!v || 'กรุณาเลือก']"
                                                        required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-autocomplete v-model="All_data.level" :items="level_select"
                                                        label="ระดับการศักษา" @input="search_teacher(),
                                                            All_data.student = null,
                                                            All_data.style_subject = null,
                                                            All_data.teacher = null"
                                                        :rules="[v => !!v || 'กรุณาเลือก']" required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-autocomplete v-model="All_data.teacher" :items="teacher_select"
                                                        item-value="key" item-text="name" label="เลือกคุณครู"
                                                        :rules="[v => !!v || 'กรุณาเลือก']"
                                                        @input="All_data.student = null, All_data.style_subject = null"
                                                        required></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-autocomplete v-model="All_data.student" :items="student_select"
                                                        item-value="key" item-text="name" label="เลือกนักเรียน"
                                                        :rules="[v => !!v || 'กรุณาเลือก']" required
                                                        @input="search_location(), All_data.style_subject = null"></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-autocomplete v-model="All_data.style_subject"
                                                        :items="location_select" item-value="key" item-text="name"
                                                        label="สถานที่สอน" :rules="[v => !!v || 'กรุณาเลือก']" required
                                                        @input="select_class(All_data.style_subject)"></v-autocomplete>
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
                                                <v-col cols="12" sm="6" md="6" style="margin-top:-20px">
                                                    <v-checkbox v-model="All_data.match_test"
                                                        label="ทดลองเรียน"></v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6" style="margin-top:-20px">
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
                                    <v-btn rounded color="#29CC39" class="mb-5" @click="validate_add()" dark>
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
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
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
    layout: 'login',
    data: () => ({
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
        headers: [
            {
                text: 'Dessert (100g serving)',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Protein (g)', value: 'protein' },
            { text: 'Actions', value: 'actions', sortable: false },
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
    }),
    mounted() {

    },
    computed: {
        formTitle() {
            this.mode = this.editedIndex === -1 ? 'รอยืนยัน' : 'พร้อมเรียน'
            return this.editedIndex === -1 ? 'จองเวลาเรียนนอกตาราง' : 'จองเวลาเรียนในตาราง'
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
        this.initialize();
        this.LimitedClass_search();
        this.search_subject_select();
        this.search_student();
    },
    methods: {
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
            this.location_select = [];
            const db = this.$fireModule.database();
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
                                this.location_select.push({ name: childData.name, key: location.classLocation[key] });
                                this.All_data.show_time_flip = studentData.hourLeft;
                            }
                            if (studentData.privateHourLeft && childData.name.includes('Private')) {
                                this.location_select.push({ name: childData.name, key: location.classLocation[key] });
                                this.All_data.show_time_private = studentData.privateHourLeft;
                            }
                            if (hourmatchData && hourmatchData.hour) {
                                this.All_data.show_time_flip_match = hourmatchData.hour;
                            }
                            if (hourmatchData && hourmatchData.hourprivate) {
                                this.All_data.show_time_flip_match = hourmatchData.hourprivate;
                            }
                        })
                    }
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
                this.student_select = item;
            })
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



        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.All_data = Object.assign({}, item)
            this.dialog = true
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
                this.All_data = Object.assign({}, this.defaultItem)
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

        async save_time() {
            const db = this.$fireModule.database();
            const selectedObject = this.LimitedClass_all.find(item => item.key === this.All_data.select);
            console.log('Selected item:', selectedObject);
            const data = this.All_data;
            let isSave = 0;
            let maxKeyOut = 0;
            let hour = this.sum_hour(data.start, data.stop);
            console.log("hour", hour);
            if (parseFloat(data.show_time_flip) + parseFloat(data.show_time_flip_match) < hour && data.select == "-NcQsFxCcoNS-uwmKUqE") {
                alert('ชั่วโมงเรียนไม่พอ');
                return;
            }
            if (parseFloat(data.show_time_private) + parseFloat(data.show_time_private_match) < hour && data.select == "-NcQsHB9vgG53lJKPA-i") {
                alert('ชั่วโมงเรียนไม่พอ');
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
                                alert('จองไปแล้ว ซ้ำ' + textadd + this.date[keydate]);
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
                                if (data.time_sum.length == parseInt(key) + 1 && text.length != 0) {
                                    alert('เต็มแล้ว' + text + this.date[keydate]);
                                }
                                if (maxKey < selectedObject.bath && data.time_sum.length == parseInt(key) + 1) {
                                    console.log('send save');
                                }
                                if (maxKey < selectedObject.bath && data.time_sum.length == parseInt(key) + 1 && textadd.length != 0) {
                                    alert(textadd);
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
                        if (selectedObject.key == '-NcQsHB9vgG53lJKPA-i') {
                            for (let x = 0; x < this.LimitedClass_all[0].bath; x++) {
                                await db.ref(`Time_teacher/${data.teacher}/${this.date[keydate]}/${data.time_sum[key]}/`).update({
                                    [x]: data.student
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
                        teacher: data.teacher,
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
                }
                this.close();
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
    },
}
</script>