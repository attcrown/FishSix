<template>
    <div>
        <loaderVue v-if="isLoading"></loaderVue>
        <div>
            <v-card flat class="elevation-16 rounded-xl p-4" style="background-color:#EBE4DE">
                <div class="d-flex align-center">
                    <v-autocomplete style="max-width: 300px;" :items="nameTea" label="ค้นหาชื่อครู"></v-autocomplete>
                    <v-spacer></v-spacer>
                    <v-btn elevation="10" color="#322E2B" style="color:white" rounded>ค้นหาข้อมูล<span
                            class="mdi mdi-magnify text-h6"></span></v-btn>
                </div>
            </v-card>
        </div>

        <div>
            <v-container>
                <v-row justify="center">
                    <v-col v-for="n in 25" :key="n" cols="auto">

                        <v-card class="mx-auto my-3" max-width="310">
                            <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                            <v-card-title>ณิชาพัฒน์ วรวัฒน์ชัยกุล</v-card-title>

                            <v-card-text>
                                <v-row align="center" class="mx-0">
                                    <v-rating :value="4" color="amber" dense half-increments readonly size="14"
                                        length="4"></v-rating>

                                    <div class="grey--text">
                                        Type & Tier 4 (413)
                                    </div>
                                </v-row>

                                <div class="my-1 mt-5">
                                    วิชาที่สอน
                                </div>

                                <div>
                                    คณิตศาสตร์ ม.ต้น , คณิตศาสตร์ ม.ปลาย , วิทยาศาสตร์ ม.ต้น
                                </div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green lighten-1" text @click="sheet = !sheet">
                                    Detail
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div>
            <v-bottom-sheet v-model="sheet" persistent>
                <v-sheet class="text-start image-container" height="100%">
                    <v-responsive class="overflow-y-auto" max-height="800">
                        <div class="text-end">
                            <v-btn class="mt-3 me-3 mb-6" color="red" @click="sheet = !sheet, e1 = 1">
                                close
                            </v-btn>
                        </div>
                        <v-row justify="center">
                            <v-col cols="auto">
                                <v-card width="350" class="rounded-xxl" style="background-color:#EBE4DE">
                                    <center>
                                        <div>
                                            <v-avatar size="200" class="mt-3">
                                                <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                                            </v-avatar>
                                        </div>
                                    </center>

                                    <v-divider class="mx-2" color="black"></v-divider>
                                    <div class="text-center">
                                        <p style="font-size:20px"><b>ณิชาพัฒน์ วรวัฒน์ชัยกุล</b></p>
                                        <p style="margin-top:-18px">อาชีพปัจจุบัน : นักศึกษา</p>

                                        <v-rating :value="4" color="warning" dense half-increments readonly size="14"
                                            length="4" style="margin-top:-10px"></v-rating>

                                        <div class="grey--text">
                                            Type & Tier 4
                                        </div>
                                    </div>
                                    <v-divider class="mx-2" color="black"></v-divider>
                                    <div class="ms-3 pb-1 text-start">
                                        <p>ชื่อเล่น</p>
                                        <p style="font-size:20px; margin-top:-15px"><b>เพลิน</b></p>
                                        <p>เพศ</p>
                                        <p style="font-size:20px; margin-top:-15px"><b>หญิง</b></p>
                                        <p>E-mail</p>
                                        <p style="font-size:20px; margin-top:-15px"><b>Test@gmail.com</b></p>
                                    </div>
                                    <!-- <v-divider class="mx-2" color="black"></v-divider>                                     -->
                                </v-card>
                            </v-col>
                            <v-col cols="auto">
                                <v-card width="350" class="rounded-xxl" style="background-color:#EBE4DE">
                                    <center>
                                        <div class="ms-3 pt-3 pb-1 text-start">
                                            <p><b>วิชาที่สอน</b></p>
                                            <p style="font-size:16px; margin-top:-10px" v-for="n in 18" :key="n">
                                                {{ n }}. คณิตศาสตร์ ม.ต้น
                                            </p>
                                        </div>
                                    </center>
                                </v-card>
                            </v-col>

                            <v-col cols="auto">
                                <v-stepper v-model="e1" non-linear class="rounded-xxl" style="background-color:#EBE4DE">
                                    <v-stepper-header>
                                        <v-stepper-step editable step="1">
                                            รายละเอียด
                                        </v-stepper-step>

                                        <v-divider></v-divider>

                                        <v-stepper-step editable step="2">
                                            รีวิว
                                        </v-stepper-step>

                                    </v-stepper-header>

                                    <v-stepper-items>
                                        <v-stepper-content step="1">
                                            <v-card class="pb-5" style="background-color:#EBE4DE">
                                                <h4>การศึกษา</h4>
                                                <p>TestDsssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                                <h4>ประสบการสอน</h4>
                                                <p>สอนมาแล้ว 3ปี</p>
                                                <h4>สไตล์การสอน</h4>
                                                <p>ใจดี</p>
                                                <h4>สไตล์การสอน</h4>
                                                <p>ใจดี</p>
                                                <h4>สไตล์การสอน</h4>
                                                <p>ใจดี</p>
                                            </v-card>
                                            <div class="text-center mt-3">
                                                <v-btn color="primary" @click="e1 = 2" rounded>
                                                    Next
                                                </v-btn>
                                            </div>                                            
                                        </v-stepper-content>

                                        <v-stepper-content step="2">
                                            <div>
                                                <v-data-table :headers="headers" sort-by="date" :items="desserts"
                                                    :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer
                                                    class="elevation-1" @page-count="pageCount = $event"
                                                    style="background-color:#EBE4DE">
                                                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                                                    <template v-slot:item.detail="{ item }">
                                                        <v-icon small class="mr-2 text-h6" @click="show_detail(item)">
                                                            mdi-account-details-outline
                                                        </v-icon>
                                                    </template>

                                                </v-data-table>
                                                <div class="text-center pt-2">
                                                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                                                    <!-- <v-text-field :value="itemsPerPage" label="Items per page" type="number"
                                                        min="-1" max="15"
                                                        @input="itemsPerPage = parseInt($event, 10)"></v-text-field> -->
                                                </div>
                                            </div>
                                            <div class="text-center mt-3">
                                                <v-btn color="primary" @click="e1 = 1" rounded>
                                                    Back
                                                </v-btn>
                                            </div> 
                                        </v-stepper-content>

                                    </v-stepper-items>
                                </v-stepper>
                            </v-col>
                            <div style="margin:100px"></div>

                        </v-row>
                    </v-responsive>
                </v-sheet>
            </v-bottom-sheet>
        </div>

        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title>
                    <h5>รีวิว</h5>
                </v-card-title>
                <v-card-text>
                    ครูสอนดีมากเลย งุงิๆ
                    <p>{{ dialogData }}</p>
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
import loaderVue from '~/components/loader.vue';
export default {
    inject: {
        theme: {
            default: { isDark: false },
        },
    },
    data() {
        return {
            dialogData: '',
            dialog: false,
            isLoading: false,
            property: 'value',
            nameTea: ['att', 'attt', 'atttt'],
            sheet: false,

            selection: 1,

            e1: 1,

            page: 1,
            pageCount: 0,
            itemsPerPage: 8,
            headers: [
                {
                    text: 'วันที่สอน',
                    align: 'start',
                    value: 'date',
                },
                { text: 'วิชาที่สอน', value: 'calories', align: 'center' },
                { text: 'นักเรียน', value: 'fat', align: 'center' },
                { text: 'รายละเอียด', value: 'detail', align: 'center', sortable: false, },
            ],
            desserts: [
                {
                    date: '10-10-2023',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: 1,
                },
                {
                    date: '09-10-2023',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: 1,
                },
                {
                    date: '08-10-2023',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: 7,
                },
                {
                    date: '07-10-2023',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: 8,
                },
                {
                    date: '07-10-2023',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: 16,
                },
                {
                    date: '05-10-2023',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: 0,
                },
                {
                    date: '04-10-2023',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: 2,
                },
                {
                    date: '04-10-2023',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: 45,
                },
                {
                    date: '10-10-2023',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: 22,
                },
                {
                    date: '10-10-2023',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: 6,
                },
            ],
        };
    },
    watch: {
    },
    computed: {

    },
    components: {
        loaderVue
    },
    methods: {
        show_detail(item) {
            this.dialog = true;
            this.dialogData = item;
            console.log(item);
        }
    },
}
</script>
<style>
.image-container {
    background-image: url("~/assets/loginBG.png");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
}
</style>