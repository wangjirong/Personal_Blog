<template>
    <div id="detailBlog" class="background">
        <div class="cover-bg">
            <img src="" alt="" id="detailBlog-bg">
        </div>
        <div class="box">
            <div class="navheader flex-space-between">
                <h2 class="art-title">
                    <h1 class="title">
                        {{blog.title}}
                        <i class="el-icon-video-play" v-show="!isPlay" @click="playMusic"></i>
                        <i class="el-icon-video-pause" v-show="isPlay" @click="pauseMusic"></i>
                    </h1>
                    <h4 class="author">
                        <span>作者:Ericzzz</span>
                        <span>更新于{{blog.DetailTime}}</span>
                    </h4>
                </h2>
                <h3 class="dateDay">
                    <h1>{{blog.justDay}}</h1>
                    <h2>{{blog.justYearMonth}}</h2>
                </h3>
            </div>

            <!-- <div class="context markdown-body" v-html="context"></div>不解析成htmlDOM，直接展示MD -->
            <mavon-editor
                    v-model="blog.md"
                    :editable="false"
                    :toolbarsFlag="false"
                    defaultOpen="preview"
                    :ishljs="true"
                    :subfield="false"
                    codeStyle="tomorrow-night"
                    :scrollStyle="false"
                    :boxShadow="false"
                    previewBackground="#fff"
            />
            <div class="state">
                <ul class="flex-column-start">
                    <li>
                        <span>非特殊说明，本文版权归 Ericzz 所有，转载请注明出处</span>
                    </li>
                    <li>
                        <span>本文标题:{{blog.title}}</span>
                    </li>
                    <li>
            <span>
              本文网址:
              <a :href="href">{{href}}</a>
            </span>
                    </li>
                    <li>
                        <audio src="../../assets/music/蔡妍 (채연) - 最美的期待.flac" id="music"></audio>
                    </li>
                </ul>
            </div>
            <aplayer @hook:mounted="getAudio" ref="aplayer"></aplayer>
            <div class="expandRead flex-column-left">
                <span class="expandTitle">扩展阅读</span>
                <div class="expandItem flex-vertical-start" v-for="item in expandReadList" :key="item.id">
                    <i class="el-icon-link"></i>
                    <a :href="item.href">{{item.title}}</a>
                </div>
            </div>
            <div class="awesome">
                <ul class="svg-group flex-vertical">
                    <li class="svg-item">
                        <svg
                                t="1585378071557"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1817"
                                width="50"
                                height="50"
                        >
                            <path
                                    d="M674.5 748.4H419.8c-24.7 0-45.5-20.3-45.5-44.3V445.7c0-20.3 15.6-28 23.1-31.7l0.5-0.3c35.4-22.1 61.7-49.5 78.2-81.6l0.2-0.4c7.3-13.5 10.6-28.9 14.1-45.2 7.9-37.4 14.8-69.7 64.8-69.7 24 0 40.1 11 48 32.6l1.4 3.7v0.2c7.2 22.7 5.7 55.7-4.3 91.6-10 35.8-26.3 67.2-43.6 84-2 2.1-2.2 3.6-1.9 5 1.7 1.7 6.6 4.3 11.4 4.3h159.9c10.4 0 25.5 1.5 36.2 14.6l0.7 0.8 0.6 0.9c6.1 9.2 8.3 19.2 6.7 30.6l-0.1 1-0.2 1c-20.9 88.2-49 211.1-51.4 221.7v0.2c-4.4 21.5-24.5 39.4-44.1 39.4z m-255.6-45.1c0.3 0.2 0.7 0.5 0.9 0.5h252.4c1-0.8 2-2.1 2.4-3l0.2-0.9c0.3-1.2 28.6-125.3 50.3-216.8H566.2c-22.7 0-44.8-13.1-52.5-31.1l-0.4-1.1c-7.1-18.9-2.7-38.9 11.9-53.5l0.3-0.3c9.5-9.1 22.9-32.4 31.7-63.9 9.4-33.9 8.2-57.6 4.2-67.6l-0.9-2.3c-0.3-0.6-0.5-0.9-0.6-1.1-0.5-0.2-2-0.5-4.8-0.5-3.8 0-10.4 0.3-11.7 2-3.6 4.9-6.9 20.8-9.4 32.3-3.8 17.8-8.1 37.9-18.3 56.9-20.3 39.5-52.3 72.9-95 99.4l-1 0.6-0.8 0.4v250z"
                                    fill="#d81e06"
                                    p-id="1818"
                            />
                            <path
                                    d="M369.9 748.4H305c-27 0-48.9-21.9-48.9-48.9V465c0-27 21.9-48.9 48.9-48.9h64.9c27 0 48.9 21.9 48.9 48.9v234.5c0 27-21.9 48.9-48.9 48.9zM305 460.8c-2.3 0-4.2 1.9-4.2 4.2v234.5c0 2.3 1.9 4.2 4.2 4.2h64.9c2.3 0 4.2-1.9 4.2-4.2V465c0-2.3-1.9-4.2-4.2-4.2H305z"
                                    fill="#d81e06"
                                    p-id="1819"
                            />
                            <path
                                    d="M513.5 957.6c-60.3 0-118.8-11.8-173.9-35-53.2-22.4-101-54.5-142-95.4-41-40.9-73.2-88.5-95.7-141.5-23.3-54.9-35.1-113.2-35.1-173.3S78.6 394 101.9 339.1c22.5-53 54.7-100.6 95.7-141.5 41-40.9 88.8-73 142-95.4 55.1-23.2 113.6-35 173.9-35s118.8 11.8 173.9 35c53.2 22.4 101 54.5 142 95.4 41 40.9 73.2 88.5 95.7 141.5 23.3 54.9 35.1 113.2 35.1 173.3s-11.8 118.4-35.1 173.3c-22.5 53-54.7 100.6-95.7 141.5-41 40.9-88.8 73-142 95.4-55.1 23.2-113.6 35-173.9 35z m0-845.7c-221.7 0-402 179.7-402 400.5s180.4 400.5 402 400.5c221.7 0 402-179.7 402-400.5s-180.3-400.5-402-400.5z"
                                    fill="#d81e06"
                                    p-id="1820"
                            />
                        </svg>
                    </li>
                    <li class="svg-item">
                        <svg
                                t="1585377973775"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1298"
                                width="50"
                                height="50"
                        >
                            <path
                                    d="M512 67C266.265 67 67 266.262 67 512.008 67 757.753 266.236 956.985 512 957c245.735-0.015 445-199.262 445-445.007C957 266.247 757.764 67 512 67zM512 927.319c-229.019 0-415.333-186.297-415.333-415.312 0-229.03 186.314-415.342 415.333-415.313 229.019-0.015 415.334 186.282 415.334 415.313C927.334 741.022 741.019 927.319 512 927.319z"
                                    fill="#1296db"
                                    p-id="1299"
                            />
                            <path
                                    d="M731.038 495.117c-24.583-16.991-37.04-41.153-37.04-71.818 0-134.846-108.846-183.792-181.998-183.792s-181.998 48.946-181.998 183.792c0 30.665-12.457 54.827-37.055 71.833-18.411 12.762-60.84 63.389-36.344 143.261l2.824 9.242 9.561-1.521c18.976-3.014 28.929-19.918 34.433-29.841 4.549 19.077 22.945 36.678 35.432 44.326 1.261 0.782 2.13 1.637 2.709 2.36-0.507 0.087-1.13 0.16-1.897 0.203-13.718 0.695-31.317 9.546-38.372 25.133-5.215 11.486-3.332 23.813 5.302 34.721 23.365 29.507 86.826 31.796 105.73 31.796 27.74 0 50.96-5.649 69.024-16.774 2.868-1.781 5.403-3.592 7.837-5.345 7.04-5.085 11.284-8.155 22.814-8.155s15.774 3.07 22.814 8.155c2.434 1.753 4.969 3.563 7.837 5.345 18.064 11.125 41.284 16.774 69.025 16.774 18.903 0 82.365-2.289 105.729-31.796 8.634-10.907 10.517-23.234 5.302-34.721-7.054-15.587-24.654-24.438-38.386-25.133-0.769-0.043-1.377-0.116-1.884-0.203 0.565-0.724 1.449-1.578 2.694-2.347 12.501-7.662 30.897-25.263 35.446-44.34 5.504 9.923 15.457 26.827 34.433 29.841l9.561 1.521 2.824-9.242C791.893 558.521 749.464 507.894 731.038 495.117zM749.493 619.084c-4.259-4.201-7.547-10.14-10.039-14.659-0.984-1.782-1.854-3.347-2.65-4.621-3.129-4.969-11.676-14.369-21.671-14.369-4.172 0-8.025 1.637-10.864 4.62-3.694 3.883-5.302 9.488-4.911 17.137 0.565 11.183-14.674 27.595-25.856 34.461-10.647 6.548-16.065 17.687-13.501 27.711 2.404 9.415 11.082 15.412 23.192 16.021 7.503 0.377 16.498 6.026 19.251 12.096 1.058 2.347 1.955 6.112-2.478 11.719-12.776 16.137-53.554 23.364-88.289 23.364-23.555 0-42.85-4.533-57.35-13.471-2.375-1.464-4.461-2.984-6.489-4.433-8.012-5.809-17.108-12.371-35.838-12.371s-27.826 6.563-35.838 12.371c-2.028 1.448-4.114 2.969-6.489 4.433-14.5 8.938-33.795 13.471-57.349 13.471-34.736 0-75.514-7.228-88.29-23.364-4.433-5.606-3.534-9.372-2.478-11.719 2.753-6.069 11.733-11.719 19.237-12.096 12.124-0.608 20.802-6.605 23.206-16.021 2.564-10.039-2.854-21.163-13.516-27.726-11.168-6.852-26.407-23.264-25.842-34.446 0.391-7.663-1.217-13.254-4.91-17.137-2.84-2.983-6.692-4.62-10.864-4.62-9.995 0-18.543 9.4-21.7 14.398-0.768 1.245-1.637 2.81-2.622 4.592-2.491 4.52-5.78 10.458-10.039 14.659-15.499-70.936 30.624-105.324 31.116-105.657 38.546-26.668 46.629-63.735 46.629-90.128 0-127.776 104.5-161.542 159.748-161.542s159.748 33.766 159.748 161.542c0 26.393 8.083 63.46 46.614 90.113C718.869 513.76 764.992 548.148 749.493 619.084z"
                                    fill="#1296db"
                                    p-id="1300"
                            />
                        </svg>
                    </li>
                    <li class="svg-item">
                        <svg
                                t="1585378033393"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1561"
                                width="50"
                                height="50"
                        >
                            <path
                                    d="M863.20585 554.491767c0-86.171592-89.49836-156.024519-200.098317-156.02452-110.496603 0-200.098317 69.852928-200.098317 156.02452 0 85.651752 88.563058 155.089218 198.227713 155.920142 47.711652 80.247672 91.473341 64.863287 91.473341 64.863286s-34.094516-22.660092-37.629015-70.164012c85.34169-17.878183 148.124596-78.479399 148.124595-150.619416z m-266.623453-24.322965c-12.889565 0-23.387663-10.499122-23.387663-23.387664 0-12.889565 10.499122-23.387663 23.387663-23.387663 12.889565 0 23.387663 10.498098 23.387663 23.387663 0 12.888542-10.498098 23.387663-23.387663 23.387664z m128.166032 0c-12.992919 0-23.387663-10.499122-23.387664-23.387664 0-12.889565 10.394744-23.387663 23.387664-23.387663 12.889565 0 23.284309 10.498098 23.284309 23.387663 0 12.888542-10.393721 23.387663-23.284309 23.387664z"
                                    fill="#1afa29"
                                    p-id="1562"
                            />
                            <path
                                    d="M638.785591 371.232976c-33.5757-73.698512-124.529201-126.607536-231.594658-126.607536-135.651516 0-245.627257 84.925205-245.627257 189.599196 0 89.706091 80.767512 164.859745 189.183733 184.5062-2.079358 62.056358-46.567595 91.681072-46.567595 91.681073s56.131415 19.854187 116.317169-86.588078c0 0-0.312108-0.103354-0.830925-0.207731 11.329023-0.51984 22.556739-1.559519 33.4703-3.118014-14.552437-23.076578-22.76447-48.959062-22.76447-76.402087-0.002047-92.095511 92.096535-167.353542 208.413703-172.863023z m-304.877709 31.28861c-17.151635 0-30.976502-13.824867-30.976501-30.871101 0-17.151635 13.824867-30.976502 30.976501-30.976502 17.047258 0 30.871101 13.824867 30.871102 30.976502 0.001023 17.045211-13.82282 30.871101-30.871102 30.871101z m124.944664-30.872124c0-17.151635 13.824867-30.976502 30.976502-30.976502 17.047258 0 30.871101 13.824867 30.871101 30.976502 0 17.047258-13.823843 30.871101-30.871101 30.871101-17.151635 0.001023-30.976502-13.824867-30.976502-30.871101z"
                                    fill="#1afa29"
                                    p-id="1563"
                            />
                            <path
                                    d="M512 64.050782c60.495816 0 119.153774 11.836583 174.345794 35.181267 53.335742 22.558785 101.245915 54.864562 142.401244 96.01989s73.461105 89.066525 96.01989 142.401244c23.344684 55.19202 35.181267 113.851001 35.181267 174.345794 0 60.494793-11.836583 119.153774-35.181267 174.345793-22.558785 53.334719-54.864562 101.245915-96.01989 142.401244s-89.066525 73.461105-142.401244 96.019891c-55.19202 23.344684-113.851001 35.181267-174.345794 35.181267s-119.153774-11.836583-174.345794-35.181267c-53.335742-22.558785-101.245915-54.864562-142.401244-96.019891S121.791857 739.679489 99.233072 686.34477c-23.344684-55.19202-35.181267-113.851001-35.181267-174.345793 0-60.495816 11.836583-119.153774 35.181267-174.345794 22.558785-53.335742 54.864562-101.245915 96.01989-142.401244s89.066525-73.461105 142.401244-96.01989c55.19202-23.344684 113.849978-35.181267 174.345794-35.181267m0-51.16531c-275.653107 0-499.114528 223.461421-499.114528 499.114528S236.346893 1011.114528 512 1011.114528s499.114528-223.461421 499.114528-499.114528S787.653107 12.885472 512 12.885472z"
                                    fill="#1afa29"
                                    p-id="1564"
                            />
                        </svg>
                    </li>
                    <li class="svg-item">
                        <svg
                                t="1585378058987"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1690"
                                width="50"
                                height="50"
                        >
                            <path
                                    d="M512 12.672c-282.88 0-512 229.248-512 512 0 226.261333 146.688 418.133333 350.08 485.76 25.6 4.821333 34.986667-11.008 34.986667-24.618667 0-12.16-0.426667-44.373333-0.64-87.04-142.421333 30.890667-172.458667-68.693333-172.458667-68.693333C188.672 770.986667 155.008 755.2 155.008 755.2c-46.378667-31.744 3.584-31.104 3.584-31.104 51.413333 3.584 78.421333 52.736 78.421333 52.736 45.653333 78.293333 119.850667 55.68 149.12 42.581333 4.608-33.109333 17.792-55.68 32.426667-68.48-113.706667-12.8-233.216-56.832-233.216-253.013333 0-55.893333 19.84-101.546667 52.693333-137.386667-5.76-12.928-23.04-64.981333 4.48-135.509333 0 0 42.88-13.738667 140.8 52.48 40.96-11.392 84.48-17.024 128-17.28 43.52 0.256 87.04 5.888 128 17.28 97.28-66.218667 140.16-52.48 140.16-52.48 27.52 70.528 10.24 122.581333 5.12 135.509333 32.64 35.84 52.48 81.493333 52.48 137.386667 0 196.693333-119.68 240-233.6 252.586667 17.92 15.36 34.56 46.762667 34.56 94.72 0 68.522667-0.64 123.562667-0.64 140.202666 0 13.44 8.96 29.44 35.2 24.32C877.44 942.592 1024 750.592 1024 524.672c0-282.752-229.248-512-512-512"
                                    fill="#1296db"
                                    p-id="1691"
                            />
                        </svg>
                    </li>
                </ul>
            </div>
            <div class="comment .flex-column-start">
                <h3 class="header">发表评论</h3>
                <textarea placeholder="发表你的评论吧！" v-model="myComment.text"></textarea>
                <button @click="sendComment">提交留言</button>
            </div>
        </div>
        <div class="comments">
            <Comment v-for="comment in comments" :key="comment.id" :comment="comment"></Comment>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {handleItem, handleList, getBgCoverImg} from "../../JS/publicFunction";
    import {setBackgroundByWidth} from "../../JS/setBackgroundImage";
    import Aplayer from '@moefe/vue-aplayer'

    export default {
        name: "detailBlog",
        inject: ["reload"],
        data() {
            return {
                isPlay: true,
                _id: "",
                href: "",
                blog: "",
                context: "",
                myComment: {
                    userId: this.$store.state.user.id,
                    text: "",
                },
                audio: this.$refs.aplayer,
                comments: [],
                expandReadList: [
                    {
                        title: "经典排序算法（一）",
                        href: "http://cirev.cn/menu/detailBlog?id=5e917250efaa7445269da4e1"
                    },
                    {
                        title: "经典排序算法（二）",
                        href: "http://cirev.cn/menu/detailBlog?id=5e917843efaa7445269da4e4"
                    }
                ] //延申阅读，两篇文章，只需要title和href
            };
        },
        components: {
            Comment: () => import("../../components/Comment"),
            aplayer: () => import('../../components/music')
        },
        methods: {
            async getDetailBlog() {
                this._id = this.$route.query.id;
                this.href = `http://cirev.cn/menu/detailBlog?id=${this._id}`;
                const res = await this.$axios.get(`/api/blog/detailBlog`, {
                    params: {
                        _id: this._id
                    }
                });
                this.blog = handleItem(res.data, res.data.date);
            },
            playMusic() {
                this.audio.play();
            },
            pauseMusic() {
                this.audio.pause();
            },
            async sendComment() {
                if (!this.myComment.userId) Message.error("请先登录");
                else if (!this.myComment.text) Message.warning("请输入内容");
                else {
                    const res = await this.$axios.post(
                        `/api/comment/sendComment?article_id=${this._id}`,
                        this.myComment
                    );
                    Message.success("评论成功");
                    this.reload();
                }
            },
            async getAllComments() {
                const res = await this.$axios.get(
                    `/api/comment/getAllComments?article_id=${this._id}`
                );
                this.comments = handleList(res.data);
            },
            getAudio() {
                this.audio = this.$refs.aplayer;
                console.log(this.audio)
            }
        },
        created() {
            this.getDetailBlog();
            this.getAllComments();
        },
        mounted() {
            this.$nextTick(() => {
                const bigImageURL = getBgCoverImg(
                    "PC/Menu",
                    `detailBlogPage_big_bg_img.jpg`
                );
                const smallImageURL = getBgCoverImg(
                    "Mobile/Menu",
                    `detailBlogPage_small_bg_img.jpg`
                );
                setBackgroundByWidth("detailBlog-bg", bigImageURL, smallImageURL);
                // this.$refs.aplayer.showLrc();

            });

        },

    };
