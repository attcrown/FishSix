export const myFunction1 = (a) => {
  console.log('เรียกใช้งาน myFunction1' + a)
}

// ฟังก์ชันที่สอง
export const myFunction2 = (a) => {
  console.log('เรียกใช้งาน myFunction2' + a)
}

export const myFunctionWithCallback = (valueToSend, callback) => {
  // ทำงานในฟังก์ชัน
  const result = valueToSend + 10
  // เรียกใช้งาน callback แล้วส่งค่าที่ต้องการกลับไป
  callback(result)
}

// นำเข้าทั้งหมดเป็น Object
export const myFunctions = {
  myFunction1,
  myFunction2,
  myFunctionWithCallback,
}
