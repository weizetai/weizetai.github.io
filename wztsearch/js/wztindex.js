window.addEventListener('load', function(){
	// 壁纸切换功能
	var imgs = document.querySelector('.picture').querySelectorAll('img');
	// console.log(imgs);
	// 2. 循环注册事件 
	// for (var i = 0; i < imgs.length; i++) {
	//     imgs[i].onclick = function() {
	//         // this.src 就是我们点击图片的路径   images/2.jpg
	//         // console.log(this.src);
	//         // 把这个路径 this.src 给body 就可以了
	//         document.body.style.backgroundImage = 'url(' + this.src + ')';
	// 		for(var i = 0; i < imgs.length; i++){
	// 			imgs[i].style.opacity = '';
	// 		}
	// 		this.style.opacity = '1';
	//     }
	// }

	for (var i = 0; i < imgs.length; i++) {
		imgs[i].addEventListener('click', function(){
				// this.src 就是我们点击图片的路径   images/2.jpg
				// console.log(this.src);
				// 把这个路径 this.src 给body 就可以了
				document.body.style.backgroundImage = 'url(' + this.src + ')';
		for(var i = 0; i < imgs.length; i++){
			imgs[i].style.opacity = '';
		}
		this.style.opacity = '1';
	})
	}
	// 自动播放轮播图
	var n = 0;
	var timers = setInterval(function(){
	imgs[n].click();
	console.log(n);

	++n;
	if ( n === imgs.length){
		n = 0;
	}	
	},5000)



	
	// 搜索功能
	var btn = document.querySelector('.btn');
	btn.addEventListener('click', function(){
		search();
	})
	document.onkeydown = function () {
		 //回车的键值是13
	    if (event.keyCode == 13) {    
	        search();
	    }
	}
	function search(){
		var searchValue = document.getElementById('inp').value;
		var url = 'http://www.baidu.com/s?ie=UTF-8&wd='+searchValue;
		window.open(url);
	}
	
	// 轮播图
	var arrow_l = document.querySelector('.arrow-l');
	var arrow_r = document.querySelector('.arrow-r');
	var focusMrfz = document.querySelector('.focusMrfz');
	var circle = document.querySelector('.circle');
	var focusMrfzWidth = focusMrfz.offsetWidth;
	
	
	
	// 鼠标移入显示左右侧按钮
	focusMrfz.addEventListener('mouseenter', function(){
		arrow_l.style.display = 'block';
		arrow_r.style.display = 'block';
		circle.style.display = 'block';
		clearInterval(timer);
		timer = null;
	})
	focusMrfz.addEventListener('mouseleave', function(){
		arrow_l.style.display = 'none';
		arrow_r.style.display = 'none';
		circle.style.display = 'none';
		timer = setInterval(function(){
			// 手动调用点击事件
			arrow_r.click();
			
		},2000)
	})
	
	
	// 动态生成小圆圈
	var ul = focusMrfz.querySelector('ul');
	var ol = focusMrfz.querySelector('.circle');
	
	for (var i = 0; i < ul.children.length; i++){
		var li = document.createElement('li');
		
		li.setAttribute('index', i);
		ol.appendChild(li);
		
		// 小圆圈点击事件
		li.addEventListener('click',function(){
			for (var i = 0; i < ol.children.length; i++){
				ol.children[i].className = '';
			}
			this.className = 'current';
			var index = this.getAttribute('index');
			
			num = index;
			cir_num = index;
			
			animate(ul, -index*focusMrfzWidth);
		})
	}
	ol.children[0].className = 'current';
	var first = ul.children[0].cloneNode(true);  //克隆第一张图片放到最后实现无缝滚动
	ul.appendChild(first);
	
	var cir_num = 0;
	var num = 0;
	var flag = true;  //节流阀
	
	arrow_r.addEventListener('click', function(){
		if(flag){
			flag = false;  //关闭节流阀
			
			if(num == ul.children.length - 1){
				ul.style.left = 0;
				num = 0;
			}
			num++;
			animate(ul, -num*focusMrfzWidth, function(){
				flag = true; //打开节流阀
			});
			
			cir_num++;
			if(cir_num == ol.children.length){
				cir_num = 0;
			}
			
			circleChange();
		}
		
	})
	
	// 左侧按钮
	arrow_l.addEventListener('click', function(){
		if(flag){
			flag = false;
			if(num == 0){
				num = ul.children.length - 1;
				ul.style.left = -num * focusMrfzWidth + 'px';
				
			}
			num--;
			animate(ul, -num*focusMrfzWidth, function(){
				flag = true;
			});
			
			cir_num--;
			/* if(cir_num < 0){
				cir_num = ol.children.length - 1;
			} */
			// 等价
			cir_num = cir_num < 0 ? ol.children.length - 1 : cir_num;
			
			
			circleChange();
		}
		
	})
	
	
	
	function circleChange(){
		for (var i = 0; i < ol.children.length; i++){
			ol.children[i].className = '';
		}
		ol.children[cir_num].className = 'current';
	}
	
	
	// 自动播放轮播图
	var timer = setInterval(function(){
		// 手动调用点击事件
		arrow_r.click();
		
	},2000)
	
	// 记事本

	// const todoapp = new Vue({
	// 	el:"#todoapp",
	// 	data:{
	// 	  todoList:["吃饭","睡觉","学习"],
	// 	  inputValue:"糟糕的坚持>>轻易的放弃！"
	// 	},
	// 	methods:{
	// 	  add:function(){
	// 		this.todoList.push(this.inputValue);
	// 	  },
	// 	  remove:function(index){
	// 		console.log(index);
	// 		this.todoList.splice(index,1);   //splice 根据索引删除对应的元素  1指一次删一个
	// 	  },
	// 	  clearAll:function(){
	// 		this.todoList = [];
	// 	  }
	// 	}
	//   })
})



