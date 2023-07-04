<template>
    <div>
        <div class="container text-center">
            <v-card>
                <v-container fluid>
                    <v-row align="center">
                        <center><div style="max-width: 500px;">                            
                            <v-autocomplete  v-model="value" :items="items" dense filled
                            label="Search teacher"></v-autocomplete>                            
                        </div></center>

                        <v-col cols="12">
                            <div>
                                <div class="subheading">
                                    <h3>ตารางผู้สอน</h3>
                                </div>
                                <v-date-picker v-model="date1" :events="arrayEvents" :allowed-dates="allowedDates"
                                    show-adjacent-months event-color="green lighten-1" @input="dialog_detail = true"
                                    ></v-date-picker>
                            </div>
                        </v-col>

                        <v-col cols="12">
                            <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
                                <template v-slot:top>
                                    <v-toolbar flat>
                                        <v-toolbar-title>My CRUD</v-toolbar-title>
                                        <v-divider class="mx-4" inset vertical></v-divider>
                                        <v-spacer></v-spacer>
                                        <v-dialog v-model="dialogDelete" max-width="500px">
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
                                    <v-icon small class="mr-2" @click="editItem(item), dialog_detail=true">
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
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </div>

        <template>
            <v-row justify="center" >
                <v-dialog v-model="dialog_detail" persistent max-width="600px" >
                    <v-card class="rounded-xl">
                        <v-card-title style="background-color:rgba(32, 124, 4, 0.733)">
                            <span class="text-h8"><b>ADD Teach [{{ date1 }}]</b></span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" class="mt-5">
                                        <v-autocomplete v-model="value" :items="items" dense filled
                                            label="Search teacher"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="7">
                                        <v-text-field label="ชื่อวิชา" hint="ระบุชื่อวิชาที่สอน" persistent-hint
                                            v-model="save_detail.subject"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="5">
                                        <v-select :items="['Online', 'On-site']" label="รูปแบบการสอน"
                                            v-model="save_detail.style"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="['0-17', '18-29', '30-54', '54+']" label="เริ่มสอน"
                                            v-model="save_detail.start_time"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                            label="หยุดสอน" v-model="save_detail.stop_time"></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*การลงเวลามีผลต่อการแสดงผลฝั่งลูกค้ากรุณาใช้ความชัวในกแารลงเวลา</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog_detail = false">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="dialog_detail = false, save_detail_data()">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

    </div>
</template>
<script>
export default {
    data: () => ({
        save_detail: [],
        dialog_detail: false,
        items: [],
        value: null,
        arrayEvents: null,
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

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
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },

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
        this.initialize()
    },

    mounted() {
        // this.arrayEvents = [...Array(6)].map(() => {
        //     const day = Math.floor(Math.random() * 30)
        //     const d = new Date()
        //     d.setDate(day)
        //     console.log(d.toISOString().substr(0, 10));
        //     return d.toISOString().substr(0, 10)
        // });
        this.search_teacher();

    },

    methods: {
        save_detail_data() {
            console.log(this.value);
            console.log(this.date1);
            console.log(this.save_detail);
        },
        allowedDates: val => {
            const currentDate = new Date();
            const selectedDate = new Date(val);
            return selectedDate >= currentDate;
        },
        search_teacher() {
            let item = [];
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    // for(const status in childData[key]){
                    if (childData[key].status == 'teacher') {
                        console.log(childData[key].name);
                        item.push(childData[key].name);
                    }
                    // }
                }
                this.items = item;
            })
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
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                },
            ]
        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
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
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },

    },
}
</script>