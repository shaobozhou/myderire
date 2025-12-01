class Club extends eui.Component implements eui.UIComponent {
	private Main: Main;
	private home: UserMain;
	private Headimg;
	private Clubid;
	private Clubname;
	private Clublength;
	private Clubcoins = 0;
	private MsgButton: eui.Button;
	private G_Maxwindows: eui.Group;
	public constructor(e, s, b) {
		super();
		this.Main = s;
		this.home = e;
		this.Headimg = b["Head"];
		this.Clubid = b["ID"];
		this.Clubname = b["Name"];
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private On_TouchDT(e) {
		let name;
		let Dispatch
		if (e.target) {
			name = e.target.name;
			Dispatch = e.target
		} else {
			name = e
		}

		if (name) {
			if (e != name) {
				Main.PlaySound("click_mp3")
			}
			if (name == "B_backhome") {
				this.Backtohome()
			} else if (name == "B_Close") {
				this.CloseWin()
			} else if (name == "B_MsgList_yes") {
				let dataDict = Dispatch.parent.data
			} else if (name == "B_MsgList_no") {
				let dataDict = Dispatch.parent.data
			} else if (name == "B_Putallyes") {
				//全部接受
			} else if (name == "B_Putallno") {
				//全部拒绝
			} else if (name == "G_Creategame") {
				this.openMaxwin(name)
			} else if (name == "B_Gameset") {
				this.openMaxwin(name)
			} else if (name == "B_Msg") {
				this.openMaxwin(name)
			} else if (name == "G_Record") {
				this.openMaxwin(name)
			} else if (name == "G_Announcement") {
				this.openMaxwin(name)
			} else if (name == "G_Clubcoins") {
				this.openMaxwin(name)
			} else if (name == "G_Peoples") {
				this.openMaxwin(name)
			} else if (name == "G_Meinfo") {
				this.openMaxwin(name)
			}
		}
	}

	private openMaxwin(e) {
		let G_Maxwindows = this.G_Maxwindows.getChildByName(e);
		this.G_Maxwindows.visible = true;
		G_Maxwindows.visible = true;
		egret.Tween.get(G_Maxwindows).to({
			scaleX: 1,
			scaleY: 1
		}, 200)
	}

	private CloseWin() {
		for (let i = 0; i < this.G_Maxwindows.numChildren; i++) {
			let NumbI = this.G_Maxwindows.getChildAt(i)
			if (NumbI.name[0] == "G") {
				if (NumbI.visible) {
					egret.Tween.get(NumbI).to({
						scaleX: 0,
						scaleY: 0,
						visible: false
					}, 200)
				}
			}
		}

		setTimeout(function (e) {
			e.visible = false
		}, 250, this.G_Maxwindows);
	}

	private HasMsg() {
		this.MsgButton.icon = "hhdz_hall_msg1Btn_png";
		egret.Tween.get(this.MsgButton, { loop: true }).to({
			currentState: "down"
		}, 100).to({
			currentState: "up"
		}, 100).to({
			currentState: "down"
		}, 100).to({
			currentState: "up"
		}, 100).to({
			currentState: "down"
		}, 100).to({
			currentState: "up"
		}, 100).wait(2000)
	}

	private Backtohome() {
		this.Main.stage.removeChild(this);
		this.Main.stage.addChild(this.home);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.On_TouchDT, this);
	}
}