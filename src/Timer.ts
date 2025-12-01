class Timer extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	private T_label: eui.Label;
	private T_image: eui.Label;
	private _timeTemp = 0;
	private playtime: egret.tween.TweenGroup;

	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
	public set timeTemp(e){
		this._timeTemp = Number(e);
		if(this._timeTemp <= 0) {
			this._timeTemp = 0;
			if(this.T_image.visible){
				this.T_image.visible = false
			}
		} else {
			setTimeout(function(e) {
				e.timeTemp --;
			}, 1000, this);
			this.playtime.play(0)
		}
		if(this.T_label) {
			this.T_label.text = this._timeTemp.toFixed(0);
		}
	}

	public get timeTemp(){
		return this._timeTemp;
	}
}