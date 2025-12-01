class QGWES extends eui.Component implements eui.UIComponent {
	private Userpokeys: eui.Group;
	private cardIndex = 0;
	private Pokeymian: eui.Group;
	private Downmian: eui.Group;
	private Mepokeys: eui.Group;
	private Pushpokeys: eui.Group;
	private Headmainlist: eui.Group;
	private Biaoqing: eui.Group;
	private Menugroup: eui.Group;
	private AnimationS: eui.Group;
	private Pokeylist = [];
	private Main: Main;
	private home: UserMain;
	private Roomdata = {
		chengyuan: []
	};
	
	public constructor(e, s, c) {
		super();
		this.home = e;
		this.Main = s;
		for (var varTab in c) {
			this.Roomdata[varTab] = c[varTab];
		}
		if (c["tabel"] == 0) {
			this.currentState = "player2";
		} else if (c["tabel"] == 1) {
			this.currentState = "player3";
		} else if (c["tabel"] == 2) {
			this.currentState = "player4";
		}
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private On_TouchDT(e) {
		let name;
		let Dispatch;
		if (e.target) {
			name = e.target.name;
			Dispatch = e.target;
		} else {
			name = e;
		}
		if (name) {
			if (e != name && name != "O_Deskimg") {
				Main.PlaySound("click_mp3");
			}

			if (name[0] == "H") {
				let intZuowei = Number(name.replace("H_", ""));
				if (true || intZuowei != 0) {
					let gamexyz = Setting.GameBiaoqingXY[intZuowei];
					this.Biaoqing.anchorOffsetX = gamexyz[2];
					this.Biaoqing.visible = true;
					this.Biaoqing.x = gamexyz[0];
					this.Biaoqing.y = gamexyz[1];
					this.Biaoqing.getChildAt(2).text = Dispatch.C_UID;
					egret.Tween.get(this.Biaoqing).to({
						scaleX: 1,
						scaleY: 1
					}, 200, egret.Ease.backOut);
				}
			} else if (name == "O_Deskimg") {
				for (let index = 0; index < this.Mepokeys.numChildren; index++) {
					if (this.Mepokeys.getChildAt(index).scaleY == 0.6) {
						this.Mepokeys.getChildAt(index).scaleY = 0.5;
						this.Mepokeys.getChildAt(index).scaleX = 0.5;
					}
				}
				if (this.Biaoqing.scaleX != 0) {
					egret.Tween.get(this.Biaoqing).to({
						scaleX: 0,
						scaleY: 0,
						visible: false
					}, 200, egret.Ease.backIn);
				}
				if (this.Menugroup.width == 350) {
					this.Menugroup.getChildAt(1).visible = false;
					egret.Tween.get(this.Menugroup).to({
						width: 110,
						height: 80
					}, 300, egret.Ease.backOut);
				}
			} else if (name == "B_backtohome") {
				this.GoToHome();
			} else if (name == "B_Changeroom") {
			} else if (name == "B_Gamedata") {
			} else if (name == "B_Gamesite") {
			} else if (name == "B_Topmenus") {
				if (this.Menugroup.width != 350) {
					egret.Tween.get(this.Menugroup).to({
						width: 350,
						height: 430
					}, 300, egret.Ease.backOut);
					setTimeout(function (w) {
						w.visible = true;
					}, 300, this.Menugroup.getChildAt(1));
				}
			} else if (name == "B_sendpokey") {
				let hasPokeyslist = [];
				for (let index = 0; index < this.Mepokeys.numChildren; index++) {
					let indexDispatch = this.Mepokeys.getChildAt(index);
					if (indexDispatch.scaleY == 0.6) {
						hasPokeyslist.push(indexDispatch);
					}
				}
				this.sendPokey(hasPokeyslist);
			} else if (name[0] == "E") {
				this.playDH({
					meuid: this.Headmainlist.getChildAt(3).C_UID,
					touid: this.Biaoqing.getChildAt(2).text,
					name: name.replace("E_", "")
				});
			} else if (name[0] == "P") {
				if (Dispatch.scaleY == 0.5) {
					Dispatch.scaleY = 0.6;
					Dispatch.scaleX = 0.6;
				} else {
					let painums = 0;
					for (let index = 0; index < Dispatch.parent.numChildren; index++) {
						if (Dispatch.parent.getChildAt(index).scaleY == 0.6) {
							painums++;
						}
					}
					if (painums == 1) {
						this.sendPokey([Dispatch]);
					} else if (painums >= 2) {
						Dispatch.scaleY = 0.5;
						Dispatch.scaleX = 0.5;
					}
				}
			}
		}
	}

	private playDH(e) {
		let startXY;
		let endXY;
		let DispatchIMG: NewImage;
		let DHname = e["name"];
		let Target_Head: Headmain
		
		for (let index = 0; index < this.AnimationS.numChildren; index++) {
			if (!this.AnimationS.getChildAt(index).visible) {
				DispatchIMG = this.AnimationS.getChildAt(index);
				DispatchIMG.visible = true;
				break;
			}
		}
		if (!DispatchIMG) {
			DispatchIMG = new NewImage();
			this.AnimationS.addChild(DispatchIMG);
		}


		DispatchIMG.source = `${DHname}_png`;
		if (!RES.getRes(`${DHname}_png`)) {
			console.error(`表情资源不存在：${DHname}_png`);
			return;
		}


		for (let index = 0; index < this.Headmainlist.numChildren; index++) {
			const head = this.Headmainlist.getChildAt(index);
			if (head && head.C_UID && Number(head.C_UID) === Number(e["meuid"])) {
				startXY = Setting.AnimationXY[index];
			}
			if (head && head.C_UID && Number(head.C_UID) === Number(e["touid"])) {
				endXY = Setting.AnimationXY[index];
				Target_Head = head
			}
		}


		if (!startXY || !endXY) {
			console.error("起始/目标坐标获取失败", e, Setting.AnimationXY);
			return;
		}
		DispatchIMG.SetBezier(startXY[0], startXY[1], endXY[0], endXY[1])
		egret.Tween.get(DispatchIMG).to({
			factor: 1
		}, 500).call(function(e, s: Headmain, n){
			e.visible = false;
			s.playName(n);
		}, this, [DispatchIMG, Target_Head, DHname])
	}

	private GoToHome() {
		this.Main.stage.removeChild(this);
		this.Main.stage.addChild(this.home);
	}

	private sendPokey(pokeyDispathList) {
		let Sendjson = {
			uid: 100000,
			plist: []
		};
		for (let index = 0; index < pokeyDispathList.length; index++) {
			let indexDispatch: Pokey = pokeyDispathList[index];
			Sendjson['plist'].push(indexDispatch.currentState);
		}
		for (let index = 0; index < this.Pushpokeys.numChildren; index++) {
			let indexGroup: eui.Group = this.Pushpokeys.getChildAt(index);
			let GroupNums = indexGroup.numChildren;
			for (let indexpokey = 0; indexpokey < GroupNums; indexpokey++) {
				let indexDispatch: Pokey = indexGroup.getChildAt(0);
				let newDispatx = indexGroup.x + indexDispatch.x;
				let newDispaty = indexGroup.y + indexDispatch.y;
				indexGroup.removeChild(indexDispatch);
				indexDispatch.x = newDispatx;
				indexDispatch.y = newDispaty;
				this.Userpokeys.addChild(indexDispatch);
				egret.Tween.get(indexDispatch).to({
					x: this.Downmian.x,
					y: this.Downmian.y,
					rotation: 0
				}, 100).call(function (e, s, l) {
					s.removeChild(e);
					l.addChild(e);
				}, this, [indexDispatch, this.Userpokeys, this.Downmian]);
			}
		}
		this.OnsendPokey(Sendjson);
		this.getChildByName("B_sendpokey").visible = false;
	}

	private OnsendPokey(e) {
		let downIndex = 0;
		for (let index = 0; index < this.Headmainlist.numChildren; index++) {
			let headH: Headmain = this.Headmainlist.getChildAt(index);
			if (true || headH.C_UID == e["uid"]) {
				for (let iplist = 0; iplist < e["plist"].length; iplist++) {
					let DispatchPokey: Pokey;
					let Ispokeys: eui.Group = this.Userpokeys.getChildAt(index);
					let Topokeys: eui.Group = this.Pushpokeys.getChildAt(index);
					let pokeyState = e["plist"][iplist];
					if (e["uid"] == Setting.Me_Dist.id) {
						let Dispatchindex: Pokey;
						for (let indexpokey = 0; indexpokey < Ispokeys.numChildren; indexpokey++) {
							Dispatchindex = Ispokeys.getChildAt(indexpokey);
							if (Dispatchindex.currentState == pokeyState) {
								break;
							}
						}
						DispatchPokey = Dispatchindex;
					} else {
						DispatchPokey = Ispokeys.getChildAt(0);
					}
					let newDispatx = DispatchPokey.x + Ispokeys.x;
					let newDispaty = DispatchPokey.y + Ispokeys.y;
					Ispokeys.removeChild(DispatchPokey);
					this.Userpokeys.addChild(DispatchPokey);
					DispatchPokey.x = newDispatx;
					DispatchPokey.y = newDispatx; // 这里笔误：应该是 newDispaty
					DispatchPokey.currentState = pokeyState;
					egret.Tween.get(DispatchPokey).to({
						x: Topokeys.x,
						y: Topokeys.y,
						scaleX: 0.4,
						scaleY: 0.4
					}, 100).call(function (e, s, l) {
						s.removeChild(e);
						l.addChild(e);
					}, this, [DispatchPokey, this.Userpokeys, Topokeys]);
				}
			}
		}
	}

	private downPokey(e) {

	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardIndex = 0;
		for (let index = 0; index < Setting.pokeyList.length; index++) {
			let Npokeys = new Pokey();
			Npokeys.scaleX = 0.3;
			Npokeys.scaleY = 0.3;
			Npokeys.anchorOffsetX = 150;
			Npokeys.anchorOffsetY = 208;
			Npokeys.name = "";
			Npokeys.touchEnabled = true;
			Npokeys.touchChildren = false;
			this.Pokeylist.push(Npokeys);
		}
		this.Shoupai();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.On_TouchDT, this);
	}

	private Shoupai() {
		this.Pokeymian.removeChildren();
		this.Downmian.removeChildren();
		let Startpoxy = [540, 700];
		for (let index = 0; index < this.Userpokeys.numChildren; index++) {
			let pokeygroup = this.Userpokeys.getChildAt(index);
			pokeygroup.removeChildren();
		}
		for (let index = 0; index < this.Pushpokeys.numChildren; index++) {
			let pokeygroup = this.Pushpokeys.getChildAt(index);
			pokeygroup.removeChildren();
		}
		for (let index = 0; index < this.Pokeylist.length; index++) {
			let Npokeys = this.Pokeylist[index];
			Npokeys.x = Startpoxy[0];
			Npokeys.y = Startpoxy[1];
			Startpoxy[0] += 0.2;
			Startpoxy[1] -= 0.2;
			this.Pokeymian.addChild(Npokeys);
		}
	}

	private Gotofapai(renshu, pnum = 1) {
		if (renshu <= 1) {
			renshu = 2;
		}
		let numsleep = 0;
		for (let index = 0; index < renshu; index++) {
			let GroupXY = this.Userpokeys.getChildAt(index);
			if (GroupXY.numChildren < 5) {
				let topushnums = pnum;
				for (this.cardIndex; this.cardIndex < this.Pokeylist.length;) {
					let onpokey: Pokey = this.Pokeylist[this.cardIndex];
					let onscalex = 0.4;
					let onscaley = 0.4;
					let onrotation = 0;
					let caedname;
					if (index == 0) {
						if (Setting.Me_Dist.card.length > 0) {
							caedname = Setting.Me_Dist.card[GroupXY.numChildren];
						}
						onscalex = 0.5;
						onscaley = 0.5;
					}
					if (index == 2 || index == 3) {
						onrotation = 90;
					}
					onpokey.rotation = -360;
					let tws = egret.Tween.get(onpokey).wait(numsleep).to({
						scaleX: onscalex,
						scaleY: onscaley,
						x: GroupXY.x,
						y: GroupXY.y,
						rotation: onrotation
					}, 150).call(function (e, s, k) {
						k.removeChild(s);
						e.addChild(s);
					}, this, [GroupXY, onpokey, this.Pokeymian]);
					if (caedname) {
						onpokey.name = "P_M" + GroupXY.numChildren;
						tws.to({ scaleX: 0 }, 50).call(function (w, s: Pokey) {
							s.currentState = w;
						}, this, [caedname, onpokey]).to({ scaleX: 0.5 }, 50);
					}
					numsleep += 80;
					topushnums--;
					this.cardIndex++;
					if (topushnums == 0) {
						break;
					}
				}
			}
		}
	}

}