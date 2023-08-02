<template>
    <div class="container-fluid ">
        <pageLoader v-if="isLoading"></pageLoader>
        <div v-if="!isLoading" class="col mx-3 d-flex justify-content-center">
            <v-row>

                <div style="max-width: 500px;">
                    <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                </div>

                <v-col cols="12">
                    <v-row>
                        <style>
                            .time-label {
                                color: #000;
                                font-size: 22px;
                                font-weight: 500;

                            }

                            .des-label {
                                color: #000;
                                font-size: 16px;
                                font-weight: 300;

                            }
                        </style>
                        <v-col cols="3">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-5">
                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="time-label mb-3">{{formattedTotalHour }}</div>
                                        <div class="des-label">ชั่วโมงเรียนทั้งหมด </div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-5">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="time-label mb-3">{{formattedStudyHour }}</div>
                                        <div class="des-label">ชั่วโมงที่เรียนไปแล้ว</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-5">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="time-label mb-3">{{ formattedHourLeft}}</div>
                                        <div class="des-label">ชั่วโมงเรียนที่เหลือ</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลเกี่ยวกับคอร์ส</div>
                            <div>

                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                          
                            
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" v-model="classType" readonly
                                        label="ประเภทคลาส"></v-text-field>
                                </v-col>
                                <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>
                                <v-col class="py-0" cols="4"> <v-text-field class="black-label" v-model="wantedTeacher"
                                        readonly label="ต้องการเรียนกับครู" item-text="teacher.firstName"></v-text-field>

                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" name="annotation" v-model="annotation" readonly
                                        label="หมายเหตุ">
                                    </v-text-field>

                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
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
                                    <v-avatar style="max-width: 350px; width: 100%; height: 100%;max-height: 350px;">
                                        <img v-if="profilePic" :src="profilePic" alt="รูปโปรไฟล์">
                                        <v-icon style=" font-size: 100px;" v-if="!profilePic" dark>
                                            mdi-account-circle
                                        </v-icon>
                                    </v-avatar>

                                </div>
                            </v-col>
                            <v-col cols="10">
                                <v-row>
                                    <v-col class="py-0" cols="4">
                                        <div style="color: var(--brown-brown-2, #27262B);font-size: 20px;font-weight: 500;">
                                            รหัสนักเรียน: {{ studentId }}</div>
                                        <!-- <v-text-field class="black-label" v-model="studentId" counter
                                            label="รหัสนักเรียน (ไม่จำเป็นต้องกรอก)" disabled>
                                            <template v-slot:append>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                    </template>
                                                    <span>FSS ตามด้วยเลข 4 หลัก
                                                        <br>โดยเป็นตัวพิมพ์ใหญ่ทั้งหมด</span>
                                                </v-tooltip>
                                            </template>

                                        </v-text-field> -->
                                    </v-col>
                                    <v-col cols="8" class="py-0"></v-col>
                                    <v-col cols="6" class="py-0">
                                        <v-text-field label="ชื่อ" name="firstName" v-model="firstName" readonly
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="py-0">
                                        <v-text-field label="ชื่อนามสกุล" name="lastName" v-model="lastName" readonly
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="ชื่อเล่น" name="nickname" v-model="nickname" readonly
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="5" class="py-0">

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="เพศ" name="gender" v-model="gender" readonly></v-text-field>

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
                                    <v-text-field label="เบอร์" name="studentMobile" v-model="studentMobile" readonly
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field label="อีเมลล์" name="email" v-model="email"></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field label="เลขบัตรประชาชน" name="idCardNumber" v-model="idCardNumber" readonly
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <!-- <label>สำเนาบัตรประชาชน</label><br> -->
                                    <!-- <v-file-input label="อัพโหลดสำเนาบัตรประชาชน" v-model="idCardCopy" disabled
                                        accept=".pdf,image/*"></v-file-input> -->
                                    <!-- <a v-if="idCardCopy" href="" @click="downloadFile()"> View</a>
                                        <a v-if="!idCardCopy"> ไม่มี</a> -->
                                </v-col>

                            </v-row>

                        </v-row>
                    </v-card>
                </v-col>


                <v-col cols="12">
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
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
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ studentMobile }}
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="3" sm="3" class=" py-2">
                                <div>
                                    <p class=" text-break">เบอร์โทรศัพท์ผู้ปกครอง </p>
                                    <p class=" text-break font-weight-bold" style="font-weight: 500;">{{ parentMobile }}
                                    </p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
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
                <!-- <v-col cols="12">
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
                </v-col> -->
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
                        <v-btn class="mx-2 text-white " :loading="loading" color="indigo" 
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
                                    <v-text-field label="เบอร์โทรศัพท์" name="studentMobile" v-model="studentMobile"
                                        :rules="studentMobileRules"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="เบอร์โทรศัพท์ผู้ปกครอง" name="parentMobile" v-model="parentMobile"
                                        :rules="parentMobileRules"></v-text-field>
                                </v-col>
                            </v-row></v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="mx-2 text-white " :loading="loading" color="indigo" 
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
                        <v-btn class="mx-2 text-white " :loading="loading" color="indigo"
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
            dialogEditName: false,
            dialogEditDetail: false,
            dialogEditAddress: false,


            //User data
            firstNameDisplay: null,
            lastNameDisplay: null,
            nicknameDisplay: null,
            profilePic: null,
            profilePicUpload: null,
            iconSize: 120,
            firstNameDisplay: null,
            lastNameDisplay: null,
            nicknameDisplay: null,
            studentId: null,
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
            currAddress: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },
            email: null,
            idCardNumber: null,
            education: null,
            studentMobile: null,
            parentMobile: null,

            totalHour: null,
            studyHour: null,
            hourLeft: null,

            classType: null,
            courseHour: null,
            freeHour: null,
            wantedTeacher: null,
            annotation: null,

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
                'อ่างทอง'
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

            studentMobileRules: [
                value => !!value || 'กรุณากรอก เบอร์โทรศัพท์',
                value => /^0\d{9}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ],
            parentMobileRules: [
                value => !!value || 'กรุณากรอกเบอร์โทรศัพท์ผู้ปกครอง',
                value => /^0\d{9}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ผู้ปกครองไม่ถูกต้อง'
            ]

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
         
            if (this.profilePicUpload && this.dialogEditName == true) {
                const storageRef = this.$fireModule.storage().ref();
                const userRef = storageRef.child(`user/${this.keyuser}/profilePic.jpg`);

                try {
                    // Upload the file to Firebase Storage
                    const snapshot = await userRef.put(this.profilePicUpload);

                    // Get the download URL of the uploaded file
                    const downloadURL = await snapshot.ref.getDownloadURL();

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
}
</style>