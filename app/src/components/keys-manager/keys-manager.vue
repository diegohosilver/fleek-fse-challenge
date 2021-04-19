<template>
  <div class="keys-manager">

    <template v-if="hasKeys">

        <md-table v-model="keys" md-card @md-selected="onSelect">
        <md-table-toolbar>
            <h1 class="md-title">Current keys</h1>
        </md-table-toolbar>

        <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
            <div class="md-toolbar-section-start">
            {{ getAlternateLabel(count) }}
            </div>

            <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" @click="changeSelectedKeysState(true)">
                <md-icon>done</md-icon>
                <md-tooltip md-direction="top">Enable</md-tooltip>
            </md-button>
            <md-button class="md-icon-button" @click="changeSelectedKeysState(false)">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Disable</md-tooltip>
            </md-button>
            <md-button class="md-icon-button" @click="confirmDeleteSelectedKeys">
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="top">Delete</md-tooltip>
            </md-button>
            </div>
        </md-table-toolbar>

        <md-table-row
            slot="md-table-row"
            slot-scope="{ item }"
            md-selectable="multiple"
            md-auto-select>
            <md-table-cell md-label="Key"><input class="id-container" :type="[item.visible ? 'text' : 'password']" :value="item.id" readonly @click.stop></md-table-cell>
            <md-table-cell md-label="Toggle Visibility">
                <md-button class="md-icon-button" @click.stop="changeKeyVisibility(item, !item.visible)">
                    <template v-if="item.visible">
                        <md-icon>visibility_off</md-icon>
                        <md-tooltip md-direction="top">Hide</md-tooltip>
                    </template>
                    <template v-else>
                        <md-icon>visibility</md-icon>
                        <md-tooltip md-direction="top">Show</md-tooltip>
                    </template>
                </md-button>
            </md-table-cell>
            <md-table-cell md-label="Enabled">
                <md-icon :class="[item.enabled ? 'green' : 'red']">circle</md-icon>
            </md-table-cell>
            <md-table-cell md-label="Actions">
                <md-button class="md-icon-button" 
                        v-clipboard:copy="item.id"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    @click.stop>
                    <md-icon>content_copy</md-icon>
                    <md-tooltip md-direction="top">Copy</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" @click.stop="changeKeyState(item, !item.enabled)">
                    <template v-if="item.enabled">
                        <md-icon>close</md-icon>
                        <md-tooltip md-direction="top">Disable</md-tooltip>
                    </template>
                    <template v-else>
                        <md-icon>done</md-icon>
                        <md-tooltip md-direction="top">Enable</md-tooltip>
                    </template>
                </md-button>
                <md-button class="md-icon-button" @click.stop="confirmDeleteKey(item)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Delete</md-tooltip>
                </md-button>
            </md-table-cell>
        </md-table-row>
        </md-table>

        <md-button class="md-raised md-primary add-key" @click="generateKey">
            Generate Key
        </md-button>

    </template>
    
    <md-empty-state v-else
      md-icon="vpn_key"
      md-label="Create your first API key"
      md-description="Creating an API key, you'll be able send requests to the IPFS instance by using our proxy.">
        <md-button class="md-raised md-primary add-key" @click="generateKey">
            Generate Key
        </md-button>
    </md-empty-state>

    <confirmation ref="confirmationDialog"></confirmation>
    <notification ref="notification"></notification>
  </div>  
</template>
<script>

import Confirmation from '../confirmation/confirmation.vue';
import Notification from '../notification/notification.vue';
import {Utils} from '../../services/utils.js';

export default {
  components: {Confirmation, Notification},
  computed: {
    hasKeys() {

        return Utils.hasAny(this.keys);
    },
    keys() {

      return this.$store.state.keys;
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onSelect(items) {

      this.selected = items;
    },
    onCopy() {
        this.$refs.notification.open({text: 'API key copied to the clipboard!'});
    },
    onError() {
        this.$refs.notification.open({text: 'Yikes! Something happened when trying to copy the API key to the clipboard. Please try again or do it manually.'});
    },
    getAlternateLabel(count) {

      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} key${plural} selected`;
    },
    generateKey() {

        let id = Utils.id();
        let enabled = true;
        let visible = false;

        this.$store.commit('merge', {keys: [{id, enabled, visible}]});
    },
    changeKeyVisibility(key, visibility) {

        key.visible = visibility;

        this.$store.commit('merge', {keys: [key]});
    },
    changeKeyState(key, state) {

        key.enabled = state;

        this.$store.commit('merge', {keys: [key]});
    },
    changeSelectedKeysState(state) {

        let changes = [];

        this.selected.forEach(key => {

            key.enabled = state;

            changes.push(key);
        });

        this.$store.commit('merge', {keys: changes});
    },
    confirmDeleteKey(key) {

        this.$refs.confirmationDialog.open({title: 'Delete this key?', 
                                            content: 'Are you sure you want to <b>delete</b> this key? This action is <b>irreversible</b>',
                                            data: key,
                                            onConfirm: () => { this.deleteKey(key) }});
    },
    deleteKey(key) {

        let remaining = this.keys.filter(x => x.id != key.id);

        this.$store.commit('set', {keys: remaining});
    },
    confirmDeleteSelectedKeys() {

        this.$refs.confirmationDialog.open({title: 'Delete selected keys?', 
                                            content: 'Are you sure you want to <b>delete</b> the selected keys? This action is <b>irreversible</b>',
                                            onConfirm: this.deleteSelectedKeys});
    },
    deleteSelectedKeys() {

        let remaining = this.keys.filter(x => !this.selected.map(s => s.id).includes(x.id));

        this.$store.commit('set', {keys: remaining});
    }
  },
};
</script>
<style lang="scss">
.keys-manager {
    .green {
        color: greenyellow !important;
    }
    .red {
        color: red !important;
    }
    .add-key {
        margin-top: 20px;
    }
    .id-container {
        border: none;
        background: transparent;
        font-size: 15px;
        width: 100%;
    }
}
</style>