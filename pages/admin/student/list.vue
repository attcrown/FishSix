<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row v-if="!isLoading">
            <div style="display: inline-flex; justify-content: space-between;">
                <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                <p> <v-btn class="text-white" @click="exportData" color="black" router exact>Export

                        <v-icon color="white" x-small>mdi-arrow-down</v-icon>
                        <v-icon color="white" x-small>mdi-arrow-up</v-icon>
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
                <v-data-table :headers="headers" :items="items" :search="search">
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
                        <v-icon small color="#B6A7A2" class="mr-1 text-h6" @click="viewItem(item)">
                            mdi-eye
                        </v-icon>
                        <v-icon small color="red" class="text-h6" @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>

            </div>
        </v-row>
    </div>
</template>
<script>
import pageLoader from '@/components/loader.vue';

export default {
    layout: 'default',
    data() {
        return {
            isLoading: true,
            search: '',

            deleteConfirm: [],
            detailDelete: '',
            editDetail: '',
            dialogDetail: false,
            dialogDelete: false,


            headers: [
                { text: 'รหัสนักเรียน', value: 'stu.studentId' },
                { text: 'ชื่อเล่น', value: 'stu.nickname' },
                { text: 'ชื่อจริง', value: 'stu.firstName', filterable: true, },
                { text: 'นามสกุล', value: 'stu.lastName' },
                { text: 'เบอร์โทรศัพท์ผู้ปกครอง', value: 'stu.parentMobile' },
                { text: 'ประเภทคลาส', value: 'stu.classType' },
                { text: 'จำนวนชั่วโมงเรียนที่เหลือ (Decimal)', value: 'stu.hourLeft' },

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

        exportData() {
            // หัวข้อเอกสาร Excel
            const headers = ['ชื่อจริงนักเรียน', 'นามสกุลนักเรียน', 'ชื่อจริงครู', 'นามสกุลครู', 'วิชา', 'วันที่สอน', 'เริ่มเรียน', 'เลิกเรียน', 'สถานที่เรียน', 'สถานะ', 'เบอร์โทรนักเรียน', 'เบอร์โทรครู', 'ระดับการศึกษา', 'ลงเรียนวิชานี้เพราะอะไร'];

            // แปลง this.desserts_student เป็นอาร์เรย์ของอาร์เรย์ (array of arrays) และเพิ่มหัวข้อไว้ด้านบน
            const data = [headers, ...this.items.map(item => [
                item.namestu_first,
                item.namestu_last,
                item.nametea_first,
                item.nametea_last,
                item.subject,
                item.date,
                item.time_s,
                item.time_e,
                item.style,
                item.status,
                item.phone_student,
                item.phone_teacher,
                // item.class,
                item.level,
                item.because,
            ])];

            // สร้างเอกสาร Excel
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

            // แปลงข้อมูลให้เป็นรูปแบบไฟล์ Excel
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // สร้าง Blob และบันทึกไฟล์
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'data.xlsx');
        },

        searchStudent() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'user') {

                        const stu = {

                            studentId: childData[key].studentId,
                            createdAt: childData[key].createdAt,
                            hourLeft: childData[key].hourLeft,
                            classType: childData[key].classType,
                            firstName: childData[key].firstName,
                            lastName: childData[key].lastName,
                            nickname: childData[key].nickname,
                            studentMobile: childData[key].studentMobile,

                            school: childData[key].school,
                            education: childData[key].education,

                            parentFirstName: childData[key].parentFirstName,
                            parentMobile: childData[key].parentMobile,
                            parentJob: childData[key].parentJob,
                            expectation: childData[key].expectation,
                        };
                        item.push({ key: key, stu });
                        console.log(stu)

                    }
                }

                this.items = item;
                this.isLoading = false;
            })

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