/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 3/26/12
 * Time: 11:31 AM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Game.Props');

airwar.Game.Props.Enemy2 = airwar.Game.Props.Enemy.extend({

    HP : 200,

    init : function(instance) {
        this._super(instance);
        var that = this;
    },

    fire : function() {
        var timer = airwar.Util.TimerManager.getTimer();
        var that = this;
        var viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;

        var bullet = [];

        timer.setMethod(function() {

            if (that.HP > 0) {
                var counter = 0;
                $.each(that.bulletCollections, function(idx, value) {
                    if (value && value.isIdle) {
                        that.bulletCollections.splice(idx, 1);
                    }
                    else {
                        counter++;
                    }
                });
                if (counter >= 2) {
                    return;
                }
                else {
                    bullet[0] = airwar.Game.Props.Catridge.getBullet(that.bulletType);
                    bullet[1] = airwar.Game.Props.Catridge.getBullet(that.bulletType);
                    var left = that._instance.position().left + 32;
                    var top = that._instance.position().top + 60;
                    bullet[0].setPosition({"left" : left, "top" : top});
                    bullet[0].setStopPos({top:viewportHeight + 10});
                    bullet[0].setDamage(10);

                    left = that._instance.position().left + 142;
                    bullet[1].setPosition({"left" : left, "top" : top});
                    bullet[1].setStopPos({top:viewportHeight + 10});
                    bullet[1].setDamage(10);

                    that.bulletCollections.push(bullet[0]);
                    that.bulletCollections.push(bullet[1]);
                }
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
