<template>
    <div>
        <!-- Header -->
        <v-card flat class="elevation-16 rounded-xl px-5 pt-8" style="background-color:#EBE4DE">
            <h5 class="px-4"><b>เลือกตารางเรียน</b></h5>
            <div class="d-flex">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" :rules="rules.name" label="วันที่เรียน" prepend-icon="mdi-calendar"
                            readonly v-bind="attrs" v-on="on" required class="date-picker-field"></v-text-field>
                    </template>

                    <v-date-picker v-model="date" no-title scrollable>
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>


                <v-spacer></v-spacer>
                <v-btn elevation="10" color="#322E2B" class="me-5 mt-3" style="color:white" :disabled="!formIsValid"
                    type="submit" rounded>Export<span class="mdi mdi-microsoft-excel text-h6"></span></v-btn>

                <v-btn elevation="10" color="#322E2B" class="mt-3" style="color:white" :disabled="!formIsValid"
                    type="submit" rounded>ค้นหา<span class="mdi mdi-magnify text-h6" @click="search_date_teacher()"></span></v-btn>
            </div>
        </v-card>

        <!-- Detail teacher -->

        <v-expansion-panels v-model="panel" multiple class="mt-8">
            <!-- eslint-disable-next-line vue/valid-v-for -->
            <v-expansion-panel class="elevation-16 rounded-xl mb-2" v-for="item in desserts">
                <v-expansion-panel-header style="font-size:20px;"><b>{{ item.name }}</b></v-expansion-panel-header>
                <v-expansion-panel-content class="rounded-b-xl">
                    <table class="text-center" style="width: 100%;">
                        <thead style="background-color:#D4C1B2;">
                            <tr>
                                <th class="p-2">รหัสนักเรียน</th>
                                <th class="p-2">ชื่อนักเรียน</th> 
                                <th class="p-2">ประเภทคลาส</th> 
                                <th class="p-2">สถานที่สอน</th>
                                <th class="p-2">วิชาที่สอน</th>
                                <th class="p-2">เวลาเริ่มต้น</th>
                                <th class="p-2">เวลาสิ้นสุด</th>
                                <th class="p-2">ระดับชั้น</th>
                                <th class="p-2">เช็คชื่อ</th>
                                <th class="p-2">ส่งพัฒนาการ</th>
                                <th class="p-2">แก้ไขข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="p-2">{{ item.studentId }}</td>
                                <td class="p-2">{{ item.namestu }}</td>
                                <td class="p-2">{{ item.class }}</td>
                                <td class="p-2">{{ item.style }}</td>
                                <td class="p-2">{{ item.subject}}</td>
                                <td class="p-2">{{ item.time_s }}</td>
                                <td class="p-2">{{ item.time_e }}</td>
                                <td class="p-2">{{ item.level }}</td>
                                <td class="p-2"><v-btn text><span class="mdi mdi-check text-h6"></span><span class="mdi mdi-check-all text-h6"></span></v-btn></td>
                                <td class="p-2"><v-btn text><span class="mdi mdi-clipboard-text-outline text-h6"></span></v-btn></td>
                                <td class="p-2"><v-btn text><span class="mdi mdi-pencil text-h6"></span></v-btn></td>
                            </tr>
                        </tbody>
                    </table>                    
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
            desserts: [],
            

            panel: [],
            readonly: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            form: [],

            rules: {
                // age: [(val) => val < 10 || `I don't believe you!`],
                // animal: [(val) => (val || "").length > 0 || "This field is required"],
                name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
            },
        }
    },
    mounted() {
        this.search_date_teacher();
    },

    computed: {
        formIsValid() {
            return (
                this.date
            );
        },
    },

    watch: {
        
    },

    methods: {
        search_date_teacher() {
            console.log('ทำๆ');
            const db = this.$fireModule.database();
            db.ref(`date_match/`).once("value", (snapshot) => {
                const childData = snapshot.val();
                this.desserts = [];
                this.arrayEvents = [];
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
                            Promise.all([getTeacherPromise, getSubjectPromise, getLocationPromise ,getStudentPromise])
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
                                            class: timedata.class,
                                            subject: namesub,
                                            keySubject: timedata.subject,
                                            keyStudent: key,
                                            keyTeacher: timedata.teacher,
                                            studentId: studentData.studentId || "-",
                                            namestu: namestu,
                                        });
                                    }
                                })
                        }
                    }
                }
                this.desserts = item;
                console.log(this.desserts);
            })
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
