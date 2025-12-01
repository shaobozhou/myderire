class HeadPal extends eui.Component implements  eui.UIComponent {
	public headimg: eui.Image;
	public username: eui.Label;
	public usercoins: eui.Label;
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
}