/**
 * Created by JetBrains WebStorm.
 * User: xwei
 * Date: 4/30/12
 * Time: 10:51 AM
 * To change this template use File | Settings | File Templates.
 */
airwar.Util.Package( 'airwar.Game.Props' );

airwar.Game.Props.BulletinBoard = Class.extend( {

    _totalScore : null,

    init : function()
    {
        // initialize plane life count indicator
        var img1 = "<div id='planeLife1' class='playerPlaneCount'></div>";
        var img2 = "<div id='planeLife2' class='playerPlaneCount'></div>";
        var img3 = "<div id='planeLife3' class='playerPlaneCount'></div>";
        var img4 = "<div id='planeLife4' class='playerPlaneCount'></div>";

        $('#planeLifeStatus').append(img1, img2, img3,img4);
        $('#planeLifeStatus').bind("updatePlaneLifeStatus", this.updatePlaneLifeStatus);

        // initiate plane bomb status indiator
        img1 = "<div id='planeBomb1' class='playerPlaneBomb'></div>";
        img2 = "<div id='planeBomb2' class='playerPlaneBomb'></div>";
        img3 = "<div id='planeBomb3' class='playerPlaneBomb'></div>";

        $('#planeBombState').append(img1, img2, img3);
        $('#planeBombState').bind("updatePlaneBombStatus", this.updatePlaneBombStatus);

        this._totalScore = 0;
        $('#planeScore').html('<span style="color: #f5deb3;font-size: 12px;"><b>'+this._totalScore+'</b></span>');
        $('#planeScore').bind("updatePlaneScore", this.updatePlaneScore);

    },

    updatePlaneLifeStatus : function()
    {
        $('div.playerPlaneCount:last').remove();
    },

    updatePlaneScore : function(  )
    {
        arguments[1]._totalScore += arguments[2];
        $('#planeScore').html('<span style="color: #f5deb3;font-size: 14px;"><b>'+arguments[1]._totalScore+'</b></span>');
    },

    updatePlaneBombStatus : function()
    {
         $('div.playerPlaneBomb:last').remove();
    }
} );