/**
 * canvas 生成图片
 * @param {String} [canvasEle] the selector of canvas element 
 * @param {Number} [canvasWidth]
 * @param {Number} [canvasHeight] 
 * @param {Function} [cb] function(img){}
 *
 * @example
 * var builder = new Builder('#mycanvas', 750, 1334, function(img){
 *   document.querySelector('$myimg').setAttribute('src', img);
 * });
 * build.addText('Hello', {x:750/2, y:100, )
 */
var ImageBuidler = (function(){
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
  window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function( callback ){ return window.setTimeout(callback, 1000/60); }; 
  window.cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function(id) { window.clearTimeout(id); }
  var Utils = {
    flatten: function(list, depth) {
      depth = (typeof depth == 'number') ? depth : Infinity;
      if (!depth) {
        if (Array.isArray(list)) {
          return list.map(function(i) { return i; });
        }
        return list;
      }

      return _flatten(list, 1);

      function _flatten(list, d) {
        return list.reduce(function (acc, item) {
          if (Array.isArray(item) && d < depth) {
            return acc.concat(_flatten(item, d + 1));
          }
          else {
            return acc.concat(item);
          }
        }, []);
      }
    },
  };
  var _rem = (document.documentElement.clientWidth/750)*100;

  var canvas, ctx, canvasWidth, canvasHeight;
  var displaylist = [], zindex = 0;
  var callback;
  var isRendering;

  var IMG_MAX_RETRY_TIMES = 3;
  
  function _addImage(src, options, retryTimes) {
    if (retryTimes == undefined) { retryTimes = 0;}
    var img = new Image();
    img.crossOrigin = "Anonymous";
    // img.setAttribute('crossOrigin', 'anonymous');
    if (options.zindex == undefined) {
      options.zindex = zindex;
      zindex++;
    }
    img.onload = function() {
      addChild(img, 'image', options);
      renderNextTick();
    }
    img.onerror = function() {
      console.log('image load error '+src);
      if (retryTimes < IMG_MAX_RETRY_TIMES) {
        _addImage(src, options, retryTimes+1);  
      }
    }
    img.src = src;
  }
  function _addText(text, options){
    if (!text) { return; }
    if (options.zindex == undefined) {
      options.zindex = zindex;
      zindex++;
    }
    addChild(text, 'text', options);
    renderNextTick();
  }
  function addChild(ele, type, options) {
    var child = {ele: ele, type: type, options: options};
    var displayobject = displaylist[options.zindex];
    if (displayobject) {
      if (Array.isArray(displayobject)) {
        displayobject.push(child);
      } else {
        displaylist[options.zindex] = [displayobject, child];
      }
    }else {
      displaylist[options.zindex] = child;
    }
    return child;
  }
  function renderNextTick() {
    if (isRendering) { return; }
    isRendering = requestAnimFrame(function(){
      render();
      cancelAnimFrame(isRendering);
      isRendering = null;
    })
  }
  function render() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    var _list = Utils.flatten(displaylist);
    // render displaylist
    [].forEach.call(_list, function(child){
      if (child && child.ele) {
        ctx.save();
        var _opt = child.options;
        if (_opt.render && typeof _opt.render == 'function') {
          _opt.render.apply(this, [ctx, child.ele, _opt]);
        } else {
          if (child.type == 'image') {
            if ('sx' in _opt && 'sy' in _opt && 'sw' in _opt && 'sh' in _opt) {
              ctx.drawImage(child.ele, _opt.sx, _opt.sy, _opt.sw, _opt.sh, _opt.x, _opt.y, _opt.w, _opt.h)
            } else if ('w' in _opt && 'h' in _opt) {
              ctx.drawImage(child.ele, _opt.x, _opt.y, _opt.w, _opt.h);
            } else {
              ctx.drawImage(child.ele, _opt.x, _opt.y);
            }
          } else if (child.type == 'text') {
            renderText(child.ele, _opt);
          }
        }
        
        ctx.restore();
      }
    });
    callback(canvas.toDataURL('image/png'));
  }
  
  function renderText(text, option){
    var _fontSize = option.fontSize;
    if (typeof _fontSize == 'number') {
      _fontSize = option.fontSize+'px';
    }
    ctx.font = _fontSize+' Helvetica, Arial, sans-serif';
    ctx.textBaseline = option.baseline || "hanging";
    ctx.textAlign = option.textAlign || 'start';
    var _color = option.color;
    if (typeof _color == 'function') {
      _color = option.color.apply(null, ctx);
    }
    ctx.fillStyle = _color;
    ctx.fillText(text, option.x, option.y, option.maxWidth);
    if (option.fontWeight == 'bold' || option.fontWeight == 600) {
      ctx.strokeStyle = _color;
      ctx.strokeText(text, option.x, option.y, option.maxWidth);
    }
  }

  return function (canvasEle, canvasWidth, canvasHeight, cb){
    canvasWidth = canvasWidth;
    canvasHeight = canvasHeight;
    callback = cb;
    canvas = document.querySelector(canvasEle);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');
    displaylist = [];
    zindex = 0;
    isRendering = null;
    return {
      /**
       * 添加图像
       * @param {[type]} source  the url of image
       * @param {[type]} options {x,y,w,h}
       */
      addImage: function(source, options) {
        _addImage(source, options);
      },
      /**
       * 添加文本
       * @param {[string]} text    [description]
       * @param {[type]} options {x,y,fontSize,color,textAlign,baseline}
       *                          color可以是string,也可以是函数(ctx=>{})，生成渐变颜色(CanvasGradient)。
       */
      addText: function(text, options) {
        _addText(text, options);
      },
      /**
       * 添加雪碧图
       * @param {[type]} source  [description]
       * @param {[type]} options {x,y,w,h,sx,sy,sw,sh}
       */
      addSprite: function(source, options){
        _addImage(source, Object.assign({sw:options.sw||options.w, sh:options.sh||options.h}, options));
      },
    }
  }
})();
