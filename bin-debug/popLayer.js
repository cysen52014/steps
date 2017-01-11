/**
 *
 * @author
 *
 */
var popLayer = (function (_super) {
    __extends(popLayer, _super);
    function popLayer() {
        _super.call(this);
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
    }
    var d = __define,c=popLayer,p=c.prototype;
    p.creatUl = function (opts) {
        this.oParent = opts;
        this.masker = new egret.Shape();
        this.masker.graphics.beginFill(0x000000, 1);
        this.masker.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.masker.graphics.endFill();
        this.masker.width = this.stageW;
        this.masker.height = this.stageH;
        this.masker.alpha = 0.5;
        this.masker.pixelHitTest = true;
        this.masker.touchEnabled = true;
        this.masker.visible = true;
        this.addChild(this.masker);
        //层1
        var ocs = RES.getRes("ocs_json");
        this.boxlf = new egret.Bitmap();
        this.boxlf.texture = ocs.getTexture("sa_15");
        this.boxlf.x = (egret.MainContext.instance.stage.stageWidth) / 2 - this.boxlf.width + this.boxlf.width / 2 - 15;
        this.boxlf.y = 330;
        this.boxlf.scaleX = 1.1;
        this.boxlf.scaleY = 1.1;
        this.boxlf.anchorOffsetX = 180;
        this.boxlf.anchorOffsetY = 239;
        this.boxlf.visible = false;
        this.addChild(this.boxlf);
        this.boxrt = new egret.Bitmap();
        this.boxrt.texture = ocs.getTexture("sa_15");
        this.boxrt.x = (egret.MainContext.instance.stage.stageWidth) / 2 + this.boxlf.width / 2 + 15;
        this.boxrt.y = 330;
        this.boxrt.scaleX = 1.1;
        this.boxrt.scaleY = 1.1;
        this.boxrt.anchorOffsetX = 180;
        this.boxrt.anchorOffsetY = 239;
        this.boxrt.rotation = 180;
        this.boxrt.visible = false;
        this.addChild(this.boxrt);
        this.closeButton = new egret.Bitmap();
        this.closeButton.texture = ocs.getTexture("Ad_close");
        this.closeButton.name = 'x1';
        this.closeButton.scaleX = 1.5;
        this.closeButton.scaleY = 1.5;
        this.closeButton.anchorOffsetX = 36;
        this.closeButton.anchorOffsetY = 34;
        this.closeButton.x = (egret.MainContext.instance.stage.stageWidth) / 2 + 360;
        this.closeButton.y = 95;
        this.closeButton.visible = false;
        this.closeButton.touchEnabled = true;
        this.addChild(this.closeButton);
        this.goods = new ScrollBar();
        this.goods.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 340;
        this.goods.y = 100;
        this.goods.visible = false;
        this.goods.creatGloup(this);
        this.oParent.mdGoods = this.goods;
        this.addChild(this.goods);
        //层3
        this.yanzi = new egret.Bitmap();
        this.yanzi.texture = ocs.getTexture("sa_18");
        this.yanzi.scaleX = 1.1;
        this.yanzi.scaleY = 1.1;
        this.yanzi.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 330;
        this.yanzi.y = 120;
        this.yanzi.visible = false;
        this.addChild(this.yanzi);
        this.xrto = new egret.Bitmap();
        this.xrto.texture = ocs.getTexture("sa_9");
        this.xrto.scaleX = 1.5;
        this.xrto.scaleY = 1.5;
        this.xrto.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 310;
        this.xrto.y = 255;
        this.xrto.visible = false;
        this.addChild(this.xrto);
        this.ldimg = new egret.Bitmap();
        this.ldimg.width = 100;
        this.ldimg.height = 100;
        this.ldimg.anchorOffsetX = 50;
        this.ldimg.anchorOffsetY = 50;
        this.ldimg.rotation = 8;
        this.ldimg.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 215;
        this.ldimg.y = 277;
        this.addChild(this.ldimg);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(50, 50, 50);
        circle.graphics.endFill();
        circle.anchorOffsetX = 50;
        circle.anchorOffsetY = 50;
        circle.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 215;
        circle.y = 277;
        this.addChild(circle);
        this.ldimg.mask = circle;
        this.xwenzi = new egret.Bitmap();
        this.xwenzi.texture = ocs.getTexture("sa_19");
        this.xwenzi.scaleX = 1.1;
        this.xwenzi.scaleY = 1.1;
        this.xwenzi.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 110;
        this.xwenzi.y = 280;
        this.xwenzi.visible = false;
        this.addChild(this.xwenzi);
        this.xwen2 = new egret.Bitmap();
        this.xwen2.texture = ocs.getTexture("sa_26");
        this.xwen2.scaleX = 1.2;
        this.xwen2.scaleY = 1.2;
        this.xwen2.x = (egret.MainContext.instance.stage.stageWidth - this.xwen2.width) / 2 + 60;
        this.xwen2.visible = false;
        this.xwen2.y = 260;
        this.addChild(this.xwen2);
        this.sctx = new egret.Bitmap();
        this.sctx.texture = ocs.getTexture("sa_20");
        this.sctx.scaleX = 1.5;
        this.sctx.scaleY = 1.5;
        this.sctx.x = (egret.MainContext.instance.stage.stageWidth - this.sctx.width) / 2 - 50;
        this.sctx.visible = false;
        this.sctx.y = 440;
        this.addChild(this.sctx);
        this.cxsc = new egret.Bitmap();
        this.cxsc.texture = ocs.getTexture("sa_27");
        this.cxsc.scaleX = 1.4;
        this.cxsc.scaleY = 1.4;
        this.cxsc.x = (egret.MainContext.instance.stage.stageWidth - this.cxsc.width) / 2 - 50;
        this.cxsc.visible = false;
        this.cxsc.y = 440;
        this.addChild(this.cxsc);
        this.qued = new egret.Bitmap();
        this.qued.texture = ocs.getTexture("sa_28");
        this.qued.scaleX = 1.4;
        this.qued.scaleY = 1.4;
        this.qued.x = (egret.MainContext.instance.stage.stageWidth - this.qued.width) / 2 + 185;
        this.qued.y = 440;
        this.qued.visible = false;
        this.qued.touchEnabled = true;
        this.addChild(this.qued);
        this.x3closeButton = new egret.Bitmap();
        this.x3closeButton.texture = ocs.getTexture("Ad_close");
        this.x3closeButton.name = 'x2';
        this.x3closeButton.scaleX = 1.5;
        this.x3closeButton.scaleY = 1.5;
        this.x3closeButton.anchorOffsetX = 36;
        this.x3closeButton.anchorOffsetY = 34;
        this.x3closeButton.visible = false;
        this.x3closeButton.x = (egret.MainContext.instance.stage.stageWidth) / 2 + 360;
        this.x3closeButton.y = 95;
        this.x3closeButton.touchEnabled = true;
        this.addChild(this.x3closeButton);
        this.x4closeButton = new egret.Bitmap();
        this.x4closeButton.texture = ocs.getTexture("Ad_close");
        this.x4closeButton.name = 'x3';
        this.x4closeButton.scaleX = 1.5;
        this.x4closeButton.scaleY = 1.5;
        this.x4closeButton.anchorOffsetX = 36;
        this.x4closeButton.anchorOffsetY = 34;
        this.x4closeButton.visible = false;
        this.x4closeButton.x = (egret.MainContext.instance.stage.stageWidth) / 2 + 360;
        this.x4closeButton.y = 95;
        this.x4closeButton.touchEnabled = true;
        this.addChild(this.x4closeButton);
        //层2
        this.xboxlf = new egret.Bitmap();
        this.xboxlf.texture = ocs.getTexture("sa_15");
        this.xboxlf.x = (egret.MainContext.instance.stage.stageWidth) / 2 - 160;
        this.xboxlf.y = 330;
        this.xboxlf.anchorOffsetX = 180;
        this.xboxlf.anchorOffsetY = 239;
        this.xboxlf.scaleX = 0.9;
        this.xboxlf.scaleY = 0.9;
        this.xboxlf.visible = false;
        this.addChild(this.xboxlf);
        this.xboxrt = new egret.Bitmap();
        this.xboxrt.texture = ocs.getTexture("sa_15");
        this.xboxrt.x = (egret.MainContext.instance.stage.stageWidth) / 2 + 160;
        this.xboxrt.y = 330;
        this.xboxrt.anchorOffsetX = 180;
        this.xboxrt.anchorOffsetY = 239;
        this.xboxrt.scaleX = 0.9;
        this.xboxrt.scaleY = 0.9;
        this.xboxrt.rotation = 180;
        this.xboxrt.visible = false;
        this.addChild(this.xboxrt);
        this.xxnew = new egret.Bitmap();
        this.xxnew.texture = ocs.getTexture("sa_16");
        this.xxnew.scaleX = 1.5;
        this.xxnew.scaleY = 1.5;
        this.xxnew.x = (egret.MainContext.instance.stage.stageWidth - this.xxnew.width) / 2 - 95;
        this.xxnew.visible = false;
        this.xxnew.y = 200;
        this.addChild(this.xxnew);
        this.xxbo = new egret.Bitmap();
        this.xxbo.texture = ocs.getTexture("sa_17");
        this.xxbo.scaleX = 1.5;
        this.xxbo.scaleY = 1.5;
        this.xxbo.x = (egret.MainContext.instance.stage.stageWidth - this.xxbo.width) / 2 - 30;
        this.xxbo.y = 390;
        this.xxbo.touchEnabled = true;
        this.xxbo.visible = false;
        this.addChild(this.xxbo);
        this.xcloseButton = new egret.Bitmap();
        this.xcloseButton.texture = ocs.getTexture("Ad_close");
        this.xcloseButton.x = (egret.MainContext.instance.stage.stageWidth) / 2 + 290;
        this.xcloseButton.y = 130;
        this.xcloseButton.scaleX = 1.5;
        this.xcloseButton.scaleY = 1.5;
        this.xcloseButton.anchorOffsetX = 36;
        this.xcloseButton.anchorOffsetY = 34;
        this.xcloseButton.touchEnabled = true;
        this.xcloseButton.visible = false;
        this.addChild(this.xcloseButton);
        //this.oParent.startLayer.musicPlay.visible = false;
        this.xcloseButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            evt.stopImmediatePropagation();
            callJsShowUpLoadBotton(2);
            this.hidePops();
            this.showPops(1);
        }, this);
        this.x3closeButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            evt.stopImmediatePropagation();
            callJsShowUpLoadBotton(1);
            this.oParent.GameoverLayer.setPhoto();
            this.visible = false;
            //            this.hidePops(3);
            //            this.hideLayer();
            this.setPhoto();
            callJsShowUpLoadBotton(2);
        }, this);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            evt.stopImmediatePropagation();
            callJsShowUpLoadBotton(2);
            this.oParent.GameoverLayer.visible = true;
            this.oParent.startLayer.musicPlay.visible = true;
            this.oParent.GameoverLayer.setPhoto();
            //            this.hidePops(2);
            this.visible = false;
        }, this);
        this.xxbo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            evt.stopImmediatePropagation();
            callJsDownLoadFunc();
        }, this);
        this.x4closeButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            this.visible = false;
            this.oParent.GameoverLayer.setPhoto();
            callJsShowUpLoadBotton(2);
        }, this);
        this.qued.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            evt.stopImmediatePropagation();
            this.oParent.soundcotrol.visible = true;
            this.oParent.GameoverLayer.visible = false;
            //this.visible = false;
            this.oParent.score.visible = false;
            this.oParent.gold.visible = false;
            this.oParent.musicChose = 4;
            this.oParent.MisicUl.loop = false;
            this.oParent.MisicUl.stopMiuc();
            this.oParent.soundcotrol.addTx(this);
            callJsShowUpLoadBotton(2);
        }, this);
        this.setPhoto();
        this.masker.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.remveEvent, this);
    };
    p.remveEvent = function (evt) {
        evt.stopImmediatePropagation();
        this.masker.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.remveEvent, this);
    };
    p.showPops = function (n) {
        if (n == 1) {
            this.goods.visible = true;
            this.boxlf.visible = true;
            this.boxrt.visible = true;
            this.closeButton.visible = true;
        }
        else if (n == 2) {
            this.xboxlf.visible = true;
            this.xboxrt.visible = true;
            this.xxnew.visible = true;
            this.xxbo.visible = true;
            this.xcloseButton.visible = true;
        }
        else if (n == 3) {
            this.boxlf.visible = true;
            this.boxrt.visible = true;
            this.yanzi.visible = true;
            this.xrto.visible = true;
            this.xwenzi.visible = true;
            this.sctx.visible = true;
            this.x3closeButton.visible = true;
        }
        else if (n == 4) {
            this.yanzi.visible = true;
            this.boxlf.visible = true;
            this.boxrt.visible = true;
            this.xrto.visible = true;
            this.cxsc.visible = true;
            this.qued.visible = true;
            this.xwen2.visible = true;
            this.x4closeButton.visible = true;
        }
    };
    p.hidePops = function () {
        this.xboxlf.visible = false;
        this.xboxrt.visible = false;
        this.xxnew.visible = false;
        this.xxbo.visible = false;
        this.xcloseButton.visible = false;
        this.goods.visible = false;
        this.boxlf.visible = false;
        this.boxrt.visible = false;
        this.closeButton.visible = false;
        this.cxsc.visible = false;
        this.qued.visible = false;
        this.xwen2.visible = false;
        this.boxlf.visible = false;
        this.boxrt.visible = false;
        this.yanzi.visible = false;
        this.xrto.visible = false;
        this.xwenzi.visible = false;
        this.sctx.visible = false;
        this.x3closeButton.visible = false;
        this.xwenzi.visible = false;
        this.x4closeButton.visible = false;
    };
    p.hideLayer = function () {
        this.masker.visible = false;
    };
    p.showLayer = function () {
        this.masker.visible = true;
    };
    p.setPhoto = function () {
        var self = this;
        if (InterfaceData.photos != '') {
            RES.getResByUrl(InterfaceData.photos, function (event) {
                var img = event;
                this.ldimg.texture = img;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return popLayer;
}(egret.Sprite));
egret.registerClass(popLayer,'popLayer');
