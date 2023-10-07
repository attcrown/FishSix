<template>
    <div class="container-fluid ">
        <pageLoader v-if="isLoading"></pageLoader>
        <div v-if="!isLoading" class="col mx-3 d-flex justify-content-center">
            <v-row>
                <div style="display: flex; justify-content: space-between;">
                    <h1 class="font-weight-bold">ข้อมูลครู</h1>
                    <v-btn to="/admin/awareness" router exact>ย้อนกลับ</v-btn>
                </div>
                <v-col cols="12">
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0" class="px-10">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="pl-2">ข้อมูลทั่วไป</div>
                            <div>
                                <button v-if="!isEditingDetail" class="editButton " @click="toEditDetail()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditingDetail" class="saveButton " @click="toEditDetail()"
                                    :loading="isSubmitting">
                                    <span style="color: #F8F9FB;font-size: 14px;">บันทึก</span>

                                </button>
                            </div>
                        </v-card-title>
                        <v-form ref="detailForm" @submit.prevent="toEditDetail">
                            <v-row class="mt-0" align="center">
                                <v-col cols="3" sm="3" class="pl-10">
                                    <div>
                                        <v-avatar style="max-width: 180px; width: 100%; height: 100%;max-height: 180px;">
                                            <img v-if="profilePic" :src="profilePic" alt="รูปโปรไฟล์">
                                            <v-icon style=" font-size: 100px;" v-if="!profilePic" dark>
                                                mdi-account-circle
                                            </v-icon>
                                        </v-avatar>


                                    </div>
                                </v-col>
                                <v-col cols="9">
                                    <v-row>

                                        <v-col cols="9"></v-col>
                                        <v-col cols="6" class="py-0 ">
                                            <v-text-field class="black-label" name="firstNameEng" v-model="firstNameEng"
                                                :rules="firstNameEngRules" :readonly="!isEditingDetail"
                                                label="ชื่อ (ภาษาอังกฤษ)" required v-on:keypress="isLetter($event)">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <v-text-field class="black-label" name="lastNameEng" v-model="lastNameEng"
                                                label="นามสกุล (ภาษาอังกฤษ)" required :rules="lastnameEngRules"
                                                :readonly="!isEditingDetail" v-on:keypress="isLetter($event)">
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="6" class="py-0">
                                            <v-text-field label="ชื่อ" name="firstName" v-model="firstName"
                                                :rules="firstNameRules" :readonly="!isEditingDetail"
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <v-text-field label="นามสกุล" name="lastName" v-model="lastName"
                                                :readonly="!isEditingDetail" :rules="lastnameRules" required></v-text-field>
                                        </v-col>
                                        <v-col cols="4" class="py-0">
                                            <v-text-field label="ชื่อเล่น" name="nickname" v-model="nickname"
                                                :readonly="!isEditingDetail" :rules="nicknameRules" required></v-text-field>
                                        </v-col>
                                        <v-col cols="5" class="py-0">

                                        </v-col>
                                        <v-col cols="4" class="py-0">
                                            <v-text-field v-if="!isEditingDetail" label="เพศ" name="gender" v-model="gender"
                                                :readonly="!isEditingDetail"></v-text-field>
                                            <v-select v-if="isEditingDetail" v-model="gender" :items="genders"
                                                label="เพศ"></v-select>
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
                                        <v-text-field label="อาชีพปัจจุบัน" name="currJob" v-model="currJob"
                                            :readonly="!isEditingDetail"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="เบอร์" name="mobile" v-model="mobile" :rules="mobileRules"
                                            :readonly="!isEditingDetail" :counter="isEditingDetail" required></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="อีเมลล์" name="email" v-model="email" :rules="emailRules"
                                            :readonly="!isEditingDetail"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field label="เลขบัตรประชาชน" name="idCardNumber" v-model="idCardNumber"
                                            :rules="idCardRules" :counter="isEditingDetail"
                                            :readonly="!isEditingDetail"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <label>สำเนาบัตรประชาชน</label><br>
                                        <!-- <v-file-input label="อัพโหลดสำเนาบัตรประชาชน" v-model="idCardCopy" disabled
                                        accept=".pdf,image/*"></v-file-input> -->
                                        <a v-if="idCardCopy" href="" @click="downloadFile()"> View</a>
                                        <a v-if="!idCardCopy"> ไม่มี</a>
                                    </v-col>

                                </v-row>

                            </v-row>
                        </v-form>
                    </v-card>
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-7">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลที่อยู่</div>
                            <div>
                                <button v-if="!isEditingAddress" class="editButton " @click="toEditAddress()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditingAddress" class="saveButton " @click="toEditAddress()">
                                    <span style="color: #F8F9FB;font-size: 14px;">บันทึก</span>

                                </button>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="addressForm">
                                <v-row>
                                    <p>&#x2022; ที่อยู่ตามบัตรประชาชน</p>
                                    <v-col cols="4">
                                        <v-text-field name="houseNo" label="บ้านเลขที่" :readonly="!isEditingAddress"
                                            v-model="address.houseNo"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field v-if="!isEditingAddress" name="tambon" label="ตำบล/แขวง"
                                            :readonly="!isEditingAddress" v-model="address.tambon"></v-text-field>

                                        <v-autocomplete v-if="isEditingAddress" class="black-label" v-model="selectedTambon"
                                            :items="tambons" :item-value="tambonValue" item-text="name_th"
                                            :search-input.sync="searchTambon" no-data-text="กรุณากรอกชื่อตำบล"
                                            @update:search-input="fetchTambons" label="ตำบล"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="amphoe" label="อำเภอ/เขต" :readonly="!isEditingAddress"
                                            v-model="address.amphoe"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field name="province" label="จังหวัด" :readonly="!isEditingAddress"
                                            v-model="address.province"></v-text-field>

                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field name="postal" label="รหัสไปรษณีย์" :rules="postalRules"
                                            :readonly="!isEditingAddress" v-model="address.postal"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <div class="text-center ">
                                            <hr class=" solid">
                                        </div>

                                    </v-col>
                                    <v-row class="px-4">
                                        <p class="py-0">&#x2022; ที่อยู่ปัจจุบัน
                                            <v-checkbox label="ที่อยู่ตามบัตรประชาชน " :disabled="!isEditingAddress"
                                                @click="updateCurrAddress()"></v-checkbox>
                                        </p>

                                        <v-col cols="4">
                                            <v-text-field name="curr_houseNo" label="บ้านเลขที่"
                                                :readonly="!isEditingAddress" :disabled="isAddressSame"
                                                v-model="currAddress.houseNo"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-if="!isEditingAddress || isAddressSame" name="curr_tambon"
                                                label="ตำบล/แขวง" readonly :disabled="isAddressSame"
                                                v-model="currAddress.tambon"></v-text-field>

                                            <v-autocomplete v-if="isEditingAddress && !isAddressSame" class="black-label"
                                                :disabled="isAddressSame" v-model="selectedCurrTambon" :items="currTambons"
                                                :item-value="currTambonValue" item-text="name_th"
                                                :search-input.sync="searchCurrTambon" no-data-text="กรุณากรอกชื่อตำบล"
                                                @update:search-input="fetchCurrTambons" label="ตำบล"></v-autocomplete>

                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field name="curr_amphoe" label="อำเภอ/เขต" :readonly="!isEditingAddress"
                                                :disabled="isAddressSame" v-model="currAddress.amphoe"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field name="curr_province" label="จังหวัด" :readonly="!isEditingAddress"
                                                :disabled="isAddressSame" v-model="currAddress.province"></v-text-field>

                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field name="curr_postal" label="รหัสไปรษณีย์" :rules="postalRules"
                                                :disabled="isAddressSame" :readonly="!isEditingAddress"
                                                v-model="currAddress.postal"></v-text-field>
                                        </v-col>

                                    </v-row>
                                </v-row>


                            </v-form>
                        </v-card-text>

                    </v-card>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลสัญญาจ้าง</div>
                            <div>
                                <button v-if="!isEditingContract" class="editButton " @click="toEditContract()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditingContract" class="saveButton " @click="toEditContract()">
                                    <span style="color: #F8F9FB;font-size: 14px;">บันทึก</span>

                                </button>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="contractForm">
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field v-if="!isEditingContract" name="contract" label="สัญญาจ้าง"
                                            :readonly="!isEditingContract" v-model="contract"></v-text-field>
                                        <v-select v-if="isEditingContract" class="black-label" v-model="contract"
                                            :items="contracts" label="สัญญาจ้าง" multiple></v-select>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field v-if="!isEditingContract" name="workType" label="ประเภทการทำงาน"
                                            :readonly="!isEditingContract" v-model="workType"></v-text-field>
                                        <v-select v-if="isEditingContract" v-model="workType" :items="workTypes"
                                            label="ประเภทการทำงาน"></v-select>
                                    </v-col>

                                    <v-col cols="4">
                                        <v-text-field v-if="!isEditingContract" name="startDate" label="วันที่เริ่มงาน"
                                            :readonly="!isEditingContract" v-model="startDate"></v-text-field>
                                        <v-menu v-if="isEditingContract" ref="menu" v-model="menu"
                                            :close-on-content-click="false" transition="scale-transition" offset-y
                                            min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="startDate" label="วันที่เริ่มงาน" name="startDate"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="startDate" :active-picker.sync="activePicker"
                                                min="1950-01-01" @change="save"></v-date-picker>
                                        </v-menu>
                                    </v-col>

                                    <v-col cols="4">
                                        <v-select v-if="!isEditingContract" class="black-label" v-model="classLocation"
                                            :items="classLocations" item-text="name" item-value="key"
                                            :readonly="!isEditingContract" label="สาขาที่สามารถสอนได้" multiple></v-select>

                                        <v-select v-if="isEditingContract" class="black-label" v-model="classLocation"
                                            :items="classLocations" item-text="name" item-value="key"
                                            label="สาขาที่สามารถสอนได้" multiple></v-select>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select class="black-label" v-model="type_Flip" :items="type_all" item-text="name"
                                            item-value="key" label="Type & Tier FlipClass"
                                            :readonly="!isEditingContract"></v-select>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select class="black-label" v-model="type_Private" :items="type_private_all"
                                            item-text="name" item-value="key" label="Type & Tier PrivateClass"
                                            :readonly="!isEditingContract"></v-select>
                                    </v-col>
                                </v-row>


                            </v-form>
                        </v-card-text>

                    </v-card>
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลการศึกษา</div>
                            <div>
                                <button v-if="!isEditingEducation" class="editButton " @click="toEditEducation()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditingEducation" class="saveButton " @click="toEditEducation()">
                                    <span style="color: #F8F9FB;font-size: 14px;">บันทึก</span>

                                </button>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="educationForm">
                                <v-row>

                                    <v-col cols="4">
                                        <v-text-field name="university" label="มหาวิทยาลัย" :readonly="!isEditingEducation"
                                            v-model="university"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="faculty" label="คณะ" :readonly="!isEditingEducation"
                                            v-model="faculty"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="major" label="สาขา" :readonly="!isEditingEducation"
                                            v-model="major"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <label>
                                            <span class="text-danger">*</span>
                                            <span style="color: #000;font-size: 16px;">วิชาที่สอนได้</span>

                                        </label>
                                        <table class="table table-sm">
                                            <tbody>
                                                <tr v-for="subject in subjects" :key="subject.name">
                                                    <td>{{ subject.name }}</td>
                                                    <td v-for="(level, index) in subject.level" :key="index">
                                                        <v-checkbox class="m-0"
                                                            :input-value="isChecked(subject.name, level, subject.key)"
                                                            @click="updateSelectedSubjects(subject.key, level, subject.name)"
                                                            :label="level" :disabled="!isEditingEducation">
                                                        </v-checkbox>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>

        </div>
        <div class="d-flex justify-center">
            <v-btn v-if="action == 'Pending'" color=red @click="approveDialog = true; isApprove = false;" elevation="8">
                <b style="color: #F8F9FB;">Disapprove</b>
                <v-icon right color="#FFF">mdi-close</v-icon>
            </v-btn>
            <v-btn class="ms-2" color=green @click="approveDialog = true; isApprove = true;" elevation="8">
                <b style="color: #FFF;">Approve</b>
                <v-icon right color="#FFF">mdi-check</v-icon>
            </v-btn>
        </div>
        <!-- dialog -->
        <v-dialog v-model="approveDialog" max-width="500px">
            <v-card>

                <v-card-title class="text-h5 text-center" :class="(isApprove === true ? 'green' : 'red')"> ยืนยัน
                </v-card-title>
                <v-card-text class=" text-center mt-2">
                    <div v-if="isApprove" class="text-h5">ต้องการ Approve ข้อมูลของคุณ<br> {{ firstName }} {{ lastName }}
                        หรือไม่?</div>
                    <div v-else class="text-h5">ต้องการ Disapprove ข้อมูลของคุณ<br> {{ firstName }} {{ lastName }}
                        หรือไม่?</div>
                    <v-text-field name="approvalName" label="ชื่อผู้ที่ดำเนินการ" v-model="approvalName" required></v-text-field>
                </v-card-text>

                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="grey " outlined @click="approveDialog = false">ยกเลิก</v-btn>
                    <v-btn v-if="isApprove" color="green darken-1 text-white" @click="approve">ตกลง</v-btn>
                    <v-btn v-else color="red darken-1 text-white" @click="disapprove">ตกลง</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar class="font-weight-medium" :color="snackbarColor" v-model="showSnackbar" :timeout="1000">
            <v-icon class="mr-2">mdi-alert-circle</v-icon>{{ snackbarMessage }}
        </v-snackbar>
    </div>
