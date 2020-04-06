//获取浏览器类型
export function getBrowerType() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    let browser = "";
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ?
    (Sys.ie = s[1]) :
    (s = ua.match(/msie ([\d.]+)/)) ?
    (Sys.ie = s[1]) :
    (s = ua.match(/firefox\/([\d.]+)/)) ?
    (Sys.firefox = s[1]) :
    (s = ua.match(/chrome\/([\d.]+)/)) ?
    (Sys.chrome = s[1]) :
    (s = ua.match(/opera.([\d.]+)/)) ?
    (Sys.opera = s[1]) :
    (s = ua.match(/version\/([\d.]+).*safari/)) ?
    (Sys.safari = s[1]) :
    0;

    if (Sys.ie) browser = "IE: " + Sys.ie;
    if (Sys.firefox) browser = "Firefox: " + Sys.firefox;
    if (Sys.chrome) browser = "Chrome: " + Sys.chrome;
    if (Sys.opera) browser = "Opera: " + Sys.opera;
    if (Sys.safari) browser = "Safari: " + Sys.safari;
    return browser;
}