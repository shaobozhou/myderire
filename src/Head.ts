class Head extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	private __Headimg = "nohead_png";

	public set C_Headimg(e){
		this.__Headimg = e;
	}

	public get C_Headimg(){
		return this.__Headimg
	}
}