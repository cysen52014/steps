/**
 *
 * @author 
 *
 */
class Gold extends egret.Sprite {
    private gdNum;
    private currGoldNum = 0;
    private ocs: egret.SpriteSheet;
    private goldArr = {};
    private gold: egret.Bitmap;
    private goldNum = 0;
    private bestgoldNum ;
    private plus;
    
    public constructor() {
        super();
        //this.creatGold()
    }
	private creatGold(){
        this.ocs =  RES.getRes("ocs_json");
        this.gold = new egret.Bitmap();

        this.bestgoldNum = egret.localStorage.getItem('bestGoldNum') == null ? '0' : egret.localStorage.getItem('bestGoldNum');
        this.gold.texture = this.ocs.getTexture("gold");
        this.gold.x = 25;
        this.gold.y = 30;
        //this.gold.alpha = 0;
        this.addChild(this.gold);
        
        this.gdNum = new egret.BitmapText();
        this.gdNum.font = RES.getRes("goldnum_fnt");
        this.gdNum.x = 88;
        this.gdNum.y = 32;
        //this.gdNum.alpha = 0;
        this.addChild(this.gdNum);
        
        this.plus = new egret.BitmapText();
        this.plus.font = RES.getRes("goldnum_fnt");
        this.plus.text = '+1';
        this.plus.y = 180;
        this.plus.x = 170;
        this.plus.alpha = 0;
        this.addChild(this.plus);
        
        this.getGoldCount();
	} 
	private getGoldCount(){
        var total = (parseInt(this.bestgoldNum) + this.goldNum);
        this.gdNum.text = total;
        this.currGoldNum = total;
        egret.localStorage.setItem('bestGoldNum',total.toString());
	}
	private addSquareGold(o,square){ 
        var gd: egret.Bitmap = new egret.Bitmap();
        gd.texture = this.ocs.getTexture("gold");
        square.addChild(gd);
        gd.x = o.x - 20;
        gd.y = o.y - 90;
        this.goldArr[o.idx] = gd;
        this.updwon(gd);
	}
    private updwon(o) {
        var md = egret.Tween.get(o,{ "loop": true });
        md.to({ y: o.y - 20 },600).to({ y: o.y },600);
    }
	private delGold (o){
        if(o.gold){
            this.goldNum++;
            this.getGoldCount();
            this.addPlus(o.x);
            this.goldArr[o.idx].visible = false;
        }
	}
    private addPlus(x){ 
        this.plus.alpha = 1;
        this.plus.y = 180;
        var plusgo = egret.Tween.get(this.plus);
        plusgo.to({ y: this.plus.y - 100 , alpha : 0},600);
    }
}
