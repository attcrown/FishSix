<template>
  <v-app>
    <v-navigation-drawer v-model="drawer"  :width="drawerWidth" :max-width="drawerMaxWidth" 
    :mini-variant="miniVariant" :clipped-left="clipped"  fixed app color="#7C7C7C">
      <div class="text-center"><img :src="require('@/assets/fishsixLogo.png')" style="width: 75%;"></div>
      
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon class="text-dark">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-dark">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item to="/" router exact @click="getout()">
          <v-list-item-action>
            <v-icon >mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped="clipped" fixed app color="white" elevation="0" >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="dark" />
    
      <v-spacer />
      <p class=" dark">
        {{email}}
      </p>  
      <v-avatar class="ms-2">
        <img :src=profilePic alt="โปรไฟล์">
      </v-avatar>

      <v-btn icon to="/admin/basket" router exact>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>


    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'DashBoard',
          to: '/admin',
        },
        {
          icon: 'mdi-account-school',
          title: 'Teacher',
          to: '/admin/table_teacher',
        },
        {
          icon: 'mdi-account',
          title: 'Student',
          to: '/admin/table_user',
        },
        {
          icon: 'mdi-store',
          title: 'Shop',
          to: '/admin/shop',
        },
        {
          icon: 'mdi-store-settings',
          title: 'Edit-Shop',
          to: '/admin/edit_shop',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Candidate',
          to: '/admin/candidate',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
      status:"",
    }
  },
  mounted() {
    this.check();
  },
  methods: {
    check() {
      if (localStorage.getItem('firstName') == null && sessionStorage.getItem('firstName') == null) {
        this.getout();
      }
      if(sessionStorage.getItem('status') != 'admin'){
        this.getout();
      } else {
        if (localStorage.getItem('firstName') == null) {
          this.title = sessionStorage.getItem('firstName');
          this.status = sessionStorage.getItem('status');
        } else {
          this.title = localStorage.getItem('firstName');
          this.status = localStorage.getItem('status');
        }
      }
    },
    getout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
}
</script>

<style>
.input-container {
  display: flex;
  align-items: center;
}

.input-container .mdi {
  margin-right: 8px;
}

.large-icon {
  font-size: 24px;
}

.sheet-container {
  position: relative;
  top: 50%;
  transform: translateY(0%);
}
</style>

