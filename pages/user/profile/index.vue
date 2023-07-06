<template>
    <div class="container-fluid">
        <div class="col d-flex justify-content-center">
            <v-row>
                <center>
                    <div style="max-width: 500px;">
                        <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                    </div>
                </center>

                <v-col cols="12">
                    <div class="text-center">
                        <div>
                            <v-avatar :size=iconSize>
                                <v-progress-circular v-if="isLoading" :size="64" :width="6" color="primary"
                                    indeterminate></v-progress-circular>
                                <img v-if="!isLoading" :src=profilePic alt="รูปโปรไฟล์">

                            </v-avatar>
                        </div>
                    </div>
                </v-col>

                <v-col cols="12">
                    <div class="text-center">
                        <strong class="header">&nbsp;คุณ {{ firstNameDisplay }} {{ lastNameDisplay }}
                        </strong> <br>
                        <span class="userSpan">ผู้เรียน</span>
                    </div>
                </v-col>

                <v-col cols="6">
                    <v-card class="mt-2">
                        <v-card-title class="font-weight-bold header justify-center">ชั่วโมงเรียนที่เหลือ</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-row>
                                <v-col class="text-h2 text-center" cols="4">
                                    <span class=" font-weight-black text-black">0</span>
                                    <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                    <div class="text-h6 font-semibold text-black">Flipclass online</div>
                                </v-col>
                                <v-col class="text-h2 text-center" cols="4">
                                    <span class=" font-weight-black text-black">0</span>
                                    <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                    <div class="text-h6 font-semibold text-black">Flipclass สาขา</div>
                                </v-col>
                                <v-col class="text-h2 text-center" cols="4">
                                    <span class=" font-weight-black text-black">0</span>
                                    <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                    <div class="text-h6 font-semibold text-black">Active class</div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">

                    <v-card class="mt-2">

                        <v-card-title class="font-weight-bold header justify-center">แก้ไขข้อมูลผู้ใช้</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-card-text v-if="isLoading" class="text-center">
                                <v-progress-circular :size="64" :width="6" color="primary"
                                    indeterminate></v-progress-circular>
                            </v-card-text>
                            <v-form ref="detailForm" v-if="!isLoading" @submit.prevent="saveDetail">
                                <v-row>
                                    <v-col cols="3">
                                        <v-text-field label="ชื่อ" name="firstName" v-model="firstName" :rules="nameRules"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field label="นามสกุล" name="lastName" v-model="lastName"
                                            :rules="nameRules"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="ชื่อเล่น" name="nickname" v-model="nickname"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="โรงเรียน" name="school" v-model="school"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select label="เพศ" name="gender" v-model="gender" :items="genders"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <div>

                                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                transition="scale-transition" offset-y min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="birthDate" label="วันเกิด" name="birthDate"
                                                        prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                        v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="birthDate" :active-picker.sync="activePicker"
                                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                                    min="1950-01-01" @change="save"></v-date-picker>
                                            </v-menu>
                                        </div>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select label="ระดับชั้น" name="education" v-model="education"
                                            :items="educationLevels" item-text="educationName"></v-select>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-textarea name="address" label="ที่อยู่" v-model="address" counter
                                            rows="2"></v-textarea>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="เบอร์โทรศัพท์" name="studentMobile" v-model="studentMobile"
                                            :rules="studentMobileRules"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="เบอร์โทรศัพท์ผู้ปกครอง" name="parentMobile"
                                            v-model="parentMobile" :rules="parentMobileRules"></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-file-input label="อัพโหลดรูปโปรไฟล์" v-model="profilePicUpload"
                                            accept="image/*"></v-file-input>
                                    </v-col>
                                    <v-col cols="4">

                                    </v-col><v-col cols="4">

                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn class="mx-3 text-white block" :loading="loading" color="indigo"
                                            :disabled="isLoading" @click="saveDetail"> บันทึกข้อมูล</v-btn>
                                    </v-col>

                                </v-row>
                            </v-form>

                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <label class=" text-h5 font-weight-bold">ประวัติคลาสที่เคยเรียน</label>
                    <v-simple-table fixed-header height="300px">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        ชื่อคลาส
                                    </th>
                                    <th class="text-center">
                                        ประเภท
                                    </th>
                                    <th class="text-center">
                                        สถานที่สอน
                                    </th>
                                    <th class="text-center">
                                        วันเวลาที่เข้าเรียน
                                    </th>
                                    <th class="text-center">
                                        จำนวนชั่วโมง
                                    </th>
                                    <th class="text-center">
                                        สถานะการประเมิน
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col cols="12">
                    <label class=" text-h5 font-weight-bold">ประวัติการสั่งซื้อ</label>
                    <v-simple-table fixed-header height="300px">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        วันที่ซื้อ
                                    </th>
                                    <th class="text-center">
                                        จำนวนชั่วโมง
                                    </th>
                                    <th class="text-center">
                                        ราคา
                                    </th>
                                    <th class="text-center">
                                        ช่องทางการชำระเงิน
                                    </th>
                                    <th class="text-center">
                                        สถานะการสั่งซื้อ
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>

            <v-snackbar :color="snackbarColor" v-model="showSnackbar" :timeout="3000">
                <p class="font-weight-medium" style="font-size: 18px;">
                    <v-icon class="mr-2">mdi-alert-circle</v-icon>{{ snackbarMessage }}
                </p>

            </v-snackbar>
        </div>
    </div>
