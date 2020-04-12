//获取两位数值，小于10前面自动加一
function getRealValue(value) {
    return value > 10 ? value : `0${value}`;
}
//将时间规范化
function handleDate(date) {
    const true_date = new Date(date);
    const years = true_date.getFullYear();
    const months = getRealValue(true_date.getMonth() + 1);
    const days = getRealValue(true_date.getDate());
    const hours = getRealValue(true_date.getHours());
    const minutes = getRealValue(true_date.getMinutes());
    const seconds = getRealValue(true_date.getSeconds());
    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    }
}
//获得年月 yead年month月
export function getYearAndMonth(date) {
    const dt = handleDate(date);
    return dt.years + "年" + dt.months + "月";
}
//获得日 day
export function getJustDay(date) {
    const dt = handleDate(date);
    return dt.days;
}
//获取具体日期year-month-day格式
export function getFullDateLike_(date) {
    const dt = handleDate(date);
    return dt.years + '-' + dt.months + '-' + dt.days;
}
//获取具体日期year年month月day日格式
export function getFullDateLikeWord(date) {
    const dt = handleDate(date);
    return dt.years + '年' + dt.months + '月' + dt.days + "日";
}
//只需要时间，不要日期 h:m:s
export function getJustTime(date) {
    const dt = handleDate(date);
    return `${dt.hours}:${dt.minutes}:${dt.seconds}`
}
//获取具体时间，具体到秒 y-m-d h:m:s
export function getDetailTime(date) {
    const dt = handleDate(date);
    return `${dt.years}-${dt.months}-${dt.days} ${dt.hours}:${dt.minutes}:${dt.seconds}`
}

//处理一篇文章
export function handleItem(item, date) {
    item.justYearMonth = getYearAndMonth(date);
    item.justDay = getJustDay(date);
    item.fullDateLike_ = getFullDateLike_(date);
    item.fullDateLikeWord = getFullDateLikeWord(date);
    item.JustTime = getJustTime(date);
    item.DetailTime = getDetailTime(date);
    return item;
}

export function handleList(list) {
    list.forEach(item => {
        item = handleItem(item, item.date);
    });
    return list;
}

//获得一个四位的随机验证码
export function getVerificationCode() {
    const letter = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ];
    let verificationCode = "";
    for (let i = 0; i < 4; i++) {
        let randomNum = getRandomNumber();
        verificationCode += letter[randomNum];
    }
    return verificationCode;
}
//获得一个1-36的随机数0-9a-zA-Z
export function getRandomNumber() {
    return Math.floor(Math.random() * 36);
}

const Resource = require('./config/Resource')
export function getBgCoverImg(folder, fileName) {
    return `${Resource.serverRoot}${Resource.backgroundFile}${folder}/${fileName}`;
}



export function getWebSiteRunningTime() {
    //项目上线开始时间
    const startTime = new Date('2020-03-28T12:42:19');
    //当前时间
    const nowTime = new Date();
    //两个时间相差的毫秒数
    const submSeconds = nowTime.getTime() - startTime.getTime();
    //天
    const subDays = Math.floor(submSeconds / (24 * 60 * 60 * 1000));
    //除去天数剩余的毫秒数
    const subElseDaySeconds = submSeconds % (24 * 60 * 60 * 1000);
    //小时
    const subHours = Math.floor(subElseDaySeconds / (60 * 60 * 1000));
    //除去天、小时剩余的毫秒数
    const subElseHoursSeconds = subElseDaySeconds % (60 * 60 * 1000);
    //分钟
    const subMinutes = Math.floor(subElseHoursSeconds / (60 * 1000));
    //除去天、小时、分钟剩余的毫秒数
    const subElseMinutesSeconds = subElseHoursSeconds % (60 * 1000);
    const subSeconds = Math.floor(subElseMinutesSeconds / 1000);
    return {
        subDays,
        subHours,
        subMinutes,
        subSeconds
    }
}