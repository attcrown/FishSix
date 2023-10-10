<template>
    <div>
        
    </div>
</template>
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Vue from 'vue';
export const CheckStuController = new Vue();
export default {
    data() {
        return {

        };
    },
    created() {
        CheckStuController.$on('checkStuControl', (item, callback) => {
            this.checkStuControl(item, callback);
        });
    },
    methods: {
        checkStuControl(item, callback) {
            const db = this.$fireModule.database();
            let item_data = item;
            console.log('checkTeaControl>>>>',item_data);
            
            if (item_data.img_1 == undefined) {
                const storageRef = firebase.storage().ref();
                const file1 = item_data.fileimg1;
                const imageRef1 = storageRef.child(`send_check/${item_data.Idsendplan}_1.jpg`);
                imageRef1
                    .put(file1)
                    .then(() => {
                        console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
                        const storage = firebase.storage();
                        const image1 = storage.ref(`send_check/${item_data.Idsendplan}_1.jpg`);
                        image1.getDownloadURL()
                            .then((url_1) => {
                                db.ref(`send_plan/${item_data.keyTeacher}/${item_data.Idsendplan}/`).update({
                                    img_1: url_1
                                })
                                console.log(url_1);   
                    
                                this.save_step(item, callback);                             
                            }).catch((error) => {
                                console.log("รูปสอง", error);
                            });
                    })
            }else{
                this.save_step(item, callback); 
            }            
        },
        save_step(item_data, callback){
            const db = this.$fireModule.database();
            db.ref(`send_plan/${item_data.keyTeacher}/${item_data.Idsendplan}/`).update({
                status_study_column: item_data.status_study_column || null,
                status_send_method: item_data.status_send_method || null,
                status_check_sheet: item_data.status_check_sheet || null,
                status_study_column_tea: item_data.status_study_column_tea || null,
                match_vip: item_data.match_vip || false,
                learn: item_data.learn || null,
                understand: item_data.understand || null,
                development: item_data.development || null,
                problem: item_data.problem || null,
                method: item_data.method || null,
                // to_development: item_data.to_development || null,
                homework: item_data.homework || null,
                status_development: item_data.status_development || null,
                comment: item_data.comment || null,
                optional: item_data.optional || null,
                link_url: item_data.link_url || null,
                link_sheet: item_data.link_sheet || null,
                createAt_rate_OP: new Date()
            }).then(() => {
                console.log('save send_plan', item_data);
            })

            if (!item_data.del_time || item_data.del_time == undefined) {
                this.clear_time_student(item_data, callback);
            }else{
                const result = false;
                callback(result);
            }
        },

        clear_time_student(item_data, callback) {
            console.log('clear_time_student', item_data);
            const db = this.$fireModule.database();
            let keystudent = item_data;
            db.ref(`date_match/${keystudent.keyStudent}/${keystudent.date}/${keystudent.time_e}/`).update({
                del_time: true,
            }).then(() => {
                console.log('save date_match');
            })
            if (keystudent.style.includes("Flip") && !keystudent.match_test && !keystudent.match_vip) {
                db.ref(`hour_match/${keystudent.keyStudent}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.keyStudent}`).update({
                        hour: parseFloat(childData.hour) - parseFloat(keystudent.hour),
                    });
                })
                console.log('ลบชมทด Flip');
            }
            if (keystudent.style.includes("Private") && !keystudent.match_test && !keystudent.match_vip) {
                db.ref(`hour_match/${keystudent.keyStudent}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.keyStudent}`).update({
                        hourprivate: parseFloat(childData.hourprivate) - parseFloat(keystudent.hour),
                    });
                })
                console.log('ลบชมทด Private');
            }
            if (keystudent.style.includes("Flip") && !keystudent.match_test && keystudent.match_vip) {
                db.ref(`hour_match/${keystudent.keyStudent}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.keyStudent}`).update({
                        hour: parseFloat(childData.hour) - parseFloat(keystudent.hour),
                    });
                })
                console.log('ลบชมทด Flip VIP');
            }
            if (keystudent.style.includes("Private") && !keystudent.match_test && keystudent.match_vip) {
                db.ref(`hour_match/${keystudent.keyStudent}`).once("value", (snapshot) => {
                    const childData = snapshot.val();
                    db.ref(`hour_match/${keystudent.keyStudent}`).update({
                        hour: parseFloat(childData.hour) - parseFloat(keystudent.hour),
                    });
                })
                console.log('ลบชมทด Private VIP');
            }

            //-------ครูลากระทันหัน---------(ไม่หักชม น้อง)
            if (keystudent.status_study_column_tea.key == '-NceH8-XeWUJe5xDQCIW') {
                console.log('END ', keystudent.status_study_column_tea.name);
                return;
            }


            if (keystudent.match_test && keystudent.status_study_column_tea.key != '-NceH8-XeWUJe5xDQCIW') {
                const getTeacherPromise = db.ref(`user/${keystudent.keyStudent}`).once("value");
                Promise.all([getTeacherPromise])
                    .then(([teacherSnapshot]) => {
                        const studentData = teacherSnapshot.val();
                        console.log(studentData);
                        if (studentData.trialFlipclassHour && studentData.trialPrivateClassHour) {
                            if (keystudent.style.includes("Flip")) {
                                db.ref(`user/${keystudent.keyStudent}/`).update({
                                    trialFlipclassHour: parseFloat(studentData.trialFlipclassHour) + parseFloat(keystudent.hour),
                                })
                            } else if (keystudent.style.includes("Private")) {
                                db.ref(`user/${keystudent.keyStudent}/`).update({
                                    trialPrivateClassHour: parseFloat(studentData.trialPrivateClassHour) + parseFloat(keystudent.hour),
                                })
                            } else {
                                console.log("Error");
                            }
                            console.log('ลบ ชม. ทดลอง');
                            this.loadsave = false;
                        } else {
                            console.log('>>> freeHour privateFreeHour No DATA');

                            if (keystudent.style.includes("Flip")) {
                                db.ref(`user/${keystudent.keyStudent}/`).update({
                                    trialFlipclassHour: parseFloat(keystudent.hour),
                                })
                            } else if (keystudent.style.includes("Private")) {
                                db.ref(`user/${keystudent.keyStudent}/`).update({
                                    trialPrivateClassHour: parseFloat(keystudent.hour),
                                })
                            } else {
                                console.log("Error");
                            }
                            console.log('เพิ่ม ชม. ทดลอง');
                            this.loadsave = false;
                        }
                    })

                //------------------หัก ชม นักเรียน------------------
            } else if ((keystudent.status_study_column.key == "-NceLGrMN5SDXyyXe6fp" ||
                keystudent.status_study_column.key == "-NceLJGyxs0COh1TYVdg" ||
                keystudent.status_study_column.key == "-NceLxBOS65TrhT6Dbw_") &&
                keystudent.status_study_column_tea.key != '-NceH8-XeWUJe5xDQCIW') {
                const getTeacherPromise = db.ref(`user/${keystudent.keyStudent}`).once("value");
                Promise.all([getTeacherPromise])
                    .then(([teacherSnapshot]) => {
                        const studentData = teacherSnapshot.val();
                        console.log(studentData);
                        let data_edit = keystudent;
                        if (studentData.studyHour != undefined) {
                            if (data_edit.style.includes("Flip") && data_edit.style.includes("Online")) {
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHourOnline: parseFloat(studentData.studyHour) + parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                })
                            } else if(data_edit.style.includes("Flip") && !data_edit.style.includes("Online")){
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHour: parseFloat(studentData.studyHour) + parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                })
                            } else{
                                console.log('error')
                            }
                            console.log('ลบ ชม. class จริง', data_edit.style);
                            this.loadsave = false;
                        } else if (studentData.studyHour == undefined) {
                            if(data_edit.style.includes("Flip") && data_edit.style.includes("Online")){
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHourOnline: parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                })
                            }else if(data_edit.style.includes("Flip") && !data_edit.style.includes("Online")){
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHour: parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                })
                            }
                            this.loadsave = false;
                        } else {
                            console.log('>>>Hour flipHour No DATA Flip');
                        }

                        if (studentData.privateStudyHour != undefined && !keystudent.match_vip) {
                            if (data_edit.style.includes("Private") && data_edit.style.includes("Online")) {
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    privateStudyHourOnline: parseFloat(studentData.privateStudyHour) + parseFloat(keystudent.hour),
                                    privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour),
                                })
                            } else if (data_edit.style.includes("Private") && !data_edit.style.includes("Online")) {
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    privateStudyHour: parseFloat(studentData.privateStudyHour) + parseFloat(keystudent.hour),
                                    privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour) ,
                                })
                            } else {
                                console.log("Error");
                            }
                            console.log('ลบ ชม. class จริง', data_edit.style);
                            this.loadsave = false;
                        } else if (studentData.privateStudyHour == undefined && !keystudent.match_vip) {
                            if(data_edit.style.includes("Private") && data_edit.style.includes("Online")){
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    privateStudyHourOnline: parseFloat(keystudent.hour),
                                    privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour),
                                })
                            }else if(data_edit.style.includes("Private") && !data_edit.style.includes("Online")){
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    privateStudyHour: parseFloat(keystudent.hour),
                                    privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour),
                                })
                            }else{
                                console.log("Error");
                            }
                            this.loadsave = false;
                        } else {
                            console.log('>>>Hour privateHour No DATA Private');
                        }

                        if (studentData.studyHour != undefined && keystudent.match_vip) {
                            if (data_edit.style.includes("Private") && data_edit.style.includes("Online")) {
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHourOnline: parseFloat(studentData.studyHour) + parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                })
                            } else if (data_edit.style.includes("Private") && !data_edit.style.includes("Online")) {
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHour: parseFloat(studentData.studyHour) + parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                })
                            } else {
                                console.log("Error");
                            }
                            console.log('ลบ ชม. class จริง', data_edit.style);
                            this.loadsave = false;
                        } else if (studentData.studyHour == undefined && keystudent.match_vip) {
                            if(data_edit.style.includes("Private") && data_edit.style.includes("Online")){
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHourOnline: parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                })
                            }else if(data_edit.style.includes("Private") && !data_edit.style.includes("Online")){
                                db.ref(`user/${data_edit.keyStudent}/`).update({
                                    studyHour: parseFloat(keystudent.hour),
                                    hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                })
                            }else{
                                console.log("Error");
                            }
                            this.loadsave = false;
                        } else {
                            console.log('>>>Hour privateHour No DATA Private');
                        }
                    })
            }
            else {
                console.log("ไม่มีการลบ ชม.");
                this.loadsave = fal
            }
            const result = false;
            callback(result);
        },
    },
}
</script>