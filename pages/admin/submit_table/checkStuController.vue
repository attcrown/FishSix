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
            time_standart: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
                , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
                , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
                , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
                , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
                , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
            time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
                , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
                , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
                , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
                , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
                , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
            time_standart_sum: [],
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
            if(item_data.hour != item_data.old_hour){
                const db = this.$fireModule.database();
                if(parseFloat(item_data.hour) > parseFloat(item_data.old_hour)){
                    let hourSum = parseFloat(item_data.hour) - parseFloat(item_data.old_hour);
                    if(item_data.select_class === "-NcQsHB9vgG53lJKPA-i"){ //Private Class
                        if(item_data.style.includes("online")){
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                privateHourLeft : parseFloat(item_data.studentAll.privateHourLeft) - parseFloat(hourSum),
                                privateStudyHourOnline : parseFloat(item_data.studentAll.privateStudyHourOnline) + parseFloat(hourSum)
                            })
                        }else{
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                privateHourLeft : parseFloat(item_data.studentAll.privateHourLeft) - parseFloat(hourSum),
                                privateStudyHour : parseFloat(item_data.studentAll.privateStudyHour) + parseFloat(hourSum)
                            })
                        }
                    }else if(item_data.select_class === "-NcQsFxCcoNS-uwmKUqE"){ //Flip Class
                        if(item_data.style.includes("online")){
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                hourLeft : parseFloat(item_data.studentAll.hourLeft) - parseFloat(hourSum),
                                studyHourOnline : parseFloat(item_data.studentAll.studyHourOnline) + parseFloat(hourSum)
                            })
                        }else{
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                hourLeft : parseFloat(item_data.studentAll.hourLeft) - parseFloat(hourSum),
                                studyHour : parseFloat(item_data.studentAll.studyHour) + parseFloat(hourSum)
                            })
                        }
                    }else{
                        console.log('Error');
                        return;
                    }
                }else{
                    let hourSum = parseFloat(item_data.old_hour) - parseFloat(item_data.hour);
                    if(item_data.select_class === "-NcQsHB9vgG53lJKPA-i"){ //Private Class
                        if(item_data.style.includes("online")){ //Online
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                privateHourLeft : parseFloat(item_data.studentAll.privateHourLeft) + parseFloat(hourSum),
                                privateStudyHourOnline : parseFloat(item_data.studentAll.privateStudyHourOnline) - parseFloat(hourSum)
                            })
                        }else{ // สาขา
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                privateHourLeft : parseFloat(item_data.studentAll.privateHourLeft) + parseFloat(hourSum),
                                privateStudyHour : parseFloat(item_data.studentAll.privateStudyHour) - parseFloat(hourSum)
                            })
                        }
                    }else if(item_data.select_class === "-NcQsFxCcoNS-uwmKUqE"){ //Flip Class
                        if(item_data.style.includes("online")){ //Online
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                hourLeft : parseFloat(item_data.studentAll.hourLeft) + parseFloat(hourSum),
                                studyHourOnline : parseFloat(item_data.studentAll.studyHourOnline) - parseFloat(hourSum)
                            })
                        }else{ // สาขา
                            db.ref(`user/${item_data.keyStudent}/`).update({
                                hourLeft : parseFloat(item_data.studentAll.hourLeft) + parseFloat(hourSum),
                                studyHour : parseFloat(item_data.studentAll.studyHour) - parseFloat(hourSum)
                            })
                        }
                    }else{
                        console.log('Error');
                        return;
                    }
                }
            }
            
            const db = this.$fireModule.database();
            db.ref(`send_plan/${item_data.keyTeacher}/${item_data.Idsendplan}/`).update({
                status_study_column: item_data.status_study_column || null,
                status_send_method: item_data.status_send_method || null,
                status_check_sheet: item_data.status_check_sheet || null,
                status_study_column_tea: item_data.status_study_column_tea || null,
                match_vip: item_data.match_vip || false,
                level : item_data.level || null,
                keysubject : item_data.keySubject || null,
                hour: item_data.hour || null,
                learn: item_data.learn || null,
                understand: item_data.understand || null,
                development: item_data.development || null,
                problem: item_data.problem || null,
                method: item_data.method || null,
                select_class: item_data.select_class || null,
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
            console.log(`data_match/${item_data.keyStudent}/${item_data.date_learn}/${item_data.time_learn}`);

            db.ref(`date_match/${item_data.keyStudent}/${item_data.date_learn}/${item_data.time_learn}`).update({
                subject : item_data.keySubject || null,
                level : item_data.level || null,
                hour: item_data.hour || null
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
                const result = false;
                callback(result);
                return;
            }

            //------ทดลองเรียน-------------
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
                        }
                        const result = false;
                        callback(result);
                        return;
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
                        console.log(studentData ,keystudent);
                        let data_edit = keystudent;
                        //Check Flip Class 
                        if (data_edit.style.includes("Flip") && !keystudent.match_vip) {
                            //Chech Location online
                            if(data_edit.style.includes("Online")){
                                if(studentData.studyHourOnline != undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        studyHourOnline: parseFloat(studentData.studyHourOnline) + parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                    })
                                    console.log('DO>>>');
                                }else if(studentData.studyHourOnline === undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        studyHourOnline: parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                    })
                                    console.log('DO>>>');
                                }else{
                                    console.log('error');
                                }
                            }else{
                            //Chech Location สาขา  
                                if(studentData.studyHour != undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        studyHour: parseFloat(studentData.studyHour) + parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                    })
                                    console.log('DO>>>');
                                }else if(studentData.studyHour === undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        studyHour: parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour)
                                    })
                                    console.log('DO>>>');
                                }else{
                                    console.log('error');
                                }
                            }                            
                        }     
                        
                        if (data_edit.style.includes("Flip") && keystudent.match_vip) {
                            //Chech Location online
                            if(data_edit.style.includes("Online")){
                                if(studentData.privateStudyHourOnline != undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHourOnline: parseFloat(studentData.privateStudyHourOnline) + parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else if(studentData.privateStudyHourOnline === undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHourOnline: parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else{
                                    console.log('error');
                                }
                            }else{
                            //Chech Location สาขา  
                                if(studentData.privateStudyHour != undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHour: parseFloat(studentData.privateStudyHour) + parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else if(studentData.privateStudyHour === undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHour: parseFloat(keystudent.hour),
                                        hourLeft: parseFloat(studentData.hourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else{
                                    console.log('error');
                                }
                            }                            
                        } 

                        if (data_edit.style.includes("Private")){                                                 
                            //Chech Location online
                            if(data_edit.style.includes("Online")){
                                if(studentData.privateStudyHourOnline != undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHourOnline: parseFloat(studentData.privateStudyHourOnline) + parseFloat(keystudent.hour),
                                        privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else if(studentData.privateStudyHourOnline === undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHourOnline: parseFloat(keystudent.hour),
                                        privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else{
                                    console.log('error');
                                }
                            }else{
                            //Chech Location สาขา 
                                if(studentData.privateStudyHour != undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHour: parseFloat(studentData.privateStudyHour) + parseFloat(keystudent.hour),
                                        privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else if(studentData.privateStudyHour === undefined){
                                    db.ref(`user/${data_edit.keyStudent}/`).update({
                                        privateStudyHour: parseFloat(keystudent.hour),
                                        privateHourLeft: parseFloat(studentData.privateHourLeft) - parseFloat(keystudent.hour),
                                    })
                                    console.log('DO>>>');
                                }else{
                                    console.log('error');
                                }
                            }                                                        
                        }
                        if(keystudent.status_study_column.key === "-NceLxBOS65TrhT6Dbw_"){
                            this.validateTime(keystudent.time_learn_start ,keystudent.time_learn);
                            this.delete_time(keystudent);
                        }                           
                    })
            } else {
                console.log("ไม่มีการลบ ชม.");
            }
            const result = false;
            callback(result);
        },

        validateTime(start, stop) {
            this.time_standart_stop = [];
            let sum = 0;
            for (const key in this.time_standart) {
                if (start == this.time_standart[key] || (sum != 0)) {
                    sum++;
                    if (sum > 1) {
                        this.time_standart_stop.push(this.time_standart[key]);
                    }
                }
            }
            if (stop != null && start != null) {
                this.time_standart_sum = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (stop == this.time_standart[key]) {
                        sum = 0;
                        break;
                    }
                    else if (start == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        this.time_standart_sum.push(this.time_standart[key]);
                    }
                }
            }
            console.log(this.time_standart_sum);
        },

        delete_time(item) {
            console.log(item);
            let olditem = item;
            const db = this.$fireModule.database();
            for (const key in this.time_standart_sum) {
                db.ref(`Time_teacher/${olditem.keyTeacher}/${olditem.date}/${this.time_standart_sum[key]}/`).orderByValue().equalTo(olditem.keyStudent).once("value")
                    .then(snapshot => {
                        snapshot.forEach(childSnapshot => {
                            childSnapshot.ref.remove()
                                .then(() => {
                                    console.log("Data removed successfully");
                                    this.renewDate(olditem, this.time_standart_sum[key]);
                                })
                                .catch(error => {
                                    console.error("Error removing data:", error);
                                    return;
                                });
                        });
                    });
            }
        },
    },
}
</script>