class Buttontowicon extends eui.Button {
	private _icon2;
	public constructor() {
		super();
	}

	private icon2Display: eui.Image

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public set icon2(value) {
		this._icon2 = value;
	}

	public get icon2() {
		return this._icon2;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

}