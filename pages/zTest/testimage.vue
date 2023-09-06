<template>
    <div style="background:white;">
        <img :src="imageURL" width="300" height="auto" alt="Image">
        <div >
            <v-file-input accept="image/*" label="File input" v-model="fileToUpload" @change="upload()"></v-file-input>
        </div>
        <div>
            <button @click="deleteImage">Delete Image</button>
        </div>
    </div>
</template>
  
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

export default {
    layout:'login',
    data() {
        return {
            imageURL: '', // เก็บ URL ของรูปภาพ
            fileToUpload: null,
        };
    },
    mounted() {
        this.getImageURL();
    },
    methods: {
        getImageURL() {
            const storage = firebase.storage();
            const imageRef = storage.ref('images/image.jpg');
            imageRef.getDownloadURL()
                .then((url) => {
                    this.imageURL = url; // กำหนด URL ของรูปภาพให้กับตัวแปรในเทมเพลต
                    console.log(this.imageURL);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        upload() {
            const storageRef = firebase.storage().ref();
            const file = this.fileToUpload; // เลือกไฟล์รูปภาพจาก input หรืออื่นๆ
            const imageRef = storageRef.child('images/image.jpg'); // กำหนดชื่อและพาธของรูปภาพที่จะอัปโหลด
            imageRef.put(file).then(() => {
                console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
            }).catch((error) => {
                console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error);
            });
        },
        deleteImage() {
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child('images/image.jpg');
            imageRef
                .delete()
                .then(() => {
                    console.log('รูปภาพถูกลบเรียบร้อยแล้ว');
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาดในการลบรูปภาพ:', error);
                });
        },
    }
};
</script>
  