(function flexible (window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1
  
    // adjust body font size
    function setBodyFontSize () {
      if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
      }
      else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    setBodyFontSize();
  
    // set 1rem = viewWidth / 10
    function setRemUnit () {
      //注意使用rem做单位的时候，千万不能使用fantasize小于12px,原来的是除以375，会让个别浏览器不兼容。因为跟元素小于了12px，浏览器就会默认设为12px，最小单位，解决办法就是设的尽可能的大。
      var rem = (document.documentElement.clientWidth
      || document.body.clientWidth || window.innerWidth)/ 3.75
  
      docEl.style.fontSize = rem + 'px'
    }
  
    setRemUnit()
  
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        setRemUnit()
      }
    })
  
    // detect 0.5px supports
    if (dpr >= 2) {
      var fakeBody = document.createElement('body')
      var testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document))