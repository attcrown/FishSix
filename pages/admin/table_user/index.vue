<template>
    <div>
        <div class="container text-center mb-3" style="background-color:rgba(189, 186, 186, 0.521)">
            <table_tea></table_tea>
            <!-- <status_student></status_student> -->
        </div>        
    </div>
</template>
<script>
    import status_student from './status_student.vue';
    import table_tea from './table_tea.vue';
   export default {
        data() {
            return {
                
            }
        },
        components:{
            status_student,
            table_tea
        }
   }
</script>