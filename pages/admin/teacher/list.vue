<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row v-if="!isLoading">
            <div style="display: inline-flex; justify-content: space-between;">
                <h1 class="font-weight-bold">ข้อมูลครู</h1>
                <p>
                    <v-btn class="text-white" @click="exportDialog" color="black" router exact>Export

                        <v-icon color="white" x-small>mdi-arrow-down</v-icon>
                        <v-icon color="white" x-small>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn class="text-white" to="/admin/teacher/register" color="black" router exact>เพิ่มครู
                        <v-icon color="white">mdi-plus</v-icon>
                    </v-btn>
                </p>
            </div>

            <div class="col-sm-12">
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                        hide-details></v-text-field>
                </v-card-title>
                <template>
                    <v-data-table :headers="headers" :items="items" :search="search">
                        <template v-slot:top>
                            <v-dialog v-model="dialogDetail" max-width="500px">
                                <v-card>

                                    <v-card-title class="text-h5 green text-center"> แก้ไขข้อมูล
                                    </v-card-title>
                                    <v-card-text class=" text-center mt-2">
                                        <div class="text-h5">ข้อมูลคุณ {{ editDetail }}
                                        </div>
                                        <small></small>
                                    </v-card-text>

                                    <v-card-actions>

                                        <v-spacer></v-spacer>
                                        <v-btn color="grey " outlined @click="close">ยกเลิก</v-btn>
                                        <v-btn color="red darken-1 text-white" disabled
                                            @click="deleteItemConfirm">ตกลง</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-spacer></v-spacer>
                            <!-- <v-text-field class="me-10" v-model="search" append-icon="mdi-magnify" label="Search" single-line
                                            hide-details></v-text-field> -->
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>

                                    <v-card-title class="text-h5 red text-center"> Warning
                                    </v-card-title>
                                    <v-card-text class=" text-center mt-2">
                                        <div class="text-h5">ต้องการลบข้อมูลของคุณ<br> {{ detailDelete }}
                                            หรือไม่?</div>
                                        <small>*การลบข้อมูลจะลบข้อมูลครูคนนั้นทั้งหมด รวมถึงรหัสผ่านด้วย</small>
                                    </v-card-text>

                                    <v-card-actions>

                                        <v-spacer></v-spacer>
                                        <v-btn color="grey " outlined @click="closeDelete">ยกเลิก</v-btn>
                                        <v-btn color="red darken-1 text-white" disabled
                                            @click="deleteItemConfirm">ตกลง</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                        </template>
                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                        <template v-slot:item.actions="{ item }">
                            <v-btn text icon elevation="5" @click="viewItem(item)">
                                <v-icon color="#B6A7A2" class="text-h5">
                                    mdi-eye
                                </v-icon>
                            </v-btn>
                            <v-btn text icon elevation="5" @click="deleteItem(item)">
                                <v-icon small color="#AD382F" class="text-h5">
                                    mdi-delete
                                </v-icon>
                            </v-btn>

                        </template>

                    </v-data-table>
                    <v-dialog v-model="dialog" max-width="600px">

                        <v-card class="p-4 rounded-xl">
                            <v-card-title>
                                <span style="font-size: 16px">
                                    <b>กรุณาเลือกข้อมูลที่ต้องการ Export</b>
                                </span>
                                <v-spacer></v-spacer>
                                <v-btn fab dark small color="#37474F" @click="closeDialog">
                                    <v-icon dark class="text-h5">
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row no-gutters>
                                        <v-checkbox class="m-0" v-model="isExportAll" label="ข้อมูลทั้งหมด"
                                            color="indigo"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="รหัสครู"
                                            :disabled="isExportAll" value="รหัสครู"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="ชื่อจริงครู"
                                            :disabled="isExportAll" value="ชื่อจริงครู"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="นามสกุลครู"
                                            :disabled="isExportAll" value="นามสกุลครู"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="ชื่อเล่นครู"
                                            :disabled="isExportAll" value="ชื่อเล่นครู"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="เบอร์โทรศัพท์"
                                            :disabled="isExportAll" value="เบอร์โทรศัพท์"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="เพศ"
                                            :disabled="isExportAll" value="เพศ"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="อาชีพปัจจุบัน"
                                            value="อาชีพปัจจุบัน" :disabled="isExportAll"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="email"
                                            :disabled="isExportAll" value="email"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="สัญญาจ้าง"
                                            :disabled="isExportAll" value="สัญญาจ้าง"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="ประเภทการทำงาน"
                                            :disabled="isExportAll" value="ประเภทการทำงาน"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="วันที่เริ่มงาน"
                                            :disabled="isExportAll" value="วันที่เริ่มงาน"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="เรทค่าสอน"
                                            :disabled="isExportAll" value="เรทค่าสอน"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="สาขาที่สามารถสอนได้"
                                            :disabled="isExportAll" value="สาขาที่สามารถสอนได้"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="มหาวิทยาลัย"
                                            :disabled="isExportAll" value="มหาวิทยาลัย"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="คณะ"
                                            :disabled="isExportAll" value="คณะ"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="สาขา"
                                            :disabled="isExportAll" value="สาขา"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="วิชาที่สอนได้"
                                            :disabled="isExportAll" value="วิชาที่สอนได้"></v-checkbox>
                                        <v-checkbox class="m-0" v-model="selectedHeaders" label="เวลาที่บันทึกข้อมูล"
                                            :disabled="isExportAll" value="เวลาที่บันทึกข้อมูล"></v-checkbox>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <hr style="border: 2px solid #000; background-color: #000; margin-top: -30px;">

                            <v-card-title style="margin-top: -20px;">
                                <v-btn class="text-white" @click="exportData" color="green" :loading="isExport">ยืนยัน

                                    <v-icon color="white" small> mdi-content-save</v-icon>
                               
                                </v-btn>
                            </v-card-title>


                        </v-card>
                    </v-dialog>
                </template>
            </div>
        </v-row>
    </div>
