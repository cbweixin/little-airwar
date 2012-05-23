/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/27/12
 * Time: 1:15 PM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Menu');

airwar.Menu.KeySettingMenu = airwar.Menu.SubMenu.extend(
    {
        init : function() {
            this._super();
        },

        show : function() {
            this._super();
        },

        hide : function() {
            this._super();
        },

        render : function() {
            //TODO template could be used here
            $('#submenuContainer').html(
                '<div id="keySettingTitle" style="margin-top: 30px;margin-left: 50px;">Key Setting Configuration</div>' +
                   '<div id="keySettingMenu">'+
                        '<div class="subMenuStyle" style="position: relative; width: 200px; padding: 10px; z-index: 7000; ' +
                    '     margin: 0pt 0pt 0pt 40px;">' +
                            '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                    '         background-color: rgb(255, 255, 136);">'+
                                '<span>UP   : </span>'+
                                '<span style="color: red; font-size: 15px; padding: 0pt 10px;">&nbsp;W</span>'+
                             '</div>' +
                             '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                    '         background-color: rgb(255, 255, 136);">'+
                                '<span>Down:</span>'+
                                '<span style="color: red; font-size: 15px; padding: 0pt 10px;">S</span>'+
                             '</div>' +
                             '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                    '         background-color: rgb(255, 255, 136);">'+
                                '<span>Left: </span>'+
                                '<span style="color: red; font-size: 15px; padding: 0pt 10px;">&nbsp;A</span>'+
                             '</div>' +
                             '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                    '         background-color: rgb(255, 255, 136);">'+
                                '<span>Right: </span>'+
                                '<span style="color: red; font-size: 15px; padding: 0pt 10px;">D</span>'+
                             '</div>' +
                             '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                    '         background-color: rgb(255, 255, 136);">'+
                                '<span>Fire: </span>'+
                                '<span style="color: red; font-size: 15px; padding: 0pt 10px;">J</span>'+
                             '</div>' +
                             '<div style="width: 100%; height: 23px; text-align: center; margin: 5px 0pt; opacity: 0.8; ' +
                    '         background-color: rgb(255, 255, 136);">'+
                                '<span>Bomb: </span>'+
                                '<span style="color: red; font-size: 15px; padding: 0pt 10px;">K</span>'+
                             '</div>' +
                        '</div> ' +
                    '</div>'
            );
        }
    }
);