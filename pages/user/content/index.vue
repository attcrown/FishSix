<template>
    <div>

        <div style="max-width: 500px;">
            <h1 class="font-weight-bold">คลังเนื้อหา</h1>
        </div>
        <v-card class="elevation-16 rounded-t-xl px-5 pt-3" style="background-color:#EBE4DE">
            <v-container fluid>
                <h5><b>คลังเนื้อหา</b></h5>
                <v-row align="center">
                    <v-col cols="12" sm="3">
                        <v-text-field label="ชื่อวิชา" placeholder="ระบุวิชา" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field label="ระดับชั้น" placeholder="ระดับชั้น" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4"></v-col>
                    <v-col cols="12" sm="2">
                        <v-btn elevation="10" small color="#322E2B" style="color:white">ค้นหาข้อมูล<span
                                class="mdi mdi-magnify"></span></v-btn>
                    </v-col>
                </v-row>
            </v-container>
            <!-- <v-container fluid>
                <h3>เพิ่มระดับการศึกษา /ลบระดับการศึกษา</h3>
                <v-row align="center">
                    <v-col cols="12" sm="3">
                        <v-text-field label="ตัวย่อระดับการศึกษา" placeholder="" v-model="name_level" @input="check_level()"></v-text-field>
                    </v-col>                    
                    <v-col cols="12" sm="3">
                        <v-btn elevation="10" outline-success large :loading="loading_level" @click="save_submit_level()">SAVE</v-btn>
                        <v-btn elevation="10" outline-success large :loading="loading_level" @click="del_level()">DELETE</v-btn>
                    </v-col>
                </v-row>
            </v-container> -->
        </v-card>


        <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="index" class="elevation-16 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="ms-4"><b>เนื้อหารายวิชา</b></v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>


                </v-toolbar>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->

        </v-data-table>
    </div>
</template>


