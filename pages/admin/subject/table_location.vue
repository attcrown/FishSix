<template>
    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="index" class="elevation-1"
        max-width="500px">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>สถานที่สอน</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">EDIT</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-form ref="form" @submit.prevent="submit">
                                <v-container fluid>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <v-text-field v-model="form.first" :rules="rules.name" color="purple darken-2"
                                                label="ชื่อสถานที่" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <v-textarea v-model="form.bio" color="teal" :rules="rules.name" required>
                                                <template v-slot:label>
                                                    <div>ตำแหน่งที่ตั้ง <small>(ระบุรายละเอียด)</small></div>
                                                </template>
                                            </v-textarea>
                                        </v-col>
                                        <v-col>
                                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text :disabled="!formIsValid" @click="edit_save">Save</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>

                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    <template v-slot:activator="{}">
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>
                    </template>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <!-- <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon> -->
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    data() {
        const defaultForm = Object.freeze({
            first: "",
            bio: "",
        });

        return {
            form: Object.assign({}, defaultForm),
            rules: {
                name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
            },
            search: '',
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: 'No.', value: 'index' },
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Location', value: 'level' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: null,
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        formIsValid() {
            return (
                this.form.first && this.form.bio
            );
        },
    },

    watch: {
        // dialog(val) {
        //     val || this.close()
        // },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            const db = this.$fireModule.database();
            db.ref("location/").on("value", (snapshot) => {
                let item = [];
                let num = 0;
                this.desserts = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    num++;
                    const subject = childData[key];
                    item.push({ name: subject.name, level: subject.location, key: key, index: num });
                    // console.log('>>>',item);
                }
                this.desserts = item;
            })
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.form.first = item.name;
            this.form.bio = item.level;
            // console.log(this.editedItem);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            console.log(this.editedItem.key);
            const db = this.$fireModule.database();
            db.ref(`location/${this.editedItem.key}`).remove();
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.clear();
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        clear() {
            this.form = Object.assign({}, this.defaultForm);
            this.$refs.form.reset();
        },
        edit_save(){
            const db = this.$fireModule.database();
            db.ref(`location/${this.editedItem.key}`).update({
                name : this.form.first,
                location : this.form.bio,
            }).then(() => {
                this.close();
            }).catch((error) => {
                alert("บันทึกไม่สำเร็จ");
            });
        }
    },
}
</script>