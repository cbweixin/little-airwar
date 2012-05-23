/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/27/12
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package( 'airwar.Util' );

airwar.Util.Utility = {


    _isIE9  : navigator.userAgent.toLowerCase().indexOf( 'msie 9' ) > -1,

    _isIE8  : navigator.userAgent.toLowerCase().indexOf( 'msie 8' ) > -1,

    /**
     * convert the first letter of the string to uppercase
     *
     * @param {string} str
     */
    capitalize : function( str )
    {
        return str.charAt( 0 ).toUpperCase() + str.substring( 1 );
    },

    /**
     * make the arr has no dup eles
     *
     * @param arr
     */
    uniqueArray : function( arr )
    {
        $.extend( arr, {push : function()
        {
            var noDup = true;
            var bullet = arguments[0];
            $.each( arr, function( idx, value )
            {
                if ( value.id == bullet.id )
                {
                    arr.splice( idx, 1, bullet );
                    noDup = false;
                    return false;
                }
            } );
            if ( noDup )
            {
                // webkit
                if ( arr.__proto )
                {
                    arr.__proto__.push.call( arr, bullet );
                }
                // ie
                else
                {
                    arr.constructor.prototype.push.call( arr, bullet );
                }
            }
        }
        } );
    },

    /**
     * given a string to create an instance
     *
     * @param {string} str
     */
    createInstance : function( str )
    {
        var arr = str.split( "." );

        var fn = ( window || this );
        for ( var i = 0, len = arr.length; i < len; i++ )
        {
            fn = fn[arr[i]];
        }
        if ( typeof fn !== "function" )
        {
            throw new Error( "function not found" );
        }
        return new fn();
    },

    getAngle : function( startX, startY, endX, endY )
    {
        var angle;
        var tanx;
        if ( endX - startX != 0 )
        {
            tanx = Math.abs( endY - startY ) / Math.abs( endX - startX );
        }
        else
        {
            return 90 + (endY - startY > 0 ? 180 : 0);
        }
        angle = Math.atan( tanx ) / 2 / Math.PI * 360;

        if ( endX - startX < 0 && endY - startY <= 0 )
        {
            angle = 180 - angle;
        }
        if ( endX - startX < 0 && endY - startY > 0 )
        {
            angle += 180;
        }
        if ( endX - startX >= 0 && endY - startY > 0 )
        {
            angle = 360 - angle;
        }
        return angle;
    },

    /**
     * typewrite effects to animate typing contents on screen
     *
     * @param id
     * @param content
     */
    typeWriteDisplay : function( id, content )
    {
        var brk = '~';
        var pos = 0;
        var twTimer = airwar.Util.TimerManager.getTimer();
        twTimer.setMethod( function( )
            {
                var str = content.substr( 0, pos );
                $( '#' + id ).html( str.replace( RegExp( brk, 'g' ), '<br \/>' ) );
                pos++;
                if ( pos > content.length )
                {
                    twTimer.stopTimeInterval();
                }
            }
        );
        twTimer.setDuration( 140 );
        twTimer.startTimeInterval();
    },

    /**
     * align element to the screen center, horizontally or vertically
     *
     * @param {object}element
     */
    centerElementOnScreen : function( element )
        {
            var pageDimensions = this.updateDimensions();

            var eleTop = ((this.pageDimensions.verticalOffset() + this.pageDimensions.windowHeight() / 2) -
                (this.scrollBarPadding + element.height() / 2));
            element.css( 'top', eleTop );
            var eleLeft = ((this.pageDimensions.windowWidth() / 2) - (this.scrollBarPadding + element.width() / 2));
            element.css( 'left', eleLeft );
            element.css( 'position', 'absolute' );
        }

    ,

    scrollBarPadding: 17,

    // load the page size, view port position and vertical scroll offset
    updateDimensions
        :
        function()
        {
            this.updatePageSize();
            this.updateWindowSize();
            this.updateScrollOffset();
        }

    ,

    // load page size information
    updatePageSize: function()
    {
        // document dimensions
        var viewportWidth, viewportHeight;
        if ( window.innerHeight && window.scrollMaxY )
        {
            viewportWidth = document.body.scrollWidth;
            viewportHeight = window.innerHeight + window.scrollMaxY;
        }
        else if ( document.body.scrollHeight > document.body.offsetHeight )
        {
            // all but explorer mac
            viewportWidth = document.body.scrollWidth;
            viewportHeight = document.body.scrollHeight;
        }
        else
        {
            // explorer mac...would also work in explorer 6 strict, mozilla and safari
            viewportWidth = document.body.offsetWidth;
            viewportHeight = document.body.offsetHeight;
        }
        if ( this._isIE9 )
        {
            viewportHeight = window.innerHeight;
        }
        if ( this._isIE8 )
        {
            viewportHeight = document.documentElement.clientHeight;
        }
        ;
        this.pageSize = {
            viewportWidth: viewportWidth,
            viewportHeight: viewportHeight
        };
    }
    ,

    // load window size information
    updateWindowSize: function()
    {
        // view port dimensions
        var windowWidth, windowHeight;
        if ( self.innerHeight )
        {
            // all except explorer
            windowWidth = self.innerWidth;
            windowHeight = self.innerHeight;
        } else if ( document.documentElement && document.documentElement.clientHeight )
        {
            // explorer 6 strict mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if ( document.body )
        {
            // other explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }
        ;
        this.windowSize = {
            windowWidth: windowWidth,
            windowHeight: windowHeight
        };
    }
    ,

    // load scroll offset information
    updateScrollOffset: function()
    {
        // viewport vertical scroll offset
        var horizontalOffset, verticalOffset;
        if ( self.pageYOffset )
        {
            horizontalOffset = self.pageXOffset;
            verticalOffset = self.pageYOffset;
        } else if ( document.documentElement && document.documentElement.scrollTop )
        {
            // Explorer 6 Strict
            horizontalOffset = document.documentElement.scrollLeft;
            verticalOffset = document.documentElement.scrollTop;
        } else if ( document.body )
        {
            // all other Explorers
            horizontalOffset = document.body.scrollLeft;
            verticalOffset = document.body.scrollTop;
        }
        ;
        this.scrollOffset = {
            horizontalOffset: horizontalOffset,
            verticalOffset: verticalOffset
        };
    }
    ,

    // INFORMATION CONTAINERS

    // raw data containers
    pageSize: {
    }
    ,
    windowSize: {
    }
    ,
    scrollOffset: {
    }
    ,

    // combined dimensions object with bounding logic
    pageDimensions: {
        pageWidth: function()
        {
            return airwar.Util.Utility.pageSize.viewportWidth > airwar.Util.Utility.windowSize.windowWidth ?
                airwar.Util.Utility.pageSize.viewportWidth :
                airwar.Util.Utility.windowSize.windowWidth;
        }
        ,
        pageHeight: function()
        {
            return airwar.Util.Utility.pageSize.viewportHeight > airwar.Util.Utility.windowSize.windowHeight ?
                airwar.Util.Utility.pageSize.viewportHeight :
                airwar.Util.Utility.windowSize.windowHeight;
        }
        ,
        windowWidth: function()
        {
            return airwar.Util.Utility.windowSize.windowWidth;
        }
        ,
        windowHeight: function()
        {
            return airwar.Util.Utility.windowSize.windowHeight;
        }
        ,
        horizontalOffset: function()
        {
            return airwar.Util.Utility.scrollOffset.horizontalOffset;
        }
        ,
        verticalOffset: function()
        {
            return airwar.Util.Utility.scrollOffset.verticalOffset;
        }
    }
    ,

    moveType : {
        PLANEBULLET1   : "planeBullet1",
        moveType1
            :
            "moveType1",
        moveType2
            :
            "moveType2",
        moveType3
            :
            "moveType3",
        ENEMYBULLET1
            :
            "enemyBullet1",
        ENEMYBULLET2
            :
            "enemyBullet2"
    }
};

airwar.Util.Utility.browser = (function()
{
    var testNode = document.createElement( "test" );
    var testStyle = testNode.style;
    // List of property values to set for css tests. See ticket #21
    var omPrefixes = 'Webkit Moz O ms',
        cssomPrefixes = omPrefixes.split( ' ' );
    var prefix = null;

    /**
     * testProps is a generic CSS / DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     *   A supported CSS property returns empty string when its not yet set.
     */
    function
        testProps( prop, prefixed )
    {
        var ucProp = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
            props = (prop + ' ' + cssomPrefixes.join( ucProp + ' ' ) + ucProp).split( ' ' );
        for ( var i = 0, len = props.length; i < len; i++ )
        {
            if ( testStyle[ props[i] ] !== undefined )
            {
                prefix = props[i];
                return  true;
            }
        }
        return false;
    }

    var supportCsstransform = testProps( "transform" );
    return {"csstransform" : supportCsstransform,
        "prefix"         : prefix};
})();




