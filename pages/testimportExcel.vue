<template>
    <div>
        <input type="file" @change="handleFileUpload" />
        <div v-if="jsonData.length > 0" style="background-color:aliceblue">
            <table>
                <thead>
                    <tr>
                        <th>ชื่อจริงครู</th>
                        <th>นามสกุลครู</th>
                        <th>ชื่อเล่นครู</th>
                        <th>ลำดับ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(teacher, index) in jsonData" :key="index">
                        <td>{{ teacher['firstName'] }}</td>
                        <td>{{ teacher['lastName'] }}</td>
                        <td>{{ teacher['nickName'] }}</td>
                        <td>{{ teacher['No'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import * as XLSX from 'xlsx';

export default {
    layout: 'login',
    data() {
        return {
            jsonData: [],
        };
    },
    created() {
        // this.search_id();
    },
    methods: {
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
        search_id(Data) {
            console.log(Data);
            let userId = "00000000000";
            const db = this.$fireModule.database();
            db.ref("user/").once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    if (childData[key].studentId != undefined) {
                        if (parseInt(childData[key].studentId.substring(3, 11)) > parseInt(userId.substring(3, 11))) {
                            userId = childData[key].studentId;                            
                        }
                    }
                }
                userId = userId.substring(0, 3) + [parseInt(userId.substring(3, 11))+1];
                console.log(userId);
            }).then(() => {
                this.saveToData(Data ,userId);
            })
        },
        saveToData(Data ,userId){
            const db = this.$fireModule.database();
            console.log('ทำๆ',Data,userId);
            for (const item in Data) {
                    let id = this.encode(userId);
                    console.log("save", id, userId ,Data[item]);
                    db.ref(`user/${id}/`).update({
                        createdAt: new Date(),
                        name: userId,
                        firstName:Data[item].firstName,
                        lastName: Data[item].lastName,
                        nickname: Data[item].nickName,
                        studentId: userId,
                        password:'Fishsixstudent',
                        status:"user"
                    });
                    userId = userId.substring(0, 3) + [parseInt(userId.substring(3, 11)) + 1];
                }
        },
        encode(a) {
            const encodedData = btoa(a);
            return encodedData;
        },
    },
};
</script>
  