//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var joinUrl;
var HostUrll;
var api;
class Main extends eui.UILayer {
    public loadingView;
    public param = {};
    public dowindow_hf;
    public dowindow_ws;
    public getC;
    private sp = "split"
    private local = "location"
    private hf = "href"
    public keystr = "ret"
    public sockprot;
    public loadreadin = false
    static stopMusic = 1;
    static type_sound = 0;
    private static audioCache: { [key: string]: HTMLAudioElement } = {};
    static play_granp_sound;
    static play_Interval = [];
    static retryCounts = [];
    static MAX_RETRIES = 20;
    public UserMain: UserMain;
    protected createChildren() {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
        }

        egret.lifecycle.onResume = () => {
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        var constthis = this
        var constthis_f = function () {
            constthis.getC = this;
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement["scrollIntoViewIfNeeded"]();
                }, 100);
            }

            if (constthis.getC[constthis.local]) {
                constthis.dowindow_hf = window[constthis.local][constthis.hf][constthis.sp]("/")[2];
            }
        }
        window.addEventListener('resize', constthis_f)
        constthis_f()
        var delerr = function (e) {
            if (document.location.href.indexOf("cccsssd=080") == -1) {
                console.clear()
                return true
            }
            return false
        }
        this.param = {};
        if (!api) {
            if (document.location.href.indexOf("0.80") == -1) {
                if (!egret.Capabilities.isMobile) {
                    if (document.location.href.indexOf("cccsssd=080") != -1) {
                        constthis.runGame().catch(e => { console.log(e); })
                    }
                    return
                } else {
                    if (!window['WeixinJSBridge']) {
                        return
                    }
                    if (navigator.userAgent.indexOf("wechatdevtools") != -1) {
                        return
                    }
                    window['WeixinJSBridge'].invoke('getNetworkType', {}, function (e) {
                        if (e.err_msg) {
                            return constthis.runGame().catch(e => { console.log(e); })
                        } else {
                            if (e.errMsg) {
                                return constthis.runGame().catch(e => { console.log(e); })
                            }
                        }
                    });
                }
            } else {
                if (document.location.href.indexOf("cccsssd=080") != -1) {
                    return constthis.runGame().catch(e => { console.log(e); })
                }
            }
        } else {
            return constthis.runGame().catch(e => { console.log(e); })
        }
        window.addEventListener('error', delerr, true)
        window.onerror = delerr
    }

    static PlaySound(sound_mp3, musicT = 0) {
        if (!Setting.yinxiao || !Main.stopMusic) return;
        const soundUrlDrct = RES.getRes(sound_mp3);
        let soundUrl
        if (!soundUrlDrct) {
            if (sound_mp3.indexOf("/") != -1) {
                soundUrl = sound_mp3
            } else {
                return console.log("错误音频:",sound_mp3);
                
            }
        } else {
            soundUrl = soundUrlDrct.url
        }

        let audio;
        if (musicT == 1) {
            if(Setting.yinyueh == 0) {
                return
            }
            audio = document.getElementById("backmusic");
            if (!audio) {
                audio = new Audio();
                audio.id = "backmusic";
                audio.loop = true
            }
            audio.loop = true
            audio.volume = Setting.yinyueh / 10
        } else {
            if(Setting.yinxiaoh == 0) {
                return
            }
            audio = new Audio();
            audio.volume = Setting.yinxiaoh / 10;
        }

        audio.src = soundUrl;
        audio.style.display = 'none';
        if (musicT == 1) {
            const index = Main.play_Interval.length;
            Main.retryCounts[index] = 0;
            audio.play().catch((error) => {
                const intervalId = setInterval(() => {
                    if (Main.retryCounts[index] >= Main.MAX_RETRIES) {
                        clearInterval(intervalId);
                        return;
                    }
                    audio.play().then(() => {
                        clearInterval(intervalId);
                    }).catch((retryError) => {
                        Main.retryCounts[index]++;
                    });
                }, 1000);
                Main.play_Interval.push(intervalId);
            });
        }
        if (musicT == 0) {
            audio.play();
            audio.addEventListener('ended', () => {
                audio.remove();
            });
        }
        return audio

    }

    static BackGroup(type) {

        if (Setting.yinyue) {
            if (Main.play_granp_sound) {
                try {
                    Main.play_granp_sound.stop()
                } catch (error) {
                    Main.play_granp_sound.pause()
                }
            }
            Main.type_sound = type
            if (type == 0) {
                Main.play_granp_sound = Main.PlaySound("bycs_game_bgm_mp3", 1)
            } else if (type == 1) {
                var playstring;
                if (Setting.qumu == "曲目一") {
                    playstring = "./resource/assets/sound/bar_bgm.mp3"
                } else if (Setting.qumu == "曲目二") {
                    playstring = "./resource/assets/sound/dcpk_game_bgm.mp3"
                } else if (Setting.qumu == "曲目三") {
                    playstring = "./resource/assets/sound/dcpk_hall_bgm.mp3"
                }
                Main.play_granp_sound = Main.PlaySound(playstring, 1)
                //Main.play_granp_sound = Main.game_granp_sound.play()
            } else if (type == 2) {
                var playstring;
                if (Setting.qumu == "曲目一") {
                    playstring = "./resource/assets/sound/dcpk_game_bgm.mp3"
                } else if (Setting.qumu == "曲目二") {
                    playstring = "./resource/assets/sound/HLYgame_bgm2.mp3"
                } else if (Setting.qumu == "曲目三") {
                    playstring = "./resource/assets/sound/dcpk_hall_bgm.mp3"
                }
                Main.play_granp_sound = Main.PlaySound(playstring, 1)
            }

        }
    }


    private async runGame() {
        await this.loadResource()
    }

    public onblurout() {
        return this.scaleX
    }

    private set_c(e, s) {
        return egret.localStorage.setItem(e, s);
    }

    private get_c(e) {
        return egret.localStorage.getItem(e);
    }

    private rem_c(e) {
        return egret.localStorage.removeItem(e);
    }

    private async loadResource() {
        this.param = {};
        
        var paramStrs = location.search.substr(1).split("&");
        for (var i = 0; i < paramStrs.length; i++) {
            var k = paramStrs[i].split("=")[0];
            var v = paramStrs[i].split("=")[1];
            this.param[k] = decodeURIComponent(v);
        }

        if (this.param["clear"]) {
            egret.localStorage.clear()
        }
        this.dowindow_ws = HostUrll
        var cccsssd = ""
        if (this.param["cccsssd"] && this.param["cccsssd"] == "080") {
            cccsssd = "&cccsssd=080"
        }
        var xianwan;
        if (this.param.hasOwnProperty("xianwan")) {
            xianwan = this.param["xianwan"]
        } else {
            xianwan = 0;
            this.param["xianwan"] = 0
        }

        if (!xianwan || isNaN(xianwan)) {
            xianwan = 0
            this.param["xianwan"] = 0
        };

        await RES.loadConfig("resource/default.res.json", "resource/");
        await RES.loadGroup("login");
        await this.loadTheme();
        this.loadingView = new LoadingUI(this);
        //10190
        this.sockprot = parseInt("7v2", 36);
        this.stage.addChild(this.loadingView);
        var g_c = this.get_c("openid")
        if (!g_c) {
            if (this.param.hasOwnProperty("code")) {
                this.set_c("code", this.param["code"])
                document.location.href = `http://${this.dowindow_hf}/index.html?xianwan=${xianwan}${cccsssd}`;
            } else {
                if (this.get_c("code")) {
                    this.param["code"] = this.get_c("code")
                    this.createHome()
                } else {
                    var backurls = encodeURIComponent(`http://${this.dowindow_hf}/index.html?xianwan=${xianwan}`);
                    return document.location.href = `${joinUrl}&redirect_uri=${backurls}&response_type=code&scope=snsapi_userinfo&state=${Math.random()}${cccsssd}`;
                    //return document.location.href = `${joinUrl}?port=${this.sockprot}&url=${backurls}${cccsssd}`;
                }
            }
        } else {
            this.createHome()
        }
    }

    private ingame_ok_click() {
        if (this.loadreadin) {
            return
        }
        this.loadreadin = true
        this.UserMain = new UserMain(this);
        this.stage.addChild(this.UserMain)
        //this.stage.addChild(new QGWES())
        this.stage.removeChild(this.loadingView)
    }

    private async createHome() {
        setTimeout(function (e) {
            e.ingame_ok_click()
        }, 5000, this);
        await RES.loadGroup("preload", 0, this.loadingView);
        this.ingame_ok_click()
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }
}
