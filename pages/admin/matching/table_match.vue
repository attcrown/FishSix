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
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>

                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.name" label="ครูผู้สอน"
                                                    disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
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
                                                <v-select :items="select_location" label="สถานที่สอน"
                                                    v-model="editedItem.style" item-text="name" item-value="key"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select :items="select_class" label="รูปแบบการสอน"
                                                    v-model="editedItem.class"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="4">
                                                <v-select :items="select_subject" label="วิชาเรียน" item-text="name"
                                                    item-value="key" v-model="editedItem.subject"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.time_s" label="เริ่มเรียน"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.time_e" label="เลิกเรียน"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-title>
                                    <span class="text-h5">Detail</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.phone_teacher"
                                                    label="Phone number teacher" disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.name" label="Name teacher"
                                                    disabled></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.phone_student"
                                                    label="Phone number student" disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field color="black" v-model="editedItem.name_student"
                                                    label="Name student" disabled></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>

                                    <v-btn color="red lighten-4" @click="dialogDelete = true">
                                        <b>ยกเลิกการจอง</b>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue dark-4" text @click="close">
                                        <b>ปิด</b>
                                    </v-btn>
                                    <v-btn color="light-green lighten-4" :disabled="!formIsValid" @click="save">
                                        <b>ยืนยันการจอง</b>
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
                console.log(this.desserts);
            })
        },

        editItem(item) {
            this.old_item = item;
            console.log('item>>', item);
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
            console.log('update>>', this.editedItem);
            this.delete_match();
            const db = this.$fireModule.database();
            db.ref(`date_match/${this.editedItem.key_student}/${this.editedItem.date}/${this.editedItem.time_e}/`).update({
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
            db.ref(`date_teacher/${this.editedItem.key_teacher}/${this.editedItem.date}/${this.editedItem.time_e}/`).update({
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
            console.log('del>>', this.editedItem);
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
    },
}
</script>
