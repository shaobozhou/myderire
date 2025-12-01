class DongHua extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.egretFactory = dragonBones.EgretFactory.factory;
	}

	private playsound(e) {
		if (RES.hasRes(e.sound)) {
			Main.PlaySound(e.sound)
		}
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private newAnimationsrc = ""
	public egretFactory: dragonBones.EgretFactory

	private playyu() {
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	private drawdata = 0

	private ParseData() {
		if (this.drawdata == 1) {
			return
		}
		this.drawdata = 1
		this.egretFactory.parseDragonBonesData(this.ske_json);
		this.egretFactory.parseTextureAtlasData(this.tex_json, this.tex_png);
		console.log(this.ske_json, this.tex_json, this.tex_png);
		
	}

	public set PlaySrc(e) {
		this.newAnimationsrc = e
		if (this.PlayDisplay && this.__show && this.__show.visible == false) {
			this.ParseData()
			this.Doplay()
		}
	}

	public Doplay(xunhuan = 1) {
		if (this.drawdata == 0) {
			this.ParseData()
		}

		if (!this.getChildByName(this.PlayDisplay)) {
			var armatureDisplay = this.egretFactory.buildArmatureDisplay(this.PlayDisplay);
			if (armatureDisplay) {
				this.addChild(armatureDisplay);
				armatureDisplay.name = this.PlayDisplay
				armatureDisplay.animation.play(this.newAnimationsrc, xunhuan);
				armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.playyu, this)
				armatureDisplay.addEvent(dragonBones.EventObject.SOUND_EVENT, this.playsound, this);
			} else {
				console.log(`${this.__Display}, ${this.dragonbonesData}, 没有数据`);
			}
		} else {
			var display = this.getChildByName(this.PlayDisplay)
			display['animation'].play(this.newAnimationsrc, xunhuan)
		}
	}

	public get PlaySrc() {
		return this.newAnimationsrc
	}

	private dragonbonesData = ""
	public set ske_json(e) {
		if (e) {
			if (typeof (e) == "string") {
				this.dragonbonesData = RES.getRes(e)
			} else {
				this.dragonbonesData = e
			}
		}
	}

	public get ske_json() {
		return this.dragonbonesData
	}

	private textureData1 = ""
	public set tex_json(e) {
		if (e) {
			if (typeof (e) == "string") {
				this.textureData1 = RES.getRes(e)
			} else {
				this.textureData1 = e
			}
		}

	}
	public get tex_json() {
		return this.textureData1
	}

	private texture1 = ""
	public set tex_png(e) {
		if (e) {
			if (typeof (e) == "string") {
				this.texture1 = RES.getRes(e)
			} else {
				this.texture1 = e
			}
		}
	}
	public get tex_png() {
		return this.texture1
	}

	private __Display = ""
	public set PlayDisplay(e) {
		this.__Display = e
	}
	public get PlayDisplay() {
		return this.__Display
	}

	private __timer = 0
	public set Timer(e) {
		this.__timer = e
	}
	public get Timer() {
		return this.__timer
	}

	private __show;
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.dragonbonesData) {
			this.ske_json = this.dragonbonesData
		}
		if (this.texture1) {
			this.tex_png = this.texture1
		}
		if (this.textureData1) {
			this.tex_json = this.textureData1
		}
		if (this.newAnimationsrc) {
			setTimeout(() => {
				this.PlaySrc = this.newAnimationsrc
			}, this.Timer);
		}
		this.__show.visible = false
	}
}