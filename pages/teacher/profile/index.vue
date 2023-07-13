<template>
    <div class="container-fluid ">
        <pageLoader v-if="isLoading"></pageLoader>
        <div v-if="!isLoading" class="col mx-3 d-flex justify-content-center">
            <v-row>

                <div style="max-width: 500px;">
                    <h1 class="font-weight-bold">ข้อมูลครู</h1>
                </div>

                <v-col cols="12">
                    <v-card style="border-radius: 32px; background: #F5F5F5;" elevation="0">
                        <v-row class="text-right p-3 pb-0 justify-space-between">

                            <div>
                                <v-btn class="editButton elevation-0" @click="dialogEditName = true">
                                    <span style="color: #C3CAD9;">Edit</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                        <v-row class="mt-0" align="center">
                            <v-col cols="2" sm="2" class="pl-10">
                                <div>
                                    <v-avatar style="max-width: 116px; width: 100%; height: 100%;max-height: 116px;">

                                        <img :src="profilePic" alt="รูปโปรไฟล์">
                                    </v-avatar>
                                </div>
                            </v-col>
                            <v-col cols="9" sm="9">
                                <div>
                                    <strong class="header text-break">&nbsp;คุณ {{ firstNameDisplay }} {{ lastNameDisplay
                                    }}</strong>
                                    <br>
                                    <span class="userSpan text-break">{{ nicknameDisplay }}</span>
                                </div>
                            </v-col>

                        </v-row>
                    </v-card>
                </v-col>


                <v-col cols="12">
                    <v-card style="border-radius: 32px;background: #F5F5F5;" elevation="0">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="pl-2">ข้อมูลทั่วไป</div>
                            <div>
                                <v-btn class="editButton elevation-0" @click="dialogEditDetail = true">
                                    <span style="color: #C3CAD9;">Edit</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </v-btn>
                            </div>
                        </v-card-title>

                        <v-row align="center">
                            <v-col cols="4" sm="4" class="pl-10 py-2">
                                <div>
                                    <p class=" text-break">สถานศึกษา </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ school }} </p>
                                </div>
                            </v-col>
                            <v-col cols="3" sm="3" class=" py-2">
                                <div>
                                    <p class=" text-break">ระดับชั้น </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ education }} </p>
                                </div>
                            </v-col>
                            <v-col cols="5" sm="5" class=" py-2">

                            </v-col>
                            <v-col cols="4" sm="4" class="pl-10 py-2">
                                <div>
                                    <p class=" text-break">วันเกิด </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ birthDate }} </p>
                                </div>
                            </v-col>
                            <v-col cols="3" sm="3" class="py-2">
                                <div>
                                    <p class=" text-break">เพศ </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ gender }} </p>
                                </div>
                            </v-col>
                            <v-col cols="5" sm="5" class=" py-2">

                            </v-col>
                            <v-col cols="4" sm="4" class="pl-10 py-2">
                                <div>
                                    <p class=" text-break">เบอร์โทรศัพท์ </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ teacherMobile }}
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="3" sm="3" class=" py-2">
                                <div>
                                    <p class=" text-break">วิชาที่สอน </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ teacherMobile }}
                                    </p>
                                </div>
                            </v-col>
                         
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card style="border-radius: 32px;background: #F5F5F5;" elevation="0">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="pl-2">ที่อยู่ปัจจุบัน</div>
                            <div>
                                <v-btn class="editButton elevation-0" @click="dialogEditAddress = true">
                                    <span style="color: #C3CAD9;">Edit</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </v-btn>
                            </div>
                        </v-card-title>

                        <v-row align="center">
                            <v-col cols="4" sm="4" class="pl-10 py-2">
                                <div>
                                    <p class=" text-break">บ้านเลขที่ </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ address.houseNo }}
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="3" sm="3" class=" py-2">
                                <div>
                                    <p class=" text-break">ตำบล/แขวง </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ address.tambon }}
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="5" sm="5" class=" py-2">

                            </v-col>
                            <v-col cols="4" sm="4" class="pl-10 py-2">
                                <div>
                                    <p class=" text-break">อำเภอ/เขต </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ address.amphoe }}
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="3" sm="3" class="py-2">
                                <div>
                                    <p class=" text-break">จังหวัด </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ address.province }}
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="5" sm="5" class=" py-2">

                            </v-col>
                            <v-col cols="4" sm="4" class="pl-10 py-2">
                                <div>
                                    <p class=" text-break">รหัสไปรษณีย์ </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ address.postal }}
                                    </p>
                                </div>
                            </v-col>

                        </v-row>
                    </v-card>
                </v-col>
              
            </v-row>

        </div>
        <!-- dialog -->
        <div>
            <!-- Dialog for editing name -->
            <v-dialog v-model="dialogEditName" max-width="500px">

                <v-card style="border-radius: 12px; " elevation="0">
                    <v-card-title>
                        แก้ไขชื่อ
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="nameForm">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field label="ชื่อ" name="firstName" v-model="firstName" :rules="nameRules"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="นามสกุล" name="lastName" v-model="lastName"
                                        :rules="nameRules"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="ชื่อเล่น" name="nickname" v-model="nickname"></v-text-field>
                                </v-col>
                                <v-col cols="8"><v-file-input label="อัพโหลดรูปโปรไฟล์" v-model="profilePicUpload"
                                        accept="image/*"></v-file-input></v-col>
                            </v-row></v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="mx-2 text-white " :loading="loading" color="indigo" :disabled="isLoading"
                            @click="saveName"> บันทึกข้อมูล</v-btn>
                        <v-btn color="white" @click="dialogEditName = false">ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Dialog for editing detail -->
            <v-dialog v-model="dialogEditDetail" max-width="500px">
                <!-- Dialog content -->
                <v-card>
                    <v-card-title>
                        แก้ไขข้อมูลทั่วไป
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="detailForm" @submit="saveDetail">
                            <v-row>
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
                                <v-col cols="6">
                                    <v-text-field label="เบอร์โทรศัพท์" name="teacherMobile" v-model="teacherMobile"
                                        :rules="teacherMobileRules"></v-text-field>
                                </v-col>
                              
                            </v-row></v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="mx-2 text-white " :loading="loading" color="indigo" :disabled="isLoading"
                            @click="saveDetail"> บันทึกข้อมูล</v-btn>
                        <v-btn color="white" @click="dialogEditDetail = false">ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Dialog for editing address -->
            <v-dialog v-model="dialogEditAddress" max-width="500px">
                <!-- Dialog content -->
                <v-card>
                    <v-card-title>
                        แก้ไขที่อยู่
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="addressForm">
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field name="houseNo" label="บ้านเลขที่"
                                        v-model="address.houseNo"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="tambon" label="ตำบล/แขวง" v-model="address.tambon"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="amphoe" label="อำเภอ/เขต" v-model="address.amphoe"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete name="province" v-model="address.province" :items="provinceOptions"
                                        autocomplete label="จังหวัด"></v-autocomplete>

                                </v-col>
                                <v-col cols="6">
                                    <v-text-field name="postal" label="รหัสไปรษณีย์" :rules="postalRules"
                                        v-model="address.postal"></v-text-field>
                                </v-col>
                            </v-row></v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="mx-2 text-white " :loading="loading" color="indigo" :disabled="isLoading"
                            @click="saveAddress"> บันทึกข้อมูล</v-btn>
                        <v-btn color="white" @click="dialogEditAddress = false">ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <!-- snackbar -->

        <v-snackbar class="font-weight-medium" :color="snackbarColor" v-model="showSnackbar" :timeout="3000">

            <v-icon class="mr-2">mdi-alert-circle</v-icon>{{ snackbarMessage }}


        </v-snackbar>
    </div>
