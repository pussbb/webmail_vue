<template>
        <form class="form-signin rounded border" @submit.prevent="handleSubmit" v-onсe>
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
                <b-alert v-show="authStatus == 'error'" show variant="danger">Username or password invalid</b-alert>
            </div>

            <div class="form-label-group">
                <label for="inputEmail">Email address</label>
                <input type="email"
                       v-model="username"
                       id="inputEmail"
                       class="form-control"
                       placeholder="Email address"
                       required
                       autofocus
                       autocomplete>
            </div>

            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password"
                       autocomplete
                       v-model="password"
                       id="inputPassword"
                       class="form-control"
                       placeholder="Password"
                       required>
            </div>

            <!--<div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>-->
            <br>
            <b-button variant="primary" class="btn-lg btn-block"
                      v-bind:class="{ 'disabled': loading }"
                      type="submit">
                <b-spinner v-show="loading" small type="grow"></b-spinner>
                Sign in
            </b-button>
            <p class="mt-5 mb-3 text-muted text-center">&copy; 2019</p>
        </form>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "LoginPage",
        data () {
            return {
                username: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters('account', ['authStatus']),
            loading() {
                return this.authStatus === 'loading'
            }
        },
        methods: {
            ...mapActions('account', ['login']),
            handleSubmit() {
                const { username, password } = this;
                this.login({ username, password });
            }
        },

        watch: {
            // eslint-disable-next-line no-unused-vars
            authStatus(newValue, oldValue) {
                if (newValue === 'success') {
                    this.$router.push("/");
                }
            }
        }
    }
</script>

<style scoped>
    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 5% auto auto auto;
    }
</style>