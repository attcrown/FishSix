<template>
    <div>
        <v-card class="mt-5 rounded-xxl">
            <v-data-table style="background-color: #27262B;" dark v-if="show_his" :headers="dessertHeaders"
                :items="desserts" :single-expand="singleExpand" :expanded.sync="expanded" item-key="createAt"
                sort-by="createAt" sort-desc show-expand class="elevation-10 rounded-xxl">
                <template v-slot:top>
                    <v-toolbar flat class="rounded-t-xxl" color="#EBE4DE">
                        <v-toolbar-title style="color: rgb(0, 0, 0);"><b>ประวัติแลกเปลี่ยนชั่วโมง</b></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch> -->
                    </v-toolbar>
                </template>

                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.createAt="{ item }">
                    เวลาที่บันทึก : {{ readDate(item.createAt) }}
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="m-0 p-0">
                        <table class="table" style="border: 0px solid black;">
                            <thead style="background-color:#D4C1B2;">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col" style="color: black;" class="text-center">
                                        Filp Class
                                    </th>
                                    <th scope="col" style="color: black;" class="text-center">
                                        Private class {{ headers.length }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="background-color:#D4C1B2; color:black;" class="text-center">
                                        จำนวนชั่วโมงที่มีอยู่</td>
                                    <td style="background-color:#ffffff; color:black;" class="text-center"> {{
                                        min_change(item.OldHourLeft) }} </td>
                                    <td style="background-color:#ffffff; color:black;" class="text-center"> {{
                                        min_change(item.OldPrivateHourLeft) }} </td>
                                </tr>
                                <tr>
                                    <td style="background-color:#D4C1B2; color:black;" class="text-center pt-4">
                                        จำนวนชั่วโมงที่ใช้แลกเปลี่ยน</td>
                                    <td style="background-color:#ffffff; color:black;" class="text-center">
                                        <v-chip :color="getColorForSummary(summaryFC(item))">
                                            {{ summaryFC(item) }}
                                        </v-chip>
                                    </td>
                                    <td style="background-color:#ffffff; color:black;" class="text-center">
                                        <v-chip :color="getColorForSummary(summaryPV(item))">
                                            {{ summaryPV(item) }}
                                        </v-chip>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color:#D4C1B2; color:black;" class="text-center">
                                        จำนวนชั่วโมงล่าสุด</td>
                                    <td style="background-color:#ffffff; color:black;" class="text-center"> {{
                                        min_change(item.NewHourLeft) }} </td>
                                    <td style="background-color:#ffffff; color:black;" class="text-center"> {{
                                        min_change(item.NewPrivateHourLeft) }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>

                </template>

            </v-data-table>
        </v-card>

    </div>
</template>

<style>
.fonts500 {
    font-family: 'Prompt', sans-serif;
    /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
    font-weight: 500;
}

.fonts300 {
    font-family: 'Prompt', sans-serif;
    /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
    font-weight: 300;
}
</style>

<script>
import Vue from 'vue';
export const CheckedEventBus = new Vue();
export default {
    data() {
        return {
            expanded: [],
            singleExpand: false,
            dessertHeaders: [
                {
                    text: 'ลำดับวันที่',
                    // align: 'start',
                    // sortable: true,
                    value: 'createAt',
                },

                // { text: 'Old FlipClass', value: 'OldHourLeft' },
                // { text: 'Old PrivateClass', value: 'OldPrivateHourLeft' },
                // { text: 'Exchange FlipClass', value: 'exchange_flipclass' },
                // { text: 'Exchange PrivateClass', value: 'exchange_privateclass' },
                // { text: 'New FlipClass', value: 'NewHourLeft' },
                // { text: 'New PrivateClass', value: 'NewPrivateHourLeft' },
                { text: '', value: 'data-table-expand' },
            ],
            desserts: [],
            show_his: false,
        }
    },
    created() {
        CheckedEventBus.$on('read_history', (item, callback) => {
            this.readHistory(item, callback);
        });
    },
    mounted() {
        // this.readHistory();
    },
    methods: {
        async readHistory(item, callback) {
            await this.$nextTick();
            console.log('>>>', item);
            if (item === null) {
                this.show_his = false;
                return;
            }
            this.show_his = true;
            const db = this.$fireModule.database();
            db.ref(`history_move_hour/${item}`).on("value", (snapshot) => {
                let items = [];
                let item_one = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    let id = { idkey: key };
                    item_one = { ...childData[key], ...id };
                    items.push(item_one);
                }
                this.desserts = items;
                callback(items);
            })

        },
        readDate(item) {
            let sum_date = new Date(item).toString().split(" ");
            let sumx_date = `${sum_date[1]} ${sum_date[2]} ${sum_date[3]} ${sum_date[4]}`
            return sumx_date;
        },
        summaryFC(item) {
            let sum = parseInt(item.exchange_flipclass) + parseInt(item.NewHourLeft)
            if (sum === parseInt(item.OldHourLeft)) {
                return `-${item.exchange_flipclass}`;
            } else {
                return `+${item.exchange_flipclass}`;
            }
        },
        summaryPV(item) {
            let sum = parseInt(item.exchange_privateclass) + parseInt(item.NewPrivateHourLeft)
            if (sum === parseInt(item.OldPrivateHourLeft)) {
                return `-${item.exchange_privateclass}`;
            } else {
                return `+${item.exchange_privateclass}`;
            }
        },
        getColorForSummary(item) {
            return parseInt(item) >= 0 ? '#29CC39' : '#AD382F';
        },
        min_change(item) {
            const numberString = item.toString();
            const integerPart0 = parseFloat(numberString.split('.')[0]);
            const integerPart = parseFloat(numberString.split('.')[1]);
            let sum = 0;
            if(integerPart){
                sum = integerPart * 60 / 100;
            }
            return `${integerPart0}.${sum}`;
        }
    },
}
</script>