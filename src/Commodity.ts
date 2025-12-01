class Commodity extends eui.Component implements  eui.UIComponent {
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

	private __CommodityName = "";
	
	public set C_CommodityName(e) {
		this.__CommodityName = e;
	}

	public get C_CommodityName() {
		return this.__CommodityName;
	}

	private __CommodityUrl = "";
	
	public set C_CommodityUrl(e) {
		this.__CommodityUrl = e;
	}

	public get C_CommodityUrl() {
		return this.__CommodityUrl;
	}

	private __Paymenttype = "icon_jb_1_png";
	
	public set C_Paymenttype(e) {
		if(e == 1) {
			this.__Paymenttype = "icon_jb_1_png";
		} else {
			this.__Paymenttype = "money_rmb_png";
		}
	}

	public get C_Paymenttype() {
		if(this.__Paymenttype == "icon_jb_1_png") {
			return 1
		} else {
			return 0
		}
	}

	private __PaymentMoney = "";
	
	public set C_PaymentMoney(e) {
		this.__PaymentMoney = e;
	}

	public get C_PaymentMoney() {
		return this.__PaymentMoney;
	}

	private __CoinsNumber = "";
	
	public set C_CoinsNumber(e) {
		this.__CoinsNumber = e;
	}

	public get C_CoinsNumber() {
		return this.__CoinsNumber;
	}
}