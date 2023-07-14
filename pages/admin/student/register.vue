<template>
    <div class="container-fluid">
        <v-row>
            <div style="display: flex; justify-content: space-between;">
                <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                <v-btn to="/admin/student" router exact>ย้อนกลับ</v-btn>
            </div>
            <div class="col-sm-12">
                <form ref="registerForms">

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลเกี่ยวกับคอร์ส</div>

                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4">
                                    <v-select class="black-label" v-model="classType" :items="classes" label="ประเภทคลาส"
                                        :error-messages="classTypeErrors" required @input="$v.classType.$touch()"
                                        @blur="$v.classType.$touch()"></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-select class="black-label" v-model="courseHour" :items="courseHours"
                                        label="จำนวนชั่วโมง" :error-messages="courseHourErrors" required
                                        @input="$v.courseHour.$touch()" @blur="$v.courseHour.$touch()"></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="freeHour" v-model="freeHour"
                                        label="ชั่วโมงที่แถม">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4"> <v-autocomplete class="black-label" v-model="wantedTeacher"
                                        :items="teachers" label="ต้องการเรียนกับครู"
                                        item-text="teacher.firstName"></v-autocomplete>

                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="annotation" v-model="annotation"
                                        label="หมายเหตุ">
                                    </v-text-field>

                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10  mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="pl-2">ข้อมูลทั่วไป</div>
                        </v-card-title>

                        <v-row class="mt-0" align="center">
                            <v-col cols="2" sm="2" class="pl-10">
                                <div>
                                    <v-avatar style="max-width: 116px; width: 100%; height: 100%;max-height: 116px;">
                                        <img :src="profilePic" alt="รูปโปรไฟล์">
                                    </v-avatar>
                                </div>
                            </v-col>
                            <v-col cols="10">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field class="black-label" v-model="name" :error-messages="nameErrors"
                                            counter label="Username" required @input="$v.name.$touch()"
                                            @blur="$v.name.$touch()">
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
                                        <v-text-field class="black-label" v-model="password" :error-messages="passErrors"
                                            :counter="20" label="รหัสผ่าน" required @input="$v.password.$touch()"
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
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="firstName" v-model="firstName" label="ชื่อ"
                                            :error-messages="firstNameErrors" required @input="$v.firstName.$touch()"
                                            @blur="$v.firstName.$touch()">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="lastName" v-model="lastName"
                                            :error-messages="lastNameErrors" label="นามสกุล" required
                                            @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="nickname" v-model="nickname"
                                            label="ชื่อเล่น" :error-messages="nicknameErrors" @input="$v.nickname.$touch()"
                                            @blur="$v.nickname.$touch()">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="5" class="py-0">

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-select v-model="gender" :items="genders" label="เพศ"></v-select>
                                    </v-col>


                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>

                            </v-col>
                            <v-row class="px-4">
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" v-model="studentMobile"
                                        :error-messages="studentMobileErrors" label="เบอร์โทรศัพท์" required
                                        @input="$v.studentMobile.$touch()" counter @blur="$v.studentMobile.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" v-model="email" :error-messages="emailErrors"
                                        label="Email" @input="$v.email.$touch()" @blur="$v.email.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">

                                </v-col>
                                <v-col cols="4" class="py-0 pb-5">
                                    <v-text-field class="black-label" v-model="idCardNumber"
                                        :error-messages="idCardNumberErrors" counter label="หมายเลขบัตรประชาชน" required
                                        @input="$v.idCardNumber.$touch()" @blur="$v.idCardNumber.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-file-input label="อัพโหลดสำเนาบัตรประชาชน" v-model="idCardCopy"
                                        accept=".pdf,image/*"></v-file-input>
                                </v-col>

                            </v-row>

                        </v-row>

                    </v-card>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-7">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลที่อยู่</div>

                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <p>&#x2022; ที่อยู่ตามบัตรประชาชน</p>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="houseNo" label="บ้านเลขที่"
                                        v-model="address.houseNo"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="tambon" label="ตำบล/แขวง"
                                        v-model="address.tambon"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="amphoe" label="อำเภอ/เขต"
                                        v-model="address.amphoe"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-autocomplete class="black-label" name="province" v-model="address.province"
                                        :items="provinceOptions" autocomplete label="จังหวัด"></v-autocomplete>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="postal" label="รหัสไปรษณีย์" required
                                        :rules="postalRules" v-model="address.postal"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <div class="text-center ">
                                        <hr class=" solid">
                                    </div>

                                </v-col>
                                <v-row class="px-4">
                                    <v-col cols="12" class="text-left">
                                        ที่อยู่ปัจจุบัน
                                        <v-checkbox label="ที่อยู่ตามบัตรประชาชน "
                                            @click="updateCurrAddress()"></v-checkbox>
                                    </v-col>

                                    <v-col cols="4">
                                        <v-text-field class="black-label" name="curr_houseNo" label="บ้านเลขที่"
                                            v-model="currAddress.houseNo"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field class="black-label" name="curr_tambon" label="ตำบล/แขวง"
                                            v-model="currAddress.tambon"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field class="black-label" name="curr_amphoe" label="อำเภอ/เขต"
                                            v-model="currAddress.amphoe"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">

                                        <v-autocomplete class="black-label" name="curr_province"
                                            v-model="currAddress.province" :items="provinceOptions" autocomplete
                                            label="จังหวัด"></v-autocomplete>

                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field class="black-label" name="curr_postal" label="รหัสไปรษณีย์"
                                            :rules="postalRules" v-model="currAddress.postal"></v-text-field>
                                    </v-col>

                                </v-row>
                            </v-row>



                        </v-card-text>

                    </v-card>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลผู้ปกครอง</div>

                        </v-card-title>
                        <v-card-text>

                            <v-row>

                                <v-col cols="4">
                                    <v-text-field class="black-label" name="parentFirstName" v-model="parentFirstName"
                                        label="ชื่อผู้ปกครอง" :error-messages="parentFirstNameErrors" required
                                        @input="$v.parentFirstName.$touch()" @blur="$v.parentFirstName.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="parentMobile" v-model="parentMobile"
                                        label="เบอร์มือถือผู้ปกครอง" :error-messages="parentMobileErrors" required
                                        @input="$v.parentMobile.$touch()" counter @blur="$v.parentMobile.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">

                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="black-label" name="parentJob" v-model="parentJob" label="อาชีพ">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-textarea class="black-label" name="expectation" v-model="expectation"
                                        label="ความคาดหวัง" rows="2">
                                    </v-textarea>
                                </v-col>


                            </v-row>



                        </v-card-text>

                    </v-card>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลการศึกษา</div>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="3">
                                    <v-text-field class="black-label" name="school" label="โรงเรียน" v-model="school"
                                        :error-messages="schoolErrors" required @input="$v.school.$touch()"
                                        @blur="$v.school.$touch()"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-select class="black-label" label="ระดับชั้น" name="education" v-model="education"
                                        :items="educationLevels" item-text="educationName" :error-messages="educationErrors"
                                        required @input="$v.education.$touch()" @blur="$v.education.$touch()"></v-select>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <div class="text-center mt-5"><v-btn class="me-4" color="green " outlined @click="submit"
                            :loading="isSubmiting">
                            <v-icon class="me-3">mdi-content-save-settings-outline</v-icon>
                            บันทึก
                        </v-btn></div>

                </form>

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
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            //register field
            status: "user",
            profilePic: null,
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

            currAddress: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },
            idCardNumber: null,
            idCardCopy: null,
            parentFirstName: null,
            parentJob: null,
            expectation: null,

            classType: null,
            courseHour: null,
            freeHour: null,
            wantedTeacher: null,
            annotation: null,

            teachers: [],

            //rules
            postalRules: [
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

            classes: [
                'private',
                'Flip class',

            ],

            courseHours: [
                32,
                48, 96,

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
        idCardNumber: { required, minLength: minLength(13), maxLength: maxLength(13), numeric },
        studentMobile: { required, minLength: minLength(9), numeric },
        parentMobile: { required, minLength: minLength(9), numeric },
        parentFirstName: { required },
        school: { required },
        education: { required },
        classType: { required },
        courseHour: { required },
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
        idCardNumberErrors() {
            const errors = []
            if (!this.$v.idCardNumber.$dirty) return errors
            !this.$v.idCardNumber.numeric && errors.push('กรุณากรอกหมายเลขบัตรประชาชนเป็นตัวเลข')
            !this.$v.idCardNumber.minLength && errors.push('กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง')
            !this.$v.idCardNumber.maxLength && errors.push('กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง')
            !this.$v.idCardNumber.required && errors.push('กรุณากรอกหมายเลขบัตรประชาชน')
            return errors
        },

        classTypeErrors() {
            const errors = []
            if (!this.$v.classType.$dirty) return errors
            !this.$v.classType.required && errors.push('กรุณาระบุประเภทคลาส')
            return errors
        },

        courseHourErrors() {
            const errors = []
            if (!this.$v.courseHour.$dirty) return errors
            !this.$v.courseHour.required && errors.push('กรุณาระบุจำนวนชั่วโมง')
            return errors
        },


    },
    components: {
        pageLoader
    },
    mounted() {
        this.search_teacher();
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'Month'))
        },
    },
    methods: {
        updateCurrAddress() {
            if (this.address) {
                this.currAddress = { ...this.address };
            } else {
                this.currAddress = null;
            }
        },

        submit() {
            this.$v.$touch()
            if (this.emailErrors.length == 0 && this.passErrors.length == 0
                && this.firstNameErrors == 0 && this.lastNameErrors == 0
                && this.nameErrors.length == 0 && this.studentMobileErrors.length == 0 && this.idCardNumberErrors == 0
                && this.parentFirstNameErrors.length == 0 && this.parentMobileErrors.length == 0
                && this.schoolErrors.length == 0 && this.educationErrors.length == 0) {
                console.log("Save");
                this.registerStudent();
            } else { console.log("errors save"); }
        },

        async registerStudent() {
            const db = this.$fireModule.database();
            const keyuser = this.encode(this.name);
            this.isSubmiting = true;
            await db.ref(`user/${this.encode(this.name)}/`).set({
                status: this.status,
                classType: this.classType,
                courseHour: this.courseHour,
                freeHour: this.freeHour,
                wantedTeacher: this.wantedTeacher,
                annotation: this.annotation,
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
                currAddress: this.currAddress,
                parentFirstName: this.parentFirstName,
                parentMobile: this.parentMobile,
                parentJob: this.parentJob,
                expectation: this.expectation,
            })

            if (this.idCardCopy) {
                const storageRef = this.$fireModule.storage().ref();
                const userRef = storageRef.child(`user/${this.encode(this.name)}/idCardCopy.jpg`);
                try {
                    const snapshot = await userRef.put(this.idCardCopy);
                    const downloadURL = await snapshot.ref.getDownloadURL();

                    await db.ref(`user/${keyuser}`).update({
                        idCardCopy: downloadURL
                    });
                } catch (error) {
                    this.openSnackbar("error", 'เกิดข้อผิดพลาดในการอัพโหลดรูป!');
                }
            }
            this.isSubmiting = false;
            this.isAlreadySubmit = true;

        },

        search_teacher() {
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'teacher') {

                        const teacher = {
                            firstName: childData[key].firstName || null,
                            lastName: childData[key].lastName || null,
                        };
                        item.push({ teacher });

                    }
                }
                this.teachers = item;
                this.isLoading = false;
            })
            console.log(this.teachers)
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

<style>
.black-label .v-label {
    color: rgb(0, 0, 0);
    opacity: 1;
    font-weight: 500;
}</style>