</template>


<script>
export default {
    layout: 'userNav',
    data() {
        return {

            //status
            isLoading: true,
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            loading: false,
            activePicker: null,
            date: null,
            menu: false,
            isFormChange: false,

            //User data
            profilePic: null,
            profilePicUpload: null,
            iconSize: 120,
            firstNameDisplay: null,
            lastNameDisplay: null,
            firstName: null,
            lastName: null,
            nickname: null,
            school: null,
            gender: null,
            birthDate: null,
            address: null,
            education: null,
            studentMobile: null,
            parentMobile: null,

            //list of select
            educationLevels:
                [
                    { id: "grade1", educationName: "ป.1" },
                    { id: "grade2", educationName: "ป.2" },
                    { id: "grade3", educationName: "ป.3" },
                    { id: "grade4", educationName: "ป.4" },
                    { id: "grade5", educationName: "ป.5" },
                    { id: "grade6", educationName: "ป.6" },
                    { id: "grade7", educationName: "ม.1" },
                    { id: "grade8", educationName: "ม.2" },
                    { id: "grade9", educationName: "ม.3" },
                    { id: "grade10", educationName: "ม.4" },
                    { id: "grade11", educationName: "ม.5" },
                    { id: "grade12", educationName: "ม.6" },
                ],
            genders: [
                'ชาย',
                'หญิง',
                'ไม่ระบุ',
                'ไม่มีเพศ',
                'อื่นๆ'
            ],

            //rules
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            studentMobileRules: [
                value => !!value || 'กรุณากรอกเบอร์โทรศัพท์',
                value => /^0\d{9}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ],
            parentMobileRules: [
                value => !!value || 'กรุณากรอกเบอร์โทรศัพท์ผู้ปกครอง',
                value => /^0\d{9}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ผู้ปกครองไม่ถูกต้อง'
            ]
        }
    },

    mounted() {
        this.fullName();
        this.readdata();
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
                this.firstName = childData.firstName || null;
                this.lastName = childData.lastName || null;
                this.firstNameDisplay = childData.firstName || null;
                this.lastNameDisplay = childData.lastName || null;
                this.nickname = childData.nickname || null;
                this.school = childData.school || null;
                this.gender = childData.gender || null;
                this.birthDate = childData.birthDate || null;
                this.address = childData.address || null;
                this.education = childData.education || null;
                this.studentMobile = childData.studentMobile || null;
                this.parentMobile = childData.parentMobile || null;
                this.isLoading = false;

            })

        },

        validate() {
            return this.$refs.detailForm.validate()
        },

        save(date) {
            this.$refs.menu.save(date)
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
                if (this.validate()) {
                    await db.ref(`user/${this.keyuser}`).update({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        nickname: this.nickname,
                        school: this.school,
                        gender: this.gender,
                        birthDate: this.birthDate,
                        address: this.address,
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

.header {
    font-size: 25px;
}
</style>