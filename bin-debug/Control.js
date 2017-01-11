/**
 *
 * @author
 *
 */
var Control = (function (_super) {
    __extends(Control, _super);
    function Control() {
        _super.call(this);
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.isNext = true;
    }
    var d = __define,c=Control,p=c.prototype;
    p.addTouchEvent = function (opts) {
        this.square = opts.square;
        var ocs = RES.getRes("ocs_json");
        this.shpc = new egret.Shape();
        this.shpc.graphics.beginFill(0xff0000, 1);
        this.shpc.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.shpc.graphics.endFill();
        this.shpc.alpha = 0;
        this.shpc.touchEnabled = true;
        this.shpc.pixelHitTest = true;
        this.addChild(this.shpc);
        this.shpc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            evt.stopImmediatePropagation();
            if (this.isNext) {
                this.isNext = false;
                this.checkStep(evt.stageX, evt.stageY);
            }
        }, this);
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
    };
    p.checkStep = function (stageX, stageY) {
        if (stageX > this.stageW / 2) {
            this.square.run(this, 2);
        }
        else {
            this.square.run(this, 1);
        }
    };
    return Control;
}(egret.DisplayObjectContainer));
egret.registerClass(Control,'Control');
