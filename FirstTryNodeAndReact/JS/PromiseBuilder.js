var runningPromises = [];


module.exports = {

    MakeQueryablePromise : function (promise) {

        if (promise.isResolved) return promise;

        // Set initial state
        var isPending = true;
        var isRejected = false;
        var isFulfilled = false;

        // Observe the promise, saving the fulfillment in a closure scope.
        var result = promise.then(
            function (v) {
                isFulfilled = true;
                isPending = false;
                return v;
            },
            function (e) {
                isRejected = true;
                isPending = false;
                throw e;
            }
        );
        result.promise = promise;
        result.isFulfilled = function () { return isFulfilled; };
        result.isPending = function () { return isPending; };
        result.isRejected = function () { return isRejected; };
        runningPromises.push(result);
        return result;
    },
    RunPromises: function (inputFunction) {
        var promises = [];
        $.each(runningPromises, function (index, item) {
            if (item.isPending()) {
                promises.push(item.promise);
            }
        });
        Promise.all(promises).then(function () { inputFunction();  runningPromises = [] });
    },
    CheckAndExtend : function () {
        var length = runningPromises.filter(c => c.isPending() == true).length;

        while (length > 0) {
            setTimeout(function () {
                length = runningPromises.filter(c => c.isPending() == true).length;
            }, 5000);
        }
    }
}

