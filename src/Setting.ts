class Setting extends eui.Component implements eui.UIComponent {
	
	private _YingYue_h: eui.HSlider;
	private _YingXiao_h: eui.HSlider;
	static yinxiao = true;
	static yinyue = true;
	static pokeyList = [
		"10",
		"11",
		"12",
		"13",
		"20",
		"21",
		"22",
		"23",
		"30",
		"31",
		"32",
		"33",
		"40",
		"41",
		"42",
		"43",
		"50",
		"51",
		"52",
		"53",
		"60",
		"61",
		"62",
		"63",
		"70",
		"71",
		"72",
		"73",
		"80",
		"81",
		"82",
		"83",
		"90",
		"91",
		"92",
		"93",
		"00",
		"01",
		"02",
		"03",
		"100",
		"101",
		"102",
		"103",
		"110",
		"111",
		"112",
		"113",
		"120",
		"121",
		"122",
		"123",
		"130",
		"131"
	];

	static GamenaozhongXY = {
		"0": [230, 1420],
		"1": [760, 390],
		"2": [280, 570],
		"3": [800, 570],
		"N": [540, 1240]
	}

	static AnimationXY = {
		"0": [45, 1785],
		"1": [715, 162],
		"2": [90, 475],
		"3": [878, 475],
	}

	static EmoSound = {
		"beer": 0,
		"boom": 1,
		"egg": 2,
		"grab": 3,
		"handshake": 4,
		"kiss": 5,
		"rose": 6,
		"soap": 7,
		"tomato": 8,
		"zan": 9,
		"love": 10
	}

	static GameBiaoqingXY = {
		"0": [50, 1520, 0],
		"1": [690, 160, 320],
		"2": [200, 470, 0],
		"3": [850, 470, 320],
	}

	static Me_Dist = {
		id: 100000,
		card: ["10", "11", "13", "81", "80"]
	};
	static All_Club;
	static dowindow_ws;
	static GameName = ["钓红点", "七鬼五二三"]
	static yinyueh = 5;
	static qumu = '曲目一';
	static yinxiaoh = 5;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private On_YingYue_h() {
		egret.localStorage.setItem("yinyueh", this._YingYue_h.value.toString())
		Setting.yinyueh = this._YingYue_h.value
		if (Main.play_granp_sound) {
			Main.play_granp_sound.volume = this._YingYue_h.value / 10
			if(Main.play_granp_sound.paused) {
				if(this._YingYue_h.value != 0) {
					Main.play_granp_sound.play()
				}
			} else {
				if(this._YingYue_h.value == 0) {
					Main.play_granp_sound.pause()
				}
			}
		} else {
			if(this._YingYue_h.value != 0){
				Main.BackGroup(Main.type_sound)
			}
		}
		
	}

	private On_YingXiao_h() {
		egret.localStorage.setItem("yinxiaoh", this._YingXiao_h.value.toString())
		Setting.yinxiaoh = this._YingXiao_h.value
		
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this._YingYue_h.addEventListener(egret.Event.CHANGE, this.On_YingYue_h, this)
		this._YingXiao_h.addEventListener(egret.Event.CHANGE, this.On_YingXiao_h, this)
	}
}