</template>
<script>
import pageLoader from '@/components/loader.vue';
import { Timestamp } from "firebase/firestore";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export default {
    layout: 'default',
    data() {
        return {
            isLoading: true,
            isExport: false,
            search: '',
            deleteConfirm: [],
            detailDelete: '',
            dialog: false,
            dialogDelete: false,
            editDetail: '',
            dialogDetail: false,
            isExportLocation: false,
            isExportAll: false,
            selectedHeaders: [],
            selectedItems: [],

            headers: [
                { text: 'รหัสครู', value: 'teacher.teacherId', filterable: true, },
                { text: 'ชื่อเล่น', value: 'teacher.nickname', filterable: true, },
                { text: 'ชื่อจริง', value: 'teacher.firstName', filterable: true, },
                { text: 'นามสกุล', value: 'teacher.lastName' },
                { text: 'สถานศึกษา', value: 'teacher.university' },
                { text: 'เบอร์โทรศัพท์', value: 'teacher.mobile' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
            ],
            items: [],
        }
    },
    computed: {

    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        isExportAll(newValue) {
            if (!newValue) {
                this.selectedHeaders = [];
            }
            else {
                this.selectedHeaders = ['รหัสครู', 'ชื่อจริงครู', 'นามสกุลครู', 'ชื่อเล่นครู', 'เบอร์โทรศัพท์', 'เพศ'
                    , 'อาชีพปัจจุบัน', 'email', 'สัญญาจ้าง', 'ประเภทการทำงาน', 'วันที่เริ่มงาน', 'เรทค่าสอน', 'สาขาที่สามารถสอนได้',
                    'มหาวิทยาลัย', 'คณะ', 'สาขา', 'วิชาที่สอนได้', 'เวลาที่บันทึกข้อมูล']
            }

        },
    },
    components: {
        pageLoader,
    },
    mounted() {
        this.search_teacher();
    },
    methods: {

        exportDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;

        },


        async generateFirebaseQuery() {
            const db = this.$fireModule.database();
            const query = db.ref("user/").orderByChild("status").equalTo("teacher");

            await query.on("value", (snapshot) => {
                const item = [];
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const childData = childSnapshot.val();
                    const teacher = {
                        teacherId: childData.teacherId,
                        createdAt: childData.createdAt,
                        firstName: childData.firstName,
                        lastName: childData.lastName,
                        nickname: childData.nickname,
                        mobile: childData.mobile,
                        gender: childData.gender,
                        currJob: childData.currJob,
                        email: childData.email,
                        contract: childData.contract,
                        workType: childData.workType,
                        startDate: childData.startDate,
                        rate: childData.rate,
                        classLocation: childData.classLocation,
                        university: childData.university,
                        faculty: childData.faculty,
                        major: childData.major,
                        subject_all: childData.subject_all,


                    };
                    item.push({ key: key, teacher });
                });

                this.selectedItems = item;

                this.isLoading = false;
            })
        },

        async fetchLocationData(locationKeys) {
            const db = this.$fireModule.database();
            const promises = [];

            for (let i = 0; i < locationKeys.length; i++) {
                const classLocationKey = locationKeys[i];
                const classSnapshotPromise = db.ref(`location/${classLocationKey}`).once("value");
                promises.push(classSnapshotPromise);
            }

            try {
                const snapshots = await Promise.all(promises);
                const locationData = snapshots.map(snapshot => snapshot.val().name);
                return Array.isArray(locationData) ? locationData.join(', ') : locationData;
            } catch (error) {
                console.error("Error fetching location data:", error);
                return '';
            }
        },

        async generateRowData(item, selectedHeaders) {

            return Promise.all(selectedHeaders.map(async header => {
                switch (header) {
                    case 'รหัสครู':
                        return item.teacher.teacherId;
                    case 'ชื่อจริงครู':
                        return item.teacher.firstName;
                    case 'นามสกุลครู':
                        return item.teacher.lastName;
                    case 'ชื่อเล่นครู':
                        return item.teacher.nickname;
                    case 'เบอร์โทรศัพท์':
                        return item.teacher.mobile;
                    case 'เพศ':
                        return item.teacher.gender;
                    case 'อาชีพปัจจุบัน':
                        return item.teacher.currJob;
                    case 'email':
                        return item.teacher.email;
                    case 'สัญญาจ้าง':
                        return item.teacher.contract;
                    case 'ประเภทการทำงาน':
                        return item.teacher.workType;
                    case 'วันที่เริ่มงาน':
                        return item.teacher.startDate;
                    case 'เรทค่าสอน':
                        return item.teacher.rate;
                    case 'มหาวิทยาลัย':
                        return item.teacher.university;
                    case 'คณะ':
                        return item.teacher.faculty;
                    case 'สาขา':
                        return item.teacher.major;
                    case 'วิชาที่สอนได้':
                        const subjectAll = item.teacher.subject_all;
                        const subjectKeys = Object.keys(subjectAll);
                        const subjectAttributes = subjectKeys.map(key => subjectAll[key]);
                        return JSON.stringify(subjectAttributes);
                    case 'เวลาที่บันทึกข้อมูล':
                        return item.teacher.createdAt;
                    case 'สาขาที่สามารถสอนได้':
                        const locationKeys = item.teacher.classLocation;
                        return this.fetchLocationData(locationKeys);

                    default:
                        return '';
                }
            }));
        },
        async exportData() {
            try {
                this.isExport = true;
                await this.generateFirebaseQuery();

                const selectedDataPromises = this.selectedItems.map(async item => {
                    return await this.generateRowData(item, this.selectedHeaders);
                });

                const selectedData = await Promise.all(selectedDataPromises);

                const data = [this.selectedHeaders, ...selectedData];
                console.log(selectedData);

                const createdAt = Timestamp.fromDate(new Date()).toDate().toISOString();

                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.aoa_to_sheet(data);
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

                const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, createdAt + '_studentInFo.xlsx');

                return "Data export completed successfully";
            } catch (error) {
                throw error;
            } finally {
                this.isExport = false;
            }
        },

        search_teacher() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'teacher') {

                        const teacher = {

                            teacherId: childData[key].teacherId || null,
                            firstName: childData[key].firstName || null,
                            lastName: childData[key].lastName || null,
                            nickname: childData[key].nickname || null,
                            mobile: childData[key].mobile || null,

                            university: childData[key].university || null,

                        };
                        item.push({ key: key, teacher });

                    }
                }
                this.items = item;
                this.isLoading = false;
            })

        },
        viewItem(item) {
            this.$router.push({ path: 'teacher/detail', query: { teacherId: item.key } });
            //this.$router.push({ name: 'admin-teacher-detail', params: { itemId: item } });
        },

        deleteItem(item) {
            console.log(item);
            this.deleteConfirm = item;
            this.detailDelete = item.teacher.firstName + " " + item.teacher.lastName;
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            //onsole.log(this.deleteConfirm);
            const db = this.$fireModule.database();
            db.ref(`user/${this.deleteConfirm.key}`).remove();
            db.ref(`date_teacher/${this.deleteConfirm.key}`).remove();
            this.deleteConfirm = [];
            this.closeDelete()

        },

        close() {
            this.dialog_detail = false;

        },

        closeDelete() {
            this.dialogDelete = false;


        },
    },
}
</script>

<style>
.addButton {
    display: flex;
    padding: 6px 12px;
    padding-top: 0px;
    padding-bottom: 0px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    border-radius: 10px;
    border: 1px solid var(--brown-1, #322E2B);
    background: var(--brown-1, #322E2B);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.addButton:hover {
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-4px);
}
</style>