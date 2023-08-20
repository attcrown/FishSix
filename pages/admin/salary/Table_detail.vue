<template>
    <div>
        <template>
            <v-row>
                <v-col cols="12" md="2">
                    <v-autocomplete v-model="value_tea" :items="value_tea_all" item-text="name" item-value="key"
                        label="เลือกครู" @change="arrayEvent_search()"></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2">
                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="ค้นหาแบบวัน" prepend-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable :max="date_now" :events="arrayEvents" event-color="green lighten-1">
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
                        <v-date-picker v-model="date_month" type="month" no-title scrollable :max="date_now">
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
                    <v-btn :disabled="value_tea == null || (date_month == null && date == null && date_year == null)"
                        @click="search_data_money()">
                        ค้นหา
                    </v-btn>
                </v-col>
            </v-row>
        </template>

        <v-expansion-panels v-model="panel" multiple class="mt-8">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(teacherData, index) in groupedTeachers"
                :key="index">
                <v-expansion-panel-header style="font-size:20px;"><b>{{ teacherData[0].name
                }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">วันที่</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ชั่วโมงสอน</th>
                                <th class="p-2">รายได้</th>
                                <th class="p-2 text-center">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in teacherData" :key="item.send_plan.key">
                                <td class="p-2">{{ item.send_plan.date_learn }}</td>
                                <td class="p-2">{{ item.send_plan.money.subject.name }}</td>
                                <td class="p-2">{{ item.send_plan.level }}</td>
                                <td class="p-2">{{ item.datematchData.start }}</td>
                                <td class="p-2">{{ item.datematchData.stop }}</td>
                                <td class="p-2">{{ item.send_plan.hour }} Hr.</td>
                                <td class="p-2">{{ item.send_plan.money.sum_money }}฿</td>
                                <td class="p-2 text-center">
                                    <v-btn text icon elevation="5"
                                        @click="detail_send(item.send_plan, item.send_plan.hour)">
                                        <span class="mdi mdi-cash-register text-h5"></span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <h6>รวม {{ calculateTotalIncome(teacherData) }} บาท</h6>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title style="font-size:24px">
                    รายละเอียด
                </v-card-title>
                <v-card-text>
                    <v-row v-if="detailData">
                        <v-col cols="7" style="margin-top: 10px">
                            <v-subheader style="font-size:16px">{{ detailData.money.subject.name }}</v-subheader>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field readonly label="Amount" :value="detailData.money.subject.bath"
                                prefix="฿"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px">{{ detailData.money.level.name }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px">
                            <v-text-field readonly label="Amount" :value="detailData.money.level.bath"
                                prefix="฿"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px">{{ detailData.money.location.name }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px">
                            <v-text-field readonly label="Amount" :value="detailData.money.location.bath"
                                prefix="฿"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px">{{ detailData.money.sheet.name }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px">
                            <v-text-field readonly label="Amount" :value="detailData.money.sheet.bath"
                                prefix="฿"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px" v-if="detailData.money.optional">
                            <v-subheader style="font-size:16px">{{ detailData.money.optional.name }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px" v-if="detailData.money.optional">
                            <v-text-field readonly label="Amount" :value="detailData.money.optional.bath"
                                prefix="฿"></v-text-field>
                        </v-col>

                        <v-col cols="7" v-if="detailData.money.location.name.substring(0, 4) == 'Flip'"
                            style="margin-top:-20px">
                            <v-subheader style="font-size:16px">Type & Tire {{ detailData.money.typeflip.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" v-if="detailData.money.location.name.substring(0, 4) == 'Flip'"
                            style="margin-top:-30px">
                            <v-text-field readonly label="Amount" :value="detailData.money.typeflip.bath"
                                prefix="฿"></v-text-field>
                        </v-col>

                        <v-col cols="7" v-if="detailData.money.location.name.substring(0, 4) != 'Flip'"
                            style="margin-top:-20px">
                            <v-subheader style="font-size:16px">Type & Tire {{ detailData.money.typeprivate.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" v-if="detailData.money.location.name.substring(0, 4) != 'Flip'"
                            style="margin-top:-30px">
                            <v-text-field readonly label="Amount" :value="detailData.money.typeprivate.bath"
                                prefix="฿"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px">ชั่วโมงสอน</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px">
                            <v-text-field readonly label="Amount" :value="detailHour" prefix="Hr."></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px">รวมทั้งหมด</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px">
                            <v-text-field readonly label="Amount" :value="detailData.money.sum_money"
                                prefix="฿"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
export default {
    data: () => ({
        arrayEvents: [],

        detailHour: null,
        detailData: null,
        dialog: false,
        panel: [],
        date_now: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: null,
        modal: false,
        value_tea: null,
        value_tea_all: [],

        date_month: null,
        date_year: null,
        menu: false,
        modal1: false,
        items_year: [],

        data_all: [],
    }),
    mounted() {
        this.search_tea();
        this.year_gen();
    },
    computed: {
        groupedTeachers() {
            return this.data_all.reduce((acc, item) => {
                const existingGroup = acc.find(group => group[0].name === item.name);
                if (existingGroup) {
                    existingGroup.push(item);
                } else {
                    acc.push([item]);
                }
                return acc;
            }, []);
        },
    },
    methods: {
        arrayEvent_search() {
            const db = this.$fireModule.database();
            if (this.value_tea != '00000') {
                db.ref(`date_match/`).on("value", (snapshot) => {
                    this.arrayEvents = [];
                    const childData = snapshot.val();
                    for (const key in childData) {
                        const date = childData[key]
                        for (const day in date) {
                            const time = date[day];
                            for (const data_all in time) {
                                if (time[data_all].status == "พร้อมเรียน" && time[data_all].Idsendplan != undefined && time[data_all].teacher == this.value_tea) {
                                    this.arrayEvents.push(day);
                                    console.log(this.arrayEvents);
                                }
                            }
                        }
                    }

                })
            } else {
                db.ref(`date_match/`).on("value", (snapshot) => {
                    this.arrayEvents = [];
                    const childData = snapshot.val();
                    for (const key in childData) {
                        const date = childData[key]
                        for (const day in date) {
                            const time = date[day];
                            for (const data_all in time) {
                                if (time[data_all].status == "พร้อมเรียน" && time[data_all].Idsendplan != undefined) {
                                    this.arrayEvents.push(day);
                                    console.log(this.arrayEvents);
                                }
                            }
                        }
                    }

                })
            }

        },
        calculateTotalIncome(teacherData) {
            let totalIncome = 0;
            for (const item of teacherData) {
                totalIncome += item.send_plan.money.sum_money;
            }
            return totalIncome;
        },
        year_gen() {
            let year = 2021;
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
            let tea = "";
            let day_search_start = null;
            let day_search_end = null;
            if (this.value_tea == '00000') {
                tea = "";
            } else {
                tea = this.value_tea;
            }
            if (this.date) {
                day_search_start = new Date(`${this.date}`).getTime();
                day_search_end = new Date(`${this.date}`).getTime();
            } else if (this.date_month) {
                let month = parseInt(this.date_month.substring(5, 7)) + 1;
                day_search_start = new Date(this.date_month).getTime();
                if (month > 12) {
                    day_search_end = new Date(parseInt(this.date_month.substring(0, 4)) + 1 + "-" + 1).getTime();
                } else {
                    day_search_end = new Date(this.date_month.substring(0, 5) + month).getTime();
                }
            } else if (this.date_year) {
                let year = parseInt(this.date_year) + 1;
                day_search_start = new Date(parseInt(this.date_year) - 1 + '-12').getTime();
                day_search_end = new Date(year + '-1').getTime();
            } else {
                alert('Error');
            }
            const db = this.$fireModule.database();
            if (tea == "") {
                db.ref(`send_plan/${tea}`).once("value", (snapshot) => {
                    let item = [];
                    const childData = snapshot.val();
                    for (const key in childData) {
                        const data_all = childData[key];
                        for (const data in data_all) {
                            console.log(new Date(data_all[data].date_learn).getTime(), day_search_start, day_search_end);
                            if (data_all[data].status_development == 'Approved' && new Date(data_all[data].date_learn).getTime() >= day_search_start && new Date(data_all[data].date_learn).getTime() <= day_search_end) {
                                console.log(data_all[data]);
                                const getTeacherPromise = db.ref(`user/${key}`).once("value");
                                const getStudentPromise = db.ref(`user/${data_all[data].keystudent}`).once("value");
                                const getDateMatchPromise = db.ref(`date_match/${data_all[data].keystudent}/${data_all[data].date_learn}/${data_all[data].time_learn}`).once("value");
                                Promise.all([getTeacherPromise, getStudentPromise, getDateMatchPromise])
                                    .then((snapshots) => {
                                        const teacherSnapshot = snapshots[0];
                                        const studentSnapshot = snapshots[1];
                                        const dateMatchSnapshot = snapshots[2];

                                        const teacherData = teacherSnapshot.val();
                                        const studentData = studentSnapshot.val();
                                        const datematchData = dateMatchSnapshot.val();

                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all[data],
                                            IdKey: data,
                                        })
                                    })
                            }
                        }
                    }
                    this.data_all = item;
                    console.log(this.data_all);
                })
            } else {
                db.ref(`send_plan/${tea}`).once("value", (snapshot) => {
                    let item = [];
                    const data_all = snapshot.val();
                    for (const data in data_all) {
                        console.log(new Date(data_all[data].date_learn).getTime(), day_search_start, day_search_end);
                        if (data_all[data].status_development == 'Approved' && new Date(data_all[data].date_learn).getTime() >= day_search_start && new Date(data_all[data].date_learn).getTime() <= day_search_end) {
                            console.log(data_all[data]);
                            const getTeacherPromise = db.ref(`user/${tea}`).once("value");
                            const getStudentPromise = db.ref(`user/${data_all[data].keystudent}`).once("value");
                            const getDateMatchPromise = db.ref(`date_match/${data_all[data].keystudent}/${data_all[data].date_learn}/${data_all[data].time_learn}`).once("value");
                            Promise.all([getTeacherPromise, getStudentPromise, getDateMatchPromise])
                                .then((snapshots) => {
                                    const teacherSnapshot = snapshots[0];
                                    const studentSnapshot = snapshots[1];
                                    const dateMatchSnapshot = snapshots[2];

                                    const teacherData = teacherSnapshot.val();
                                    const studentData = studentSnapshot.val();
                                    const datematchData = dateMatchSnapshot.val();

                                    item.push({
                                        name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                        teacherData: teacherData,
                                        studentData: studentData,
                                        datematchData: datematchData,
                                        send_plan: data_all[data],
                                        IdKey: data,
                                    })
                                })
                        }
                    }
                    this.data_all = item;
                    console.log(this.data_all);
                })
            }

        },
        detail_send(item, hour) {
            this.detailData = item;
            let min = hour.toString().split(".");
            let min_s = null;
            if (min.length > 1) {
                min_s = (parseFloat("0." + min[1]) * 60 / 100);
                this.detailHour = parseFloat(min[0]) + parseFloat(min_s);
            } else {
                this.detailHour = hour;
            }
            console.log(min, min_s);
            console.log(this.detailData, this.detailHour);
            this.dialog = true;
        },
    },
}
</script>