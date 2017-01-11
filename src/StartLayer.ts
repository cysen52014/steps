/**
 *
 * @author 
 *
 */
class StartLayer extends egret.Sprite{
	public constructor() {
    	   super();
         
	}
    private startBtn: egret.Bitmap;
    private stageW: number = egret.MainContext.instance.stage.stageWidth;
    private stageH: number = egret.MainContext.instance.stage.stageHeight;
    private shp: egret.Shape;
    private lwsays;
    private isko = false;
    private musicPlay;
    private music;
    private occ;
    private oParent;
    private sy_json = RES.getRes("sy_json");
    private sy_png = RES.getRes("sy_png");
    private sy_mc: egret.MovieClip;
    
	private createUl(opt){
        this.oParent = opt;
        this.music = opt.MisicUl;
        this.shp = new egret.Shape();
        this.shp.graphics.beginFill(0xff0000,1);
        this.shp.graphics.drawRect(0,0,this.stageW,this.stageH);
        this.shp.graphics.endFill();
        this.shp.alpha = 0;
        this.shp.touchEnabled = true;
        //this.stage.pixelHitTest = true;
        this.addChild(this.shp);
        
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.sy_json,this.sy_png);
        this.sy_mc = new egret.MovieClip(mcFactory.generateMovieClipData("syc")); 
        this.sy_mc.x = egret.MainContext.instance.stage.stageWidth - this.sy_mc.width - 40;
        this.sy_mc.y = 130;
        this.sy_mc.play(-1);
        this.addChild(this.sy_mc);

    	  
        this.shp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt){
            evt.stopImmediatePropagation();
        },this);
        
        this.occ = RES.getRes("ocs_json");
        this.startBtn = new egret.Bitmap();
        this.startBtn.texture = this.occ.getTexture("sa_2");
        this.startBtn.x = (egret.MainContext.instance.stage.stageWidth - this.startBtn.width) / 2;
        this.startBtn.y = 535;
        this.startBtn.touchEnabled = true;
        this.addChild(this.startBtn);
        
        
        this.lwsays = new egret.Bitmap();
        this.lwsays.texture = this.occ.getTexture("sa_1");
        this.lwsays.scaleX = 0.9;
        this.lwsays.scaleY = 0.9;
        this.lwsays.x = (egret.MainContext.instance.stage.stageWidth - this.lwsays.width) / 2 + 50;
        this.lwsays.y = 32;
        this.addChild(this.lwsays);
        
        this.musicPlay = new egret.Bitmap();
        if(!opt.isOpenMusic){
            this.musicPlay.texture = this.occ.getTexture("sa_4");
        }else{
            this.musicPlay.texture = this.occ.getTexture("sa_5");
        }
        this.musicPlay.x = egret.MainContext.instance.stage.stageWidth - this.musicPlay.width - 25;
        this.musicPlay.y = 30;
        this.musicPlay.touchEnabled = true;
        this.addChild(this.musicPlay);
        

        if(opt.musicChose != 1) {
            this.startBtn.visible = false;
            this.shp.visible = false;
            this.lwsays.visible = false;
            this.sy_mc.visible = false;
        } else {
            this.startBtn.visible = true;
            this.shp.visible = true;
            this.lwsays.visible = true;
            this.sy_mc.visible = true;
        } 

        this.musicPlay.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt){
            this.OpenMic(evt);
        },this); 

	}
	private OpenMic(evt){
        evt.stopImmediatePropagation();
        this.isko = !this.isko;
        if(this.isko) {
            this.musicPlay.texture = this.occ.getTexture("sa_5");
            this.sy_mc.visible = false;
        } else {
            this.musicPlay.texture = this.occ.getTexture("sa_4");
            this.sy_mc.visible = true;
        }
        this.music.isOpenMusic = this.isko;
        this.oParent.isOpenMusic = this.isko;
        this.music.playMusic();
	}

}
