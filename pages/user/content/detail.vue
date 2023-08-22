<template>
    <div>
        <div v-if="viewMode == 'list'">

            <div style="display: flex; justify-content: space-between;">
                <h1 class="font-weight-bold">คลังเนื้อหา</h1>
                <v-btn to="/user/content" router exact>ย้อนกลับ</v-btn>
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
                        <v-col cols="12" sm="3" class="text-right">

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
                    <v-icon color="#B6A7A2" class="mr-2" @click="viewItem(item)" style="text-decoration: underline;">
                        mdi-eye
                    </v-icon>

                </template>
            </v-data-table>


        </div>

        <div v-else-if="viewMode == 'detail'">

            <div style="display: flex; justify-content: space-between;">
                <h1 class="font-weight-bold">คลังเนื้อหา</h1>
                <v-btn @click="back" router exact>ย้อนกลับ</v-btn>
            </div>
            <v-card class="elevation-0 rounded-t-xl px-5 pt-3" style="background-color:#EBE4DE">
                <v-container fluid>

                    <div class="d-flex justify-space-between mt-2">
                        <h5><b>บทที่ {{ selectChapterId }}</b></h5>
                        <div> <v-btn color="black" class="text-white" @click="prevItem()">บทเรียนก่อนหน้า </v-btn>
                            <v-btn color="black" class="text-white" @click="nextItem()">บทเรียนถัดไป </v-btn>
                        </div>

                    </div>
                </v-container>


            </v-card>
            <v-toolbar flat>
                <v-toolbar-title class=""><b>ชื่อบท {{ selectChapter }}</b></v-toolbar-title>
            </v-toolbar>
            <v-card class="elevation-0  px-5" style="background-color:#EBE4DE">


                <v-card-text>
                    <style>
                        .video-container {
                            position: relative;
                            padding-bottom: calc(56.25% + 10px);
                            height: 0;
                            overflow: hidden;
                        }

                        .video-iframe {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                        }
                    </style>
                    <v-card class="elevation-0  px-5 rounded-xl " style="background-color:#FFF">
                        <div class="video-container ">
                            <div v-if="selectLink">
                                <iframe class="video-iframe py-2" :src="selectLink" title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                            </div>
                            <div v-else>
                                <div style="background-color:#FFF; display: flex; align-items: center;">
                                    <h3>ไม่มีเนื้อหาคลิปที่เลือก</h3>
                                </div>
                            </div>

                        </div>
                    </v-card>
                    <div class="tab mt-3">
                        <button class="tablinks" @click="openTab('รายละเอียดเนื้อหา')" active>รายละเอียดเนื้อหา</button>
                        <button class="tablinks" @click="openTab('เรื่องที่เรียน')" id="defaultOpen">เรื่องที่เรียน</button>

                    </div>
                    <div id="รายละเอียดเนื้อหา" class="tabcontent mt-5">


                        <v-card class="elevation-0  px-5 rounded-xl "
                            style="background-color:#FFF; min-height: 90px; display: flex; align-items: center;">
                            <h3> {{ selectContent.chapterDetail }}</h3>
                        </v-card>
                    </div>

                    <div id="เรื่องที่เรียน" class="tabcontent mt-5">
                        <v-card class="elevation-0  px-5 rounded-xl "
                            style="background-color:#FFF; min-height: 90px; display: flex; align-items: center;">
                            <v-card-text>
                                <div class="label">
                                    <label>ชื่อเรื่องที่เรียน</label>
                                    <h3>{{ selectChapter }}</h3>
                                </div>
                                <div class="label">
                                    <label>เกี่ยวกับเรื่องที่เรียน</label>
                                    <h3>{{ selectContent.chapterDetail }}</h3>
                                </div>
                                <hr>

                                <label>Video</label>
                                <div v-for="contentMaterial in contentMaterials" v-if="contentMaterial.link !== undefined">
                                    <div class="d-flex justify-space-between mt-2">
                                        <h5>{{ contentMaterial.name }}</h5>

                                        <v-btn color="black" class="text-white"
                                            @click="getLink(contentMaterial.link)">เล่นวีดิโอ <span
                                                class="mdi mdi-youtube text-h6"></span></v-btn>
                                    </div>

                                </div>
                                <label>เอกสารประกอบการเรียน (PDF)</label>
                                <div v-for="contentMaterial in contentMaterials"
                                    v-if="contentMaterial.pdfFileUrl !== undefined">
                                    <div class="d-flex justify-space-between mt-2">
                                        <h5>{{ contentMaterial.name }}</h5>
                                        <v-btn color="black" class="text-white">ดาวน์โหลดเอกสาร <span
                                                class="mdi mdi-file text-h6"></span></v-btn>
                                    </div>

                                </div>
                            </v-card-text>

                            <!-- <h3> {{ contentMaterials }}</h3> -->
                        </v-card>
                    </div>


                </v-card-text>
            </v-card>
        </div>

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
                                <v-icon color="#B6A7A2" style="text-decoration: underline;" class="mr-2"
                                    @click="openEditDialog(item)">
                                    mdi-eye
                                </v-icon>



                            </template>
                        </v-data-table>
                    </v-container>
                </v-card-text>





            </v-card>
        </v-dialog>

        <v-dialog v-model="viewmaterial" max-width="600px">
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
                                <v-text-field label="ชื่อเรื่องที่เรียน" v-model="selectMaterial.name" disabled
                                    :rules="nameRules"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select :items="materialTypes" label="ประเภทสื่อ" disabled
                                    v-model="selectMaterial.type"></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="ชื่อไฟล์/วิดีโอ" v-model="selectMaterial.fileName"
                                    disabled></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="รายละเอียดเรื่องที่เรียน" v-model="selectMaterial.detail"
                                    disabled></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="หมายเหตุ" v-model="selectMaterial.annotation" disabled></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <label v-if="selectMaterial.type === 'Video Link'">Link
                                </label><br>
                                <a v-if="selectMaterial.type === 'Video Link'" :href="selectMaterial.link"
                                    target="_blank">{{ selectMaterial.link }}</a>

                                <label v-if="selectMaterial.type === 'เอกสารประกอบการเรียน (Pdf)'">เอกสารประกอบการเรียน
                                    (Pdf)</label><br>
                                <a v-if="selectMaterial.type === 'เอกสารประกอบการเรียน (Pdf)'" href=""
                                    @click="downloadFile()"> View</a>

                            </v-col>
                            <v-col cols="6">

                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>



            </v-card>
        </v-dialog>
    </div>
