<template>
    <div class="container-fluid">
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row v-if="!isLoading">
            <div style="display: flex; justify-content: space-between;">
                <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                <v-btn to="/admin/student" class="me-4" style="border-radius: 10px;
border: 2px solid #EFEFEF;
background: #EFEFEF;" router exact>ย้อนกลับ</v-btn>
            </div>
            <div class="col-sm-12">
                <form ref="registerForms">
                    <v-row v-if="false">
                        <style>
                            .time-label {
                                color: #000;
                                font-size: 24px;
                                font-weight: 500;

                            }

                            .des-label {
                                color: #000;
                                font-size: 16px;
                                font-weight: 300;

                            }
                        </style>

                        <!-- Flip -->
                        <v-col cols="3" v-if="isFlipClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-5">
                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Flip class </div>
                                        <div class="time-label my-3">{{ totalHour ? totalHour : 0 }} ชั่วโมง</div>
                                        <div class="des-label">ชั่วโมงเรียนทั้งหมด </div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3" v-if="isFlipClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-5">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Flip class </div>
                                        <div class="time-label my-3">{{ studyHour ? studyHour : 0 }} ชั่วโมง</div>
                                        <div class="des-label">ชั่วโมงที่เรียนไปแล้ว</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3" v-if="isFlipClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-5">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Flip class </div>
                                        <div class="time-label my-3">{{ hourLeft ? hourLeft : 0 }} ชั่วโมง</div>
                                        <div class="des-label">ชั่วโมงเรียนที่เหลือ</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3" v-if="isFlipClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-5">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Flip class </div>
                                        <div class="time-label my-3">{{ flipClassMonth ? flipClassMonth : 0 }} วัน
                                        </div>
                                        <div class="des-label">วันเรียนที่เหลือ</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <!-- Private -->
                        <v-col cols="3" v-if="isPrivateClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-1">
                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Private class </div>
                                        <div class="time-label my-3">{{ privateTotalHour ? privateTotalHour : 0 }}
                                            ชั่วโมง</div>
                                        <div class="des-label">ชั่วโมงเรียนทั้งหมด </div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3" v-if="isPrivateClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-1">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Private class </div>
                                        <div class="time-label my-3">{{ privateStudyHour ? privateStudyHour : 0 }}
                                            ชั่วโมง</div>
                                        <div class="des-label">ชั่วโมงที่เรียนไปแล้ว</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3" v-if="isPrivateClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-1">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Private class </div>
                                        <div class="time-label my-3">{{ privateHourLeft ? privateHourLeft : 0 }} ชั่วโมง
                                        </div>
                                        <div class="des-label">ชั่วโมงเรียนที่เหลือ</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3" v-if="isPrivateClass">
                            <v-card style="border-radius: 20px;background: #D8CABF;" elevation="0" class="px-3 mt-1">

                                <v-card-text class="p-4">
                                    <v-row>
                                        <div class="des-label">Private class </div>
                                        <div class="time-label my-3">{{ privateClassMonth ? privateClassMonth : 0 }} วัน
                                        </div>
                                        <div class="des-label">วันเรียนที่เหลือ</div>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-card style="border-radius: 32px;background: rgba(216, 202, 191, 0.50);" elevation="0"
                        class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div>ข้อมูลเกี่ยวกับคอร์ส</div>

                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <p>&#x2022; Flip class (ุถ้าไม่มีไม่จำเป็นต้องใส่)</p>
                                <v-checkbox label="เพิ่ม Flip class" v-model="classTypes" value="Flip class"
                                    @click="updateFlipClass()"></v-checkbox>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" v-model="totalHour" min="0" max="99999"
                                        maxlength="5" oninput="validity.valid||(value='');" @input="updateHourLeft" disabled
                                        label="ชั่วโมงเรียนทั้งหมด"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" v-model="studyHour" min="0" max="99999"
                                        maxlength="5" oninput="validity.valid||(value='');" @input="updateHourLeft"
                                        :disabled="!isFlipClass" label="ชั่วโมงที่เรียนไปแล้ว"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" name="hourLeft" min="0" max="99999"
                                        maxlength="5" oninput="validity.valid||(value='');" v-model="hourLeft"
                                        :disabled="!isFlipClass" :value="hourLeftComputed" label="ชั่วโมงเรียนที่เหลือ">
                                    </v-text-field>
                                </v-col>

                                <v-col class="py-0" cols="3">
                                    <v-select class="black-label" v-model="courseHour" :items="courseHours"
                                        :disabled="!isFlipClass" @input="updateFlipClassMonth"
                                        label="จำนวนชั่วโมง"></v-select>
                                </v-col>
                                <v-col class="py-0" cols="3">
                                    <v-text-field class="black-label" name="freeHour" v-model="freeHour" type="number"
                                        min="0" max="99999" maxlength="5" oninput="validity.valid||(value='');"
                                        @input="updateTotalHour" :disabled="!isFlipClass" label="ชั่วโมงที่แถม">
                                    </v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="3">
                                    <v-menu ref="flipDate" v-model="flipDate" :close-on-content-click="false"
                                        :disabled="!isFlipClass" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field class="black-label" v-model="purchaseFlipClassDate"
                                                label="วันที่ซื้อคลาส" name="purchaseFlipClassDate"
                                                prepend-icon="mdi-calendar" :disabled="!isFlipClass" v-bind="attrs" required
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="purchaseFlipClassDate" :active-picker.sync="activePicker"
                                            min="1950-01-01" @change="saveDate"></v-date-picker>
                                    </v-menu>

                                </v-col>
                                <!-- <v-col class="py-0" cols="3">
                                    <v-text-field class="black-label" name="trialFlipclassHour" v-model="trialFlipclassHour"
                                        :disabled="!isFlipClass" label="ชั่วโมงที่ทดลองเรียนได้">
                                    </v-text-field></v-col> -->
                                <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>
                                <p>&#x2022; Private class (ุถ้าไม่มีไม่จำเป็นต้องใส่)</p>
                                <v-checkbox label="เพิ่ม Private class" v-model="classTypes" value="Private class"
                                    @click="updatePrivateClass()"></v-checkbox>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" v-model="privateTotalHour" min="0"
                                        disabled max="99999" maxlength="5" oninput="validity.valid||(value='');"
                                        label="ชั่วโมงเรียนทั้งหมด"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" v-model="privateStudyHour" min="0"
                                        :disabled="!isPrivateClass" max="99999" maxlength="5" @input="updatePrivateHourLeft"
                                        oninput="validity.valid||(value='');" label="ชั่วโมงที่เรียนไปแล้ว"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" min="0" max="99999" maxlength="5"
                                        :disabled="!isPrivateClass" oninput="validity.valid||(value='');"
                                        v-model="privateHourLeft" label="ชั่วโมงเรียนที่เหลือ">
                                    </v-text-field>
                                </v-col>

                                <v-col class="py-0" cols="3">
                                    <v-select class="black-label" v-model="privateCourseHour" :items="courseHours"
                                        :disabled="!isPrivateClass" @input="updatePrivateClassMonth"
                                        label="จำนวนชั่วโมง"></v-select>
                                </v-col>
                                <v-col class="py-0" cols="3">
                                    <v-text-field class="black-label" name="freeHour" v-model="privateFreeHour"
                                        @input="updatePrivateTotalHour" :disabled="!isPrivateClass" label="ชั่วโมงที่แถม">
                                    </v-text-field></v-col>
                                <v-col class="py-0" cols="3">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                        :disabled="!isPrivateClass" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field class="black-label" v-model="purchasePrivateClassDate"
                                                label="วันที่เริ่มซื้อคลาส" name="trialDate" prepend-icon="mdi-calendar"
                                                :disabled="!isPrivateClass" v-bind="attrs" required
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="purchasePrivateClassDate" :active-picker.sync="activePicker"
                                            min="1950-01-01" @change="save"></v-date-picker>
                                    </v-menu>

                                </v-col>
                                <!-- <v-col class="py-0" cols="3">
                                    <v-text-field class="black-label" name="trialPrivateClassHour"
                                        v-model="trialPrivateClassHour" :disabled="!isPrivateClass"
                                        label="ชั่วโมงที่ทดลองเรียนได้">
                                    </v-text-field></v-col> -->
                                <!-- ทดลองเรียน -->
                                <!-- <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>

                                <p>&#x2022; Class ทดลองเรียน</p>
                                <v-checkbox label="มี Class ทดลองเรียน" v-model="isTrial" value="Trial class"
                                    @click="updateTrial()"></v-checkbox>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" v-model="trialTotalHour" min="0"
                                        :disabled="!isTrial" max="99999" maxlength="5" @input="updateTrialHourLeft"
                                        label="ชั่วโมงทดลองทั้งหมด"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" v-model="trialStudyHour" min="0"
                                        :disabled="!isTrial" max="99999" maxlength="5" @input="updateTrialHourLeft"
                                        label="ชั่วโมงที่ทดลองไปแล้ว"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" type="number" min="0" max="99999" maxlength="5"
                                        :disabled="!isTrial" v-model="trialHourLeft" label="ชั่วโมงทดลองที่เหลือ">
                                    </v-text-field>
                                </v-col>

                                <v-col class="py-0" cols="4">
                                    <v-select class="black-label" v-model="trialCourseHour" :items="courseHours"
                                        :disabled="!isTrial" label="จำนวนชั่วโมง"></v-select>
                                </v-col>

                                <v-col class="py-0" cols="4">
                                    <v-menu ref="trialMenu" v-model="trialMenu" :close-on-content-click="false"
                                        :disabled="!isTrial" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field class="black-label" v-model="trailDate" label="วันที่เริ่มทดลอง"
                                                name="trailDate" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                required v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="trailDate" :active-picker.sync="activePicker"
                                            min="1950-01-01" @change="saveTrialDate"></v-date-picker>
                                    </v-menu>

                                </v-col> -->

                                <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>

                                <v-col class="py-0" cols="4"> <v-autocomplete class="black-label" v-model="wantedTeacher"
                                        :items="teachers" label="ต้องการเรียนกับครู"
                                        item-text="teacher.firstName"></v-autocomplete>

                                </v-col>
                                <v-col class="py-0" cols="4">
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
                                    <v-col class="py-0" cols="4">
                                        <v-text-field class="black-label" v-model="studentId" counter
                                            label="รหัสนักเรียน (ไม่จำเป็นต้องกรอก)" required :rules="studentIdRules">
                                            <template v-slot:append>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                    </template>
                                                    <span>FSS ตามด้วยเลข 4 หลัก
                                                        <br>โดยเป็นตัวพิมพ์ใหญ่ทั้งหมด</span>
                                                </v-tooltip>
                                            </template>

                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="8" class="py-0"></v-col>
                                    <v-col class="py-0" cols="6">
                                        <v-text-field class="black-label" v-model="name" :error-messages="nameErrors"
                                            disabled counter label="Username" required @input="$v.name.$touch()"
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
                                    <v-col class="py-0" cols="6">
                                        <v-text-field class="black-label" v-model="password" :error-messages="passErrors"
                                            disabled :counter="20" label="รหัสผ่าน" required @input="$v.password.$touch()"
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
                                    <v-col cols="4" class="py-0 ">
                                        <v-text-field class="black-label" name="firstNameEng" v-model="firstNameEng"
                                            label="ชื่อ (ภาษาอังกฤษ)" :error-messages="firstNameEngErrors" required
                                            v-on:keypress="isLetter($event)" @input="$v.firstNameEng.$touch()"
                                            @blur="$v.firstNameEng.$touch()">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="lastNameEng" v-model="lastNameEng"
                                            :error-messages="lastNameEngErrors" label="นามสกุล (ภาษาอังกฤษ)" required
                                            v-on:keypress="isLetter($event)" @input="$v.lastNameEng.$touch()"
                                            @blur="$v.lastNameEng.$touch()">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">

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
                                        <v-text-field class="black-label" name="curr_houseNo" label="บ้านเลขที่"
                                            :disabled="isAddressSame" v-model="currAddress.houseNo"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-autocomplete v-if="!isAddressSame" class="black-label"
                                            v-model="selectedCurrTambon" :items="currTambons" :item-value="currTambonValue"
                                            item-text="name_th" :search-input.sync="searchCurrTambon"
                                            no-data-text="กรุณากรอกชื่อตำบล" @update:search-input="fetchCurrTambons"
                                            label="ตำบล"></v-autocomplete>
                                        <v-text-field v-if="isAddressSame" class="black-label" name="curr_tambon"
                                            label="ตำบล" :disabled="isAddressSame"
                                            v-model="currAddress.tambon"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="curr_amphoe" label="อำเภอ/เขต"
                                            :disabled="isAddressSame" v-model="currAddress.amphoe"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">

                                        <v-text-field class="black-label" name="province" v-model="currAddress.province"
                                            :disabled="isAddressSame" readonly label="จังหวัด"></v-text-field>

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field class="black-label" name="curr_postal" label="รหัสไปรษณีย์"
                                            :disabled="isAddressSame" :rules="postalRules"
                                            v-model="currAddress.postal"></v-text-field>
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

                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" name="parentFirstName" v-model="parentFirstName"
                                        label="ชื่อผู้ปกครอง" :error-messages="parentFirstNameErrors" required
                                        @input="$v.parentFirstName.$touch()" @blur="$v.parentFirstName.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" name="parentMobile" v-model="parentMobile"
                                        label="เบอร์โทรศัพท์ผู้ปกครอง" :error-messages="parentMobileErrors" required
                                        @input="$v.parentMobile.$touch()" counter @blur="$v.parentMobile.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">

                                </v-col>
                                <v-col class="py-0" cols="4">
                                    <v-text-field class="black-label" name="parentJob" v-model="parentJob" label="อาชีพ">
                                    </v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="4">
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
                                    <v-text-field class="black-label" name="school" label="โรงเรียน"
                                        v-model="school"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-select class="black-label" label="ระดับชั้น" name="education" v-model="education"
                                        :items="educationLevels" item-text="educationName" :error-messages="educationErrors"
                                        required @input="$v.education.$touch()" @blur="$v.education.$touch()"></v-select>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <div class="text-center mt-5">

                        <v-btn class="me-4" color="green " outlined @click="submit" :loading="isSubmiting">
                            <v-icon class="me-3">mdi-content-save-settings-outline</v-icon>
                            บันทึก
                        </v-btn>
                    </div>

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
import { validationMixin } from 'vuelidate';
import { Timestamp } from "firebase/firestore";
import { required, maxLength, minLength, email, numeric } from 'vuelidate/lib/validators';
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'default',
    data() {
        return {
            activePicker: null,
            date: null,
            menu: false,
            flipDate: false,
            trialMenu: false,
            isLoading: true,
            isSubmiting: false,
            isAlreadySubmit: false,
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            isAddressSame: false,
            isPrivateClass: false,
            isFlipClass: false,
            //register field
            createdAt: null,
            status: "user",
            studentId: null,
            profilePic: null,
            name: null,
            password: null,
            firstNameEng: null,

            lastNameEng: null,
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

            totalHour: null,
            studyHour: null,
            hourLeft: null,
            privateTotalHour: null,
            privateStudyHour: null,
            privateHourLeft: null,
            purchasePrivateClassDate: null,
            purchaseFlipClassDate: null,
            expirePrivateClassDate: null,
            expireFlipClassDate: null,
            classTypes: [],

            trialFlipclassHour: null,
            trialPrivateClassHour: null,

            privateClassMonth: null,
            flipClassMonth: null,
            classType: null,
            courseHour: null,
            privateFreeHour: null,
            privateCourseHour: null,
            freeHour: null,
            wantedTeacher: null,
            annotation: null,

            teachers: [],
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
            //rules
            postalRules: [
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],

            studentIdRules: [
                value => !!value || 'กรุณากรอก รหัสนักเรียน',
                value => /^FSS\d{8}$/.test(value) || 'รูปแบบ รหัสนักเรียนไม่ถูกต้อง (ต้องเป็น FSS ตามด้วยตัวเลข 11 หลัก)'

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


        }
    },
    mixins: [validationMixin],
    validations: {
        name: { required, minLength: minLength(2) },
        password: { required, maxLength: maxLength(100), minLength: minLength(2) },
        firstNameEng: { required },
        lastNameEng: { required },
        firstName: { required },
        lastName: { required },
        nickname: { required },
        email: { email },
        idCardNumber: { minLength: minLength(13), maxLength: maxLength(13), numeric },
        studentMobile: { required, minLength: minLength(9), numeric },
        parentMobile: { required, minLength: minLength(9), numeric },
        parentFirstName: { required },

        education: { required },
        classType: { required },
        //courseHour: { required },
        totalHour: { required },
        studyHour: { required },
        hourLeft: { required },
        checkbox: {
            checked(val) {
                return val
            },
        },
    },
    computed: {

        hourLeftComputed() {
            return this.totalHour - this.studyHour;
        },
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

        firstNameEngErrors() {
            const errors = []
            if (!this.$v.firstNameEng.$dirty) return errors
            !this.$v.firstNameEng.required && errors.push('กรุณาระบุชื่อผู้สอนเป็นภาษาอังกฤษ')
            return errors
        },

        lastNameEngErrors() {
            const errors = []
            if (!this.$v.lastNameEng.$dirty) return errors
            !this.$v.lastNameEng.required && errors.push('กรุณาระบุนามสกุลเป็นภาษาอังกฤษ')
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

            return errors
        },
        parentMobileErrors() {
            const errors = []
            if (!this.$v.parentMobile.$dirty) return errors
            !this.$v.parentMobile.numeric && errors.push('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข')
            !this.$v.parentMobile.minLength && errors.push('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')

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

        totalHourErrors() {
            const errors = []
            if (!this.$v.totalHour.$dirty) return errors
            !this.$v.totalHour.required && errors.push('กรุณาระบุจำนวนชั่วโมง')
            return errors
        },
        studyHourErrors() {
            const errors = []
            if (!this.$v.studyHour.$dirty) return errors
            !this.$v.studyHour.required && errors.push('กรุณาระบุจำนวนชั่วโมง')
            return errors
        },
        hourLeftErrors() {
            const errors = []
            if (!this.$v.hourLeft.$dirty) return errors
            !this.$v.hourLeft.required && errors.push('กรุณาระบุจำนวนชั่วโมง')
            return errors
        },


    },
    components: {
        pageLoader
    },
    mounted() {
        this.search_teacher();
        this.readdata();
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'Month'))
        },
        flipDate(val) {
            val && setTimeout(() => (this.activePicker = 'Month'))
        },
        trialMenu(val) {
            val && setTimeout(() => (this.activePicker = 'Month'))
        },
        'firstNameEng': {
            handler: 'updateUsername',
            immediate: true,
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
            this.$refs.menu.save(date);

            this.updatePrivateExpire();

        },
        saveDate(date) {
            this.$refs.flipDate.save(date);
            this.updateFlipExpire();
        },
        saveTrialDate(date) {
            this.$refs.trialMenu.save(date);
            this.updateTrialExpire();
        },

        updatePrivateExpire() {

            if (this.privateCourseHour && this.purchasePrivateClassDate) {
                const purchaseDate = new Date(this.purchasePrivateClassDate);
                const expirationDate = new Date(purchaseDate);
                expirationDate.setMonth(expirationDate.getMonth() + this.privateClassMonth);
                const formattedExpirationDate = expirationDate.toISOString().slice(0, 10);
                this.expirePrivateClassDate = formattedExpirationDate;
            }

        },
        updateFlipExpire() {
            if (this.courseHour && this.purchaseFlipClassDate) {
                const purchaseDate = new Date(this.purchaseFlipClassDate);
                const expirationDate = new Date(purchaseDate);
                expirationDate.setMonth(expirationDate.getMonth() + this.flipClassMonth);
                const formattedExpirationDate = expirationDate.toISOString().slice(0, 10);
                this.expireFlipClassDate = formattedExpirationDate;
            }
        },

        updateTrialExpire() {
            if (this.trialCourseHour && this.trailDate) {
                const purchaseDate = new Date(this.trailDate);
                const expirationDate = new Date(purchaseDate);
                expirationDate.setMonth(expirationDate.getMonth() + this.flipClassMonth);
                const formattedExpirationDate = expirationDate.toISOString().slice(0, 10);
                this.expiretrailDate = formattedExpirationDate;
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
        updateTotalHour() {
            this.totalHour = (parseInt(this.courseHour || 0) + parseInt(this.freeHour || 0));
            this.updateHourLeft();
        },
        updatePrivateTotalHour() {
            this.privateTotalHour = (parseInt(this.privateCourseHour || 0) + parseInt(this.privateFreeHour || 0));
            this.updatePrivateHourLeft();
        },
        updateHourLeft() {
            this.hourLeft = this.totalHour - this.studyHour;
        },

        updatePrivateHourLeft() {
            this.privateHourLeft = this.privateTotalHour - this.privateStudyHour;
        },

        updateTrialHourLeft() {
            this.trialHourLeft = this.trialTotalHour - this.trialStudyHour;
        },

        updatePrivateClassMonth() {
            switch (this.privateCourseHour) {
                case 32: this.privateClassMonth = 4; break;
                case 48: this.privateClassMonth = 6; break;
                case 96: this.privateClassMonth = 12; break;
                default:
                    break;
            }
            this.privateTotalHour = (parseInt(this.privateCourseHour || 0) + parseInt(this.privateFreeHour || 0));
            this.updatePrivateHourLeft();
            this.updatePrivateExpire();
        },
        updateFlipClassMonth() {
            switch (this.courseHour) {
                case 32:
                    this.flipClassMonth = 4;
                    break;
                case 48:
                    this.flipClassMonth = 6;
                    break;
                case 96:
                    this.flipClassMonth = 12;
                    break;
                default:

                    break;
            }
            this.totalHour = (parseInt(this.courseHour || 0) + parseInt(this.freeHour || 0));
            this.updateHourLeft();
            this.updateFlipExpire();
        },

        updateFlipClass() {
            if (this.isFlipClass) {
                this.isFlipClass = false;
                this.totalHour = null;
                this.studyHour = null;
                this.hourLeft = null;
                this.freeHour = null;
                this.courseHour = null;
                this.expireFlipClassDate = null;
                this.purchaseFlipClassDate = null;
            }
            else {
                this.isFlipClass = true;
            }

        },

        updatePrivateClass() {
            if (this.isPrivateClass) {
                this.isPrivateClass = false;
                this.privateTotalHour = null;
                this.privateStudyHour = null;
                this.privateHourLeft = null;
                this.privateCourseHour = null;
                this.privateFreeHour = null;
                this.expirePrivateClassDate = null;
                this.purchasePrivateClassDate = null;
            }
            else {
                this.isPrivateClass = true;
            }

        },


        updateTrial() {
            if (this.isTrial) {

                this.trialTotalHour = null;
                this.trialStudyHour = null;
                this.trialHourLeft = null;
                this.trialCourseHour = null;
                this.trailDate = null;
                this.expiretrailDate = null;
            }
            else {

            }

        },

        handleFileUpload() {
            this.$refs.fileInput.click();

        },
        uploadFile(e) {
            this.profilePic = e.target.files[0];

        },
        submit() {
            this.$v.$touch()

            if (this.emailErrors.length == 0 && this.passErrors.length == 0
                && this.firstNameEngErrors == 0 && this.lastNameEngErrors == 0
                && this.firstNameErrors == 0 && this.lastNameErrors == 0
                && this.nameErrors.length == 0 && this.studentMobileErrors.length == 0
                && this.parentFirstNameErrors.length == 0 && this.parentMobileErrors.length == 0
                && this.educationErrors.length == 0) {
                console.log("Save");
                this.registerStudent();
            } else { console.log("errors save"); }
        },


        async checkDuplicateName(id) {
            const db = this.$fireModule.database();
            const snapshot = await db.ref('user').orderByChild('studentId').equalTo(id).once('value');
            const existingStudent = snapshot.val();
            return !!existingStudent;
        },


        updateUsername() {
            if (this.firstNameEng) {
                const num = this.studentId.slice(3);
                this.name = this.firstNameEng + num;
                this.password = this.firstNameEng + num;
            }
            else {
                this.name = null;
            }

        },
        async registerStudent() {
            const db = this.$fireModule.database();
            const keyuser = this.encode(this.name);
            this.isSubmiting = true;
            const isIDDuplicate = await this.checkDuplicateName(this.studentId);
            if (isIDDuplicate) {
                this.openSnackbar("error", 'รหัสของนักเรียนซ้ำ รหัสที่ซ้ำคือ ' + this.studentId);
                this.isSubmitting = false;
                return;
            }

            const timestamp = Timestamp.fromDate(new Date());
            const jsDate = timestamp.toDate();
            const isoString = jsDate.toISOString();
            this.createdAt = isoString;

            await db.ref(`user/${this.encode(this.name)}/`).set({
                status: this.status,
                studentId: this.studentId,
                createdAt: this.createdAt,

                totalHour: this.totalHour || 0,
                studyHour: this.studyHour || 0,
                hourLeft: this.hourLeft || 0,
                courseHour: this.courseHour,
                freeHour: this.freeHour,

                privateTotalHour: this.privateTotalHour || 0,
                privateStudyHour: this.privateStudyHour || 0,
                privateHourLeft: this.privateHourLeft || 0,
                privateCourseHour: this.privateCourseHour,
                privateFreeHour: this.privateFreeHour,

                expireFlipClassDate: this.expireFlipClassDate,
                expirePrivateClassDate: this.expirePrivateClassDate,
                purchaseFlipClassDate: this.purchaseFlipClassDate,
                purchasePrivateClassDate: this.purchasePrivateClassDate,

                trialFlipclassHour: 0,
                trialPrivateClassHour: 0,

                classTypes: this.classTypes,

                wantedTeacher: this.wantedTeacher,
                annotation: this.annotation,
                name: this.name,
                password: this.password,
                firstNameEng: this.firstNameEng,
                lastNameEng: this.lastNameEng,
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

            this.isSubmiting = false;
            this.isAlreadySubmit = true;

        },

        async search_teacher() {
            const db = this.$fireModule.database();
            await db.ref("user/").on("value", (snapshot) => {
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
            //console.log(this.teachers)
        },

        async readdata() {
            const db = this.$fireModule.database();

            const snapshot = await db.ref('user').orderByChild('studentId').limitToLast(1).once('value');
            const lastStudent = snapshot.val();

            for (const key in lastStudent) {


                if (lastStudent[key].status == 'admin' || lastStudent[key].status == 'teacher' || !lastStudent) {
                    const currentYear = new Date().getFullYear().toString().slice(-2);
                    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
                    this.studentId = `FSS${currentYear}${currentMonth}0001`;
                    return;
                } else {
                    const currentYear = new Date().getFullYear().toString().slice(-2);
                    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
                    const lastStudentId = Object.keys(lastStudent)[0];
                    const lastStudentCode = lastStudent[lastStudentId].studentId;
                    const lastMonth = lastStudentCode.slice(5, 7);
                    const numericPart = parseInt(lastStudentCode.slice(7), 10) + 1;
                    const nextNumericPart = currentMonth !== lastMonth ? 1 : numericPart;
                    const nextId = `FSS${currentYear}${currentMonth}${String(nextNumericPart).padStart(4, '0')}`;

                    this.studentId = nextId;


                }
            }
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

        encode(a) {
            const encodedData = btoa(encodeURIComponent(a))
            return encodedData;
        },

        reload() {
            window.location.reload();
        },


        isLetter(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z]+$/.test(char)) return true;
            else e.preventDefault();
        },

    },
}
</script>

<style>
.black-label .v-label {
    color: rgb(0, 0, 0);
    opacity: 1;
    font-weight: 500;
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

hr.solid {
    border-top: 3px solid black;
    border-width: 3px;
    opacity: 1;
}
</style>