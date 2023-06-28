<template>
    <div>
        <button @click="write()">add</button>
        <button @click="deletedddd()">del</button>
        <button @click="readdata()">read</button>
    </div>
</template>
<script>
export default {
    layout:'session',
    data() {
        return {
            item:[],
            
        }
    },
    mounted(){
        
    },
    methods: {
        readdata(){
            console.log('ทำงาน');
            const db = this.$fireModule.database();
            db.ref("test/").on("value", (snapshot) => {
                const childData = snapshot.val();
                console.log(childData);
                this.item = childData;
            })
        },
        write(){
            const db = this.$fireModule.database();
            db.ref("test/").set({
            date: 19,
            name: 'fff',
            });
        },
        deletedddd(){
            const db = this.$fireModule.database();
            db.ref(`test/`).remove();
        }
    }
}
</script>