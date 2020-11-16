class Interpreter {
	// 給劇本(Script)用的解釋器，所有的功能回傳的都是Promise！
	constructor() {
	}
	// 顯示文章
	Article(text) {
		return new Promise((resolve,reject)=>{
			// 聆聽按鍵的callBack
			const callback = (key)=>{
				console.log('listen', key);
				if (key.code === 'Space') {
					resolve();
					window.removeEventListener('keydown', callback);
				}
			};
			window.addEventListener('keydown',callback);
		});
	}
}