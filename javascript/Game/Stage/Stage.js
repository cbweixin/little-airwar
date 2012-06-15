/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/30/12
 * Time: 9:01 AM
 * To change this template use File | Settings | File Templates.
 */

var Global = {
    enemies     : [],
    activeEnemies : [],
    // array of objects which is 'moveType1' and will move in batch
    moveObjs    :{},
    playerPlane : null,
    bulltinBoard : null,
    // TODO remove this code, bad smell
    playFieldWidth : 530
};

airwar.Util.Package( 'airwar.Game.Stage' );

airwar.Game.Stage.Stage = Class.extend( {

    stageNumber : 0,

    init : function()
    {
        this.scrollBgTimer = airwar.Util.TimerManager.getTimer();
        Global.bulltinBoard = new airwar.Game.Props.BulletinBoard();
    },

    setStage : function( number )
    {
        this.stageNumber = number;
//        $('#bgImgContainer').append('<div id="stageBgPic"></div>');
        // $(document).ready( function( ){
        // hack, the optimized png file somehow doesn't work for IE
        if ( airwar.Util.Utility._isIE9 || airwar.Util.Utility._isIE8 )
        {
            //$( '#stageBgPic' ).addClass( "stage" + number + "IE" );
            //$( '#stageBgPic' ).css('visibility', 'visible');
            $( '#stageBgPic' ).css('display', 'block');
        }
        else
        {
            //$( '#stageBgPic' ).addClass( "stage" + number );
            //$( '#stageBgPic' ).css('visibility', 'visible');
            $( '#stageBgPic' ).css('display', 'block');
        }
        var viewportHeigth = airwar.Util.Utility.pageSize.viewportHeight;
        var imgHeight = $( '#stageBgPic' ).height();
        var topPos = viewportHeigth - imgHeight;
        $( '#stageBgPic' ).css( 'top', topPos );
        //} );
    },

    scrollBg : function()
    {
        var that = this;
        var timeCounter = 0;
        // if css3 supported
        if ( airwar.Util.Utility.browser.csstransform )
        {
            var offset = 1;
            var prefix = airwar.Util.Utility.browser.prefix;
            var isWebkit = prefix.toLowerCase().indexOf( "webkit" ) > -1 ? true : false;
            var isMOz = prefix.toLowerCase().indexOf( "moz" ) > -1 ? true : false;
            var that = this;
            this.scrollBgTimer.setMethod( function()
            {
                that._showEnemies( timeCounter++ );
                if ( offset < Math.abs( parseInt( $( '#stageBgPic' ).css( 'top' ) ) ) )
                {
                    if ( isWebkit )
                    {
                        $( '#stageBgPic' ).css( '-webkit-transform', 'translateY(' + (offset++) + 'px)' );

                    }
                    else if ( isMOz )
                    {
                        $( '#stageBgPic' ).css( '-moz-transform', 'translateY(' + (offset++) + 'px)' );
                    }
                    else
                    {
                        $( '#stageBgPic' ).css( 'msTransform', 'translateY(' + (offset++) + 'px)' );
                    }
                }
                else
                {
                    that.scrollBgTimer.stopTimeInterval();
                }
            } );
        }
        // if css3 not supported
        else
        {
            this.scrollBgTimer.setMethod( function()
            {
                if ( parseInt( $( '#stageBgPic' ).css( 'top' ) ) < 0 )
                {
                    $( '#stageBgPic' ).css( 'top', "+=1" );
                }
                else
                {
                    that.scrollBgTimer.stopTimeInterval();
                }
            } );
        }
        // TODO timer interval should be related to the game speed and difficulty level
        this.scrollBgTimer.setDuration( 30 );
        this.scrollBgTimer.startTimeInterval();
    }
    ,

    deployEnemies : function()
    {
        airwar.Game.Props.EnemyDeployer.deploy( this.stageNumber );
    },

    /**
     * show certain enemy at give time
     *
     * @param timeCounter
     */
    _showEnemies : function( timeCounter )
    {
        var len = Global.enemies.length
        if ( len > 0 )
        {
            for ( var i = len - 1; i >= 0; i-- )
            {
                // show enemies
                if ( Global.enemies[i].appearTime == timeCounter )
                {
                    Global.enemies[i]._instance.css( "visibility", "visible" );
                    Global.enemies[i].fly();
                    Global.enemies[i].fire();
                    Global.activeEnemies.push( Global.enemies[i] );
                    //airwar.Game.Props.Catridge.loadBulletsInBatch([Global.enemies[i]]);
                    // after the enemy showing, no need to keep it
                    Global.enemies.splice( i, 1 );

                }
            }

        }
        // if there is multiple objs need to move together
        for ( var prop in Global.moveObjs )
        {
            if ( prop && Global.moveObjs[prop] && Global.moveObjs[prop][0].appearTime == timeCounter )
            {
                var arr = Global.moveObjs[prop];
                for ( var i = 0; i < arr.length; i++ )
                {
                    arr[i]._instance.css( "visibility", "visible" );
                    Global.activeEnemies.push( arr[i] );
//                    arr[i].fire1();
                }
                airwar.Game.Props.FlyController.moveObjects( Global.moveObjs[prop] );
                airwar.Game.Props.Catridge.loadBulletsInBatch( Global.moveObjs[prop] );

                // reset moveObjs
                Global.moveObjs[prop] = null;
            }
        }
    }
} );