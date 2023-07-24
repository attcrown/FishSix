<template>
    <div class="container-fluid ">
        <pageLoader v-if="isLoading"></pageLoader>
        <div v-if="!isLoading" class="col mx-3 d-flex justify-content-center">
            <v-row>
                <div style="display: flex; justify-content: space-between;">
                    <h1 class="font-weight-bold">ข้อมูลครู</h1>
                    <v-btn to="/admin/teacher" router exact>ย้อนกลับ</v-btn>
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
                                <button v-if="isEditingDetail" class="saveButton " @click="toEditDetail()">
                                    <span style="color: #F8F9FB;font-size: 14px;">บันทึก</span>

                                </button>
                            </div>
                        </v-card-title>
                        <form ref="detailForm">
                            <v-row class="mt-0" align="center">
                                <v-col cols="3" sm="3" class="pl-10">
                                    <div>
                                        <v-avatar style="max-width: 350px; width: 100%; height: 100%;max-height: 350px;">
                                            <img v-if="profilePic" :src="profilePic" alt="รูปโปรไฟล์">
                                            <v-icon style=" font-size: 100px;" v-if="!profilePic" dark>
                                                mdi-account-circle
                                            </v-icon>
                                        </v-avatar>


                                    </div>
                                </v-col>
                                <v-col cols="9">
                                    <v-row>
                                        <v-col cols="3">
                                            <v-text-field v-model="teacherId" counter label="รหัสครู (ไม่จำเป็นต้องกรอก)">
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
                                        <v-col cols="9"></v-col>
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
                                            :rules="idCardRules" :counter="isEditingDetail" :readonly="!isEditingDetail"
                                            ></v-text-field>
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
                        </form>
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
                                        <v-text-field name="tambon" label="ตำบล/แขวง" :readonly="!isEditingAddress"
                                            v-model="address.tambon"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="amphoe" label="อำเภอ/เขต" :readonly="!isEditingAddress"
                                            v-model="address.amphoe"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-if="!isEditingAddress" name="province" label="จังหวัด"
                                            :readonly="!isEditingAddress" v-model="address.province"></v-text-field>
                                        <v-autocomplete v-if="isEditingAddress" name="province" v-model="address.province"
                                            :items="provinceOptions" autocomplete label="จังหวัด"></v-autocomplete>
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
                                        <p class="py-0">&#x2022; ที่อยู่ปัจจุบัน <v-checkbox label="ที่อยู่ตามบัตรประชาชน "
                                                :input-value="isSameAddress()" :disabled="!isEditingAddress"
                                                @click="updateCurrAddress()"></v-checkbox></p>

                                        <v-col cols="4">
                                            <v-text-field name="curr_houseNo" label="บ้านเลขที่"
                                                :readonly="!isEditingAddress" v-model="currAddress.houseNo"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field name="curr_tambon" label="ตำบล/แขวง" :readonly="!isEditingAddress"
                                                v-model="currAddress.tambon"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field name="curr_amphoe" label="อำเภอ/เขต" :readonly="!isEditingAddress"
                                                v-model="currAddress.amphoe"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-if="!isEditingAddress" name="curr_province" label="จังหวัด"
                                                :readonly="!isEditingAddress" v-model="currAddress.province"></v-text-field>
                                            <v-autocomplete v-if="isEditingAddress" name="curr_province"
                                                v-model="currAddress.province" :items="provinceOptions" autocomplete
                                                label="จังหวัด"></v-autocomplete>

                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field name="curr_postal" label="รหัสไปรษณีย์" :rules="postalRules"
                                                :readonly="!isEditingAddress" v-model="currAddress.postal"></v-text-field>
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
                            <v-form ref="contractFrom">
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
                                            label="ประเภทการทำงาน" required></v-select>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field v-if="!isEditingContract" name="classType" label="ประเภทคลาส"
                                            :readonly="!isEditingContract" v-model="classType"></v-text-field>
                                        <v-select v-if="isEditingContract" class="black-label" v-model="classType" :items="classTypes"
                                            label="ประเภทคลาส" multiple ></v-select>
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
                                                    :rules="startDateRules" required v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="startDate" :active-picker.sync="activePicker"
                                                min="1950-01-01" @change="save"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field v-if="!isEditingContract" name="rate" v-model="rate"
                                            :readonly="!isEditingContract" label="เรทค่าสอน/ชั่วโมง"></v-text-field>
                                        <v-text-field v-if="isEditingContract" name="rate" type="number"
                                            label="เรทค่าสอน/ชั่วโมง" min="0" max="99999" maxlength="5" :rules="rateRules"
                                            oninput="validity.valid||(value='');" v-model="rate"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field v-if="!isEditingContract" name="classLocation" v-model="classLocation"
                                            :readonly="!isEditingContract" label="สาขาที่สามารถสอนได้"></v-text-field>
                                        <v-select v-if="isEditingContract" class="black-label" v-model="classLocation" :items="classLocations"
                                            label="สาขาที่สามารถสอนได้" multiple></v-select>
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
                                            <span v-if="isEditingEducation" class="text-danger"
                                                style="font-size: 10px;">กรณีต้องการแก้ส่วนนี้ กรุณาติดต่อผู้ดูแลระบบ</span>
                                        </label>
                                        <table class="table table-sm">
                                            <tbody>
                                                <tr v-for="subject in subjects" :key="subject.name">
                                                    <td>{{ subject.name }}</td>
                                                    <td v-for="(level, index) in subject.level" :key="index">
                                                        <v-checkbox class="m-0"
                                                            :input-value="isChecked(subject.name, level, subject.key)"
                                                            @click="updateSelectedSubjects(subject.key, level, subject.name)"
                                                            :label="level" disabled>
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
        <!-- dialog -->

    </div>
