<template>
    <div>

        <div style="display: flex; justify-content: space-between;">
            <h1 class="font-weight-bold">คลังเนื้อหา</h1>
            <v-btn to="/admin/content" router exact>ย้อนกลับ</v-btn>
        </div>
        <v-card class="elevation-16 rounded-t-xl px-5 pt-3" style="background-color:#EBE4DE">
            <v-container fluid>
                <h5><b>คลังเนื้อหา</b></h5>
                <v-row align="center">
                    <v-col cols="12" sm="3">
                        <v-text-field label="วิชา" v-model="subjectName"
                           >
                            <template #prepend>
                                <span class="mdi mdi-book-outline text-h6"></span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field label="ระดับชั้น" v-model="level" placeholder="ระดับชั้น" required></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3"> </v-col>
                    <v-col cols="12" sm="3">

                        <v-btn elevation="10" small color="#322E2B" style="color:white"
                            @click="addContentDialog">เพิ่มข้อมูล<span class="mdi mdi-plus"></span></v-btn>
                        <v-btn elevation="10" small color="#322E2B" style="color:white">ค้นหาข้อมูล<span
                                class="mdi mdi-magnify"></span></v-btn>


                    </v-col>
                </v-row>
            </v-container>

        </v-card>


        <v-data-table sort-by="index" :headers="headers" :search="searchSubject" :items="subjectContents"
            class="elevation-16 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="ms-4"><b>เนื้อหารายวิชา</b></v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>


                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="viewItem(item)">
                    mdi-eye
                </v-icon>
                <v-icon small>
                    mdi-edit
                </v-icon>
            </template>
        </v-data-table>


        <v-dialog v-model="dialog_detail" max-width="600px">

            <v-card class="p-4 rounded-xl">
                <v-card-title class="d-flex justify-space-between">
                    <span style="font-size: 16px">
                        <b>เพิ่มรายละเอียดเนื้อหา</b>

                    </span>

                    <v-btn fab dark small color="#37474F" @click="dialog_detail = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>

                </v-card-title>
                <v-card-text>
                    <!-- <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete label="วิชา" v-model="subject" :items="subjects" item-text="name"
                                    item-value="key" @input="search_level_select()">
                                    <template #prepend>
                                        <span class="mdi mdi-book-outline text-h6"></span>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete v-model="level" :items="level_select" label="ระดับชั้น *"
                                    :disabled="!level_select"></v-autocomplete>
                            </v-col>

                        </v-row>
                    </v-container> -->

                </v-card-text>


                <v-card-actions class="d-flex justify-center">

                    <v-btn color="#29CC39" @click="addContent" elevation="0" rounded>
                        <b>ยืนยันการเพิ่มเนื้อหา</b>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'default',
    data() {
        return {

            contentId: null,
            dialog_detail: false,
            isLoading: true,
            searchSubject: '',
            subjectSelected: null,

            subjectName: null,
            level: null,

            level_select: [],
            headers: [
                { text: 'บทที่.', value: 'index' },
                {
                    text: 'Subject',
                    value: 'name',
                },
                { text: 'ชื่อบท', value: 'level' },
                { text: 'รายละเอียดเนื้อหา', value: '' },
                { text: 'ข้อมูล', value: 'actions', sortable: false, align: 'center' },
            ],

            subjects: [],
            subjectContents: [],

        }
    },
    computed: {


    },
    mounted() {
        const value = this.$route.query.contentId;
        this.contentId = value;
        this.initialize();
    },
    components: {

        pageLoader
    },

    watch: {

    },
    methods: {

        openSnackbar(status, message) {
            this.showSnackbar = true;
            this.snackbarMessage = message;
            this.snackbarColor = status;
        },

        addContentDialog() {
            this.dialog_detail = true;
        },

        viewItem(item) {
            this.$router.push({ path: 'content/detail', query: { contentId: item.key } });
            //this.$router.push({ name: 'admin-teacher-detail', params: { itemId: item } });
        },
        async addContent() {
            let key_item = Math.floor(Math.random() * (1000000)) + 1;
            console.log(key_item)
            const db = this.$fireModule.database();
            const contentExists = await this.checkIfContentExists(this.subjectSelected, this.level);

            if (contentExists) {
                console.log('Content with the same name and level already exists. Not adding to the database.');
                return;
            }
            await db.ref(`contents/${key_item}`).set({
                name: this.subjectSelected,
                level: this.level,
                key_subject: this.subject
            })
                .then(() => {
                    console.log('Content added to Firebase successfully!');
                })
                .catch((error) => {
                    console.error('Error adding content to Firebase:', error);
                });
        },

        async checkIfContentExists(name, level) {

            const db = this.$fireModule.database();
            const snapshot = await db.ref('contents')
                .orderByChild('name')
                .equalTo(name)
                .once('value');

            let exists = false;
            snapshot.forEach((childSnapshot) => {
                const content = childSnapshot.val();
                if (content.level === level) {
                    exists = true;
                    return;
                }
            });
            return exists;
        },
        initialize() {
            const db = this.$fireModule.database();
            db.ref(`contents/${this.contentId}`).on("value", (snapshot) => {
                let item = [];
                let num = 0;
                this.subjects = [];
                const childData = snapshot.val();
                this.subjectName = childData.name;
                this.level = childData.level;
            })


        },



        // search_level_select() {
        //     const db = this.$fireModule.database();
        //     db.ref(`subject_all/${this.subject}`).on("value", (snapshot) => {
        //         const childData = snapshot.val();

        //         this.level_select = childData.level;
        //         this.subjectSelected = childData.name;
        //     })
        // },




    },
}
</script>

<style>
.userSpan {
    background-color: rgb(243 244 246);
    color: #000000;
    border-radius: 12px;
    padding: 4px 10px 4px 10px;

}

.editButton {
    border-radius: 32px;
    border: 1px solid #000;
    background: #FFF;
    justify-content: center;
    align-items: center;
    gap: 12px;

    font-size: 20px;
}

.editButton span,
.editButton v-icon {
    color: #C3CAD9;
    text-transform: none;
}

.editButton:hover span {
    color: #000000;
    text-transform: none;
}

hr.solid {
    border-top: 3px solid black;
    border-width: 3px;
    opacity: 1;
}

.header {
    font-size: 25px;
}
</style>