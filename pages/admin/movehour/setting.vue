<template>
    <div>
        <div>
            <v-dialog v-model="dialog" max-width="1000">
                <template v-slot:activator="{ on, attrs }">
                    <div class="d-flex justify-space-between align-center mt-5">
                        <p class="pt-3" style="font-size:32px"><b>แลกเปลี่ยนชั่วโมง</b></p>
                        <v-btn v-if="status != 'user'" color="black" dark v-bind="attrs" v-on="on" class="rounded-xl">
                            Setting <v-icon class="ms-3">mdi-cog</v-icon>
                        </v-btn>
                    </div>                    
                </template>

                <v-card class="rounded-xxl">
                    <v-card-title class="grey lighten-2">
                        <p style="font-size:24px">Setting การแลกเปลี่ยนชั่วโมง</p> 
                        <v-spacer></v-spacer>
                        <v-btn color="error" class="mr-4" @click="dialog = false">
                            Close
                        </v-btn>
                    </v-card-title>

                    <!-- <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="data_all.name" :rules="nameRules" label="Name" required></v-text-field>
                        <v-text-field v-model="data_all.flipclass" :rules="nameRules" label="FlipClass" type="number"
                            required></v-text-field>
                        <v-text-field v-model="data_all.privateclass" :rules="nameRules" label="PrivateClass" type="number"
                            required></v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider> 

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                        save
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="resst">
                        Close
                    </v-btn>
                </v-card-actions> -->

                    <v-card-text>
                        <v-card class="mt-5">
                            <v-card-title>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                                    hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table :headers="headers" :items="desserts" :search="search">
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.action="{ item }">
                                    <v-btn v-if="!modetable" @click="checkitem(item)">edit</v-btn>
                                    <v-btn v-if="modetable" @click="checkitem(item)" :disabled="!item.flipclass || !item.privateclass">save</v-btn>
                                </template>
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <!-- <template v-slot:item.status="{ item }">                                
                                <v-switch :readonly="!modetable" v-model="item.status"></v-switch>
                            </template> -->

                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <!-- <template v-slot:header.date> 
                                TESTDDD                                                                                 
                            </template> -->

                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.createAt="{ item }">
                                    {{ mapDate(item.createAt) }}
                                </template>
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.name="{ item }">
                                    <div v-if="!modetable">
                                        {{ item.name }}
                                    </div>
                                    <div v-if="modetable">
                                        <v-text-field v-model="item.name" label="ชื่อเกณฑ์"></v-text-field>
                                    </div>
                                </template>
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.flipclass="{ item }">
                                    <div v-if="!modetable">
                                        {{ item.flipclass }}
                                    </div>
                                    <div v-if="modetable">
                                        <v-text-field v-model="item.flipclass" label="ชั่วโมง FC"
                                            type="number" :rules="[v => !!v || 'กรุณาใส่จำนวนเต็ม',
                                                v => !/\./.test(v) || 'กรุณาใส่จำนวนเต็ม']"></v-text-field>
                                    </div>
                                </template>
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.privateclass="{ item }">
                                    <div v-if="!modetable">
                                        {{ item.privateclass }}
                                    </div>
                                    <div v-if="modetable">
                                        <v-text-field v-model="item.privateclass" label="ชั่วโมง PV"
                                            type="number" :rules="[v => !!v || 'กรุณาใส่จำนวนเต็ม' ,
                                                v => !/\./.test(v) || 'กรุณาใส่จำนวนเต็ม']"></v-text-field>
                                    </div>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { Timestamp } from "firebase/firestore";
export default {
    data() {
        return {
            data_all: [],
            dialog: false,
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 50) || 'Name must be less than 10 characters',
            ],

            //-----table---------
            search: '',
            headers: [
                { text: 'วันที่บันทึก', align: 'start', sortable: true, value: 'createAt' },
                { text: 'ชื่อ', value: 'name', align: 'center' },
                { text: 'FlipClass', value: 'flipclass', align: 'center' },
                { text: 'PrivateClass', value: 'privateclass', align: 'center' },
                // { text: 'Status', value: 'status', align: 'center' },
                { text: 'Edit', value: 'action', align: 'center' },
            ],
            desserts: [],

            modetable: false,
        };
    },
    computed: {
        ...mapState(['firstName', 'status']),
    },
    mounted() {
        this.searchData();
    },
    methods: {
        validate() {
            this.$refs.form.validate()
            if (this.$refs.form.validate()) {
                this.savesetting();
            }
        },
        reset() {
            this.$refs.form.reset()
            this.dialog = false;
        },
        checkitem(item) {
            console.log(item);
            if (this.modetable) {
                this.modetable = false;
                const db = this.$fireModule.database();
                db.ref(`setting_moveHour/${item.key}`).update({
                    name: item.name,
                    flipclass: item.flipclass,
                    privateclass: item.privateclass,
                    createAt: this.timefirebase(),
                    status: item.status,
                }).then(() => {
                    console.log('Update Success');
                })
            } else {
                this.modetable = true;
            }
        },
        mapDate(item) {
            let sumx_date = "-";
            let sum_date = new Date(item).toString().split(" ");
            sumx_date = `${sum_date[1]} ${sum_date[2]} ${sum_date[3]} ${sum_date[4]}`
            return sumx_date;
        },
        savesetting() {
            console.log('>>>>', this.data_all);
            const db = this.$fireModule.database();
            db.ref(`setting_moveHour/`).push({
                name: this.data_all.name,
                flipclass: this.data_all.flipclass,
                privateclass: this.data_all.privateclass,
                createAt: this.timefirebase(),
                status: false,
            }).then(() => {
                console.log('Save Success');
            })
        },
        async searchData() {
            await this.$nextTick();
            const db = this.$fireModule.database();
            db.ref(`setting_moveHour/`).on("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    let id = { key: key };
                    let items = { ...childData[key], ...id };
                    item.push(items);
                }
                this.desserts = item;
            })
        },
        timefirebase() {
            const timestamp = Timestamp.fromDate(new Date());
            const jsDate = timestamp.toDate();
            const isoString = jsDate.toISOString();
            let createdAte = isoString;
            return createdAte;
        },
    },
}
</script>