</template>


<script>
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'teacherNav',
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
            dialogEditName: false,
            dialogEditDetail: false,
            dialogEditAddress: false,

            //User data
            profilePic: null,
            profilePicUpload: null,
            iconSize: 120,
            firstNameDisplay: null,
            lastNameDisplay: null,
            nicknameDisplay: null,
            firstName: null,
            lastName: null,
            nickname: null,
            school: null,
            gender: null,
            birthDate: null,

            address: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },
            education: null,
            teacherMobile: null,
       

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
            provinceOptions: [
                'กระบี่',
                'กรุงเทพมหานคร',
                'กาญจนบุรี',
                'กาฬสินธุ์',
                'กำแพงเพชร',
                'ขอนแก่น',
                'จันทบุรี',
                'ฉะเชิงเทรา',
                'ชลบุรี',
                'ชัยนาท',
                'ชัยภูมิ',
                'ชุมพร',
                'เชียงราย',
                'เชียงใหม่',
                'ตรัง',
                'ตราด',
                'ตาก',
                'นครนายก',
                'นครปฐม',
                'นครพนม',
                'นครราชสีมา',
                'นครศรีธรรมราช',
                'นครสวรรค์',
                'นนทบุรี',
                'นราธิวาส',
                'น่าน',
                'บึงกาฬ',
                'บุรีรัมย์',
                'ปทุมธานี',
                'ประจวบคีรีขันธ์',
                'ปราจีนบุรี',
                'ปัตตานี',
                'พระนครศรีอยุธยา',
                'พะเยา',
                'พังงา',
                'พัทลุง',
                'พิจิตร',
                'พิษณุโลก',
                'เพชรบุรี',
                'เพชรบูรณ์',
                'แพร่',
                'พะเยา',
                'ภูเก็ต',
                'มหาสารคาม',
                'มุกดาหาร',
                'แม่ฮ่องสอน',
                'ยะลา',
                'ยโสธร',
                'ร้อยเอ็ด',
                'ระนอง',
                'ระยอง',
                'ราชบุรี',
                'ลพบุรี',
                'ลำปาง',
                'ลำพูน',
                'เลย',
                'ศรีสะเกษ',
                'สกลนคร',
                'สงขลา',
                'สตูล',
                'สมุทรปราการ',
                'สมุทรสงคราม',
                'สมุทรสาคร',
                'สระแก้ว',
                'สระบุรี',
                'สิงห์บุรี',
                'สุโขทัย',
                'สุพรรณบุรี',
                'สุราษฎร์ธานี',
                'สุรินทร์',
                'หนองคาย',
                'หนองบัวลำภู',
                'อ่างทอง',
                'อำนาจเจริญ',
                'อุดรธานี',
                'อุตรดิตถ์',
                'อุทัยธานี',
                'อุบลราชธานี',
                'อ่างขาง'
            ],

            //rules
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            postalRules: [
                value => !!value || 'กรุณากรอกรหัสไปรษณีย์',
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],

            teacherMobileRules: [
                value => !!value || 'กรุณากรอก เบอร์โทรศัพท์',
                value => /^0\d{9}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ],
          

        }
    },
    computed: {


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

                this.firstName = childData.firstName || null;
                this.lastName = childData.lastName || null;
                this.firstNameDisplay = childData.firstName || null;
                this.lastNameDisplay = childData.lastName || null;
                this.nicknameDisplay = childData.nickname || null;
                this.nickname = childData.nickname || null;
                this.school = childData.school || null;
                this.gender = childData.gender || null;
                this.birthDate = childData.birthDate || null;
                
                this.address.houseNo = childData.address.houseNo || null;
                this.address.tambon = childData.address.tambon || null;
                this.address.amphoe = childData.address.amphoe || null;
                this.address.province = childData.address.province || null;
                this.address.postal = childData.address.postal || null;
       
                this.education = childData.education || null;
                this.teacherMobile = childData.teacherMobile || null;
                this.parentMobile = childData.parentMobile || null;
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
                        teacherMobile: this.teacherMobile,
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
          this.title = sessionStorage.getItem('firstName');
          this.status = sessionStorage.getItem('status');
          this.keyuser = sessionStorage.getItem('lastName');
          console.log(this.keyuser)
        } else {
          this.title = localStorage.getItem('firstName');
          this.status = localStorage.getItem('status');
          this.keyuser = sessionStorage.getItem('lastName');
          console.log(this.keyuser)
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


.header {
    font-size: 25px;
}
</style>