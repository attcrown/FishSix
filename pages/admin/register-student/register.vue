<template>
    <div class="container-fluid">
        <v-btn to="/admin/register-student/" router exact>กลับ</v-btn>
        <v-row>
            <div class="col-sm-12">
                <div class="d-flex justify-center align-center">
                    <v-card class="pa-1 text-center rounded-5 m-2" style="background: #F5F6F7 ;">
                        <v-card-title> เพิ่มรายละเอียดของนักเรียน</v-card-title>
                        <v-divider></v-divider>
                        <form ref="registerForm">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="name" :error-messages="nameErrors" counter label="Username"
                                        required @input="$v.name.$touch()" @blur="$v.name.$touch()">
                                        <template v-slot:append>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                </template>
                                                <span>ควรตั้งชื่อเป็นชื่อจริงภาษาอังกฤษ1234
                                                    <br>โดยเป็นตัวพิมพ์ใหญ่ทั้งหมด</span>
                                            </v-tooltip>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="password" :error-messages="passErrors" :counter="20"
                                        label="รหัสผ่าน" required @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()">
                                        <template v-slot:append>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                </template>
                                                <span>ควรตั้งชื่อเป็นชื่อจริงภาษาอังกฤษ1234
                                                    <br>โดยเป็นตัวพิมพ์เล็กทั้งหมด</span>
                                            </v-tooltip>
                                        </template>
                                    </v-text-field>

                                </v-col>

                                <v-col cols="4">
                                    <v-text-field name="firstName" v-model="firstName" label="ชื่อ"
                                        :error-messages="firstNameErrors" required @input="$v.firstName.$touch()"
                                        @blur="$v.firstName.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="lastName" v-model="lastName" :error-messages="lastNameErrors"
                                        label="นามสกุล" required @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="4">
                                    <v-text-field name="nickname" v-model="nickname" label="ชื่อเล่น"
                                        :error-messages="nicknameErrors" @input="$v.nickname.$touch()"
                                        @blur="$v.nickname.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-select v-model="gender" :items="genders" label="เพศ"></v-select>
                                </v-col>
                                <v-col cols="4"> <v-text-field v-model="studentMobile" :error-messages="studentMobileErrors"
                                        label="เบอร์โทรศัพท์" required @input="$v.studentMobile.$touch()" counter
                                        @blur="$v.studentMobile.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="email" :error-messages="emailErrors" label="Email"
                                        @input="$v.email.$touch()" @blur="$v.email.$touch()">
                                    </v-text-field>
                                </v-col>



                                <v-col cols="12" class="text-left"><v-divider></v-divider>
                                    ที่อยู่ปัจจุบัน

                                </v-col>
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
                                    <v-text-field name="postal" label="รหัสไปรษณีย์" required :rules="postalRules"
                                        v-model="address.postal"></v-text-field>
                                </v-col>

                                <v-col cols="12" class="text-left">
                                    <v-divider></v-divider>
                                    ข้อมูลผู้ปกครอง
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="parentFirstName" v-model="parentFirstName" label="ชื่อผู้ปกครอง"
                                        :error-messages="parentFirstNameErrors" required
                                        @input="$v.parentFirstName.$touch()" @blur="$v.parentFirstName.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="parentMobile" v-model="parentMobile" label="เบอร์มือถือผู้ปกครอง"
                                        :error-messages="parentMobileErrors" required @input="$v.parentMobile.$touch()"
                                        counter @blur="$v.parentMobile.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="parentJob" v-model="parentJob" label="อาชีพ">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea name="expectation" v-model="expectation" label="ความคาดหวัง" rows="2">
                                    </v-textarea>
                                </v-col>



                                <v-col cols="12" class="text-left">
                                    <v-divider></v-divider>
                                    ข้อมูลการศึกษา
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field name="school" label="โรงเรียน" v-model="school"
                                        :error-messages="schoolErrors" required @input="$v.school.$touch()"
                                        @blur="$v.school.$touch()"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-select label="ระดับชั้น" name="education" v-model="education"
                                        :items="educationLevels" item-text="educationName" :error-messages="educationErrors"
                                        required @input="$v.education.$touch()" @blur="$v.education.$touch()"></v-select>

                                </v-col>



                            </v-row>
                            <!-- <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Confirm " required
                                @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox> -->

                                <v-btn class="me-4" color="green " outlined @click="submit" :loading="isSubmiting">
                                <v-icon class="me-3">mdi-content-save-settings-outline</v-icon>
                                บันทึก
                            </v-btn>
                            <!-- <v-btn color="deep-orange darken-4" @click="clear">
                                <v-icon class="me-3">mdi-backspace-reverse</v-icon> clear
                            </v-btn> -->
                        </form>

                    </v-card>
                </div>

            </div>
        </v-row>
        <v-snackbar class="font-weight-medium" :color="snackbarColor" v-model="showSnackbar" :timeout="1000">
            <v-icon class="mr-2">mdi-alert-circle</v-icon>{{ snackbarMessage }}
        </v-snackbar>

        <template>
            <div>
                <v-dialog v-model="isAlreadySubmit" transition="dialog-bottom-transition" max-width="600" persistent>
                    <template v-slot:default="dialog">
                        <v-card>

                            <v-card-text>
                                <div class="text-center">

                                    <div class="text-h5 pa-12"> <v-icon color="green"
                                            size="100">mdi-check-circle</v-icon><br>บันทึกข้อมูลนักเรียนเสร็จสิ้น</div>
                                    <v-btn outlined color="green" @click="reload();">ปิด</v-btn>
                                </div>

                            </v-card-text>

                        </v-card>
                    </template>
                </v-dialog>
            </div>
        </template>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, numeric } from 'vuelidate/lib/validators'
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'default',
    data() {
        return {
            activePicker: null,
            date: null,
            menu: false,
            isLoading: true,
            isSubmiting: false,
            isAlreadySubmit: false,
            //register field
            status: "user",

            name: null,
            password: null,
            firstName: null,
            lastName: null,
            nickname: null,
            studentMobile: null,
            parentMobile: null,
            email: null,
            gender: null,
            school: null,
            education: null,
            address: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },

            parentFirstName: null,
            parentJob: null,
            expectation: null,


            //rules
            postalRules: [
                value => !!value || 'กรุณากรอกรหัสไปรษณีย์',
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],

            // static
            genders: [
                'ชาย',
                'หญิง',
                'ไม่ระบุ',
                'ไม่มีเพศ',
                'อื่นๆ'
            ],

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
                'อ่างทอง'
            ],
        }
    },
    mixins: [validationMixin],
    validations: {
        name: { required, minLength: minLength(6) },
        password: { required, maxLength: maxLength(20), minLength: minLength(6) },
        firstName: { required },
        lastName: { required },
        nickname: { required },
        email: { email },
        studentMobile: { required, minLength: minLength(9), numeric },
        parentMobile: { required, minLength: minLength(9), numeric },
        parentFirstName: { required },
        school: { required },
        education: { required },
        checkbox: {
            checked(val) {
                return val
            },
        },
    },
    computed: {
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.minLength &&
                errors.push('Username ต้องมีอย่างน้อย 6 ตัวอักษร')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },

        passErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            if (!this.$v.password.maxLength) {
                errors.push('Password ต้องไม่เกิน 20 ตัวอักษร')
            }
            if (!this.$v.password.minLength) {
                errors.push('Password ต้องมีอย่างน้อย 6 ตัวอักษร')
            }
            if (!this.$v.password.required) {
                errors.push('กรุณากรอกรหัสผ่าน')
            }
            return errors
        },

        firstNameErrors() {
            const errors = []
            if (!this.$v.firstName.$dirty) return errors
            !this.$v.firstName.required && errors.push('กรุณาระบุชื่อผู้เรียน')
            return errors
        },

        lastNameErrors() {
            const errors = []
            if (!this.$v.lastName.$dirty) return errors
            !this.$v.lastName.required && errors.push('กรุณาระบุนามสกุล')
            return errors
        },

        nicknameErrors() {
            const errors = []
            if (!this.$v.nickname.$dirty) return errors
            !this.$v.nickname.required && errors.push('กรุณาระบุชื่อเล่น')
            return errors
        },

        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')

            return errors
        },
        studentMobileErrors() {
            const errors = []
            if (!this.$v.studentMobile.$dirty) return errors
            !this.$v.studentMobile.numeric && errors.push('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข')
            !this.$v.studentMobile.minLength && errors.push('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
            !this.$v.studentMobile.required && errors.push('กรุณากรอกเบอร์โทรศัพท์')
            return errors
        },
        parentFirstNameErrors() {
            const errors = []
            if (!this.$v.parentFirstName.$dirty) return errors
            !this.$v.parentFirstName.required && errors.push('กรุณาระบุชื่อผู้ปกครอง')
            return errors
        },
        parentMobileErrors() {
            const errors = []
            if (!this.$v.parentMobile.$dirty) return errors
            !this.$v.parentMobile.numeric && errors.push('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข')
            !this.$v.parentMobile.minLength && errors.push('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
            !this.$v.parentMobile.required && errors.push('กรุณากรอกเบอร์โทรศัพท์')
            return errors
        },
        schoolErrors() {
            const errors = []
            if (!this.$v.school.$dirty) return errors
            !this.$v.school.required && errors.push('กรุณาระบุชื่อโรงเรียนของนักเรียน')
            return errors
        },
        educationErrors() {
            const errors = []
            if (!this.$v.education.$dirty) return errors
            !this.$v.education.required && errors.push('กรุณาระบุชั้นปีการศึกษาของนักเรียน')
            return errors
        },

    },
    components: {
        pageLoader
    },
    mounted() {

    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'Month'))
        },
    },
    methods: {


        submit() {
            this.$v.$touch()


            if (this.emailErrors.length == 0 && this.passErrors.length == 0
                && this.firstNameErrors == 0 && this.lastNameErrors == 0
                && this.nameErrors.length == 0 && this.studentMobileErrors.length == 0
                && this.parentFirstNameErrors.length == 0 && this.parentMobileErrors.length == 0
                && this.schoolErrors.length == 0 && this.educationErrors.length == 0) {
                console.log("Save");
                this.registerStudent();
            } else { console.log("errors save"); }
        },

        async registerStudent() {
            const db = this.$fireModule.database();
            this.isSubmiting = true;
            await db.ref(`user/${this.encode(this.name)}/`).set({
                status: this.status,
                name: this.name,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName,
                nickname: this.nickname,
                studentMobile: this.studentMobile,
                email: this.email,
                gender: this.gender,
                school: this.school,
                education: this.education,
                address: this.address,
                parentFirstName: this.parentFirstName,
                parentMobile: this.parentMobile,
                parentJob: this.parentJob,
                expectation: this.expectation,
            })
            this.isSubmiting = false;
            this.isAlreadySubmit = true;

        },
       
        encode(a) {
            const encodedData = btoa(encodeURIComponent(a))
            return encodedData;
        },

        reload() {
            window.location.reload();
        },
    },
}
</script>