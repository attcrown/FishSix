<template>
    <div class="mt-5">

   
        <div class="col p-0 d-flex justify-space-between">
            <h1 class="font-weight-bold">คลังเนื้อหา</h1>


                <v-btn to="/user/" router exact class="back-button">ย้อนกลับ
                    <v-icon color="black" class="ms-1">mdi-arrow-left</v-icon></v-btn>
                   
        </div>
        <v-card class="elevation-16 rounded-t-xl px-5 pt-3" style="background-color:#EBE4DE">
            <v-container fluid>
                <h5><b>คลังเนื้อหา</b></h5>
                <v-row align="center">
                    <v-col cols="12" sm="3">
                        <v-autocomplete label="วิชา" v-model="searchSubject" :items="subjects" item-text="name"
                            item-value="name">
                            <template #prepend>
                                <span class="mdi mdi-book-outline text-h6"></span>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field label="ระดับชั้น" placeholder="ระดับชั้น" required></v-text-field>
                    </v-col>


                </v-row>
            </v-container>

        </v-card>


        <v-data-table sort-by="index" :headers="headers" :search="searchSubject" :items="subjectContents"
            :items-per-page="-1" class="elevation-16 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="ms-4"><b>เนื้อหารายวิชา</b></v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>


                </v-toolbar>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item }">
                <div class="icon-container">
                    <v-icon color="#B6A7A2" class="mr-2" @click="viewItem(item)" style="text-decoration: underline;">
                        mdi-eye
                    </v-icon>
                </div>

            </template>
        </v-data-table>



    </div>
</template>


<script>
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'userNav',
    data() {
        return {

            keyuser: null,
            firstName: null,
            dialog_detail: false,
            dialog_delete: false,
            isLoading: true,
            searchSubject: '',
            subjectSelected: null,
            subject: null,
            level: null,
            level_select: [],
            subjectPermissions: {},
            headers: [
                { text: 'No.', value: 'index' },
                {
                    text: 'Subject',
                    value: 'name',
                },
                { text: 'Level', value: 'level' },
                { text: 'จำนวนบท', value: 'chapterCount' },

                { text: 'ดูข้อมูล', value: 'actions', sortable: false, align: 'center' },
            ],

            subjects: [],
            subjectContents: [],

        }
    },
    computed: {


    },
    mounted() {
        this.fullName();
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


        viewItem(item) {
            this.$router.push({ path: 'content/detail', query: { contentId: item.key } });
            
        },

        initialize() {
            const db = this.$fireModule.database();
            db.ref("subject_all/").on("value", (snapshot) => {
                let item = [];
                let num = 0;
                this.subjects = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    const subject = childData[key];
                    num += 1;
                    item.push({ name: subject.name, level: subject.level, key: key, index: num });

                }
                this.subjects = item;

            })
            db.ref(`studentHistory/${this.keyuser}`).on("value", (snapshot) => {

                let itemPermissions = [];
                let num = 0;
                this.subjectContents = [];
                const childData = snapshot.val();

                let item = [];
                for (const key in childData) {

                    const subjectData = childData[key];

                    num += 1;
                    itemPermissions.push({ subject: subjectData.subject, level: subjectData.level, keySubject: subjectData.keySubject });

                    db.ref("contents/").on("value", (snapshot) => {

                        let num = 0;

                        const contentData = snapshot.val();
                        for (const keyContent in contentData) {
                            const content = contentData[keyContent];

                            if ((content.key_subject == subjectData.keySubject) && (content.level == subjectData.level)) {
                                num += 1;
                                try {
                                    const chapterCount = Object.keys(content.subject_contents).length;
                                    item.push({ name: content.name, level: content.level, key: keyContent, keySubject: subjectData.keySubject, index: num, chapterCount: chapterCount });
                                } catch (error) {
                                    item.push({ name: content.name, level: content.level, key: keyContent, keySubject: subjectData.keySubject, index: num, chapterCount: 0 });
                                }

                            }
                        }
                        const filteredItem = item.filter((content, index, self) =>
                            index === self.findIndex(c => c.key === content.key)
                        );

                        this.subjectContents = filteredItem;


                    })
                }

                this.subjectPermissions = itemPermissions;

            })

        },


        search_level_select() {
            const db = this.$fireModule.database();
            db.ref(`subject_all/${this.subject}`).on("value", (snapshot) => {
                const childData = snapshot.val();

                this.level_select = childData.level;
                this.subjectSelected = childData.name;
            })
        },
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.firstName = sessionStorage.getItem('firstName') || '';
                this.keyuser = sessionStorage.getItem('lastName') || '';
            } else {
                this.firstName = localStorage.getItem('firstName') || '';
                this.keyuser = localStorage.getItem('lastName') || '';
            }
        },



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

hr.solid {
    border-top: 3px solid black;
    border-width: 3px;
    opacity: 1;
}

.header {
    font-size: 25px;
}

.icon-container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.icon-box {
    cursor: pointer;
    transition: transform 0.2s, color 0.2s;
}


.icon-box:hover {
    transform: translateY(-3px);
    color: #000000;

}

.hover-container {
    position: absolute;
    bottom: -26px;
    left: 50%;
    transform: translateX(-50%);

    visibility: hidden;
    transition: opacity 0.2s, transform 0.2s;
}

.icon-container:hover .hover-container {
    opacity: 1;
    visibility: visible;
    bottom: -40px;

}

.hover-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;

    color: rgb(0, 0, 0);
    border-radius: 4px;
    padding: 8px;
    width: 32px;
    height: 32px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
/* desktop */
@media (min-width:768px) {

    .parent-div {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        justify-content: space-between;

    }
}

/* mobile */
@media (max-width:767px) {

    /* markup */
    span {
        letter-spacing: 0px;
    }

    b {
        font-size: 12px;

        font-weight: 800;
    }



    /* css */





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