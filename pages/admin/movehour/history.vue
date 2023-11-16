<template>
    <div>
        <v-card class="mt-5 rounded-xxl">
            <v-data-table v-if="show_his" :headers="dessertHeaders" :items="desserts" :single-expand="singleExpand"
                :expanded.sync="expanded" item-key="createAt" sort-by="createAt" sort-desc show-expand
                class="elevation-10 rounded-xxl">
                <template v-slot:top>
                    <v-toolbar flat class="rounded-t-xxl" color="#EBE4DE">
                        <v-toolbar-title style="color: rgb(0, 0, 0);"><b>ประวัติแลกเปลี่ยนชั่วโมง</b></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch> -->
                    </v-toolbar>
                </template>

                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.createAt="{ item }">
                    {{ readDate(item.createAt) }}
                </template>

                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.OldHourLeft="{ item }">
                    {{ min_change(item.OldHourLeft) }}
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.OldPrivateHourLeft="{ item }">
                    {{ min_change(item.OldPrivateHourLeft) }}
                </template>

                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.exchange_flipclass="{ item }">
                    <v-chip :color="getColorForSummary(summaryFC(item))" text-color="white">
                        {{ summaryFC(item) }}
                    </v-chip>
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.exchange_privateclass="{ item }">
                    <v-chip :color="getColorForSummary(summaryPV(item))" text-color="white">
                        {{ summaryPV(item) }}
                    </v-chip>
                </template>

                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.NewHourLeft="{ item }">
                    {{ min_change(item.NewHourLeft) }}
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.NewPrivateHourLeft="{ item }">
                    {{ min_change(item.NewPrivateHourLeft) }}
                </template>

                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        {{ item.Rate_hour.name }} Filp Class {{ item.Rate_hour.flipclass }} ชั่วโมง = Private {{ item.Rate_hour.privateclass }} ชั่วโมง
                    </td>
                </template>

            </v-data-table>
        </v-card>

    </div>
</template>

<style>
.v-data-table-header th {
    background-color: #D4C1B2;
    /* เปลี่ยนเป็นสีที่คุณต้องการ */
}

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
            singleExpand: true,
            dessertHeaders: [
                {
                    text: 'เวลาที่บันทึก',
                    align: 'start',
                    sortable: true,
                    value: 'createAt',
                },

                { text: 'จำนวนชั่วโมง Filp Class เก่า', align: 'center', value: 'OldHourLeft' },
                { text: 'จำนวนชั่วโมง Private class เก่า', align: 'center', value: 'OldPrivateHourLeft' },
                { text: 'จำนวนชั่วโมง Filp Class ที่ใช้แลกเปลี่ยน', align: 'center', value: 'exchange_flipclass' },
                { text: 'จำนวนชั่วโมง Private class ที่ใช้แลกเปลี่ยน', align: 'center', value: 'exchange_privateclass' },
                { text: 'จำนวนชั่วโมง Filpclass ล่าสุด', align: 'center', value: 'NewHourLeft' },
                { text: 'จำนวนชั่วโมง Private class ล่าสุด', align: 'center', value: 'NewPrivateHourLeft' },
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
            if (integerPart) {
                sum = integerPart * 60 / 100;
            }
            return `${integerPart0}.${sum}`;
        }
    },
}
</script>