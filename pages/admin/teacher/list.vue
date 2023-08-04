<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row v-if="!isLoading">
            <div style="display: inline-flex; justify-content: space-between;">
                <h1 class="font-weight-bold">ข้อมูลครู</h1>
                <v-btn class="text-white" to="/admin/teacher/register" color="black" router exact>เพิ่มครู
                    <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
            </div>

            <div class="col-sm-12">
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                        hide-details></v-text-field>
                </v-card-title>
                <template>
                    <v-data-table :headers="headers" :items="items" :search="search" >
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
                            <v-icon small color="#B6A7A2" class="mr-1 text-h6" @click="viewItem(item)">
                                mdi-eye
                            </v-icon>
                            <v-icon small color="#B6A7A2" class="text-h6" @click="deleteItem(item)">
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
            editDetail: '',
            dialogDetail: false,
            headers: [
            { text: 'รหัสครู', value: 'teacher.teacherId', filterable: true, },
            { text: 'ชื่อเล่น', value: 'teacher.nickname', filterable: true, },
                { text: 'ชื่อจริง', value: 'teacher.firstName', filterable: true, },
                { text: 'นามสกุล', value: 'teacher.lastName' },
                { text: 'สถานศึกษา', value: 'teacher.university' },
                { text: 'เบอร์โทรศัพท์', value: 'teacher.mobile' },
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