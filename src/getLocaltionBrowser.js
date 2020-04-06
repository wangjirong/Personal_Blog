//获得年月日
export function getYearMonDay(date) {
    const time = new Date(date);
    const year = time.getFullYear();
    let month = time.getMonth() + 1;
    month = month > 10 ? month : "0" + month;
    let day = time.getDate();
    day = day > 10 ? day : "0" + day;
    return `${year}-${month}-${day}`;
};
//获得具体时间
export function getDetailTime(date) {
    const time = new Date(date);
    let hours = time.getHours();
    hours = hours > 10 ? hours : "0" + hours;
    let minutes = time.getMinutes();
    minutes = minutes > 10 ? minutes : "0" + minutes;
    let seconds = time.getSeconds();
    seconds = seconds > 10 ? seconds : "0" + seconds;
    return `${hours}:${minutes}:${seconds}`;
}
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