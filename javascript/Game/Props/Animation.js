/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 2/23/12
 * Time: 11:12 AM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.Animation = Class.extend( {


    _animName       : null,
    _frameCount     : 0,
    _interval       : 0,
    _instance       : null,
    loop            : false,
    _width          : 0,
    _height         : 0,

    /**
     * initialize animation
     *
     * @param animName
     * @param frameCount
     * @param interval
     * @param id
     */
    init : function( animName, frameCount, interval, id )
    {
        this._animName = animName;
        this._frameCount = frameCount;
        this._interval = interval;


        // avoid repeatly append div
        var suffix = id != null ? id : "";
        if ( document.getElementById( "animation_" + this._animName + suffix ) == null )
        {
            $( '#bgImgContainer' ).append( '<div id=animation_' + this._animName + suffix + '></div>' );
        }
        this._instance = $( '#animation_' + this._animName + suffix );
    },



    /**
     *set pic's dimension info of css sprite
     *
     * @param width
     * @param height
     */
    setDimension : function( width, height )
    {
        this._height = height;
        this._width = width;
    },

    /**
     * set animations's position
     *
     * @param {object} pos
     */
    setPosition : function( pos )
    {
        this._instance.css( "left", pos.left ).css( "top", pos.top ).css( "position", "absolute" );
    },

    play : function( loop, cb )
    {
        var timer = airwar.Util.TimerManager.getTimer();
        var cssName = "airwar-" + this._animName;
        var that = this;
        var counter = 0;
        var gap = 0;

        timer.setMethod( function()
        {
            that._instance.addClass( cssName );
            if ( counter < that._frameCount - 1 )
            {
                that._instance.css( 'background-position', '0px' + ' -' + gap + 'px' ).css( 'width',
                    that._width ).css( 'height', that._height );
                // css-spirites always give 10 pixel padding
                gap += that._height + 10;
                counter++;
            }
            // if go to the last frame, stop the animation
            else
            {
                that._instance.css( 'background-position', '0px' + ' -' + gap + 'px' );
                if ( loop )
                {
                    counter = 0;
                    gap = 0;
                }
                else
                {
                    timer.stopTimeInterval();
                    that._instance.removeClass( cssName );

                }
            }
        } );

        timer.setDuration( this._interval );
        timer.startTimeInterval();

    },

    /**
     *
     *
     * @param loop Animation would loop forever or not
     * @param times Animation repeat times
     */
    play2 : function( loop, times )
    {
        var timer = airwar.Util.TimerManager.getTimer();
        var cssName = "airwar-" + this._animName + "_";
        var that = this;
        var counter = 0;
        var repeatTime = 0;
        // user the counter to control the flash time of animation
        var flashCounter = 0;

        timer.setMethod( function()
        {
            // if the animation repeatly played, the last frame may left and
            // need to be removed, I waste some time on this issue.
            flashCounter++;
            that._instance.removeClass( cssName + (that._frameCount - 1) );
            that._instance.addClass( "airwar-animation" );
            if ( counter == 0 )
            {
                that._instance.addClass( cssName + counter );
                // make the first image ( with highlighted score ) to flash 7/11 total time
                // then other animation would only last 4/11 total time, so user can see clearly
                // what the score he got
                if( flashCounter % 11 > 7 )
                {
                    counter++;
                }
            }
            // if go to the last frame, stop the animation
            else if ( counter == that._frameCount - 1 )
            {
                that._instance.removeClass( "airwar-animation" );
                that._instance.removeClass( cssName + (counter - 1) );
                that._instance.addClass( cssName + counter );
                flashCounter = 0;
                repeatTime++;
                if ( loop )
                {
                    counter = 0;
                }
                else if ( times > 0 )
                {
                    if ( repeatTime <= times )
                    {
                        counter = 0;
                    }
                    else
                    {
                        timer.stopTimeInterval();
                    }
                }
                else
                {
                    timer.stopTimeInterval();
                }
            }
            else
            {
                that._instance.removeClass( cssName + (counter - 1) );
                that._instance.addClass( cssName + counter++ );
            }
        } );

        timer.setDuration( this._interval );
        timer.startTimeInterval();

    },

    stop : function()
    {
    }

} );

