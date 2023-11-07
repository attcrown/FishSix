<template>
    <div>
        <loaderVue v-if="isLoading"></loaderVue>
        <div v-if="status !== 'teacher'">
            <v-card flat class="elevation-16 rounded-xl p-4" style="background-color:#EBE4DE">
                <div class="d-flex align-center">
                    <v-autocomplete v-if="data_search_tea" style="max-width: 300px;" :items="data_search_tea"
                        item-text="name" item-value="key" v-model="input_search_tea" label="ค้นหาชื่อครู"></v-autocomplete>
                    <v-autocomplete v-if="subject_all" class="ms-5" style="max-width: 300px;" :items="data_search_sub"
                        item-text="name" item-value="key" v-model="input_search_sub" label="ค้นหาวิชา"></v-autocomplete>
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
                                <v-row align="center" class="mx-0" v-if="status != 'user'">
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
                            <v-btn class="mt-3 me-3 mb-6" color="red" @click="sheet = !sheet, e1 = 1, clear_img()">
                                close
                            </v-btn>
                        </div>
                        <div>
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
                                                readonly size="14" length="4" style="margin-top:-10px" v-if="status != 'user'"></v-rating>

                                            <div class="grey--text" v-if="status != 'user'">
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
                                            <p v-if="status != 'user'">E-mail</p>
                                            <p v-if="status != 'user'" style="font-size:20px; margin-top:-15px"><b>{{ detail_item.email ||
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
                                                    <div class="d-flex justify-space-between">
                                                        <h4>ระดับชั้นศึกษา</h4>
                                                        <v-btn v-if="edits && status != 'user'" color="success"
                                                            @click="save_detail(detail_item)">
                                                            save
                                                        </v-btn>
                                                        <v-btn v-if="!edits && status != 'user'" color="warning"
                                                            @click="edit_detail(detail_item)">
                                                            Edit
                                                        </v-btn>
                                                    </div>
                                                    <p v-if="!edits">{{ detail_item.level || 'ไม่ระบุ' }}</p>
                                                    <v-textarea background-color="white" label="ระบุระดับชั้นศึกษา" rows="1"
                                                        v-if="edits" v-model="detail_item.level"></v-textarea>
                                                    <h4>จบการศึกษาจาก</h4>
                                                    <p v-if="!edits">{{ detail_item.university || 'ไม่ระบุ' }}</p>
                                                    <v-textarea background-color="white" label="ระบุจบการศึกษาจาก" rows="1"
                                                        v-if="edits" v-model="detail_item.university"></v-textarea>
                                                    <h4>ประสบการสอน</h4>
                                                    <p v-if="!edits">{{ detail_item.experience || 'ไม่ระบุ' }}</p>
                                                    <v-textarea :counter="250" background-color="white"
                                                        label="ระบุประสบการณ์สอน" rows="1" v-if="edits"
                                                        v-model="detail_item.experience"></v-textarea>
                                                    <h4>สไตล์การสอน</h4>
                                                    <p v-if="!edits">{{ detail_item.style_tech || 'ไม่ระบุ' }}</p>
                                                    <v-textarea :counter="250" background-color="white"
                                                        label="ระบุสไตล์การสอน" rows="1" v-if="edits"
                                                        v-model="detail_item.style_tech"></v-textarea>
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
                                                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                                                        <template v-slot:item.keysubject="{ item }">
                                                            {{ check_subject(item.keysubject) }}
                                                        </template>
                                                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                                                        <template v-slot:item.keystudent="{ item }">
                                                            {{ check_keystudent(item.keystudent) }}
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
                            </v-row>
                        </div>
                        <div>
                            <v-row justify="center">
                                <v-col cols="auto">
                                    <v-card width="350" class="rounded-xxl" style="background-color:#EBE4DE">
                                        <center>
                                            <div class="ms-3 pt-3 pb-1 text-start">
                                                <p><b>วิชาที่สอน</b></p>
                                                <p style="font-size:16px; margin-top:-10px" v-if="!detail_item.subject_all">
                                                    ไม่ระบุ
                                                </p>
                                                <p style="font-size:16px; margin-top:-10px"
                                                    v-for="(subject, index_sub) in detail_item.subject_all"
                                                    :key="index_sub">
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
                                                <p style="font-size:16px; margin-top:-10px"
                                                    v-if="!detail_item.classLocation">
                                                    ไม่ระบุ
                                                </p>
                                                <p style="font-size:16px; margin-top:-10px"
                                                    v-for="(location, index_loca) in detail_item.classLocation"
                                                    :key="index_loca">
                                                    {{ check_location(location) || 'ไม่มีข้อมูล' }}
                                                </p>
                                            </div>
                                        </center>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <div class="mt-1" v-if="status != 'user'">
                            <v-row justify="center">
                                <v-col cols="auto">
                                    <v-card style="width:350px; background-color:#EBE4DE"
                                        class="d-flex justify-center align-center rounded-xxl p-3">
                                        <p class="mt-3">อัพเดทโปรไฟล์ครูแบบรูปภาพ</p>
                                        <v-btn :disabled="!upload_profile" class="ms-3" color="green" @click="overlay = !overlay,
                                            sheet = !sheet,
                                            save_img_profile()">save</v-btn>
                                        <v-btn :disabled="!detail_item.profile_img" class="ms-3" color="red" @click="overlay = !overlay,
                                            sheet = !sheet,
                                            del_img_profile()">delete</v-btn>
                                    </v-card>
                                </v-col>
                                <v-col cols="auto">
                                    <v-card style="width:800px; background-color:#EBE4DE;" class="rounded-xxl p-3">
                                        <v-file-input show-size label="อัพโหลดโปรไฟล์ที่เป็นรูปภาพ" outlined
                                            truncate-length="50" v-model="upload_profile" style="margin-bottom:-30px" dense
                                            @change="show_profile()"></v-file-input>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <div v-if="build_img">
                            <v-row justify="center">
                                <v-col cols="auto">
                                    <v-card style="width:1150px;">
                                        <v-img :src="build_img"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <div v-if="!build_img && detail_item.profile_img">
                            <v-row justify="center">
                                <v-col cols="auto">
                                    <v-card style="width:1150px;">
                                        <v-img :src="detail_item.profile_img"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <div style="margin:100px; background-color:rgb(165, 164, 164)" class="text-center">FISHSIX</div>

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
                    <div class="text-center">
                        <v-rating v-model="dialogData.rating" color="yellow darken-3" background-color="grey darken-1"
                            empty-icon="$ratingFull" half-increments hover large readonly></v-rating>
                        <v-text-field v-model="dialogData.Rans1"
                            label="สิ่งที่ดีอยู่แล้ว" readonly></v-text-field>
                        <v-text-field v-model="dialogData.Rans2"
                            label="สิ่งที่พัฒนาต่อได้" readonly></v-text-field>
                        <v-text-field v-model="dialogData.Rans3"
                            label="สิ่งที่อยากให้พัฒนา" readonly></v-text-field>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>



    </div>
</template>
<script>
import { mapState } from 'vuex';
import firebase from 'firebase/compat/app';
import loaderVue from '~/components/loader.vue';
export default {
    inject: {
        theme: {
            default: { isDark: false },
        },
    },
    data() {
        return {
            overlay: false,
            build_img: null,
            upload_profile: null,
            edits: false,
            save: false,
            type_tier: [],
            type_tier_private: [],
            subject_all: [],
            location_all: [],

            detail_item: [],
            page: 1, // หน้าปัจจุบัน
            pageSize: 10, // จำนวน card ต่อหน้า
            totalPages: 10,
            isload_search: false,
            input_search_tea: '00000',
            input_search_sub: '00000',
            data_tea: null,
            data_tea_copy: null,
            data_search_tea: [],
            data_search_sub: [],
            data_search_stu: [],
            dialogData: [],
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
                    value: 'date_learn',
                },
                { text: 'วิชาที่สอน', value: 'keysubject', align: 'center' },
                { text: 'นักเรียน', value: 'keystudent', align: 'center' },
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
            table_detail_tea: [

            ],
        };
    },
    computed: {
        ...mapState(['firstName', 'status']),

    },
    watch: {
        overlay(val) {
            val && setTimeout(() => {
                this.overlay = false;
                this.sheet = true;
            }, 3000)
        },
    },
    created() {
        this.search_tea();
        this.search_type_tier();
        this.search_subject();
        this.search_location();
    },

    components: {
        loaderVue
    },
    methods: {
        filteredDesserts() {
            if (this.input_search_tea == null || this.input_search_tea == '' || this.input_search_sub == null || this.input_search_sub == '') {
                this.data_tea_copy = [];
                this.isload_search = false;
                return;
            }
            if (this.input_search_tea == '00000' && this.input_search_sub == '00000') {
                this.data_tea_copy = this.data_tea;
                this.isload_search = false;
                return;
            }
            if (this.input_search_tea != '00000' && this.input_search_sub == '00000') {
                for (const key in this.data_tea) {
                    if (key === this.input_search_tea) {
                        this.data_tea_copy = { [key]: this.data_tea[key] };
                        this.isload_search = false;
                        return;
                    }
                }
            }
            if (this.input_search_tea == '00000' && this.input_search_sub != '00000') {
                this.data_tea_copy = [];
                for (const key in this.data_tea) {
                    const teacher = this.data_tea[key]
                    for (const sub in teacher.subject_all) {
                        if (sub === this.input_search_sub) {
                            let newer = { [key]: this.data_tea[key] };
                            this.data_tea_copy = { ...this.data_tea_copy, ...newer };
                        }
                    }
                }
                this.isload_search = false;
            }
            else {
                this.data_tea_copy = [];
                this.isload_search = false;
                return;
            }
        },
        show_detail(item) {
            this.dialog = true;
            this.dialogData = item;
            console.log(item);
        },
        async search_tea() {
            await this.$nextTick();
            console.log('>>>', this.firstName, this.status);

            const db = this.$fireModule.database();
            const ref = db.ref("user");
            this.data_search_tea.push({ name: `ทั้งหมด`, key: '00000' });
            ref.orderByChild("status").equalTo("teacher").once("value")
                .then((snapshot) => {
                    let teacherData = snapshot.val();
                    if (this.status === "teacher") {
                        db.ref(`user/${this.firstName}`).on("value", (snapshot) => {
                            const childData = snapshot.val();
                            console.log({ [this.firstName]: childData });
                            teacherData = { [this.firstName]: childData };
                        })
                    }

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



            ref.orderByChild("status").equalTo("user").once("value")
                .then((snapshot) => {
                    const studentData = snapshot.val();
                    for (const key in studentData) {
                        this.data_search_stu.push({ name: `${studentData[key].nickname}`, key: key })
                    }
                    console.log(this.data_search_stu);
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
                for (const key in childData) {
                    this.data_search_sub.push({ name: `${childData[key].name}`, key: key })
                }
            })
        },
        check_subject(item) {
            for (const key in this.subject_all) {
                if (item == key) {
                    return this.subject_all[key].name;
                }
            }
        },
        search_location() {
            const db = this.$fireModule.database();
            db.ref(`location/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                console.log(childData);
                this.location_all = childData;
            })
        },
        check_location(item) {
            for (const key in this.location_all) {
                if (item == key) {
                    return this.location_all[key].name;
                }
            }
        },
        details(item, key) {
            let idkey = { id: key };
            this.detail_item = { ...item, ...idkey };
            console.log(this.detail_item);
            this.table_detail(this.detail_item);
        },

        edit_detail(item) {
            this.edits = true;
            console.log('edit', item);
        },
        save_detail(item) {
            this.edits = false;
            const db = this.$fireModule.database();
            db.ref(`user/${item.id}`).update({
                level: item.level || null,
                university: item.university || null,
                experience: item.experience || null,
                style_tech: item.style_tech || null
            }).then(() => {
                let new_add = {
                    level: item.level || null,
                    university: item.university || null,
                    experience: item.experience || null,
                    style_tech: item.style_tech || null
                };
            })
        },
        table_detail(item) {
            console.log('>>>>', item);
            const db = this.$fireModule.database();
            db.ref(`send_plan/${item.id}`).on("value", (snapshot) => {
                this.desserts = [];
                const childData = snapshot.val();
                for (const keysend in childData) {
                    let cdkey = childData[keysend];
                    let newer = { keysend: keysend };
                    cdkey = { ...cdkey, ...newer };
                    console.log(cdkey);
                    this.desserts.push(cdkey);
                }
            })
        },
        check_keystudent(idkey) {
            for (const key in this.data_search_stu) {
                if (this.data_search_stu[key].key === idkey) {
                    return this.data_search_stu[key].name;
                }
            }
        },
        show_profile() {
            if (!this.upload_profile) {
                this.build_img = null;
                return;
            }
            console.log(this.upload_profile);
            // เริ่มต้นโดยรับข้อมูลจาก v-model "upload_profile"
            const file = this.upload_profile;
            const imageTypes = ['image/jpeg', 'image/png', 'image/gif']; // ประเภทของไฟล์รูปภาพ
            const pdfTypes = ['application/pdf']; // ประเภทของไฟล์ PDF                

            // ตรวจสอบประเภทของไฟล์
            if (imageTypes.includes(file.type)) {
                // ถ้าเป็นไฟล์รูปภาพ
                const reader = new FileReader();

                reader.onload = (e) => {
                    // อ่านข้อมูลรูปภาพและแสดงใน <v-img>
                    this.build_img = e.target.result;
                };

                reader.readAsDataURL(file);
            } else if (pdfTypes.includes(file.type)) {
                this.upload_profile = null;
                // ถ้าเป็นไฟล์ PDF
                // ทำสิ่งที่คุณต้องการกับไฟล์ PDF เช่นแสดงหน้า PDF หรือประมวลผลข้อมูล PDF
                // คุณอาจต้องใช้งานบรรณาธิการ PDF ใน JavaScript หรือไลบรารีที่สามรถอ่าน PDF เช่น pdf.js
            }
        },
        save_img_profile() {
            const storageRef = firebase.storage().ref();
            const file = this.upload_profile; // เลือกไฟล์รูปภาพจาก input หรืออื่นๆ
            const imageRef = storageRef.child(`Profile_teacher/${this.detail_item.id}.jpg`); // กำหนดชื่อและพาธของรูปภาพที่จะอัปโหลด
            imageRef.put(file).then(() => {
                const storage = firebase.storage();
                const image = storage.ref(`Profile_teacher/${this.detail_item.id}.jpg`);
                image.getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        const db = this.$fireModule.database();
                        db.ref(`user/${this.detail_item.id}/`).update({
                            profile_img: url
                        }).then(() => {
                            console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว URL');
                            let newer = { profile_img: url };
                            this.detail_item = { ...this.detail_item, ...newer };
                            this.data_tea[this.detail_item.id].profile_img = url;
                            this.data_tea_copy[this.detail_item.id].profile_img = url;
                            this.build_img = null;
                            this.upload_profile = null;
                        })
                    })
                console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
            }).catch((error) => {
                console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error);
            });
        },
        clear_img() {
            this.build_img = null;
            this.upload_profile = null;
        },
        del_img_profile() {
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child(`Profile_teacher/${this.detail_item.id}.jpg`);
            imageRef
                .delete()
                .then(() => {
                    console.log('รูปภาพถูกลบเรียบร้อยแล้ว');
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาดในการลบรูปภาพ:', error);
                });

            const db = this.$fireModule.database();
            db.ref(`user/${this.detail_item.id}/profile_img`).remove()
                .then(() => {
                    console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว URL');
                    let newer = { profile_img: null };
                    this.detail_item = { ...this.detail_item, ...newer };
                    this.data_tea[this.detail_item.id].profile_img = null;
                    this.data_tea_copy[this.detail_item.id].profile_img = null;
                    this.build_img = null;
                    this.upload_profile = null;
                })
        },
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