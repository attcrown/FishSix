<template>
    <div>
        <div>
            MOBILE
        </div>



        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
export default {
    data: () => ({
        overlay: false,
    }),

    watch: {
        
    },
}
</script>