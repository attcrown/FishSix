<template>
    <div>
        <button @click="write()">add</button>
        <button @click="deletedddd()">del</button>
        <button @click="readdata()">read</button>
    </div>
</template>
<script>
export default {
    layout: 'login',
    data() {
        return {
            item: { user: 'name', lastName: 'name', nickname: "Att" },

        }
    },
    mounted() {

    },
    methods: {
        generateRandomId(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charactersLength);
                result += characters.charAt(randomIndex);
            }

            return result;
        },

        readdata() {
            console.log('ทำงาน');
            const db = this.$fireModule.database();
            db.ref("test/").on("value", (snapshot) => {
                const childData = snapshot.val();
                console.log(childData);
                this.item = childData;
            })
        },
        write() {
            let id = this.generateRandomId(10);
            const db = this.$fireModule.database();
            db.ref(`test/`).set({
                [id]: this.item
            });
        },
        write_genID() {
            const db = this.$fireModule.database();
            db.ref("test/").push({
                date: 19,
                name: 'fff',
            });
        },
        deletedddd() {
            const db = this.$fireModule.database();
            db.ref(`test/`).remove();
        }
    }
}
</script>
