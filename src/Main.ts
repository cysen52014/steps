//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

declare var InterfaceData;
declare function callJsGameOverFun(o): void;
declare function callJsDownLoadFunc(): void;
declare function callJsShowUpLoadBotton(n): void;
declare function callJsShareFun(n): void;
declare function callJsMusicIdFun(id): void;

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("http://res.weixin.737.com/theme/121/gamesteps/resource/default.res.json", "http://res.weixin.737.com/theme/121/gamesteps/resource/");
        //RES.loadConfig("resource/default.res.json","resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    
    private isStart = false;
    private textfield:egret.TextField;
    private square;
    private control;
    private person;
    private score;
    private gold;
    private GameoverLayer;
    private MisicUl;
    private startLayer;
    private isck = false;
    private isOpenMusic = false;
    private musicChose = 1;
    private pageIndex = 0;
    private soundcotrol; 
    private MusicCurId =  1; 
    private poplayer;
    private mdGoods;
    private micArrList = [
        { 'bgc': [0,38.219] },//背景音乐
        { 'one': [43,43.298],'two': [43.4,43.690],'three': [43.695,44.21],'yy': [43,44.21] },//1 14
        { 'one': [48.6,49],'two': [49.18,49.5],'three': [49.56,50.08],'yy': [48.6,50.08] },//2 11
        { 'one': [38.3,38.598],'two': [38.7,38.9],'three': [38.998,39.696],'yy': [38.3,39.696] },//3
        { 'one': [40,40.299],'two': [40.4,40.6],'three': [40.612,41.397],'yy': [40,41.397] },//4
        { 'one': [41.497,41.798],'two': [41.898,42.1],'three': [42.1,42.79],'yy': [41.497,42.79] },//5     
        { 'one': [44.5,44.74],'two': [44.9,44.98],'three': [45,46.3],'yy': [44.5,46.3] },//6 13
        { 'one': [46.492,46.789],'two': [46.9,47.14],'three': [47.2,48.478],'yy': [46.492,48.478] },//7  12
        { 'one': [50.2,50.486],'two': [50.6,50.767],'three': [50.786,51.646],'yy': [50.2,51.646] },//8 10
        { 'one': [52,52.182],'two': [52.233,52.547],'three': [52.646,53.587],'yy': [52,53.587] },//9 8 j
        { 'one': [53.7,54],'two': [54.105,54.345],'three': [54.4,55.238],'yy': [53.7,55.238] },//10 7
        { 'one': [55.5,55.86],'two': [55.916,56.279],'three': [56.449,57.792],'yy': [55.5,57.792] },//11 6 j
        { 'one': [58,58.319],'two': [58.495,58.712],'three': [58.740,61.774],'yy': [58,61.774] },//12 9
        { 'one': [62,62.318],'two': [62.495,62.79],'three': [62.83,65.939],'yy': [62,65.939] },//13 5
        { 'one': [65.984,66.4],'two': [66.567,66.887],'three': [66.939,69.05],'yy': [65.984,69.05] },//14 4
        { 'one': [69.193,69.382],'two': [69.492,69.681],'three': [69.732,70.83],'yy': [69.093,70.83] },//15 3
        { 'one': [71,71.29],'two': [71.395,71.645],'three': [71.669,72.408],'yy': [71,72.408] },//16 2
        { 'one': [72.498,72.815],'two': [72.905,73.221],'three': [73.249,74.16],'yy': [72.498,74.16] }//17 1 j
        
    ];
    
    /**
     * 创建游戏场景
     * Create a game scene
     */

    private showUl() {

        var self = this;
        if(this.pageIndex==1){
            this.control.visible = true;
            this.score.visible = true;
            this.gold.visible = true;
            

        }else if(this.pageIndex == 2){
              this.GameoverLayer.visible = true;
              this.score.visible = true;
              this.score.bmpText.alpha = 0;
              var t1 = egret.Tween.get(this.score.bmpText);
              t1.to({ alpha: 1,y: 200 },100);
//
//            this.GameoverLayer.qpo.visible = true;
//            this.GameoverLayer.rto.visible = true;
//            this.GameoverLayer.qotxt.visible = true;
//            this.GameoverLayer.ydu.visible = true;
//            this.GameoverLayer.ydu.touchEnabled = true;
//            this.GameoverLayer.diy.visible = true;
//            this.GameoverLayer.yxjx.visible = true;
//            this.GameoverLayer.restBtn.visible = true;
//            this.GameoverLayer.restBtn.touchEnabled = true;
//
              self.GameoverLayer.restBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,self.gameRestart,self);
            
        }else if(this.pageIndex == 3){

            this.square.visible = true;
            this.control.visible = true;
            this.person.visible = true;
            this.person.y = 0;
            this.score.visible = true;
            this.score.bmpText.y = 20;
            //this.gold.visible = true;
        }
          
    }
    private hideUl(){
        var self = this;
        if(this.pageIndex == 1) {
           // this.startLayer.visible = false;
            this.startLayer.shp.visible = false;
            var mv = egret.Tween.get(this.startLayer.startBtn);
            var btn = this.startLayer.startBtn;
            mv.to({ y: this.startLayer.startBtn.y + 450 },100).call(function() {
                btn.visible = false;
            });
            var t1 = egret.Tween.get(this.startLayer.lwsays);
            t1.to({ alpha: 0,y: this.startLayer.lwsays.y - 200 },100);
            
        }else if(this.pageIndex == 2){
     
            this.square.visible = false; 
            this.score.visible = false;
            this.control.visible = false;
//            var t1 = egret.Tween.get(this.square);
//            var t2 = egret.Tween.get(this.score);
//
//            t1.to({ alpha: 0 },0);
//            t2.to({ y: 200,alpha: 1 },0);
        }else if(this.pageIndex == 3){
            this.GameoverLayer.visible = false;
            //this.startLayer.visible = false;  
            //this.person.visible = false;  
            
        }
//        this.control.leftbtn.visible = false;
//        this.control.rightbtn.visible = false;
//        var t1 = egret.Tween.get(this.square);
//        var t2 = egret.Tween.get(this.score);
//
//        var gmly = this.GameoverLayer;
//        var self = this;
//    
//        t1.to({ alpha: 0 },300);
        //t2.to({ y: 200,alpha: 1 },300);
//        t3.to({ alpha: 1 },1200).call(function() {
//            this.isck = true;
//            if(this.isck) {
//                this.isck = false;
//                gmly.restBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,self.gameRestart,self);
//            }
//        });
    }
    private createGameScene(): void {
        //console.log('cc',this.micArrList[this.MusicCurId]['one'][1]);
        if(InterfaceData.musicId > 0){
            this.MusicCurId = InterfaceData.musicId
        }else{
            this.MusicCurId = 1;
        }
        var sky: egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW: number = egret.MainContext.instance.stage.stageWidth;
        var stageH: number = egret.MainContext.instance.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        
        this.score = new Score();
        this.score.visible = false;
        this.addChild(this.score);
           
        this.gold = new Gold();
        this.gold.visible = false;
        this.gold.creatGold(this);
        this.addChild(this.gold);
        

        
        this.person = new Person();
        //this.person.visible = false;
        this.addChild(this.person);
        
        
        this.soundcotrol = new SoundsCtrol();
        this.soundcotrol.visible = false;
        this.soundcotrol.creatSence(this);
        this.addChild(this.soundcotrol);
        
        
        this.MisicUl = new MisicUl(); 
        this.addChild(this.MisicUl);
        this.MisicUl.onAddToStage(this);


        
        this.square = new Square();
        this.square.init(this);
        this.addChild(this.square);
        
       
        
        

        this.control = new Control();
        this.control.visible = false;
        this.addChild(this.control);
        this.control.addTouchEvent(this);
        
        
        
        
        this.GameoverLayer = new GameoverLayer();
        this.GameoverLayer.createLayer(this);
        this.GameoverLayer.visible = false;
        this.addChild(this.GameoverLayer);
        
        this.startLayer = new StartLayer();
        //this.startLayer.visible = false;
        this.startLayer.createUl(this);
        this.addChild(this.startLayer); 
        
        this.startLayer.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startFunc,this);
         
        
    }
    private startFunc(evt){
        evt.stopImmediatePropagation();
        this.musicChose = 2;
        this.pageIndex = 1;
        this.gold.visible = true;
        
        this.MisicUl.loop = false;
        this.MisicUl.stopMiuc();
        

        this.hideUl();
        this.showUl();
    }
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    private gameOver(){      
        this.pageIndex = 2; 
        //this.GameoverLayer.restBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.gameRestart,this);
        this.control.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.control.touchHandler,this.control);  
        callJsGameOverFun(this); 
        this.hideUl();
        this.showUl();
        this.person.addPhotos();
        this.score.showBestScore();
        
        
       // console.log('end')
    }
    private gameRestart(evt): void{   
        //evt.stopImmediatePropagation();
        this.removeChildren(); 
        this.GameoverLayer.restBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.gameRestart,this);   
        this.control.isNext = true;
        this.score.hideBestScore();
        
        this.musicChose = 2;
        this.pageIndex = 3;
        this.MisicUl.stopMiuc();
        this.createGameScene();  
        this.gold.visible = true;
        this.showUl();
        this.hideUl();

    }
    
}


