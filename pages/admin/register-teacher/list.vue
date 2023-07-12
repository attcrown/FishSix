<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row v-if="!isLoading">
            <div style="max-width: 500px;">
                <h1 class="font-weight-bold">ข้อมูลผู้สอน</h1>
                <v-btn color="indigo" class="text-white" to="/admin/register-teacher/register" router
                    exact>เพิ่มผู้สอน</v-btn>
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
                                    <v-btn color="red darken-1 text-white" disabled @click="deleteItemConfirm">ตกลง</v-btn>
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
                                        <v-btn color="red darken-1 text-white" disabled @click="deleteItemConfirm">ตกลง</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small color="black" class="mr-1" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small color="red" @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>

                    </v-data-table>
                </template>
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
            dialog: false,
            dialogDelete: false,
            editDetail :'',
            dialogDetail: false,
            headers: [
                { text: 'ชื่อจริง', value: 'teacher.firstName', filterable: true, },
                { text: 'นามสกุล', value: 'teacher.lastName' },
                { text: 'ชื่อเล่น', value: 'teacher.nickname' },
                { text: 'เบอร์โทรศัพท์', value: 'teacher.mobile' },
                { text: 'อีเมล', value: 'teacher.email' },
                { text: 'เพศ', value: 'teacher.gender' },
                { text: 'อาชีพ', value: 'teacher.currJob' },
                { text: 'เลขบัตรประชาชน', value: 'teacher.idCardNumber' },
                { text: 'สัญญาจ้าง', value: 'teacher.contract' },
                { text: 'ประเภทการทำงาน', value: 'teacher.workType' },
                { text: 'วันที่เริ่มทำงาน', value: 'teacher.startDate' },
                { text: 'เรทค่าจ้าง/ชั่วโมง', value: 'teacher.rate' },
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
        this.search_teacher();
    },
    methods: {

        //init
        search_teacher() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'teacher') {

                        const teacher = {
                            address: childData[key].address || null,
                            firstName: childData[key].firstName || null,
                            lastName: childData[key].lastName || null,
                            nickname: childData[key].nickname || null,
                            mobile: childData[key].mobile || null,
                            email: childData[key].email || null,
                            gender: childData[key].gender || null,
                            currJob: childData[key].currJob || null,
                            address: childData[key].address || null,
                            currAddress: childData[key].currAddress || null,
                            idCardNumber: childData[key].idCardNumber || null,
                            idCardCopy: childData[key].idCardCopy || null,
                            contract: childData[key].contract || null,
                            workType: childData[key].workType || null,
                            startDate: childData[key].startDate || null,
                            rate: childData[key].rate,
                            university: childData[key].university || null,
                            faculty: childData[key].faculty || null,
                            major: childData[key].major || null,
                        };
                        item.push({ key: key, teacher });

                    }
                }
                this.items = item;
                this.isLoading = false;
            })

        },

        editItem(item) {
            console.log(item);
            this.editDetail = item.teacher.firstName + " " + item.teacher.lastName;
            this.dialogDetail = true;
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