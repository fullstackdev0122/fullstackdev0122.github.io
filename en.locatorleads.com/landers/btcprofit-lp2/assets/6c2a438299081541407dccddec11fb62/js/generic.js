(function ($) {
    $.Kilgore = $.Kilgore || {};

    $.Kilgore.PROXY = {
        baseURI : "",

        ServiceRequest: function (action, data, callback) {
            let url = this.baseURI + action;
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: function (response) {
                    if (response && callback) {
                        callback(typeof(response) === 'object' ? response : $.parseJSON(response));
                    }
                }
            });
        },

        startImpressionLog: function (callback) {
            if (!$.Kilgore.isAuthed) {
                document.addEventListener('funnelAuthed', function(e) {
                    $.Kilgore.PROXY.startImpressionLog();
                });
                return;
            }
            let action = 'startImpression';
            let data   = {
                'url' : document.location.href,
                'referer' : document.referrer
            };

            this.ServiceRequest(action, data, callback);
        }
    };

})(jQuery);
