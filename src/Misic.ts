/**
 *
 * @author 
 *
 */
class MisicUl extends egret.DisplayObjectContainer{
    private _sound: egret.Sound;
    private _channel: egret.SoundChannel;
    private t: egret.Timer;
    private isOpenMusic = false;
    private begMusic = true;
    private oParent;
    private musicPlay;
    private loop = false;
    private st = 0;
    private end = 0;
    private callback = null;

    constructor() {
        super();
    }

    private onAddToStage(opat){
        this.oParent = opat;
        this.isOpenMusic = opat.isOpenMusic;
        this._sound = RES.getRes('music_mp3');
        //this._sound.type = egret.Sound.EFFECT;
        this._channel = this._sound.play();
        this._channel.stop();
        //console.log(this._sound.length);
        
        
        this.t = new egret.Timer(30,0);

        
    }
    private changeMusic(st,end) {
        this.st = st; 
        this.end = end; 

        if(this.isOpenMusic) {
            this.stopMiuc(); 
            this._channel = this._sound.play(this.st);
    
            
            this.t.addEventListener(egret.TimerEvent.TIMER,this.soundPosition,this);
            this.t.reset();
            this.t.start();
            
        }

        
    }
    private soundPosition() {
        //console.log(this._channel.position >= this.end);
        if(this._channel.position >= this.end) {
            this.t.stop();
            this.t.removeEventListener(egret.TimerEvent.TIMER,this.soundPosition,this);
            if(this.loop) {    
                this.changeMusic(this.st,this.end);
            } else {
                this._channel.stop();
                
            }
            this.oParent.square.isMusicEnd = true;
            this.oParent.soundcotrol.isToMusic = true;
            //this.oParent.mdGoods.goodsSoundEnd = true;
            if(this.callback){
                this.callback();
            }
            
        }
    }
    private playMusic(){ 
        if(this.isOpenMusic){ 
            var cs = this.choseMusic(); 
            if(cs == 1){
                this.loop = true;
                this.changeMusic(this.oParent.micArrList[0]['bgc'][0],this.oParent.micArrList[0]['bgc'][1]);
            } else if(cs == 2) { 
                this.loop = false;
                this.stopMiuc();
                this.changeMusic(75,75.1);
                //this.changeMusic(0,0.01,false);
            }else if(cs == 3) {
                this.loop = true; 
                this.stopMiuc();
                this.changeMusic(75,110);
                //this.changeMusic(0,0.01,false);
            } else if(cs == 4) {
                this.loop = false;
                this.stopMiuc();
                this.changeMusic(75,75.1);
            }
            
        } else {
            
            this._channel.stop();
            this.t.removeEventListener(egret.TimerEvent.TIMER,this.soundPosition,this);
        }
        
        //this.musicPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playMusic,this);   
    }
    private stopMiuc(){
       this._channel.stop();
       this.t.removeEventListener(egret.TimerEvent.TIMER,this.soundPosition,this);
    }
    private choseMusic (){
        return this.oParent.musicChose;
    }
    
    
}
