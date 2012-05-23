/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 3/1/12
 * Time: 11:29 AM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package( 'airwar.Game.Props' );
airwar.Game.Props.Rewards = airwar.Game.Props.Observer.extend( {

    _instance : null,

    isAvailable   : false,

    type : null,

    attackableArea : {},

    _score : null,

    init : function( type, score )
    {
        this.type = type;
        this._score = score;
        switch ( this.type )
        {
            case 'gold' :
                var randId = Math.floor( Math.random() * 101 );
                this._goldAnimation = new airwar.Game.Props.Animation( "gold1", 9, 120, randId );
                this._goldAnimation._instance.bind( "overlapWithPlane", this._overlapWithPlane );
                this._instance = this._goldAnimation._instance;
                break;
        }
    }
    ,

    /**
     * set postion
     *
     * @param pos
     */
    setPosition : function( pos )
    {
        this._goldAnimation.setPosition( pos );
        this._goldAnimation.setDimension(40,54);
        // add 10 to the right and bottom, otherwise the overlap is not sensitive enough
        this.attackableArea = {
            left    : this._instance.position().left  ,
            right   : this._instance.position().left + this._instance.width() + 10,
            top     : this._instance.position().top,
            bottom  : this._instance.position().top + this._instance.height() + 10
        };
    }
    ,

    fly : function()
    {
        this._goldAnimation.play( true );
        this.observeEvent( "overlapWithPlane", Global.playerPlane );
    }
    ,

    _overlapWithPlane : function()
    {
        var obj = arguments[1];
        obj._instance.css( "visibility", "hidden" );
        if ( !!!obj._scoreAnimation )
        {
            var name = "score" + obj._score;
            obj._scoreAnimation = new airwar.Game.Props.Animation( name, 2, 100 );
        }

        var pos = {
            left : $( this ).position().left + $( this ).width() / 2 - 25 / 2,
            top  : $( this ).position().top + $( this ).height() / 2 - 60 / 2
        };

        // play the flying score animation
        obj._scoreAnimation.setPosition( pos );
        // play the animation 3 times, otherwise user can not notice that
        obj._scoreAnimation.play2(false,5);

        $('#planeScore').trigger("updatePlaneScore", [Global.bulltinBoard,obj._score]);

        // unbind event handler and listener
        obj._instance.unbind( "overlapWithPlane" );
        obj.stopObserveEvent("overlapWithPlane");
    }

} );

