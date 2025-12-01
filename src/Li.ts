// TypeScript file
class Li extends jQuers {
    byte: egret.ByteArray;
    hops: boolean = false;
    title = String;
    home: Main;
    loadui: LoadingUI;
    public constructor(B = false, o:Main) {
        super();
        if (B) {
            this.byte = this.makearr();
        }
        this.home = o
    }

    public fash(n, data) {
        this.file(n, data)
    }

    public Content(dic){
        return dic._data.compressedContent
    }

    public commu(k, t) {
        return (k + t) % 255;
    }

    public makearr() {
        this.hops = true;
        return new egret.ByteArray()
    }

    public rint() {
        return this.byte.readInt();
    }

    private dataG(dic) {
        var compressedContent = this.Content(dic);
        return compressedContent;
    }

    public readbuffer(t) {
        var nbyte = this.makearr()
        var dois = this.home.loadingView.getChildAt(0).anchorOffsetX
        
        
        this.byte.readBytes(nbyte, dois, t);
        return nbyte
    }
    

    public Ulib(data, K) {
        var newdata = []
        var config_s = new Uint8Array(data);
        var nbyte = this.makearr();
        nbyte.writeInt(config_s.byteLength);
        for (var i = 0; i < config_s.byteLength; i++) {
            if (i < K) {
                config_s[i] = this.commu(config_s[i], K);
            }
            nbyte.writeByte(config_s[i]);
        }
        return nbyte
    }

    public decode(e){
        var aas = new egret.ByteArray(e)
        return aas.readUTFBytes(aas.length)
    }

    public changesize(d: egret.ByteArray, k2) {
        if (!this.hops) {
            for (var i = 0; i < k2; i++) {
                if(i < d.length){
                    d.bytes[i] = d.bytes[i] ^ k2
                } else {
                    break
                }
            }
        }
        return d
    }

    public keyreturn(d, u, m = null) {
        var ks;
        if(this.home) {
            ks = this.home.onblurout();
        }
        if(!ks){
            ks = m
        }
        var o = u + ks
        return d * o + o
    }

    private lookSt(name) {
        return this.dataG(this.files[name])
    }
}