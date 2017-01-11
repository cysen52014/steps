/**
 *
 * @author 
 *
 */
class SoundsCtrol extends egret.Sprite{
	public constructor() {
    	 super();
	}
    private ocss: egret.SpriteSheet;
	private TextF1;
	private cgMusic;
	private rePlay;
	private gock;
	private goshare;
    private shpcy;
    private oParent;
    private romCur;
    private touxian;
    private pplay;
    private xxxrto;
    private isToMusic = true;
    private isSelectMiusic;
    
    private creatSence (opts){ 
        this.oParent = opts;
        this.shpcy = new egret.Shape();
        this.shpcy.graphics.beginFill(0x000000,1);
        this.shpcy.graphics.drawRect(0,0,egret.MainContext.instance.stage.stageWidth,egret.MainContext.instance.stage.stageHeight);
        this.shpcy.graphics.endFill();
        this.shpcy.alpha = 0.1;
        this.shpcy.touchEnabled = true;
        this.shpcy.pixelHitTest = true;
        this.addChild(this.shpcy);
        
        this.isSelectMiusic = egret.localStorage.getItem('isSelectMiusic') == null ? '0' : egret.localStorage.getItem('isSelectMiusic');
        
        
        this.shpcy.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt) {
            evt.stopImmediatePropagation();
        },this);
    	
        this.ocss = RES.getRes("ocs_json");
        this.TextF1 = new egret.Bitmap();
        this.TextF1.texture = this.ocss.getTexture("sa_21");
        this.TextF1.x = (egret.MainContext.instance.stage.stageWidth - this.TextF1.width) / 2;
        this.TextF1.y = 48;
        this.TextF1.visible = true;
        this.addChild(this.TextF1);
        
        this.cgMusic = new egret.Bitmap(); 
        if(!parseInt(this.isSelectMiusic)){
            this.cgMusic.texture = this.ocss.getTexture("sa_29");
            egret.localStorage.setItem('isSelectMiusic','1');
        }else{
            this.cgMusic.texture = this.ocss.getTexture("sa_22");
        }
        this.cgMusic.x = (egret.MainContext.instance.stage.stageWidth - this.cgMusic.width) / 2;
        this.cgMusic.y = 300;
        this.cgMusic.visible = true;
        this.cgMusic.touchEnabled = true;
        this.addChild(this.cgMusic);
        
        this.xxxrto = new egret.Bitmap();
        this.xxxrto.texture = this.ocss.getTexture("sa_9");
        this.xxxrto.scaleX = 1.4;
        this.xxxrto.scaleY = 1.4;
        this.xxxrto.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 470;
        this.xxxrto.y = 245;
        this.xxxrto.visible = true;
        this.addChild(this.xxxrto);
        
        this.touxian = new egret.Bitmap();
        this.touxian.x = (egret.MainContext.instance.stage.stageWidth - this.touxian.width) / 2 - 380;
        this.touxian.y = 262;
        this.touxian.visible = true;
        this.touxian.touchEnabled = true;
        this.addChild(this.touxian);
        
        var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(50,50,50);
        circle.graphics.endFill();
        circle.anchorOffsetX = 50;
        circle.anchorOffsetY = 50;
        circle.x = (egret.MainContext.instance.stage.stageWidth - this.touxian.width) / 2 - 380;
        circle.y = 262;
        this.addChild(circle);

        this.touxian.mask = circle;
        
        this.rePlay = new egret.Bitmap();
        this.rePlay.texture = this.ocss.getTexture("sa_23");
        this.rePlay.x = (egret.MainContext.instance.stage.stageWidth - this.rePlay.width) / 2;
        this.rePlay.y = 420;
        this.rePlay.visible = true;
        this.rePlay.touchEnabled = true;
        this.addChild(this.rePlay);
        
        
        this.gock = new egret.Bitmap();
        this.gock.texture = this.ocss.getTexture("sa_25");
        this.gock.x = (egret.MainContext.instance.stage.stageWidth - this.gock.width) / 2 - 350;
        this.gock.y = 480;
        this.gock.visible = true;
        this.gock.touchEnabled = true;
        this.addChild(this.gock);
        
        
        this.goshare = new egret.Bitmap();
        this.goshare.texture = this.ocss.getTexture("sa_24");
        this.goshare.x = (egret.MainContext.instance.stage.stageWidth - this.goshare.width) / 2 + 350;
        this.goshare.y = 480;
        this.goshare.visible = true;
        this.goshare.touchEnabled = true;
        this.addChild(this.goshare);
        
        this.rePlay.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt) {
            this.rePlayed();
        },this);
        
        
        this.cgMusic.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt) {
            if(this.isToMusic) {
                this.cgMusic.texture = this.ocss.getTexture("sa_22");
                this.isToMusic = false;
                var startlayer = this.oParent.startLayer; 
                startlayer.musicPlay.texture = startlayer.occ.getTexture("sa_5");
                
                startlayer.music.isOpenMusic = true;
                startlayer.oParent.isOpenMusic = true;                
                this.rodomMusic();
            }
        },this);
        
        this.goshare.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt) {
            callJsShareFun(2);
        },this);
        
        this.gock.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt) {
            this.visible = false;
            this.oParent.score.visible = true;
            this.oParent.gold.visible = true;
            this.pplay.visible = true; 
            this.oParent.GameoverLayer.visible = true;
            this.pplay.hidePops();
            this.pplay.showPops(4);
            this.oParent.musicChose = 3;
            this.oParent.MisicUl.stopMiuc();
            this.oParent.MisicUl.playMusic();
            callJsShowUpLoadBotton(1);
            //this.oParent.poplayer.showPops(3);
            //this.oParent.poplayer.hidePops(3)
        },this);
        
        
	}
	private Mcmap(){
        this.cgMusic.texture = this.ocss.getTexture("sa_29");
	}
    private rodomMusic() { 
        //this.oParent.MisicUl._channel.stop();
        var rm = Math.floor(Math.random() * (this.oParent.micArrList.length-1)) + 1; 
        this.romCur = rm; 
        InterfaceData.musicId = rm;
        callJsMusicIdFun(InterfaceData.musicId);
        var st = this.oParent.micArrList[rm]['yy'][0]; 
        var ed = this.oParent.micArrList[rm]['yy'][1];
        this.oParent.MisicUl.changeMusic(st,ed);
	}
	private rePlayed(){
        if(this.romCur){
        var st = this.oParent.micArrList[this.romCur]['yy'][0];
        var ed = this.oParent.micArrList[this.romCur]['yy'][1];
        this.oParent.MisicUl.changeMusic(st,ed)
        }
	}
    private addTx(ppl){
        this.pplay = ppl;
        RES.getResByUrl(InterfaceData.photos,function(event: any) {
            var img: egret.Texture = <egret.Texture>event;
            this.touxian.texture = img;
            this.touxian.width = 100;
            this.touxian.height = 100;
            this.touxian.anchorOffsetX = 50;
            this.touxian.anchorOffsetY = 50;
            
            
        },this,RES.ResourceItem.TYPE_IMAGE);
    }
}
