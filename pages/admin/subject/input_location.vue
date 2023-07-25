<template>
    <div>
        <v-card flat class="elevation-16 rounded-t-xl px-5 pt-8" style="background-color:#EBE4DE">
            <h5 class="px-4"><b>เพิ่มสถานที่สอน</b></h5>
            <v-snackbar v-model="snackbar" absolute top right color="success">
                <span>Add successful!</span>
                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
            </v-snackbar>
            <v-form ref="form" @submit.prevent="submit">
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field v-model="form.first" :rules="rules.name" color="teal" label="ชื่อสถานที่"
                                required></v-text-field>
                        </v-col>
                        <!-- <v-col cols="12" sm="6">
                        <v-select v-model="form.favoriteAnimal" :items="animals" :rules="rules.animal" color="pink"
                            label="Favorite animal" required></v-select>
                    </v-col> -->
                        <!-- <v-col cols="12" sm="6">
                        <v-text-field v-model="form.last" :rules="rules.name" color="blue darken-2" label="Last name"
                            required></v-text-field>
                    </v-col> -->
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="form.bio" color="teal" :rules="rules.name" label="ตำแหน่งที่ตั้ง"
                                required>
                                <template v-slot:label>
                                    <div>ตำแหน่งที่ตั้ง <small>(ระบุรายละเอียด)</small></div>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" class="mt-5">
                            <v-btn elevation="10" small color="#322E2B" style="color:white" :disabled="!formIsValid" type="submit">เพิ่มสถานที่สอน<span class="mdi mdi-plus"></span></v-btn>
                        </v-col>

                        <!-- <v-col cols="12" sm="6">
                        <v-slider v-model="form.age" :rules="rules.age" color="orange" label="Age" hint="Be honest" min="1"
                            max="100" thumb-label></v-slider>
                    </v-col> -->
                        <!-- <v-col cols="12">
                        <v-checkbox v-model="form.terms" color="green">
                            <template v-slot:label>
                                <div @click.stop="">
                                    Do you accept the
                                    <a href="#" @click.prevent="terms = true">terms</a>
                                    and
                                    <a href="#" @click.prevent="conditions = true">conditions?</a>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-col> -->
                    </v-row>
                </v-container>
                <v-card-actions>
                    <!-- <v-btn :disabled="!formIsValid" text color="primary" type="submit">
                        Add
                    </v-btn> -->
                    <!-- <v-btn text @click="resetForm"> Cancel </v-btn> -->
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-form>


            <v-dialog v-model="terms" width="70%">
                <v-card>
                    <v-card-title class="text-h6"> Terms </v-card-title>
                    <v-card-text v-for="n in 5" :key="n">
                        {{ content }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="purple" @click="terms = false"> Ok </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="conditions" width="70%">
                <v-card>
                    <v-card-title class="text-h6"> Conditions </v-card-title>
                    <v-card-text v-for="n in 5" :key="n">
                        {{ content }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="purple" @click="conditions = false"> Ok </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        const defaultForm = Object.freeze({
            first: "",
            last: "",
            bio: "",
            favoriteAnimal: "",
            age: null,
            terms: false,
        });

        return {
            form: Object.assign({}, defaultForm),
            rules: {
                // age: [(val) => val < 10 || `I don't believe you!`],
                // animal: [(val) => (val || "").length > 0 || "This field is required"],
                name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
            },
            animals: ["Online", "Onsite"],
            conditions: false,
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
            snackbar: false,
            terms: false,
            defaultForm,
        };
    },

    computed: {
        formIsValid() {
            return (
                this.form.first && this.form.bio
            );
        },
    },

    methods: {
        resetForm() {
            this.form = Object.assign({}, this.defaultForm);
            this.$refs.form.reset();
        },
        submit() {
            this.snackbar = true;
            this.save_data();

        },
        save_data() {
            const db = this.$fireModule.database();
            db.ref(`location/`).push({
                name: this.form.first,
                location: this.form.bio,
            }).then(() => {
                this.resetForm();
            }).catch((error) => {
                alert("บันทึกไม่สำเร็จ");
            });
        }
    },
};
</script>
