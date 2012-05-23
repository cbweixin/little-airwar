/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/26/12
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Util');

airwar.Util.Method = ( function() {

    return {
        bind : function(method, context) {
             var argCopy = [];
            for( var i = 2; i < arguments.length; i++ )
            {
                argCopy.push( arguments[i] );
            }
            return function() {

                method.apply(context, argCopy);
            }
        }
    }
})();
