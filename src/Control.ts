/**
 *
 * @author 
 *
 */
class Control extends egret.DisplayObjectContainer{
    public constructor() {
    	   super();
         
	}
    private stageW: number = egret.MainContext.instance.stage.stageWidth;
    private stageH: number = egret.MainContext.instance.stage.stageHeight;
    private square;
    private isNext = true;
    private leftbtn;
    private rightbtn;
    private shpc;
    
    public addTouchEvent(opts){
        this.square = opts.square;
        var ocs: egret.SpriteSheet = RES.getRes("ocs_json");
        
        
        this.shpc = new egret.Shape();
        this.shpc.graphics.beginFill(0xff0000,1);
        this.shpc.graphics.drawRect(0,0,this.stageW,this.stageH);
        this.shpc.graphics.endFill();
        this.shpc.alpha = 0;
        this.shpc.touchEnabled = true;
        this.shpc.pixelHitTest = true;
        this.addChild(this.shpc);
        
        this.shpc.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt){
            evt.stopImmediatePropagation();
            if(this.isNext) {
                this.isNext = false;
                this.checkStep(evt.stageX,evt.stageY);
            }
        },this);
        
        this.leftbtn = new egret.Bitmap();
        this.leftbtn.texture = ocs.getTexture("sa_6");
        this.leftbtn.x = 48;
        this.leftbtn.y = 490;
        this.addChild(this.leftbtn);

        this.rightbtn = new egret.Bitmap();
        this.rightbtn.texture = ocs.getTexture("sa_7");
        this.rightbtn.x = egret.MainContext.instance.stage.stageWidth - this.leftbtn.width - 48;
        this.rightbtn.y = 490;
        this.addChild(this.rightbtn);
        
        //this.addTap();
    }

    private checkStep(stageX: number,stageY: number) { 
        if(stageX > this.stageW/2){
            this.square.run(this,2);
        }else{
            this.square.run(this,1);
        }
    }
}
