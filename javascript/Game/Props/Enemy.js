/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 2/8/12
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package('airwar.Game.Props');

airwar.Game.Props.Enemy = airwar.Game.Props.Observer.extend({

    _instance : null,

    type : null,

    direction : null,

    bulletType : null,

    stopPos : null,

    canBeAttack : false,

    dimension : {},

    attackableAreaOffset : {},

    attackableArea : {},

    appearTime : 0,

    bulletFireGap : 0,

    bulletCollections : null,

    HP : 60,

    _rewards : null,

    score : null,


    init : function(instance) {
        this._instance = instance;
        this.canBeAttack = true;
        this._instance.bind("beAttack", this._beAttack);
        this.bulletCollections = [];
        airwar.Util.Utility.uniqueArray(this.bulletCollections);
        var bullets = airwar.Game.Props.Catridge.bullets.planeBullet1;
        this.observeEvent("beAttack", bullets);
        this.score = 0;
        var that = this;
    },

    setFlyParameter : function(type, direction) {
        this.type = type;
        this.direction = direction;
    },

    setBulletType : function(type) {
        this.bulletType = type;
    },

    setStopPos : function(pos) {
        this.stopPos = pos;
    },

    setZindex : function(zindex)
    {
      this._instance.css('z-index',zindex);
    },

    fly : function() {
        airwar.Game.Props.FlyController.moveObject(this);
    },

    // caculate the attackable area, when plane bullets comes into this area could cause damage to the enemy
    updateAttackableArea : function() {
        this.attackableArea = {
            left    : this._instance.position().left + this.attackableAreaOffset.left,
            right   : this._instance.position().left + this._instance.width() - this.attackableAreaOffset.right,
            top     : this._instance.position().top + this.attackableAreaOffset.top,
            bottom  : this._instance.position().top + this._instance.height() - this.attackableAreaOffset.bottom
        };
    },

    fire : function() {
        var timer = airwar.Util.TimerManager.getTimer();
        var that = this;
        var viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;

        timer.setMethod(function() {
            if (parseInt(that._instance.css('top')) < that.stopPos.top && that.HP > 0) {
                var bullet = airwar.Game.Props.Catridge.getBullet(that.bulletType);
                var left = that._instance.position().left + 32;
                var top = that._instance.position().top + 60;
                bullet.setPosition({"left" : left, "top" : top});
                bullet.setStopPos({top:viewportHeight + 10});
                bullet.setDamage(10);
                that.bulletCollections.push(bullet);
            }
            else {
                //TODO after fire stopped, need to dispose all bullets and enemy itself
                timer.stopTimeInterval();
            }
        });
        timer.setDuration(4000);
        timer.startTimeInterval();

    },

    setScore : function( score )
    {
      this.score = score;
    },

    getScore : function()
    {
      return this.score;
    },

    /**
     * when the plane should appear on the stage
     *
     * @param appearTime
     */
    setAppearTime : function(appearTime) {
        this.appearTime = appearTime;
    },

    /**
     * action handler for being attacked
     */
    _beAttack :function() {
        var obj = arguments[1];

        // begin the animation of being attached
        // toggle the bright animation

        var css = obj._instance.attr("class");

        if (css.indexOf("Bright") < 0) {
            obj._instance.removeClass();
            obj._instance.addClass(css + "Bright");
        }
        var toggleTimer = airwar.Util.TimerManager.getTimer();
        toggleTimer.setMethod(function() {
            obj._instance.removeClass();
            obj._instance.addClass(css);
            toggleTimer.stopTimeInterval();
        });
        toggleTimer.setDuration(30);
        toggleTimer.startTimeInterval();

        if (!!!obj._sparkAnimation) {
            obj._sparkAnimation = new airwar.Game.Props.Animation("spark1", 12, 30);
        }
        var pos = {
            left : $(this).position().left + $(this).width() / 2 - 25 / 2,
            top  : $(this).position().top + $(this).height() / 2 - 60 / 2
        };
        obj._sparkAnimation.setPosition(pos);
        obj._sparkAnimation.setDimension(25, 60);
        obj._sparkAnimation.play();
        var bullet = arguments[2];
        if (obj.HP > 0) {
            obj.HP -= bullet.getDamage();
        }
        if (obj.HP <= 0) {
            //TODO self destory explosion effects
            if (!!!obj._destoryAnimation) {
                obj._destoryAnimation = new airwar.Game.Props.Animation("destroy1", 9, 60);
            }

            var leftPos = $(this).position().left + $(this).width() / 2;
            var topPos  = $(this).position().top + $(this).height() / 2;
            pos = {
                left : leftPos - 80 > 0 ? leftPos - 80 : leftPos,
                top  : topPos- 80 > 0 ? topPos - 80 : topPos
            };

            obj._destoryAnimation.setPosition(pos);
            obj._destoryAnimation.setDimension(160, 160);
            obj._destoryAnimation.play();
            obj._instance.css("visibility", "hidden");

            // update plane score
             $('#planeScore').trigger("updatePlaneScore", [Global.bulltinBoard,obj.getScore()]);

            if (obj._rewards) {
                obj._rewards.setPosition(pos);
                obj._rewards.fly();
            }

            //unbind the 'beAttack' event
            obj._instance.unbind("beAttack");
            obj.stopObserveEvent("beAttack");
        }
    },

    /**
     * set rewards - gold or powerup
     *
     * @param rewards
     */
    setRewards : function(rewards) {
        this._rewards = rewards;
    },


    /**
     * set the position and make it invisible temporially, 'stage' object would make it appear according to its
     * appear time
     *
     * @param pos
     */
    setPosition: function(pos) {
        this._instance.css("left", pos.left).css("top", pos.top).css("position", "absolute").
            css("visibility", "hidden");
    }
});