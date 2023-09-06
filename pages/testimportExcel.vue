<template>
    <div>
        <label for="">Stu</label>
        <input type="file" @change="handleFileUpload" />
        <label for="">Tea</label>
        <input type="file" @change="handleFileUploadTea" />
        <div v-if="jsonData.length > 0" style="background-color:aliceblue">
            <table>
                <thead>
                    <tr>
                        <th>ชื่อจริงครู</th>
                        <th>นามสกุลครู</th>
                        <th>ชื่อเล่นครู</th>
                        <th>เบอร์ติดต่อ</th>
                        <th>เวลาคงเหลือ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(teacher, index) in jsonData" :key="index">
                        <td>{{ teacher['firstName'] }}</td>
                        <td>{{ teacher['lastName'] }}</td>
                        <td>{{ teacher['nickName'] }}</td>
                        <td>{{ teacher['Phone'] }}</td>
                        <td>{{ teacher['Time'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="jsonDataTea.length > 0" style="background-color:aliceblue">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ชื่อ</th>
                        <th>นามสกุล</th>
                        <th>nickname</th>
                        <th>Bank</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(teacher, index) in jsonDataTea" :key="index">
                        <td>{{ teacher['userId'] }}</td>
                        <td>{{ teacher['firstName'] }}</td>
                        <td>{{ teacher['lastName'] }}</td>
                        <td>{{ teacher['nickName'] }}</td>
                        <td>{{ teacher['Bank'] }}</td>
                        <td>{{ teacher['FlipClass'] }}</td>
                        <td>{{ teacher['PrivateClass'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <v-btn @click="exportToExcel">ExcelStudent</v-btn>
        </div>
        <div>
            <v-btn @click="exportToExcelTea">ExcelTeacher</v-btn>
        </div>
    </div>
</template>
  
<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
    layout: 'login',
    data() {
        return {
            jsonData: [],
            jsonDataTea: [],
            row: [],
            rowTea: [],
        };
    },
    created() {
        // this.search_id();
    },
    methods: {
        exportToExcel() {
            let newdate = new Date().getFullYear() + ' ' + (parseInt(new Date().getMonth()) + 1) + ' ' + new Date().getDate();
            const headers = ['username', 'password', 'ชื่อจริง', 'นามสกุล', 'ชื่อเล่น', 'เบอร์ติดต่อ', 'Status', 'เวลาคงเหลือ'];
            const data = [headers, ...this.row.map(item => {
                const row = [];
                if (item.username) {
                    row.push(item.username);
                } else {
                    row.push(" ");
                }

                if (item.password) {
                    row.push(item.password);
                } else {
                    row.push(" ");
                }

                if (item.name) {
                    row.push(item.name);
                } else {
                    row.push(" ");
                }

                if (item.lastName) {
                    row.push(item.lastName);
                } else {
                    row.push(" ");
                }

                if (item.nickName) {
                    row.push(item.nickName);
                } else {
                    row.push(" ");
                }

                if (item.Phone) {
                    row.push(item.Phone);
                } else {
                    row.push(" ");
                }

                if (item.role) {
                    row.push(item.role);
                } else {
                    row.push(" ");
                }

                if (item.time) {
                    row.push(item.time);
                } else {
                    row.push(" ");
                }

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
            saveAs(blob, `${newdate}-dashboard.xlsx`);
        },

        exportToExcelTea() {
            let newdate = new Date().getFullYear() + ' ' + (parseInt(new Date().getMonth()) + 1) + ' ' + new Date().getDate();
            const headers = ['username', 'password', 'ชื่อจริง', 'นามสกุล', 'ชื่อเล่น', 'Role', 'Bank'];
            const data = [headers, ...this.rowTea.map(item => {
                const row = [];
                if (item.username) {
                    row.push(item.username);
                } else {
                    row.push(" ");
                }

                if (item.password) {
                    row.push(item.password);
                } else {
                    row.push(" ");
                }

                if (item.name) {
                    row.push(item.name);
                } else {
                    row.push(" ");
                }

                if (item.lastName) {
                    row.push(item.lastName);
                } else {
                    row.push(" ");
                }

                if (item.nickName) {
                    row.push(item.nickName);
                } else {
                    row.push(" ");
                }

                if (item.role) {
                    row.push(item.role);
                } else {
                    row.push(" ");
                }

                if (item.Bank) {
                    row.push(item.Bank);
                } else {
                    row.push(" ");
                }

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
            saveAs(blob, `${newdate}-dashboard.xlsx`);
        },


        handleFileUpload(event) {
            const file = event.target.files[0];

            if (!file) {
                console.error('No file selected');
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                this.jsonData = XLSX.utils.sheet_to_json(worksheet);
                this.search_id(this.jsonData);
            };

            reader.readAsArrayBuffer(file);
        },

        handleFileUploadTea(event) {
            const file = event.target.files[0];

            if (!file) {
                console.error('No file selected');
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                this.jsonDataTea = XLSX.utils.sheet_to_json(worksheet);
                // this.search_idTea(this.jsonDataTea);
                this.saveToDataTea(this.jsonDataTea);
            };

            reader.readAsArrayBuffer(file);
        },

        search_id(Data) {
            console.log(Data);
            let userId = "00000000000";
            const db = this.$fireModule.database();
            db.ref("user/").once("value", (snapshot) => {
                if (snapshot.extends) {
                    const childData = snapshot.val();
                    for (const key in childData) {
                        if (childData[key].studentId != undefined) {
                            if (parseInt(childData[key].studentId.substring(3, 11)) > parseInt(userId.substring(3, 11))) {
                                userId = childData[key].studentId;
                            }
                        }
                    }
                    userId = userId.substring(0, 3) + [parseInt(userId.substring(3, 11)) + 1];
                    console.log(userId);
                } else {
                    userId = 'FSS23090001'
                }
            }).then(() => {
                this.saveToData(Data, userId);
            })
        },
        saveToData(Data, userId) {
            const db = this.$fireModule.database();
            console.log('ทำๆ', Data, userId);
            for (const item in Data) {
                if (Data[item].firstName) {
                    let id = this.encode(userId);
                    console.log("save", id, userId, Data[item]);
                    db.ref(`user/${id}/`).update({
                        createdAt: new Date(),
                        name: userId,
                        firstName: Data[item].firstName || null,
                        lastName: Data[item].lastName || null,
                        nickname: Data[item].nickName || null,
                        studentId: userId,
                        password: 'Fishsixstudent',
                        status: "user",
                        hourLeft: Data[item].Time || "0",
                        studyHour: "0",
                        studentMobile: Data[item].Phone || null,
                        parentMobile : Data[item].Phone || null,
                    });
                    this.row.push({
                        username: userId,
                        password: 'Fishsixstudent',
                        name: Data[item].firstName || null,
                        lastName: Data[item].lastName || null,
                        nickName: Data[item].nickName || null,
                        role: "user",
                        time: Data[item].Time || "0",
                        Phone: Data[item].Phone
                    });
                    userId = userId.substring(0, 3) + [parseInt(userId.substring(3, 11)) + 1];
                }
            }
        },


        // search_idTea(Data) {
        //     console.log(Data);
        //     let userId = "00000000000";
        //     const db = this.$fireModule.database();
        //     db.ref("user/").once("value", (snapshot) => {
        //         if (snapshot.extends()) {
        //             const childData = snapshot.val();
        //             for (const key in childData) {
        //                 if (childData[key].studentId != undefined) {
        //                     if (parseInt(childData[key].studentId.substring(2, 6)) > parseInt(userId.substring(2, 6))) {
        //                         userId = childData[key].studentId;
        //                     }
        //                 }
        //             }
        //             userId = userId.substring(0, 2) + [parseInt(userId.substring(2, 6)) + 1];
        //             console.log(userId);
        //         }else{
        //             userId = 'FS23090000'
        //         }

        //     }).then(() => {
        //         this.saveToDataTea(Data, userId);
        //     })
        // },
        saveToDataTea(Data) {
            const db = this.$fireModule.database();
            console.log('ทำๆ', Data);
            for (const item in Data) {
                if (Data[item].firstName) {
                    let id = this.encode(Data[item].userId);
                    console.log("save", id, Data[item]);
                    db.ref(`user/${id}/`).update({
                        createdAt: new Date(),
                        name: Data[item].userId,
                        firstName: Data[item].firstName || null,
                        lastName: Data[item].lastName || null,
                        nickname: Data[item].nickName || null,
                        teacherId: Data[item].userId,
                        password: 'Fishsixteacher',
                        status: "teacher",
                        typeflip: Data[item].FlipClass,
                        typeprivate: Data[item].PrivateClass,
                    });
                    this.rowTea.push({
                        username: Data[item].userId,
                        password: 'Fishsixteacher',
                        name: Data[item].firstName || null,
                        lastName: Data[item].lastName || null,
                        nickName: Data[item].nickName || null,
                        role: "teacher",
                        Bank: Data[item].Bank || null
                    });
                    // userId = userId.substring(0, 2) + [parseInt(userId.substring(2, 6)) + 1];
                }
                
            }
        },

        encode(a) {
            const encodedData = btoa(a);
            return encodedData;
        },
    },
};
</script>
  