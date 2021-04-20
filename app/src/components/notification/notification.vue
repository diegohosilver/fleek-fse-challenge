<template>
	<div class="notification">
		<md-snackbar
			:md-position="position"
			:md-duration="duration"
			:md-active.sync="active"
			md-persistent
		>
			<span>{{ text }}</span>
			<md-button
				v-if="hasAction"
				class="md-primary"
				@click="onCallback"
				>{{ callbackText }}</md-button
			>
		</md-snackbar>
	</div>
</template>
<script>
	import { Utils } from "../../services/utils.js";

	export default {
		props: {
			position: {
				type: String,
				default: "center"
			},
			duration: {
				type: Number,
				default: 4000
			}
		},
		data() {
			return {
				active: false,
				hasAction: false,
				callbackText: undefined,
				callback: undefined,
				text: undefined
			};
		},
		methods: {
			open({ action, text }) {
				if (Utils.hasValue(action)) {
					this.hasAction = true;
					this.callbackText = action.text;
					this.callback = Utils.ensureFunction(action.callback);
				}

				this.text = text;
				this.active = true;
			},
			onCallback() {
				this.callback();
				this.active = false;
			}
		}
	};
</script>
