/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 2/4/12
 * Time: 9:54 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.Catridge = {
    bullets : {planeBullet1 : [], enemyBullet1 : [], enemyBullet2:[]},

    bulletId : 0,

    getBullet : function( type )
    {
        var bullet = null;
        for ( var i = 0, len = this.bullets[type].length; i < len; i++ )
        {
            if ( this.bullets[type][i].isIdle )
            {
                bullet = this.bullets[type][i];
                if ( bullet._instance.css( "visibility" ) == "hidden" )
                {
                    bullet._instance.css( "visibility", "visible" );
                }
                bullet.isIdle = false;
                break;
            }
        }

        if ( !!!bullet )
        {
            bullet = new airwar.Game.Props.Bullet( type );
            this.bullets[type].push( bullet );
        }
        return bullet;
    },

    /**
     * load bullets for multiple objects in batch
     * to improve performance
     *
     * @param objs
     */
    loadBulletsInBatch : function( objs )
    {
        var timer = airwar.Util.TimerManager.getTimer();
        var that = this;
        var viewportHeight = airwar.Util.Utility.pageSize.viewportHeight;

        timer.setMethod( function()
        {
            if ( objs.length <= 0 )
            {
                timer.stopTimeInterval();
            }
            else
            {
                for ( var i = 0, len = objs.length; i < len; i++ )
                {
                    var obj = objs[i];
                    if ( obj )
                    {
                        if ( obj.HP > 0 )
                        {
                            var counter = 0;
                            $.each( obj.bulletCollections, function( idx, value )
                            {
                                if ( value && value.isIdle )
                                {
                                    obj.bulletCollections.splice( idx, 1 );
                                }
                                else
                                {
                                    counter++;
                                }
                            } );
                            if ( counter >= 2 )
                            {
                                return;
                            }
                            else
                            {
                                var bullet = that.getBullet( obj.bulletType );
                                var left = obj._instance.position().left + 32;
                                var top = obj._instance.position().top + 60;
                                bullet.setPosition( {"left" : left, "top" : top} );
                                bullet.setStopPos( {top:viewportHeight + 10} );
                                bullet.setDamage( 10 );
                                obj.bulletCollections.push( bullet );
                            }
                        }
                    else
                        {
                            $.each(obj.bulletCollections, function( idx, value ){
                                value.isIdle = true;
                                value._instance.css("visibility", "hidden");
                            });
                        }

                    }
                }
            }
        } );

        timer.setDuration( 5000 );
        timer.startTimeInterval();
    }
};

airwar.Game.Props.Bullet = Class.extend( {

    _instance : null,

    stopPos : null,

    attackableAreaOffset : {},

    attackableArea : {},

    damage : 0,

    speed : 0,

    angle : null,

    init : function( type )
    {
        this.type = type;
        this.isIdle = false;
        this.shooter = null;
        this.angle = -1;
        this.id = airwar.Game.Props.Catridge.bulletId++;
        var bulletType = airwar.Util.Utility.moveType;
        switch ( type )
        {
            case bulletType.PLANEBULLET1 :
                // clone node to improve performance
                var bulletId = this.id;
                $( '#planeBullet1_0' ).clone().attr( "id", "planeBullet1_" + bulletId ).appendTo( '#bgImgContainer' );

                // use css sprite, reduce a lot of requests.
                this.attackableAreaOffset = {
                    top     : 1,
                    bottom  : 1,
                    left    : 1,
                    right   : 1
                }
                break;
            case bulletType.ENEMYBULLET1 :
                var bulletId = this.id;
//                $('#bgImgContainer').append('<div id=enemyBullet1_' + this.id + '></div>');
                $( '#enemyBullet1_0' ).clone().attr( "id", "enemyBullet1_" + bulletId ).appendTo( '#bgImgContainer' );
//                $('#enemy13_0').clone().attr(id,).appendTo();
//                $('#enemyBullet1_' + this.id).addClass("airwar-boss").addClass("airwar-enemyBullet1");
                // use css sprite, reduce a lot of requests.
                this.attackableAreaOffset = {
                    top     : -3,
                    bottom  : -3,
                    left    : -3,
                    right   : -3
                }
                break;

            case bulletType.ENEMYBULLET2 :
                var bulletId = this.id;
//                $('#bgImgContainer').append('<div id=enemyBullet1_' + this.id + '></div>');
                $( '#enemyBullet2_0' ).clone().attr( "id", "enemyBullet2_" + bulletId ).appendTo( '#bgImgContainer' );
//                $('#enemy13_0').clone().attr(id,).appendTo();
//                $('#enemyBullet1_' + this.id).addClass("airwar-boss").addClass("airwar-enemyBullet1");
                // use css sprite, reduce a lot of requests.
                this.attackableAreaOffset = {
                    top     : -5,
                    bottom  : -5,
                    left    : -5,
                    right   : -5
                }
                break;

        }

        this._instance = $( '#' + this.type + '_' + this.id );
    },

    // caculate the attackable area, when plane bullets comes into this area could cause damage to the enemy
    updateAttackableArea : function()
    {
        this.attackableArea = {
            left    : this._instance.position().left + this.attackableAreaOffset.left,
            right   : this._instance.position().left + this._instance.width() - this.attackableAreaOffset.right,
            top     : this._instance.position().top + this.attackableAreaOffset.top,
            bottom  : this._instance.position().top + this._instance.height() - this.attackableAreaOffset.bottom
        };
    },

    /**
     * set damage for the bullet
     *
     * @param damage
     */
    setDamage : function( damage )
    {
        this.damage = damage;
    },

    getDamage : function()
    {
        return this.damage;
    },

    setPosition : function( pos )
    {
//        $( '#planeBullet1_' + this.id ).css( "left", pos.left ).css( "top", pos.top ).css( "position", "absolute" );
        $( '#' + this.type + '_' + this.id ).css( "left", pos.left ).css( "top", pos.top ).css( "position", "absolute" )
            .css( "visibility", "visible" );
    },

    setStopPos : function( pos )
    {
        this.stopPos = pos;
    },


    fly : function()
    {
        airwar.Game.Props.FlyController.moveObject( this );

    }

} );
