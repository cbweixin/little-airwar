/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/28/12
 * Time: 10:08 PM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Menu');

airwar.Menu.StartGameMenu = airwar.Menu.SubMenu.extend({
        init : function() {
            this._super();
            this._render_c = airwar.Util.Method.bind(this.render, this);
//            $( '#bgImgContainer' ).bind( 'gamestart', this._render_c );
        },

        show : function() {
//            $('#bgImgContainer').mask("Loading...");
//
//            var that = this;
//            window.setTimeout(function() {
//                that.hide();
//            }, 2000);
            this.hide();

        },

        hide : function() {
//            $('#bgImgContainer').unmask();
            $('#bgImage').hide();
//            $('#bgImgContainer').trigger( 'gamestart' );

        },

        render : function() {

            // do nothing
            if (!this.stage) {
                this.stage = new airwar.Game.Stage.Stage();
            }
            this.stage.setStage(1);
            this.stage.scrollBg();

            if (!!!Global.playerPlane) {
                Global.playerPlane = new airwar.Game.Props.PlayerPlane();
            }

            this.stage.deployEnemies();
        }

    }
);