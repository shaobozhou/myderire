class Pokey extends eui.Component implements  eui.UIComponent {
	public constructor(n = "N") {
		super();
		this.currentState = n
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