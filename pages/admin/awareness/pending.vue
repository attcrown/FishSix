<template>
<div>


<v-card class="elevation-0 rounded-t-xl px-5 pt-3" style="background-color:#EBE4DE">
    <v-container fluid>
        <h5><b>รอยืนยัน</b></h5>
        <v-row align="center">
            <v-col cols="12" sm="3">
             
            </v-col>
           
        </v-row>
    </v-container>

</v-card>


<v-data-table sort-by="index" :headers="headers" :search="search" :items="items"
    :items-per-page="-1" class="elevation-0 rounded-xl" >
    <template v-slot:top>
        <v-toolbar flat>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                        hide-details></v-text-field>

        </v-toolbar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
        <div class="icon-container">

            <v-icon color="black" class="mr-2 icon-box" @click="viewItem(item)" style="text-decoration: underline;">
                mdi-pencil
            </v-icon>

        </div>
        
    </template>
</v-data-table>



</div>

</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data: () => ({
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
            { text: 'เวลาที่บันทึก', value: 'teacher.createdAt', filterable: true, },
            { text: 'รหัสประจำตัวครู', value: 'teacher.userid', filterable: true, },

            { text: 'ชื่อจริง', value: 'teacher.firstName', filterable: true, },
            { text: 'นามสกุล', value: 'teacher.lastName' },
            { text: 'ชื่อเล่น', value: 'teacher.nickname', filterable: true, },

            { text: 'เบอร์โทรศัพท์', value: 'teacher.mobile' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
        ],
        items: [],

    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    mounted() {
        this.searchTeacher();
    },
    methods: {
        ...mapMutations(['setUserIdDetail']),
        // searchTeacher(){
        //     const db = this.$fireModule.database();
        //     db.ref(`teacher_register/`).on("value", (snapshot) => {
        //         const items = [];
        //         if(snapshot.exists()){
        //             const childData = snapshot.val();
        //             for(const detail in childData){
        //                 if(childData[detail].action === "pending"){
        //                     items.push({ key: detail, teacher:childData[detail] });
        //                 }
        //             }
        //             this.items = items;
        //             console.log(items);
        //         }else{
        //             console.error("Error fetching data");
        //         }
        //     })
        // },
        searchTeacher() {
            const db = this.$fireModule.database();
            const ref = db.ref("teacher_register/");
            const query = ref.orderByChild("action").equalTo("pending");
            query.once("value")
                .then((snapshot) => {
                    const items = [];
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const childData = childSnapshot.val(); console.log(childData)
                        const sumx_date = childData.createdAt
                            ? new Date(childData.createdAt).toLocaleString()
                            : "-";
                        const teacher = {
                            firstName: childData.firstName || null,
                            lastName: childData.lastName || null,
                            nickname: childData.nickname || null,
                            mobile: childData.mobile || null,
                            userid: childData.userid || null,
                            createdAt: sumx_date,
                            university: childData.university || null,

                        };
                        items.push({ key: key, teacher });

                    });

                    this.items = items;
                    this.isLoading = false;
                    console.log(items);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        viewItem(item) {
            // this.setUserIdDetail(item.key);
            this.$router.push({ path: 'awareness/detail', query: { registerId: item.key } });
            // this.$router.push('awareness/detail');
            //this.$router.push({ name: 'admin-teacher-detail', params: { itemId: item } });
        },

    },
}
</script>
