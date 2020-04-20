/*
设置背景图片
@parms id 元素Dom id
@parms width  设备宽度
@parms bigImage 宽设备背景图
@parms smallImage 窄设备背景图
*/
export function setBackgroundByWidth(id, BigImage, smallImage) {
    const width = document.documentElement.offsetWidth;
    if (width < 500) setImageSrc(id, smallImage)
    else setImageSrc(id, BigImage)
}

export function setbackground(id, imgURL) {
    const dom = document.getElementById(id);
    dom.style.background = `url(${imgURL})`
}

export function setImageSrc(id, imgURL) {
    const img = document.getElementById(id);
    img.setAttribute("src", imgURL)

}