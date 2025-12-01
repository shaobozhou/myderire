class UserMain extends eui.Component implements eui.UIComponent {
	private Main: Main;
	private InfoGroup: eui.Group;
	private GameinfoArray: eui.ArrayCollection;
	private CreategroupArray: eui.ArrayCollection;
	private GameinfoScroller: eui.List;
	private HeadSelectScroller: eui.List;
	private DeskList: eui.Group;
	private InfoTimeOut;
	private HeadSelectPal: eui.Group;
	private Club: Club;
	private QGWES: QGWES;
	private isScrolling: boolean = false;
	private scrollEndTimer: number;
	private Clubheadpat: Head;
	private Clubnamepat: eui.EditableText;
	private Pri_TitleBit: eui.BitmapLabel;
	private Scrollers1: eui.Scroller;
	private Scrollers2: eui.Scroller;
	private Scrollers3: eui.Scroller;
	private Scrollers4: eui.Scroller;
	private Scrollers5: eui.Scroller;
	private home;
	public constructor(e) {
		super();
		this.Main = e;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private Info(txt) {
		clearTimeout(this.InfoTimeOut);
		egret.Tween.removeTweens(this.InfoGroup)
		let SleepTimetemp = txt.length * 400
		this.InfoGroup.visible = true;
		this.InfoGroup.alpha = 1;
		let Labeltxt: eui.Label = this.InfoGroup.getChildAt(1);
		Labeltxt.text = txt
		this.InfoTimeOut = setTimeout(function () {
			egret.Tween.get(this.InfoGroup).to({
				alpha: 0,
				visible: false
			}, 1000)
		}, SleepTimetemp, this.InfoGroup)
	}

	private On_TouchDT(e) {
		let name;
		let Dispatch;
		if (this.isScrolling) {
			return;
		}
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

			if (name == "B_Close") {
				this.CloseKuaisuyouxi()
			} else if (name == "B_Chuangjian_OK") {
				let nameString = this.Clubnamepat.text;
				let headString = this.Clubheadpat.C_Headimg;
				if (nameString.length > 0) {
					let SendJson = {
						Name: nameString,
						Head: headString
					}

					SendJson["ID"] = "125121";
					SendJson["Length"] = "1";
					SendJson["Game"] = "0";
					this.addClubPAT(SendJson)
				}
				this.CloseWininfo()
			} else if (name == "B_Chuangjian") {
				this.ShowWininfo("G_AddClub")
			} else if (name == "B_ChangeHead") {
				this.HeadSelectPal.visible = true;
			} else if (name == "B_CloseWin") {
				this.CloseWininfo()
			} else if (name == "B_Shezhi") {
				this.ShowKuaisuyouxi(4)
			} else if (name == "B_Jilu") {
				this.ShowKuaisuyouxi(6)
			} else if (name == "B_Yonghu") {
				this.ShowKuaisuyouxi(5)
			} else if (name == "B_Commodity") {
				if (Dispatch.C_PaymentMoney == "10000") {

				} else if (Dispatch.C_PaymentMoney == "1000") {

				} else if (Dispatch.C_PaymentMoney == "6.00") {

				} else if (Dispatch.C_PaymentMoney == "18.00") {

				} else if (Dispatch.C_PaymentMoney == "30.00") {

				} else if (Dispatch.C_PaymentMoney == "128.00") {

				} else if (Dispatch.C_PaymentMoney == "328.00") {

				}
			} else if (name == "L_CreategroupScroller") {
				if(!Dispatch.data) {
					return
				}
				let SendJson = {
					ID: Dispatch.data.ID
				}
				SendJson["Head"] = Dispatch.data.Head;
				SendJson["Name"] = Dispatch.data.Name;
				SendJson["Length"] = Dispatch.data.Length;
				SendJson["Game"] = Dispatch.data.Game;
				this.CloseKuaisuyouxi()
				this.GotoClubmain(SendJson)
			} else if (name[0] == "T") {
				let TabelnumList = name.replace("T_Tabel", "").split("_");
				let Tabelnum = Number(TabelnumList[0]);
				let Tabeltype = Number(TabelnumList[1]);
				let SendJson = {
					type: Tabeltype,
					tabel: Tabelnum
				}
				this.GotoGamemain(SendJson);
			} else if (name[0] == "B" && name[2] == "D") {
				egret.Tween.get(Dispatch).to({
					scaleY: 10,
					scaleX: 10,
					alpha: 0
				}, 200).call(function (e) {
					if (e == "B_DDiaohongdian") {
						this.ShowKuaisuyouxi(0)
					} else if (e == "B_DQiguiwuersan") {
						this.ShowKuaisuyouxi(1)
					} else if (e == "B_DShangcheng") {
						this.ShowKuaisuyouxi(2)
					} else if (e == "B_DPengyouquan") {
						this.ShowKuaisuyouxi(3)
					}
				}, this, [name]).wait(1000).call(function (e) {
					e.scaleY = 1.7;
					e.scaleX = 1.7;
					e.alpha = 1;
				}, this, [Dispatch])
			}
		}
	}

	private GotoGamemain(e) {
		this.Main.stage.removeChild(this);
		console.log(e);

		if (e["type"] == 1) {
			this.QGWES = new QGWES(this, this.Main, e)
			this.Main.stage.addChild(this.QGWES);
		}
	}

	private GotoClubmain(e) {
		this.Main.stage.removeChild(this);
		if (!this.Club) {
			this.Club = new Club(this, this.Main, e)
		}
		this.Main.stage.addChild(this.Club);
	}

	private addClubPAT(e) {
		this.CreategroupArray.addItem(e)
	}

	private SetGameinfo(e = null) {
		/*
		e = {
			gamelist: [{
				"roomid": 885522,
				"type": 1,
				"timeTemp": 1763318041955,
				"users": {
					"1515115": {
						"id": 1515115,
						"headimgurl": "https://sf6-cdn-tos.bdxiguastatic.com/img/user-avatar/8261d233cb2d937fa1a394dc43b0c373~300x300.image",
						"nickname": "VIP"
					},
					"1518112": {
						"id": 1518112,
						"headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIuADne7YZ7IyAkgGFe3Cl80A0zH9rVlVd8YWDuYKgiaHJBCRG8M7950WiagzEbv1cTTWjNkrichda2g/132",
						"nickname": "zzbx1"
					},
				},
				"winlist": [{
					"id": 1515115,
					"win": 10
				}, {
					"id": 1518112,
					"win": -10
				}]
			}, {
				"roomid": 123456,
				"type": 0,
				"timeTemp": 1763317041955,
				"users": {
					"1515115": {
						"id": 1515115,
						"headimgurl": "https://sf6-cdn-tos.bdxiguastatic.com/img/user-avatar/8261d233cb2d937fa1a394dc43b0c373~300x300.image",
						"nickname": "VIP"
					},
					"1518112": {
						"id": 1518112,
						"headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIuADne7YZ7IyAkgGFe3Cl80A0zH9rVlVd8YWDuYKgiaHJBCRG8M7950WiagzEbv1cTTWjNkrichda2g/132",
						"nickname": "zzbx1"
					},
				},
				"winlist": [{
					"id": 1515115,
					"win": 10
				}, {
					"id": 1518112,
					"win": -10
				}]
			}]
		}
		*/
		let SetData = [];
		for (let index = 0; index < e["gamelist"].length; index++) {
			let element = e["gamelist"][index];
			let gname = Setting.GameName[element["type"]];
			let datapol = [];
			for (let index2 = 0; index2 < element["winlist"].length; index2++) {
				let winlist = element["winlist"][index2];
				let wincolor = 0x1ee000;
				let addpush = ""
				if (winlist.win >= 0) {
					wincolor = 0x00FFEE
					addpush = "+"
				}
				datapol.push({
					"win": addpush + winlist.win,
					"id": winlist.id,
					"headimgurl": element.users[winlist.id]["headimgurl"],
					"wincolor": wincolor
				})
			}
			SetData.push({
				roomid: element["roomid"],
				gameStr: gname,
				timeTemp: new Date(element["timeTemp"]).toLocaleString(),
				datapol: new eui.ArrayCollection(datapol)
			});
		}
		this.GameinfoArray.replaceAll(SetData);

	}

	private ShowWininfo(openName) {
		let G_Wininfo = this.getChildByName("G_Wininfo");
		G_Wininfo.visible = true;
		let NumbI = G_Wininfo.getChildByName(openName)
		NumbI.visible = true
		egret.Tween.get(NumbI).to({
			scaleX: 1,
			scaleY: 1,
		}, 200)
	}

	private ShowKuaisuyouxi(type) {
		let G_Kuaisuyouxi = this.getChildByName("G_Maxwins");
		G_Kuaisuyouxi.visible = true
		let openName;
		if (type == 0 || type == 1) {
			openName = "G_Kuaisuyouxi";
			for (let i = 0; i < this.DeskList.numChildren; i++) {
				this.DeskList.getChildAt(i).name = `T_Tabel${i}_${type}`
			}
			this.Pri_TitleBit.text = Setting.GameName[type]
		} else if (type == 2) {
			openName = "G_Shangdian";
		} else if (type == 3) {
			openName = "G_Quanzu";
		} else if (type == 4) {
			openName = "G_Shezhi";
		} else if (type == 5) {
			openName = "G_Yonghu";
		} else if (type == 6) {
			openName = "G_Jilu";
			//this.SetGameinfo()
		}
		let NumbI = G_Kuaisuyouxi.getChildByName(openName)
		NumbI.visible = true
		egret.Tween.get(NumbI).to({
			scaleX: 1,
			scaleY: 1
		}, 200)
	}

	private CloseWininfo() {
		this.HeadSelectPal.visible = false;
		let G_Kuaisuyouxi = this.getChildByName("G_Wininfo");
		for (let i = 0; i < G_Kuaisuyouxi.numChildren; i++) {
			let NumbI = G_Kuaisuyouxi.getChildAt(i)
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
		}, 250, G_Kuaisuyouxi);
	}

	private CloseKuaisuyouxi() {
		let G_Kuaisuyouxi = this.getChildByName("G_Maxwins");
		for (let i = 0; i < G_Kuaisuyouxi.numChildren; i++) {
			let NumbI = G_Kuaisuyouxi.getChildAt(i)
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
		}, 250, G_Kuaisuyouxi);
	}

	private HeadSelectListClick(e) {
		this.Clubheadpat.C_Headimg = this.HeadSelectScroller.selectedItem["headimg"];
		this.HeadSelectPal.visible = false;
	}

	private onScrollStart(): void {
		this.isScrolling = true;
		if (this.scrollEndTimer) {
			clearTimeout(this.scrollEndTimer);
		}
	}

	private onScrollEnd(): void {
		this.scrollEndTimer = setTimeout(() => {
			this.isScrolling = false;
		}, 200);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.On_TouchDT, this);
		this.HeadSelectScroller.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.HeadSelectListClick, this);
		this.CloseKuaisuyouxi()

		let G_Scrollers = [this.Scrollers1, this.Scrollers2, this.Scrollers3, this.Scrollers4, this.Scrollers5]
		for (let i = 0; i < G_Scrollers.length; i++) {
			let scroller: eui.Scroller = G_Scrollers[i];
			if (scroller) {
				scroller.addEventListener(eui.UIEvent.CHANGE_START, this.onScrollStart, this);
				scroller.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollEnd, this);
			}
		}
	}
}