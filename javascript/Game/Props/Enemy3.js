/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 3/27/12
 * Time: 11:34 AM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package('airwar.Game.Props');

airwar.Game.Props.Enemy3 = airwar.Game.Props.Enemy.extend({

    _shotAngle : null,

    HP : 300,

    init : function(instance) {
        this._super(instance);
    },

    fire : function() {
        var timer = airwar.Util.TimerManager.getTimer();
        var that = this;
        var viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;
        var viewportWidth = 530;

        var bullet;

        timer.setMethod(function() {

            if (that.HP > 0) {
//              airwar.Game.Props.FlyController.moveBulletByAngle(bullet, 110, timer);
                var counter = 0;
                $.each(that.bulletCollections, function(idx, value) {
                    if (value && value.isIdle) {
                        that.bulletCollections.splice(idx, 1);
                    }
                    else {
                        counter++;
                    }
                });
                if (counter >= 5) {
                    return;
                }
                else {
                    for (var i = 0; i < 5 - counter; i++) {
                        bullet = airwar.Game.Props.Catridge.getBullet(that.bulletType);
                        var left = that._instance.position().left + 45 + i * 20;
                        var top = that._instance.position().top + 60;
                        bullet.speed = 8;
                        bullet.setPosition({"left" : left, "top" : top});
                        bullet.setStopPos({top:0, bottom:viewportHeight + 10, left:0, right : viewportWidth});
                        bullet.setDamage(10);
                        that.bulletCollections.push(bullet);
                    }
                }

                that._shotAngle = airwar.Util.Utility.getAngle(
                    that._instance.position().left,
                    that._instance.position().top,
                    Global.playerPlane._instance.position().left,
                    Global.playerPlane._instance.position().top
                );

            }
            else {
                //TODO after fire stopped, need to dispose all bullets and enemy itself
                timer.stopTimeInterval();
            }

        });

        timer.setDuration(5000);
        timer.startTimeInterval();
    }



});