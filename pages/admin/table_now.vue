<template>
    <div class="mt-6">
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers_student" :items="desserts_student" sort-by="date"
                    :search="search_table_student" class="elevation-1" >
                    <template v-slot:top>
                        <v-toolbar flat style="background-color:rgba(173, 28, 28, 0.425);">
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
    </div>
</template>

<script>
export default {
    data: () => ({
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
                const now = new Date();
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (now.getTime().toString().substring(0, 5) == new Date(date).getTime().toString().substring(0, 5)) {
                            const datedata = keydata[date];
                            for (const time in datedata) {
                                const timedata = datedata[time];
                                db.ref(`user/${timedata.teacher}`).on("value", (snapshot) => {
                                    const childData = snapshot.val();
                                    nametea = "คุณครู " + childData.firstName + "  " + childData.lastName;
                                })
                                db.ref(`user/${key}`).on("value", (snapshot) => {
                                    const childData = snapshot.val();
                                    namestu = childData.firstName + "  " + childData.lastName;
                                })
                                setTimeout(() => {
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
                                    });
                                }, 100);
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
