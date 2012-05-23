/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 4/2/12
 * Time: 10:49 AM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.Enemy7 = airwar.Game.Props.Enemy.extend( {

    HP : 280,

    bulletCount : null,

    angleDistance : null,

    init : function( instance )
    {
        this._super( instance );
        this.bulletCount = 6;
        this.angleDistance = 25;
    },

    fire1 : function()
    {
        var timer = airwar.Util.TimerManager.getTimer();
        var that = this;
        var viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;
        var viewportWidth = 530;

        var bullet = [];

        timer.setMethod( function()
        {

            if ( that.HP > 0 )
            {
//              airwar.Game.Props.FlyController.moveBulletByAngle(bullet, 110, timer);
                var counter = 0;
                $.each( that.bulletCollections, function( idx, value )
                {
                    if ( value && value.isIdle )
                    {
                        that.bulletCollections.splice( idx, 1 );
                    }
                    else
                    {
                        counter++;
                    }
                } );
                if ( counter >= that.bulletCount )
                {
                    return;
                }
                else
                {
                    for ( var i = 0; i < that.bulletCount - counter; i++ )
                    {
                        bullet[i] = airwar.Game.Props.Catridge.getBullet( that.bulletType );
                        var left = that._instance.position().left + 32 + i * 40;
                        var top = that._instance.position().top + 60;
                        bullet[i].speed = 8;
                        bullet[i].setPosition( {"left" : left, "top" : top} );
                        bullet[i].setStopPos( {top:0, bottom:viewportHeight + 10, left:0, right : viewportWidth} );
                        bullet[i].setDamage( 10 );
                        bullet._instance.css( "visibility", "hidden" );
                        that.bulletCollections.push( bullet[i] );
                    }
                }

                var angle = airwar.Util.Utility.getAngle(
                    that._instance.position().left,
                    that._instance.position().top,
                    Global.playerPlane._instance.position().left,
                    Global.playerPlane._instance.position().top
                );

                that._shotAngle = angle - (that.bulletCount - 1) / 2 * that.angleDistance;
            }
            else
            {
                //TODO after fire stopped, need to dispose all bullets and enemy itself
                timer.stopTimeInterval();
            }

        } );

        timer.setDuration( 5000 );
        timer.startTimeInterval();
    },

    fire : function()
    {
        var bullet = null;
        var that = this;
        var viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;
        var viewportWidth = 530;

        var timer = airwar.Util.TimerManager.getTimer();
        var fireGap = 0;
        timer.setMethod( function()
        {
            if ( that.HP > 0 )
            {
                fireGap++;
                 console.log( fireGap );
                if ( fireGap % 31 == 0 || fireGap % 31 == 3 || fireGap % 31 == 5 )
                {
                    console.log( fireGap + " : " + fireGap % 13 );
                    bullet = airwar.Game.Props.Catridge.getBullet( that.bulletType );
                    var left = that._instance.position().left + 32;
                    var top = that._instance.position().top + 60;
                    bullet.speed = 8;
                    bullet.setPosition( {"left" : left, "top" : top} );
                    bullet.setStopPos( {top:0, bottom:viewportHeight + 10, left:0, right : viewportWidth} );
                    bullet.setDamage( 10 );
//                bullet._instance.css( "visibility", "hidden" );
                    

                    bullet.angle = airwar.Util.Utility.getAngle(
                        that._instance.position().left,
                        that._instance.position().top,
                        Global.playerPlane._instance.position().left,
                        Global.playerPlane._instance.position().top
                    );

//                    bullet.angle = angle - (that.bulletCount - 1) / 2 * that.angleDistance;

                    that.bulletCollections.push( bullet );
                }

            }
            else
            {
                timer.stopTimeInterval();
            }
        } );

        timer.setDuration( 300 );
        timer.startTimeInterval();

    }

} );

