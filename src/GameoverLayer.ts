/**
 *
 * @author 
 *
 */

class GameoverLayer extends egret.Sprite{
	public constructor() {
    	  super();
        
	}
	
    private stageW: number = egret.MainContext.instance.stage.stageWidth;
    private stageH: number = egret.MainContext.instance.stage.stageHeight;
    private restBtn: egret.Bitmap;
    private rto: egret.Bitmap; 
    private qpo: egret.Bitmap;  
    private qotxt: egret.Bitmap;  
    private ydu: egret.Bitmap;  
    private diy: egret.Bitmap;  
    private yxjx: egret.Bitmap;  
    private poplayer;
    private shpcy;
    private ocss;
    private oParent;
    private ldimg;
    private pai_json = RES.getRes("pai_json");
    private pai_png = RES.getRes("pai_png");
    private pai_mc: egret.MovieClip;

    
	private createLayer(opts){
        this.oParent = opts;
        this.shpcy = new egret.Shape();
        this.shpcy.graphics.beginFill(0xff0000,1);
        this.shpcy.graphics.drawRect(0,0,this.stageW,this.stageH);
        this.shpcy.graphics.endFill();
        this.shpcy.alpha = 0;
        this.shpcy.touchEnabled = true;
        this.shpcy.pixelHitTest = true;
        this.addChild(this.shpcy);
    	
        this.ocss = RES.getRes("ocs_json");
        this.yxjx = new egret.Bitmap();
        this.yxjx.texture = this.ocss.getTexture("sa_8");
        this.yxjx.x = (egret.MainContext.instance.stage.stageWidth - this.yxjx.width) / 2;
        this.yxjx.y = 48;
        //this.yxjx.visible = false;
        this.addChild(this.yxjx);
        
        this.restBtn = new egret.Bitmap();
        this.restBtn.texture = this.ocss.getTexture("sa_12");
        this.restBtn.x = (egret.MainContext.instance.stage.stageWidth - this.restBtn.width) / 2 - 300;
        this.restBtn.y = 498;
        //this.restBtn.visible = false;
        this.restBtn.name = "start";
        this.restBtn.touchEnabled = true;
        this.addChild(this.restBtn);
        
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.pai_json,this.pai_png);
        this.pai_mc = new egret.MovieClip(mcFactory.generateMovieClipData("syc"));
        this.pai_mc.x = egret.MainContext.instance.stage.stageWidth / 2 + 265;
        this.pai_mc.y = 375;
        this.pai_mc.play(-1);
        this.addChild(this.pai_mc);
        
        
        this.rto = new egret.Bitmap();
        this.rto.texture = this.ocss.getTexture("sa_9");
        this.rto.x = (egret.MainContext.instance.stage.stageWidth - this.rto.width) / 2 - 176;
        this.rto.y = 250;
        //this.rto.visible = false;
        this.addChild(this.rto);
             
        this.qpo = new egret.Bitmap();
        this.qpo.texture = this.ocss.getTexture("sa_11");
        this.qpo.x = (egret.MainContext.instance.stage.stageWidth - this.qpo.width) / 2 - 320;
        this.qpo.y = 168;
        //this.qpo.visible = false;
        this.qpo.touchEnabled = true;
        this.addChild(this.qpo);
        
        
        this.ydu = new egret.Bitmap();
        this.ydu.texture = this.ocss.getTexture("sa_13");
        this.ydu.x = (egret.MainContext.instance.stage.stageWidth - this.ydu.width) / 2 ;
        this.ydu.y = 498;
        //this.ydu.visible = false;
        this.ydu.touchEnabled = true;
        this.addChild(this.ydu);
        
        this.diy = new egret.Bitmap();
        this.diy.texture = this.ocss.getTexture("sa_14");
        this.diy.x = (egret.MainContext.instance.stage.stageWidth - this.diy.width) / 2 + 300;
        this.diy.y = 498;
        //this.diy.visible = false;
        this.diy.touchEnabled = true;
        this.addChild(this.diy);
        
        
        this.qotxt = new egret.Bitmap();
        this.qotxt.texture = this.ocss.getTexture("sa_10");
        this.qotxt.x = (egret.MainContext.instance.stage.stageWidth - this.qotxt.width) / 2 - 330;
        this.qotxt.y = 198;
        //this.qotxt.visible = false;
        this.addChild(this.qotxt);
        
        //this.poplayer = opts.poplayer; 
        
        
    
        this.ldimg = new egret.Bitmap();
        this.ldimg.width = 100;
        this.ldimg.height = 100;
        this.ldimg.anchorOffsetX = 50;
        this.ldimg.anchorOffsetY = 50;
        this.ldimg.rotation = 8;
        this.ldimg.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 165;
        this.ldimg.y = 248;
        this.addChild(this.ldimg);
        
        var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(50,50,50);
        circle.graphics.endFill();
        circle.anchorOffsetX = 50;
        circle.anchorOffsetY = 50;
        circle.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 165;
        circle.y = 248;
        this.addChild(circle);
        
        this.ldimg.mask = circle;

        
        
        this.poplayer = new popLayer();
        this.poplayer.creatUl(this.oParent);
        this.poplayer.visible = false;
        this.addChild(this.poplayer);
        
        this.qpo.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.showPopShop,this);
        this.diy.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.showDiy,this);
        this.ydu.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.showShareTips,this);
        this.shpcy.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt) {
             evt.stopImmediatePropagation();
        });
        
        this.setPhoto();
        
	}
	
	private showPopShop(evt){
        //this.qpo.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.showPopShop,this);
        evt.stopImmediatePropagation();
        this.poplayer.visible = true;
        this.poplayer.hidePops();
        this.poplayer.showPops(1);
        this.poplayer.ldimg.visible = false;
        //this.poplayer.showLayer();
	}
    private showDiy(evt){
        this.visible = true;
        //this.diy.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.showDiy,this);
        evt.stopImmediatePropagation();
        callJsShowUpLoadBotton(1);
        this.poplayer.blei = 2;
        this.poplayer.visible = true;
        this.poplayer.ldimg.visible = true;
        this.poplayer.hidePops();
        this.poplayer.showPops(3);
        
    }
    private showShareTips(evt) {
    
        //this.ydu.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.showShareTips,this);
        evt.stopImmediatePropagation();
        callJsShareFun(1);
    }
    private setPhoto(){
        var self = this; 
        if(InterfaceData.photos!=''){
            RES.getResByUrl(InterfaceData.photos,function(event: any) {
                var img: egret.Texture = <egret.Texture>event;
                self.ldimg.texture = img;
               
                
                
            },this,RES.ResourceItem.TYPE_IMAGE);
        }
    }
}
