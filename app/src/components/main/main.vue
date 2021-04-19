<template>
  <div class="main-container">
    <md-app md-mode="fixed-last">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-icon class="logo">vpn_key</md-icon>
            <span class="md-title">API Keys Manager</span>
          </div>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <md-tabs>
          <md-tab id="tab-home" md-label="Home" md-icon="home">  
              
          </md-tab>
          <md-tab id="tab-keys" md-label="Manage Keys" md-icon="manage_accounts">
              <keys-manager></keys-manager>
          </md-tab>
        </md-tabs>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>

import KeysManager from '../keys-manager/keys-manager.vue';

export default {
  components: {
      KeysManager
  },
  data() {
    return {
      menuVisible: false,
    };
  },
};
</script>
<style lang="scss">
.main-container {
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, 0.12);
  }

  .md-toolbar-row {
    .logo {
      margin: 0 0 0 10px;
      color: greenyellow !important;
    }
  }
}
</style>