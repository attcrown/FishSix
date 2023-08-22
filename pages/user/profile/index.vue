<template>
    <div class="container-fluid ">
        <pageLoader v-if="isLoading"></pageLoader>
        <div v-if="!isLoading" class="col mx-3 d-flex justify-content-center">
            <v-row>
                <div style="display: flex; justify-content: space-between;">
                    <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                    <div>
                        <v-btn class="text-white" @click="openClassHistoryDialog()" color="black">ดูประวัติการเรียน
                            <v-icon color="white" class="ms-1">mdi-eye</v-icon></v-btn>

                        <v-btn to="/user/" router exact>ย้อนกลับ</v-btn>

                    </div>

                </div>
                <v-col cols="12">
                    <v-card style="border-radius: 20px;background: #ffffff;border: 1px solid #000;" elevation="0"
                        class=" mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div>ข้อมูล Flip class</div>

                        </v-card-title>
                        <v-row justify="space-between" class="px-5">
                            <style>
                                .time-label {
                                    color: #FFF;
                                    font-size: 18px;
                                    font-weight: 500;

                                }

                                .des-label {
                                    color: #FFF;
                                    font-size: 14px;
                                    font-weight: 300;

                                }

                                .small-button {
                                    font-size: 12px;
                                    padding: 1px 2px;
                                    border-radius: 10px;
                                    border: 1px solid var(--green, #29CC39);
                                    background: var(--green, #29CC39);
                                }
                            </style>
                            <v-col>
                                <v-card style="border-radius: 20px;background: #26415B;" elevation="0"
                                    class="px-2 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Flip class </div>
                                            <div class="time-label my-3">{{
                                                trialFlipclassHour }} ชั่วโมง</div>
                                            <div class="des-label">ชั่วโมงทดลองเรียน</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col>
                                <v-card style="border-radius: 20px;background: #26415B;" elevation="0"
                                    class="px-2 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Flip class </div>
                                            <div class="time-label my-3">{{ formattedStudyHour }} </div>
                                            <div class="des-label">ชั่วโมงที่เรียนไปแล้ว</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card style="border-radius: 20px;background: #AD382F;" elevation="0"
                                    class="px-2 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Flip class </div>
                                            <div class="time-label my-3">{{ formattedHourLeft }}</div>
                                            <div class="des-label">ชั่วโมงเรียนที่เหลือ</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card style="border-radius: 20px;background: #AD382F;" elevation="0"
                                    class="px-2 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Private class </div>
                                            <div class="time-label my-3">{{ formattedExpireFlipClassDate }}</div>
                                            <div class="des-label">วันเรียนที่เหลือ</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                        </v-row>
                    </v-card>

                    <v-card style="border-radius: 20px;background: #ffffff;border: 1px solid #000;" elevation="0"
                        class=" mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div>ข้อมูล Private class</div>

                        </v-card-title>
                        <v-row justify="space-between" class="px-5">
                            <v-col>
                                <v-card style="border-radius: 20px;background: #26415B;" elevation="0"
                                    class="px-3 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Private class </div>
                                            <div class="time-label my-3">{{
                                                trialPrivateClassHour }} ชั่วโมง</div>
                                            <div class="des-label">ชั่วโมงทดลองเรียน</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col>
                                <v-card style="border-radius: 20px;background: #26415B;" elevation="0"
                                    class="px-3 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Private class </div>
                                            <div class="time-label my-3">{{ formattedPrivateStudyHour }} </div>
                                            <div class="des-label">ชั่วโมงที่เรียนไปแล้ว</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card style="border-radius: 20px;background: #AD382F;" elevation="0"
                                    class="px-3 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Private class </div>
                                            <div class="time-label my-3">{{ formattedPrivateHourLeft }}</div>
                                            <div class="des-label">ชั่วโมงเรียนที่เหลือ</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card style="border-radius: 20px;background: #AD382F;" elevation="0"
                                    class="px-3 mt-5 mb-3">

                                    <v-card-text class="p-4">
                                        <v-row>
                                            <div class="des-label">Private class </div>
                                            <div class="time-label my-3">{{ formattedExpirePrivateClassDate }}</div>
                                            <div class="des-label">วันเรียนที่เหลือ</div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                        </v-row>
                    </v-card>
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลเกี่ยวกับคอร์ส</div>
                            <div>
                                <button v-if="!isEditingCourse" class="editButton " @click="toEditCourse()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditingCourse" class="saveButton " @click="toEditCourse()">
                                    <span style="color: #F8F9FB;font-size: 14px;">บันทึก</span>

                                </button>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" readonly value="Flip class"
                                        label="ประเภทคลาส"></v-text-field>
                                </v-col>
                                <!-- <v-col class="py-0" cols="4">

                                    <v-text-field class="black-label" type="number" v-model="courseHour" min="0" max="99999"
                                        v-if="!isEditingCourse" maxlength="5" oninput="validity.valid||(value='');"
                                        step="0.01" hint="รูปแบบการกรอก hh.mm เช่น 1.30 คือ 1 ชั่วโมง 30 นาที"
                                        label="ชั่วโมงเรียนทั้งหมด"></v-text-field>
                                    <v-select class="black-label" v-if="isEditingCourse" v-model="totalHourInput"
                                        :items="courseHours" label="ชั่วโมงเรียนทั้งหมด"></v-select>

                                </v-col> -->

                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" name="freeHour" v-model="freeHour" disabled
                                        label="ชั่วโมงที่แถม">
                                    </v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">

                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" v-model="purchaseFlipClassDate"
                                        prepend-icon="mdi-calendar" disabled label="วันที่ซื้อคอร์ส"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" v-model="expireFlipClassDate" disabled
                                        label="วันที่คอร์สหมดอายุ"></v-text-field>
                                </v-col>

                                <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>

                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" readonly value="Private class"
                                        label="ประเภทคลาส"></v-text-field></v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" name="freeHour" v-model="privateFreeHour" disabled
                                        label="ชั่วโมงที่แถม">
                                    </v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                </v-col>

                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" v-model="purchasePrivateClassDate" disabled
                                        prepend-icon="mdi-calendar" label="วันที่ซื้อคอร์ส"></v-text-field>

                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" v-model="expirePrivateClassDate" disabled
                                        label="วันที่คอร์สหมดอายุ"></v-text-field>
                                </v-col>

                                <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>


                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" v-model="wantedTeacher" v-if="!isEditingCourse"
                                        :readonly="!isEditingCourse" label="ต้องการเรียนกับครู"
                                        item-text="teacher.firstName"></v-text-field>
                                    <v-autocomplete class="black-label" v-model="wantedTeacher" :items="teachers"
                                        v-if="isEditingCourse" label="ต้องการเรียนกับครู"
                                        item-text='teacher.nickname'></v-autocomplete>

                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" name="annotation" v-model="annotation"
                                        :readonly="!isEditingCourse" label="หมายเหตุ">
                                    </v-text-field>

                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
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
                        <v-form ref="detailForm" @submit.prevent="toEditDetail">
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
                                            <div
                                                style="color: var(--brown-brown-2, #27262B);font-size: 20px;font-weight: 500;">
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
                                        <v-col cols="6" class="py-0 ">
                                            <v-text-field class="black-label" name="firstNameEng" v-model="firstNameEng"
                                                :rules="firstNameEngRules" label="ชื่อ (ภาษาอังกฤษ)" required disabled
                                                v-on:keypress="isLetter($event)">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <v-text-field class="black-label" name="lastNameEng" v-model="lastNameEng"
                                                label="นามสกุล (ภาษาอังกฤษ)" required :rules="lastnameEngRules" disabled
                                                v-on:keypress="isLetter($event)">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <v-text-field label="ชื่อ" name="firstName" v-model="firstName" disabled
                                                :rules="firstNameRules" :readonly="!isEditingDetail"
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <v-text-field label="ชื่อนามสกุล" name="lastName" v-model="lastName" disabled
                                                :readonly="!isEditingDetail" :rules="lastnameRules" required></v-text-field>
                                        </v-col>
                                        <v-col cols="4" class="py-0">
                                            <v-text-field label="ชื่อเล่น" name="nickname" v-model="nickname" disabled
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
                                        <v-text-field label="เบอร์" name="studentMobile" v-model="studentMobile"
                                            :rules="mobileRules" :readonly="!isEditingDetail" :counter="isEditingDetail"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="อีเมลล์" name="email" v-model="email" :rules="emailRules"
                                            :readonly="!isEditingDetail"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="เลขบัตรประชาชน" name="idCardNumber" v-model="idCardNumber"
                                            :rules="idCardRules" :counter="isEditingDetail"
                                            :readonly="!isEditingDetail"></v-text-field>
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
                            <div class="">ข้อมูลข้อมูลผู้ปกครอง</div>
                            <!-- <div>
                                <button v-if="!isEditingParentDetail" class="editButton " @click="toEditParentDetails()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditingParentDetail" class="saveButton " @click="toEditParentDetails()">
                                    <span style="color: #F8F9FB;font-size: 14px;">บันทึก</span>

                                </button>
                            </div> -->
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="parentDetailForm">

                                <v-row>

                                    <v-col class="py-0" cols="4">
                                        <v-text-field class="black-label" name="parentFirstName" v-model="parentFirstName"
                                            disabled :readonly="!isEditingParentDetail" label="ชื่อผู้ปกครอง" required>
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="py-0" cols="4">
                                        <v-text-field class="black-label" name="parentMobile" v-model="parentMobile"
                                            disabled :readonly="!isEditingParentDetail" label="เบอร์โทรศัพท์ผู้ปกครอง"
                                            required>
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="py-0" cols="4">

                                    </v-col>
                                    <v-col class="py-0" cols="4">
                                        <v-text-field class="black-label" name="parentJob" v-model="parentJob" disabled
                                            :readonly="!isEditingParentDetail" label="อาชีพ">
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="py-0" cols="4">
                                        <v-textarea class="black-label" name="expectation" v-model="expectation" disabled
                                            :readonly="!isEditingParentDetail" label="ความคาดหวัง" rows="2">
                                        </v-textarea>
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
                                        <v-text-field name="school" label="โรงเรียน" :readonly="!isEditingEducation"
                                            v-model="school"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="education" label="ระดับชั้น" :readonly="!isEditingEducation"
                                            v-if="!isEditingEducation" v-model="education"></v-text-field>
                                        <v-select class="black-label" label="ระดับชั้น" name="education" v-model="education"
                                            v-if="isEditingEducation" :items="educationLevels"
                                            item-text="educationName"></v-select>
                                    </v-col>


                                </v-row>
                            </v-form>
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>

        </div>
        <!-- dialog -->
        <v-dialog v-model="classHistoryDialog" max-width="80%">

            <v-card class="p-4 rounded-xl">
                <v-card-title>
                    <span style="font-size: 24px">
                        <b>ประวัติการเรียนของคุณ {{ nickname }} {{ firstName }} {{ lastName }}</b>
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="closeClassHistoryDialog">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <hr style="border: 2px solid #000; background-color: #000;">
                <v-card-text>
                    <v-container>

                        <v-data-table :headers="historyHeaders" :items="classHistories" :items-per-page="-1">
                            <template v-slot:footer>

                            </template>
                            <template v-slot:item.actions="{ item }">
                                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                    <v-icon style="text-decoration: underline;" large color="#B6A7A2" class="text-h5"
                                        @click="viewProgress(item)">
                                        mdi-eye
                                    </v-icon>
                                </div>
                            </template>

                        </v-data-table>
                    </v-container>
                </v-card-text>





            </v-card>
        </v-dialog>
        <v-dialog v-model="progress_dialog" max-width="700px">
            <v-card class="rounded-xl">
                <v-card-title>
                    <b class="ms-5" style="font-size:16px">เชคชื่อวันที่ {{ progress.date }} | {{ progress.time_s }}-{{
                        progress.time_e }}</b>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="progress_dialog = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row v-if="selectedPlan.status_development=='Approved'">

                            <v-col cols="12" sm="12" style="margin-top:-20px">
                                <hr style="border: 1px solid #000; background-color: #000;">
                                <p style="font-size: 16px;">รายระเอียดเกี่ยวกับครู/นักเรียน</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                <v-text-field label="ชื่อนักเรียน" v-model="firstName" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                <v-text-field label="วิชาที่เรียน" v-model="progress.subject" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                <v-text-field label="ชื่อครู" v-model="progress.teacherName" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                <v-text-field label="จุดประสงค์ในการเรียน" v-model="progress.because"
                                    readonly></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="วันนี้น้องเรียนเรื่อง" v-model="selectedPlan.learn"
                                    disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select v-model="selectedPlan.understand" disabled
                                    label="น้องมีความเข้าใจในเนื้อหา"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-textarea label="สำหรับวันนี้น้องมีพัฒนาการที่เพิ่มขึ้น" rows="1" counter disabled
                                    v-model="selectedPlan.development">
                                    <template v-slot:append-outer>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon v-on="on">
                                                    mdi-help-circle-outline
                                                </v-icon>
                                            </template>
                                            คู่มือการเขียนพัฒนาการน้อง
                                        </v-tooltip>
                                    </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="ปัญหาที่เกิดกับน้องในการเรียน" disabled
                                    v-model="selectedPlan.problem"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="จึงใช้วิธี" v-model="selectedPlan.method" disabled> </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="เพื่อพัฒนาน้อง" v-model="selectedPlan.to_development"
                                    disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field label="การบ้านหรือแบบฝึกหัดที่ให้กับน้องในวันนี้"
                                    v-model="selectedPlan.homework" disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field label="Link เกี่ยวกับเอกสารการเรียน หรือคลิปสอนนักเรียน"
                                    v-model="selectedPlan.link_url" disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-radio-group v-model="selectedPlan.check_sheet" disabled>
                                    <v-radio v-for="(items, index) in sheet_all" :key="index" :label="items.name" disabled
                                        :value="items.key"></v-radio>
                                </v-radio-group>
                                <v-text-field label="Link เอกสารการเรียน (Upload ลง Goolge Drive)"
                                    v-if="selectedPlan.check_sheet == '-NcBOFy1oXhSI-dVzWkp'" disabled
                                    v-model="selectedPlan.link_sheet"></v-text-field>
                            </v-col>


                        </v-row>
                        <v-row v-else>
                            ยังไม่มีพัฒนาการในขณะนี้
                        </v-row>
                    </v-container>
                </v-card-text>

            </v-card>

        </v-dialog>

        <!-- snackbar -->
        <v-snackbar class="font-weight-medium" :color="snackbarColor" v-model="showSnackbar" :timeout="1000">
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
            activePicker: null,
            date: null,
            menu: false,
            flipDate: false,
            isLoading: true,
            userId: null,

            isEditingCourse: false,
            isEditingDetail: false,
            isEditingAddress: false,
            isEditingParentDetail: false,
            isEditingEducation: false,
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',

            //data
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

            parentFirstName: null,
            expectation: null,
            parentJob: null,
            parentMobile: null,

            totalHour: null,
            studyHour: null,
            hourLeft: null,
            purchaseFlipClassDate: null,
            purchasePrivateClassDate: null,
            expireFlipClassDate: null,
            expirePrivateClassDate: null,
            totalHourDisplay: null,
            studyHourDisplay: null,
            hourLeftDisplay: null,
            isAddressSame: false,

            totalHourInput: null,
            privateTotalHourInput: null,
            studyHourInput: null,
            hourLeftInput: null,

            privateTotalHour: null,
            privateStudyHour: null,
            privateHourLeft: null,

            privateTotalHourDisplay: null,
            privateStudyHourDisplay: null,
            privateHourLeftDisplay: null,

            privateTotalHourInput: null,
            privateStudyHourInput: null,
            privateHourLeftInput: null,

            classTypes: null,
            courseHour: null,
            freeHour: null,
            wantedTeacher: null,
            annotation: null,

            //history
            classHistoryDialog: false,
            progress_dialog: false,
            classHistories: [],
            historyHeaders: [
                { text: 'เวลาที่บันทึก', value: 'classHistory.createdAt', sort: 'true' },
                { text: 'วันที่สอน', value: 'classHistory.date' },
                { text: 'ครูที่สอน', value: 'classHistory.teacherName' },
                { text: 'วิชาที่เรียน', value: 'classHistory.subject' },
                { text: 'ระดับชั้น', value: 'classHistory.level' },
                { text: 'ประเภท', value: 'classHistory.style' },
                { text: 'เวลาที่เริ่มเรียน', value: 'classHistory.time_s' },
                { text: 'เวลาที่สิ้นสุด', value: 'classHistory.time_e' },
                { text: 'ดูพัฒนาการ', value: 'actions', sortable: false },

            ],
            selectedPlan: {
                status_development: null,
                learn: null,
                understand: null,
                development: null,
                method: null,
                link_url: null,
                problem: null,
                method: null,
                to_development: null,
                homework: null,
                check_sheet: null,
            },
            progress: {},
            sheet_all: null,
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

            teachers: [],

            //static
            genders: [
                'ชาย',
                'หญิง',
                'ไม่ระบุ',
                'ไม่มีเพศ',
                'อื่นๆ'
            ],

            courseHours: [
                32,
                48, 96
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


            //rules
            firstNameEngRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            lastnameEngRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
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
                value => !!value || 'กรุณากรอกรหัสไปรษณีย์',
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],
            idCardRules: [

                value => value === '' || /^\d{13}$/.test(value) || 'รูปแบบหมายเลขบัตรประชาชนไม่ถูกต้อง'
            ],

            mobileRules: [
                value => !!value || 'กรุณากรอก เบอร์โทรศัพท์',
                value => /^\d{9,10}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ],

            emailRules: [
                value => value === '' || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'รูปแบบอีเมลไม่ถูกต้อง'
            ],

        }
    },
    computed: {
        formattedTotalHour() {
            if (this.totalHourDisplay === null || this.totalHourDisplay === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.totalHourDisplay);
            const minutes = ((this.totalHourDisplay - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }


        },
        formattedStudyHour() {
            if (this.studyHourDisplay === null || this.studyHourDisplay === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.studyHourDisplay);
            const minutes = ((this.studyHourDisplay - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },
        formattedHourLeft() {
            if (this.hourLeftDisplay === null || this.hourLeftDisplay === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.hourLeftDisplay);
            const minutes = ((this.hourLeftDisplay - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },
        formattedPrivateTotalHour() {
            if (this.privateTotalHourDisplay === null || this.privateTotalHourDisplay === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.privateTotalHourDisplay);
            const minutes = ((this.privateTotalHourDisplay - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }


        },
        formattedPrivateStudyHour() {
            if (this.privateStudyHourDisplay === null || this.privateStudyHourDisplay === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.privateStudyHourDisplay);
            const minutes = ((this.privateStudyHourDisplay - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },
        formattedPrivateHourLeft() {
            if (this.privateHourLeftDisplay === null || this.privateHourLeftDisplay === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.privateHourLeftDisplay);
            const minutes = ((this.privateHourLeftDisplay - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },
        formattedExpireFlipClassDate() {
            if (this.expireFlipClassDate) {
                const now = new Date();
                const expireDate = new Date(this.expireFlipClassDate);
                const courseStartDate = new Date(this.purchaseFlipClassDate);
                const yearDiff = expireDate.getFullYear() - courseStartDate.getFullYear();
                const monthDiff = expireDate.getMonth() - courseStartDate.getMonth();
                const dayDiff = expireDate.getDate() - courseStartDate.getDate();

                let months = yearDiff * 12 + monthDiff;
                let days = dayDiff;

                if (dayDiff < 0) {
                    months -= 1;
                    const lastMonthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                    days = lastMonthDays + dayDiff;
                }

                return `${months} เดือน ${days} วัน`;
            }
            return 'หมดอายุแล้ว';
        },
        formattedExpirePrivateClassDate() {
            if (this.expirePrivateClassDate) {
                const now = new Date();
                const expireDate = new Date(this.expirePrivateClassDate);

                const yearDiff = expireDate.getFullYear() - now.getFullYear();
                const monthDiff = expireDate.getMonth() - now.getMonth();
                const dayDiff = expireDate.getDate() - now.getDate();

                let months = yearDiff * 12 + monthDiff;
                let days = dayDiff;

                if (dayDiff < 0) {
                    months -= 1;
                    const lastMonthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                    days = lastMonthDays + dayDiff;
                }

                return `${months} เดือน ${days} วัน`;
            }
            return 'หมดอายุแล้ว';
        },
    },
    mounted() {
        this.fullName()
        this.readdata();
        this.sheet_search();
    },
    components: {

        pageLoader
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
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

        save(date) {
            this.$refs.menu.save(date)
        },

        openSnackbar(status, message) {
            this.showSnackbar = true;
            this.snackbarMessage = message;
            this.snackbarColor = status;
        },

        openClassHistoryDialog() {
            this.classHistoryDialog = true;
            this.fetchHistory('Flip class');
        },
        closeClassHistoryDialog() {
            this.classHistoryDialog = false;

        },


        async readdata() {

            const db = this.$fireModule.database();
            await db.ref(`user/${this.keyuser}`).on("value", (snapshot) => {
                const childData = snapshot.val();

                //this.profilePic = childData.profilePic || null;
                this.studentId = childData.studentId || null;

                this.totalHour = childData.totalHour || 0;
                this.studyHour = childData.studyHour || 0;
                this.hourLeft = childData.hourLeft || 0;
                this.totalHourDisplay = childData.totalHour || 0;
                this.studyHourDisplay = childData.studyHour || 0;
                this.hourLeftDisplay = childData.hourLeft || 0;

                this.privateTotalHour = childData.privateTotalHour || 0;
                this.privateStudyHour = childData.privateStudyHour || 0;
                this.privateHourLeft = childData.privateHourLeft || 0;
                this.privateTotalHourDisplay = childData.privateTotalHour || 0;
                this.privateStudyHourDisplay = childData.privateStudyHour || 0;
                this.privateHourLeftDisplay = childData.privateHourLeft || 0;

                this.expireFlipClassDate = childData.expireFlipClassDate || null;
                this.expirePrivateClassDate = childData.expirePrivateClassDate || null;
                this.purchaseFlipClassDate = childData.purchaseFlipClassDate || null;
                this.purchasePrivateClassDate = childData.purchasePrivateClassDate || null;


                this.privateCourseHour = childData.privateCourseHour || 0;
                this.privateFreeHour = childData.privateFreeHour || 0;


                this.trialFlipclassHour = childData.trialFlipclassHour || 0;
                this.trialPrivateClassHour = childData.trialPrivateClassHour || 0;

                this.classTypes = childData.classTypes || null;
                this.courseHour = childData.courseHour || null;
                this.freeHour = childData.freeHour || null;
                this.wantedTeacher = childData.wantedTeacher || null;
                this.annotation = childData.annotation || null;

                this.firstNameEng = childData.firstNameEng || null;
                this.lastNameEng = childData.lastNameEng || null;
                this.firstName = childData.firstName || null;
                this.lastName = childData.lastName || null;
                this.firstNameDisplay = childData.firstName || null;
                this.lastNameDisplay = childData.lastName || null;
                this.nicknameDisplay = childData.nickname || null;
                this.nickname = childData.nickname || null;
                this.school = childData.school || null;
                this.gender = childData.gender || null;
                this.birthDate = childData.birthDate || null;
                this.email = childData.email || null;
                this.idCardNumber = childData.idCardNumber || null;
                this.education = childData.education || null;
                this.studentMobile = childData.studentMobile || null;

                this.parentFirstName = childData.parentFirstName || null;
                this.expectation = childData.expectation || null;
                this.parentJob = childData.parentJob || null;
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
        async fetchHistory() {
            try {
                const db = this.$fireModule.database();
                db.ref(`studentHistory/${this.keyuser}`).on("value", (snapshot) => {
                    let item = [];
                    const childData = snapshot.val();

                    for (const key in childData) {

                        const history = childData[key];


                        // const formattedDate = date.toLocaleString('en-US', { timeZone: 'Asia/Bangkok', timeZoneName: 'short' });
                        const classHistory = {
                            hour: history.hour,
                            createdAt: history.createdAt,
                            Idsendplan: history.Idsendplan,
                            date: history.date,
                            keyTeacher: history.keyTeacher,
                            keySubject: history.keySubject,
                            teacherName: history.teacherName,
                            level: history.level,
                            studentId: history.studentId,
                            subject: history.subject,
                            teacherId: history.teacherId,
                            time_e: history.time_e,
                            time_s: history.time_s,
                            style: history.style,
                        };
                        item.push({ key, classHistory });



                    }


                    this.classHistories = item;

                    this.isLoading = false;
                });
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        },
        async viewProgress(item) {

            this.progress = item.classHistory;
            this.progress_dialog = true;
            if (item.classHistory.Idsendplan == undefined) {
                this.selectedPlan.status_development = null;
                this.selectedPlan.learn = null;
                this.selectedPlan.understand = null;
                this.selectedPlan.development = null;
                this.selectedPlan.problem = null;
                this.selectedPlan.link_url = null;
                this.selectedPlan.method = null;
                this.selectedPlan.to_development = null;
                this.selectedPlan.homework = null;
                this.selectedPlan.check_sheet = null;
            }
            else {

                const db = this.$fireModule.database();
                db.ref(`send_plan/${item.classHistory.keyTeacher}/${item.classHistory.Idsendplan}`).on("value", (snapshot) => {
                    const childData = snapshot.val();

                    if (childData.status_development !== undefined) {
                        this.selectedPlan = { ...childData };
                    } else {
                        this.selectedPlan.status_development = null;
                        this.selectedPlan.learn = null;
                        this.selectedPlan.understand = null;
                        this.selectedPlan.development = null;
                        this.selectedPlan.problem = null;
                        this.selectedPlan.link_url = null;
                        this.selectedPlan.method = null;
                        this.selectedPlan.to_development = null;
                        this.selectedPlan.homework = null;
                        this.selectedPlan.check_sheet = null;

                    }
                });
            }

        },
        async sheet_search() {
            const db = this.$fireModule.database();
            db.ref(`sheet_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.sheet_all = item;

            })
        },
        validateDetailEdit() {
            return this.$refs[`detailForm`].validate();
        },
        validateAddressEdit() {
            return this.$refs[`addressForm`].validate();
        },
        validateParentDetailFormEdit() {
            return this.$refs[`parentDetailForm`].validate();
        },

        validateEducationEdit() {
            return this.$refs[`educationForm`].validate();
        },

        async toEditDetail() {

            if (this.isEditingDetail == true) {

                if (this.validateDetailEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;
                    // const isIDDuplicate = await this.checkDuplicateName(this.studentId);
                    // if (isIDDuplicate && this.lastStudentId != this.studentId) {
                    //     this.openSnackbar("error", 'รหัสของนักเรียนซ้ำ รหัสที่ซ้ำคือ ' + this.studentId);
                    //     this.isSubmitting = false;
                    //     return;
                    // }
                    await db.ref(`user/${this.keyuser}/`).update({



                        studentMobile: this.studentMobile,
                        email: this.email,
                        gender: this.gender,
                        idCardNumber: this.idCardNumber,

                    })
                        .then(() => {
                            this.isEditingDetail = false;
                            this.openSnackbar('success', 'แก้ไขข้อมูลเสร็จสิ้น ');
                            this.isSubmitting = false;

                        })
                        .catch((error) => {
                            this.isEditingDetail = false;
                            this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ');
                            this.isSubmitting = false;

                        });

                }

            }
            else {
                this.isEditingDetail = true;
            }
        },
        async toEditCourse() {
            if (this.isEditingCourse == true) {
                const db = this.$fireModule.database();
                await db.ref(`user/${this.keyuser}/`).update({
                    wantedTeacher: this.wantedTeacher,
                    annotation: this.annotation,


                })
                this.isEditingCourse = false;
            }
            else {
                this.search_teacher();
                this.isEditingCourse = true;
            }
        },
        async toEditAddress() {
            if (this.isEditingAddress == true) {
                this.isEditingAddress = false;

                if (this.validateAddressEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;


                    await db.ref(`user/${this.keyuser}/`).update({
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
        async toEditParentDetails() {
            if (this.isEditingParentDetail == true) {
                if (this.validateParentDetailFormEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;
                    // const isIDDuplicate = await this.checkDuplicateName(this.studentId);
                    // if (isIDDuplicate && this.lastStudentId != this.studentId) {
                    //     this.openSnackbar("error", 'รหัสของนักเรียนซ้ำ รหัสที่ซ้ำคือ ' + this.studentId);
                    //     this.isSubmitting = false;
                    //     return;
                    // }
                    // await db.ref(`user/${this.keyuser}/`).update({
                    //     parentFirstName: this.parentFirstName,
                    //     parentJob: this.parentJob,
                    //     expectation: this.expectation,
                    //     parentMobile: this.parentMobile,

                    // })
                    // .then(() => {

                    //     this.openSnackbar('success', 'แก้ไขข้อมูลเสร็จสิ้น ');
                    //     this.isSubmitting = false;
                    //     this.isEditingParentDetail = false;
                    // })
                    // .catch((error) => {

                    //     this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ');
                    //     this.isSubmitting = false;
                    //     this.isEditingParentDetail = false;
                    // });

                }
            }
            else {
                this.isEditingParentDetail = true;
            }
        },

        async toEditEducation() {
            if (this.isEditingEducation == true) {
                if (this.validateEducationEdit()) {
                    const db = this.$fireModule.database();
                    this.isSubmitting = true;

                    await db.ref(`user/${this.keyuser}/`).update({
                        school: this.school,
                        education: this.education,


                    })
                        .then(() => {

                            this.openSnackbar('success', 'แก้ไขข้อมูลเสร็จสิ้น ');
                            this.isSubmitting = false;
                            this.isEditingEducation = false;
                        })
                        .catch((error) => {

                            this.openSnackbar('error', 'เกิดข้อผิดพลาดในการบันทึก ');
                            this.isSubmitting = false;
                            this.isEditingEducation = false;
                        });

                }
            }
            else {
                this.isEditingEducation = true;
            }
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

        downloadFile() {
            window.open(this.idCardCopy, '_blank');
        },

        async search_teacher() {
            const db = this.$fireModule.database();
            await db.ref("user/").on("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'teacher') {

                        const teacher = {
                            nickname: childData[key].teacherId + ' ' + childData[key].nickname,

                        };
                        item.push({ teacher });

                    }
                }
                this.teachers = item;
                this.isLoading = false;
            })
            //console.log(this.teachers)
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
hr.solid {
    border-top: 3px solid black;
    border-width: 3px;
    opacity: 1;
}

.header {
    font-size: 25px;
}

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

.black-label .v-label {
    color: rgb(0, 0, 0);
    opacity: 1;
    font-weight: 500;
}
</style>