/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 2/19/12
 * Time: 8:26 PM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.Observer = Class.extend( {

    init : function()
    {

    },


    /**
     * observer certain event to see if it happens or not, there would be a timer keep on
     * scanning the conditions of certain event, if conditions meet, then trigger the event
     *
     * @param eventName
     * @param vehicle  the object which has been attaced
     * @param objs  the objects which attac the vehicle
     */
    observeEvent : function( eventName, objs )
    {
        switch ( eventName )
        {
            case "beAttack" :
                this._onBeAttack( objs );
                break;
            case "overlapWithPlane" :
                this._onOverlapWithPlane( objs );
                break;
        }
    },

    stopObserveEvent : function( eventName )
    {
        this["_" + eventName + "Interval"].stopTimeInterval();
    },

    /**
     * detect if the collision with playerPlane
     *
     * @param playerPlane
     */
    _onOverlapWithPlane : function( playerPlane )
    {
        this._overlapWithPlaneInterval = airwar.Util.TimerManager.getTimer();
        var that = this;
        this._overlapWithPlaneInterval.setMethod( function()
        {
            if ( that && playerPlane )
            {
                if ( playerPlane.HP > 0 && that._instance
                    && that.attackableArea.right >= playerPlane.attackableArea.left
                    && that.attackableArea.left <= playerPlane.attackableArea.right
                    && that.attackableArea.bottom >= playerPlane.attackableArea.top
                    && that.attackableArea.top <= playerPlane.attackableArea.bottom )
                {
                    that._instance.trigger( "overlapWithPlane", [that, playerPlane] );
                }

            }
        } );

        this._overlapWithPlaneInterval.setDuration( 30 );
        this._overlapWithPlaneInterval.startTimeInterval();
    },


    /**
     * check the vehicle has been attacked by bullets or not
     *
     * @param bullets
     */
    _onBeAttack : function( bullets )
    {
        this._beAttackInterval = airwar.Util.TimerManager.getTimer();
        var that = this;
        this._beAttackInterval.setMethod( function()
            {
                if ( that && bullets )
                {
                    for ( var i = 0, len = bullets.length; i < len; i++ )
                    {   
                        if ( !bullets[i].isIdle && that._instance && that.canBeAttack
                            && that.attackableArea.right >= bullets[i].attackableArea.left
                            && that.attackableArea.left <= bullets[i].attackableArea.right
                            && that.attackableArea.bottom >= bullets[i].attackableArea.top
                            && that.attackableArea.top <= bullets[i].attackableArea.bottom )
                        {
                            that._instance.trigger( "beAttack", [that, bullets[i]] );
                            // if bullets hit the target, hide the bullet and mark it as idle to be prepared for
                            // re-use
                            bullets[i]._instance.css( "visibility", "hidden" );
                            bullets[i].isIdle = true;
                            break;
                        }
                    }
                }
            }
        )
            ;
        this._beAttackInterval.setDuration( 30 );
        this._beAttackInterval.startTimeInterval();
    }
} );