class Headmain extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}
	private _Gamenums;
	private _Gamedispat: eui.BitmapLabel;
	private _UID = 0;
	private playDispat: DongHua;

	public set C_Gamenums(e) {
		this._Gamenums = e
		if (this._Gamedispat) {
			if (this._Gamenums == 0) {
				this._Gamedispat.text = ""
			} else {
				egret.Tween.get(this._Gamedispat).to({
					text: this._Gamenums
				}, 500)
			}
		}
	}

	public get C_Gamenums() {
		return this._Gamenums
	}

	public get C_UID() {
		return this._UID
	}
	public set C_UID(e) {
		this._UID = e;
	}

	public playName(e) {
		this.playDispat.PlayDisplay = e;
		this.playDispat.PlaySrc = e;
		let mp3string = `Audio_exp_${Setting.EmoSound[e]}_mp3`;
		let endplaytime;
		if (e == "grab") {
			endplaytime = 1200;
		} else if(e == "handshake"){
			endplaytime = 500;
		} else if(e == "love"){
endplaytime = 300;
		} else {
			endplaytime = 0;
		}
		setTimeout(function (e) {
			Main.PlaySound(e);
		}, endplaytime, mp3string);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.playDispat.ske_json = `emo_ske_json`;
		this.playDispat.tex_json = `emo_tex_json`;
		this.playDispat.tex_png = `emo_tex_png`;
	}

}