<script>
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'userNav',
    data() {
        return {


            isLoading: true,



        }
    },
    computed: {
        formattedTotalHour() {
            if (this.totalHour === null || this.totalHour === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.totalHour);
            const minutes = ((this.totalHour - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }


        },
        formattedStudyHour() {
            if (this.studyHour === null || this.studyHour === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.studyHour);
            const minutes = ((this.studyHour - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },
        formattedHourLeft() {
            if (this.hourLeft === null || this.hourLeft === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.hourLeft);
            const minutes = ((this.hourLeft - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },

    },
    mounted() {
        this.fullName();
        this.readdata();
    },
    components: {

        pageLoader
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        getout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/login");
        },
        openSnackbar(status, message) {
            this.showSnackbar = true;
            this.snackbarMessage = message;
            this.snackbarColor = status;
        },

        async readdata() {
            console.log('ทำงาน');
            const db = this.$fireModule.database();
            await db.ref(`user/${this.keyuser}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.profilePic = childData.profilePic || null;
                this.studentId = childData.studentId || null;
                this.firstName = childData.firstName || null;
                this.lastName = childData.lastName || null;
                this.firstNameDisplay = childData.firstName || null;
                this.lastNameDisplay = childData.lastName || null;
                this.nicknameDisplay = childData.nickname || null;
                this.nickname = childData.nickname || null;
                this.school = childData.school || null;
                this.gender = childData.gender || null;
                this.birthDate = childData.birthDate || null;

                this.totalHour = childData.totalHour || 0;
                this.studyHour = childData.studyHour || 0;
                this.hourLeft = childData.hourLeft || 0;

                this.classType = childData.classType || null;
                this.courseHour = childData.courseHour || null;
                this.freeHour = childData.freeHour || null;
                this.wantedTeacher = childData.wantedTeacher || null;
                this.annotation = childData.annotation || null;

                this.education = childData.education || null;
                this.studentMobile = childData.studentMobile || null;
                this.parentMobile = childData.parentMobile || null;

                try {
                    this.address.houseNo = childData.address.houseNo || null;
                    this.address.tambon = childData.address.tambon || null;
                    this.address.amphoe = childData.address.amphoe || null;
                    this.address.province = childData.address.province || null;
                    this.address.postal = childData.address.postal || null;
                } catch (error) {
                    this.isLoading = false;
                }

                this.isLoading = false;


            })

        },

        validateDetailEdit() {
            return this.$refs.detailForm.validate();

        },
        validateNameEdit() {
            return this.$refs.nameForm.validate();

        },
        validateAddressEdit() {
            return this.$refs.addressForm.validate();
        },

        save(date) {
            this.$refs.menu.save(date)
        },

        async saveName() {
            const db = this.$fireModule.database();
            this.loading = true;
            // Check if the user has uploaded a profile picture
            if (this.profilePicUpload) {
                const storageRef = this.$fireModule.storage().ref();
                const userRef = storageRef.child(`user/${this.keyuser}/profilePic.jpg`);

                try {
                    // Upload the file to Firebase Storage
                    const snapshot = await userRef.put(this.profilePicUpload);

                    // Get the download URL of the uploaded file
                    const downloadURL = await snapshot.ref.getDownloadURL();

                    // Update the profile picture in the database
                    await db.ref(`user/${this.keyuser}`).update({
                        profilePic: downloadURL,
                    });
                } catch (error) {
                    this.openSnackbar("error", 'เกิดข้อผิดพลาดในการอัพโหลดรูป!');
                }
            }
            // Update the other user details
            try {
                const db = this.$fireModule.database();
                this.loading = true;
                if (this.validateNameEdit()) {

                    await db.ref(`user/${this.keyuser}`).update({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        nickname: this.nickname,
                    });
                    this.openSnackbar("success", 'แก้ไขข้อมูลเรียบร้อย');
                    this.readdata();
                }
                else {
                    this.openSnackbar("error", 'กรุณากรอกข้อมูลให้ถูกต้อง');
                }
            } catch (error) {
                console.error('Error updating user details:', error);
                this.openSnackbar("error", 'เกิดข้อผิดพลาดในการแก้ไขชื่อ');
            } finally {
                this.loading = false;
            }
        },
        async saveDetail() {
            const db = this.$fireModule.database();
            this.loading = true;
            // Check if the user has uploaded a profile picture
            if (this.profilePicUpload) {
                const storageRef = this.$fireModule.storage().ref();
                const userRef = storageRef.child(`user/${this.keyuser}/profilePic.jpg`);

                try {
                    // Upload the file to Firebase Storage
                    const snapshot = await userRef.put(this.profilePicUpload);

                    // Get the download URL of the uploaded file
                    const downloadURL = await snapshot.ref.getDownloadURL();

                    // Update the profile picture in the database
                    await db.ref(`user/${this.keyuser}`).update({
                        profilePic: downloadURL,
                    });
                } catch (error) {
                    this.openSnackbar("error", 'เกิดข้อผิดพลาดในการอัพโหลดรูป!');
                }
            }

            // Update the other user details
            try {
                const db = this.$fireModule.database();
                this.loading = true;
                if (this.validateDetailEdit()) {
                    //edit Detail
                    await db.ref(`user/${this.keyuser}`).update({
                        school: this.school,
                        gender: this.gender,
                        birthDate: this.birthDate,
                        education: this.education,
                        studentMobile: this.studentMobile,
                        parentMobile: this.parentMobile,
                    });

                    this.openSnackbar("success", 'แก้ไขข้อมูลเรียบร้อย');
                    this.readdata();
                }
                else {
                    this.openSnackbar("error", 'กรุณากรอกข้อมูลให้ถูกต้อง');
                }
            } catch (error) {
                console.error('Error updating user details:', error);
                this.openSnackbar("error", 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
            } finally {
                this.loading = false;
            }
        },

        async saveAddress() {
            const db = this.$fireModule.database();
            this.loading = true;
            // Check if the user has uploaded a profile picture
            if (this.profilePicUpload && this.dialogEditName == true) {
                const storageRef = this.$fireModule.storage().ref();
                const userRef = storageRef.child(`user/${this.keyuser}/profilePic.jpg`);

                try {
                    // Upload the file to Firebase Storage
                    const snapshot = await userRef.put(this.profilePicUpload);

                    // Get the download URL of the uploaded file
                    const downloadURL = await snapshot.ref.getDownloadURL();

                    // Update the profile picture in the database
                    await db.ref(`user/${this.keyuser}`).update({
                        profilePic: downloadURL,
                    });
                } catch (error) {
                    this.openSnackbar("error", 'เกิดข้อผิดพลาดในการอัพโหลดรูป!');
                }
            }

            // Update the other user details
            try {
                const db = this.$fireModule.database();
                this.loading = true;
                if (this.validateAddressEdit()) {
                    //edit Name

                    //edit Address

                    await db.ref(`user/${this.keyuser}`).update({
                        address: this.address,

                    });

                    //edit Detail

                    this.openSnackbar("success", 'แก้ไขข้อมูลเรียบร้อย');
                    this.readdata();
                }
                else {
                    this.openSnackbar("error", 'กรุณากรอกข้อมูลให้ถูกต้อง');
                }
            } catch (error) {
                console.error('Error updating user details:', error);
                this.openSnackbar("error", 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
            } finally {
                this.loading = false;
            }
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
}</style>