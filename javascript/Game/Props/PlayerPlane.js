/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/30/12
 * Time: 9:47 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package('airwar.Game.Props');
airwar.Game.Props.PlayerPlane = airwar.Game.Props.Observer.extend({

    HP : 10,

    // user's plane could reborn 3 times after dead
    reBornTimes : 3,

    attackableArea : {},

    _instance : null,

    attackableAreaOffset : {
        top     : 10,
        bottom  : 0,
        left    : 0,
        right   : 0
    },

    canBeAttack : false,

    /**
     *
     */
    init : function() {
        // initialize the playerplane image

        $('#bgImgContainer').append('<div id="playerPlane"></div>');

        $('#playerPlane').addClass('playerPlane');

        // calculate the intitial position
        var viewportHeigth = airwar.Util.Utility.pageSize.viewportHeight;

        // plane pic's height is 53
        $('#playerPlane').css('top', viewportHeigth);
        var left = $('#stageBgPic').width() / 2;
        $('#playerPlane').css('left', left);

        $('#playerPlane').css('z-index', 1100);

        this._debut();

        this.keyState = {up:false,down:false,left:false,right:false};

        this.moveType = airwar.Util.Utility.moveType.PLANEBULLET1;

        var that = this;

        this._fly_c = airwar.Util.Method.bind(this.fly, this);

        this.flyTimer = airwar.Util.TimerManager.getTimer();
        this.flyTimer.setMethod(this._fly_c);
        this.flyTimer.setDuration(30);
        this.flyTimer.startTimeInterval();

        $(document).keydown(
            function(e) {
                that._handleKeyDownEvent(e);
            }).keyup(function(e) {
                that._handleKeyUpEvent(e)
            });
        this._instance = $('#playerPlane');
        this.canBeAttack = true;

        this._instance.bind("beAttack", this._beAttack);
        var bullets = airwar.Game.Props.Catridge.bullets.enemyBullet1;
        var bullets2 = airwar.Game.Props.Catridge.bullets.enemyBullet2;
        this.observeEvent("beAttack", bullets);
        this.observeEvent("beAttack", bullets2);
    },

    _debut : function() {
        this.canBeAttack = false;
        var viewportHeigth = airwar.Util.Utility.pageSize.viewportHeight;
        var debutTimer = airwar.Util.TimerManager.getTimer();
        var that = this;
        var flashCounter = 0;
        debutTimer.setMethod(function() {
            // playerPlane would dive from the bottom and stop when top = 400
            if ($('#playerPlane').position().top > viewportHeigth - 300) {
                $('#playerPlane').css('top', "-=6");

                $('#playerPlane').css("visibility", flashCounter++ % 2 == 0 ? "visible" : "hidden");
            }
            else {
                $('#playerPlane').css("visibility", "visible");
                that.canBeAttack = true;
                debutTimer.stopTimeInterval();
                if (that.reAppearTimer) {
                    that.reAppearTimer.stopTimeout();
                }
            }

        });

        debutTimer.setDuration(60);
        debutTimer.startTimeInterval();
    },

    reAppear : function() {
        var viewportHeigth = airwar.Util.Utility.pageSize.viewportHeight;

        // plane pic's height is 53
        $('#playerPlane').css('top', viewportHeigth);
        var left = $('#stageBgPic').width() / 2;
        $('#playerPlane').css('left', left);

        this._debut();
        this.keyState = {up:false,down:false,left:false,right:false};
        this.HP = 10;
        this._instance.bind("beAttack", this._beAttack);
        var bullets = airwar.Game.Props.Catridge.bullets.enemyBullet1;
        var bullets2 = airwar.Game.Props.Catridge.bullets.enemyBullet2;
        this.observeEvent("beAttack", bullets);
        this.observeEvent("beAttack", bullets2);
    },

    /**
     *
     * @param event
     */
    _handleKeyDownEvent : function(event) {
        if (this.HP <= 0) {
            return;
        }
        switch (event.which) {
            case 65 :       // 'A' pressed
                this.keyState.left = true;
                break;
            case 83 :       // 'S' pressed
                this.keyState.down = true;
                break;
            case 68 :       // 'D' pressed
                this.keyState.right = true;
                break;
            case 87 :       // 'W' Pressed
                this.keyState.up = true;
                break;
            case 74 :       //'J' pressed
                this.fire();
                break;
            case 75 :      // 'k' pressed
                this.bomb();
        }
    },

    /**
     *
     * @param event
     */
    _handleKeyUpEvent : function(event) {
        if (this.HP <= 0) {
            return;
        }
        switch (event.which) {
            case 65 :
                this.keyState.left = false;
                break;
            case 83 :
                this.keyState.down = false;
                break;
            case 68 :
                this.keyState.right = false;
                break;
            case 87 :
                this.keyState.up = false;
                break;
        }
    },

    /**
     * move the plane
     *
     * @param event
     */
    fly : function() {
        if (this.keyState.left && $('#playerPlane').position().left >= 0) {
            $('#playerPlane').css('left', "-=5");
        }
        else if (this.keyState.right && $('#playerPlane').position().left <
            Global.playFieldWidth - $('#playerPlane').width()) {
            $('#playerPlane').css('left', "+=5");
        }
        if (this.keyState.up) {
            $('#playerPlane').css('top', "-=5");
        }
        else if (this.keyState.down) {
            $('#playerPlane').css('top', "+=5");
        }
        this.updateAttackableArea();

    },

    // caculate the attackable area, when plane bullets comes into this area could cause damage to the enemy
    updateAttackableArea : function() {
        this.attackableArea = {
            left    : this._instance.position().left + this.attackableAreaOffset.left,
            right   : this._instance.position().left + this._instance.width() - this.attackableAreaOffset.right ,
            top     : this._instance.position().top + this.attackableAreaOffset.top ,
            bottom  : this._instance.position().top + this._instance.height() - this.attackableAreaOffset.bottom
        };
    },

    fire : function() {
        var bullet = airwar.Game.Props.Catridge.getBullet(this.moveType);
        // align the bullet with the player plane
        var left = $('#playerPlane').position().left + 22;
        var top = $('#playerPlane').position().top - 60;
        bullet.setPosition({"left" : left, "top" : top});
        bullet.setDamage(10);
        bullet.fly();
    },

    bomb : function() {
         $('#planeBombState').trigger("updatePlaneBombStatus");
        if (!!!this._bombAnim) {
            this._bombAnim = new airwar.Game.Props.Animation("bomb1", 26, 120);
            // width 399, height 429
            this._bombAnim.setDimension(399, 429);
            var leftPos = this._instance.position().left + this._instance.width() / 2 - 399 / 2;
            var topPos = this._instance.position().top - 429;
            pos = {
                left : leftPos,
                top  : topPos
            };

            this._bombAnim.setPosition(pos);
        }
        this._bombAnim.play();

        var enemyBeAttackTimeout = airwar.Util.TimerManager.getTimer();
        enemyBeAttackTimeout.setMethod(function() {
            $.each(Global.activeEnemies, function(idx, enemy) {
                if (enemy.HP > 0) {
                    enemy.HP -= 400;
                    enemy._instance.trigger("beAttack", [enemy]);
                }
            });

            $.each(airwar.Game.Props.Catridge.bullets.enemyBullet1, function(idx, bullet) {
                bullet._instance.css("visibility", "hidden");
                bullet.isIdle = true;
            });
            $.each(airwar.Game.Props.Catridge.bullets.enemyBullet2, function(idx, bullet) {
                bullet._instance.css("visibility", "hidden");
                bullet.isIdle = true;
            });
        });

        enemyBeAttackTimeout.setDuration(150);
        enemyBeAttackTimeout.startTimeout();

    },

    /**
     * action handler for being attacked
     */
    _beAttack : function() {
        var obj = arguments[1];
        var bullet = arguments[2];
        if (obj.HP > 0) {
            obj.HP -= bullet.getDamage();
        }
        if (obj.HP <= 0) {
            obj.reBornTimes--;
            //TODO self destory explosion effects
            if (!!!obj._destoryAnimation) {
                obj._destoryAnimation = new airwar.Game.Props.Animation("destroy2", 8, 150);
            }

            pos = {
                left : $(this).position().left + $(this).width() / 2 - 191 / 2,
                top  : $(this).position().top + $(this).height() / 2 - 178 / 2
            };

            obj._instance.css("visibility", "hidden");

            obj._destoryAnimation.setDimension(134, 142);
            obj._destoryAnimation.setPosition(pos);
            obj._destoryAnimation.play();

            //unbind the 'beAttack' event
            obj._instance.unbind("beAttack");
            obj.stopObserveEvent("beAttack");

            $('#planeLifeStatus').trigger("updatePlaneLifeStatus");

            if (obj.reBornTimes >= 0) {
                obj.reAppearTimer = airwar.Util.TimerManager.getTimer();
                obj.reAppearTimer.setMethod(function() {
                    obj.reAppear();
                });
                obj.reAppearTimer.setDuration(1000);
                obj.reAppearTimer.startTimeout();
            }
            else {
                // todo game over
            }
        }
    }
})
    ;

