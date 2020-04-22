<template>
    <div id="app">
        <!--    <VueCanvasNest :config="{color:'0,255,255', count: 200}" :el="'#app'"></VueCanvasNest>-->
        <!--    <VueCanvasNest :config="{color:'255,0,255', count: 200}" :el="'#app'"></VueCanvasNest>-->
        <!--    <VueCanvasNest :config="{color:'255,255,0', count: 200}" :el="'#app'"></VueCanvasNest>-->
        <!--    <VueCanvasNest :config="{color:'128,128,0', count: 200}" :el="'#app'"></VueCanvasNest>-->
        <!--    <VueCanvasNest :config="{color:'0,120,128', count: 200}" :el="'#app'"></VueCanvasNest>-->
        <!--    <VueCanvasNest :config="{color:'128,0,128', count: 200}" :el="'#app'"></VueCanvasNest>-->
        <router-view v-if="isRouterAlive"/>
    </div>
</template>
<script>
    export default {
        components: {
            VueCanvasNest: () => import('vue-canvas-nest')
        },
        provide() {
            return {
                reload: this.reload
            };
        },
        data() {
            return {
                isRouterAlive: true
            };
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                });
            }
        },
        created() {
            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(
                    Object.assign(
                        {},
                        this.$store.state,
                        JSON.parse(sessionStorage.getItem("store"))
                    )
                );
                sessionStorage.clear();
            }

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("store", JSON.stringify(this.$store.state));
            });
        }
    };
</script>
