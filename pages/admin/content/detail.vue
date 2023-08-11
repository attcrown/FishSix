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
                        <v-text-field label="วิชา" v-model="subjectName" disabled>
                            <template #prepend>
                                <span class="mdi mdi-book-outline text-h6"></span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field label="ระดับชั้น" v-model="level" disabled placeholder="ระดับชั้น"
                            required></v-text-field>
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
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item }">
                <v-icon color="indigo" class="mr-2" @click="viewItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="black" class="mr-2" @click="viewMaterialDialog(item)">
                    mdi-file-pdf-box
                </v-icon>
                <v-icon color="red" @click="deleteChapter(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>


        <v-dialog v-model="dialog_detail" max-width="600px">

            <v-card class="p-4 rounded-xl">
                <v-card-title class="d-flex justify-space-between">
                    <span style="font-size: 16px">
                        <b>วิชา {{ subjectName }} | {{ level }}</b>

                    </span>

                    <v-btn fab dark small color="#37474F" @click="dialog_detail = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>

                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field type="number" min="0" label="บทที่" v-model="subjectChapter"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="ชื่อบท" v-model="chapterName"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="รายละเอียดเนื้อหา" v-model="chapterDetail"></v-text-field>
                            </v-col> <v-col cols="6">
                                <v-text-field label="หมายเหตุ" v-model="annotation"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>


                <v-card-actions class="d-flex justify-center">

                    <v-btn color=green @click="addContent" elevation="0" rounded>
                        <b>บันทึก</b>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="content_dialog" max-width="60%">
            <v-card class="p-4 rounded-xl">
                <v-card-title>
                    <span style="font-size: 24px">
                        <b>{{ subjectName }} | {{ level }} | {{ selectChapter }}</b>
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="content_dialog = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn elevation="10" small color="#322E2B" style="color:white"
                        @click="addMaterialDialog">เพิ่มสื่อการสอน<span class="mdi mdi-plus"></span></v-btn>
                </v-card-actions>

                <v-card-text>
                    <v-container>
                        <v-data-table :headers="materialHeaders" :items="contentMaterials" hide-default-footer>
                            <template v-slot:top>
                                <v-toolbar flat>

                                </v-toolbar>
                            </template>
                             <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item }">
                <v-icon color="indigo" class="mr-2" @click="viewItem(item)">
                    mdi-pencil
                </v-icon>
             
                <v-icon color="red" @click="deleteChapter(item)">
                    mdi-delete
                </v-icon>
            </template>
                        </v-data-table>
                    </v-container>
                </v-card-text>





            </v-card>
        </v-dialog>

        <v-dialog v-model="material_dialog" max-width="600px">
            <v-card class="p-4 rounded-xl">
                <v-card-title>
                    <span style="font-size: 24px">
                        <b>{{ subjectName }} | {{ level }} | {{ selectChapter }} | ชื่อเรื่อง</b>
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="material_dialog = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-text-field label="ชื่อเรื่องที่เรียน" v-model="MaterialName"
                                    :rules="nameRules"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select :items="materialTypes" label="ประเภทสื่อ" v-model="materialType"></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="ชื่อไฟล์/วิดีโอ" v-model="materialFileName"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="รายละเอียดเรื่องที่เรียน" v-model="materialDetail"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="หมายเหตุ" v-model="materialAnnotation"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-if="materialType === 'Video Link'" label="ลิงก์"
                                    v-model="materialLink"></v-text-field>
                                <v-file-input v-if="materialType === 'เอกสารประกอบการเรียน (Pdf)'" label='ไฟล์ PDF'
                                    v-model="materialFile" accept="image/*, pdf"></v-file-input>
                            </v-col>
                            <v-col cols="6">

                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="#37474F" @click="material_dialog = false">
                        ย้อนกลับ<span class="mdi mdi-keyboard-backspace text-h6"></span>
                    </v-btn>
                    <v-btn rounded color="#29CC39" dark class="mt-5 mb-5" @click="addMaterial()">
                        บันทึก <span class="mdi mdi-content-save text-h6"></span>
                    </v-btn>

                    <v-spacer></v-spacer>
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
            content_dialog: false,
            material_dialog: false,
            isLoading: true,
            searchSubject: '',
            subjectSelected: null,

            subjectName: null,
            level: null,
            selectChapter: null,
            selectChapterId: null,

            subjectChapter: null,
            chapterName: null,
            chapterDetail: null,
            annotation: null,

            MaterialName: null,
            materialType: null,
            materialFileName: null,
            materialDetail: null,
            materialAnnotation: null,

            materialLink: '',
            materialFile: null,

            level_select: [],
            headers: [
                { text: 'บทที่.', value: 'chapterNumber', width: '5%' },

                { text: 'ชื่อบท', value: 'chapterName' },
                { text: 'รายละเอียดเนื้อหา', value: 'chapterDetail' },
                { text: 'ข้อมูล', value: 'actions', sortable: false, align: 'center' },
            ],

            materialHeaders: [
          
                { text: 'ประเภทสื่อ', value: 'type' },
                { text: 'ชื่อเรื่องที่เรียน', value: 'name' },
                { text: 'ชื่อไฟล์ / วิดีโอ', value: 'fileName' },
                { text: 'รายละเอียด', value: 'detail' },
                { text: 'ข้อมูล', value: 'actions', sortable: false, align: 'center' },
            ],

            materialTypes: [
                "เอกสารประกอบการเรียน (Pdf)",
                "Video Link"
            ],
            subjects: [],
            subjectContents: [],
            contentMaterials: [],
            subjectContentsCount: null,

            //rules
            nameRules: [
                v => !!v || 'กรุณากรอกชื่อเรื่องที่เรียน'
            ],

        }
    },
    computed: {


    },
    mounted() {
        const value = this.$route.query.contentId;
        this.contentId = value;
        this.initialize();
        console.log(this.contentId)
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


        async viewMaterialDialog(item) {
            this.content_dialog = true;
            this.selectChapter = item.chapterName;
            this.selectChapterId = item.chapterNumber;
            const db = this.$fireModule.database();
            await db.ref(`contents/${this.contentId}/subject_contents/${this.selectChapterId}/material`).on("value", (snapshot) => {
                let items = [];
                let num = 0;
                this.subjects = [];
                const childData = snapshot.val();
         
                for (const key in childData){
                    const item = childData[key]; 
                    items.push(item);
                }
                console.log(items)
                this.contentMaterials = items;
            })
        },

        addMaterialDialog() {
            this.material_dialog = true;
        },


        viewItem(item) {
            this.$router.push({ path: 'content/detail', query: { contentId: item.key } });
            //this.$router.push({ name: 'admin-teacher-detail', params: { itemId: item } });
        },
        async addContent() {
            const db = this.$fireModule.database();

            const chapterRef = db.ref(`contents/${this.contentId}/subject_contents/${this.subjectChapter}/`);
            const snapshot = await chapterRef.once('value');
            const chapterExists = snapshot.exists();

            if (!chapterExists) {
                const chapterData = {
                    chapterName: this.chapterName,
                    chapterDetail: this.chapterDetail,
                    annotation: this.annotation
                };

                try {
                    await chapterRef.set(chapterData);
                    console.log('Content added to Firebase successfully!');
                } catch (error) {
                    console.error('Error adding content to Firebase:', error);
                }
            } else {
                console.log('Chapter already exists in Firebase. Not adding content.');
            }
        },

        async addMaterial() {
            const db = this.$fireModule.database();

            console.log(this.selectChapterId)
            const chapterRef = db.ref(`contents/${this.contentId}/subject_contents/${this.selectChapterId}/material/`);
            const newMaterial = {
                name: this.MaterialName,
                type: this.materialType,
                fileName: this.materialFileName,
                detail: this.materialDetail,
                annotation: this.materialAnnotation,
                link: this.materialLink || null,

            };
            if (this.materialType === 'เอกสารประกอบการเรียน (Pdf)' && this.materialFile) {
                const storageRef = this.$fireModule.storage().ref();
                const contentRef = storageRef.child(`contents/${this.contentId}/subject_contents/${this.selectChapterId}/`);
                const snapshot = await contentRef.put(this.materialFile);
                const downloadURL = await snapshot.ref.getDownloadURL();
                newMaterial.pdfFileUrl = downloadURL;
            }

            await chapterRef.push(newMaterial);

            this.MaterialName = '';
            this.materialType = null;
            this.materialFileName = '';
            this.materialDetail = '';
            this.materialAnnotation = '';
            this.materialFile = '';
            newMaterial.pdfFileUrl = null;
            this.materialLink = '';


        },

        async deleteChapter(item) {
            const db = this.$fireModule.database();

            const chapterRef = db.ref(`contents/${this.contentId}/subject_contents/${item.chapterNumber}/`);

            const snapshot = await chapterRef.once('value');
            const chapterExists = snapshot.exists();

            if (chapterExists) {
                try {
                    await chapterRef.remove();
                    console.log('Chapter deleted from Firebase successfully!');
                } catch (error) {
                    console.error('Error deleting chapter from Firebase:', error);
                }
            } else {
                console.log('Chapter does not exist in Firebase. Nothing to delete.');
            }
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
        async initialize() {
            const db = this.$fireModule.database();
            await db.ref(`contents/${this.contentId}`).on("value", (snapshot) => {
                let item = [];
                let num = 0;
                this.subjects = [];
                const childData = snapshot.val();
                this.subjectName = childData.name;
                this.level = childData.level;
                //this.subjectContents = childData.subject_contents;
            })

            const snapshot = await db.ref(`contents/${this.contentId}/subject_contents`).once("value");
            const childContentsData = snapshot.val();
            const subjects = [];

            for (const key in childContentsData) {
                const snapshotName = await db.ref(`contents/${this.contentId}/subject_contents/${key}`).once("value");

                const childDataName = snapshotName.val();

                const item = {
                    chapterNumber: key,
                    chapterName: childDataName.chapterName,
                    chapterDetail: childDataName.chapterDetail,
                    annotation: childDataName.annotation
                };

                subjects.push(item);
            }

            this.subjectContents = subjects;
            console.log(this.subjectContents)

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