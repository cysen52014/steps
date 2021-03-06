/**
 *
 * @author 
 *
 */

class Person extends egret.Sprite{
	public constructor() {
    	 super();
         this.creatPerson();
	}
    private person_json = RES.getRes("person_json");
    private person_png = RES.getRes("person_png");
    private person_mc: egret.MovieClip  = null;
    private personX: number =  60;
    private persoxY: number = 127;
    private addToux;
    private circle: egret.Shape;
    private ppcd;

    
	private creatPerson(){
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.person_json,this.person_png);
        this.person_mc = new egret.MovieClip(mcFactory.generateMovieClipData("towstep"));
        
        //person_mc.anchorOffsetX = 51;
        //person_mc.anchorOffsetY = 41;
        this.person_mc.x = this.personX;
        this.person_mc.y = this.persoxY;
        this.addChild(this.person_mc);
        //this.steps();
        
        this.addToux = new egret.Bitmap();
        this.addToux.width = 80;
        this.addToux.height = 80;
        this.addToux.anchorOffsetX = 40;
        this.addToux.anchorOffsetY = 40;
        this.addToux.x = 198;
        this.addToux.y = 221;
        this.addChild(this.addToux);
        
        this.circle = new egret.Shape();
        this.circle.graphics.beginFill(0x0000ff);
        this.circle.graphics.drawCircle(40,40,40);
        this.circle.graphics.endFill();
        this.circle.anchorOffsetX = 40;
        this.circle.anchorOffsetY = 40;
        this.circle.x = 198;
        this.circle.y = 221;
        this.addChild(this.circle);

        this.addToux.mask = this.circle;
        
        this.addPhotos();
	} 
	private steps() {
        this.person_mc.gotoAndPlay(5);
        this.person_mc.addEventListener(egret.Event.ENTER_FRAME,this.upd,this);
	}
	private upd(){
        if(this.person_mc.currentFrame == 7) {
            this.person_mc.gotoAndPlay(5);
            //this.person_mc.removeEventListener(egret.Event.ENTER_FRAME,this.upd,this);
        }
	}
    private playStep (b){ 

        egret.Tween.removeTweens(this);
        this.ppcd = egret.Tween.get(this);
        this.person_mc.removeEventListener(egret.Event.ENTER_FRAME,this.upd,this);
        switch (b){
           case 2 : 
                this.person_mc.gotoAndPlay(1);
                this.ppcd.to({ y: - 40 },120).to({ y: 0 },120);
                this.person_mc.addEventListener(egret.Event.ENTER_FRAME,this.oneStep,this);
                break;
           case 1:
               this.person_mc.gotoAndPlay(7);
               this.ppcd.to({ y: - 40 },120).to({ y: 0 },120);  
               this.person_mc.addEventListener(egret.Event.ENTER_FRAME,this.twoStep,this);
               break;
        }   
    }
    private oneStep(evt: egret.Event){ 
        var self = this,iy,ix;;
        iy = self.person_mc.movieClipData.frames[self.person_mc.currentFrame-1].y - self.person_mc.movieClipData.frames[self.person_mc.currentFrame].y; 
        ix = self.person_mc.movieClipData.frames[self.person_mc.currentFrame - 1].x - self.person_mc.movieClipData.frames[self.person_mc.currentFrame].x; 
        if(iy>=0){
            iy > 6 ? iy = -6: iy = iy;
            ix > 10 ? ix = 10 : ix = ix;
        }else{
            Math.abs(iy) > 6 ? iy = -6 : iy = iy;
            Math.abs(iy) > 10 ? ix = 10 : ix = iy;
        }
        if(this.person_mc.currentFrame >= 5) {
            this.person_mc.gotoAndStop(1);
            this.person_mc.removeEventListener(egret.Event.ENTER_FRAME,this.oneStep,this);
        }
        if(InterfaceData.photos) {
            self.addToux.y = 221 - iy;
            self.addToux.x = 198 + ix;
            self.circle.y = 221 - iy;
            self.circle.x = 198 + ix;
        }
    }
    private twoStep(evt: egret.Event) {
        var self = this,iy,ix,frm=0;
        self.person_mc.currentFrame > 9 ? frm = 9 : frm = self.person_mc.currentFrame;
        iy = self.person_mc.movieClipData.frames[frm - 1].y - self.person_mc.movieClipData.frames[frm].y; 
        ix = self.person_mc.movieClipData.frames[frm - 1].x - self.person_mc.movieClipData.frames[frm].x; 
        if(iy>=0){
            iy > 6 ? iy = -6: iy = iy;
            ix > 10 ? ix = 10 : ix = ix;
        }else{
            Math.abs(iy) > 6 ? iy = -6 : iy = iy;
            Math.abs(iy) > 10 ? ix = 10 : ix = iy;
        }
        if(this.person_mc.currentFrame >= 10) {
            this.person_mc.gotoAndStop(1);
            this.person_mc.removeEventListener(egret.Event.ENTER_FRAME,this.twoStep,this);
        }
        if(InterfaceData.photos){
            self.addToux.y = 221 - iy;
            self.addToux.x = 198 + ix;
            self.circle.y = 221 - iy;
            self.circle.x = 198 + ix;
        }
    }
    private addPhotos(){
        var self = this;
        if(InterfaceData.photos!=''){
            RES.getResByUrl(InterfaceData.photos,function(event: any) {
                var img: egret.Texture = <egret.Texture>event;    
                this.addToux.texture = img;
    
            },this,RES.ResourceItem.TYPE_IMAGE);
        }
    }
}
