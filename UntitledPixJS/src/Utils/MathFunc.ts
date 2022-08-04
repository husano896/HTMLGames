export class MathFunc {
    // x範圍為0.0~1.0
    easeOutSine(x: number) {
		return Math.sin((x * Math.PI) / 2);
	}
    // x範圍為0.0~1.0
	easeOutSineFunc(x: number, start: number, end: number) {
		return start + (end - start) * Math.sin((x * Math.PI) / 2);
	}
	
	genRandomInt(max: number) {
		var randomArray = new Uint32Array(1);
		return crypto.getRandomValues(randomArray) % (max+1);
	}
}