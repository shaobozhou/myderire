class item_Creategroup extends eui.ItemRenderer {
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
		this.name = "L_CreategroupScroller";
		this.touchChildren = false;
		this.touchEnabled = true;
	}
	
}