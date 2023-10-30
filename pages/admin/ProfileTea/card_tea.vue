<template>
    <div>
        <loaderVue v-if="isLoading"></loaderVue>
        <div>
            <v-card flat class="elevation-16 rounded-xl p-4" style="background-color:#EBE4DE">
                <div class="d-flex align-center">
                    <v-autocomplete v-if="data_search_tea" style="max-width: 300px;" :items="data_search_tea"
                        item-text="name" item-value="key" v-model="input_search_tea" label="ค้นหาชื่อครู"></v-autocomplete>
                    <v-spacer></v-spacer>
                    <v-btn elevation="10" color="#322E2B" style="color:white" :disabled="isload_search" rounded
                        @click="isload_search = true, filteredDesserts()">ค้นหาข้อมูล<span
                            class="mdi mdi-magnify text-h6"></span></v-btn>
                </div>
            </v-card>
        </div>

        <div>
            <v-container>
                <v-row justify="center" v-if="data_tea_copy">
                    <v-col v-for="(items, index) in data_tea_copy" :key="index" cols="auto">

                        <v-card class="mx-auto my-3" max-width="310">
                            <v-img v-if="items.profilePic" height="250" :src="items.profilePic"></v-img>
                            <v-img v-if="!items.profilePic" height="250" class="text-center">
                                <v-icon style=" font-size: 270px;" color="grey">
                                    mdi-account-circle
                                </v-icon>
                            </v-img>

                            <v-card-title>{{ items.firstName }} {{ items.lastName }}</v-card-title>

                            <v-card-text>
                                <v-row align="center" class="mx-0">
                                    <v-rating :value="checkType(items)" color="amber" dense half-increments readonly
                                        size="14" length="4"></v-rating>

                                    <div class="grey--text">
                                        Type & Tier {{ checkType(items) }}
                                    </div>
                                </v-row>

                                <div class="my-1 mt-5">
                                    วิชาที่สอน
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-icon v-on="on">
                                                mdi-help-circle-outline
                                            </v-icon>
                                        </template>
                                        <p></p>
                                        <p v-if="!items.subject_all"> ไม่ระบุ </p>
                                        <p style="font-size:16px; margin-top:-10px"
                                            v-for="(subject, index_sub) in items.subject_all" :key="index_sub">
                                            {{ check_subject(index_sub) || 'ไม่มีข้อมูล' }}
                                        </p>
                                    </v-tooltip>
                                </div>

                                <!-- <div>
                                    คณิตศาสตร์ ม.ต้น , คณิตศาสตร์ ม.ปลาย , วิทยาศาสตร์ ม.ต้น
                                </div> -->


                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green lighten-1" text @click="sheet = !sheet, details(items, index)">
                                    Detail
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                    </v-col>
                </v-row>
                <!-- <v-row justify="center" class="my-4">
                    <v-pagination v-model="page" :length="totalPages"></v-pagination>
                </v-row> -->
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
                                                <v-img v-if="detail_item.profilePic" height="250"
                                                    :src="detail_item.profilePic"></v-img>
                                                <v-img v-if="!detail_item.profilePic" height="250" class="text-center">
                                                    <v-icon style=" font-size: 270px;" color="grey">
                                                        mdi-account-circle
                                                    </v-icon>
                                                </v-img>
                                            </v-avatar>
                                        </div>
                                    </center>

                                    <v-divider class="mx-2" color="black"></v-divider>
                                    <div class="text-center">
                                        <p style="font-size:20px"><b>{{ detail_item.firstName }} {{ detail_item.lastName
                                        }}</b></p>
                                        <p style="margin-top:-18px">อาชีพปัจจุบัน : {{ detail_item.currJob || 'ไม่ระบุ'
                                        }}
                                        </p>

                                        <v-rating :value="checkType(detail_item)" color="warning" dense half-increments
                                            readonly size="14" length="4" style="margin-top:-10px"></v-rating>

                                        <div class="grey--text">
                                            Type & Tier {{ checkType(detail_item) }}
                                        </div>
                                    </div>
                                    <v-divider class="mx-2" color="black"></v-divider>
                                    <div class="ms-3 pb-1 text-start">
                                        <p>ชื่อเล่น</p>
                                        <p style="font-size:20px; margin-top:-15px"><b>{{ detail_item.nickname ||
                                            'ไม่ระบุ' }}</b></p>
                                        <p>เพศ</p>
                                        <p style="font-size:20px; margin-top:-15px"><b>{{ detail_item.gender ||
                                            'ไม่ระบุ' }}</b></p>
                                        <p>E-mail</p>
                                        <p style="font-size:20px; margin-top:-15px"><b>{{ detail_item.email ||
                                            'ไม่ระบุ' }}</b></p>
                                    </div>
                                    <!-- <v-divider class="mx-2" color="black"></v-divider>                                     -->
                                </v-card>
                            </v-col>

                            <v-col cols="auto">
                                <v-stepper width="800" height="603" v-model="e1" non-linear class="rounded-xxl"
                                    style="background-color:#EBE4DE">
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
                        
                            <v-col cols="auto">
                                <v-card width="350" class="rounded-xxl" style="background-color:#EBE4DE">
                                    <center>
                                        <div class="ms-3 pt-3 pb-1 text-start">
                                            <p><b>วิชาที่สอน</b></p>
                                            <p style="font-size:16px; margin-top:-10px" v-if="!detail_item.subject_all">
                                                ไม่ระบุ
                                            </p>
                                            <p style="font-size:16px; margin-top:-10px"
                                                v-for="(subject, index_sub) in detail_item.subject_all" :key="index_sub">
                                                {{ check_subject(index_sub) || 'ไม่มีข้อมูล' }}
                                            </p>
                                        </div>
                                    </center>
                                </v-card>
                            </v-col>
                            <v-col cols="auto">
                                <v-card width="800" class="rounded-xxl" style="background-color:#EBE4DE">
                                    <center>
                                        <div class="ms-3 pt-3 pb-1 text-start">
                                            <p><b>สถานที่สอน</b></p>
                                            <p style="font-size:16px; margin-top:-10px" v-for="n in 4" :key="n">
                                                {{ n }}. Flip Class Online
                                            </p>
                                        </div>
                                    </center>
                                </v-card>
                            </v-col>
                            <div style="margin:100px; background-color:rgb(165, 164, 164)" class="text-center">FISHSIX</div>
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
            type_tier: [],
            type_tier_private: [],
            subject_all: [],
            location: [],

            detail_item: [],
            page: 1, // หน้าปัจจุบัน
            pageSize: 10, // จำนวน card ต่อหน้า
            totalPages: 10,
            isload_search: false,
            input_search_tea: '00000',
            data_tea: null,
            data_tea_copy: null,
            data_search_tea: [],
            dialogData: '',
            dialog: false,
            isLoading: true,
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
                    calories: 'คณิต',
                    fat: 'กรต',
                    carbs: 24,
                    protein: 4.0,
                    iron: 1,
                },
            ],
        };
    },
    computed: {

    },
    watch: {
    },
    created() {
        this.search_tea();
        this.search_type_tier();
        this.search_subject();
    },

    components: {
        loaderVue
    },
    methods: {
        filteredDesserts() {
            if (this.input_search_tea == null || this.input_search_tea == '') {
                this.data_tea_copy = [];
                this.isload_search = false;
                return;
            }
            if (this.input_search_tea == '00000') {
                this.data_tea_copy = this.data_tea;
                this.isload_search = false;
                return;
            }
            for (const key in this.data_tea) {
                if (key === this.input_search_tea) {
                    this.data_tea_copy = { [key]: this.data_tea[key] };
                    this.isload_search = false;
                    return;
                }
            }
        },
        show_detail(item) {
            this.dialog = true;
            this.dialogData = item;
            console.log(item);
        },
        search_tea() {
            const db = this.$fireModule.database();
            const ref = db.ref("user");
            this.data_search_tea.push({ name: `ทั้งหมด`, key: '00000' });
            ref.orderByChild("status").equalTo("teacher").once("value")
                .then((snapshot) => {
                    const teacherData = snapshot.val();
                    this.data_tea = teacherData;
                    this.data_tea_copy = teacherData;
                    for (const key in teacherData) {
                        this.data_search_tea.push({ name: `${teacherData[key].firstName} ${teacherData[key].lastName}`, key: key })
                    }
                    this.isload_search = false;
                    this.isLoading = false;
                    console.log(teacherData, this.data_search_tea);
                })
                .catch((error) => {
                    console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูล: ", error);
                });
        },
        search_type_tier() {
            const db = this.$fireModule.database();
            db.ref(`type_all/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                console.log(childData);
                this.type_tier = childData;
            })
            db.ref(`type_private_all/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                console.log(childData);
                this.type_tier_private = childData;
            })
        },
        checkType(item) {
            if (item.typeflip == '-Ng-E0mbVKRdMl0daNTz') {
                return 0;
            }
            if (item.typeflip == '-NcBK4aqB8zezly79vPm') {
                return 1;
            }
            if (item.typeflip == '-NcBKBrSL24b9fQ7FOfm') {
                return 2;
            }
            if (item.typeflip == '-NcBKCvVZBQVWqF5rkWS') {
                return 3;
            }
            if (item.typeflip == '-NcBKDdjepkxfmUnzqyY') {
                return 4;
            }
        },
        search_subject() {
            const db = this.$fireModule.database();
            db.ref(`subject_all/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                console.log(childData);
                this.subject_all = childData;
            })
        },
        check_subject(item) {
            for (const key in this.subject_all) {
                if (item == key) {
                    return this.subject_all[key].name;
                }
            }
        },
        details(item, key) {
            let idkey = { id: key };
            this.detail_item = { ...item, ...idkey };
            console.log(this.detail_item);
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