</template>


<script>
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'userNav',
    data() {
        return {
            viewMode: 'list',
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            selectItem: {},
            selectMaterial: {},
            selectItemDelete: null,
            //temp
            selectChapterNumber: null,

            contentId: null,

            content_dialog: false,

            viewmaterial: false,
            isLoading: true,
            searchSubject: '',
            subjectSelected: null,

            subjectName: null,
            level: null,
            selectChapter: null,
            selectChapterId: null,
            selectContent: null,
            selectLink: null,

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

        viewItem(item) {
            console.log('items')
            this.viewMode = 'detail';

            this.selectChapter = item.chapterName;
            this.selectContent = item;

            this.selectChapterId = item.chapterNumber;
            const db = this.$fireModule.database();
            db.ref(`contents/${this.contentId}/subject_contents/${this.selectChapterId}/material`).on("value", (snapshot) => {
                let items = [];

                this.subjects = [];
                const childData = snapshot.val();

                for (const key in childData) {
                    const item = childData[key];
                    items.push({ key, ...item });
                }

                console.log(items)
                this.contentMaterials = items;
            })
        },

        nextItem() {
            console.log('items')
            this.viewMode = 'detail';
            //this.content_dialog = true;

            const nextChapterId = parseInt(this.selectChapterId) + 1;
            //this.selectChapterId = item.chapterNumber;
            const db = this.$fireModule.database();
            db.ref(`contents/${this.contentId}/subject_contents/${nextChapterId}`).on("value", (snapshot) => {
                let items = [];

                this.subjects = [];
                const childData = snapshot.val();

                for (const key in childData) {
                    const item = childData[key];
                    items.push({ key, ...item });
                }

                console.log(items)
                this.contentMaterials = items;
            })
            db.ref(`contents/${this.contentId}/subject_contents/${nextChapterId}/material`).on("value", (snapshot) => {
                let items = [];

                this.subjects = [];
                const childData = snapshot.val();

                for (const key in childData) {
                    const item = childData[key];
                    items.push({ key, ...item });
                }

                console.log(items)
                this.contentMaterials = items;
            })
        },
        prevItem() {
            console.log('prev')
            this.viewMode = 'detail';


            const nextChapterId = parseInt(this.selectChapterId) - 1;

            const db = this.$fireModule.database();
            db.ref(`contents/${this.contentId}/subject_contents/${nextChapterId}/material`).on("value", (snapshot) => {
                let items = [];

                this.subjects = [];
                const childData = snapshot.val();

                for (const key in childData) {
                    const item = childData[key];
                    items.push({ key, ...item });
                }

                console.log(items)
                this.contentMaterials = items;
            })
        },
        openEditDialog(item) {
            this.viewmaterial = true;
            this.selectMaterial = item;
            console.log(item)
        },
        addMaterialDialog() {
            this.material_dialog = true;
        },






        openEditDialog(item) {
            this.viewmaterial = true;
            this.selectMaterial = item;
            console.log(item)
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
        openTab(tabName) {
            const tabcontent = document.getElementsByClassName("tabcontent");
            for (let i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            const tablinks = document.getElementsByClassName("tablinks");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.remove("active");
            }
            document.getElementById(tabName).style.display = "block";
            event.currentTarget.classList.add("active");

        },

        downloadFile() {
            window.open(this.selectMaterial.pdfFileUrl, '_blank');
        },
        getLink(link) {
            this.selectLink = link.replace("watch?v=", "embed/");
            console.log(this.selectLink)

        },
        back() {
            this.viewMode = 'list';
        }

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

.tab {
    overflow: hidden;
}

/* Style the buttons inside the tab */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
    background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
    display: none;
    padding: 6px 12px;


}
</style>