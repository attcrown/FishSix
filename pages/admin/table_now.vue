<template>
    <div class="mt-6">
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers_student" :items="desserts_student" sort-by="date"
                    :search="search_table_student" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat style="background-color:rgba(230, 226, 12, 0.425);">
                            <v-toolbar-title>Date Now</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-text-field class="me-10" v-model="search_table_student" append-icon="mdi-magnify"
                                label="Search" single-line hide-details></v-text-field>
                        </v-toolbar>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getColor(item.status)" dark>
                            {{ item.status }}
                        </v-chip>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{ item }">
                        <v-btn x-small color="secondary" @click="detail_match(item)">
                            <v-icon small class="mr-2">
                                mdi-account-details
                            </v-icon>
                            DETAIL
                        </v-btn>
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
                        <v-card>
                            <v-card-title>
                                <span class="text-h5"><b>DETAIL</b> [ {{ detail_user.date }} ]</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="name student" v-model="detail_user.name_student" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="phone number" v-model="detail_user.phone_student" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="name teacher" v-model="detail_user.name" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="phone number" v-model="detail_user.phone_teacher" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field label="วิชาที่เรียน" v-model="detail_user.subject" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field label="สถานที่เรียน" v-model="detail_user.style" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field label="รูปแบบการเรียน"  v-model="detail_user.class" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field label="เริ่มเรียน" v-model="detail_user.time_s" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field label="เลิกเรียน" v-model="detail_user.time_e" disabled class="font-weight-bold"></v-text-field>
                                        </v-col>                                        
                                    </v-row>
                                </v-container>
                                <small>*รายละเอียดการจองของลูกค้าที่สำเร็จแล้ว</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialog_detail = false">
                                    Close
                                </v-btn>
                                <!-- <v-btn color="blue darken-1" text @click="dialog_detail = false">
                                    Save
                                </v-btn> -->
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>
        </div>


    </div>
</template>



<script>
export default {
    data: () => ({
        dialog_detail: false,
        detail_user:[],
        search_table_student: '',
        headers_student: [
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
            { text: 'Date', value: 'date' },
            { text: 'Start', value: 'time_s' },
            { text: 'End', value: 'time_e' },
            { text: 'Style', value: 'style' },
            { text: 'subject', value: 'subject' },
            { text: 'Status', value: 'status', align: 'start' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
        ],
        desserts_student: [],
        editedIndex: -1,
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

    created() {
        this.search_date_student()
    },

    methods: {
        getColor(stutus) {
            if (stutus == 'active') return 'success'
            else if (stutus == 'Not active') return 'orange'
            else return 'red'
        },

        detail_match(item) {
            this.dialog_detail = true;
            this.detail_user = item;
            console.log(item);
        },

        search_date_student() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts_student = [];
                let item = [];
                let nametea = '';
                let namestu = '';
                let phone_stu = '';
                let phone_tea = '';
                const now = new Date();
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (new Date(date).getTime().toString().substring(0, 5) >= now.getTime().toString().substring(0, 5)) {
                            const datedata = keydata[date];
                            for (const time in datedata) {
                                const timedata = datedata[time];
                                db.ref(`user/${timedata.teacher}`).on("value", (snapshot) => {
                                    const childData = snapshot.val();
                                    phone_tea = childData.mobile;
                                    nametea = "คุณครู " + childData.firstName + "  " + childData.lastName;
                                })
                                db.ref(`user/${key}`).on("value", (snapshot) => {
                                    const childData = snapshot.val();
                                    namestu = childData.firstName + "  " + childData.lastName;
                                    phone_stu = childData.studentMobile;
                                })
                                // setTimeout(() => {
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
                                        phone_teacher:phone_tea,
                                    });
                                // }, 100);
                            }
                        }

                    }

                }
                this.desserts_student = item;
            })
        },
    },
}
</script>