</template>
  
<script>
import pageLoader from '@/components/loader.vue';
import { Timestamp } from "firebase/firestore";
export default {

    data() {
        return {
            type_Flip: null,
            type_Private: null,
            type_all: [],
            type_private_all: [],
            approveDialog: false,
            dialogDetail: '',
            isApprove: false,
            //status
            status: "teacher",
            teacherId: null,
            createdAt: null,
            name: null,
            password: 'FishsixTeacher',
            isLoading: true,
            userId: null,
            teacherId: null,
            lastTeacherId: null,
            activePicker: null,
            date: null,
            menu: false,
            isSubmitting: false,
            isEditingDetail: false,
            isEditingAddress: false,
            isAddressSame: false,
            isEditingContract: false,
            isEditingEducation: false,
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',

            //data
            approvalName:null,
            action: null,
            profilePic: null,
            profilePicUpload: null,
            firstNameEng: null,
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
            classLocation: [],
            classLocationDisplay: [],
            startDate: null,
            rate: null,
            university: null,
            faculty: null,
            major: null,
            subjects: [],
            selectedSubjects: [],

            //api
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

            //static
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
            classLocations: [],



            //rules

            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            firstNameEngRules: [

                v => !v || (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            lastnameEngRules: [

                v => !v || (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            firstNameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            lastnameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            nicknameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            postalRules: [
                value => !value || /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],

            idCardRules: [

                value => !value || /^\d{13}$/.test(value) || 'รูปแบบหมายเลขบัตรประชาชนไม่ถูกต้อง'
            ],
            mobileRules: [

                value => !value || /^(\d|-){9,13}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ]
            ,

            emailRules: [

                value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'รูปแบบอีเมลไม่ถูกต้อง'
            ],

            teacherIdRules: [
                value => !!value || 'กรุณากรอก รหัสครู',
                value => /^FS\d{4}$/.test(value) || 'รูปแบบ รหัสครู ไม่ถูกต้อง (ต้องเป็น FS ตามด้วยตัวเลข 4 หลัก)'

            ],

        }

    },
    components: {
        pageLoader
    },
    mounted() {
        const value = this.$route.query.registerId;
        this.userId = value;
        this.readdata();
        this.fetchData();
        this.readSubject();
        this.getlocation();
        this.initialize();
        this.getTeacherLocation();
        this.typeClass();
        this.typePrivateClass();
    },

    computed: {

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
        typeClass() {
            const db = this.$fireModule.database();
            db.ref(`type_all/`).once("value", (snapshot) => {
                let type = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    type.push({ key: key, name: childData[key].name, bath: childData[key].bath });
                }
                this.type_all = type;
            })
        },
        typePrivateClass() {
            const db = this.$fireModule.database();
            db.ref(`type_private_all/`).once("value", (snapshot) => {
                let type = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    type.push({ key: key, name: childData[key].name, bath: childData[key].bath });
                }
                this.type_private_all = type;
            })
        },
        async initialize() {

            await Promise.all([this.fetchData(), this.readdata(), this.readSubject()]).then(this.getTeacherLocation());


        },
        getlocation() {
            const db = this.$fireModule.database();
            db.ref(`location/`).on("value", (snapshot) => {
                this.classLocations = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    this.classLocations.push({ key: key, name: childData[key].name });
                }
            })

        },

        async getTeacherLocation() {
            const db = this.$fireModule.database();
            if (this.classLocation == undefined) {
                return;
            }
            for (let i = 0; i < this.classLocation.length; i++) {

                const classSnapshot = await db.ref(`location/${this.classLocation[i]}`).once("value");
                const childClassData = classSnapshot.val();
                this.classLocationDisplay.push(childClassData.name)

            }
        },

        validateDetailEdit() {
            return this.$refs[`detailForm`].validate();
        },
        validateAddressEdit() {
            return this.$refs[`addressForm`].validate();
        },
        validateContractEdit() {
            return this.$refs[`contractForm`].validate();
        },
        validateEducationEdit() {
            return this.$refs[`educationForm`].validate();
        },
        async toEditDetail() {
            if (this.isEditingDetail == true) {

                if (this.validateDetailEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;
                    const isIDDuplicate = await this.checkDuplicateName(this.teacherId);
                    if (isIDDuplicate && this.lastTeacherId != this.teacherId) {
                        this.openSnackbar("error", 'รหัสของครูซ้ำ รหัสที่ซ้ำคือ ' + this.teacherId);
                        this.isSubmitting = false;
                        return;
                    }
                    await db.ref(`teacher_register/${this.userId}/`).update({

                        profilePic: this.profilePic,
                        firstNameEng: this.firstNameEng,
                        lastNameEng: this.lastNameEng,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        nickname: this.nickname,
                        mobile: this.mobile,
                        email: this.email,
                        gender: this.gender,
                        currJob: this.currJob,
                        idCardNumber: this.idCardNumber,
                        idCardCopy: this.idCardCopy,
                    })
                        .then(() => {

                            this.openSnackbar('success', 'แก้ไขข้อมูลเสร็จสิ้น ');
                            this.isSubmitting = false;
                            this.isEditingDetail = false;
                        })
                        .catch((error) => {

                            this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ' + error);
                            this.isSubmitting = false;
                            this.isEditingDetail = false;
                        });

                }

            }
            else {
                this.isEditingDetail = true;
            }
        },

        async checkDuplicateName(id) {
            const db = this.$fireModule.database();
            const snapshot = await db.ref('teacher_register').orderByChild('teacherId').equalTo(id).once('value');
            const existingTeacher = snapshot.val();
            return !!existingTeacher;
        },

        updateCurrAddress() {
            if (this.isAddressSame) {

                this.currAddress = { houseNo: null, tambon: null, amphoe: null, province: null, postal: null };
                this.isAddressSame = false;

            }
            else {
                this.isAddressSame = true;
            }

            if (this.address) {

                this.currAddress = { ...this.address };

            } else {
                this.currAddress = null;
            }
        },
        async toEditAddress() {
            if (this.isEditingAddress == true) {
                this.isEditingAddress = false;

                if (this.validateAddressEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;


                    await db.ref(`teacher_register/${this.userId}/`).update({
                        address: this.address,
                        currAddress: this.currAddress,
                        ...(this.isAddressSame ? { currAddress: this.address } : {}),

                    })
                        .then(() => {

                            this.openSnackbar('success', 'แก้ไขข้อมูลที่อยู่เสร็จสิ้น ');
                            this.isSubmitting = false;
                            this.isEditingAddress = false;
                        })
                        .catch((error) => {

                            this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ', error);
                            this.isSubmitting = false;
                            this.isEditingAddress = false;
                        });

                }



            }
            else {
                this.isEditingAddress = true;
            }
        },

        async toEditContract() {
            if (this.isEditingContract == true) {
                this.isEditingContract = false;
                console.log(this.$refs[`contractForm`])
                console.log(this.$refs[`contractForm`].validate())
                if (this.validateContractEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;


                    await db.ref(`teacher_register/${this.userId}/`).update({
                        contract: this.contract,
                        workType: this.workType,
                        classType: this.classType,
                        startDate: this.startDate,
                        rate: this.rate,
                        classLocation: this.classLocation,
                        typeflip: this.type_Flip,
                        typeprivate: this.type_Private
                    })
                        .then(() => {

                            this.openSnackbar('success', 'แก้ไขข้อมูลเสร็จสิ้น ');
                            this.getTeacherLocation();
                            this.isSubmitting = false;
                            this.isEditingContract = false;
                        })
                        .catch((error) => {

                            this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ');
                            this.isSubmitting = false;
                            this.isEditingContract = false;
                        });

                }
            }
            else {
                this.isEditingContract = true;
            }
        },

        async toEditEducation() {
            if (this.isEditingEducation == true) {
                this.isEditingEducation = false;
                if (this.validateEducationEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;

                    await db.ref(`teacher_register/${this.userId}/`).update({
                        university: this.university,
                        faculty: this.faculty,
                        major: this.major,
                        selectedSubjects: this.selectedSubjects,
                    })
                        .then(() => {

                            this.openSnackbar('success', 'แก้ไขข้อมูลเสร็จสิ้น ');
                            this.isSubmitting = false;
                            this.isEditingEducation = false;
                        })
                        .catch((error) => {

                            this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ', error);
                            this.isSubmitting = false;
                            this.isEditingEducation = false;
                        });

                    if (this.selectedSubjects.length !== 0) {
                        for (let subject of this.selectedSubjects) {

                            await db.ref(`teacher_register/${this.userId}/subject_all/${subject.key}`).set({
                                name: subject.name,
                                level: subject.level,

                            });
                        }
                    }
                    else {
                        await db.ref(`teacher_register/${this.userId}/subject_all/`).remove();
                    }
                }
            }
            else {
                this.isEditingEducation = true;
            }
        },

        save(date) {
            this.$refs.menu.save(date)
        },


        downloadFile() {
            window.open(this.idCardCopy, '_blank');
        },

        isChecked(subjectName, level, key) {
            const selectedSubject = this.selectedSubjects.find(subject => subject.name === subjectName);
            return selectedSubject && selectedSubject.level.includes(level);
        },

        isSameAddress() {
            if (this.address.length !== this.currAddress.length) {
                return false;
            }

            for (let i = 0; i < this.address.length; i++) {
                if (this.address[i] !== this.currAddress[i]) {
                    return false;
                }
            }

            return true && !this.isEditingAddress;
        },

        openSnackbar(status, message) {
            this.showSnackbar = true;
            this.snackbarMessage = message;
            this.snackbarColor = status;
        },

        async approve() {
            if(this.approvalName==null)
            {
                this.openSnackbar("error", 'กรุณากรอกชื่อผู้ที่ Approve');
                return;
            }
            this.isSubmitting = true;
            const db = this.$fireModule.database();
            const snapshot = await db.ref('user').orderByChild('teacherId').limitToLast(1).once('value');
            const lastTeacher = snapshot.val();
            for (const key in lastTeacher) {
                if (lastTeacher[key].status == 'admin' || !lastTeacher) {
                    this.teacherId = 'FS0001';

                    return;
                } else {
                    const lastTeacherId = Object.keys(lastTeacher)[0];
                    const lastTeacherCode = lastTeacher[lastTeacherId].teacherId;
                    const numericPart = parseInt(lastTeacherCode.slice(2), 10) + 1;
                    const nextId = `FS${String(numericPart).padStart(4, '0')}`;
                    this.teacherId = nextId;
                    this.name = nextId;

                }
            }
            console.log(this.teacherId)
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
            await db.ref(`user/${this.userId}/`).set({
                status: this.status,
                approvalName: this.approvalName,
                teacherId: this.teacherId,
                name: this.name,
                createdAt: this.createdAt,
                password: this.password,
                profilePic: this.profilePic,
                firstNameEng: this.firstNameEng,
                lastNameEng: this.lastNameEng,
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

            for (let subject of this.selectedSubjects) {

                await db.ref(`user/${this.userId}/subject_all/${subject.key}`).set({
                    name: subject.name,
                    level: subject.level,

                })
            }
            this.isSubmitting = false;
            this.isAlreadySubmit = true;
            this.removeTeacherRegister();
        },


        removeTeacherRegister() {
            const db = this.$fireModule.database();
            console.log(this.userId)
            db.ref(`teacher_register/${this.userId}`).remove().then(() => {

                this.openSnackbar('success', 'ยืนยันข้อมูลเสร็จสิ้น ');

                this.isSubmitting = false;
                window.location.href = "/admin/awareness/"

            })
                .catch((error) => {

                    this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ' + error);
                    this.isSubmitting = false;

                });

        },
        async disapprove() {
            if(this.approvalName==null)
            {
                this.openSnackbar("error", 'กรุณากรอกชื่อผู้ที่ Approve');
                return;
            }
            const db = this.$fireModule.database();
            await db.ref(`teacher_register/${this.userId}/`).update({
                action: 'Disapprove',

            })
                .then(() => {

                    this.openSnackbar('success', 'ยืนยันข้อมูลเสร็จสิ้น ');

                    this.isSubmitting = false;
                    window.location.href = "/admin/awareness/"

                })
                .catch((error) => {

                    this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ' + error);
                    this.isSubmitting = false;

                });

        },

        async readdata() {

            const db = this.$fireModule.database();
            await db.ref(`teacher_register/${this.userId}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                console.log(snapshot.val())
                this.profilePic = childData.profilePic || null;
                this.action = childData.action || null;
                this.firstNameEng = childData.firstNameEng || null;
                this.lastNameEng = childData.lastNameEng || null;
                this.firstName = childData.firstName || null;
                this.lastName = childData.lastName || null;
                this.nickname = childData.nickname || null;
                this.mobile = childData.mobile || null;
                this.email = childData.email || null;
                this.gender = childData.gender || null;
                this.currJob = childData.currJob || null;
                this.idCardNumber = childData.idCardNumber || null;
                this.idCardCopy = childData.idCardCopy || null;
                this.contract = childData.contract || null;
                this.workType = childData.workType || null;
                this.classtype = childData.classtype || null;
                this.classLocation = childData.classLocation || null;
                this.startDate = childData.startDate || null;

                this.university = childData.university || null;
                this.faculty = childData.faculty || null;
                this.major = childData.major || null;
                this.type_Flip = childData.typeflip || null;
                this.type_Private = childData.typeprivate || null;
                try {
                    this.address.houseNo = childData.address.houseNo || null;
                    this.address.tambon = childData.address.tambon || null;
                    this.address.amphoe = childData.address.amphoe || null;
                    this.address.province = childData.address.province || null;
                    this.address.postal = childData.address.postal || null;
                } catch (error) {
                    this.isLoading = false;
                }

                try {
                    this.currAddress.houseNo = childData.currAddress.houseNo || null;
                    this.currAddress.tambon = childData.currAddress.tambon || null;
                    this.currAddress.amphoe = childData.currAddress.amphoe || null;
                    this.currAddress.province = childData.currAddress.province || null;
                    this.currAddress.postal = childData.currAddress.postal || null;
                } catch (error) {
                    this.isLoading = false;
                }


                this.isLoading = false;

            })



        },

        async fetchData() {
            const db = this.$fireModule.database();
            const snapshot = await db.ref(`teacher_register/${this.userId}/subject_all`).once("value");
            const childData = snapshot.val();
            const selectedItems = [];

            for (const key in childData) {
                const snapshotName = await db.ref(`teacher_register/${this.userId}/subject_all/${key}`).once("value");
                const snapshotLevel = await db.ref(`teacher_register/${this.userId}/subject_all/${key}/level`).once("value");

                const childDataName = snapshotName.val();
                const childDataLevel = snapshotLevel.val();

                const item = {
                    key: key,
                    level: childDataLevel,
                    name: childDataName.name
                };

                selectedItems.push(item);
            }

            this.selectedSubjects = selectedItems;



        },

        async readSubject() {
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
            console.log(this.selectedSubjects);

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
                        let items = [];
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

};
</script>
  
<style scoped>
.editButton {
    display: flex;
    padding: 0px 12px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    border: 1px solid var(--brown-1, #322E2B);
    background: var(--brown-1, #322E2B);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.editButton:hover {
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-4px);
}

.saveButton {
    display: flex;
    padding: 0px 12px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    border: 1px solid var(--green, #29CC39);
    background: var(--green, #29CC39);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.saveButton:hover {
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-4px);
}

hr.solid {
    border-top: 3px solid black;
    border-width: 3px;
    opacity: 1;
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
  