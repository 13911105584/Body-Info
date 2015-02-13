/*	Function make 360 view with seri picture	@argument:		div : div will append 360 view		imgFolder : path of seri picture		imgCount : total of puture		style : style of 360 view*/function Move360(div,imgFolder,imgCount,style){	var my = this;	this.div = div;	this.imgFolder = imgFolder;	this.imgCount = imgCount;	this.img = [];	this.imgDiv;	this.end = 0;	this.style = style;	this.x; this.dx, this.curX;	this.timer = 0;    this.current = 0;	this.drag= false;	this.flatform;	this.delay = 10;	this.clock = 0;	this.auto = 0;	this.limit = 0;	this.curImg = 0;	this.init = function(){				my.flatform = navigator.platform;		my.LoadImg();		my.imgDiv = document.createElement('img');                my.imgDiv.src = my.img[0].src;                my.imgDiv.className = my.style;		my.imgDiv.useMap = 0;                my.div.appendChild(my.imgDiv);		if(my.flatform=='iPad'){			face.addEventListener('touchstart', my.TouchStart, false);			face.addEventListener('touchmove', my.TouchMove, false);			face.addEventListener('touchend', my.TouchEnd, false);					}		else{			my.div.addEventListener('mousedown', my.TouchStart, false);			my.div.addEventListener('mousemove', my.TouchMove, false);			my.div.addEventListener('mouseup', my.TouchEnd, false);				}		//my.auto = setTimeout(function(){my.AutoRotate()},3000,my);	};		this.LoadImg = function(){		for(var i=0; i< my.imgCount; i++){			my.img[i] = new Image();			my.img[i].src = my.imgFolder+(i)+'.png';                        		}			};		this.randomPic = function(){		var c = -Math.ceil(my.current % my.imgCount);		if (c < 0) c += (my.imgCount - 1);		return c;	};		this.showImg = function(){		var c = my.randomPic();		my.imgDiv.src = my.img[c].src;		my.imgDiv.useMap = c;		my.curImg = c;	};		this.Rotale = function(){		if(my.drag==true){			my.dx = -my.curX + my.x;			if(my.clock < new Date().getTime() - my.delay) {				my.end = my.current + Math.ceil((my.imgCount - 1) * 25 * (my.dx /1000));								my.CallEffect();				my.clock = new Date().getTime();			}					}		my.x = my.curX;	};		this.AutoRotate = function(){		my.current = my.current+2;		if(my.current>= my.imgCount) my.current = 0;		my.imgDiv.src = my.img[my.current].src;		my.imgDiv.useMap = my.current;		my.curImg = my.current;		my.auto = setTimeout(my.AutoRotate,50,my);	};		this.RotateLimitA = function(n){		if(my.current==my.end||my.current == my.end-1||my.current==my.end-2){			clearInterval(my.limit);			//console.log(my.current);			my.current=my.end;			my.curImg  = my.end;			my.imgDiv.src = my.img[my.current].src;			my.imgDiv.useMap = my.current;			AddPopup(pic);			my.limit = 0;		}		else{			my.current = my.current+3;			if(my.current>= my.imgCount) my.current = 0;			my.imgDiv.src = my.img[my.current].src;			my.imgDiv.useMap = my.current;			//my.limit = setInterval(my.RotateLimit,100,my);					}	};		this.RotateLimitB = function(n){		if(my.current==my.end||my.current == my.end+1||my.current==my.end+2){			clearInterval(my.limit);			my.current=my.end;			my.curImg  = my.end;			//console.log(my.current);			//console.log(my.current);			my.imgDiv.src = my.img[my.current].src;			my.imgDiv.useMap = my.current;			AddPopup(pic);			my.limit = 0;		}		else{			my.current = my.current-3;			if(my.current<=0) my.current = my.imgCount-1;			my.imgDiv.src = my.img[my.current].src;			my.imgDiv.useMap = my.current;			//my.limit = setInterval(my.RotateLimit,100,my);					}	};				this.DoEffect = function(){		if(my.current != my.end){			var next = my.end < my.current ? Math.floor((my.end - my.current) * 0.1) : Math.ceil((my.end - my.current) * 0.1);			my.current += next;			my.showImg();		}		else {			//my.imgDiv.src = my.img[my.current].src;			clearInterval(my.timer);			my.timer = 0;		}	};		this.CallEffect = function(){		if (my.timer=== 0) {			my.timer = setInterval(my.DoEffect, Math.round(1000 / 60),my);			//my.DoEffect();		}	};	this.TouchStart = function(e){		e.preventDefault();		CloseAllLine();		clearTimeout(my.auto);		map.src = 'img/map.png';		var y;		//my.imgDiv.style.opacity = 1;		if(my.flatform == 'iPad'){			my.x = e.changedTouches[0].clientX;			y = e.changedTouches[0].clientY;		}		else{			my.x = e.clientX;			y = e.clientY;		}		my.drag = true;		};		this.TouchMove = function(e){				e.preventDefault();		//if(have==true||my.limit!=0) return;		if(my.flatform=='iPad'){			my.curX = e.changedTouches[0].clientX;		}		else{			my.curX = e.clientX;				}		my.Rotale();	};		this.TouchEnd = function(){		my.drag = false;	};		this.init();	 }