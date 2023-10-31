<template>
    <div>
        
    </div>
</template>
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Vue from 'vue';
export const CheckTeaController = new Vue();

export default {
    data() {
        return {

        };
    },
    created() {
        CheckTeaController.$on('checkTeaControl', (item, callback) => {
            this.checkTeaControl(item, callback);
        });
    },
    methods: {
        checkTeaControl(item, callback) {   
            console.log(item.fileimg);        
            let id = new Date().getTime();
            const storageRef = firebase.storage().ref();
            const file = item.fileimg;
            const imageRef = storageRef.child(`send_check/${id}.jpg`);
            imageRef.put(file).then(() => {
                console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
                const storage = firebase.storage();
                const image = storage.ref(`send_check/${id}.jpg`);
                image.getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        // อัปเดตค่าใน Firebase Realtime Database เมื่อรูปภาพอัปโหลดเสร็จสิ้น
                        const db = this.$fireModule.database();
                        db.ref(`date_match/${item.keyStudent}/${item.date}/${item.time_e}/`).update({
                            sendplan: true,
                            Idsendplan: id,
                        }).then(() => {
                            console.log('save date_match');
                        })

                        const currentDate = new Date();
                        //classHistory
                        const transactionId = `CH${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
                        db.ref(`studentHistory/${item.keyStudent}/${id}`).set({
                            Idsendplan: id,
                            date: item.date,
                            hour: item.hour,
                            keySubject: item.keySubject,
                            teacherName: item.name,
                            keyTeacher: item.keyTeacher,
                            level: item.level,
                            studentId: item.studentId,
                            subject: item.subject,
                            teacherId: item.teacherId,
                            time_e: item.time_e,
                            time_s: item.time_s,
                            style: item.style,
                            createdAt: currentDate,
                        }).then(() => {
                            console.log('Update student class history');
                        })

                        db.ref(`send_plan/${item.keyTeacher}/${id}`).update({
                            img: url,
                            hour: item.hour,
                            status_study_column_tea: item.status_study_column_tea,
                            createAt_OP: new Date(),
                            keystudent: item.keyStudent,
                            date_learn: item.date,
                            time_learn: item.time_e,
                            time_learn_start: item.time_s,
                            level: item.level,
                            keysubject: item.keySubject,
                        }).then(() => {
                            console.log('save send_plan');
                            const result = false;
                            callback(result);
                        })                       
                    }).catch((error) => {
                        console.log("Url", error);
                    });
            }).catch((error) => {
                console.log("รูปหนึ่ง", error);
            });
        },
    },
}
</script>