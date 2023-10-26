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

            <v-card class="elevation-0 rounded-t-xl px-5 pt-3" style="background-color:#B6A7A2">
                <v-container fluid>


                    <div class="parent-div">
                        <h5><b>บทที่ {{ selectChapterId }}</b></h5>

                        <div class="child-div">
                            <v-btn color="black" class="text-white me-3" @click="prevItem()">บทเรียนก่อนหน้า </v-btn>
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
                    <v-card v-if="selectLink" class="elevation-0  px-5 rounded-xl " style="background-color:#FFF">
                        <div class="video-container ">
                            <div>
                                <iframe class="video-iframe py-2" :src="selectLink" title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                            </div>


                        </div>
                    </v-card>
                    <div class="tab mt-3">
                        <button class="tablinks active" @click="openTab('รายละเอียดเนื้อหา')"
                            active>รายละเอียดเนื้อหา</button>
                        <button class="tablinks" @click="openTab('เรื่องที่เรียน')">เรื่องที่เรียน</button>

                    </div>
                    <div id="รายละเอียดเนื้อหา" class="tabcontent mt-5" style="display: block;">
                        <v-card class="elevation-0  px-5 rounded-xl "
                            style="background-color:#FFF; min-height: 90px; display: flex; align-items: center;">
                            <v-card-text style="font-size: 16px;font-weight: 300;">{{ selectContent.chapterDetail }}
                            </v-card-text>
                        </v-card>
                    </div>

                    <div id="เรื่องที่เรียน" class="tabcontent mt-5">
                        <v-card class="elevation-0  px-5 rounded-xl "
                            style="background-color:#FFF; min-height: 90px; display: flex; align-items: center;">
                            <v-card-text>
                                <div class="label">
                                    <label>ชื่อเรื่องที่เรียน</label>
                                    <div class="chapter-section">{{ selectChapter }}</div>
                                </div>
                                <div class="label">
                                    <label>เกี่ยวกับเรื่องที่เรียน</label>
                                    <div class="chapter-section">{{ selectContent.chapterDetail }}</div>
                                </div>
                                <hr style="opacity: 1;">

                                <label>สื่อการสอน</label>
                                <div v-for="contentMaterial in contentMaterials" v-if="contentMaterial.link !== undefined">
                                    <div class="d-flex justify-space-between mt-2">
                                        <div class="chapter-section">{{ contentMaterial.name }}</div>

                                        <v-btn color="black" class="text-white"
                                            @click="getLink(contentMaterial.link)">เล่นวีดิโอ <span
                                                class="mdi mdi-youtube text-h6"></span></v-btn>
                                    </div>

                                </div>
                                <label class="mt-2">เอกสารประกอบการเรียน (PDF)</label>
                                <div v-for="contentMaterial in contentMaterials">
                                    <div v-if="contentMaterial.pdfFileUrl !== undefined"
                                        class="d-flex justify-space-between mt-2">
                                        <div class="chapter-section">{{ contentMaterial.name }}</div>
                                        <v-btn color="black" class="text-white"
                                            @click="downloadFile(contentMaterial.pdfFileUrl)">
                                            ดาวน์โหลดเอกสาร <span class="mdi mdi-file text-h6"></span>
                                        </v-btn>
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
                { text: 'จำนวนเอกสาร', value: 'fileCount' },
                { text: 'จำนวนวิดีโอ', value: 'linkCount' },
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

        viewItem(item) {

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


                this.contentMaterials = items;
            })
        },

        nextItem() {
            this.selectLink = null;
            this.viewMode = 'detail';
            const nextChapterId = parseInt(this.selectChapterId) + 1;
            if (nextChapterId > this.subjectContents.length) {
                return;
            }
            const db = this.$fireModule.database();
            db.ref(`contents/${this.contentId}/subject_contents/${nextChapterId}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.selectChapterId = nextChapterId;
                this.selectChapter = childData.chapterName;
                this.selectContent = childData;
            })
            db.ref(`contents/${this.contentId}/subject_contents/${nextChapterId}/material`).on("value", (snapshot) => {
                let items = [];

                const childData = snapshot.val();

                for (const key in childData) {
                    const item = childData[key];
                    items.push({ key, ...item });
                }

                this.contentMaterials = items;
            })
        },
        prevItem() {
            this.selectLink = null;
            this.viewMode = 'detail';
            const prevChapterId = parseInt(this.selectChapterId) - 1;
            if (prevChapterId == 0) {
                return;
            }
            const db = this.$fireModule.database();
            db.ref(`contents/${this.contentId}/subject_contents/${prevChapterId}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.selectChapterId = prevChapterId;
                this.selectChapter = childData.chapterName;
                this.selectContent = childData;
            })
            db.ref(`contents/${this.contentId}/subject_contents/${prevChapterId}/material`).on("value", (snapshot) => {
                let items = [];


                const childData = snapshot.val();

                for (const key in childData) {
                    const item = childData[key];
                    items.push({ key, ...item });
                }

                this.contentMaterials = items;
            })
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
                var fileCount = 0;
                var linkCount = 0;
                for (const key in childDataName.material) {

                    if (childDataName.material[key].pdfFileUrl !== undefined) {
                        fileCount = fileCount + 1;
                    }
                    if (childDataName.material[key].link !== undefined) {
                        linkCount = linkCount + 1;
                    }
                }
                const item = {
                    chapterNumber: key,
                    chapterName: childDataName.chapterName,
                    chapterDetail: childDataName.chapterDetail,
                    annotation: childDataName.annotation,
                    fileCount: fileCount,
                    linkCount: linkCount
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

        downloadFile(pdfFileUrl) {
            window.open(pdfFileUrl, '_blank');
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

<style scoped>
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

hr {
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
}

.v-btn {
    border-radius: 10px;
    padding: 6px 12px;

}

.v-btn.v-size--default {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0px;
}

.v-icon {
    width: 22px;
    height: 15px;
}
</style>

<style scoped>
/* desktop */
@media (min-width:768px) {

    .parent-div {
        display: flex;
        justify-content: space-between;

    }

    .chapter-section {
        font-size: 24px;
        color: #322E2B;
        font-weight: 500;
    }
}

/* mobile */
@media (max-width:767px) {

    /* markup */
    span {
        letter-spacing: 0px;
    }

    b {
        font-size: 20px;

        font-weight: 500;
    }

    .chapter-section {
        font-size: 16px;
        color: #322E2B;
        font-weight: 500;
    }

    .child-div {
        display: flex;
        justify-content: flex-end;

        align-items: center;

    }

    /* css */
    .parent-div {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;

    }

    /* vuetify */
    .v-btn {
        border-radius: 10px;
        padding: 6px 12px;

    }

    .v-btn.v-size--default {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0px;
    }

    .v-icon {
        width: 22px;
        height: 15px;
    }


}
</style>