</template>
  
<script>
import pageLoader from '@/components/loader.vue';

export default {

    data() {
        return {
            //status
            isLoading: true,
            userId: null,
            teacherId: null,
            isEditingDetail: false,
            isEditingAddress: false,
            isEditingContract: false,
            isEditingEducation: false,

            //data
            profilePic: null,
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
            classType:null,
            classLocation:null, 
            startDate: null,
            rate: null,
            university: null,
            faculty: null,
            major: null,
            subjects: [],
            selectedSubjects: [],
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
            classLocations: [
                'งามวงศ์วาน',
                'บางกะปิ',
                'สยาม',
                'พระราม 2',
                'ศาลายา',
                'ปิ่นเกล้า',
                'ชลบุรี',
                'รามอินทรา',
                'บางนา',
                'รังสิต',
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

            //rules

            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            firstNameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            lastnameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            nicknameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            postalRules: [
                value => !!value || 'กรุณากรอกรหัสไปรษณีย์',
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],
            idCardRules: [
                value => !!value || 'กรุณากรอกหมายเลขบัตรประชาชน',
                value => /^\d{13}$/.test(value) || 'รูปแบบหมายเลขบัตรประชาชนไม่ถูกต้อง'
            ],

            mobileRules: [
                value => !!value || 'กรุณากรอก เบอร์โทรศัพท์',
                value => /^\d{9,10}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ],

            emailRules: [
                value => !!value || 'กรุณากรอก อีเมล',
                value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'รูปแบบอีเมลไม่ถูกต้อง'
            ],

            rateRules: [
                value => !!value || 'กรุณากรอกเรทค่าจ้าง',

            ],

        }

    },
    components: {
        pageLoader
    },
    mounted() {
        const value = this.$route.query.teacherId;
        this.userId = value;
        this.readdata();
        this.fetchData();
        this.readSubject();

    },

    computed: {

    },


    methods: {



        toEditDetail() {
            if (this.isEditingDetail == true) {
                this.isEditingDetail = false;
            }
            else {
                this.isEditingDetail = true;
            }
        },

        toEditAddress() {
            if (this.isEditingAddress == true) {
                this.isEditingAddress = false;
            }
            else {
                this.isEditingAddress = true;
            }
        },

        toEditContract() {
            if (this.isEditingContract == true) {
                this.isEditingContract = false;
            }
            else {
                this.isEditingContract = true;
            }
        },

        toEditEducation() {
            if (this.isEditingEducation == true) {
                this.isEditingEducation = false;
            }
            else {
                this.isEditingEducation = true;
            }
        },



        updateCurrAddress() {
            if (this.address) {
                this.currAddress = { ...this.address };
            } else {
                this.currAddress = null;
            }
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

        async readdata() {

            const db = this.$fireModule.database();
            await db.ref(`user/${this.userId}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.profilePic = childData.profilePic || null;
                this.teacherId = childData.teacherId || null;
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
                this.rate = childData.rate;
                this.university = childData.university || null;
                this.faculty = childData.faculty || null;
                this.major = childData.major || null;
              
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
                    this.currAddress.houseNo = childData.address.houseNo || null;
                this.currAddress.tambon = childData.address.tambon || null;
                this.currAddress.amphoe = childData.address.amphoe || null;
                this.currAddress.province = childData.address.province || null;
                this.currAddress.postal = childData.address.postal || null;
                } catch (error) {
                    this.isLoading = false;
                }

                this.isLoading = false;

            })

        },

        async fetchData() {
            const db = this.$fireModule.database();
            const snapshot = await db.ref(`user/${this.userId}/subject_all`).once("value");
            const childData = snapshot.val();
            const selectedItems = [];

            for (const key in childData) {
                const snapshotName = await db.ref(`user/${this.userId}/subject_all/${key}`).once("value");
                const snapshotLevel = await db.ref(`user/${this.userId}/subject_all/${key}/level`).once("value");

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
</style> 
  