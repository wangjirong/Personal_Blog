import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {
    Message
} from 'element-ui'

Vue.use(VueRouter);

const routes = [
    //公共组件，所有人均可访问
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "故相思，自难忘！",
            content: {
                keywords: "Eric-Blog,故相思，自难忘！",
                description: "故相思，自难忘!"
            }
        }
    },
    {
        path: '/menu',
        name: "Menu",
        component: () => import('../views/Menu/Main'),
        redirect: '/menu/blogs',
        meta: {
            title: 'Eric-文章',
            content: {
                keywords: "Eric-Blog,故相思，自难忘!,文章列表！",
                description: "故相思，自难忘!"
            }
        },
        children: [{
            path: '/menu/blogs',
            name: 'Blog',
            component: () => import('../views/Menu/blogs'),
            meta: {
                title: 'Eric-文章列表',
                content: {
                    keywords: "Eric-Blog,故相思，自难忘！",
                    description: "Eric-文章列表"
                }
            }
        },
            {
                path: '/menu/detailBlog',
                name: 'DetailBlog',
                component: () => import('../views/Menu/detailBlog.vue'),
                meta: {
                    title: 'Eric-文章详情',
                    content: {
                        keywords: "Eric-Blog,故相思，自难忘！",
                        description: "Eric-文章详情"
                    }
                }
            }, {
                path: '/menu/leaveMessage',
                name: 'LeaveMessage',
                component: () => import('../views/Menu/leaveMessage.vue'),
                meta: {
                    title: 'Eric-留言',
                    content: {
                        keywords: "Eric-Blog,故相思，自难忘！,留言！",
                        description: "Eric-给我留言！"
                    }
                }
            }, {
                path: '/menu/about',
                name: 'About',
                component: () => import('../views/Menu/about.vue'),
                meta: {
                    title: 'Eric-About',
                    content: {
                        keywords: "Eric-Blog,故相思，自难忘！,关于！",
                        description: "Eric-about"
                    }
                }
            },
            {
                path: '/menu/otherLink',
                name: 'OtherLink',
                component: () => import('../views/Menu/otherLink.vue'),
                meta: {
                    title: 'Eric-友链',
                    content: {
                        keywords: "Eric-Blog,故相思，自难忘！,友链！",
                        description: "Eric-友链"
                    }
                }
            },
            {
                path: '/menu/diary',
                name: 'Diary',
                component: () => import('../views/Menu/diary.vue'),
                meta: {
                    title: 'Eric-日记',
                    content: {
                        keywords: "Eric-Blog,故相思，自难忘！,日记！",
                        description: "Eric-日记"
                    }
                }
            },
        ]
    },

    //管理员——授权才可访问组件
    {
        path: '/auth_personal/addBlog',
        name: 'AddBlog',
        component: () => import('../auth_person_components/addBlog'),
        meta: {
            title: '增加博客',
            requireAuth: 'true'
        }
    },
    {
        path: '/auth_personal/writeDiary',
        name: 'WriteDiary',
        component: () => import('../auth_person_components/writeDiary.vue'),
        meta: {
            title: '写日记',
            requireAuth: 'true'
        }
    },

    {
        path: '/auth_personal/login',
        name: 'Login',
        component: () => import('../auth_person_components/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/auth_personal/register',
        name: 'Register',
        component: () => import('../auth_person_components/register.vue'),
        meta: {
            title: '注册'
        }
    }, ,
    {
        path: '/auth_personal/manage',
        name: 'Manage',
        component: () => import('../auth_person_components/manage.vue'),
        meta: {
            title: '管理界面',
            requireAuth: true
        },
        redirect: '/auth_personal/manage/blogsList',
        children: [{
            path: '/auth_personal/manage/blogsList',
            name: 'BlogList',
            component: () => import('../auth_person_components/list_diary_update/BlogsList'),
            meta: {
                title: '博客列表',
                requireAuth: true
            }
        },
            {
                path: '/auth_personal/manage/diary',
                name: 'mDiary',
                component: () => import('../auth_person_components/list_diary_update/Diary'),
                meta: {
                    title: '日记',
                    requireAuth: true
                }
            },
            {
                path: '/auth_personal/manage/addSong',
                name: 'AddSong',
                component: () => import('../auth_person_components/addSong'),
                meta: {
                    title: '添加歌曲',
                    requireAuth: true
                }
            }

        ]
    },

    //普通用户qq登录重定向中间间
    {
        path: '/oAuth/qq_redirect',
        name: 'qq_Redirect',
        component: () => import('../oAuth/qqLogin_callback')
    },
    {
        path: '/oAuth/github_redirect',
        name: 'github_Redirect',
        component: () => import('../oAuth/githubLogin_callback')
    },
    // {
    //   path: '/404NotFound',
    //   name: '404NotFound',
    //   title: "页面找不到了",
    //   component: () => import('../views/404NotFound')
    // },
    // {
    //   path: '*',
    //   redirect: '/404NotFound'
    // }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta)
        document.title = to.meta.title;
    if (to.meta.content) {
        let head = document.querySelector('head');
        let keywordsEle = document.createElement('meta');
        keywordsEle.name = "keywords";
        keywordsEle.content = to.meta.content.keywords;

        let descriptionEle = document.createElement('meta');
        descriptionEle.name = "description";
        descriptionEle.content = to.meta.content.description;

        head.appendChild(keywordsEle);
        head.appendChild(descriptionEle);
    }
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)_cir_ve_\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const token = sessionStorage.getItem('eleToken');
    if (token) next();
    else {
        if (to.matched.some(record => record.meta.requireAuth)) {
            if (to.name === "Login") next();
            else {
                Message.error("请先登录");
                next({
                    name: 'Login'
                })
            }
        }
        next();
    }
});

// router.beforeMount((to,from,next)=>{
//
// })
export default router