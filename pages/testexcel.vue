<template>
    <div>
        <v-btn @click="exportToExcel">Excel</v-btn>
    </div>
</template>
  
<script>
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
    layout:'login',
    // ...
    methods: {
        exportToExcel() {
            // ข้อมูลที่ต้องการส่งออกเป็น Excel
            const data = [
                ['Name', 'Age', 'Email'],
                ['John Doe', 30, 'john@example.com'],
                ['Jane Smith', 25, 'jane@example.com'],
                // เพิ่มข้อมูลอื่นๆ ตามต้องการ
            ];

            // สร้างเอกสาร Excel
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

            // แปลงข้อมูลให้เป็นรูปแบบไฟล์ Excel
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // สร้าง Blob และบันทึกไฟล์
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'data.xlsx');
        }
    },
};
</script>