import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      // ตัวแปร state ที่คุณต้องการเก็บข้อมูล
      firstName: null,
      status: null,
      UserIdDetail: null,
      // อื่น ๆ
    },
    mutations: {
      // mutations สำหรับการเปลี่ยนแปลงค่าใน state (ถ้าจำเป็น)
      async setFirstName(state, value) {
        state.firstName = value;
      },
      async setStatus(state, value) {
        state.status = value;
      },
      async setUserIdDetail(state, value){
        state.UserIdDetail = value;
      }
      // อื่น ๆ
    },
  });
};

export default createStore;
