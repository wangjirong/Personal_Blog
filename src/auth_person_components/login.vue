<template>
    <div id="login" class="background flex-vertical cover-size fixed">
        <div class="cover-bg">
            <img src="" alt="" id="login-bg">
        </div>
        <div class="container flex-column-start">
            <input type="text" placeholder="请输入用户名" class="userName" v-model="manager.userName"/>
            <input type="password" placeholder="请输入密码" class="pwd" v-model="manager.password"/>
            <div class="verificationCode">
                <input type="text" placeholder="请输入验证码" v-model="inputCode"/>
                <span @click="getaVerificationCode" class="font-center">{{verificationCode}}</span>
            </div>
            <div class="loginRegister flex-vertical">
                <button @click="register">注册</button>
                <button @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {getVerificationCode, getBgCoverImg} from "../JS/publicFunction";
    import {setBackgroundByWidth} from "../JS/setBackgroundImage";
    import jwtDecode from "jwt-decode";

    export default {
        name: "login",
        data() {
            return {
                verificationCode: "",
                manager: {
                    userName: "",
                    password: ""
                },
                inputCode: ""
            };
        },
        methods: {
            register() {
                this.$router.push("/auth_personal/register");
            },
            async login() {
                if (this.manager.userName === "") Message.warning("用户名不能为空！");
                if (this.manager.password === "") Message.warning("密码不能为空！");
                if (this.manager.inputCode === "") Message.warning("验证码不能为空！");
                if (this.inputCode != this.verificationCode) {
                    Message.warning("验证码错误，请重新输入！");
                    this.verificationCode = await getVerificationCode();
                } else {
                    const res = await this.$axios.post("/api/manager/login", this.manager);
                    const eleToken = res.data.eleToken;
                    const manager = await jwtDecode(eleToken);
                    sessionStorage.setItem("eleToken", eleToken);
                    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)_ci_ve_\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    // if (!token)
                        // document.cookie = `_cir_ve_=${eleToken}`
                    this.$store.dispatch("setManager", manager);
                    Message.success("登录成功！");
                    this.$router.push("/auth_personal/manage");
                }
            },
            async getaVerificationCode() {
                this.verificationCode = await getVerificationCode();
            }
        },
        async created() {
            this.verificationCode = await getVerificationCode();
        },
        mounted() {
            this.$nextTick(() => {
                const bigImageURL = getBgCoverImg("PC/Manage", `LoginPage_big_bg_img.jpg`);
                const smallImageURL = getBgCoverImg(
                    "Mobile/Manage",
                    `LoginPage_small_bg_img.jpg`
                );
                setBackgroundByWidth("login-bg", bigImageURL, smallImageURL);
            });
        }
    };
</script>

<style lang="less" scoped>
    #login {
        .container {
            opacity: 0.8;

            .userName,
            .pwd {
                padding: 0.1rem 0.2rem;
                margin-bottom: 0.1rem;
                width: 20vw;
                border: 1px solid #fff;
                border-radius: 5px;
                font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
                "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
            }

            .verificationCode {
                display: inline-flex;
                margin-bottom: 0.1rem;
                width: 100%;

                input {
                    padding: 0.05rem 0.1rem;
                    width: 12vw;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
                    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
                    margin-right: 0.2rem;
                }

                span {
                    padding: 0.5em 1.5em;
                    background-color: lightgreen;
                    color: #fff;
                    font-size: 1.5em;
                    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
                    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            .loginRegister {
                width: 100%;

                button {
                    padding: 0.5em 2em;
                    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
                    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
                    font-size: 0.18rem;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    margin: 0 2em;

                    &:hover {
                        background-color: lime;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>