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
                    type="submit" @click="dialog_excel = true" rounded>Export<span
                        class="mdi mdi-microsoft-excel text-h6"></span></v-btn>


            </div>
        </v-card>

        <!-- Detail teacher -->
        <v-expansion-panels v-model="panel" multiple class="mt-8">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(items, index) in dessertsByTeacher"
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
                            <tr v-for="item in items" :key="item.keyStudent">
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
                                <v-col cols="12" style="margin-top:-15px" v-if="check_time">
                                    <v-chip color="#29CC39" text-color="white">
                                        ส่งภายในเวลา
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" style="margin-top:-15px" v-if="!check_time">
                                    <v-chip color="#AD382F" text-color="white">
                                        ส่งล่าช้า
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
                                    <v-text-field label="สำหรับวันนี้น้องมีพัฒนาการที่เพิ่มขึ้น"
                                        v-model="edited.development" :rules="rules.text" required></v-text-field>
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
                                <v-col cols="12" sm="12" style="margin-top:-30px">
                                    <hr style="border: 1px solid #000; background-color: #000;">
                                    <p style="font-size: 16px; color:#000;">Operation ตรวจสอบ</p>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select v-model="edited.status_development" :items="items_development"
                                        :rules="[v => !!v || 'กรุณาลงสถานะ']" label="สถานะพัฒนาการ" required></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Comment/อื่นๆ" v-model="edited.comment" :rules="rules.text"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="เรทค่าจ้างครู" v-model="edited.rate" :rules="rules.name"
                                        required></v-text-field>
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
                            <v-checkbox class="m-0" v-model="isExportAll" label="ข้อมูลทั้งหมด" color="indigo"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="รหัสครู" :disabled="isExportAll"
                                value="รหัสครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="ชื่อจริงครู" :disabled="isExportAll"
                                value="ชื่อจริงครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="นามสกุลครู" :disabled="isExportAll"
                                value="นามสกุลครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="ชื่อเล่นครู" :disabled="isExportAll"
                                value="ชื่อเล่นครู"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="เบอร์โทรศัพท์" :disabled="isExportAll"
                                value="เบอร์โทรศัพท์"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="เพศ" :disabled="isExportAll"
                                value="เพศ"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="อาชีพปัจจุบัน" value="อาชีพปัจจุบัน"
                                :disabled="isExportAll"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="email" :disabled="isExportAll"
                                value="email"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="สัญญาจ้าง" :disabled="isExportAll"
                                value="สัญญาจ้าง"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="ประเภทการทำงาน" :disabled="isExportAll"
                                value="ประเภทการทำงาน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="วันที่เริ่มงาน" :disabled="isExportAll"
                                value="วันที่เริ่มงาน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="เรทค่าสอน" :disabled="isExportAll"
                                value="เรทค่าสอน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="สาขาที่สามารถสอนได้"
                                :disabled="isExportAll" value="สาขาที่สามารถสอนได้"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="มหาวิทยาลัย" :disabled="isExportAll"
                                value="มหาวิทยาลัย"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="คณะ" :disabled="isExportAll"
                                value="คณะ"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="สาขา" :disabled="isExportAll"
                                value="สาขา"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="วิชาที่สอนได้" :disabled="isExportAll"
                                value="วิชาที่สอนได้"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders" label="เวลาที่บันทึกข้อมูล"
                                :disabled="isExportAll" value="เวลาที่บันทึกข้อมูล"></v-checkbox>
                        </v-row>
                    </v-container>
                </v-card-text>
                <hr style="border: 2px solid #000; background-color: #000; margin-top: -30px;">
                <v-card-title style="margin-top: -20px;">
                    <v-btn class="text-white" @click="exportToExcel" color="green" :loading="isExport">ยืนยัน
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
        this.search_date_teacher();
        this.arrayEvent_search();
    },

    computed: {
        dessertsByTeacher() {
            // Use Array.reduce() to group items by teacher name
            const groupedByTeacher = this.desserts.reduce((acc, item) => {
                const teacherName = item.name;
                if (!acc[teacherName]) {
                    acc[teacherName] = [];
                }
                acc[teacherName].push(item);
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
            console.log(this.edited, this.summ_hour);
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
                } else if (parseInt(new Date(item.date).getTime().toString().substring(0, 5)) >= parseInt(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).getTime().toString().substring(0, 5))) {
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

                                            db.ref(`send_plan/${this.edited.keyTeacher}/${id}`).update({
                                                img: this.imageURL,
                                                img_1: this.imageURL_1,
                                                hour: this.summ_hour,
                                                status_study_column: this.edited.status_study_column,
                                                status_study_column_tea: this.edited.status_study_column_tea,
                                                createAt_OP: new Date(),
                                            }).then(() => {
                                                console.log('save send_plan');
                                            })

                                            let keystudent = this.edited;
                                            if (keystudent.style.includes("Flip")) {
                                                db.ref(`hour_match/${keystudent.keyStudent}`).once("value", (snapshot) => {
                                                    const childData = snapshot.val();
                                                    db.ref(`hour_match/${keystudent.keyStudent}`).update({
                                                        hour: childData.hour - keystudent.hour,
                                                    });
                                                })
                                            }
                                            if (keystudent.style.includes("Private")) {
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
            db.ref(`send_plan/${this.edited.keyTeacher}/${this.edited.Idsendplan}/`).update({
                learn: this.edited.learn,
                understand: this.edited.understand,
                development: this.edited.development,
                problem: this.edited.problem,
                method: this.edited.method,
                to_development: this.edited.to_development,
                homework: this.edited.homework,
                status_development: this.edited.status_development,
                comment: this.edited.comment,
                check_save: this.check_time,
                rate: this.edited.rate,
                link_url: this.edited.link_url
            }).then(() => {
                console.log('save send_plan');
                this.clear_dialog();
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
            console.log('ทำๆ');
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts = [];
                // this.arrayEvents = [];
                let item = [];
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                            const getStudentPromise = db.ref(`user/${key}`).once("value");
                            const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                            const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                            Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise])
                                .then((snapshots) => {
                                    const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                    const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                    const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                    const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้

                                    const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                    const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                    const locationData = locationSnapshot.val();
                                    const studentData = studentSnapshot.val();

                                    const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                    const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                    const namesub = subjectData.name;
                                    if (timedata.status === "พร้อมเรียน" && date === this.date) {
                                        item.push({
                                            level: timedata.level,
                                            name: nametea,
                                            date: date,
                                            time_s: timedata.start,
                                            time_e: timedata.stop,
                                            style: locationData.name,
                                            keystyle: timedata.style_subject,
                                            // class: timedata.class,
                                            subject: namesub,
                                            keySubject: timedata.subject,
                                            keyStudent: key,
                                            keyTeacher: timedata.teacher,
                                            studentId: studentData.studentId || "-",
                                            namestu: namestu,
                                            sendplan: timedata.sendplan,
                                            because: timedata.because,
                                            Idsendplan: timedata.Idsendplan,
                                            match_test: timedata.match_test,
                                            hour: timedata.hour
                                        });
                                        // this.arrayEvents.push(date);
                                    }
                                })
                        }
                    }
                }
                this.desserts = item;
                console.log(this.desserts);
            })
        },

        search_date_teacher_All() {
            console.log('ทำๆ');
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts = [];
                // this.arrayEvents = [];
                let item = [];
                let now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (new Date(date).getTime().toString().substring(0, 5) <= now.getTime().toString().substring(0, 5)) {
                            const datedata = keydata[date];
                            for (const time in datedata) {
                                const timedata = datedata[time];
                                const getTeacherPromise = db.ref(`user/${timedata.teacher}`).once("value");
                                const getStudentPromise = db.ref(`user/${key}`).once("value");
                                const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                const getLocationPromise = db.ref(`location/${timedata.style_subject}`).once("value");
                                Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise, getStudentPromise])
                                    .then((snapshots) => {
                                        const teacherSnapshot = snapshots[0]; // เปลี่ยนตรงนี้
                                        const subjectSnapshot = snapshots[1]; // เปลี่ยนตรงนี้
                                        const locationSnapshot = snapshots[2]; // เปลี่ยนตรงนี้
                                        const studentSnapshot = snapshots[3]; // เปลี่ยนตรงนี้

                                        const teacherData = teacherSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const subjectData = subjectSnapshot.val(); // ใช้ .val() ได้ตามปกติ
                                        const locationData = locationSnapshot.val();
                                        const studentData = studentSnapshot.val();

                                        const nametea = `${teacherData.teacherId}-ครู${teacherData.nickname} (${teacherData.firstName})`;
                                        const namestu = `${studentData.nickname} (${studentData.firstName})`;
                                        const namesub = subjectData.name;
                                        if (timedata.status === "พร้อมเรียน") {
                                            item.push({
                                                level: timedata.level,
                                                name: nametea,
                                                date: date,
                                                time_s: timedata.start,
                                                time_e: timedata.stop,
                                                style: locationData.name,
                                                keystyle: timedata.style_subject,
                                                // class: timedata.class,
                                                subject: namesub,
                                                keySubject: timedata.subject,
                                                keyStudent: key,
                                                keyTeacher: timedata.teacher,
                                                studentId: studentData.studentId || "-",
                                                namestu: namestu,
                                                sendplan: timedata.sendplan,
                                                because: timedata.because,
                                                Idsendplan: timedata.Idsendplan,
                                                match_test: timedata.match_test,
                                                hour: timedata.hour
                                            });
                                            // this.arrayEvents.push(date);
                                        }
                                    })
                            }
                        }
                    }
                }
                this.desserts = item;
                console.log(this.desserts);
            })
        },

        exportToExcel() {
            console.log(this.selectedHeaders);
            // หัวข้อเอกสาร Excel
            let newdate = new Date().getFullYear() + ' ' + (parseInt(new Date().getMonth()) + 1) + ' ' + new Date().getDate();
            let headers = [];
            if(this.isExportAll){
                headers = ["รหัสครู","ชื่อจริงครู","นามสกุลครู","ชื่อเล่นครู","เบอร์โทรศัพท์","เพศ","email","สัญญาจ้าง","ประเภทการทำงาน","วันที่เริ่มงาน",
                            "เรทค่าสอน","สาขาที่สามารถสอนได้","มหาวิทยาลัย","คณะ","สาขา","วิชาที่สอนได้","เวลาที่บันทึกข้อมูล"];
            }else{
                headers = this.selectedHeaders;
            }            
            const data = [headers, ...this.desserts.map(item => {
                const row = [];
                if (this.isExportAll) {
                    row.push(
                        item.level,
                        item.name,
                        item.date,
                        item.time_s,
                        item.time_e,
                        item.style,
                        item.keystyle,                        
                        item.subject,
                        item.keySubject,
                        item.keyStudent,
                        item.keyTeacher,
                        item.studentId,
                        item.namestu,
                        item.sendplan,
                        item.because,
                        item.Idsendplan,
                        item.match_test,
                        item.hour
                    );
                } else {
                    if (this.selectedHeaders[1]) row.push(item.name);
                    if (this.selectedHeaders[2]) row.push(item.namestu);
                    if (this.selectedHeaders[3]) row.push(item.date);
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
            saveAs(blob, `${newdate}-UpdateSTU.xlsx`);
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
</style>
