<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row v-if="!isLoading">
            <div style="max-width: 500px;">
                <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                <v-btn color="indigo" class="text-white" to="/admin/register-student/register" router
                    exact>เพิ่มนักเรียน</v-btn>
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
                    <template v-slot:item.actions="{ item }">
                        <v-icon small color="black" class="mr-1" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small color="red" @click="deleteItem(item)">
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
            editDetail :'',
            dialogDetail: false,
            dialogDelete: false,


            headers: [
                { text: 'ชื่อจริง', value: 'stu.firstName', filterable: true, },
                { text: 'นามสกุล', value: 'stu.lastName' },
                { text: 'ชื่อเล่น', value: 'stu.nickname' },
                { text: 'เบอร์โทรศัพท์นักเรียน', value: 'stu.studentMobile' },
                { text: 'เบอร์โทรศัพท์ผู้ปกครอง', value: 'stu.parentMobile' },
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
        search_teacher() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'user') {
                        console.log(childData[key]);
                        const stu = {
                            status: childData[key].status,
                            name: childData[key].name,
                            password: childData[key].password,
                            firstName: childData[key].firstName,
                            lastName: childData[key].lastName,
                            nickname: childData[key].nickname,
                            studentMobile: childData[key].studentMobile,
                            email: childData[key].email,
                            gender: childData[key].gender,
                            school: childData[key].school,
                            education: childData[key].education,
                            address: childData[key].address,
                            parentFirstName: childData[key].parentFirstName,
                            parentMobile: childData[key].parentMobile,
                            parentJob: childData[key].parentJob,
                            expectation: childData[key].expectation,
                        };
                        item.push({ key: key, stu });

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
    },
}
</script>