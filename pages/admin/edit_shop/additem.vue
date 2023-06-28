<template>
    <div>
        <v-row>
            <v-col class="text-center">
                <h1>{{header_Title}}</h1>
                <div class="d-flex justify-center">
                    <form style="width: 380px; background-color: bisque;
                    border-radius: 20px;" class="p-3">
                        <div>
                            <v-file-input accept="image/*" label="File Images" v-model="fileToUpload"
                                @change="check_img()"></v-file-input>
                        </div>
                        <v-text-field v-model="name" :error-messages="nameErrors" :counter="20" label="Name" required
                            @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>

                        <v-textarea v-model="detail_item" :error-messages="detail_itemErrors" label="detail" required
                            @input="$v.detail_item.$touch()" @blur="$v.detail_item.$touch()"></v-textarea>

                        <v-text-field v-model="star_like" label="Star 1.0-5.0"></v-text-field>
                        <v-text-field v-model="view_like" label="view"></v-text-field>
                        <v-text-field v-model="title_item" label="Title"></v-text-field>

                        <div v-for="(input, index) in inputFields" :key="index" class="d-flex align-center">
                            <v-text-field v-model="input.value" :label="`Price ${index + 1}`"></v-text-field>
                            <v-btn @click="removeInputField(index)" class="ms-3">Del</v-btn>
                        </div>

                        <v-btn class="mr-4" @click="addInputField">Add Price</v-btn>

                        <v-btn class="mr-4" @click= "dialogSave = true"> submit </v-btn>
                        <v-btn @click="clear"> clear </v-btn>
                    </form>
                </div>
            </v-col>

            <v-col>
                <h1 class="text-center">Viewer</h1>
                <div class="d-flex justify-center">
                    <v-sheet style="background-color:transparent; width: 350px;">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <v-card :elevation="hover ? 24 : 6" class="mx-auto pa-3">
                                    <template slot="progress">
                                        <v-progress-linear color="deep-purple" height="10"
                                            indeterminate></v-progress-linear>
                                    </template>
                                    <v-img :src="imageURL" height="250" alt="Image"></v-img>
                                    <v-card-title>{{ name }}</v-card-title>
                                    <v-card-text>
                                        <v-row align="center" class="mx-0">
                                            <v-rating :value="parseFloat(star_like)" color="amber" dense half-increments
                                                readonly size="14"></v-rating>
                                            <div class="grey--text ms-4 mb-3">
                                                {{ star_like }} ({{ view_like }})
                                            </div>
                                        </v-row>
                                        <div>{{ detail_item }}</div>
                                    </v-card-text>
                                    <v-divider class="mx-4 my-0"></v-divider>
                                    <v-card-title>{{ title_item }}</v-card-title>
                                    <v-card-text>
                                        <v-chip-group active-class="deep-purple accent-4 white--text" column>
                                            <v-chip v-for="(item, index) in inputFields" :key="index" :value="item.value">
                                                {{ item.value }}฿
                                            </v-chip>
                                        </v-chip-group>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-btn color="amber darken-4" outlined>
                                            เพิ่มใส่รถเข็น
                                        </v-btn>
                                        <v-btn color="light-green darken-4" outlined>
                                            ชำระเงิน
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-hover>
                    </v-sheet>
                </div>
            </v-col>
            <v-col>
                <div class="pt-4"></div>
                <div class="mt-10 d-flex justify-center" max-width="500px">
                    <template>
                        <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat style="background-color:rgb(161, 161, 161)">
                                    <v-toolbar-title>ITEMS Tables</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>

                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                        <v-card>
                                            <v-card-title class="text-h5">Are you sure you want to delete this
                                                item?</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                    <v-dialog v-model="dialogSave" max-width="500px">
                                        <v-card>
                                            <v-card-title class="text-h5">Are you sure you want to SAVE this
                                                item?</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="closeSave ,dialogSave = false">Cancel</v-btn>
                                                <v-btn color="blue darken-1" text @click="submit">OK</v-btn>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                </v-toolbar>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-icon small class="mr-2" @click="editItem(item)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="deleteItem(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="initialize">
                                    Reset
                                </v-btn>
                            </template>
                        </v-data-table>
                    </template>
                </div>
            </v-col>
        </v-row>

        <div>
            Footer
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        name: { required, maxLength: maxLength(20) },
        detail_item: { required },
        select: { required },
        checkbox: {
            checked(val) {
                return val
            },
        },
    },
    layout: 'session',
    data() {
        return {
            header_Title: "ADD",
            inputFields: [{ value: '', key: 1 }],
            imageURL: '', // เก็บ URL ของรูปภาพ
            fileToUpload: null,
            name: '',
            detail_item: '',
            key_items: new Date().getTime(),
            star_like: '',
            title_item: '',
            view_like: '',
            check_data: false,

            dialogSave: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Star', value: 'star' },
                { text: 'Price', value: 'bath_table' },

                { text: 'Actions', value: 'actions', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                star: 0,
                bath_table: 0,

            },
            defaultItem: {
                name: '',
                star: 0,
                bath_table: 0,

            },
        }
    },
    mounted() {
        this.readdata();
    },
    components: {

    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength &&
                errors.push('Name must be at most 10 characters long')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
        detail_itemErrors() {
            const errors = []
            if (!this.$v.detail_item.$dirty) return errors
            !this.$v.detail_item.required && errors.push('Name is required.')
            return errors
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        readdata(){
            const items = [];
            const db = this.$fireModule.database();
            db.ref("items/").on("value", (snapshot) => {
                const childData = snapshot.val();
                for(const key in childData){
                    items.push({
                        keyID : key || "-",
                        name : childData[key].name || "-",
                        detail : childData[key].detail || "-",
                        star : childData[key].star || "-",
                        title : childData[key].title || "-",
                        view : childData[key].view || "-",
                        bath : childData[key].bath || "-", 
                        bath_table : childData[key].bath.map(field => field.value) || "-", 
                    })
                }
                this.desserts = items;
            })
            
        },

        getImageURL(key) {
            const storage = firebase.storage();
            const imageRef = storage.ref(`images_item/${key}.jpg`);
            imageRef.getDownloadURL()
                .then((url) => {
                    this.imageURL = url; // กำหนด URL ของรูปภาพให้กับตัวแปรในเทมเพลต
                    console.log(this.imageURL);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        addInputField() {
            // เพิ่มช่อง input เมื่อกดปุ่ม "Add Input"
            const newIndex = this.inputFields.length + 1;
            this.inputFields.push({ value: '', key: newIndex });
        },

        upload() {
            if (this.fileToUpload && this.check_data) {
                const storageRef = firebase.storage().ref()
                const file = this.fileToUpload // เลือกไฟล์รูปภาพจาก input หรืออื่นๆ
                const imageRef = storageRef.child(`images_item/${this.key_items}.jpg`) // กำหนดชื่อและพาธของรูปภาพที่จะอัปโหลด
                imageRef
                    .put(file)
                    .then(() => {
                        this.save_submit();
                        this.clear();
                        console.log('รูปภาพถูกอัปโหลดเรียบร้อยแล้ว');
                        this.dialogSave = false;
                    })
                    .catch((error) => {
                        console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error)
                    })
            } else { console.log('No Image'); }
        },

        submit() {
            this.$v.$touch();
            if (
                this.name !== ""
                && this.detail_item !== ""
                && this.star_like !== ""
                && this.view_like !== ""
                && this.title_item !== ""
                && this.fileToUpload !== ""
            ) {
                this.check_data = true;
                this.upload();
                this.save_submit();
            } else { this.check_data = false; }
            this.readdata();
        },
        clear() {
            this.$v.$reset()
            this.name = '';
            this.detail_item = '';
            this.view_like = '';
            this.fileToUpload = null;
            this.imageURL = '';
            this.title_item = '';
            this.star_like = '';
            this.inputFields = [];
        },
        check_img() {
            if (this.fileToUpload) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imageURL = event.target.result;
                };
                reader.readAsDataURL(this.fileToUpload);
            }
        },
        save_submit() {
            const db = this.$fireModule.database();
            db.ref(`items/${this.key_items}`).set({
                detail: this.detail_item,
                name: this.name,
                star: this.star_like,
                view: this.view_like,
                title: this.title_item,
                bath: this.inputFields
            });
        },
        removeInputField(index) {
            this.inputFields.splice(index, 1);
        },

        initialize() {
            this.desserts = [];
        },

        editItem(item) {
            this.header_Title = "Edit";
            this.readdata();
            this.name = item.name;
            this.star_like = item.star;
            this.detail_item = item.detail;
            this.view_like = item.view;
            this.title_item = item.title;
            this.inputFields = item.bath;
            this.getImageURL(item.keyID);
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1);
            console.log(this.editedItem);

            const db = this.$fireModule.database();
            db.ref(`items/${this.editedItem.keyID}`).remove();

            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child(`images_item/${this.editedItem.keyID}.jpg`);
            imageRef
                .delete()
                .then(() => {
                    console.log('รูปภาพถูกลบเรียบร้อยแล้ว');
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาดในการลบรูปภาพ:', error);
                });
            this.closeDelete();
            this.clear();
            this.readdata();
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeSave() {
            this.dialogSave = false;
        }
        
    },
}
</script>