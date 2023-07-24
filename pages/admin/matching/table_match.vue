<template>
    <div class="">
        <template>
            <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="date" class="elevation-1 mt-5">
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.status="{ item }">
                    <v-chip :color="getColor(item.status)" dark>
                        {{ item.status }}
                    </v-chip>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="red lighten-5">
                        <v-toolbar-title>Ticket คำร้องขอจองเวลาเรียน</v-toolbar-title>
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
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.name" label="ครูผู้สอน"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.date" label="วันที่"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.style"
                                                    label="รูปแบบการสอน"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.time_s" label="เริ่มเรียน"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.time_e" label="เลิกเรียน"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.subject"
                                                    label="วิชาที่ต้องการเรียน"></v-text-field>
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
                                                    label="Phone number teacher" readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.name" label="Name teacher"
                                                    readonly></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.phone_student"
                                                    label="Phone number student" readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field color="black" v-model="editedItem.name_student"
                                                    label="Name student" readonly></v-text-field>
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
                                    <v-btn color="light-green lighten-4" @click="save">
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
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
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
            { text: 'Date', value: 'date', align: 'center' },
            { text: 'Start', value: 'time_s', align: 'start' },
            { text: 'End', value: 'time_e', align: 'start' },
            { text: 'Style', value: 'style', align: 'start' },
            { text: 'Subject', value: 'subject', align: 'start' },
            { text: 'Status', value: 'status', align: 'start' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
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
                                Promise.all([getTeacherPromise, getStudentPromise])
                                    .then(([teacherSnapshot, studentSnapshot]) => {
                                        const teacherData = teacherSnapshot.val();
                                        const studentData = studentSnapshot.val();
                                        const phone_tea = teacherData.mobile;
                                        const nametea = "คุณครู " + teacherData.firstName + " " + teacherData.lastName;
                                        const namestu = studentData.firstName + " " + studentData.lastName;
                                        const phone_stu = studentData.studentMobile;
                                        item.push({
                                            name_student: namestu,
                                            name: nametea,
                                            subject: timedata.subject,
                                            date: date,
                                            time_s: timedata.start,
                                            time_e: timedata.stop,
                                            style: timedata.style_subject,
                                            status: timedata.status,
                                            key_student: key,
                                            key_teacher: timedata.teacher,
                                            phone_student: phone_stu,
                                            phone_teacher: phone_tea,
                                            class: timedata.class,
                                        });                                        
                                    })
                                    .catch((error) => {
                                        alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
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
            // console.log('item>>',item);
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            // console.log('editedItem>>',this.editedItem);
            this.dialog = true
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
            const db = this.$fireModule.database();
            db.ref(`date_match/${this.editedItem.key_student}/${this.editedItem.date}/${this.editedItem.time_e}/`).update({
                status: "พร้อมเรียน",
            });
            this.close()
        },

        delete_match() {
            console.log('del>>', this.editedItem);
            const db = this.$fireModule.database();
            db.ref(`date_match/${this.editedItem.key_student}/${this.editedItem.date}/${this.editedItem.time_e}`).remove()
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
