<template>
	<div class="request-viewer">

		<template v-if="hasRequests">

			<md-table v-model="requests" md-card>
				<md-table-toolbar>
					<h1 class="md-title">Submitted requests</h1>
				</md-table-toolbar>

				<md-table-row
					slot="md-table-row"
					slot-scope="{ item }">
					<md-table-cell md-label="Key">{{item.key}}</md-table-cell>
					<md-table-cell md-label="Size">{{item.size}}</md-table-cell>
					<md-table-cell md-label="Date">{{formatAsFriendlyLong(item.date)}}</md-table-cell>
					<md-table-cell md-label="Status">
						<span v-if="item.status == 'accepted'">
							<md-icon>swap_horiz</md-icon>
							<md-tooltip md-direction="top">Accepted</md-tooltip>
						</span>
						<span v-else>
							<md-icon>do_not_disturb</md-icon>
							<md-tooltip md-direction="top">Rejected</md-tooltip>
						</span>
					</md-table-cell>
				</md-table-row>
			</md-table>

			<md-button
				class="md-raised md-primary get-requests"
				@click="getRequests">
				Get Requests
			</md-button>
		</template>

		<md-empty-state
			v-else
			md-icon="list"
			md-label="Requests with API keys"
			md-description="Any authenticated request against the proxy will show up here">
			<md-button
				class="md-raised md-primary get-requests"
				@click="getRequests">
				Get Requests
			</md-button>
		</md-empty-state>

		<md-progress-spinner
			v-show="isLoading"
			class="loader"
			md-mode="indeterminate"
			:md-diameter="20"
			:md-stroke="2">
		</md-progress-spinner>

		<notification ref="notification"></notification>
	</div>
</template>
<script>

import Notification from "../notification/notification.vue";
import { Utils } from "../../services/utils.js";
import { DateTime } from '../../services/datetime.js';

export default {

	components: { Notification },

	computed: {
		hasRequests() {
			return Utils.hasAny(this.requests);
		},
		requests() {
			return this.$store.state.requests;
		}
	},

	data() {
		return {
			isLoading: false,
			selected: []
		};
	},

	methods: {

		formatAsFriendlyLong(date) {

			let datetime = new DateTime(new Date(date));

			return datetime.formatAsFriendlyLong();
		},

		async getRequests() {

			try {
				this.isLoading = true;

				let requests = await this.$requests.list();

				this.$store.commit("set", { requests });
			} catch (err) {
				console.log(err);

				this.$refs.notification.open({
					text: "Something happened while trying to fetch requests"
				});
			} finally {
				this.isLoading = false;
			}
		}
	},

	async mounted() {

		await this.getRequests();
	}
}

</script>
<style lang="scss">
	.request-viewer {
		.get-requests {
			margin-top: 20px;
		}
		.loader {
			float: right;
			margin-top: 25px;
		}
	}
</style>