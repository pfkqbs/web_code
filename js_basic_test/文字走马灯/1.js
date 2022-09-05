export function lick(lickdogWords) {
    setupStyle();
    // 偏移值
    let left = 0;
    //声明定时器
    let timer = null;
    // 文字
    let lickWord = "";
    
    const out = document.querySelector("#lickdog-out_wrap");
    out.innerHTML = `
      <div id="lickdog-inner_wrap">
          <div class="text" id="text-before">${lickWord}</div>
          <div class="text" id="text-after">${lickWord}</div>
      </div>
    `;
  
    const inner = document.querySelector("#lickdog-inner_wrap");
    const textBefore = document.querySelector("#text-before");
  
    init();
    setupEvent();
    
      // 初始化
    function init() {
      // 开启定时器之前最好先清除一下定时器
      clearInterval(timer);
      //开始定时器
      timer = setInterval(move, speed);
    }
    
    function setupStyle() {
      const styleTag = document.createElement("style");
      styleTag.type = "text/css";
      styleTag.innerHTML = `
      #lickdog-out_wrap{
          width: 100%;
          height: 100px;
          position: fixed;
          overflow: hidden;
          text-overflow: ellipsis;
          /* 颜色一定要鲜艳 */
          background-color: #ff0000;
          border-radius: 8px;
          /* 阴影也一定要够醒目 */
          box-shadow: rgba(255, 0, 0, 0.4) 5px 5px, rgba(255, 0, 0, 0.3) 10px 10px, rgba(255, 0, 0, 0.2) 15px 15px, rgba(255, 0, 0, 0.1) 20px 20px, rgba(255, 0, 0, 0.05) 25px 25px;
      }
      #lickdog-inner_wrap {
          // padding: 0 12px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
      }
      .text{
          white-space:nowrap;
          box-sizing: border-box;
          color: #fff;
          font-size: 48px;
          font-weight:bold;
          /* 文字一定要立体 */
          text-shadow:0px 0px 0 rgb(230,230,230),1px 1px 0 rgb(215,215,215),2px 2px 0 rgb(199,199,199),3px 3px 0 rgb(184,184,184),4px 4px 0 rgb(169,169,169), 5px 5px 0 rgb(154,154,154),6px 6px 5px rgba(0,0,0,1),6px 6px 1px rgba(0,0,0,0.5),0px 0px 5px rgba(0,0,0,.2);
      }
      `;
      document.head.appendChild(styleTag)
    }
    
      //封装移动函数
    function move() {
      if (left >= textBefore.offsetWidth) {
        left = 0;
      } else {
        left++;
      }
      inner.style.left = `${-left}px`;
    }
    
    function setupStyle() {  }
  }