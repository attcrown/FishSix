<template>
    <div>
        <!-- Header -->
        <v-card flat class="elevation-16 rounded-xl px-5 pt-8" style="background-color:#EBE4DE">
            <h5 class="px-4"><b>เลือกตารางเรียน</b></h5>
            <div class="d-flex">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" :rules="rules.date" label="วันที่เรียน" prepend-icon="mdi-calendar"
                            readonly v-bind="attrs" v-on="on" class="date-picker-field" required></v-text-field>
                    </template>

                    <v-date-picker v-model="date" no-title scrollable :events="arrayEvents" event-color="green lighten-1"
                        :max="date_now">
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date), search_date_teacher()">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-btn elevation="10" color="#322E2B" class="mt-3 ms-5" style="color:white" :disabled="!formIsValid"
                    type="submit" @click="search_date_teacher_All()" rounded>ค้นหาทั้งหมด<span
                        class="mdi mdi-magnify text-h6"></span></v-btn>

                <v-spacer></v-spacer>
                <v-btn elevation="10" color="#322E2B" class="me-5 mt-3" style="color:white" :disabled="!formIsValid"
                    type="submit" @click="dialog_excel = true" rounded v-if="status != 'teacher'">Export<span
                        class="mdi mdi-microsoft-excel text-h6"></span></v-btn>


            </div>
        </v-card>

        <!------------------------------------------------------------------------------------->
        <v-row>
            <v-col cols="12">
                <v-card-group class="d-flex justify-space-between pt-8 fonts500">
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5"
                            style="background: #B6A7A2;" height="159px" width="300px"
                            @click="checkname = true, checkname1 = false, checkname2 = false, checkname3 = false">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/youngpeoplestudents.png')" class="pt-5 ps-5"
                                        v-if="checkname">
                                    <img :src="require('~/assets/youngpeoplestudents.png')" class="pt-5 ps-5"
                                        v-if="!checkname" style="opacity: 0.2;">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:rgb(255, 255, 255);"
                                    v-if="checkname">
                                    {{ dash_notactive }}
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:rgba(255, 255, 255, 0.329);"
                                    v-if="!checkname">
                                    {{ dash_notactive }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">
                                        ยังไม่เช็คชื่อนักเรียน</p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                            style="background: #322E2B;" height="159px" width="300px"
                            @click=" checkname1 = true, checkname2 = false, checkname = false, checkname3 = false">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/young smiling woman working at laptop.png')"
                                        class="pt-5 ps-5" v-if="checkname1">
                                    <img :src="require('~/assets/young smiling woman working at laptop.png')"
                                        class="pt-5 ps-5" v-if="!checkname1" style="opacity: 0.2;">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:rgb(255, 255, 255);"
                                    v-if="checkname1">
                                    {{ dash_active }}
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:rgba(255, 255, 255, 0.315);"
                                    v-if="!checkname1">
                                    {{ dash_active }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">
                                        ยังไม่ส่งพัฒนาการนักเรียน</p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                            style="background: #AD382F;" height="159px" width="300px"
                            @click="checkname2 = true, checkname1 = false, checkname = false, checkname3 = false">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/stackbooks.png')" class="pt-8 ps-5" v-if="checkname2">
                                    <img :src="require('~/assets/stackbooks.png')" class="pt-8 ps-5" v-if="!checkname2"
                                        style="opacity: 0.2;">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:white;" v-if="checkname2">
                                    {{ dash_noall }}
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:rgba(255, 255, 255, 0.295);"
                                    v-if="!checkname2">
                                    {{ dash_noall }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">ไม่ผ่านการตรวจ
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                            style="background: #2b8b0e;" height="159px" width="300px"
                            @click="checkname3 = true, checkname1 = false, checkname2 = false, checkname = false">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/books.png')" class="pt-8 ps-5" v-if="checkname3">
                                    <img :src="require('~/assets/books.png')" class="pt-8 ps-5" v-if="!checkname3"
                                        style="opacity: 0.2;">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:white;" v-if="checkname3">
                                    {{ dash_all }}
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:rgba(255, 255, 255, 0.281);"
                                    v-if="!checkname3">
                                    {{ dash_all }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">ผ่านการตรวจแล้ว
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                </v-card-group>
            </v-col>
        </v-row>
        <!-- Detail teacher -->
        <v-expansion-panels v-model="panel" multiple class="mt-8" v-if="checkname">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(items, index) in dessertsByTeacherNotcheck"
                :key="index">
                <v-expansion-panel-header style="font-size:20px;"><b>{{ items[0].name }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table class="text-center" style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">วันที่</th>
                                <th class="p-2">รหัสนักเรียน</th>
                                <th class="p-2">ชื่อนักเรียน</th>
                                <th class="p-2">ประเภทคลาส</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เช็คชื่อ</th>
                                <th class="p-2">ส่งพัฒนาการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.keyStudent.key">
                                <td class="p-2">{{ item.date }}</td>
                                <td class="p-2">{{ item.studentId }}</td>
                                <td class="p-2">{{ item.namestu }}</td>
                                <td class="p-2">{{ item.style }}</td>
                                <td class="p-2">{{ item.subject }}</td>
                                <td class="p-2">{{ item.time_s }}</td>
                                <td class="p-2">{{ item.time_e }}</td>
                                <td class="p-2">{{ item.level }}</td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" v-if="item.sendplan == undefined"
                                        @click="check_sendplan(item)">
                                        <span class="mdi mdi-check text-h5"></span>
                                    </v-btn>
                                    <v-btn text icon elevation="5" v-if="item.sendplan != undefined" disabled>
                                        <span class="mdi mdi-check-all text-h5"></span>
                                    </v-btn>
                                </td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" :disabled="item.sendplan == undefined"
                                        @click="check_confirm(item)">
                                        <span class="mdi mdi-clipboard-text-outline text-h5"></span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <!------------------------------------------------------------------------------------->
        <!-- Detail teacher -->
        <v-expansion-panels v-model="panel1" multiple class="mt-8" v-if="checkname1">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(items, index) in dessertsByTeacherNotData"
                :key="index">
                <v-expansion-panel-header style="font-size:20px;"><b>{{ items[0].name }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table class="text-center" style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">วันที่</th>
                                <th class="p-2">รหัสนักเรียน</th>
                                <th class="p-2">ชื่อนักเรียน</th>
                                <th class="p-2">ประเภทคลาส</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เช็คชื่อ</th>
                                <th class="p-2">ส่งพัฒนาการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.keyStudent.key">
                                <td class="p-2">{{ item.date }}</td>
                                <td class="p-2">{{ item.studentId }}</td>
                                <td class="p-2">{{ item.namestu }}</td>
                                <td class="p-2">{{ item.style }}</td>
                                <td class="p-2">{{ item.subject }}</td>
                                <td class="p-2">{{ item.time_s }}</td>
                                <td class="p-2">{{ item.time_e }}</td>
                                <td class="p-2">{{ item.level }}</td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" v-if="item.sendplan == undefined"
                                        @click="check_sendplan(item)">
                                        <span class="mdi mdi-check text-h5"></span>
                                    </v-btn>
                                    <v-btn text icon elevation="5" v-if="item.sendplan != undefined" disabled>
                                        <span class="mdi mdi-check-all text-h5"></span>
                                    </v-btn>
                                </td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" :disabled="item.sendplan == undefined"
                                        @click="check_confirm(item)">
                                        <span class="mdi mdi-clipboard-text-outline text-h5"></span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <!------------------------------------------------------------------------------------->
        <!-- Detail teacher -->
        <v-expansion-panels v-model="panel2" multiple class="mt-8" v-if="checkname2">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(items, index) in dessertsByTeacherNotapprove"
                :key="index">
                <v-expansion-panel-header style="font-size:20px;"><b>{{ items[0].name }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table class="text-center" style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">วันที่</th>
                                <th class="p-2">รหัสนักเรียน</th>
                                <th class="p-2">ชื่อนักเรียน</th>
                                <th class="p-2">ประเภทคลาส</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เช็คชื่อ</th>
                                <th class="p-2">ส่งพัฒนาการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.keyStudent.key">
                                <td class="p-2">{{ item.date }}</td>
                                <td class="p-2">{{ item.studentId }}</td>
                                <td class="p-2">{{ item.namestu }}</td>
                                <td class="p-2">{{ item.style }}</td>
                                <td class="p-2">{{ item.subject }}</td>
                                <td class="p-2">{{ item.time_s }}</td>
                                <td class="p-2">{{ item.time_e }}</td>
                                <td class="p-2">{{ item.level }}</td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" v-if="item.sendplan == undefined"
                                        @click="check_sendplan(item)">
                                        <span class="mdi mdi-check text-h5"></span>
                                    </v-btn>
                                    <v-btn text icon elevation="5" v-if="item.sendplan != undefined" disabled>
                                        <span class="mdi mdi-check-all text-h5"></span>
                                    </v-btn>
                                </td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" :disabled="item.sendplan == undefined"
                                        @click="check_confirm(item)">
                                        <span class="mdi mdi-clipboard-text-outline text-h5"></span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <!------------------------------------------------------------------------------------->
        <!-- Detail teacher -->
        <v-expansion-panels v-model="panel3" multiple class="mt-8" v-if="checkname3">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(items, index) in dessertsByTeacherApprove"
                :key="index">
                <v-expansion-panel-header style="font-size:20px;"><b>{{ items[0].name }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table class="text-center" style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">วันที่</th>
                                <th class="p-2">รหัสนักเรียน</th>
                                <th class="p-2">ชื่อนักเรียน</th>
                                <th class="p-2">ประเภทคลาส</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เช็คชื่อ</th>
                                <th class="p-2">ส่งพัฒนาการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.keyStudent.key">
                                <td class="p-2">{{ item.date }}</td>
                                <td class="p-2">{{ item.studentId }}</td>
                                <td class="p-2">{{ item.namestu }}</td>
                                <td class="p-2">{{ item.style }}</td>
                                <td class="p-2">{{ item.subject }}</td>
                                <td class="p-2">{{ item.time_s }}</td>
                                <td class="p-2">{{ item.time_e }}</td>
                                <td class="p-2">{{ item.level }}</td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" v-if="item.sendplan == undefined"
                                        @click="check_sendplan(item)">
                                        <span class="mdi mdi-check text-h5"></span>
                                    </v-btn>
                                    <v-btn text icon elevation="5" v-if="item.sendplan != undefined" disabled>
                                        <span class="mdi mdi-check-all text-h5"></span>
                                    </v-btn>
                                </td>
                                <td class="p-2">
                                    <v-btn text icon elevation="5" :disabled="item.sendplan == undefined"
                                        @click="check_confirm(item)">
                                        <span class="mdi mdi-clipboard-text-outline text-h5"></span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-dialog v-model="dialog" max-width="570px">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card class="rounded-xl">
                    <v-card-title>
                        <b class="ms-5" style="font-size:16px">เชคชื่อวันที่ {{ edited.date }} | {{ edited.time_s }}-{{
                            edited.time_e }}</b>
                        <v-spacer></v-spacer>
                        <v-btn fab dark small color="#37474F" @click="dialog = false, clear_dialog()">
                            <v-icon dark class="text-h5">
                                mdi-close
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" style="margin-top:-15px">
                                    <v-chip color="#29CC39" text-color="white" v-if="check_time">
                                        ส่งภายในเวลา
                                    </v-chip>
                                    <v-chip color="#AD382F" text-color="white" v-if="!check_time">
                                        ส่งล่าช้า
                                    </v-chip>
                                    <v-chip color="#FFC107" text-color="black" v-if="edited.match_test">
                                        ทดลองเรียน
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px;">รายระเอียดเกี่ยวกับครู/นักเรียน</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="ชื่อนักเรียน" v-model="edited.namestu" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="วิชาที่เรียน" v-model="edited.subject" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="ชื่อครู" v-model="edited.name" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="เรื่องที่เรียน" v-model="edited.because" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <!-- <v-select v-model="edited.status_study" :items="because_check_study"
                                        :rules="[v => !!v || 'กรุณาเลือก']" label="เช็คชื่อเข้าเรียน" required></v-select> -->
                                    <v-radio-group v-model="edited.status_study_column" column
                                        :rules="[v => !!v || 'กรุณาเลือก']" required>
                                        <p>เช็คชื่อนักเรียนเข้าเรียน</p>
                                        <v-radio label="น้องมาตรงเวลา" value="true1"></v-radio>
                                        <v-radio label="น้องมาสาย" value="true2"></v-radio>
                                        <v-radio label="น้องลาหักชม.เรียนของน้องให้ชม.ครู" value="true3"></v-radio>
                                        <v-radio label="น้องลาไม่หักชม.เรียนของน้องให้ชม.ครู" value="true4"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <!-- <v-select v-model="edited.status_study_tea" :items="because_check_study_tea"
                                        :rules="[v => !!v || 'กรุณาเลือก']" label="เช็คชื่อเข้าเรียน" required></v-select> -->
                                    <v-radio-group v-model="edited.status_study_column_tea" column1
                                        :rules="[v => !!v || 'กรุณาเลือก']" required>
                                        <p>เช็คชื่อครูเข้าสอน</p>
                                        <v-radio label="ครูมาสอนตรงเวลา" value="true1"></v-radio>
                                        <v-radio label="ครูมาสาย" value="true2"></v-radio>
                                        <v-radio label="ครูลากระทันหัน" value="true3"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-file-input :rules="rules.img" v-model="fileToUpload"
                                        accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"
                                        label="รูปภาพ Check-In เข้าเรียน" required></v-file-input>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-file-input :rules="rules.img" v-model="fileToUpload1"
                                        accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"
                                        label="รูปภาพ Check-In เข้าสอน" required></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded color="#29CC39" class="mt-5 mb-5" dark @click="validate()">บันทึก <span
                                class="mdi mdi-content-save text-h6"></span></v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="dialog_confirm" max-width="700px">
            <v-form ref="form_confirm" v-model="valid_confirm" lazy-validation>
                <v-card class="rounded-xl">
                    <v-card-title>
                        <b class="ms-5" style="font-size:16px">เชคชื่อวันที่ {{ edited.date }} | {{ edited.time_s }}-{{
                            edited.time_e }}</b>
                        <v-spacer></v-spacer>
                        <v-btn fab dark small color="#37474F" @click="dialog_confirm = false, clear_dialog()">
                            <v-icon dark class="text-h5">
                                mdi-close
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" style="margin-top:-15px">
                                    <v-chip color="#29CC39" text-color="white" v-if="check_time">
                                        ส่งภายในเวลา
                                    </v-chip>
                                    <v-chip color="#AD382F" text-color="white" v-if="!check_time">
                                        ส่งล่าช้า
                                    </v-chip>
                                    <v-chip color="#FFC107" text-color="black" v-if="edited.match_test">
                                        ทดลองเรียน
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" sm="12" style="margin-top:-20px">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px;">รายระเอียดเกี่ยวกับครู/นักเรียน</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="ชื่อนักเรียน" v-model="edited.namestu" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="วิชาที่เรียน" v-model="edited.subject" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="ชื่อครู" v-model="edited.name" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" style="margin-top:-30px">
                                    <v-text-field label="จุดประสงค์ในการเรียน" v-model="edited.because"
                                        readonly></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12" sm="6" style="margin-top:-30px">
                                    <v-text-field label="เช็คชื่อนักเรียน" v-model="edited.status_study"
                                        readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" style="margin-top:-30px">
                                    <v-text-field label="เช็คชื่อครู" v-model="edited.status_study_tea"
                                        readonly></v-text-field>
                                </v-col> -->
                                <v-col cols="12" sm="6" style="margin-top:-30px">
                                    <v-radio-group v-model="edited.status_study_column" column readonly>
                                        <p>เช็คชื่อนักเรียนเข้าเรียน</p>
                                        <v-radio label="น้องมาตรงเวลา" value="true1"></v-radio>
                                        <v-radio label="น้องมาสาย" value="true2"></v-radio>
                                        <v-radio label="น้องลาหักชม.เรียนของน้องให้ชม.ครู" value="true3"></v-radio>
                                        <v-radio label="น้องลาไม่หักชม.เรียนของน้องให้ชม.ครู" value="true4"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6" style="margin-top:-30px">
                                    <v-radio-group v-model="edited.status_study_column_tea" column1 readonly>
                                        <p>เช็คชื่อครูเข้าสอน</p>
                                        <v-radio label="ครูมาสอนตรงเวลา" value="true1"></v-radio>
                                        <v-radio label="ครูมาสาย" value="true2"></v-radio>
                                        <v-radio label="ครูลากระทันหัน" value="true3"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6" style="margin-top:-30px">
                                    <v-btn rounded color="#42A5F5" class="mt-5 mb-5" small dark
                                        @click="img_show = true">ดูรูปภาพนักเรียน <span
                                            class="mdi mdi-image-area text-h6"></span></v-btn>
                                </v-col>
                                <v-col cols="12" sm="6" style="margin-top:-30px">
                                    <v-btn rounded color="#42A5F5" class="mt-5 mb-5" small dark
                                        @click="img_show_1 = true">ดูรูปภาพครู <span
                                            class="mdi mdi-image-area text-h6"></span></v-btn>
                                </v-col>
                                <v-col cols="12" sm="12" style="margin-top:-30px" v-if="edited.createAt_OP">
                                    <v-text-field label="เวลาส่งเช็คชื่อ (OP บันทึก)" v-model="edited.createAt_OP"
                                        readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" style="margin-top:-30px" v-if="edited.createAt">
                                    <v-text-field label="เวลาส่งเช็คชื่อ (ครูบันทึก)" v-model="edited.createAt"
                                        readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="วันนี้น้องเรียนเรื่อง" v-model="edited.learn" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select v-model="edited.understand" :items="items"
                                        :rules="[v => !!v || 'กรุณาลงคะแนน']" label="น้องมีความเข้าใจในเนื้อหา"
                                        required></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-textarea label="สำหรับวันนี้น้องมีพัฒนาการที่เพิ่มขึ้น" rows="1" counter
                                        v-model="edited.development" :rules="rules.textarea" required>
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
                                    <v-text-field label="ปัญหาที่เกิดกับน้องในการเรียน" v-model="edited.problem"
                                        :rules="rules.text" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="จึงใช้วิธี" v-model="edited.method" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="เพื่อพัฒนาน้อง" v-model="edited.to_development" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="การบ้านหรือแบบฝึกหัดที่ให้กับน้องในวันนี้"
                                        v-model="edited.homework" :rules="rules.text" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Link เกี่ยวกับเอกสารการเรียน หรือคลิปสอนนักเรียน"
                                        v-model="edited.link_url" :rules="rules.text" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-radio-group v-model="edited.check_sheet" :rules="[v => !!v || 'กรุณาเลือก']"
                                        required>
                                        <v-radio v-for="(items, index) in sheet_all" :key="index" :label="items.name"
                                            :value="items.key"></v-radio>
                                    </v-radio-group>
                                    <v-text-field label="Link เอกสารการเรียน (Upload ลง Goolge Drive)"
                                        v-if="edited.check_sheet == '-NcBOFy1oXhSI-dVzWkp'" v-model="edited.link_sheet"
                                        :rules="rules.text" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" style="margin-top:-30px" v-if="this.status == 'admin'">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px; color:#000;">Operation ตรวจสอบ</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" v-if="this.status == 'admin'">
                                    <v-select v-model="edited.status_development" :items="items_development"
                                        :rules="[v => !!v || 'กรุณาลงสถานะ']" label="สถานะพัฒนาการ" required></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" v-if="this.status == 'admin'">
                                    <v-text-field label="Comment/อื่นๆ" v-model="edited.comment" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" v-if="edited.match_test && this.status == 'admin'">
                                    <v-select v-model="edited.optional" :items="optional_all" item-value="key"
                                        item-text="name" :rules="[v => !!v || 'กรุณาเลือก Optional']" label="Optional"
                                        required></v-select>
                                </v-col>

                                <v-col cols="12" sm="12" style="margin-top:-30px" v-if="this.status == 'teacher'">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px; color:#000;">Operation ตรวจสอบ</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" v-if="this.status == 'teacher'">
                                    <v-select v-model="edited.status_development" :items="items_development"
                                        label="สถานะพัฒนาการ" readonly></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" v-if="this.status == 'teacher'">
                                    <v-text-field label="Comment/อื่นๆ" v-model="edited.comment" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" v-if="edited.match_test && this.status == 'teacher'">
                                    <v-select v-model="edited.optional" :items="optional_all" item-value="key"
                                        item-text="name" label="Optional" readonly></v-select>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded color="#29CC39" class="mt-5 mb-5" dark @click="validate_confirm()">บันทึก <span
                                class="mdi mdi-content-save text-h6"></span></v-btn>
                        <v-spacer></v-spacer>

                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="img_show" hide-overlay persistent width="500">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="img_show = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <img :src="edited.img" width="400px">
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="img_show_1" hide-overlay persistent width="500">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="img_show_1 = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <img :src="edited.img_1" width="400px">
                </v-card-text>
            </v-card>
        </v-dialog>


        <v-dialog v-model="loadsave" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    กำลังบันทึก
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog_excel" max-width="600px">
            <v-card class="p-4 rounded-xl">
                <v-card-title>
                    <span style="font-size: 16px">
                        <b>กรุณาเลือกข้อมูลที่ต้องการ Export</b>
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="dialog_excel = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row no-gutters>
                            <v-checkbox class="m-0" v-model="isExportAll" @change="check_excel()"
                                label="ข้อมูลทั้งหมด"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[0]" label="รหัสครู" :disabled="isExportAll"
                                value="รหัสครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[1]" label="ชื่อจริงครู" :disabled="isExportAll"
                                value="ชื่อจริงครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[2]" label="นามสกุลครู" :disabled="isExportAll"
                                value="นามสกุลครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[3]" label="ชื่อเล่นครู" :disabled="isExportAll"
                                value="ชื่อเล่นครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[4]" label="เบอร์โทรศัพท์ครู"
                                :disabled="isExportAll" value="เบอร์โทรศัพท์ครู"></v-checkbox>

                            <v-checkbox class="m-0" v-model="selectedHeaders[5]" label="รหัสนักเรียน"
                                :disabled="isExportAll" value="รหัสนักเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[6]" label="ชื่อจริงนักเรียน"
                                :disabled="isExportAll" value="ชื่อจริงนักเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[7]" label="นามสกุลนักเรียน"
                                :disabled="isExportAll" value="นามสกุลนักเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[8]" label="ชื่อเล่นนักเรียน"
                                :disabled="isExportAll" value="ชื่อเล่นนักเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[9]" label="เบอร์โทรศัพท์นักเรียน"
                                :disabled="isExportAll" value="เบอร์โทรศัพท์นักเรียน"></v-checkbox>

                            <v-checkbox class="m-0" v-model="selectedHeaders[10]" label="สถานะเช็คชื่อนักเรียน"
                                :disabled="isExportAll" value="สถานะเช็คชื่อนักเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[11]" label="สถานะเช็คชื่อครู"
                                :disabled="isExportAll" value="สถานะเช็คชื่อครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[12]" label="เวลาบันทึกเช็คชื่อ"
                                :disabled="isExportAll" value="เวลาบันทึกเช็คชื่อ"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[13]" label="เวลาบันทึกพัฒนาการนักเรียน"
                                :disabled="isExportAll" value="เวลาบันทึกพัฒนาการนักเรียน"></v-checkbox>

                            <v-checkbox class="m-0" v-model="selectedHeaders[14]" label="วันที่เริ่มสอน"
                                :disabled="isExportAll" value="วันที่เริ่มสอน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[15]" label="เริ่มเรียน" :disabled="isExportAll"
                                value="เริ่มเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[16]" label="เลิกเรียน" :disabled="isExportAll"
                                value="เลิกเรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[17]" label="เรื่องที่เรียน"
                                :disabled="isExportAll" value="เรื่องที่เรียน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[18]" label="ระดับความเข้าใจ"
                                :disabled="isExportAll" value="ระดับความเข้าใจ"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[19]" label="พัฒนาการ" :disabled="isExportAll"
                                value="พัฒนาการ"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[20]" label="ปัญหาในการสอน"
                                :disabled="isExportAll" value="ปัญหาในการสอน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[21]" label="วิธีแก้" :disabled="isExportAll"
                                value="วิธีแก้"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[22]" label="เพื่อพัฒนาน้อง"
                                :disabled="isExportAll" value="เพื่อพัฒนาน้อง"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[23]" label="การบ้าน" :disabled="isExportAll"
                                value="การบ้าน"></v-checkbox>

                            <v-checkbox class="m-0" v-model="selectedHeaders[24]" label="สถานะพัฒนาการ"
                                :disabled="isExportAll" value="สถานะพัฒนาการ"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[25]" label="Comment" :disabled="isExportAll"
                                value="Comment"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[26]" label="เรทค่าสอน" :disabled="isExportAll"
                                value="เรทค่าสอน"></v-checkbox>
                        </v-row>
                    </v-container>
                </v-card-text>
                <hr style="border: 2px solid #000; background-color: #000; margin-top: -30px;">
                <v-card-title style="margin-top: -20px;">
                    <v-btn class="text-white" @click="exportToExcel" color="green">ยืนยัน
                        <v-icon color="white" small> mdi-content-save</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-dialog>


    </div>
</template>
<script>

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export default {
    data() {
        return {
            optional_all: [],
            sheet_all: [],
            keyuser: null,
            status: null,
            checkname: false,
            checkname1: false,
            checkname2: false,
            checkname3: false,
            dash_all: 0,
            dash_noall: 0,
            dash_active: 0,
            dash_notactive: 0,

            panel: [0],
            panel1: [0],
            panel2: [0],
            panel3: [0],

            desserts: [],
            dessertsNotcheck: [],
            dessertsNotData: [],
            dessertsNotapprove: [],
            dessertsApprove: [],

            dialog_excel: false,
            isExportAll: false,
            selectedHeaders: [],


            column: null,
            column1: null,

            check_time: false,

            img_show: false,
            img_show_1: false,

            loadsave: false,

            summ_hour: 0,

            valid: false,
            valid_confirm: false,

            imageURL: '', // เก็บ URL ของรูปภาพ
            fileToUpload: null,
            fileToUpload1: null,

            dialog: false,
            dialog_confirm: false,
            desserts: [],
            arrayEvents: [],

            panel: [],
            readonly: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date_now: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            form: [],
            form_confirm: [],

            rules: {
                // age: [(val) => val < 10 || `I don't believe you!`],
                // animal: [(val) => (val || "").length > 0 || "This field is required"],
                date: [(val) => (val || "").length > 0 || "กรุณาระบุวันที่"],
                name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล",
                (val) => /^[0-9]+$/.test(val) || "กรุณากรอกตัวเลขเท่านั้น",],
                text: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
                img: [value => !value || value.size < 10000000 || 'ภาพต้องมีขนาดไม่เกิน 10MB!',
                (val) => (val) != null || "กรุณาระบุข้อมูล"],
                textarea: [(val) => (val || "").length >= 200 || 'ขั้นต่ำ 200 ตัวอักษร'],
            },

            edited: [],
            time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
                , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
                , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
                , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
                , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
                , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],

            items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            items_development: ['Pending', 'Rejected', 'Approved'],

            because_check_study: ["น้องมาตรงเวลา", "น้องมาสาย", "น้องลา หักชม.เรียน ของน้อง ให้ชม. ครู", "น้องลา ไม่หักชม.เรียน ของน้อง ให้ชม. ครู"],
            because_check_study_tea: ["ครูมาสอนตรงเวลา", "ครูมาสาย", "ครูลากระทันหัน"],
        }
    },
    mounted() {
        this.sheet_search();
        this.optional_search();
        this.fullName();
        this.search_date_teacher();
        this.arrayEvent_search();
    },

    computed: {
        dessertsByTeacherNotcheck() {
            // Use Array.reduce() to group items by teacher name
            const groupedByTeacher = this.dessertsNotcheck.reduce((acc, item) => {
                const teacherName = item.name;
                if (!acc[teacherName]) {
                    acc[teacherName] = [];
                }
                acc[teacherName].push(item);
                // เรียงข้อมูลในกลุ่มตามวันที่
                acc[teacherName].sort((a, b) => new Date(a.date) - new Date(b.date));
                return acc;
            }, {});

            // Convert the object back to an array
            return Object.values(groupedByTeacher);
        },

        dessertsByTeacherNotData() {
            // Use Array.reduce() to group items by teacher name
            const groupedByTeacher = this.dessertsNotData.reduce((acc, item) => {
                const teacherName = item.name;
                if (!acc[teacherName]) {
                    acc[teacherName] = [];
                }
                acc[teacherName].push(item);
                // เรียงข้อมูลในกลุ่มตามวันที่
                acc[teacherName].sort((a, b) => new Date(a.date) - new Date(b.date));
                return acc;
            }, {});

            // Convert the object back to an array
            return Object.values(groupedByTeacher);
        },
        dessertsByTeacherNotapprove() {
            // Use Array.reduce() to group items by teacher name
            const groupedByTeacher = this.dessertsNotapprove.reduce((acc, item) => {
                const teacherName = item.name;
                if (!acc[teacherName]) {
                    acc[teacherName] = [];
                }
                acc[teacherName].push(item);
                // เรียงข้อมูลในกลุ่มตามวันที่
                acc[teacherName].sort((a, b) => new Date(a.date) - new Date(b.date));
                return acc;
            }, {});

            // Convert the object back to an array
            return Object.values(groupedByTeacher);
        },
        dessertsByTeacherApprove() {
            // Use Array.reduce() to group items by teacher name
            const groupedByTeacher = this.dessertsApprove.reduce((acc, item) => {
                const teacherName = item.name;
                if (!acc[teacherName]) {
                    acc[teacherName] = [];
                }
                acc[teacherName].push(item);
                // เรียงข้อมูลในกลุ่มตามวันที่
                acc[teacherName].sort((a, b) => new Date(a.date) - new Date(b.date));
                return acc;
            }, {});

            // Convert the object back to an array
            return Object.values(groupedByTeacher);
        },
        formIsValid() {
            return (
                this.date
            );
        },
    },

    watch: {

    },

    methods: {
        optional_search() {
            const db = this.$fireModule.database();
            db.ref(`optional_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath });
                }
                this.optional_all = item;
                console.log(this.optional_all);
            })
        },
        sheet_search() {
            const db = this.$fireModule.database();
            db.ref(`sheet_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.sheet_all = item;
                console.log(this.sheet_all);
            })
        },
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.keyuser = sessionStorage.getItem('lastName') || '';
                this.status = sessionStorage.getItem('status') || '';
            } else {
                this.keyuser = localStorage.getItem('lastName') || '';
                this.status = localStorage.getItem('status') || '';
            }
            console.log(">>>>>", this.keyuser, this.status);
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.upload();
            } else { console.log(this.edited, this.column, this.column1); }
        },

        validate_confirm() {
            if (this.$refs.form_confirm.validate()) {
                console.log(this.edited);
                this.dialog_confirm = false;
                this.save_confirm();
            }
        },
        check_sendplan(item) {
            this.dialog = true;
            this.edited = item;
            this.summ_hour = this.sum_hour(this.edited.time_s, this.edited.time_e);
            if (parseInt(new Date(this.edited.date).getTime()) >= parseInt(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).getTime())) {
                this.check_time = true;
            } else {
                this.check_time = false;
            }
            console.log(this.edited, this.summ_hour, this.check_time);
        },
        check_confirm(item) {
            this.edited = item;
            const db = this.$fireModule.database();
            db.ref(`send_plan/${item.keyTeacher}/${item.Idsendplan}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                let sumx_date = "-";
                let sumx_date_tea = "-";
                if (childData.createAt_OP) {
                    let sum_date = new Date(childData.createAt_OP).toString().split(" ");
                    sumx_date = `${sum_date[1]} ${sum_date[2]} ${sum_date[3]} ${sum_date[4]}`
                    childData.createAt_OP = sumx_date;
                }
                if (childData.createAt) {
                    let sum_date_tea = new Date(childData.createAt).toString().split(" ");
                    sumx_date_tea = `${sum_date_tea[1]} ${sum_date_tea[2]} ${sum_date_tea[3]} ${sum_date_tea[4]}`
                    childData.createAt = sumx_date_tea;
                }
                this.edited = { ...this.edited, ...childData }; // ใช้ spread operator เพื่อรวม object this.edited และ object childData เข้าด้วยกัน
                if (childData.check_save) {
                    this.check_time = true;
                } else if (parseInt(new Date(this.edited.date).getTime()) >= parseInt(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).getTime())) {
                    this.check_time = true;
                } else {
                    this.check_time = false;
                }
                console.log(this.edited, this.check_time);
            });
            this.dialog_confirm = true;
        },

        clear_dialog() {
            this.imageURL = '';
            this.edited = [];
            this.fileToUpload = null;
            this.fileToUpload1 = null;
            this.dialog = false;
        },

        upload() {
            this.loadsave = true;
            this.dialog = false;
            let id = new Date().getTime();
            const storageRef = firebase.storage().ref();
            const file = this.fileToUpload;
            const file1 = this.fileToUpload1;

            const imageRef = storageRef.child(`send_check/${id}.jpg`);
            imageRef
                .put(file)
                .then(() => {
                    console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
                    const storage = firebase.storage();
                    const image = storage.ref(`send_check/${id}.jpg`);
                    image.getDownloadURL()
                        .then((url) => {
                            this.imageURL = url;
                            console.log(this.imageURL);

                            const imageRef1 = storageRef.child(`send_check/${id}_1.jpg`);
                            imageRef1
                                .put(file1)
                                .then(() => {
                                    console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
                                    const storage = firebase.storage();
                                    const image1 = storage.ref(`send_check/${id}_1.jpg`);
                                    image1.getDownloadURL()
                                        .then((url_1) => {
                                            this.imageURL_1 = url_1;
                                            console.log(this.imageURL_1);
                                            // อัปเดตค่าใน Firebase Realtime Database เมื่อรูปภาพอัปโหลดเสร็จสิ้น
                                            const db = this.$fireModule.database();
                                            db.ref(`date_match/${this.edited.keyStudent}/${this.edited.date}/${this.edited.time_e}/`).update({
                                                sendplan: true,
                                                Idsendplan: id,
                                            }).then(() => {
                                                console.log('save date_match');
                                            })

                                            const currentDate = new Date();
                                            //classHistory
                                            const transactionId = `CH${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
                                            db.ref(`studentHistory/${this.edited.keyStudent}/${transactionId}`).set({
                                                hour: this.edited.hour,
                                                keySubject: this.edited.keySubject,
                                                teacherName: this.edited.name,
                                                level: this.edited.level,
                                                studentId: this.edited.studentId,
                                                subject: this.edited.subject,
                                                teacherId: this.edited.teacherId,
                                                time_e: this.edited.time_e,
                                                time_s: this.edited.time_s,
                                                style: this.edited.style,
                                            }).then(() => {
                                                console.log('Update student class history');
                                            })

                                            db.ref(`send_plan/${this.edited.keyTeacher}/${id}`).update({
                                                img: this.imageURL,
                                                img_1: this.imageURL_1,
                                                hour: this.summ_hour,
                                                status_study_column: this.edited.status_study_column,
                                                status_study_column_tea: this.edited.status_study_column_tea,
                                                createAt_OP: new Date(),
                                                keystudent: this.edited.keyStudent,
                                                date_learn: this.edited.date,
                                                time_learn: this.edited.time_e,
                                                level: this.edited.level,
                                                keysubject: this.edited.keySubject,
                                                check_name: this.check_time,
                                            }).then(() => {
                                                console.log('save send_plan');
                                                if (this.date == null) {
                                                    this.search_date_teacher_All();
                                                } else {
                                                    this.search_date_teacher();
                                                }
                                            })

                                            let keystudent = this.edited;
                                            if (keystudent.style.includes("Flip") && !this.edited.match_test) {
                                                db.ref(`hour_match/${keystudent.keyStudent}`).once("value", (snapshot) => {
                                                    const childData = snapshot.val();
                                                    db.ref(`hour_match/${keystudent.keyStudent}`).update({
                                                        hour: childData.hour - keystudent.hour,
                                                    });
                                                })
                                            }
                                            if (keystudent.style.includes("Private") && !this.edited.match_test) {
                                                db.ref(`hour_match/${keystudent.keyStudent}`).once("value", (snapshot) => {
                                                    const childData = snapshot.val();
                                                    db.ref(`hour_match/${keystudent.keyStudent}`).update({
                                                        hourprivate: childData.hourprivate - keystudent.hour,
                                                    });
                                                })
                                            }

                                            if (this.edited.match_test) {
                                                const getTeacherPromise = db.ref(`user/${this.edited.keyStudent}`).once("value");
                                                Promise.all([getTeacherPromise])
                                                    .then(([teacherSnapshot]) => {
                                                        const studentData = teacherSnapshot.val();
                                                        console.log(studentData);
                                                        if (studentData.trialFlipclassHour && studentData.trialPrivateClassHour) {
                                                            if (this.edited.style.substring(0, 4) === "Flip") {
                                                                db.ref(`user/${this.edited.keyStudent}/`).update({
                                                                    trialFlipclassHour: parseInt(studentData.trialFlipclassHour) + this.summ_hour,
                                                                })
                                                            } else if (this.edited.style.substring(0, 7) === "Private") {
                                                                db.ref(`user/${this.edited.keyStudent}/`).update({
                                                                    trialPrivateClassHour: parseInt(studentData.trialPrivateClassHour) + this.summ_hour,
                                                                })
                                                            } else {
                                                                console.log("Error");
                                                            }
                                                            console.log('ลบ ชม. ทดลอง');
                                                            this.loadsave = false;
                                                            this.clear_dialog();
                                                        } else {
                                                            console.log('>>> freeHour privateFreeHour No DATA');

                                                            if (this.edited.style.substring(0, 4) === "Flip") {
                                                                db.ref(`user/${this.edited.keyStudent}/`).update({
                                                                    trialFlipclassHour: this.summ_hour,
                                                                })
                                                            } else if (this.edited.style.substring(0, 7) === "Private") {
                                                                db.ref(`user/${this.edited.keyStudent}/`).update({
                                                                    trialPrivateClassHour: this.summ_hour,
                                                                })
                                                            } else {
                                                                console.log("Error");
                                                            }
                                                            console.log('เพิ่ม ชม. ทดลอง');
                                                            this.loadsave = false;
                                                            this.clear_dialog();
                                                        }
                                                    })
                                            } else if (this.edited.status_study_column == "true3" || this.edited.status_study_column == "true2" || this.edited.status_study_column == "true1") {
                                                const getTeacherPromise = db.ref(`user/${this.edited.keyStudent}`).once("value");
                                                Promise.all([getTeacherPromise])
                                                    .then(([teacherSnapshot]) => {
                                                        const studentData = teacherSnapshot.val();
                                                        console.log(studentData);
                                                        let data_edit = this.edited;
                                                        if (studentData.studyHour != undefined) {
                                                            if (data_edit.style.substring(0, 4) === "Flip") {
                                                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                                                    studyHour: parseInt(studentData.studyHour) + this.summ_hour,
                                                                    hourLeft: parseInt(studentData.hourLeft) - this.summ_hour
                                                                })
                                                            } else {
                                                                console.log("Error");
                                                            }
                                                            console.log('ลบ ชม. class จริง', data_edit.style);
                                                            this.loadsave = false;
                                                            this.clear_dialog();
                                                        } else if (studentData.studyHour == undefined) {
                                                            db.ref(`user/${data_edit.keyStudent}/`).update({
                                                                studyHour: this.summ_hour,
                                                                hourLeft: parseInt(studentData.hourLeft) - this.summ_hour
                                                            })
                                                        } else {
                                                            console.log('>>>Hour flipHour No DATA Flip');
                                                        }

                                                        if (studentData.privateStudyHour != undefined) {
                                                            if (data_edit.style.substring(0, 7) === "Private") {
                                                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                                                    privateStudyHour: parseInt(studentData.privateStudyHour) + this.summ_hour,
                                                                    privateHourLeft: parseInt(studentData.privateHourLeft) - this.summ_hour,
                                                                })
                                                            } else {
                                                                console.log("Error");
                                                            }
                                                            console.log('ลบ ชม. class จริง', data_edit.style);
                                                            this.loadsave = false;
                                                            this.clear_dialog();
                                                        } else if (studentData.privateStudyHour == undefined) {
                                                            db.ref(`user/${data_edit.keyStudent}/`).update({
                                                                privateStudyHour: this.summ_hour,
                                                                privateHourLeft: parseInt(studentData.privateHourLeft) - this.summ_hour,
                                                            })
                                                        } else {
                                                            console.log('>>>Hour privateHour No DATA Private');
                                                        }
                                                    })
                                            } else {
                                                console.log("ไม่มีการลบ ชม.");
                                                this.loadsave = false;
                                                this.clear_dialog();
                                            }
                                        })
                                }).catch((error) => {
                                    console.log("รูปสอง", error);
                                });
                        }).catch((error) => {
                            console.log("รูปหนึ่ง", error);
                        });
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error);
                });
        },
        save_confirm() {
            const db = this.$fireModule.database();
            if (this.edited.status_development == "Approved") {
                let level_search = null;
                const getsubjectPromise = db.ref(`subject_all/${this.edited.keySubject}/`).once("value");
                const getlevelPromise = db.ref(`level_all/`).once("value");
                const gettypeflipPromise = db.ref(`type_all/${this.edited.teacherAll.typeflip}`).once("value");
                const gettypeprivatePromise = db.ref(`type_private_all/${this.edited.teacherAll.typeprivate}`).once("value");
                const getlocationPromise = db.ref(`location/${this.edited.keystyle}`).once("value");
                const getsheetPromise = db.ref(`sheet_all/${this.edited.check_sheet}`).once("value");
                const getoptionalPromise = db.ref(`optional_all/${this.edited.optional}`).once("value");
                const getsend_ratePromise = db.ref(`send_rate_all/`).once("value");
                Promise.all([getsubjectPromise, getlevelPromise, gettypeflipPromise, gettypeprivatePromise, getlocationPromise, getsheetPromise, getoptionalPromise, getsend_ratePromise])
                    .then((snapshots) => {
                        const subject_data = snapshots[0].val();
                        const level_data = snapshots[1].val();
                        const typeflip_data = snapshots[2].val();
                        const typeprivate_data = snapshots[3].val();
                        const location_data = snapshots[4].val();
                        const sheet_data = snapshots[5].val();
                        const optional_data = snapshots[6].val();
                        const send_rate_data = snapshots[7].val();
                        console.log(subject_data, level_data, typeflip_data, typeprivate_data, location_data, sheet_data, optional_data, send_rate_data);
                        for (const key in level_data) {
                            console.log(level_data[key].name);
                            if (level_data[key].name.includes(this.edited.level)) {
                                level_search = { key: key, name: level_data[key].name, bath: level_data[key].bath };
                                console.log(level_search, this.edited.level);
                                break;
                            }
                        }
                        //-----------------คำนวนรายได้----------------------------
                        let sum = 0;
                        let del_send_rate_name = 0;
                        let del_send_rate_save = 0;
                        if (this.edited.style.substring(0, 4).includes('Flip') && optional_data != undefined) {
                            console.log('1', this.edited.style.substring(0, 4), optional_data);
                            sum = (parseFloat(subject_data.bath) +
                                parseFloat(level_search.bath) +
                                parseFloat(typeflip_data.bath) +
                                parseFloat(location_data.bath) +
                                parseFloat(sheet_data.bath) +
                                parseFloat(optional_data.bath)) * parseFloat(this.edited.hour);
                            if (this.edited.check_name == false) {
                                del_send_rate_name = sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100);

                            } if (this.edited.check_save == false) {
                                del_send_rate_save = sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100);
                            }
                            console.log(sum ,del_send_rate_name,del_send_rate_save);
                        } else if (this.edited.style.substring(0, 7).includes('Private') && optional_data != undefined) {
                            console.log('2', this.edited.style.substring(0, 4), optional_data);
                            sum = (parseFloat(subject_data.bath) +
                                parseFloat(level_search.bath) +
                                parseFloat(typeprivate_data.bath || 0) +
                                parseFloat(location_data.bath) +
                                parseFloat(sheet_data.bath) +
                                parseFloat(optional_data.bath)) * parseFloat(this.edited.hour);
                            if (this.edited.check_name == false) {
                                del_send_rate_name = sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100);

                            } if (this.edited.check_save == false) {
                                del_send_rate_save = sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100);
                            }
                            console.log(sum ,del_send_rate_name,del_send_rate_save);
                        } else if (this.edited.style.substring(0, 4).includes('Flip') && optional_data == undefined) {
                            console.log('3', this.edited.style.substring(0, 4), optional_data);
                            sum = (parseFloat(subject_data.bath) +
                                parseFloat(level_search.bath) +
                                parseFloat(typeflip_data.bath) +
                                parseFloat(location_data.bath) +
                                parseFloat(sheet_data.bath)) * parseFloat(this.edited.hour);
                            if (this.edited.check_name == false) {
                                del_send_rate_name = sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100);

                            } if (this.edited.check_save == false) {
                                del_send_rate_save = sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100);
                            }
                            console.log(sum ,del_send_rate_name,del_send_rate_save);
                        } else if (this.edited.style.substring(0, 7).includes('Private') && optional_data == undefined) {
                            console.log('4', this.edited.style.substring(0, 4), optional_data);
                            sum = (parseFloat(subject_data.bath) +
                                parseFloat(level_search.bath) +
                                parseFloat(typeprivate_data.bath) +
                                parseFloat(location_data.bath) +
                                parseFloat(sheet_data.bath)) * parseFloat(this.edited.hour);
                            if (this.edited.check_name == false) {
                                del_send_rate_name = sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcM3iD1BtbI6Z0E1R'].bath) / 100);

                            } if (this.edited.check_save == false) {
                                del_send_rate_save = sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100;
                                sum = sum - (sum * parseFloat(send_rate_data['-NcGcQ5V7RjIzzAJaerY'].bath) / 100);
                            }
                            console.log(sum ,del_send_rate_name,del_send_rate_save);
                        } else { alert('คำนวนล้มเหลว'); }

                        db.ref(`send_plan/${this.edited.keyTeacher}/${this.edited.Idsendplan}/money`).update({
                            subject: subject_data || null,
                            level: level_search || null,
                            typeflip: typeflip_data || null,
                            typeprivate: typeprivate_data || null,
                            location: location_data || null,
                            sheet: sheet_data || null,
                            optional: optional_data || null,
                            send_rate_save: send_rate_data['-NcGcQ5V7RjIzzAJaerY'],
                            send_rate_name: send_rate_data['-NcGcM3iD1BtbI6Z0E1R'],
                            sum_money: sum || null,
                            sum_send_rate_name: del_send_rate_name,
                            sum_send_rate_save: del_send_rate_save,
                        }).then(() => {
                            console.log("คำนวนเงินเดือน");
                        })

                    })
            }
            db.ref(`send_plan/${this.edited.keyTeacher}/${this.edited.Idsendplan}/`).update({
                learn: this.edited.learn || null,
                understand: this.edited.understand || null,
                development: this.edited.development || null,
                problem: this.edited.problem || null,
                method: this.edited.method || null,
                to_development: this.edited.to_development || null,
                homework: this.edited.homework || null,
                status_development: this.edited.status_development || null,
                comment: this.edited.comment || null,
                check_save: this.check_time,
                optional: this.edited.optional || null,
                link_url: this.edited.link_url || null,
                link_sheet: this.edited.link_sheet || null,
                check_sheet: this.edited.check_sheet || null,
                createAt_rate_OP: new Date()
            }).then(() => {
                console.log('save send_plan' ,this.edited);
                this.clear_dialog();
                if (this.date == null) {
                    this.search_date_teacher_All();
                } else {
                    this.search_date_teacher();
                }
            })
        },

        sum_hour(start, end) {
            // console.log('ทำsum',start,end);
            let sum = 0;
            let set = 0;
            for (const key in this.time_full) {
                // console.log(this.time_full[key])
                if (end == this.time_full[key]) {
                    set = 0;
                    return sum;
                } else if (start == this.time_full[key] || set > 0) {
                    set++;
                    sum = sum + 0.5;
                    // console.log(sum);
                }
            }
        },

        arrayEvent_search() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                this.arrayEvents = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            if (timedata.status === "พร้อมเรียน") {
                                this.arrayEvents.push(date);
                            }
                        }
                    }
                }
            })
        },
        search_date_teacher() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.dash_all = 0;
                this.dash_noall = 0;
                this.dash_active = 0;
                this.dash_notactive = 0;
                this.dessertsNotcheck = [];
                this.dessertsNotData = [];
                this.dessertsNotapprove = [];
                this.dessertsApprove = [];
                let item = [];
                let item1 = [];
                let item2 = [];
                let item3 = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            if (this.status == "teacher" && this.keyuser == timedata.teacher) {
                                const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                const getStudentPromise = db.ref(`user/${key}`).once("value");
                                const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                const getSendplanPromise = db.ref(`send_plan/${timedata.teacher}/${timedata.Idsendplan}`).once("value");
                                Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise, getSendplanPromise])
                                    .then((snapshots) => {
                                        const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                        const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                        const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                        const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้
                                        const sendplanSnapshot = snapshots[4];

                                        const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const locationData = locationSnapshot.val();
                                        const studentData = studentSnapshot.val();
                                        const sendplanData = sendplanSnapshot.val();

                                        const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                        const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                        const namesub = subjectData.name;
                                        if (timedata.status === "พร้อมเรียน" && date === this.date) {
                                            if (sendplanData) {
                                                if (sendplanData.status_development === 'Approved') {
                                                    this.dash_all++;
                                                    item.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                } else if (sendplanData.status_development == 'Pending'
                                                    || sendplanData.status_development == 'Rejected'
                                                    || sendplanData.status_development == undefined && sendplanData.homework) {
                                                    this.dash_noall++;
                                                    item1.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                } else if (!sendplanData?.homework && timedata?.Idsendplan) {
                                                    this.dash_active++;
                                                    item2.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                }
                                            }
                                            else if (!sendplanData?.Idsendplan) {
                                                this.dash_notactive++;
                                                item3.push({
                                                    level: timedata.level,
                                                    name: nametea,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: locationData.name,
                                                    keystyle: timedata.style_subject,
                                                    subject: namesub,
                                                    keySubject: timedata.subject,
                                                    keyStudent: key,
                                                    keyTeacher: timedata.teacher,
                                                    studentId: studentData.studentId,
                                                    teacherId: teacherData.teacherId,
                                                    namestu: namestu,
                                                    sendplan: timedata.sendplan,
                                                    because: timedata.because,
                                                    Idsendplan: timedata.Idsendplan,
                                                    match_test: timedata.match_test,
                                                    hour: timedata.hour,
                                                    sendplanAll: sendplanData,
                                                    teacherAll: teacherData,
                                                    studentAll: studentData
                                                });
                                            }
                                        }
                                    })
                            } else if (this.status == 'admin') {
                                const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                const getStudentPromise = db.ref(`user/${key}`).once("value");
                                const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                const getSendplanPromise = db.ref(`send_plan/${timedata.teacher}/${timedata.Idsendplan}`).once("value");
                                Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise, getSendplanPromise])
                                    .then((snapshots) => {
                                        const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                        const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                        const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                        const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้
                                        const sendplanSnapshot = snapshots[4];

                                        const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const locationData = locationSnapshot.val();
                                        const studentData = studentSnapshot.val();
                                        const sendplanData = sendplanSnapshot.val();

                                        const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                        const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                        const namesub = subjectData.name;
                                        if (timedata.status === "พร้อมเรียน" && date === this.date) {
                                            if (sendplanData) {
                                                if (sendplanData.status_development === 'Approved') {
                                                    this.dash_all++;
                                                    item.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                } else if (sendplanData.status_development == 'Pending'
                                                    || sendplanData.status_development == 'Rejected'
                                                    || sendplanData.status_development == undefined && sendplanData.homework) {
                                                    this.dash_noall++;
                                                    item1.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                } else if (!sendplanData?.homework && timedata?.Idsendplan) {
                                                    this.dash_active++;
                                                    item2.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                }
                                            }
                                            else if (!sendplanData?.Idsendplan) {
                                                this.dash_notactive++;
                                                item3.push({
                                                    level: timedata.level,
                                                    name: nametea,
                                                    date: date,
                                                    time_s: timedata.start,
                                                    time_e: timedata.stop,
                                                    style: locationData.name,
                                                    keystyle: timedata.style_subject,
                                                    subject: namesub,
                                                    keySubject: timedata.subject,
                                                    keyStudent: key,
                                                    keyTeacher: timedata.teacher,
                                                    studentId: studentData.studentId,
                                                    teacherId: teacherData.teacherId,
                                                    namestu: namestu,
                                                    sendplan: timedata.sendplan,
                                                    because: timedata.because,
                                                    Idsendplan: timedata.Idsendplan,
                                                    match_test: timedata.match_test,
                                                    hour: timedata.hour,
                                                    sendplanAll: sendplanData,
                                                    teacherAll: teacherData,
                                                    studentAll: studentData
                                                });
                                            }
                                        }
                                    })
                            }
                        }
                    }
                }
                this.dessertsNotcheck = item3;
                this.dessertsNotData = item2;
                this.dessertsNotapprove = item1;
                this.dessertsApprove = item;
            })
        },

        search_date_teacher_All() {
            console.log(
                this.panel,
                this.panel1,
                this.panel2,
                this.panel3
            );
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.dash_all = 0;
                this.dash_noall = 0;
                this.dash_active = 0;
                this.dash_notactive = 0;
                this.dessertsNotcheck = [];
                this.dessertsNotData = [];
                this.dessertsNotapprove = [];
                this.dessertsApprove = [];
                let item = [];
                let item1 = [];
                let item2 = [];
                let item3 = [];
                let now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`);
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (new Date(date).getTime() <= now.getTime()) {
                            const datedata = keydata[date];
                            for (const time in datedata) {
                                const timedata = datedata[time];
                                if (this.status == "teacher" && this.keyuser == timedata.teacher) {
                                    const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                    const getStudentPromise = db.ref(`user/${key}`).once("value");
                                    const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                    const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                    const getSendplanPromise = db.ref(`send_plan/${timedata.teacher}/${timedata.Idsendplan}`).once("value");
                                    Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise, getSendplanPromise])
                                        .then((snapshots) => {
                                            const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                            const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                            const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                            const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้
                                            const sendplanSnapshot = snapshots[4];

                                            const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const locationData = locationSnapshot.val();
                                            const studentData = studentSnapshot.val();
                                            const sendplanData = sendplanSnapshot.val();

                                            const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                            const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                            const namesub = subjectData.name;
                                            if (timedata.status === "พร้อมเรียน") {
                                                // this.arrayEvents.push(date);
                                                if (sendplanData) {
                                                    if (sendplanData.status_development === 'Approved') {
                                                        this.dash_all++;
                                                        item.push({
                                                            level: timedata.level,
                                                            name: nametea,
                                                            date: date,
                                                            time_s: timedata.start,
                                                            time_e: timedata.stop,
                                                            style: locationData.name,
                                                            keystyle: timedata.style_subject,
                                                            subject: namesub,
                                                            keySubject: timedata.subject,
                                                            keyStudent: key,
                                                            keyTeacher: timedata.teacher,
                                                            studentId: studentData.studentId,
                                                            teacherId: teacherData.teacherId,
                                                            namestu: namestu,
                                                            sendplan: timedata.sendplan,
                                                            because: timedata.because,
                                                            Idsendplan: timedata.Idsendplan,
                                                            match_test: timedata.match_test,
                                                            hour: timedata.hour,
                                                            sendplanAll: sendplanData,
                                                            teacherAll: teacherData,
                                                            studentAll: studentData
                                                        });
                                                    } else if (sendplanData.status_development == 'Pending'
                                                        || sendplanData.status_development == 'Rejected'
                                                        || sendplanData.status_development == undefined && sendplanData.homework) {
                                                        this.dash_noall++;
                                                        item1.push({
                                                            level: timedata.level,
                                                            name: nametea,
                                                            date: date,
                                                            time_s: timedata.start,
                                                            time_e: timedata.stop,
                                                            style: locationData.name,
                                                            keystyle: timedata.style_subject,
                                                            subject: namesub,
                                                            keySubject: timedata.subject,
                                                            keyStudent: key,
                                                            keyTeacher: timedata.teacher,
                                                            studentId: studentData.studentId,
                                                            teacherId: teacherData.teacherId,
                                                            namestu: namestu,
                                                            sendplan: timedata.sendplan,
                                                            because: timedata.because,
                                                            Idsendplan: timedata.Idsendplan,
                                                            match_test: timedata.match_test,
                                                            hour: timedata.hour,
                                                            sendplanAll: sendplanData,
                                                            teacherAll: teacherData,
                                                            studentAll: studentData
                                                        });
                                                    } else if (!sendplanData?.homework && timedata?.Idsendplan) {
                                                        this.dash_active++;
                                                        item2.push({
                                                            level: timedata.level,
                                                            name: nametea,
                                                            date: date,
                                                            time_s: timedata.start,
                                                            time_e: timedata.stop,
                                                            style: locationData.name,
                                                            keystyle: timedata.style_subject,
                                                            subject: namesub,
                                                            keySubject: timedata.subject,
                                                            keyStudent: key,
                                                            keyTeacher: timedata.teacher,
                                                            studentId: studentData.studentId,
                                                            teacherId: teacherData.teacherId,
                                                            namestu: namestu,
                                                            sendplan: timedata.sendplan,
                                                            because: timedata.because,
                                                            Idsendplan: timedata.Idsendplan,
                                                            match_test: timedata.match_test,
                                                            hour: timedata.hour,
                                                            sendplanAll: sendplanData,
                                                            teacherAll: teacherData,
                                                            studentAll: studentData
                                                        });
                                                    }
                                                }

                                                else if (!sendplanData?.Idsendplan) {
                                                    this.dash_notactive++;
                                                    item3.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                }
                                            }
                                        })
                                } else if (this.status == 'admin') {
                                    const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                    const getStudentPromise = db.ref(`user/${key}`).once("value");
                                    const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                    const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                    const getSendplanPromise = db.ref(`send_plan/${timedata.teacher}/${timedata.Idsendplan}`).once("value");
                                    Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise, getSendplanPromise])
                                        .then((snapshots) => {
                                            const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                            const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                            const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                            const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้
                                            const sendplanSnapshot = snapshots[4];

                                            const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                            const locationData = locationSnapshot.val();
                                            const studentData = studentSnapshot.val();
                                            const sendplanData = sendplanSnapshot.val();

                                            const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                            const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                            const namesub = subjectData.name;
                                            if (timedata.status === "พร้อมเรียน") {
                                                // this.arrayEvents.push(date);
                                                if (sendplanData) {
                                                    if (sendplanData.status_development === 'Approved') {
                                                        this.dash_all++;
                                                        item.push({
                                                            level: timedata.level,
                                                            name: nametea,
                                                            date: date,
                                                            time_s: timedata.start,
                                                            time_e: timedata.stop,
                                                            style: locationData.name,
                                                            keystyle: timedata.style_subject,
                                                            subject: namesub,
                                                            keySubject: timedata.subject,
                                                            keyStudent: key,
                                                            keyTeacher: timedata.teacher,
                                                            studentId: studentData.studentId,
                                                            teacherId: teacherData.teacherId,
                                                            namestu: namestu,
                                                            sendplan: timedata.sendplan,
                                                            because: timedata.because,
                                                            Idsendplan: timedata.Idsendplan,
                                                            match_test: timedata.match_test,
                                                            hour: timedata.hour,
                                                            sendplanAll: sendplanData,
                                                            teacherAll: teacherData,
                                                            studentAll: studentData
                                                        });
                                                    } else if (sendplanData.status_development == 'Pending'
                                                        || sendplanData.status_development == 'Rejected'
                                                        || sendplanData.status_development == undefined && sendplanData.homework) {
                                                        this.dash_noall++;
                                                        item1.push({
                                                            level: timedata.level,
                                                            name: nametea,
                                                            date: date,
                                                            time_s: timedata.start,
                                                            time_e: timedata.stop,
                                                            style: locationData.name,
                                                            keystyle: timedata.style_subject,
                                                            subject: namesub,
                                                            keySubject: timedata.subject,
                                                            keyStudent: key,
                                                            keyTeacher: timedata.teacher,
                                                            studentId: studentData.studentId,
                                                            teacherId: teacherData.teacherId,
                                                            namestu: namestu,
                                                            sendplan: timedata.sendplan,
                                                            because: timedata.because,
                                                            Idsendplan: timedata.Idsendplan,
                                                            match_test: timedata.match_test,
                                                            hour: timedata.hour,
                                                            sendplanAll: sendplanData,
                                                            teacherAll: teacherData,
                                                            studentAll: studentData
                                                        });
                                                    } else if (!sendplanData?.homework && timedata?.Idsendplan) {
                                                        this.dash_active++;
                                                        item2.push({
                                                            level: timedata.level,
                                                            name: nametea,
                                                            date: date,
                                                            time_s: timedata.start,
                                                            time_e: timedata.stop,
                                                            style: locationData.name,
                                                            keystyle: timedata.style_subject,
                                                            subject: namesub,
                                                            keySubject: timedata.subject,
                                                            keyStudent: key,
                                                            keyTeacher: timedata.teacher,
                                                            studentId: studentData.studentId,
                                                            teacherId: teacherData.teacherId,
                                                            namestu: namestu,
                                                            sendplan: timedata.sendplan,
                                                            because: timedata.because,
                                                            Idsendplan: timedata.Idsendplan,
                                                            match_test: timedata.match_test,
                                                            hour: timedata.hour,
                                                            sendplanAll: sendplanData,
                                                            teacherAll: teacherData,
                                                            studentAll: studentData
                                                        });
                                                    }
                                                }

                                                else if (!sendplanData?.Idsendplan) {
                                                    this.dash_notactive++;
                                                    item3.push({
                                                        level: timedata.level,
                                                        name: nametea,
                                                        date: date,
                                                        time_s: timedata.start,
                                                        time_e: timedata.stop,
                                                        style: locationData.name,
                                                        keystyle: timedata.style_subject,
                                                        subject: namesub,
                                                        keySubject: timedata.subject,
                                                        keyStudent: key,
                                                        keyTeacher: timedata.teacher,
                                                        studentId: studentData.studentId,
                                                        teacherId: teacherData.teacherId,
                                                        namestu: namestu,
                                                        sendplan: timedata.sendplan,
                                                        because: timedata.because,
                                                        Idsendplan: timedata.Idsendplan,
                                                        match_test: timedata.match_test,
                                                        hour: timedata.hour,
                                                        sendplanAll: sendplanData,
                                                        teacherAll: teacherData,
                                                        studentAll: studentData
                                                    });
                                                }
                                            }
                                        })
                                }
                            }
                        }
                    }
                }
                this.dessertsNotcheck = item3;
                this.dessertsNotData = item2;
                this.dessertsNotapprove = item1;
                this.dessertsApprove = item;
            })
        },

        check_excel() {
            if (this.isExportAll) {
                this.selectedHeaders = [
                    "รหัสครู",
                    "ชื่อจริงครู",
                    "นามสกุลครู",
                    "ชื่อเล่นครู",
                    "เบอร์โทรศัพท์ครู",

                    "รหัสนักเรียน",
                    "ชื่อจริงนักเรียน",
                    "นามสกุลนักเรียน",
                    "ชื่อเล่นนักเรียน",
                    "เบอร์โทรศัพท์นักเรียน",

                    "สถานะเช็คชื่อนักเรียน",
                    "สถานะเช็คชื่อครู",
                    "เวลาบันทึกเช็คชื่อ",
                    "เวลาบันทึกพัฒนาการนักเรียน",

                    "วันที่เริ่มสอน",
                    "เริ่มเรียน",
                    "เลิกเรียน",

                    "เรื่องที่เรียน",
                    "ระดับความเข้าใจ",
                    "พัฒนาการ",
                    "ปัญหาในการสอน",
                    "วิธีแก้",
                    "เพื่อพัฒนาน้อง",
                    "การบ้าน",
                    "สถานะพัฒนาการ",
                    "Comment",
                    "เรทค่าสอน"]
            } else { this.selectedHeaders = []; }
        },
        exportToExcel() {
            console.log(this.selectedHeaders);
            this.desserts = this.desserts.concat(
                this.dessertsNotcheck,
                this.dessertsNotData,
                this.dessertsNotapprove,
                this.dessertsApprove
            );
            let newdate = new Date().getFullYear() + ' ' + (parseInt(new Date().getMonth()) + 1) + ' ' + new Date().getDate();
            let headers = this.selectedHeaders;
            const data = [headers, ...this.desserts.map(item => {
                const row = [];
                if (this.isExportAll) {
                    if (this.selectedHeaders[0]) {
                        if (item.teacherId) {
                            row.push(item.teacherId);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[1]) {
                        if (item.teacherAll.firstName) {
                            row.push(item.teacherAll.firstName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[2]) {
                        if (item.teacherAll.lastName) {
                            row.push(item.teacherAll.lastName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[3]) {
                        if (item.teacherAll.nickname) {
                            row.push(item.teacherAll.nickname);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[4]) {
                        if (item.teacherAll.mobile) {
                            row.push(item.teacherAll.mobile);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[5]) {
                        if (item.studentId) {
                            row.push(item.studentId);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[6]) {
                        if (item.studentAll.firstName) {
                            row.push(item.studentAll.firstName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[7]) {
                        if (item.studentAll.lastName) {
                            row.push(item.studentAll.lastName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[8]) {
                        if (item.studentAll.nickname) {
                            row.push(item.studentAll.nickname);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[9]) {
                        if (item.studentAll.studentMobile) {
                            row.push(item.studentAll.studentMobile);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[10]) {
                        if (item.sendplanAll && item.sendplanAll.status_study_column) {
                            row.push(item.sendplanAll.status_study_column);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[11]) {
                        if (item.sendplanAll && item.sendplanAll.status_study_column_tea) {
                            row.push(item.sendplanAll.status_study_column_tea);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[12]) {
                        if (item.sendplanAll && item.sendplanAll.createAt_OP) {
                            row.push(item.sendplanAll.createAt_OP);
                        } else if (item.sendplanAll && item.sendplanAll.createAt) {
                            row.push(item.sendplanAll.createAt);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[13]) {
                        if (item.sendplanAll && item.sendplanAll.createAt_rate_OP) {
                            row.push(item.sendplanAll.createAt_rate_OP);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[14]) {
                        if (item.date) {
                            row.push(item.date);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[15]) {
                        if (item.time_s) {
                            row.push(item.time_s);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[16]) {
                        if (item.time_e) {
                            row.push(item.time_e);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[17]) {
                        if (item.sendplanAll && item.sendplanAll.learn) {
                            row.push(item.sendplanAll.learn);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[18]) {
                        if (item.sendplanAll && item.sendplanAll.understand) {
                            row.push(item.sendplanAll.understand);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[19]) {
                        if (item.sendplanAll && item.sendplanAll.development) {
                            row.push(item.sendplanAll.development);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[20]) {
                        if (item.sendplanAll && item.sendplanAll.problem) {
                            row.push(item.sendplanAll.problem);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[21]) {
                        if (item.sendplanAll && item.sendplanAll.method) {
                            row.push(item.sendplanAll.method);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[22]) {
                        if (item.sendplanAll && item.sendplanAll.to_development) {
                            row.push(item.sendplanAll.to_development);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[23]) {
                        if (item.sendplanAll && item.sendplanAll.homework) {
                            row.push(item.sendplanAll.homework);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[24]) {
                        if (item.sendplanAll && item.sendplanAll.status_development) {
                            row.push(item.sendplanAll.status_development);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[25]) {
                        if (item.sendplanAll && item.sendplanAll.comment) {
                            row.push(item.sendplanAll.comment);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[26]) {
                        if (item.sendplanAll && item.sendplanAll.rate) {
                            row.push(item.sendplanAll.rate);
                        } else {
                            row.push("");
                        }
                    }
                    //----------------------------------------------------
                } else {
                    if (this.selectedHeaders[0]) {
                        if (item.teacherId) {
                            row.push(item.teacherId);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[1]) {
                        if (item.teacherAll.firstName) {
                            row.push(item.teacherAll.firstName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[2]) {
                        if (item.teacherAll.lastName) {
                            row.push(item.teacherAll.lastName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[3]) {
                        if (item.teacherAll.nickname) {
                            row.push(item.teacherAll.nickname);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[4]) {
                        if (item.teacherAll.mobile) {
                            row.push(item.teacherAll.mobile);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[5]) {
                        if (item.studentId) {
                            row.push(item.studentId);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[6]) {
                        if (item.studentAll.firstName) {
                            row.push(item.studentAll.firstName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[7]) {
                        if (item.studentAll.lastName) {
                            row.push(item.studentAll.lastName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[8]) {
                        if (item.studentAll.nickname) {
                            row.push(item.studentAll.nickname);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[9]) {
                        if (item.studentAll.studentMobile) {
                            row.push(item.studentAll.studentMobile);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[10]) {
                        if (item.sendplanAll && item.sendplanAll.status_study_column) {
                            row.push(item.sendplanAll.status_study_column);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[11]) {
                        if (item.sendplanAll && item.sendplanAll.status_study_column_tea) {
                            row.push(item.sendplanAll.status_study_column_tea);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[12]) {
                        if (item.sendplanAll && item.sendplanAll.createAt_OP) {
                            row.push(item.sendplanAll.createAt_OP);
                        } else if (item.sendplanAll && item.sendplanAll.createAt) {
                            row.push(item.sendplanAll.createAt);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[13]) {
                        if (item.sendplanAll && item.sendplanAll.createAt_rate_OP) {
                            row.push(item.sendplanAll.createAt_rate_OP);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[14]) {
                        if (item.date) {
                            row.push(item.date);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[15]) {
                        if (item.time_s) {
                            row.push(item.time_s);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[16]) {
                        if (item.time_e) {
                            row.push(item.time_e);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[17]) {
                        if (item.sendplanAll && item.sendplanAll.learn) {
                            row.push(item.sendplanAll.learn);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[18]) {
                        if (item.sendplanAll && item.sendplanAll.understand) {
                            row.push(item.sendplanAll.understand);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[19]) {
                        if (item.sendplanAll && item.sendplanAll.development) {
                            row.push(item.sendplanAll.development);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[20]) {
                        if (item.sendplanAll && item.sendplanAll.problem) {
                            row.push(item.sendplanAll.problem);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[21]) {
                        if (item.sendplanAll && item.sendplanAll.method) {
                            row.push(item.sendplanAll.method);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[22]) {
                        if (item.sendplanAll && item.sendplanAll.to_development) {
                            row.push(item.sendplanAll.to_development);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[23]) {
                        if (item.sendplanAll && item.sendplanAll.homework) {
                            row.push(item.sendplanAll.homework);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[24]) {
                        if (item.sendplanAll && item.sendplanAll.status_development) {
                            row.push(item.sendplanAll.status_development);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[25]) {
                        if (item.sendplanAll && item.sendplanAll.comment) {
                            row.push(item.sendplanAll.comment);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[26]) {
                        if (item.sendplanAll && item.sendplanAll.rate) {
                            row.push(item.sendplanAll.rate);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                }
                // ... เพิ่มตามลำดับ
                return row;
            })];
            console.log(data);
            // สร้างเอกสาร Excel
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

            // แปลงข้อมูลให้เป็นรูปแบบไฟล์ Excel
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // สร้าง Blob และบันทึกไฟล์
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `${newdate} - UpdateSTU.xlsx`);
        },

    },
}
</script>
<style>
.date-picker-field {
    max-width: 300px;
    /* กำหนดความกว้างตามที่คุณต้องการ */
}

.v-data-table-header th {
    background-color: #D4C1B2;
    /* เปลี่ยนเป็นสีที่คุณต้องการ */
}

.background-light {
    background-color: rgb(233, 16, 16);
    /* หรือสีที่คุณต้องการ */
}
</style>
