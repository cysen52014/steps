/**
 *
 * @author 
 *
 */
class Square extends egret.Sprite {
	public constructor() {
    	   super();
	}
    
    private square_json = RES.getRes("square_json");
    private square_png = RES.getRes("square_png");
    private stageW: number = egret.MainContext.instance.stage.stageWidth;
    private stageH: number = egret.MainContext.instance.stage.stageHeight;
    private leftSize: number =  200;//第一个盒子距离左边的距离
    private stepSize: number = 150;//一步间的距离;
    private lastSquarePos: number = 0;//最后一个方块的距离;
    private squarePosY: number = 372;//方块顶部距离;
    private moveSize: number = 0;//方块移动;
    private stepCount: number = 0;//移动步数;
    private squareArr = [];
    private ixxd = 0;
    private person = null;
    private gold = null;
    private controls = null;
    private stepScore = 0;
    private scoreClass;
    private delay = 2000;
    private music;
    private isMusicEnd = true;
    private square_mc: egret.MovieClip;
    private t3: egret.Timer = new egret.Timer(this.delay,1);
    private oPrent;
    
    private init(opt){
        this.oPrent = opt;
        this.addFirstQueeSquare();
    }
    
    private addFirstQueeSquare(): void {
        this.t3.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.failed,this);
        this.t3.stop();
        var wd = this.stageW - this.leftSize;
        var gs = Math.floor(wd / this.stepSize)+2;
        var self = this;
        this.person = this.oPrent.person;
        this.gold = this.oPrent.gold;
        this.scoreClass = this.oPrent.score;
        this.music = this.oPrent.MisicUl; 
        for(var i = 0;i < 60; i++) {
            (function(i){
                self.creatMovieCilp(i);
            })(i); 
        }
        //this.addChild(this.scoreClass);
        //this.squareSake(this.squareArr[0],2000);
    }
    private creatMovieCilp(i):void {
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.square_json,this.square_png);
        this.square_mc = new egret.MovieClip(mcFactory.generateMovieClipData("broken"));
        this.square_mc.anchorOffsetX = 51; 
        this.square_mc.anchorOffsetY  = 41;
        this.square_mc.name = 'mc_'+i;
        this.addChild(this.square_mc);
        this.squareArr.push(this.square_mc);
        this.setMcPosition(this.square_mc,i);
       
        //square_mc.play();
	}
    private setMcPosition(o,i): void { 
    	   var p = Math.random()*1,rd,l;
         p>=0.7 ? rd = 2 : rd = 1;
         if(i>=1){
             l = this.lastSquarePos + rd * this.stepSize;
             o.step = rd;
         }else{
             l = this.leftSize;
         }
         
         o.x = l;
         o.idx = this.ixxd;
         o.y = this.squarePosY;
//         var om = egret.Tween.get(o);
//         om.to({ y: this.squarePosY },300);
         this.hasAddGold(o,i);
         this.lastSquarePos = l;
         this.ixxd++;
	}
	private hasAddGold(o,i){
        var rd = Math.random() * 100;
        var ad = false;

        rd > 20 ? ad = false : ad = true;
        if(ad&&i!=0){
            o.gold = true;
            this.gold.addSquareGold(o,this);
        }else{
            o.gold = false;

        }
	}
	
    public squareSake(o,tt): void {

        var t: egret.Timer = new egret.Timer(100,0);
        var t2: egret.Timer = new egret.Timer(tt,1);
        
        this.t3.reset();
        
        var self = this;
        var s = 0;
        var arr = [[o.x,o.y],[o.x - 2,o.y-2],[o.x+2,o.y - 2]];
        
        
        
        
        function go() {
            s++;
            var y = s%3;
            o.x = arr[y][0];
            o.y = arr[y][1];
        }
        
        
        
        
        t.addEventListener(egret.TimerEvent.TIMER,go,this);
        t.start();
        
        t2.addEventListener(egret.TimerEvent.TIMER,function(){},this);
        t2.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function() {
            t.removeEventListener(egret.TimerEvent.TIMER,go,this);
            t2.removeEventListener(egret.TimerEvent.TIMER,function() { },this);
            o.x = arr[0][0];
            o.y = arr[0][1];
            self.squareBloken(o);
        },this);
        
        

        t.start();
        t2.start();
        this.t3.start();
    }
    private failed() {  
        this.oPrent.control.isNext = false;
        this.t3.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.failed,this);
        var twp = egret.Tween.get(this.person);
        if(this.isMusicEnd) {
            //this.isMusicEnd = false; 
            this.music.changeMusic(this.oPrent.micArrList[this.oPrent.MusicCurId]['three'][0],this.oPrent.micArrList[this.oPrent.MusicCurId]['three'][1]);
            var self = this;
            this.music.callback = function() {
                self.music.callback = null;
                self.oPrent.musicChose = 3;
                self.music.stopMiuc();
                self.music.playMusic();
            }
        }
        twp.to({ y: this.person.y + 520 },500).call(function() {
            this.parent.gameOver();
        })
    }
    private squareBloken(o): void{
        var self = this;
        //this.addEventListener(egret.TimerEvent.TIMER,function() { },o);
        var tw = egret.Tween.get(o);

        tw.to({ y: this.squarePosY + 280 },350).call(function() {
            self.removeChild(o);
        });

        o.play();
    }
    public run(c,b) {
        var size = this.moveSize - b * this.stepSize; 
        var tw = egret.Tween.get(this),ss,xx,sq,nq;
        
        this.controls = c;
        this.stepCount++;
        xx = this.squareArr[this.stepCount];

        this.t3.stop();
        
        if(b == 1) { 
            nq = this.stepCount;
            sq = this.squareArr[nq];
            ss = -(sq.x - this.leftSize);
            if(size == ss){ 
                if(this.isMusicEnd) {
                    //this.isMusicEnd = false;  
                    this.music.changeMusic(this.oPrent.micArrList[this.oPrent.MusicCurId]['one'][0],this.oPrent.micArrList[this.oPrent.MusicCurId]['one'][1]);
                }
            } else {
                if(this.isMusicEnd) {
                    //this.isMusicEnd = false;
                    this.music.changeMusic(this.oPrent.micArrList[this.oPrent.MusicCurId]['three'][0],this.oPrent.micArrList[this.oPrent.MusicCurId]['three'][1]);
                    var self = this;
                    this.music.callback = function() {
                        self.music.callback = null;
                        self.oPrent.musicChose = 3;
                        self.music.stopMiuc();
                        self.music.playMusic();
                    }
                }
            }
        }else{      
            if(xx.step==2){
                nq = this.stepCount;
            }else{
                nq = this.stepCount + 1;
            } 
            sq = this.squareArr[nq];
            
            ss = -(sq.x - this.leftSize);
            this.stepCount = nq;
            if(size == ss) {
                if(this.isMusicEnd) {
                    //this.isMusicEnd = false;
                    this.music.changeMusic(this.oPrent.micArrList[this.oPrent.MusicCurId]['two'][0],this.oPrent.micArrList[this.oPrent.MusicCurId]['two'][1]);
                }
            }else{
                if(this.isMusicEnd) {
                    //this.isMusicEnd = false;
                    this.music.changeMusic(this.oPrent.micArrList[this.oPrent.MusicCurId]['three'][0],this.oPrent.micArrList[this.oPrent.MusicCurId]['three'][1]);
                    var self = this;
                    this.music.callback = function() {
                        self.music.callback = null;
                        self.oPrent.musicChose = 3;
                        self.music.stopMiuc();
                        self.music.playMusic();
                    }
                }
            }
            
        }

        this.person.playStep(b);
        this.delay = this.delay - (this.stepScore / 50) * 20; 
        this.delay < 200 ? this.delay = 200 : this.delay = this.delay; 
        this.t3.delay = this.delay;
        
        tw.to({ x: size },160).call(function(){     
            if(size == ss) {
                if(b == 1){
                    this.stepScore ++;
                    
                }else{
                    this.stepScore += 3;
                    
                }
                  
                //conssole.log(this.stepScore);
                
                this.gold.delGold(sq);
                this.scoreClass.TotalScore(this.stepScore);
                this.squareSake(sq,this.delay);
                c.isNext = true;
            }else{
                
                var twp = egret.Tween.get(this.person);
                twp.to({ y: this.person.y + 520 },500).call(function() {
                    this.parent.gameOver();
                });
                
                c.isNext = false;
            }
            var ddd = Math.floor(this.stepCount / 50);
            if(ddd != this.addCount) {
                this.addCount = ddd;
                for(var i = 1;i < 51;i++) {
                    this.creatMovieCilp(i);
                }
            }
//            for(var i = 1; i < 3; i++) {
//                this.creatMovieCilp(i);
//            }
            this.moveSize = size;
           
        });
        
    }
    

}
