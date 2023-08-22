<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row v-if="!isLoading">
            <div style="display: inline-flex; justify-content: space-between;">
                <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                <p> <v-btn class="text-white" @click="exportDialog" color="black" router exact>Export

                        <v-icon color="white" > mdi-microsoft-excel</v-icon>
                        
                    </v-btn>
                    <v-btn class="text-white" to="/admin/student/register" color="black" router exact>เพิ่มนักเรียน
                        <v-icon color="white">mdi-plus</v-icon>
                    </v-btn>
                </p>

            </div>
            <div class="col-sm-12">
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                        hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="items" :search="search" :items-per-page="-1">
                    <template v-slot:top>


                        <v-spacer></v-spacer>
                        <!-- <v-text-field class="me-10" v-model="search" append-icon="mdi-magnify" label="Search" single-line
                hide-details></v-text-field> -->
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
                                    <v-btn color="red darken-1 text-white" disabled @click="deleteItemConfirm">ตกลง</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
                                    <v-btn color="red darken-1 text-white" disabled @click="deleteItemConfirm">ตกลง</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{ item }">
                     
                            <v-icon color="#B6A7A2" class="text-h5" @click="viewItem(item)" style="text-decoration: underline;">
                                mdi-eye
                            </v-icon>
                       
                 
                            <v-icon small color="#AD382F" class="text-h5" @click="deleteItem(item)" style="text-decoration: underline;">
                                mdi-delete
                            </v-icon>
                      
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
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="รหัสนักเรียน"
                                        :disabled="isExportAll" value="รหัสนักเรียน"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชื่อจริงนักเรียน"
                                        :disabled="isExportAll" value="ชื่อจริงนักเรียน"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="นามสกุลนักเรียน"
                                        :disabled="isExportAll" value="นามสกุลนักเรียน"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชื่อเล่นนักเรียน"
                                        :disabled="isExportAll" value="ชื่อเล่น"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="เบอร์โทรศัพท์นักเรียน"
                                        :disabled="isExportAll" value="เบอร์โทรศัพท์นักเรียน"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="เบอร์โทรศัพท์ผู้ปกครอง"
                                        :disabled="isExportAll" value="เบอร์โทรศัพท์ผู้ปกครอง"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="สถานศึกษา" value="สถานศึกษา"
                                        :disabled="isExportAll"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ระดับการศึกษา"
                                        :disabled="isExportAll" value="ระดับการศึกษา"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ประเภทคลาส"
                                        :disabled="isExportAll" value="ประเภทคลาส"></v-checkbox>
                                    <p>&#x2022; Flip class</p>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชั่วโมงเรียนที่เรียนไปแล้ว"
                                        :disabled="isExportAll" value="ชั่วโมงเรียนที่เรียนไปแล้ว Flip class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชั่วโมงเรียนที่เหลืออยู่"
                                        :disabled="isExportAll" value="ชั่วโมงเรียนที่เหลืออยู่ Flip class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชั่วโมงเรียนที่แถม"
                                        :disabled="isExportAll" value="ชั่วโมงเรียนที่แถม Flip class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="วันที่ซื้อคอร์ส"
                                        :disabled="isExportAll" value="วันที่ซื้อคอร์ส Flip class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="วันที่คอร์สหมดอายุ"
                                        :disabled="isExportAll" value="วันที่คอร์สหมดอายุ Flip class"></v-checkbox>
                                    <p>&#x2022; Private class</p>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชั่วโมงเรียนที่เรียนไปแล้ว"
                                        :disabled="isExportAll"
                                        value="ชั่วโมงเรียนที่เรียนไปแล้ว Private class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชั่วโมงเรียนที่เหลืออยู่"
                                        :disabled="isExportAll" value="ชั่วโมงเรียนที่เหลืออยู่ Private class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชั่วโมงเรียนที่แถม"
                                        :disabled="isExportAll" value="ชั่วโมงเรียนที่แถม Private class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="วันที่ซื้อคอร์ส"
                                        :disabled="isExportAll" value="วันที่ซื้อคอร์ส Private class"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="วันที่คอร์สหมดอายุ"
                                        :disabled="isExportAll" value="วันที่คอร์สหมดอายุ Private class"></v-checkbox>
                                    <p>&#x2022; ข้อมูลผู้ปกครอง</p>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ชื่อผู้ปกครอง"
                                        :disabled="isExportAll" value="ชื่อผู้ปกครอง"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="อาชีพผู้ปกครอง"
                                        :disabled="isExportAll" value="อาชีพผู้ปกครอง"></v-checkbox>
                                    <v-checkbox class="m-0" v-model="selectedHeaders" label="ความคาดหวัง"
                                        :disabled="isExportAll" value="ความคาดหวัง"></v-checkbox>
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
            dialog: false,

            deleteConfirm: [],
            detailDelete: '',
            editDetail: '',
            dialogDetail: false,
            dialogDelete: false,

            isExportAll: false,
            selectedHeaders: [],
            selectedItems: [],

            headers: [
                { text: 'รหัสนักเรียน', value: 'stu.studentId' },
                { text: 'ชื่อเล่น', value: 'stu.nickname' },
                { text: 'ชื่อจริง', value: 'stu.firstName', filterable: true, },
                { text: 'นามสกุล', value: 'stu.lastName' },
                { text: 'เบอร์โทรศัพท์ผู้ปกครอง', value: 'stu.parentMobile' },

                { text: 'จำนวนชั่วโมง Flip Class ที่เหลือ ', value: 'stu.hourLeft' },
                { text: 'จำนวนชั่วโมง Private Class ที่เหลือ ', value: 'stu.privateHourLeft' },
                { text: 'เวลาที่บันทึก', value: 'stu.createdAt' },
                { text: 'Actions', value: 'actions', sortable: false },
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
            } else {
                this.selectedHeaders = ['รหัสนักเรียน', 'ชื่อจริงนักเรียน', 'นามสกุลนักเรียน', 'ชื่อเล่น', 'เบอร์โทรศัพท์นักเรียน', 'เบอร์โทรศัพท์ผู้ปกครอง'
                    , 'สถานศึกษา', 'ระดับการศึกษา', 'ประเภทคลาส',
                    'ชั่วโมงเรียนที่เรียนไปแล้ว Flip class', 'ชั่วโมงเรียนที่เหลืออยู่ Flip class', 'ชั่วโมงเรียนที่แถม Flip class', 'วันที่ซื้อคอร์ส Flip class', 'วันที่คอร์สหมดอายุ Flip class',
                    'ชั่วโมงเรียนที่เรียนไปแล้ว Private class', 'ชั่วโมงเรียนที่เหลืออยู่ Private class', 'ชั่วโมงเรียนที่แถม Private class', 'วันที่ซื้อคอร์ส Private class', 'วันที่คอร์สหมดอายุ Private class',
                    'ชื่อผู้ปกครอง', 'อาชีพผู้ปกครอง', 'ความคาดหวัง', 'เวลาที่บันทึกข้อมูล'];
            }

        },

    },
    components: {
        pageLoader,
    },
    mounted() {
        this.searchStudent();
    },
    methods: {
        viewItem(item) {
            this.$router.push({ path: 'student/detail', query: { userId: item.key } });

        },

        exportDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;

        },

        async generateFirebaseQuery() {
            const db = this.$fireModule.database();
            const query = db.ref("user/").orderByChild("status").equalTo("user");

            await query.on("value", (snapshot) => {
                const item = [];
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const childData = childSnapshot.val();
                    const stu = {
                        studentId: childData.studentId,
                        createdAt: childData.createdAt,

                        hourLeft: childData.hourLeft,
                        studyHour: childData.studyHour,
                        freeHour: childData.freeHour,
                        expireFlipClassDate: childData.expireFlipClassDate,
                        purchaseFlipClassDate: childData.purchaseFlipClassDate,

                        privateHourLeft: childData.privateHourLeft,
                        privateStudyHour: childData.privateStudyHour,
                        privateFreeHour: childData.privateFreeHour,
                        expirePrivateClassDate: childData.expirePrivateClassDate,
                        purchasePrivateClassDate: childData.purchasePrivateClassDate,

                        classTypes: childData.classTypes,
                        firstName: childData.firstName,
                        lastName: childData.lastName,
                        nickname: childData.nickname,
                        studentMobile: childData.studentMobile,
                        school: childData.school,
                        education: childData.education,
                        parentFirstName: childData.parentFirstName,
                        parentMobile: childData.parentMobile,
                        parentJob: childData.parentJob,
                        expectation: childData.expectation,

                    };
                    item.push({ key: key, stu });
                });

                this.selectedItems = item;

                this.isLoading = false;
            })
        },


        generateRowData(item, selectedHeaders) {
            return selectedHeaders.map(header => {
                switch (header) {
                    case 'รหัสนักเรียน':
                        return item.stu.studentId;
                    case 'ชื่อจริงนักเรียน':
                        return item.stu.firstName;
                    case 'นามสกุลนักเรียน':
                        return item.stu.lastName;
                    case 'ชื่อเล่น':
                        return item.stu.nickname;
                    case 'เบอร์โทรศัพท์นักเรียน':
                        return item.stu.studentMobile;
                    case 'เบอร์โทรศัพท์ผู้ปกครอง':
                        return item.stu.parentMobile;
                    case 'สถานศึกษา':
                        return item.stu.school;
                    case 'ระดับการศึกษา':
                        return item.stu.education;

                    case 'ชั่วโมงเรียนที่เรียนไปแล้ว Flip class':
                        return item.stu.studyHour;
                    case 'ชั่วโมงเรียนที่เหลืออยู่ Flip class':
                        return item.stu.hourLeft;
                    case 'ชั่วโมงเรียนที่แถม Flip class':
                        return item.stu.freeHour;
                    case 'วันที่คอร์สหมดอายุ Flip class':
                        return item.stu.expireFlipClassDate;
                    case 'วันที่ซื้อคอร์ส Flip class':
                        return item.stu.purchaseFlipClassDate;

                    case 'ชั่วโมงเรียนที่เรียนไปแล้ว Private class':
                        return item.stu.privateStudyHour;
                    case 'ชั่วโมงเรียนที่เหลืออยู่ Private class':
                        return item.stu.privateHourLeft;
                    case 'ชั่วโมงเรียนที่แถม Private class':
                        return item.stu.privateFreeHour;
                    case 'วันที่คอร์สหมดอายุ Private class':
                        return item.stu.expirePrivateClassDate;
                    case 'วันที่ซื้อคอร์ส Private class':
                        return item.stu.purchasePrivateClassDate;

                    case 'ชื่อผู้ปกครอง':
                        return item.stu.parentFirstName;
                    case 'อาชีพผู้ปกครอง':
                        return item.stu.parentJob;
                    case 'ความคาดหวัง':
                        return item.stu.expectation;
                    case 'เวลาที่บันทึกข้อมูล':
                        return item.stu.createdAt;
                    case 'ประเภทคลาส':
                        return Array.isArray(item.stu.classTypes) ? item.stu.classTypes.join(', ') : item.stu.classTypes;

                    default:
                        return '';
                }
            });
        },
        exportData() {
            return new Promise((resolve, reject) => {
                this.isExport = true;
                this.generateFirebaseQuery();

                try {

                    const selectedData = this.selectedItems.map(item => this.generateRowData(item, this.selectedHeaders));
                    const data = [this.selectedHeaders, ...selectedData];
                    console.log(selectedData)

                    const createdAt = Timestamp.fromDate(new Date()).toDate().toISOString();

                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.aoa_to_sheet(data);
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

                    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

                    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    saveAs(blob, createdAt + '_studentInFo.xlsx');

                    setTimeout(() => {
                        resolve("Data export completed successfully");
                    }, 1000); // Simulate a 1-second delay
                } catch (error) {
                    reject(error);
                } finally {
                    this.isExport = false;
                }
            });

        },

        searchStudent() {
            const db = this.$fireModule.database();
            const query = db.ref("user/").orderByChild("status").equalTo("user");

            query.on("value", (snapshot) => {
                const item = [];
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const childData = childSnapshot.val();
                    let sumx_date = "-";
                    if (childData.createdAt) {
                        let sum_date = new Date(childData.createdAt).toString().split(" ");
                        sumx_date = `${sum_date[1]} ${sum_date[2]} ${sum_date[3]} ${sum_date[4]}`
                    }
                    const stu = {
                        studentId: childData.studentId,
                        createdAt: sumx_date,
                        hourLeft: childData.hourLeft || "-",
                        privateHourLeft: childData.privateHourLeft || '-',
                        firstName: childData.firstName,
                        lastName: childData.lastName,
                        nickname: childData.nickname,
                        parentMobile: childData.parentMobile,


                    };

                    item.push({ key: key, stu });
                });

                this.items = item;
                this.isLoading = false;
            });

        },

        editItem(item) {
            console.log(item);
            this.editDetail = item.stu.firstName + " " + item.stu.lastName;
            this.dialogDetail = true;
        },
        deleteItem(item) {
            console.log(item);

            this.deleteConfirm = item;
            this.detailDelete = item.stu.firstName + " " + item.stu.lastName;
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            //onsole.log(this.deleteConfirm);
            const db = this.$fireModule.database();
            //db.ref(`user/${this.deleteConfirm.key}`).remove();
            //db.ref(`date_teacher/${this.deleteConfirm.key}`).remove();
            this.deleteConfirm = [];
            this.closeDelete()

        },

        close() {
            this.dialog_detail = false;

        },

        closeDelete() {
            this.dialogDelete = false;


        },
        formatDateToYYMMDD(timestamp) {
            if (timestamp) {
                const date = new Date(timestamp);
                const year = date.getUTCFullYear().toString().slice(-2);
                const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
                const day = date.getUTCDate().toString().padStart(2, '0');
                return `${year}/${month}/${day}`;
            }
            else {
                return;
            }

        },
    },
}
</script>

<style>
.gumroad {

    outline: 0;
    grid-gap: 8px;
    align-items: center;
    background: 0 0;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    font-size: 16px;
    gap: 8px;
    justify-content: center;
    line-height: 1.5;
    overflow: hidden;
    padding: 12px 16px;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: all .14s ease-out;
    white-space: nowrap;

    :hover {
        box-shadow: 4px 4px 0 #000;
        transform: translate(-4px, -4px);
    }

    :focus-visible {
        outline-offset: 1px;
    }

}
</style>