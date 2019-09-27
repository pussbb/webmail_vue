<template>
    <div v-once>
        <form @submit.prevent="handleSubmit" class="form-signin rounded border">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
                <b-alert show v-show="authStatus === 'error'" variant="danger">Username or password invalid</b-alert>
            </div>

            <div class="form-label-group">
                <label for="inputEmail">Email address</label>
                <input autocomplete
                       autofocus
                       class="form-control"
                       id="inputEmail"
                       placeholder="Email address"
                       required
                       type="email"
                       v-model="username">
            </div>

            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input autocomplete
                       class="form-control"
                       id="inputPassword"
                       placeholder="Password"
                       required
                       type="password"
                       v-model="password">
            </div>

            <!--<div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>-->
            <br>
            <b-button class="btn-lg btn-block" type="submit"
                      v-bind:class="{ 'disabled': loading }"
                      variant="primary">
                <b-spinner small type="grow" v-show="loading"></b-spinner>
                Sign in
            </b-button>
            <p class="mt-5 mb-3 text-muted text-center">&copy; 2019</p>
        </form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "LoginPage",
        data() {
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
                const {username, password} = this;
                this.login({username, password});
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