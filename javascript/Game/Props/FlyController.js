/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 2/6/12
 * Time: 10:39 AM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Game.Props');

airwar.Game.Props.FlyController = {

    moveObject : function(obj) {
        var moveType = airwar.Util.Utility.moveType;
        switch (obj.type) {
            case moveType.ENEMYBULLET1 :
                var timer = airwar.Util.TimerManager.getTimer();
                timer.setMethod(airwar.Util.Method.bind(this[obj.type], this, obj, timer));
                //TODO adjust bullet's speed by game level
                timer.setDuration(90);
                timer.startTimeInterval();
                break;

            default :
                var timer = airwar.Util.TimerManager.getTimer();
                timer.setMethod(airwar.Util.Method.bind(this[obj.type], this, obj, timer));
                timer.setDuration(30);
                timer.startTimeInterval();
                break;
        }
    },

    /**
     * move multiple objects in the same timer to improve performance
     *
     * @param objs - An array of objects which need to move
     */
    moveObjects : function(objs) {
// var objArr = $.extend(true, [], objs);
        var timer = airwar.Util.TimerManager.getTimer();
        var that = this;
        // determin the gap between 2 bullts got fired
        timer.setMethod(function() {
            if (objs.length < 1) {
                timer.stopTimeInterval();
            }
            else {
                for (var i = 0, len = objs.length; i < len; i++) {
                    if (objs[i]) {
                        var move_c = airwar.Util.Method.bind(that[objs[i].type], that, objs[i], null, true, objs);
                        move_c();
                    }
                }
            }
        });
        timer.setDuration(30);
        timer.startTimeInterval();
    },

    planeBullet1 : function(obj, timer) {
        // TODO need to detect if the bullet hit any target or not
//        if (parseInt(obj._instance.css('top')) > -40) {
        if (obj._instance.position().top > -40) {
            obj._instance.css("top", "-=25");
            obj.updateAttackableArea();
        }
        else {
            timer.stopTimeInterval();
            obj.isIdle = true;
        }
    },

    /**
     *
     *
     * @param obj
     * @param timer
     * @param batchMode
     * @param objs
     */
    moveType1 : function(obj, timer, batchMode, objs) {

        // TODO need to detect enemy exploded or not also
        // if obj has been destroied, stop the timer
        if (obj.HP <= 0) {
            // if multiple objs moved at the same time, remove the dead one from the array
            if (batchMode) {
                $.each(obj.bulletCollections, function(idx, value) {
                    value.isIdle = true;
                    value._instance.css("visibility", "hidden");
                });
                var idx = $.inArray(obj, objs);
                objs.splice(idx, 1);
            }
            else {
                timer.stopTimeInterval();
            }
        }
        else {
            // fire bullets in every 90 mill secs


            if (obj.bulletCollections.length > 0) {
                for (var i = 0,len = obj.bulletCollections.length; i < len; i++) {
                    var bullet = obj.bulletCollections[i];
                    if (bullet && !bullet.isIdle) {
                        if (bullet._instance.position().top < bullet.stopPos.top + 10) {
//                                bullet._instance.css("top", "+=5");
                            var id = bullet._instance.attr("id");
                            // instead using jquery, directly do dom operation to improve performance
                            document.getElementById(id).style.top =
                                parseInt(document.getElementById(id).style.top)
                                    + 6 + "px";
                            bullet.updateAttackableArea();
                        }
                        else {
                            bullet.isIdle = true;
                            obj.bulletCollections.splice(i, 1);
                        }
                    }

                }
            }

            // direction  1 - keep still
            if (obj.direction == 1) {
                if (obj._instance.position().top < obj.stopPos.top) {
                    obj._instance.css("top", "+=1");
                    obj.updateAttackableArea();
                }
                else {
                    if (batchMode) {
                        var idx = $.inArray(obj, objs);
                        objs.splice(idx, 1);
                    }
                    else {
                        timer.stopTimeInterval();
                    }
                    // TODO dispose enemy
                    // obj.dispose();
                }
            }
            // direction 2 - from upper right to lower left
            else if (obj.direction == 2) {
                if (obj._instance.position().top < obj.stopPos.top) {
                    // if the ojb didn't reach left boundary, go from upper right to lower left
                    // there is a assumption, the obj would firstly reach the left boundary
                    if (obj._instance.position().left > obj.stopPos.left) {
                        obj._instance.css("top", "+=2");
                        obj._instance.css("left", "-=1");
                        obj.updateAttackableArea();
                    }
                    else {
                        // TODO dispose enemy
                        // if reach left boundary, then it would keep still to follow the stage pic scroll
                        obj._instance.css("top", "+=1");
                    }
                }
                else {
                    // TODO dispose enemy
                    // after go out of both boudary, then stop the timer
                    if (batchMode) {
                        var idx = $.inArray(obj, objs);
                        objs.splice(idx, 1);
                    }
                    else {
                        timer.stopTimeInterval();
                    }
                }
            }
            // direction 3 - from upper left to lower right
            else if (obj.direction == 3) {
                if (obj._instance.position().top < obj.stopPos.top) {
                    // if the ojb didn't reach left boundary, go from upper right to lower left
                    // there is a assumption, the obj would firstly reach the left boundary
                    if (obj._instance.position().left < obj.stopPos.left) {
                        obj._instance.css("top", "+=1.5");
                        obj._instance.css("left", "+=1");
                        obj.updateAttackableArea();
                    }
                    else {
                        // TODO dispose enemy
                        // if reach left boundary, then it would keep still to follow the stage pic scroll
                        obj._instance.css("top", "+=1");
                    }
                }
                else {
                    // TODO dispose enemy
                    // after go out of both boudary, then stop the timer
                    if (batchMode) {
                        var idx = $.inArray(obj, objs);
                        objs.splice(idx, 1);
                    }
                    else {
                        timer.stopTimeInterval();
                    }
                }
            }
        }
    },

    moveType2 : function(obj, timer) {
        // TODO need to detect enemy exploded or not also
        // if obj has been destroied, stop the timer
        if (obj.HP <= 0) {
            timer.stopTimeInterval();
            for (var i = 0; i < obj.bulletCollections.length; i++) {
                bullet = obj.bulletCollections[i];
                bullet.isIdle = true;
                bullet._instance.css("visibility", "hidden");
            }
            obj.bulletCollections.length = 0;
        }
        else {


            if (obj.bulletCollections.length > 0) {
                for (var i = 0,len = obj.bulletCollections.length; i < len; i++) {
                    var bullet = obj.bulletCollections[i];
                    if (bullet && !bullet.isIdle) {
                        if (bullet._instance.position().top < bullet.stopPos.top + 10) {
//                                bullet._instance.css("top", "+=5");
                            var id = bullet._instance.attr("id");
                            // instead using jquery, directly do dom operation to improve performance
                            document.getElementById(id).style.top =
                                parseInt(document.getElementById(id).style.top)
                                    + 6 + "px";
                            bullet.updateAttackableArea();
                        }
                        else {
                            bullet.isIdle = true;
                            obj.bulletCollections.splice(i, 1);
                        }
                    }

                }
            }
            
            // direction  1 - keep still
            if (obj.direction == 1) {
                if (obj._instance.position().top < obj.stopPos.top) {
                    obj._instance.css("top", "+=2");
                    obj.updateAttackableArea();
                }
                else {
                    timer.stopTimeInterval();
                    // TODO dispose enemy
                    // obj.dispose();
                }
            }
        }
    }
    ,

    moveType3 : function(obj, timer) {
        // TODO need to detect enemy exploded or not also
        // if obj has been destroied, stop the timer
        if (obj.HP <= 0) {
            timer.stopTimeInterval();
            for (var i = 0; i < obj.bulletCollections.length; i++) {
                bullet = obj.bulletCollections[i];
                bullet.isIdle = true;
                bullet._instance.css("visibility", "hidden");
            }
            obj.bulletCollections.length = 0;
        }
        else {

                if (obj.bulletCollections.length > 0) {
                    for (var i = 0,len = obj.bulletCollections.length; i < len; i++) {
                        var bullet = obj.bulletCollections[i];
                        if (bullet && !bullet.isIdle) {
                            if (bullet._instance.position().top < bullet.stopPos.top + 10) {
                                var id = bullet._instance.attr("id");
                                // instead using jquery, directly do dom operation to improve performance
                                document.getElementById(id).style.top =
                                    parseInt(document.getElementById(id).style.top)
                                        + 4 + "px";
                                bullet.updateAttackableArea();
                            }
                            else {
                                bullet.isIdle = true;
                                bullet._instance.css("visibility", "hidden");
                                // after recycle the bullets, need to remove it from bulletCollections immediately
                                // otherwise it would cause some weired results. for ex, bullet_0, and bullet_0 are recycled
                                // but still in enemy2's bulletCollections, and they are been assigned to bullet_1 to reuse
                                // but it would be recycled again in bullet_0 since we didn't remove them in time. user
                                // would see 2 bullets appear then disappera quickly. 
                                obj.bulletCollections.splice(i, 1);
                            }
                        }

                    }
                }


            // direction  1 - from lower left to upper above
            if (obj.direction == 1) {
                if (obj._instance.position().left < obj.stopPos.left) {
                    // if didn't reach upperbound, fly diagnostically
                    if (obj._instance.position().top > obj.stopPos.top) {
                        obj._instance.css("top", "-=4");
                        obj._instance.css("left", "+=2");
                    }
                    // presumption-enemy2 would reach upperbound firstly
                    else {
                        // if reach left boundary, then it would keep move horizontally
                        obj._instance.css("left", "+=2");
                    }
                    obj.updateAttackableArea();
                }
                else {
//                    timer.stopTimeInterval();
                    // TODO dispose enemy
                    // obj.dispose();
                }
            }
        }
    }
    ,

    _shotBulletsByAngle : function(obj, fireGap) {
        obj.bulletFireGap++;
        if (obj.bulletFireGap % fireGap == 0) {
            if (obj.bulletCollections.length > 0) {
                for (var i = 0,len = obj.bulletCollections.length; i < len; i++) {
                    var bullet = obj.bulletCollections[i];
                    if (bullet && !bullet.isIdle) {
                        if (bullet._instance.position().left > bullet.stopPos.left
                            && bullet._instance.position().left < bullet.stopPos.right
                            && bullet._instance.position().top > bullet.stopPos.top
                            && bullet._instance.position().top < bullet.stopPos.bottom) {
                            this.moveBulletByAngle(obj, bullet, obj._shotAngle);
                            bullet.updateAttackableArea();
                        }
                        else {
                            bullet.isIdle = true;
                            bullet._instance.css("visibility", "hidden");
                            obj.bulletCollections.splice(i, 1);
                        }
                    }

                }

            }
            obj.bulletFireGap = 0;
        }
    },

    moveType4 : function(obj, timer) {
        if (obj.HP <= 0) {
            timer.stopTimeInterval();
            for (var i = 0; i < obj.bulletCollections.length; i++) {
                bullet = obj.bulletCollections[i];
                bullet.isIdle = true;
                bullet._instance.css("visibility", "hidden");
            }
            obj.bulletCollections.length = 0;

        }
        else {
            this._shotBulletsByAngle(obj, 1);

            if (obj.direction == 1) {
                if (obj._instance.position().left < obj.stopPos.left) {
                    // if didn't reach upperbound, fly diagnostically
                    if (obj._instance.position().top > obj.stopPos.top) {
                        obj._instance.css("top", "-=4");
                        obj._instance.css("left", "+=2");
                    }
                    // presumption-enemy2 would reach upperbound firstly
                    else {
                        // if reach left boundary, then it would keep move horizontally
                        obj._instance.css("left", "+=2");
                    }
                    obj.updateAttackableArea();
                }

            }
        }

    },

    moveType5 : function(obj, timer) {
        // TODO need to detect enemy exploded or not also
        // if obj has been destroied, stop the timer
        if (obj.HP <= 0) {
            timer.stopTimeInterval();
            for (var i = 0; i < obj.bulletCollections.length; i++) {
                bullet = obj.bulletCollections[i];
                bullet.isIdle = true;
                bullet._instance.css("visibility", "hidden");
            }
            obj.bulletCollections.length = 0;
        }
        else {
            this._shotBulletsByAngle(obj, 1);
            // direction  1 - keep still
            if (obj.direction == 1) {
                if (obj._instance.position().top > obj.stopPos.top) {
                    obj._instance.css("top", "-=2");
                    obj.updateAttackableArea();
                }
            }
        }
    }
    ,

    moveBulletByAngle : function(obj, bullet, angle) {
        var newX,newY;
        var xAngle = !!angle ? angle * (2 * Math.PI / 360) : bullet.angle * (2 * Math.PI / 360);
        var xDirection = Math.abs(Math.cos(xAngle)) / Math.cos(xAngle);
        var yDirection = Math.abs(Math.sin(xAngle)) / Math.sin(xAngle);

        if (bullet._instance.position().left > bullet.stopPos.left
            && bullet._instance.position().left < bullet.stopPos.right
            && bullet._instance.position().top > bullet.stopPos.top
            && bullet._instance.position().top < bullet.stopPos.bottom) {
            if (Math.abs(Math.tan(xAngle)) <= 1) {
                var deltaX = Math.abs(bullet.speed * Math.cos(xAngle)) * xDirection;
                newX = bullet._instance.position().left + deltaX;
                newY =
                    -(newX - bullet._instance.position().left) * Math.tan(xAngle) + bullet._instance.position().top;
            }
            else {
                var deltaY = Math.abs(bullet.speed * Math.sin(xAngle)) * yDirection;
                newY = bullet._instance.position().top - deltaY;
                newX =
                    -(newY - bullet._instance.position().top) / Math.tan(xAngle) + bullet._instance.position().left;
            }
        }
        else {
            bullet.isIdle = true;
            bullet._instance.css("visibility", "hidden");
        }


        var id = bullet._instance.attr("id");
        // instead using jquery, directly do dom operation to improve performance
        document.getElementById(id).style.left = newX + "px";
        document.getElementById(id).style.top = newY + "px";
    }
    ,
    /**
     * move boss1
     *
     * @param obj - the boss1
     * @param timer
     */
    moveBoss1 : function(obj, timer) {
        if (obj.HP <= 0) {
            timer.stopTimeInterval();
            for (var i = 0; i < obj.bulletCollections1.length; i++) {
                bullet = obj.bulletCollections1[i];
                bullet.isIdle = true;
                bullet._instance.css("visibility", "hidden");
            }
            obj.bulletCollections1.length = 0;
        }
        else {
            obj.bulletFireGap++;
            if (obj.fireCounter == 2) {
                if (obj.bulletCollections1.length > 0) {
                    for (var i = 0,len = obj.bulletCollections1.length; i < len; i++) {
                        var bullet = obj.bulletCollections1[i];
                        if (bullet && !bullet.isIdle) {
                            if (bullet._instance.position().left > bullet.stopPos.left
                                && bullet._instance.position().left < bullet.stopPos.right
                                && bullet._instance.position().top > bullet.stopPos.top
                                && bullet._instance.position().top < bullet.stopPos.bottom) {
                                bullet._instance.css("visibility", "visible");

                                this.moveBulletByAngle(obj, bullet);
                                bullet.updateAttackableArea();
                            }
                            else {
                                bullet.isIdle = true;
                                bullet._instance.css("visibility", "hidden");
                                obj.bulletCollections1.splice(i, 1);
                                if (obj.bulletCollections1.length <= 3) {
                                    obj.fireCounter = 1;
                                }
                            }
                        }

                    }

                }
                obj.bulletFireGap = 0;
            }

            if (obj.currPos == "top" && obj._instance.position().top < obj.stopPos.bottom) {
                obj._instance.css("top", "+=5");
                obj.updateAttackableArea();
            }
            else {
                if (obj.currPos == "top") {
                    obj.currPos = "bottom";
                    obj.currMoveTo = "left";
                }
            }
            if (obj.currPos == "bottom") {
                if (obj.currMoveTo == "left") {
                    if (obj._instance.position().left > obj.stopPos.left) {
                        if (obj.holdOnTime-- > 0) {
                            return;
                        }
                        obj._instance.css("left", "-=2");
                        obj.updateAttackableArea();

                    }
                    else {
                        obj.currMoveTo = "center";
                        obj.fromPos = "left";
                        obj.holdOnTime = 30;


                    }
                }
                else if (obj.currMoveTo == "center") {
                    if (obj.fromPos == "left" && obj._instance.position().left < 140) {
                        if (obj.holdOnTime-- > 0) {
                            return;
                        }
                        obj._instance.css("left", "+=2");
                    }
                    else if (obj.fromPos == "right" && obj._instance.position().left > 140) {
                        if (obj.holdOnTime-- > 0) {
                            return;
                        }
                        obj._instance.css("left", "-=2");
                    }
                    else {
                        if (obj.fromPos == "left") {
                            obj.currMoveTo = "right";
                        }
                        else {
                            obj.currMoveTo = "left";
                        }
                        obj.fromPos = "center";
                        obj.holdOnTime = 30;
                    }
                }
                else {
                    if (obj._instance.position().left < obj.stopPos.right) {
                        if (obj.holdOnTime-- > 0) {
                            return;
                        }
                        obj._instance.css("left", "+=2");
                    }
                    else {
                        obj.currMoveTo = "center";
                        obj.fromPos = "right";
                        obj.holdOnTime = 30;
                    }
                }
            }
        }
    },

    enemyBullet1 : function(obj, timer) {
        if (obj._instance.position().top < obj.stopPos.top + 10) {
            obj._instance.css("top", "+=6");
            obj.updateAttackableArea();
        }
        else {
            timer.stopTimeInterval();
            obj.isIdle = true;
        }
    }

}
    ;
