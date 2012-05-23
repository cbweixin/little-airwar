/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/26/12
 * Time: 9:18 PM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Menu');

airwar.Menu.SubMenu = Class.extend({
        init : function() {
            this._showWithAnim_c = airwar.Util.Method.bind(this._showWithAnim, this);
            this._hideWithAnim_c = airwar.Util.Method.bind(this._hideWithAnim, this);
            this.timer = airwar.Util.TimerManager.getTimer();
        },

        /**
         * show submenu div with animation
         * @private
         */
        _showWithAnim : function() {
            if ($('#submenuContainer').width() < 300) {
                $('#submenuContainer').css("visibility", "visible");
                $('#submenuContainer').css('width', "+=10");
                $('#submenuContainer').css('height', "+=10");
                $('#submenuContainer').css('left', "-=5");
                $('#submenuContainer').css('top', "-=5");
            }
            else {

                this.timer.stopTimeInterval();
            }
        },

        _hideWithAnim : function() {
            if ($('#submenuContainer').width() > 0) {
                $('#submenuContainer').css('width', "-=10");
                $('#submenuContainer').css('height', "-=10");
                $('#submenuContainer').css('left', "+=5");
                $('#submenuContainer').css('top', "+=5");
            }
            else {
                $('#submenuContainer').css("visibility", "hidden");
                this.timer.stopTimeInterval();
            }
        },

        show : function() {
            this.timer.setMethod(this._showWithAnim_c);
            this.timer.setDuration(10);
            this.timer.startTimeInterval();
        },
        hide : function() {
            this.timer.setMethod(this._hideWithAnim_c);
            this.timer.setDuration(10);
            this.timer.startTimeInterval();
            // remove all html inside
            $('#submenuContainer').empty();

        },

        /**
         * abstract method, subclass need to implement it
         */
        render : function() {

        }
    }
);
