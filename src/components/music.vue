<template>
    <!-- 指定 lrcType 为 0，表示禁用歌词 -->
    <aplayer :audio="audio" :lrcType="3" ref="aplayer"  />
</template>

<script>
    import Vue from 'vue';
    import APlayer from '@moefe/vue-aplayer';

    Vue.use(APlayer);

    export default {
        data() {
            return {
                audio: {
                    name: '易燃易爆炸~陈粒',
                    artist: '青春有你',
                    url: 'https://erics-bucket.oss-cn-beijing.aliyuncs.com/Home_Bg_Music/src/%E6%98%93%E7%87%83%E6%98%93%E7%88%86%E7%82%B8%20-%20%E9%99%88%E7%B2%92.flac',
                    cover: 'https://erics-bucket.oss-cn-beijing.aliyuncs.com/Home_Bg_Music/pic/avatar1.jpg',
                    lrc: 'https://erics-bucket.oss-cn-beijing.aliyuncs.com/Home_Bg_Music/src/%E6%98%93%E7%87%83%E6%98%93%E7%88%86%E7%82%B8%20-%20%E9%99%88%E7%B2%92.lrc'
                },
            };
        },
    };
</script>