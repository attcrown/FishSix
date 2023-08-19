<template>
    <div>
        <template>
            <v-row>
                <v-col cols="12" md="2">
                    <v-autocomplete v-model="value_tea" :items="value_tea_all" item-text="name" item-value="key"
                        label="เลือกครู"></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2">
                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="ค้นหาแบบวัน" prepend-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary"
                                @click="$refs.dialog.save(date), date_month = null, date_year = null">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>
                <v-col cols="12" md="2">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date_month"
                        transition="scale-transition" offset-y max-width="290px" min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date_month" label="ค้นหาแบบเดือน" prepend-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date_month" type="month" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date_month), date = null, date_year = null">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select v-model="date_year" :items="items_year" label="ค้นหาแบบปี" prepend-icon="mdi-calendar"
                        @change="date = null, date_month = null"></v-select>
                </v-col>
                <v-col cols="12" md="2">
                    <v-btn :disabled="value_tea == null || (date_month == null && date == null && date_year == null)">
                        ค้นหา
                    </v-btn>
                </v-col>
            </v-row>
        </template>
    </div>
</template>
<script>
export default {
    data: () => ({
        date: null,
        modal: false,
        value_tea: null,
        value_tea_all: [],

        date_month: null,
        date_year: null,
        menu: false,
        modal1: false,
        items_year: [],
    }),
    mounted() {
        this.search_tea();
        this.year_gen();
    },
    methods: {
        year_gen() {
            let year = 2023;
            let new_year = parseInt(new Date().toISOString().substr(0, 4));
            let item = [];
            while (year < (new_year + 10)) {
                item.push(year.toString());
                year++;
            }
            this.items_year = item;
        },
        search_tea() {
            const db = this.$fireModule.database();
            db.ref(`user/`).once("value", (snapshot) => {
                let item = [{ key: '00000', name: 'ทั้งหมด' }];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'teacher') {
                        item.push({ key: key, name: childData[key].teacherId + ' ' + childData[key].nickname + ' ' + childData[key].firstName })
                    }
                }
                console.log(item);
                this.value_tea_all = item;
            })
        },
        search_data_money() {
            const db = this.$fireModule.database();
            db.ref(`user/`).once("value", (snapshot) => {

            })
        }
    },
}
</script>