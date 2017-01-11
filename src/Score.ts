/**
 *
 * @author 
 *
 */
class Score extends egret.Sprite{
	
	private scoreCount = 0;
    private bestScore;
    private bmpText;
    private bestFont;
    private bestSteps;
    private ocss;
    
    
    public constructor() {
        super();
        this.addBmpLabel();
    }
    public TotalScore(score){
        
        this.scoreCount = score;
        this.bmpText.text = this.scoreCount.toString();
        this.getBestScore(score);
        
    }
    private getBestScore (score){
        if(score > parseInt(this.bestScore)){
            this.bestScore = score;
        }
        egret.localStorage.setItem('bestScore',this.bestScore.toString());
    }
    private addBmpLabel(){ 
        this.ocss = RES.getRes("ocs_json");
        
        this.bmpText = new egret.BitmapText();
        this.bmpText.font = RES.getRes("num2_fnt");
        this.bmpText.text = this.scoreCount.toString();
        this.bmpText.x = (egret.MainContext.instance.stage.stageWidth - this.bmpText.width)/2;
        this.bmpText.y = 20;
        //this.bmpText.alpha = 0;
        this.addChild(this.bmpText);
        
        this.bestFont = new egret.Bitmap();
        this.bestFont.texture = this.ocss.getTexture("best");
        this.bestFont.x = (egret.MainContext.instance.stage.stageWidth - this.bestFont.width)/2 - 15;
        this.bestFont.y = 300;
        this.bestFont.visible = false;
        this.addChild(this.bestFont);

        this.bestSteps = new egret.BitmapText();
        this.bestSteps.font = RES.getRes("goldnum_fnt");
        this.bestSteps.text = '0';
        this.bestSteps.visible = false;
        this.bestSteps.x = (egret.MainContext.instance.stage.stageWidth - this.bestSteps.width) / 2 + 50;
        this.bestSteps.y = 305;
        //this.bmpText.alpha = 0;
        this.addChild(this.bestSteps);
        
        this.bestScore = egret.localStorage.getItem('bestScore') == null ? '0' : egret.localStorage.getItem('bestScore');
    }
    private showBestScore(){      
        this.bestSteps.text = this.bestScore;
        this.bestSteps.visible = true;
        this.bestFont.visible = true;
    }
    private hideBestScore() {
        this.bestSteps.text = this.bestScore;
        this.bestSteps.visible = false;
    }
}
