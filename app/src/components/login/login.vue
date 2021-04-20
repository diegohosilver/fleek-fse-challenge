<template>
	<div class="centered-container">
		<md-content class="md-elevation-3">
			<div class="title">
				<md-icon class="logo md-size-2x">vpn_key</md-icon>
				<div class="md-title">API Keys Manager</div>
				<div class="md-body-1">Enter your credentials to proceed</div>
			</div>

			<div class="form">
				<md-field>
					<label>E-mail</label>
					<md-input v-model="email" autofocus></md-input>
					<span class="md-error">Please enter your email!</span>
				</md-field>

				<md-field md-has-password>
					<label>Password</label>
					<md-input
						v-model="password"
						type="password"
					></md-input>
				</md-field>
			</div>

			<div class="actions md-layout md-alignment-center-space-between">
				<md-button class="md-raised md-primary" @click="authenticate">Sign in</md-button>
			</div>

			<div class="loading-overlay" v-if="isLoading">
				<md-progress-spinner
					md-mode="indeterminate"
					:md-stroke="2"
				></md-progress-spinner>
			</div>
		</md-content>
		<div class="background" />

		<notification ref="notification"></notification>
	</div>
</template>
<script>
	import Notification from "../notification/notification.vue";
	import { Utils } from "../../services/utils.js";

	export default {

		components: {
			Notification
		},

		computed: {

			isLoggedIn() {
				return Utils.hasValue(this.$store.state.user);
			},

			messageClass() {
				return {
					"md-invalid": this.hasErrors
				};
			}
		},

		data() {
			return {
				isLoading: false,
				hasErrors: false,
				email: "",
				password: ""
			};
		},

		methods: {

			async authenticate() {

				this.checkForErrors();
				
				if (this.hasErrors) {
					return this.$refs.notification.open({text: 'Email and password are required!'});
				}

				try {

					this.isLoading = true;

					await this.$user.signin(this.email, this.password);
				}
				catch(err){

					console.log(err);

					this.$refs.notification.open({text: 'An error ocurred while signin in. Please try again'})
				}
				finally {

					this.isLoading = false;
				}
			},

			checkForErrors() {
				if (!Utils.hasValue(this.email) || !Utils.hasValue(this.password)) {
					return this.hasErrors = true;
				}

				this.hasErrors = false;
			},

			tryRedirectToMain() {
				if (this.isLoggedIn) {
					this.$router.push("/main");
				}
			}
		},
		
		watch: {
			isLoggedIn: function() {
				this.tryRedirectToMain();
			}
		},

		created() {
			this.tryRedirectToMain();
		}
	};
</script>

<style lang="scss">
	.centered-container {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 100vh;
		.title {
			text-align: center;
			margin-bottom: 30px;
			img {
				margin-bottom: 16px;
				max-width: 80px;
			}
			.logo {
				color: greenyellow !important;
			}
		}
		.actions {
			.md-button {
				margin: 0;
			}
		}
		.form {
			margin-bottom: 60px;
		}
		.background {
			background-color: #448aff;
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 0;
		}
		.md-content {
			z-index: 1;
			padding: 40px;
			width: 100%;
			max-width: 400px;
			position: relative;
		}
		.loading-overlay {
			z-index: 10;
			top: 0;
			left: 0;
			right: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			background: rgba(255, 255, 255, 0.9);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
