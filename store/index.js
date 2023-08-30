import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      // ตัวแปร state ที่คุณต้องการเก็บข้อมูล
      firstName: null,
      status: null,
      // อื่น ๆ
    },
    mutations: {
      // mutations สำหรับการเปลี่ยนแปลงค่าใน state (ถ้าจำเป็น)
      setFirstName(state, value) {
        state.firstName = value;
      },
      setStatus(state, value) {
        state.status = value;
      },
      // อื่น ๆ
    },
  });
};

export default createStore;
