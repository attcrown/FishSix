<template>
    <div>
        <template>
            <div class="d-flex">
                <div>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5"
                            style="background: #ffffff;" height="244px" width="341px">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/cashcoin.png')" class="pt-10 ps-8">
                                </v-col>
                                <v-col cols="auto" class="pt-14 mt-16 me-5" style="font-size:20px;">
                                    <b>{{ sum_money_all }} ฿</b>
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7 mt-5">
                                    <p style="font-size: 24px; margin-top: -50px;">รวมเงินเดือนครู
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                </div>
                <div class="ms-10" style="margin-top:-10px">
                    <div style="background-color:#EBE4DE" class="rounded-xl elevation-16">
                        <div class="d-flex px-5 pt-5">
                            <v-autocomplete class="me-5" v-model="value_tea" :items="value_tea_all" item-text="name"
                                item-value="key" label="เลือกครู" @change="arrayEvent_search()"></v-autocomplete>
                            <v-select class="ms-3" v-model="class_see" :items="class_all" item-text="name" item-value="key"
                                label="ค้นหา Class"></v-select>
                        </div>
                        <v-card flat class="d-flex  rounded-xl px-5 pt-0" style="background-color:rgba(255, 255, 255, 0)">
                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="ค้นหาแบบวัน" prepend-icon="mdi-calendar" readonly
                                        v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" scrollable :max="date_now" :events="arrayEvents"
                                    event-color="green lighten-1">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary"
                                        @click="$refs.dialog.save(date), date_month = null, date_year = null">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>

                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="date_month" transition="scale-transition" offset-y max-width="290px"
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date_month" label="ค้นหาแบบเดือน" prepend-icon="mdi-calendar"
                                        readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date_month" type="month" no-title scrollable :max="date_now">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary"
                                        @click="$refs.menu.save(date_month), date = null, date_year = null">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-select v-model="date_year" :items="items_year" label="ค้นหาแบบปี" prepend-icon="mdi-calendar"
                                @change="date = null, date_month = null"></v-select>
                        </v-card>

                        <div class="d-flex justify-end pt-3 px-3">
                            <v-text-field label="ค้นหาแบบเจาะจง เช่นวิชา ,ชื่อเล่นน้อง ,ระดับชั้น"
                                v-model="search_object"></v-text-field>

                            <v-checkbox v-model="check_sheet" label="เตรียมชีทมาเอง" color="brown lighten-1"
                                hide-details></v-checkbox>

                            <v-btn elevation="10" color="#322E2B" class="mt-3 ms-2" style="color:white" type="submit"
                                :disabled="value_tea == null || (date_month == null && date == null && date_year == null)"
                                @click="search_data_money(), export_menu = true" rounded>
                                ค้นหา<span class="mdi mdi-magnify text-h6"></span>
                            </v-btn>

                            <v-btn elevation="10" color="#322E2B" class="ms-2 mt-3" style="color:white"
                                :disabled="!export_menu" type="submit" rounded @click="dialog_excel = true">Export<span
                                    class="mdi mdi-microsoft-excel text-h6"></span>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </template>


        <v-expansion-panels v-model="panel" multiple class="mt-8">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(teacherData, index) in mapping_data"
                :key="index">

                <v-expansion-panel-header style="font-size:20px;"><b>{{ teacherData.name }}</b></v-expansion-panel-header>

                <v-expansion-panel-content class="rounded-b-xl" v-for="(data_class, index) in teacherData.data_class"
                    :key="index">
                    
                    <div v-if="data_class.items != undefined">
                        <p class="ms-5" style="font-size:18px;">คลาสเรียนวันที่ {{ data_class.name.substring(0,10) }} เวลา {{ data_class.name.substring(11,16) }}น. ถึง {{ data_class.name.substring(17,22) }}น.</p>
                        <v-expansion-panel-content >
                            <table style="width: 100%;">
                                <thead style="background-color:#D4C1B2;">
                                    <tr>
                                        <!-- <th class="p-2">วันที่</th> -->
                                        <th class="p-2">วิชาที่สอน</th>
                                        <th class="p-2">ลูกค้าที่เรียน</th>
                                        <th class="p-2">ประเภท class</th>
                                        <th class="p-2">ระดับชั้น</th>
                                        <th class="p-2">เวลาเริ่มต้น</th>
                                        <th class="p-2">เวลาสิ้นสุด</th>
                                        <th class="p-2">ชั่วโมงสอน</th>
                                        <th class="p-2">รายได้</th>
                                        <th class="p-2 text-center">รายละเอียด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in data_class.items" :key="item.send_plan.key">
                                        <!-- <td class="p-2" style="font-size:14px;">{{ item.send_plan.date_learn }}</td> -->
                                        <td class="p-2">{{ item.send_plan.money.subject.name }}</td>
                                        <td class="p-2">{{ item.studentData.studentId }}
                                            {{ item.studentData.nickname }}
                                            ({{ item.studentData.firstName }})</td>
                                        <td class="p-2">{{ search_class_table(item.datematchData.select_class) }}</td>
                                        <td class="p-2">{{ item.send_plan.level }}</td>
                                        <td class="p-2">{{ item.datematchData.start }}</td>
                                        <td class="p-2">{{ item.datematchData.stop }}</td>
                                        <td class="p-2">{{ item.send_plan.hour }} Hr.</td>
                                        <td class="p-2">{{ item.send_plan.money.sum_money }}฿</td>
                                        <td class="p-2 text-center">
                                            <v-btn text icon elevation="5"
                                                @click="detail_send(item.send_plan, item.send_plan.hour, item.studentData)">
                                                <span class="mdi mdi-cash-register text-h5"></span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <v-row style="margin-bottom: -70px">
                                <v-col cols="12" class="d-flex justify-end">
                                    <p style="font-size:18px" class="mt-3"><b>เงินสุทธิ {{
                                        calculateTotalIncome(data_class.items) }}
                                            บาท</b></p>
                                </v-col>
                            </v-row>
                            <hr style="margin-top: 50px">
                        </v-expansion-panel-content>
                    </div>
                    

                </v-expansion-panel-content>
                <v-row>
                    <v-col cols="12" class="d-flex justify-end pe-10">
                        <p style="font-size:20px; color:rgb(3, 153, 3);" class="mt-3"><b>รวมทั้งหมด {{
                            calculateTotalIncomeAll(teacherData.data_class) }} บาท</b></p>
                    </v-col>
                </v-row>
            </v-expansion-panel>
        </v-expansion-panels>


        <!-- <v-expansion-panels v-model="panel" multiple class="mt-8">
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="(teacherData, index) in groupedTeachers"
                :key="index">               

                <v-expansion-panel-header style="font-size:20px;"><b>{{ teacherData[0].name
                }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">วันที่</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">ลูกค้าที่เรียน</th>
                                <th class="p-2">ประเภท class</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ชั่วโมงสอน</th>
                                <th class="p-2">รายได้</th>
                                <th class="p-2 text-center">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in teacherData" :key="item.send_plan.key">
                                <td class="p-2">{{ item.send_plan.date_learn }}</td>
                                <td class="p-2">{{ item.send_plan.money.subject.name }}</td>
                                <td class="p-2">{{ item.studentData.studentId }}
                                    {{ item.studentData.nickname }}
                                    ({{ item.studentData.firstName }})</td>
                                <td class="p-2">{{ search_class_table(item.datematchData.select_class) }}</td>
                                <td class="p-2">{{ item.send_plan.level }}</td>
                                <td class="p-2">{{ item.datematchData.start }}</td>
                                <td class="p-2">{{ item.datematchData.stop }}</td>
                                <td class="p-2">{{ item.send_plan.hour }} Hr.</td>
                                <td class="p-2">{{ item.send_plan.money.sum_money }}฿</td>
                                <td class="p-2 text-center">
                                    <v-btn text icon elevation="5"
                                        @click="detail_send(item.send_plan, item.send_plan.hour, item.studentData)">
                                        <span class="mdi mdi-cash-register text-h5"></span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <p style="font-size:20px" class="mt-3"><b>เงินเดือนสุทธิ {{ calculateTotalIncome(teacherData) }}
                                    บาท</b></p>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels> -->

        <v-dialog v-model="dialog" max-width="500">
            <v-card class="rounded-xl p-3">
                <v-card-title style="font-size:16px">
                    <b>รายละเอียด</b>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="#37474F" @click="dialog = false">
                        <v-icon dark class="text-h5">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row v-if="detailData">
                        <v-col cols="12" style="margin-top: 10px">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">ลูกค้าที่เรียน {{
                                detailData_stu.studentId }} {{ detailData_stu.nickname }} ({{ detailData_stu.firstName
    }})</v-subheader>
                        </v-col>
                        <v-col cols="7" style="margin-top: 10px">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">{{ detailData.money.subject.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" v-if="detailData.money.subject">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.subject.bath + ' บาท'"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">{{ detailData.money.level.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px" v-if="detailData.money.level">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.level.bath + ' บาท'"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">{{ detailData.money.location.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.location.bath + ' บาท'"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px" v-if="detailData.status_check_sheet">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">{{ detailData.status_check_sheet.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px" v-if="detailData.status_check_sheet">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.status_check_sheet.bath + ' บาท'"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px" v-if="detailData.money.optional">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">{{ detailData.money.optional.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px" v-if="detailData.money.optional">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.optional.bath + ' บาท'"></v-text-field>
                        </v-col>

                        <v-col cols="7"
                            v-if="detailData.money.location.name.substring(0, 4) == 'Flip' && !detailData.match_vip"
                            style="margin-top:-20px">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">{{ detailData.money.typeflip.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5"
                            v-if="detailData.money.location.name.substring(0, 4) == 'Flip' && !detailData.match_vip"
                            style="margin-top:-30px">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.typeflip.bath + ' บาท'"></v-text-field>
                        </v-col>

                        <v-col cols="7"
                            v-if="detailData.money.location.name.substring(0, 4) != 'Flip' || detailData.match_vip"
                            style="margin-top:-20px">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">{{ detailData.money.typeprivate.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5"
                            v-if="detailData.money.location.name.substring(0, 4) != 'Flip' || detailData.match_vip"
                            style="margin-top:-30px">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.typeprivate.bath + ' บาท'"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">ชั่วโมงสอน</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px">
                            <v-text-field readonly label="ค่าสอน" :value="detailHour + ' Hr.'"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px" v-if="detailData.money.sum_seqNo == true">
                            <v-subheader style="font-size:16px; color:rgb(3, 3, 3)">กรณีสอนพร้อมกัน</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px" v-if="detailData.money.sum_seqNo == true">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.send_rate_special.bath + ' บาท'"></v-text-field>
                        </v-col>
                        <v-col cols="7" style="margin-top:-20px"
                            v-if="detailData.money.sum_send_rate_name != 0 || detailData.money.sum_send_rate_save != 0 || detailData.money.sum_send_rate_stu != 0 || detailData.money.sum_send_percent != 0">
                            <v-subheader style="font-size:16px; color:#FFA726;">รายได้รวมทั้งหมด</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px"
                            v-if="detailData.money.sum_send_rate_name != 0 || detailData.money.sum_send_rate_save != 0 || detailData.money.sum_send_rate_stu != 0 || detailData.money.sum_send_percent != 0">
                            <v-text-field readonly label="ค่าสอน" :value="detailData.money.sum_send_rate_name
                                + detailData.money.sum_money
                                + detailData.money.sum_send_rate_save
                                + detailData.money.sum_send_rate_stu
                                + detailData.money.sum_send_percent
                                + ' บาท'"></v-text-field>
                        </v-col>

                        <v-col cols="7" style="margin-top:-20px"
                            v-if="detailData.money.send_rate_name && detailData.money.send_rate_name.bath != 0">
                            <v-subheader style="font-size:16px; color:red;">{{ detailData.money.send_rate_name.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px"
                            v-if="detailData.money.send_rate_name && detailData.money.send_rate_name.bath != 0">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.send_rate_name.bath + '% ' + '(-' + detailData.money.sum_send_rate_name + ' บาท)'"
                                prefix="-"></v-text-field> <!----sum_send_rate_name(detailData.money) + ---->
                        </v-col>


                        <v-col cols="7" style="margin-top:-20px"
                            v-if="detailData.money.send_rate_stu && detailData.money.send_rate_stu.bath != 0">
                            <v-subheader style="font-size:16px; color:red;">{{ detailData.money.send_rate_stu.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px"
                            v-if="detailData.money.send_rate_stu && detailData.money.send_rate_stu.bath != 0">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.send_rate_stu.bath + '% ' + '(-' + detailData.money.sum_send_rate_stu + ' บาท)'"
                                prefix="-"></v-text-field> <!----sum_send_rate_save(detailData.money) + ---->
                        </v-col>

                        <v-col cols="7" style="margin-top:-20px"
                            v-if="detailData.money.send_rate_save && detailData.money.send_rate_save.bath != 0">
                            <v-subheader style="font-size:16px; color:red;">{{ detailData.money.send_rate_save.name
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px"
                            v-if="detailData.money.sum_send_rate_save && detailData.money.sum_send_rate_save.bath != 0">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.send_rate_save.bath + '% ' + '(-' + detailData.money.sum_send_rate_save + ' บาท)'"
                                prefix="-"></v-text-field> <!----sum_send_rate_save(detailData.money) + ---->
                        </v-col>

                        <v-col cols="7" style="margin-top:-20px"
                            v-if="detailData.money.sum_send_percent">
                            <v-subheader style="font-size:16px; color:red;">หัก 3%</v-subheader>
                        </v-col>
                        <v-col cols="5" style="margin-top:-30px"
                            v-if="detailData.money.sum_send_percent">
                            <v-text-field readonly label="ค่าสอน"
                                :value="detailData.money.sum_send_percent + ' บาท'"
                                prefix="-"></v-text-field> <!----sum_send_rate_save(detailData.money) + ---->
                        </v-col>

                        <v-col cols="12" style="margin-top:-30px">
                            <v-text-field readonly label="รายได้สุทธิ"
                                :value="detailData.money.sum_money + ' บาท'"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <!-- <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Close
                    </v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog_excel" max-width="600px">
            <v-card class="p-4 rounded-l-xl">
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

                            <v-checkbox class="m-0" v-model="selectedHeaders[10]" label="วันที่สอน" :disabled="isExportAll"
                                value="วันที่สอน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[11]" label="สถานที่สอน" :disabled="isExportAll"
                                value="สถานที่สอน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[12]" label="รายได้ต่อวิชา"
                                :disabled="isExportAll" value="รายได้ต่อวิชา"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[13]" label="รายได้ต่อระดับชั้น"
                                :disabled="isExportAll" value="รายได้ต่อระดับชั้น"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[14]" label="รายได้ต่อประเภท Class"
                                :disabled="isExportAll" value="รายได้ต่อประเภท Class"></v-checkbox>

                            <v-checkbox class="m-0" v-model="selectedHeaders[15]" label="รายได้เอกสารใช้สอน"
                                :disabled="isExportAll" value="รายได้เอกสารใช้สอน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[16]" label="Type & tier"
                                :disabled="isExportAll" value="Type & tier"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[17]" label="ชั่วโมงที่สอนไป"
                                :disabled="isExportAll" value="ชั่วโมงที่สอนไป"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[18]" label="กรณีสอนพร้อมกัน"
                                :disabled="isExportAll" value="กรณีสอนพร้อมกัน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[19]" label="รายได้ทั้งหมดไม่รวมหัก"
                                :disabled="isExportAll" value="รายได้ทั้งหมดไม่รวมหัก"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[20]" label="หักรายได้เช็คชื่อล่าช้า"
                                :disabled="isExportAll" value="หักรายได้เช็คชื่อล่าช้า"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[21]" label="หักรายได้ส่งพัฒนาการช้า"
                                :disabled="isExportAll" value="หักรายได้ส่งพัฒนาการช้า"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[22]" label="หักรายกรณีน้องลากระทันหัน"
                                :disabled="isExportAll" value="หักรายกรณีน้องลากระทันหัน"></v-checkbox>
                            <v-checkbox class="m-0" v-model="selectedHeaders[23]" label="รายได้สุทธิ์"
                                :disabled="isExportAll" value="รายได้สุทธิ์"></v-checkbox>
                        </v-row>
                    </v-container>
                </v-card-text>
                <hr style="border: 2px solid #000; background-color: #000; margin-top: -30px;">
                <v-card-title style="margin-top: -20px;">
                    <v-btn class="text-white" @click="exportToExcel()" color="green">ยืนยัน
                        <v-icon color="white" small> mdi-content-save</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export default {
    data: () => ({
        check_sheet: false,
        search_object: "",
        export_menu: false,
        isExportAll: false,
        selectedHeaders: [],
        dialog_excel: false,

        sum_money_all: 0,
        arrayEvents: [],

        detailHour: null,
        detailData: null,
        detailData_stu: null,
        dialog: false,
        panel: [],
        date_now: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: null,
        modal: false,
        value_tea: null,
        value_tea_all: [],

        date_month: null,
        date_year: null,
        menu: false,
        modal1: false,
        items_year: [],

        data_all: [],
        data_class_all: [],
        mapping_data: [],

        detailData_tea: null,
        class_all: [],
        class_see: '00000',

        time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
    }),
    mounted() {
        this.search_tea();
        this.year_gen();
        this.search_class();
    },
    computed: {
        groupedTeachers() {
            return this.data_all.reduce((acc, item) => {
                // console.log(acc ,item);
                const existingGroup = acc.find(group => group[0].name === item.name);
                if (existingGroup) {
                    existingGroup.push(item);
                    // เรียงข้อมูลในกลุ่มตามวันที่
                    existingGroup.sort((a, b) => new Date(a.send_plan.date_learn) - new Date(b.send_plan.date_learn));
                    // console.log(existingGroup);
                } else {
                    acc.push([item]);
                    // console.log(acc);
                }
                // console.log(acc);
                return acc;
            }, []);
        },
    },
    methods: {
        mapping(item, class_tea) {
            this.mapping_data = [];
            for (const id in item) {
                // console.log('send>>>',item[id].name)
                for (const key in class_tea) {
                    // console.log('class>>>',class_tea[key].name);
                    if (item[id].name === class_tea[key].name) {
                        console.log('true name');
                        for (const detail in class_tea[key].data_class) {
                            console.log('data_class', class_tea[key].data_class[detail]);
                            if (item[id].send_plan.date_learn === class_tea[key].data_class[detail].name.substring(0, 10)) {
                                let time = this.validateTime(
                                    class_tea[key].data_class[detail].name.substring(11, 16),
                                    class_tea[key].data_class[detail].name.substring(17, 22)
                                )
                                console.log('check date', time, item[id].send_plan);
                                console.log(time.includes(item[id].send_plan.time_learn_start))
                                if (time.includes(item[id].send_plan.time_learn_start)) {
                                    if (class_tea[key].data_class[detail].items == undefined) {
                                        class_tea[key].data_class[detail].items = [];
                                    }
                                    class_tea[key].data_class[detail].items.push(item[id]);
                                }
                            }
                        }

                    }
                }
            }
            // เรียงข้อมูลใน plainClassTea โดยแยกแต่ละชุดข้อมูลออกมาเรียงแยกกัน
            for (const key in class_tea) {
                class_tea[key].data_class.sort((a, b) => {
                    const dateA = new Date(a.name.substring(0, 10));
                    const dateB = new Date(b.name.substring(0, 10));
                    return dateA - dateB;
                });
            }
            console.log(class_tea);
            this.mapping_data = class_tea;
        },
        validateTime(start, stop) {
            let sum = [];
            let check_start = 0;
            for (const id in this.time_full) {
                if (stop == this.time_full[id]) {
                    sum.push(this.time_full[id]);
                    return sum;
                } else if (start == this.time_full[id] || check_start != 0) {
                    sum.push(this.time_full[id]);
                    check_start++;
                }
            }
            return sum;
        },

        arrayEvent_search() {
            const db = this.$fireModule.database();
            if (this.value_tea != '00000') {
                db.ref(`date_match/`).on("value", (snapshot) => {
                    this.arrayEvents = [];
                    const childData = snapshot.val();
                    for (const key in childData) {
                        const date = childData[key]
                        for (const day in date) {
                            const time = date[day];
                            for (const data_all in time) {
                                if (time[data_all].status == "พร้อมเรียน" && time[data_all].Idsendplan != undefined && time[data_all].teacher == this.value_tea) {
                                    this.arrayEvents.push(day);
                                    // console.log(this.arrayEvents);
                                }
                            }
                        }
                    }

                })
            } else {
                db.ref(`date_match/`).on("value", (snapshot) => {
                    this.arrayEvents = [];
                    const childData = snapshot.val();
                    for (const key in childData) {
                        const date = childData[key]
                        for (const day in date) {
                            const time = date[day];
                            for (const data_all in time) {
                                if (time[data_all].status == "พร้อมเรียน" && time[data_all].Idsendplan != undefined) {
                                    this.arrayEvents.push(day);
                                    // console.log(this.arrayEvents);
                                }
                            }
                        }
                    }

                })
            }

        },
        calculateTotalIncome(teacherData) {
            let totalIncome = 0;
            for (const item of teacherData) {
                totalIncome += item.send_plan.money.sum_money;
            }
            return totalIncome;
        },
        calculateTotalIncomeAll(items) {
            let totalIncome = 0;
            console.log(items);
            for (const id in items) {

                for (const iditem in items[id].items) {
                    console.log(items[id].items[iditem].send_plan.money.sum_money);
                    totalIncome += items[id].items[iditem].send_plan.money.sum_money;
                }
            }
            return totalIncome;
        },
        year_gen() {
            let year = 2021;
            let new_year = parseInt(new Date().toISOString().substr(0, 4));
            let item = [];
            while (year < (new_year + 10)) {
                item.push(year.toString());
                year++;
            }
            this.items_year = item;
        },
        search_tea() {
            const db = this.$fireModule.database();
            db.ref(`user/`).once("value", (snapshot) => {
                let item = [{ key: '00000', name: 'ทั้งหมด' }];
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].status == 'teacher') {
                        item.push({ key: key, name: childData[key].teacherId + ' ' + childData[key].nickname + ' ' + childData[key].firstName })
                    }
                }
                console.log(item);
                this.value_tea_all = item;
            })
        },
        search_class() {
            const db = this.$fireModule.database();
            db.ref(`LimitedClass_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name })
                }
                item.push({ key: '00000', name: 'ทั้งหมด' });
                console.log(item);
                this.class_all = item;
            })
        },
        search_class_table(id) {
            for (const key in this.class_all) {
                if (this.class_all[key].key == id) {
                    return this.class_all[key].name;
                }
            }
        },

        search_data_money() {
            let tea = "";
            let day_search_start = null;
            let day_search_end = null;
            this.sum_money_all = 0;
            if (this.value_tea == '00000') {
                tea = "";
            } else {
                tea = this.value_tea;
            }
            if (this.date) {
                day_search_start = new Date(`${this.date}`).getTime();
                day_search_end = new Date(`${this.date}`).getTime();
            } else if (this.date_month) {
                let month = parseInt(this.date_month.substring(5, 7)) + 1;
                day_search_start = new Date(this.date_month).getTime();
                if (month > 12) {
                    day_search_end = new Date(parseInt(this.date_month.substring(0, 4)) + 1 + "-" + 1).getTime();
                } else {
                    day_search_end = new Date(this.date_month.substring(0, 5) + month).getTime();
                }
            } else if (this.date_year) {
                let year = parseInt(this.date_year) + 1;
                day_search_start = new Date(parseInt(this.date_year) - 1 + '-12').getTime();
                day_search_end = new Date(year + '-1').getTime();
            } else {
                alert('Error');
            }
            const db = this.$fireModule.database();
            if (tea == "") {
                db.ref(`send_plan/${tea}`).once("value", async (snapshot) => {
                    let item = [];
                    let class_tea = [];
                    const childData = snapshot.val();

                    // รอให้ทุก Promise เสร็จสมบูรณ์ก่อนที่จะดำเนินการต่อ
                    await Promise.all(
                        Object.keys(childData).map(async (key) => {
                            const data_all = childData[key];
                            for (const data in data_all) {
                                if (
                                    data_all[data].status_development == "Approved" &&
                                    new Date(data_all[data].date_learn).getTime() >= day_search_start &&
                                    new Date(data_all[data].date_learn).getTime() <= day_search_end
                                ) {
                                    const getDateTeacherPromise = db.ref(`date_teacher/${key}/${data_all[data].date_learn}`).once("value");
                                    const getTeacherPromise = db.ref(`user/${key}`).once("value");
                                    const getStudentPromise = db.ref(`user/${data_all[data].keystudent}`).once("value");
                                    const getDateMatchPromise = db.ref(`date_match/${data_all[data].keystudent}/${data_all[data].date_learn}/${data_all[data].time_learn}`).once("value");

                                    const [teacherSnapshot, studentSnapshot, dateMatchSnapshot, dateTeacherSnapshot,] = await Promise.all(
                                        [
                                            getTeacherPromise,
                                            getStudentPromise,
                                            getDateMatchPromise,
                                            getDateTeacherPromise,
                                        ]
                                    );
                                    const teacherData = teacherSnapshot.val();
                                    const studentData = studentSnapshot.val();
                                    const datematchData = dateMatchSnapshot.val();
                                    const dateteacherData = dateTeacherSnapshot.val();

                                    for (const key in dateteacherData) {
                                        const name = `${data_all[data].date_learn} ${key}`;
                                        const nameTea = `${teacherData.teacherId} ${teacherData.nickname} ${teacherData.firstName}`;
                                        const item = dateteacherData[key];
                                        const isNameUnique = !class_tea.some((existingItem) => existingItem.name === nameTea);
                                        if (isNameUnique) {
                                            class_tea.push({
                                                name: nameTea,
                                                data_class: [{ name, item }],
                                            });
                                        } else {
                                            for (const id in class_tea) {
                                                if (class_tea[id].name == nameTea) {
                                                    for (const idclass in class_tea[id].data_class) {
                                                        const existingClass = class_tea[id].data_class.some((existingClass) => existingClass.name === name);
                                                        if (!existingClass) {
                                                            class_tea[id].data_class.push({ name, item });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if (this.class_see == datematchData.select_class && this.search_object == ""
                                        && this.check_sheet && data_all[data].link_sheet != undefined) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all[data],
                                            IdKey: data,
                                        })

                                        this.sum_money_all += data_all[data].money.sum_money;
                                    } else if (this.class_see == '00000' && this.search_object == ""
                                        && this.check_sheet && data_all[data].link_sheet != undefined) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all[data],
                                            IdKey: data,
                                            dateteacherData: dateteacherData,
                                        })

                                        this.sum_money_all += data_all[data].money.sum_money;

                                    } else if (this.class_see == datematchData.select_class && this.search_object == ""
                                        && !this.check_sheet) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all[data],
                                            IdKey: data,
                                            dateteacherData: dateteacherData,
                                        })

                                        this.sum_money_all += data_all[data].money.sum_money;
                                    } else if (this.class_see == '00000' && this.search_object == ""
                                        && !this.check_sheet) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all[data],
                                            IdKey: data,
                                            dateteacherData: dateteacherData,
                                        })
                                        this.sum_money_all += data_all[data].money.sum_money;

                                    } else if (this.class_see == datematchData.select_class && this.search_object != ""
                                        && this.check_sheet && data_all[data].link_sheet != undefined) {
                                        const contains = data_all[data].money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all[data].money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all[data],
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all[data].money.sum_money;
                                        }

                                    } else if (this.class_see == '00000' && this.search_object != ""
                                        && this.check_sheet && data_all[data].link_sheet != undefined) {
                                        const contains = data_all[data].money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all[data].money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all[data],
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all[data].money.sum_money;
                                        }

                                    } else if (this.class_see == datematchData.select_class && this.search_object != ""
                                        && !this.check_sheet) {
                                        const contains = data_all[data].money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all[data].money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all[data],
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all[data].money.sum_money;
                                        }

                                    } else if (this.class_see == '00000' && this.search_object != ""
                                        && !this.check_sheet) {
                                        const contains = data_all[data].money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all[data].money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all[data],
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all[data].money.sum_money;
                                        }
                                    }
                                }
                            }
                        })
                    );
                    this.data_all = item;
                    this.data_class_all = class_tea;
                    this.mapping(this.data_all, this.data_class_all);
                });                
            } else {
                db.ref(`send_plan/${tea}`).once("value", async (snapshot) => {
                    let item = [];
                    let class_tea = [];
                    const childData = snapshot.val();

                    // รอให้ทุก Promise เสร็จสมบูรณ์ก่อนที่จะดำเนินการต่อ
                    await Promise.all(
                        Object.keys(childData).map(async (data) => {
                            const data_all = childData[data];
                            console.log(data_all);
                            // for (const data in data_all) {                                
                                if (
                                    data_all.status_development == "Approved" &&
                                    new Date(data_all.date_learn).getTime() >= day_search_start &&
                                    new Date(data_all.date_learn).getTime() <= day_search_end
                                ) {
                                    const getDateTeacherPromise = db.ref(`date_teacher/${tea}/${data_all.date_learn}`).once("value");
                                    const getTeacherPromise = db.ref(`user/${tea}`).once("value");
                                    const getStudentPromise = db.ref(`user/${data_all.keystudent}`).once("value");
                                    const getDateMatchPromise = db.ref(`date_match/${data_all.keystudent}/${data_all.date_learn}/${data_all.time_learn}`).once("value");

                                    const [teacherSnapshot, studentSnapshot, dateMatchSnapshot, dateTeacherSnapshot,] = await Promise.all(
                                        [
                                            getTeacherPromise,
                                            getStudentPromise,
                                            getDateMatchPromise,
                                            getDateTeacherPromise,
                                        ]
                                    );
                                    const teacherData = teacherSnapshot.val();
                                    const studentData = studentSnapshot.val();
                                    const datematchData = dateMatchSnapshot.val();
                                    const dateteacherData = dateTeacherSnapshot.val();
                                    
                                    for (const key in dateteacherData) {
                                        const name = `${data_all.date_learn} ${key}`;
                                        const nameTea = `${teacherData.teacherId} ${teacherData.nickname} ${teacherData.firstName}`;
                                        const item = dateteacherData[key];
                                        const isNameUnique = !class_tea.some((existingItem) => existingItem.name === nameTea);
                                        if (isNameUnique) {
                                            class_tea.push({
                                                name: nameTea,
                                                data_class: [{ name, item }],
                                            });
                                        } else {
                                            for (const id in class_tea) {
                                                if (class_tea[id].name == nameTea) {
                                                    for (const idclass in class_tea[id].data_class) {
                                                        const existingClass = class_tea[id].data_class.some((existingClass) => existingClass.name === name);
                                                        if (!existingClass) {
                                                            class_tea[id].data_class.push({ name, item });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if (this.class_see == datematchData.select_class && this.search_object == ""
                                        && this.check_sheet && data_all.link_sheet != undefined) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all,
                                            IdKey: data,
                                        })

                                        this.sum_money_all += data_all.money.sum_money;
                                    } else if (this.class_see == '00000' && this.search_object == ""
                                        && this.check_sheet && data_all.link_sheet != undefined) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all,
                                            IdKey: data,
                                            dateteacherData: dateteacherData,
                                        })

                                        this.sum_money_all += data_all.money.sum_money;

                                    } else if (this.class_see == datematchData.select_class && this.search_object == ""
                                        && !this.check_sheet) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all,
                                            IdKey: data,
                                            dateteacherData: dateteacherData,
                                        })

                                        this.sum_money_all += data_all.money.sum_money;
                                    } else if (this.class_see == '00000' && this.search_object == ""
                                        && !this.check_sheet) {
                                        item.push({
                                            name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                            teacherData: teacherData,
                                            studentData: studentData,
                                            datematchData: datematchData,
                                            send_plan: data_all,
                                            IdKey: data,
                                            dateteacherData: dateteacherData,
                                        })
                                        this.sum_money_all += data_all.money.sum_money;

                                    } else if (this.class_see == datematchData.select_class && this.search_object != ""
                                        && this.check_sheet && data_all.link_sheet != undefined) {
                                        const contains = data_all.money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all.money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all,
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all.money.sum_money;
                                        }

                                    } else if (this.class_see == '00000' && this.search_object != ""
                                        && this.check_sheet && data_all.link_sheet != undefined) {
                                        const contains = data_all.money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all.money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all,
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all.money.sum_money;
                                        }

                                    } else if (this.class_see == datematchData.select_class && this.search_object != ""
                                        && !this.check_sheet) {
                                        const contains = data_all.money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all.money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all,
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all.money.sum_money;
                                        }

                                    } else if (this.class_see == '00000' && this.search_object != ""
                                        && !this.check_sheet) {
                                        const contains = data_all.money.subject.name.includes(this.search_object);
                                        const contains1 = studentData.nickname.includes(this.search_object);
                                        const contains2 = datematchData.level.includes(this.search_object);
                                        const contains3 = data_all.money.location.name.includes(this.search_object);
                                        if (contains || contains1 || contains2 || contains3) {
                                            item.push({
                                                name: teacherData.teacherId + " " + teacherData.nickname + " " + teacherData.firstName,
                                                teacherData: teacherData,
                                                studentData: studentData,
                                                datematchData: datematchData,
                                                send_plan: data_all,
                                                IdKey: data,
                                                dateteacherData: dateteacherData,
                                            })
                                            this.sum_money_all += data_all.money.sum_money;
                                        }
                                    }

                                }
                            // }
                        })
                    );
                    this.data_all = item;
                    this.data_class_all = class_tea;
                    this.mapping(this.data_all, this.data_class_all);
                });
            }

        },
        detail_send(item, hour, itemstu) {
            this.detailData = item;
            this.detailData_stu = itemstu;
            this.detailHour = hour;
            // let min = hour.toString().split(".");
            // let min_s = null;
            // if (min.length > 1) {
            //     min_s = (parseFloat("0." + min[1]) * 60 / 100);
            //     this.detailHour = parseFloat(min[0]) + parseFloat(min_s);
            // } else {
            //     this.detailHour = hour;
            // }
            // console.log(min, min_s);
            console.log(this.detailData, this.detailHour, this.detailData_stu);
            this.dialog = true;
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

                    "วันที่สอน",
                    "สถานที่สอน",
                    "รายได้ต่อวิชา",
                    "รายได้ต่อระดับชั้น",
                    "รายได้ต่อประเภท Class",
                    "รายได้เอกสารใช้สอน",
                    "Type & tier",
                    "ชั่วโมงที่สอนไป",
                    "กรณีสอนพร้อมกัน",
                    "รายได้ทั้งหมดไม่รวมหัก",
                    "หักรายได้เช็คชื่อล่าช้า",
                    "หักรายได้ส่งพัฒนาการช้า",
                    "หักรายกรณีน้องลากระทันหัน",
                    "รายได้สุทธิ์",
                ]
            } else { this.selectedHeaders = []; }
        },
        exportToExcel() {
            console.log(this.selectedHeaders);
            this.desserts = this.data_all;
            let newdate = new Date().getFullYear() + ' ' + (parseInt(new Date().getMonth()) + 1) + ' ' + new Date().getDate();
            let headers = this.selectedHeaders;
            const data = [headers, ...this.desserts.map(item => {
                const row = [];
                if (this.isExportAll) {
                    if (this.selectedHeaders[0]) {
                        if (item.teacherData.teacherId) {
                            row.push(item.teacherData.teacherId);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[1]) {
                        if (item.teacherData.firstName) {
                            row.push(item.teacherData.firstName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[2]) {
                        if (item.teacherData.lastName) {
                            row.push(item.teacherData.lastName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[3]) {
                        if (item.teacherData.nickname) {
                            row.push(item.teacherData.nickname);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[4]) {
                        if (item.teacherData.mobile) {
                            row.push(item.teacherData.mobile);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[5]) {
                        if (item.studentData.studentId) {
                            row.push(item.studentData.studentId);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[6]) {
                        if (item.studentData.firstName) {
                            row.push(item.studentData.firstName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[7]) {
                        if (item.studentData.lastName) {
                            row.push(item.studentData.lastName);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[8]) {
                        if (item.studentData.nickname) {
                            row.push(item.studentData.nickname);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[9]) {
                        if (item.studentData.studentMobile) {
                            row.push(item.studentData.studentMobile);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[10]) {
                        if (item.send_plan && item.send_plan.date_learn) {
                            row.push(item.send_plan.date_learn);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[11]) {
                        if (item.send_plan.money && item.send_plan.money.location.name) {
                            row.push(item.send_plan.money.location.name);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[12]) {
                        if (item.send_plan && item.send_plan.money.subject.bath) {
                            row.push(item.send_plan.money.subject.bath);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[13]) {
                        if (item.send_plan && item.send_plan.money.level.bath) {
                            row.push(item.send_plan.money.level.bath);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[14]) {
                        if (item.send_plan && item.send_plan.money.location.bath) {
                            row.push(item.send_plan.money.location.bath);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[15]) {
                        if (item.send_plan.status_check_sheet && item.send_plan.status_check_sheet.bath) {
                            row.push(item.send_plan.status_check_sheet.bath);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[16]) {
                        if (item.send_plan &&
                            item.send_plan.money.location.name.includes('Flip') &&
                            item.send_plan.money.typeflip.bath) {
                            row.push(item.send_plan.money.typeflip.bath);
                        } else if (item.send_plan &&
                            item.send_plan.money.location.name.includes('Private') &&
                            item.send_plan.money.typeprivate.bath) {
                            row.push(item.send_plan.money.typeprivate.bath);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[17]) {
                        if (item.send_plan.hour) {
                            row.push(item.send_plan.hour);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[18]) {
                        if (item.send_plan.money.send_rate_special) {
                            row.push(item.send_plan.money.send_rate_special.bath);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[19]) {
                        if (item.send_plan.money && item.send_plan.money.sum_send_rate_name == 0 && item.send_plan.money.sum_send_rate_save == 0) {
                            row.push(item.send_plan.money.sum_money);
                        } else if (item.send_plan.money && item.send_plan.money.sum_send_rate_name) {
                            row.push(item.send_plan.money.sum_money + item.send_plan.money.sum_send_rate_name);
                        } else if (item.send_plan.money && item.sum_send_rate_save) {
                            row.push(item.send_plan.money.sum_money + item.send_plan.money.sum_send_rate_save);
                        } else if (item.send_plan.money.sum_send_rate_save && item.send_plan.money.sum_send_rate_name) {
                            row.push(item.send_plan.money.sum_money + item.send_plan.money.sum_send_rate_name + item.send_plan.money.sum_send_rate_save);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[20]) {
                        if (item.send_plan.money && item.send_plan.money.sum_send_rate_name != 0) {
                            row.push(`-${item.send_plan.money.sum_send_rate_name}`);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[21]) {
                        if (item.send_plan.money && item.send_plan.money.sum_send_rate_save != 0) {
                            row.push(`-${item.send_plan.money.sum_send_rate_save}`);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[22]) {
                        if (item.send_plan.status_study_column) {
                            row.push(`-${item.send_plan.status_study_column.bath}%`);
                        } else {
                            row.push("");
                        }
                    }
                    if (this.selectedHeaders[23]) {
                        if (item.send_plan.money && item.send_plan.money.sum_money) {
                            row.push(item.send_plan.money.sum_money);
                        } else {
                            row.push("");
                        }
                    }
                    //----------------------------------------------------
                } else {
                    if (this.selectedHeaders[0]) {
                        if (item.teacherData.teacherId) {
                            row.push(item.teacherData.teacherId);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[1]) {
                        if (item.teacherData.firstName) {
                            row.push(item.teacherData.firstName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[2]) {
                        if (item.teacherData.lastName) {
                            row.push(item.teacherData.lastName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[3]) {
                        if (item.teacherData.nickname) {
                            row.push(item.teacherData.nickname);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[4]) {
                        if (item.teacherData.mobile) {
                            row.push(item.teacherData.mobile);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[5]) {
                        if (item.studentData.studentId) {
                            row.push(item.studentData.studentId);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[6]) {
                        if (item.studentData.firstName) {
                            row.push(item.studentData.firstName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[7]) {
                        if (item.studentData.lastName) {
                            row.push(item.studentData.lastName);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[8]) {
                        if (item.studentData.nickname) {
                            row.push(item.studentData.nickname);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[9]) {
                        if (item.studentData.studentMobile) {
                            row.push(item.studentData.studentMobile);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[10]) {
                        if (item.send_plan && item.send_plan.date_learn) {
                            row.push(item.send_plan.date_learn);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[11]) {
                        if (item.send_plan && item.send_plan.money.location.name) {
                            row.push(item.send_plan.money.location.name);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[12]) {
                        if (item.send_plan && item.send_plan.money.subject.bath) {
                            row.push(item.send_plan.money.subject.bath);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[13]) {
                        if (item.send_plan && item.send_plan.money.level.bath) {
                            row.push(item.send_plan.money.level.bath);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[14]) {
                        if (item.send_plan && item.send_plan.money.location.bath) {
                            row.push(item.send_plan.money.location.bath);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[15]) {
                        if (item.send_plan.status_check_sheet && item.send_plan.status_check_sheet.bath) {
                            row.push(item.send_plan.status_check_sheet.bath);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[16]) {
                        if (item.send_plan &&
                            item.send_plan.money.location.name.includes('Flip') &&
                            item.send_plan.money.typeflip.bath) {
                            row.push(item.send_plan.money.typeflip.bath);
                        } else if (item.send_plan &&
                            item.send_plan.money.location.name.includes('Private') &&
                            item.send_plan.money.typeprivate.bath) {
                            row.push(item.send_plan.money.typeprivate.bath);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[17]) {
                        if (item.send_plan.hour) {
                            row.push(item.send_plan.hour);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[18]) {
                        if (item.send_plan.money.send_rate_special) {
                            row.push(item.send_plan.money.send_rate_special.bath);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[19]) {
                        if (item.send_plan.money && item.send_plan.money.sum_send_rate_name == 0 && item.send_plan.money.sum_send_rate_save == 0) {
                            row.push(item.send_plan.money.sum_money);
                        } else if (item.send_plan.money && item.send_plan.money.sum_send_rate_name) {
                            row.push(item.send_plan.money.sum_money + item.send_plan.money.sum_send_rate_name);
                        } else if (item.send_plan.money && item.sum_send_rate_save) {
                            row.push(item.send_plan.money.sum_money + item.send_plan.money.sum_send_rate_save);
                        } else if (item.send_plan.money.sum_send_rate_save && item.send_plan.money.sum_send_rate_name) {
                            row.push(item.send_plan.money.sum_money + item.send_plan.money.sum_send_rate_name + item.send_plan.money.sum_send_rate_save);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[20]) {
                        if (item.send_plan.money && item.send_plan.money.sum_send_rate_name != 0) {
                            row.push(`-${item.send_plan.money.sum_send_rate_name}`);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[21]) {
                        if (item.send_plan.money && item.send_plan.money.sum_send_rate_save != 0) {
                            row.push(`-${item.send_plan.money.sum_send_rate_save}`);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[22]) {
                        if (item.send_plan.status_study_column) {
                            row.push(`-${item.send_plan.status_study_column.bath}%`);
                        } else {
                            row.push("");
                        }
                    } else {
                        row.push("");
                    }
                    if (this.selectedHeaders[23]) {
                        if (item.send_plan.money && item.send_plan.money.sum_money) {
                            row.push(item.send_plan.money.sum_money);
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
            saveAs(blob, `${newdate} - SalaryTeacher.xlsx`);
        },

    },
}
</script>