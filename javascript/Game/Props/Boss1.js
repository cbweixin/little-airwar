/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 4/9/12
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.Boss1 = airwar.Game.Props.Enemy.extend( {

    currPos             : null,
    fromPos             : null,
    currMoveTo          : null,
    holdOnTime          : null,
    bulletCount         : null,
    bulletCount1         : null,
    angleDistance       : null,
    baseAngle           : null,
    bulletCollections1  : null,
    bulletCollections2  : null,
    bulletCollections3  : null,
    bulletCollections4  : null,
    fireCounter         : null,



    init : function( instance )
    {
        this._super( instance );
        this.currPos = "top";
        this.fromPos = "top";
        this.currMoveTo = "bottom";
        this.holdOnTime = 30;
        this.bulletCount = 20;
        this.bulletCount1 = 3;
        this.angleDistance = 18;
        this.baseAngle = 270;

        this.bulletCollections1 = [];
        this.bulletCollections2 = [];
        this.bulletCollections3 = [];
        this.bulletCollections4 = [];
        this.fireCounter = 1;

        this.HP = 2000;
    },

    fire : function()
    {

        var timer1 = airwar.Util.TimerManager.getTimer();
        var that = this;
        var viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;
        var viewportWidth = 530;

        var bullet = [];
        timer1.setMethod( function()
        {

            if ( that.HP > 0 )
            {
//              airwar.Game.Props.FlyController.moveBulletByAngle(bullet, 110, timer);
                var counter = 0;
                $.each( that.bulletCollections1, function( idx, value )
                {
                    if ( value && value.isIdle )
                    {
                        that.bulletCollections1.splice( idx, 1 );
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
                        bullet[0] = airwar.Game.Props.Catridge.getBullet( that.bulletType );
                        var left = that._instance.position().left + 50;
                        var top = that._instance.position().top + 80;
                        bullet[0].speed = 20;
                        bullet[0].setPosition( {"left" : left, "top" : top} );
                        bullet[0].setStopPos( {top:0, bottom:viewportHeight + 10, left:0, right : viewportWidth} );
                        bullet[0].setDamage( 10 );
                        bullet[0]._instance.css("visibility", "hidden");

                        bullet[1] = airwar.Game.Props.Catridge.getBullet( that.bulletType );
                        var left = that._instance.position().left + that._instance.width() - 55;
                        var top = that._instance.position().top + 80;
                        bullet[1].speed = 20;
                        bullet[1].setPosition( {"left" : left, "top" : top} );
                        bullet[1].setStopPos( {top:0, bottom:viewportHeight + 10, left:0, right : viewportWidth} );
                        bullet[1].setDamage( 10 );
                        bullet[1]._instance.css("visibility", "hidden");

                        that.bulletCollections1.push( bullet[0] );
                        that.bulletCollections1.push( bullet[1] );
                    }
                }


                that._shotAngle = that.baseAngle - (that.bulletCount - 1) / 2 * that.angleDistance;
                for( var i = 0; i < that.bulletCollections1.length; i++ )
                {
                   that.bulletCollections1[i].angle = that._shotAngle + i * that.angleDistance;
                }
            }
            else
            {
                //TODO after fire stopped, need to dispose all bullets and enemy itself
                timer1.stopTimeInterval();
            }

        } );

        timer1.setDuration( 6000 );
        timer1.startTimeInterval();

        var timer2 = airwar.Util.TimerManager.getTimer();
        timer2.setMethod( function()
        {

            if ( that.HP > 0 )
            {
//              airwar.Game.Props.FlyController.moveBulletByAngle(bullet, 110, timer);
                var counter = 0;
                $.each( that.bulletCollections2, function( idx, value )
                {
                    if ( value && value.isIdle )
                    {
                        that.bulletCollections2.splice( idx, 1 );
                    }
                    else
                    {
                        counter++;
                    }
                } );
                if ( counter >= that.bulletCount1 )
                {
                    return;
                }
                else
                {
                    for ( var i = 0; i < that.bulletCount1 - counter; i++ )
                    {
                        bullet[0] = airwar.Game.Props.Catridge.getBullet( "enemyBullet2" );
                        var left = that._instance.position().left + that._instance.width() / 2;
                        var top = that._instance.position().top + 150;
                        bullet[0].speed = 40;
                        bullet[0].setPosition( {"left" : left, "top" : top} );
                        bullet[0].setStopPos( {top:0, bottom:viewportHeight + 10, left:0, right : viewportWidth} );
                        bullet[0].setDamage( 10 );
                        bullet[0]._instance.css("visibility", "hidden");
                        that.bulletCollections2.push( bullet[0] );

                    }
                }
                that._shotAngle = that.baseAngle - (that.bulletCount1 - 1) / 2 * that.angleDistance;
            }
            else
            {
                //TODO after fire stopped, need to dispose all bullets and enemy itself
                timer2.stopTimeInterval();
            }

        } );

        timer2.setDuration( 6000 );
        timer2.startTimeInterval();

        var timer3 = airwar.Util.TimerManager.getTimer();
        timer3.setMethod( function()
        {
            if ( that.fireCounter == 1 && that.bulletCollections2.length > 0 )
            {
                for ( var i = 0,len = that.bulletCollections2.length; i < len; i++ )
                {
                    var bullet = that.bulletCollections2[i];
                    if ( bullet && !bullet.isIdle )
                    {
                        if ( bullet._instance.position().left > bullet.stopPos.left
                            && bullet._instance.position().left < bullet.stopPos.right
                            && bullet._instance.position().top > bullet.stopPos.top
                            && bullet._instance.position().top < bullet.stopPos.bottom )
                        {
                            bullet._instance.css("visibility", "visible");
                            airwar.Game.Props.FlyController.moveBulletByAngle( that, bullet,
                                that._shotAngle + (i % that.bulletCount1) * that.angleDistance
                            );
                            bullet.updateAttackableArea();
                        }
                        else
                        {
                            bullet.isIdle = true;
                            bullet._instance.css( "visibility", "hidden" );
                            that.bulletCollections2.splice( i, 1 );
                            if( that.bulletCollections2==0)
                            {
                                that.fireCounter = 2;
                            }
                        }
                    }

                }

            }
        } );

        timer3.setDuration( 150 );
        timer3.startTimeInterval();
    }
} )
    ;