</script>
<style lang="less" scoped>
    #detailBlog {
        background: url("../../assets/img/detail_bg.jpg");
        width: 100vw;

        .box {
            width: 80vw;
            margin: 1rem auto;
            margin-bottom: 5em;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 6px;
            padding: 0.2rem 0.3rem;

            .navheader {
                margin-bottom: 0.1rem;
                border-bottom: 1px solid #ccc;

                h2.art-title {
                    h1.title {
                        font-size: 0.18rem;
                        font-family: "Times New Roman", Times, serif;

                        i {
                            font-size: 0.18rem;
                            font-family: "Times New Roman", Times, serif;

                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }

                    h4.author {
                        padding: 0.1rem;

                        span {
                            font-size: 0.14rem;
                            margin: 0.15rem;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                    }
                }

                h3.dateDay {
                    text-align: center;

                    h1 {
                        font-size: 0.35rem;
                        color: limegreen;
                        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
                        sans-serif;
                    }

                    h2 {
                        font-size: 0.18rem;
                        color: #444;
                        font-family: "Courier New", Courier, monospace;
                    }
                }
            }

            .context {
                padding: 1em;
                border-bottom: 1px solid #ccc;
                overflow: hidden;
                z-index: 0;
            }

            .state {
                ul {
                    margin-top: 0.2rem;

                    li {
                        margin: 0.5em 0;

                        span {
                            font-size: 0.14rem;

                            a {
                                color: #000;

                                &:hover {
                                    text-decoration: overline;
                                    color: blue;
                                }
                            }
                        }
                    }
                }
            }

            .expandRead {
                margin-top: 1em;

                .expandTitle {
                    width: 100%;
                    padding: 0.5em 1em;
                    background: rgb(192, 192, 192, 0);
                    color: #fff;
                    border-left: 5px solid lime;
                    margin-bottom: 1em;
                }

                .expandItem {
                    padding: 0.5em 1em;

                    a, i {
                        color: #3e8bc7;
                    }

                    a {
                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    i {
                        padding: 0 .3em;
                    }

                }
            }

            .awesome {
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                padding: 2em;

                ul.svg-group {
                    li.svg-item {
                        margin: 0 1em;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
            }

            .comment {
                padding: 2em;

                .header {
                    font-size: 0.18rem;
                }

                textarea {
                    height: 8em;
                    width: 100%;
                    margin: 1em 0;
                    border-radius: 5px;
                    text-indent: 2em;
                    padding: 0.5em 0;
                }

                button {
                    padding: 0.5em 1em;
                    border-radius: 3px;
                    background-color: darkred;
                    color: #fff;
                    border: none;

                    &:hover {
                        background-color: lime;
                        outline: none;
                    }
                }
            }
        }

        .comments {
            width: 80vw;
            margin: 0 auto;
            margin-bottom: 2em;
            border-radius: 6px;
        }
    }

    @media screen and (max-width: 500px) {
        #detailBlog {
            background: url("../../assets/img/mobile/mobile_bg5.jpg");

            .box {
                width: 95vw;
                padding: 1em .5em;

                .navheader {
                    h2.art-title {
                        padding-left: .12rem;

                        h1.title {
                            font-size: 0.16rem;
                        }

                        h4.author {
                            padding: 0;

                            span {
                                font-size: 0.12rem;
                                display: block;
                                padding: 0;
                                margin: 0.35em 0;
                                text-indent: 1em;
                            }
                        }
                    }

                    h3.dateDay {
                        h1 {
                            font-size: 0.2rem;
                        }

                        h2 {
                            font-size: 0.16rem;
                        }
                    }
                }

                /*.context {*/
                /*  padding: 0.5em;*/
                /*}*/

                .state {
                    ul {
                        margin: 0;

                        li {
                            span {
                                font-size: 0.12rem;

                                a {
                                    font-size: 0.12rem;
                                }
                            }
                        }
                    }
                }

                .awesome {
                    padding: 0.5em;

                    svg {
                        height: 2.5em;
                        width: 2.5em;
                    }
                }
            }
        }
    }
</style>