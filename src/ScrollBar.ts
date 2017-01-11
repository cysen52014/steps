/**
 *
 * @author 
 *
 */
class ScrollBar extends eui.UILayer{
	public constructor() {
    	 super();  
	}
	private wpgs = 14;
    private rg = 4;
    private goodsSoundEnd = true;
    private oParent;
    
 	private creatGloup(opt){
        this.oParent = opt.oParent;
        var group = new eui.Group();
        var goods: egret.SpriteSheet = RES.getRes("goods_json");
        var imgc,img,nm=0,cols,rows,b,hh;
        var self = this;
        
        for(var i = 0;i < this.wpgs; i++) {
            rows = Math.floor(i / this.rg);
            cols = Math.floor(i % this.rg);
            
            imgc = new eui.Group();
            imgc.width = 150;
            imgc.height = 190;
            imgc.x = cols * imgc.width+20;
            imgc.y = rows * imgc.height;
            b = new egret.Bitmap();
            b.texture = goods.getTexture("lb_" + (i+1));
            hh = 130 * (b.height / b.width);
            b.y = (imgc.height - hh)/2;
            b.x = (imgc.width - 130) / 2;
            b.name = i;
            b.width = 130;
            b.height = hh;
            b.touchEnabled = true;
            //img = new eui.Image("lb_" + nm);
            
            b.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt) {
                evt.stopImmediatePropagation();        
                opt.hidePops();
                opt.showPops(2);  

           
                var n = parseInt(evt.target.name);
                self.playsound(n);
            });
            
            imgc.addChild(b);
            group.addChild(imgc);
        }
        
        
        //创建一个Scroller
        var myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.width = 680;
        myScroller.height = 445;
        //设置viewport
        myScroller.viewport = group;
        this.addChild(myScroller);
        //myScroller.verticalScrollBar.autoVisibility = false;
	}
    private playsound(n) {
        var arr = [17,16,15,14,13,11,10,9,12,8,2,7,6,1];
        var st = this.oParent.micArrList[arr[n]]['yy'][0]; 
        var end = this.oParent.micArrList[arr[n]]['yy'][1];
       
        var startlayer = this.oParent.startLayer;
        startlayer.musicPlay.texture = startlayer.occ.getTexture("sa_5");
        startlayer.music.loop = false;
        
        startlayer.music.isOpenMusic = true;
        startlayer.oParent.isOpenMusic = true;           
        startlayer.music.callback = function(){
            startlayer.music.callback = null;
            startlayer.music.musicChose = 3;
            startlayer.music.stopMiuc();
            startlayer.music.playMusic();
        }
        this.oParent.MisicUl.changeMusic(st,end);
	}
}
