<template>
	<div class="confirmation">
		<md-dialog-confirm
			:md-active.sync="active"
			:md-title="title"
			:md-content="content"
			:md-confirm-text="agreeText"
			:md-cancel-text="cancelText"
			@md-cancel="onCancel"
			@md-confirm="onConfirm"
		/>
	</div>
</template>
<script>
	import { Utils } from "../../services/utils.js";

	export default {

		props: {
			agreeText: {
				type: String,
				default: "Yes"
			},
			cancelText: {
				type: String,
				default: "No"
			}
		},

		data() {
			return {
				title: undefined,
				content: undefined,
				confirmCallback: undefined,
				cancelCallback: undefined,
				active: false
			};
		},

		methods: {

			open({ title, content, onConfirm, onCancel }) {
				this.title = title;
				this.content = content;
				this.confirmCallback = Utils.ensureFunction(onConfirm);
				this.cancelCallback = Utils.ensureFunction(onCancel);
				this.active = true;
			},

			onConfirm() {
				this.confirmCallback();
				this.active = false;
			},
			
			onCancel() {
				this.cancelCallback();
				this.active = false;
			}
		}
	};
</script>