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

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;
    private textFieldTpis: egret.TextField;
    private stageW: number = egret.MainContext.instance.stage.stageWidth;
    private stageH: number = egret.MainContext.instance.stage.stageHeight;
    private masker;

    private createView():void {
        

        
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textColor = 0x575858;
        this.textField.x = (egret.MainContext.instance.stage.stageWidth - this.textField.width) / 2;
        this.textField.y = (egret.MainContext.instance.stage.stageHeight - this.textField.height) / 2;
        this.textField.textAlign = "center";
        
//        this.textFieldTpis = new egret.TextField();
//        this.addChild(this.textFieldTpis);
//        this.textFieldTpis.textColor = 0x000000;
//        this.textFieldTpis.textAlign = "center";
//        this.textFieldTpis.scaleX = 1.5;
//        this.textFieldTpis.scaleY = 1.5;
//        this.textFieldTpis.text = "解锁横屏体验更佳";
//        this.textFieldTpis.x = (egret.MainContext.instance.stage.stageWidth - this.textFieldTpis.width) / 2 - 60;
//        this.textFieldTpis.y = (egret.MainContext.instance.stage.stageHeight - this.textFieldTpis.height) / 2 - 50;
        RES.getResByUrl('http://res.weixin.737.com/theme/121/gamesteps/css/img/sa_30.png?v=1',function(event: any) {
            var img: egret.Texture = <egret.Texture>event;
            this.textFieldTpis = new egret.Bitmap();
            this.textFieldTpis.texture = img;
            this.textFieldTpis.scaleX = 1.5;
            this.textFieldTpis.scaleY = 1.5;
            this.textFieldTpis.x = (egret.MainContext.instance.stage.stageWidth - this.textFieldTpis.width) / 2 - 75;
            this.textFieldTpis.y = (egret.MainContext.instance.stage.stageHeight - this.textFieldTpis.height) / 2 + 10;
            this.addChild(this.textFieldTpis);

        },this,RES.ResourceItem.TYPE_IMAGE);
        
    }

    public setProgress(current:number, total:number):void {
        this.textField.text = `Loading...${current}/${total}`;
    }
}
