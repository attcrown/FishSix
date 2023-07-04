<template>
    <div>
        <span>{{ firstName }}</span>
        <span>{{ keyuser }}</span>
        <button @click="getout()">out</button>
    </div>
</template>
<script>
export default {
    layout: 'teacherNav',
    data() {
        return {
            firstName: 'ไม่มี',
            keyuser: 'ไม่มี',
        }
    },
    computed: {

    },
    mounted() {
        this.fullName();
    },
    methods: {
        getout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/login");
        },
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.firstName = sessionStorage.getItem('firstName') || '';
                this.keyuser = sessionStorage.getItem('lastName') || '';
            } else {
                this.firstName = localStorage.getItem('firstName') || '';
                this.keyuser = localStorage.getItem('lastName') || '';
            }
        },
    },
}
</script>