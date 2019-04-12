//获取元素
let $buttons = $('.buttonWrapper>button')
let $slides = $('.images')
let $images = $slides.children('img')
let current = 0
  //克隆第一张和最后一张图片
makeFakeSlides()

$slides.css({
  transform: "translateX(-920px)"
})

bindEvents()/*
$(next).on('click',function(){
  gotoSlide(current + 1)
  console.log(current)
})
$(previous).on('click',function(){
  gotoSlide(current - 1)
  console.log(current)
})*/
var timerId = setInterval(function(){gotoSlide(current+1)},3000)
document.onmouseenter = function(){
  window.clearInterval(timerId)
}
document.onmouseleave = function(){
  timerId = setInterval(function(){gotoSlide(current+1)},3000)
}
document.addEventListener('visibilitychange',function(e){
    if(document.hidden){
   window.clearInterval(timerId)
    }else{
       timerId = setInterval(function(){gotoSlide(current+1)},3000)
        
    }
})

//功能函数
function bindEvents() {
  $('.buttonsWrapper').on('click', 'button', function(e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    gotoSlide(index)
  })
}
//重要
function gotoSlide(index){
  if(index > $buttons.length - 1){
    index = 0
  }else if(index < 0){
    index = $buttons.length - 1
  }
  console.log('current','index')
  console.log(current,index)
    //如果是从最后一张跳转到第一张
  if (current === $buttons.length - 1 && index === 0) {
      $slides.css({
          transform: `translateX(${-($buttons.length+1)*920}px)`
        })
        //一旦结束了就立刻偷偷的把图片换回来，通过hide，offset，换回、show来实现
        .one('transitionend', function() {
          $slides.hide().offset()
          $slides.css({
            transform: `translateX(${-(index+1) * 920}px)`
          }).show()
        })
      //从第一张跳转到最后一张
    } else if (current === 0 && index === $buttons.length - 1) {
      $slides.css({
          transform: `translateX(0px)`
        })
        .one('transitionend', function() {
          $slides.hide().offset()
          $slides.css({transform: `translateX(${-(index+1) * 920}px)`}).show()
        })
    } else {
      $slides.css({
        transform: `translateX(${-(index+1) * 920}px)`
      })
    }
    current = index
}

function makeFakeSlides() {
  //克隆第一张和最后一张图片
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq(3).clone(true)
    //把克隆的图片加到html中
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}