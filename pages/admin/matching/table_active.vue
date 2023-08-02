<template>
    <div class="pt-10">
        <template>
            <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="date" class="elevation-16 rounded-xl">
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.status="{ item }">
                    <v-chip :color="getColor(item.status)" dark>
                        {{ item.status }}
                    </v-chip>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="#F8F9FB" class="rounded-t-xl">
                        <v-toolbar-title><b>จองเวลาเรียนสำเร็จ</b></v-toolbar-title>
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
                                                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.date" label="Calories"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.style" label="Fat (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.status" label="Carbs (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.subject"
                                                    label="Protein (g)"></v-text-field>
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
                                                <v-text-field style="font-weight: bold;" v-model="editedItem.name"
                                                    label="Phone number teacher" disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field style="font-weight: bold;" v-model="editedItem.name"
                                                    label="Name teacher" disabled></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field style="font-weight: bold;" v-model="editedItem.name_student"
                                                    label="Phone number student" disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field style="font-weight: bold;" color="black"
                                                    v-model="editedItem.name_student" label="Name student"
                                                    disabled></v-text-field>
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
                                <v-card-title class="text-h5" color="red">ต้องการยกเลิกการจองกระทันหัน ?</v-card-title>
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
                    <v-icon small class="mr-2" @click="editItem(item)" style="font-size:24px" color="red">
                        mdi-delete-alert
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
                            if (timedata.status == 'พร้อมเรียน') {
                                const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                const getStudentPromise = db.ref(`user/${key}`).once("value");
                                const getsubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                const getlocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                Promise.all([getTeacherPromise, getStudentPromise, getsubjectPromise,getlocationPromise])
                                    .then(([teacherSnapshot, studentSnapshot ,subjectSnapshot ,locationSnapshot]) => {
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
                                            // class: timedata.class,
                                            level: timedata.level,
                                            because: timedata.because,

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
                // console.log(this.desserts);
            })
        },

        editItem(item) {
            // console.log('item>>',item);
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            // console.log('editedItem>>',this.editedItem);
            this.dialogDelete = true;
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
            // console.log('update>>', this.editedItem);
            this.close()
        },

        delete_match() {
            if (!this.editedItem) {
                alert("No data to delete");
                return;
            }
            // console.log(">>>>",this.editedItem);
            const db = this.$fireModule.database();
            let sum = 0;
            db.ref(`date_teacher/${this.editedItem.key_teacher}/${this.editedItem.date}/${this.editedItem.time_e_tea}/invite`).once("value", (snapshot) => {
                const childData = snapshot.val();
                sum = childData - 1;
            })

            db.ref(`date_teacher/${this.editedItem.key_teacher}/${this.editedItem.date}/${this.editedItem.time_e_tea}`).update({
                invite: sum,
            }).then(() => {
                // console.log("success invite");
            });

            db.ref(`date_match/${this.editedItem.key_student}/${this.editedItem.date}/${this.editedItem.time_e}`).remove()
                .then(() => {
                    // console.log("success del");
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
