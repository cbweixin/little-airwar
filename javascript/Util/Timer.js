/**
 * Created by JetBrains WebStorm.
 * User: flamingo
 * Date: 1/18/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

airwar.Util.Package('airwar.Util');

/**
 * Timer factory to generate and recycle timer
 */
airwar.Util.TimerManager = {
    timers : [],

    getTimer : function() {
        var availableTimer = null;
        for (var i = 0,len = this.timers.length; i < len; i++) {
            if (!this.timers[i].isOnDuty()) {
                availableTimer = this.timers[i];
                break;
            }
        }
        if (availableTimer == null) {
            availableTimer = new airwar.Util.Timer();
            this.timers.push(availableTimer);
        }

        return availableTimer;
    }
}

airwar.Util.Timer = function() {

    this._onDuty = false;
}

airwar.Util.Timer.prototype =
{
    setMethod : function(method) {
        this.method = method;
    },

    setDuration : function(duration) {
        this.duration = duration;
    },

    startTimeInterval : function() {
        var context = this;
        this.intervalId = window.setInterval(function() {
            context.method();
        }, this.duration);
        this._onDuty = true;
    },
    stopTimeInterval : function() {
        window.clearInterval(this.intervalId);
        delete this.intervalId;
        this._onDuty = false;
    },

    startTimeout : function() {
        var context = this;
        this.timeoutId = window.setTimeout(function() {
            context.method();
        }, this.duration);
        this._onDuty = true;
    },

    stopTimeout : function() {
        window.clearTimeout(this.timeoutId);
        delete this.timeoutId;
        this._onDuty = false;
    },

    isOnDuty : function() {
        return this._onDuty;
    }
}
