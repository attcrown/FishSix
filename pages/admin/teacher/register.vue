<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>

        <v-row v-if="!isLoading">


            <div style="display: flex; justify-content: space-between;">
                <h1 class="font-weight-bold">ข้อมูลครู</h1>
                <v-btn to="/admin/teacher" router exact>ย้อนกลับ</v-btn>
            </div>

            <div class="col-sm-12">
                <form ref="registerForms">

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10  mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="pl-2">ข้อมูลทั่วไป</div>
                            <div class="pl-2">

                            </div>
                        </v-card-title>

                        <v-row class="mt-0" align="center">
                            <v-col cols="3" sm="3" class="pl-10">
                                <div>
                                    <v-avatar style="max-width: 350px; width: 100%; height: 100%;max-height: 350px;">
                                        <img v-if="profilePic" :src="profilePic" alt="รูปโปรไฟล์">
                                        <v-icon style=" font-size: 100px;" v-if="!profilePic" dark>
                                            mdi-account-circle
                                        </v-icon>
                                    </v-avatar>

                                    <label class="upload-label mt-3" for="upload-file"> เพิ่มรูปโปรไฟล์
                                        <input type="file" id="upload-file" hidden @change="uploadFile" />
                                    </label>
                                </div>
                            </v-col>
                            <v-col cols="9">
                                <v-row>
                                    <v-col class="py-0" cols="3">
                                        <v-text-field class="black-label" v-model="teacherId" :error-messages="idErrors"
                                            counter label="รหัสครู (ไม่จำเป็นต้องกรอก)" required :rules="teacherIdRules">
                                            <template v-slot:append>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                    </template>
                                                    <span>FS ตามด้วยเลข 4 หลัก
                                                        <br>โดยเป็นตัวพิมพ์ใหญ่ทั้งหมด</span>
                                                </v-tooltip>
                                            </template>

                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="9" class="py-0"></v-col>
                                    <v-col cols="6" class="py-0">
                                        <v-text-field class="black-label" v-model="name" :error-messages="nameErrors"
                                            readonly counter label="Username (ไม่ต้องกรอก)" required disabled
                                            @input="$v.name.$touch()" @blur="$v.name.$touch()">

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
                                    <v-col cols="6" class="py-0">
                                        <v-text-field class="black-label" v-model="password" :error-messages="passErrors"
                                            readonly :counter="20" label="รหัสผ่าน (ไม่ต้องกรอก)" required
                                            @input="$v.password.$touch()" disabled @blur="$v.password.$touch()">
                                            <template v-slot:append>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                    </template>
                                                    <span>fs ตามด้วยเลข 4 หลัก
                                                       </span>
                                                </v-tooltip>
                                            </template>
                                        </v-text-field>

                                    </v-col>
                                     <v-col cols="4" class="py-0 ">
                                        <v-text-field class="black-label" name="firstName" v-model="firstName"
                                            label="ชื่อ (ภาษาไทย)" :error-messages="firstNameErrors" required
                                            @input="$v.firstName.$touch()" @blur="$v.firstName.$touch()">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="lastName" v-model="lastName"
                                            :error-messages="lastNameErrors" label="นามสกุล (ภาษาไทย)" required
                                            @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">

                                    </v-col>
                                    <v-col cols="4" class="py-0 ">
                                        <v-text-field class="black-label" name="firstNameEng" v-model="firstNameEng"
                                            label="ชื่อ (ภาษาอังกฤษ)" 
                                            v-on:keypress="isLetter($event)" >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="lastNameEng" v-model="lastNameEng"
                                           label="นามสกุล (ภาษาอังกฤษ)" 
                                            v-on:keypress="isLetter($event)">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="nickname" v-model="nickname"
                                            :error-messages="nicknameErrors" @input="$v.nickname.$touch()"
                                            @blur="$v.nickname.$touch()">
                                            <template v-slot:label>
                                                <span>
                                                    ชื่อเล่น
                                                </span>
                                                <span style="color:red;">
                                                    *
                                                </span>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="5" class="py-0">

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-select class="black-label" name="gender" v-model="gender"
                                        :items="genders" :error-messages="genderErrors"
                                        required @input="$v.gender.$touch()" @blur="$v.gender.$touch()">
                                            <template v-slot:label>
                                                <span>
                                                    เพศ
                                                </span>
                                                <span style="color:red;">
                                                    *
                                                </span>
                                            </template></v-select>
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
                                    <v-text-field class="black-label" v-model="currJob" label="อาชีพปัจจุบัน">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" v-model="mobile" :error-messages="mobileErrors" name="mobile"
                                         @input="$v.mobile.$touch()" counter
                                        @blur="$v.mobile.$touch()"
                                        
                                        >
                                        <template v-slot:label>
                                                <span>
                                                    เบอร์โทรศัพท์
                                                </span>
                                                <span style="color:red;">
                                                    *
                                                </span>
                                            </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" v-model="email" :error-messages="emailErrors" name="email"
                                        label="Email"  @input="$v.email.$touch()" @blur="$v.email.$touch()">
                                        <template v-slot:label>
                                                <span>
                                                    Email
                                                </span>
                                                <span style="color:red;">
                                                    *
                                                </span>
                                            </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="4" class="py-0 pb-5">
                                    <v-text-field class="black-label" v-model="idCardNumber"
                                        :error-messages="idCardNumberErrors" counter label="หมายเลขบัตรประชาชน" 
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
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" name="houseNo" label="บ้านเลขที่"
                                        v-model="address.houseNo"></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-autocomplete class="black-label" v-model="selectedTambon" :items="tambons"
                                        :item-value="tambonValue" item-text="name_th" :search-input.sync="searchTambon"
                                        no-data-text="กรุณากรอกชื่อตำบล" @update:search-input="fetchTambons"
                                        label="ตำบล"></v-autocomplete>
                                    <!-- <v-autocomplete class="black-label" name="tambon" label="ตำบล/แขวง" :items="tambons"
                                        item-text="name" v-model="address.tambon"></v-autocomplete> -->
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <!-- <v-autocomplete v-model="address.amphoe" :items="amphoes" item-text="name_th"
                                        :search-input.sync="searchAmphoe" @update:search-input="fetchAmphoe"
                                        label="อำเภอ"></v-autocomplete> -->
                                    <v-text-field class="black-label" name="amphoe" label="อำเภอ/เขต" readonly
                                        v-model="address.amphoe"></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" name="province" v-model="address.province" readonly
                                        label="จังหวัด"></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" name="postal" label="รหัสไปรษณีย์" required readonly
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

                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="curr_houseNo" label="บ้านเลขที่" :disabled="isAddressSame"
                                            v-model="currAddress.houseNo"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-autocomplete v-if="!isAddressSame" class="black-label" v-model="selectedCurrTambon"
                                            :items="currTambons" :item-value="currTambonValue" item-text="name_th"
                                            :search-input.sync="searchCurrTambon" no-data-text="กรุณากรอกชื่อตำบล"
                                            @update:search-input="fetchCurrTambons" label="ตำบล"></v-autocomplete>
                                            <v-text-field  v-if="isAddressSame" class="black-label" name="curr_tambon" label="ตำบล" :disabled="isAddressSame"
                                            v-model="currAddress.tambon"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="curr_amphoe" label="อำเภอ/เขต" :disabled="isAddressSame"
                                            v-model="currAddress.amphoe"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">

                                        <v-text-field class="black-label" name="province" v-model="currAddress.province" :disabled="isAddressSame"
                                            readonly label="จังหวัด"></v-text-field>

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="curr_postal" label="รหัสไปรษณีย์" :disabled="isAddressSame"
                                            :rules="postalRules" v-model="currAddress.postal"></v-text-field>
                                    </v-col>

                                </v-row>
                            </v-row>



                        </v-card-text>

                    </v-card>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลสัญญาจ้าง</div>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4" class="py-0">
                                    <v-select class="black-label" v-model="contract" :items="contracts" label="สัญญาจ้าง"
                                        multiple ></v-select>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-select class="black-label" v-model="workType" :items="workTypes"
                                        label="ประเภทการทำงาน" ></v-select>
                                </v-col>
                                <v-col cols="4" class="py-0">

                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field class="black-label" v-model="startDate" label="วันที่เริ่มงาน"
                                                name="startDate" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                :rules="startDateRules"  v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="startDate" :active-picker.sync="activePicker"
                                            min="1950-01-01" @change="save"></v-date-picker>
                                    </v-menu>

                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field class="black-label" name="rate" type="number" label="เรทค่าสอน/ชั่วโมง"
                                        min="0" max="99999" maxlength="5" oninput="validity.valid||(value='');"
                                   
                                        v-model="rate"></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-select class="black-label" v-model="classLocation" :items="locations"
                                        item-value="key"  item-text="name" multiple name="classLocation"   :error-messages="classLocationErrors"
                                        @change="$v.classLocation.$touch()"
                                        @blur="$v.classLocation.$touch()" required>
                                        <template v-slot:label>
                                                <span>
                                                    สาขาที่สามารถสอนได้
                                                </span>
                                                <span style="color:red;">
                                                    *
                                                </span>
                                            </template>
                                    </v-select>

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
                                <v-col cols="3" class="py-0">
                                    <v-text-field class="black-label" name="university" label="มหาวิทยาลัย" 
                                    :error-messages="universityErrors"
                                        @change="$v.university.$touch()"
                                        @blur="$v.university.$touch()" required
                                        v-model="university">
                                        <template v-slot:label>
                                                <span>
                                                    มหาวิทยาลัย
                                                </span>
                                                <span style="color:red;">
                                                    *
                                                </span>
                                            </template></v-text-field>
                                </v-col>

                                <v-col cols="3" class="py-0">
                                    <v-text-field class="black-label" name="faculty" label="คณะ"
                                        v-model="faculty"></v-text-field>
                                </v-col>

                                <v-col cols="3" class="py-0">
                                    <v-text-field class="black-label" name="major" label="สาขา"
                                        v-model="major"></v-text-field>
                                </v-col>

                                <div class="col-md-12">
                                    <label>
                        
                                        <span>วิชาที่สอนได้</span>
                                        <span class="text-danger">*</span>
                                    </label>
                                    <table class="table table-sm">
                                        <tbody>
                                            <tr v-for="subject in subjects">
                                                <td> {{ subject.name }}</td>
                                                <td v-for="(level, index) in subject.level" :key="index">
                                                    <v-checkbox class="m-0"
                                                        @click="updateSelectedSubjects(subject.key, level, subject.name)"
                                                        :label="level"></v-checkbox>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>


                                </div>

                            </v-row>
                        </v-card-text>
                    </v-card>
                    <div class="d-flex justify-center align-center mt-5"> <v-btn class="me-4" color="green " outlined
                            @click="submit" :loading="isSubmitting">
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
                                            size="100">mdi-check-circle</v-icon><br>อัพโหลดเสร็จสิ้น</div>
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
import { Timestamp } from "firebase/firestore";
import { required, maxLength, minLength, email, numeric } from 'vuelidate/lib/validators'
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'default',
    data() {
        return {
            //status
            activePicker: null,
            date: null,
            menu: false,
            isLoading: true,
            isSubmitting: false,
            isAlreadySubmit: false,
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            isAddressSame:false,
            //register field
            status: "teacher",
            profilePic: null,
            teacherId: null,
            createdAt: null,
            password: 'FishsixTeacher',
            firstNameEng: null,
            name: null,
            lastNameEng: null,
            firstName: null,
            lastName: null,
            nickname: null,
            mobile: null,
            email: null,
            gender: null,
            currJob: null,
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
            contract: null,
            workType: null,
            classType: null,
            classLocation: null,
            startDate: null,
            rate: null,
            university: null,
            faculty: null,
            major: null,
            selectedSubjects: [],
            locations: [],


            tambons: [],
            currTambons: [],
            amphoes: [],
            provinces: [],
            selectedTambon: '',
            selectedCurrTambon: '',
            selectedAmphoes: '',
            selectedCurrAmphoes: '',
            selectedProvince: '',
            searchTambon: '',
            searchCurrTambon: '',

            //rules
            postalRules: [
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],
            startDateRules: [
                value => !!value || 'กรุณาเลือกวันที่เริ่มทำงาน',

            ],

            teacherIdRules: [
                value => !!value || 'กรุณากรอก รหัสครู',
                value => /^FS\d{4}$/.test(value) || 'รูปแบบ รหัสครู ไม่ถูกต้อง (ต้องเป็น FS ตามด้วยตัวเลข 4 หลัก)'

            ],
            // static
            genders: [
                'ชาย',
                'หญิง',
                'ไม่ระบุ',
                'ไม่มีเพศ',
                'อื่นๆ'
            ],
            contracts: [
                'พนักงานประจำ',
                'ครูสาขา',
                'ครูออนไลน์',

            ],
            workTypes: [
                'Full Time',
                'Part Time',
            ],

            classTypes: [
                'Flip class',
                'Private',
            ],

            subjects: [],

        }
    },
    mixins: [validationMixin],
    validations: {
        teacherId: { maxLength: maxLength(6), minLength: minLength(6) },
        name: { required, maxLength: maxLength(100), minLength: minLength(1) },
        password: { required, maxLength: maxLength(100), minLength: minLength(1) },
      
        firstName: { required },
        lastName: { required },
        nickname: { required },
        gender: { required },
        email: { required, email },
        mobile: { required, minLength: minLength(9), numeric },
        idCardNumber: { required, minLength: minLength(13), maxLength: maxLength(13), numeric },
        postal: {  numeric },
        
        classLocation: { required },
        university: { required },
        
     


        checkbox: {
            checked(val) {
                return val
            },
        },
    },
    computed: {

        idErrors() {
            const errors = []
            if (!this.$v.teacherId.$dirty) return errors
            !this.$v.teacherId.minLength &&
                errors.push('รหัสครู ต้องมี 6 ตัวอักษร')
            !this.$v.teacherId.maxLength &&
                errors.push('รหัสครู ต้องมี 6 ตัวอักษร')
            !this.$v.teacherId.required
            errors.push()
            return errors
        },

        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.minLength &&
                errors.push('Username ต้องมีอย่างน้อย 6 ตัวอักษร')
            !this.$v.name.required && errors.push('Username is required.')
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
            !this.$v.firstName.required && errors.push('กรุณาระบุชื่อจริงผู้สอน')
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

        
        genderErrors() {
            const errors = []
            if (!this.$v.gender.$dirty) return errors
            !this.$v.gender.required && errors.push('กรุณาระบุเพศของผู้สอน')
            return errors
        },

        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('กรุณาระบุ e-mail ของผู้สอน')
            return errors
        },
        mobileErrors() {
            const errors = []
            if (!this.$v.mobile.$dirty) return errors
            !this.$v.mobile.numeric && errors.push('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข')
            !this.$v.mobile.minLength && errors.push('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
            !this.$v.mobile.required && errors.push('กรุณาระบุเบอร์โทรศัพท์ของผู้สอน')
            return errors
        },
        idCardNumberErrors() {
            const errors = []
            if (!this.$v.idCardNumber.$dirty) return errors
            !this.$v.idCardNumber.numeric && errors.push('กรุณากรอกหมายเลขบัตรประชาชนเป็นตัวเลข')
            !this.$v.idCardNumber.minLength && errors.push('กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง')
            !this.$v.idCardNumber.maxLength && errors.push('กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง')
    
            return errors
        },

        classLocationErrors() {
            const errors = []
            if (!this.$v.classLocation.$dirty) return errors
            !this.$v.classLocation.required && errors.push('กรุณาเลือกสถานที่สามารถสอนได้')
            return errors
        },
        contractErrors() {
            const errors = []
            if (!this.$v.contract.$dirty) return errors
            !this.$v.contract.required && errors.push('กรุณาเลือกประเภทสัญญาจ้าง')
            return errors
        },
        workTypeErrors() {
            const errors = []
            if (!this.$v.workType.$dirty) return errors
            !this.$v.workType.required && errors.push('กรุณาเลือกประเภทการทำงาน')
            return errors
        },

        universityErrors() {
            const errors = []
            if (!this.$v.university.$dirty) return errors
            !this.$v.university.required && errors.push('กรุณากรอกข้อมูลมหาวิทยาลัย')
            return errors
        },

    },
    components: {
        pageLoader
    },
    mounted() {
        this.readdata();
        //this.fetchData();
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'Month'))
        },
        
        'selectedTambon': {
            handler: 'fetchAmphoe',
            immediate: true,
        },

        'selectedAmphoes': {
            handler: 'fetchProvince',
            immediate: true,
        },

        'selectedCurrTambon': {
            handler: 'fetchCurrAmphoe',
            immediate: true,
        },
        'selectedCurrAmphoes': {
            handler: 'fetchCurrProvince',
            immediate: true,
        },

    },
    methods: {
        updateCurrAddress() {
            if(this.isAddressSame){

                this.currAddress = {houseNo:null, tambon: null, amphoe: null, province: null, postal: null};
                this.isAddressSame = false;
            
            }
            else{
                this.isAddressSame = true;
            }

            if (this.address) {
              
                this.currAddress = { ...this.address };

            } else {
                this.currAddress = null;
            }
        },
        updateSelectedSubjects(key, level, name) {

            const index = this.selectedSubjects.findIndex(s => s.name === name);

            if (index === -1) {
                this.selectedSubjects.push({ name, level: [level], key });

            } else {

                const subject = this.selectedSubjects[index];
                const levelIndex = subject.level.indexOf(level);

                if (levelIndex === -1) {

                    subject.level.push(level);
                } else {

                    subject.level.splice(levelIndex, 1);
                }

                if (subject.level.length === 0) {
                    this.selectedSubjects.splice(index, 1);
                }
            }
            // console.log(this.selectedSubjects);

        },
        handleFileUpload() {
            this.$refs.fileInput.click();

        },
        uploadFile(e) {
            this.profilePic = e.target.files[0];

        },
        save(date) {
            this.$refs.menu.save(date)
        },
        openSnackbar(status, message) {
            this.showSnackbar = true;
            this.snackbarMessage = message;
            this.snackbarColor = status;
        },

        reload() {
            window.location.reload();
        },

        submit() {
            this.$v.$touch()

            if (this.emailErrors.length == 0 && this.passErrors.length == 0
              
                && this.firstNameErrors == 0 && this.lastNameErrors == 0 && this.nameErrors == 0
                && this.idErrors.length == 0 && this.mobileErrors.length == 0
                && this.emailErrors.length == 0 && this.genderErrors.length == 0
                && this.classLocationErrors.length == 0 && this.universityErrors.length == 0 ) {
                console.log("Save");
                this.registerTeacher();
            } else {  this.openSnackbar("error", 'ข้อมูลที่กรอกไม่ครบถ้วน ');}
        },

        async registerTeacher() {
            const db = this.$fireModule.database();
            const keyuser = this.encode(this.name);
            this.isSubmitting = true;
            const isIDDuplicate = await this.checkDuplicateName(this.teacherId);
            if (isIDDuplicate) {
                this.openSnackbar("error", 'รหัสของครูซ้ำ รหัสที่ซ้ำคือ ' + this.teacherId);
                this.isSubmitting = false;
                return;
            }
            const timestamp = Timestamp.fromDate(new Date());
            const jsDate = timestamp.toDate();
            const isoString = jsDate.toISOString();
            this.createdAt = isoString;
            await db.ref(`user/${this.encode(this.name)}/`).set({
                status: this.status,
                teacherId: this.teacherId,
                name: this.name,
                createdAt: this.createdAt,
                password: this.password,
                profilePic: this.profilePic,
                firstNameEng:this.firstNameEng,
                lastNameEng:this.lastNameEng,
                firstName: this.firstName,
                lastName: this.lastName,
                nickname: this.nickname,
                mobile: this.mobile,
                email: this.email,
                gender: this.gender,
                currJob: this.currJob,
                address: this.address,
                currAddress: this.currAddress,
                idCardNumber: this.idCardNumber,
                idCardCopy: this.idCardCopy,
                contract: this.contract,
                workType: this.workType,
                classType: this.classType,
                classLocation: this.classLocation,
                startDate: this.startDate,
                rate: this.rate,
                university: this.university,
                faculty: this.faculty,
                major: this.major,
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
            if (this.profilePic) {
                this.isSubmitting = true
                const storageRef = this.$fireModule.storage().ref();
                const userRef = storageRef.child(`user/${this.encode(this.name)}/profilePic.jpg`);

                try {
                    const snapshot = await userRef.put(this.profilePicUpload);
                    const downloadURL = await snapshot.ref.getDownloadURL();

                    await db.ref(`user/${this.encode(this.name)}`).update({
                        profilePic: downloadURL,
                    });
                } catch (error) {
                    this.openSnackbar("error", 'เกิดข้อผิดพลาดในการอัพโหลดรูป!');
                }
            }

            for (let subject of this.selectedSubjects) {

                await db.ref(`user/${this.encode(this.name)}/subject_all/${subject.key}`).set({
                    name: subject.name,
                    level: subject.level,

                })
            }
            this.isSubmitting = false;
            this.isAlreadySubmit = true;
        },

        async checkDuplicateName(id) {
            const db = this.$fireModule.database();
            const snapshot = await db.ref('user').orderByChild('teacherId').equalTo(id).once('value');
            const existingTeacher = snapshot.val();
            return !!existingTeacher;
        },

        async readdata() {
            const db = this.$fireModule.database();
            await db.ref(`subject_all/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.subjects = [];
                let items = [];
                let subjectName = '';
                let levelData = '';


                for (const key in childData) {

                    db.ref(`subject_all/${key}`).on("value", (snapshot) => {
                        const childData = snapshot.val();
                        subjectName = childData.name;

                    })
                    db.ref(`subject_all/${key}/level`).on("value", (snapshot) => {
                        const childData = snapshot.val();
                        levelData = childData;
                        //console.log(levelData)
                    })
                    const item = {
                        key: key,
                        level: levelData,
                        name: subjectName
                    };

                    items.push(item);
                }
                this.subjects = items;
                this.isLoading = false;

            })

            await db.ref(`location/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.locations = [];
                let items = [];
                let locationName = '';
                let locationDetail = '';


                for (const key in childData) {

                    db.ref(`location/${key}`).on("value", (snapshot) => {
                        const childData = snapshot.val();
                        locationName = childData.name;
                        locationDetail = childData.location;

                    })
                    const item = {
                        key: key,
                        location: locationDetail,
                        name: locationName
                    };

                    items.push(item);
                }
                this.locations = items;

                this.isLoading = false;

            })

            const snapshot = await db.ref('user').orderByChild('teacherId').limitToLast(1).once('value');
            const lastTeacher = snapshot.val();
            for (const key in lastTeacher) {
            if (lastTeacher[key].status == 'admin' ||!lastTeacher) {
                this.teacherId = 'FS0001';
                return;
            } else {
                const lastTeacherId = Object.keys(lastTeacher)[0];
                const lastTeacherCode = lastTeacher[lastTeacherId].teacherId;
                const numericPart = parseInt(lastTeacherCode.slice(2), 10) + 1;
                const nextId = `FS${String(numericPart).padStart(4, '0')}`;
                this.teacherId = nextId;
                this.name = nextId;
            }}

        },


   
        async fetchProvince() {
            if (this.selectedAmphoes) {

                const db = this.$fireModule.database();
                const amphoeRef = db.ref(`RECORDS_city/`);
                const prov_id = this.selectedAmphoes.province_id;

                try {
                    const snapshot = await amphoeRef
                        .orderByChild("id")
                        .equalTo(prov_id)
                        .once("value");

                    const provincesData = snapshot.val();
                    this.provinces = [];

                    for (const key in provincesData) {
                        const provinceData = provincesData[key];
                        const item = {
                            name_th: provinceData.name_th,

                        };
                        this.address.province = item.name_th;
                    }



                } catch (error) {
                    console.error("Error fetching amphoes:", error);
                }
            }

        },

        async fetchAmphoe() {
            if (this.selectedTambon) {

                const db = this.$fireModule.database();
                const amphoeRef = db.ref(`RECORDS_amp/`);
                const amp_id = this.selectedTambon.amphure_id;
                this.address.tambon = this.selectedTambon.name_th;
                this.address.postal = this.selectedTambon.zip_code;

                try {
                    const snapshot = await amphoeRef
                        .orderByChild("id")
                        .equalTo(amp_id)
                        .once("value");

                    const amphoesData = snapshot.val();
                    this.amphoes = [];

                    for (const key in amphoesData) {
                        const amphoeData = amphoesData[key];
                        const item = {
                            name_th: amphoeData.name_th,
                            province_id: amphoeData.province_id,
                        };
                        this.selectedAmphoes = item;
                        this.address.amphoe = this.selectedAmphoes.name_th;
                    }



                } catch (error) {
                    console.error("Error fetching amphoes:", error);
                }
            }
        },

        async fetchTambons() {
            const db = this.$fireModule.database();
            const tambonsRef = db.ref(`RECORDS_tambons/`);
            if (this.searchTambon) {
                tambonsRef
                    .orderByChild("name_th") // Replace 'name' with the relevant field you want to filter by
                    .startAt(this.searchTambon)
                    .endAt(this.searchTambon + "\uf8ff")
                    .once("value")
                    .then((snapshot) => {

                        const tambonsData = snapshot.val();

                        this.tambons = [];
                       
                        for (const key in tambonsData) {
                            const tambonData = tambonsData[key];
                            const item = {
                                name_th: tambonData.name_th,
                                zip_code: tambonData.zip_code,
                                amphure_id: tambonData.amphure_id,
                            };
                            this.tambons.push(item);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching tambons:", error);
                    });
            }



        },

        async fetchCurrProvince() {
            if (this.selectedCurrAmphoes) {

                const db = this.$fireModule.database();
                const amphoeRef = db.ref(`RECORDS_city/`);
                const prov_id = this.selectedCurrAmphoes.province_id;


                try {
                    const snapshot = await amphoeRef
                        .orderByChild("id")
                        .equalTo(prov_id)
                        .once("value");

                    const provincesData = snapshot.val();
                    this.provinces = [];

                    for (const key in provincesData) {
                        const provinceData = provincesData[key];
                        const item = {
                            name_th: provinceData.name_th,

                        };
                        this.currAddress.province = item.name_th;
                    }




                } catch (error) {
                    console.error("Error fetching amphoes:", error);
                }
            }

        },

        async fetchCurrAmphoe() {
            if (this.selectedCurrTambon) {
                console.log(this.selectedCurrTambon)
                const db = this.$fireModule.database();
                const amphoeRef = db.ref(`RECORDS_amp/`);
                const amp_id = this.selectedCurrTambon.amphure_id;
                this.currAddress.tambon = this.selectedCurrTambon.name_th;
                this.currAddress.postal = this.selectedCurrTambon.zip_code;

                try {
                    const snapshot = await amphoeRef
                        .orderByChild("id")
                        .equalTo(amp_id)
                        .once("value");

                    const amphoesData = snapshot.val();
                    this.amphoes = [];

                    for (const key in amphoesData) {
                        const amphoeData = amphoesData[key];
                        const item = {
                            name_th: amphoeData.name_th,
                            province_id: amphoeData.province_id,
                        };
                        this.selectedCurrAmphoes = item;
                        this.currAddress.amphoe = this.selectedCurrTambon.name_th;
                    }



                } catch (error) {
                    console.error("Error fetching amphoes:", error);
                }
            }
        },

        async fetchCurrTambons() {
            const db = this.$fireModule.database();
            const tambonsRef = db.ref(`RECORDS_tambons/`);
            if (this.searchCurrTambon) {
                tambonsRef
                    .orderByChild("name_th") 
                    .startAt(this.searchCurrTambon)
                    .endAt(this.searchCurrTambon + "\uf8ff")
                    .once("value")
                    .then((snapshot) => {

                        const tambonsData = snapshot.val();

                        this.currTambons = [];
                        let items = [];
                        for (const key in tambonsData) {
                            const tambonData = tambonsData[key];
                            const item = {
                                name_th: tambonData.name_th,
                                zip_code: tambonData.zip_code,
                                amphure_id: tambonData.amphure_id,
                            };
                            this.currTambons.push(item);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching tambons:", error);
                    });
            }



        },

        tambonValue(item) {
            return {
                name_th: item.name_th,
                amphure_id: item.amphure_id,
                zip_code: item.zip_code,
            };
        },
        currTambonValue(item) {
            return {
                name_th: item.name_th,
                amphure_id: item.amphure_id,
                zip_code: item.zip_code,
            };
        },

        isLetter(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z]+$/.test(char)) return true;
            else e.preventDefault();
        },

        encode(a) {
            const encodedData = btoa(encodeURIComponent(a))
            return encodedData;
        },

    },
}
</script>

<style>
.py-0 {

    padding-top: 0px;
    padding-bottom: 0px;
}

.upload-label {
    border-radius: 10px;
    border: 1px solid var(--brown-brown-1, #322E2B);
    color: var(--write-1, #F8F9FB);
    background: var(--brown-brown-1, #322E2B);
    display: flex;
    padding: 6px 12px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.upload-label:hover {
    color: var(--brown-brown-1, #322E2B);
    background-color: #ffffff;
}

.black-label .v-label {
    color: rgb(0, 0, 0);
    opacity: 1;
    font-weight: 500;
}
</style>