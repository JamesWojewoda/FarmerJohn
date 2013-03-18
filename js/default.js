// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function (window) {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(function completed() {
                var canvas = document.getElementById("platformerCanvas");
                canvas.addEventListener("MSPointerDown", touchHandler, false);
                canvas.addEventListener("MSPointerUp", touchDone, false);
                var start = document.getElementById("imgMenu");
                start.addEventListener("MSPointerDown", restart, false);
            }));
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };
    function touchDone() {
        window.platformerGame.continuePressed = false;
    }
    function touchHandler(event) {
        
        platformerGame.handleKeyDown({ "keyCode": 87 });
        platformerGame.continuePressed = true
        
        //add double jump
    }
    function restart() {
        if (stage == null) {
            divGame.style.visibility = "hidden";
            //find canvas and load images, wait for last image to load
            canvas = document.getElementById("platformerCanvas");
            globalCanvasContext = canvas.getContext("2d");

            // create a new stage and point it at our canvas:
            stage = new createjs.Stage(canvas);

            // downloading all needed images ressources and preloading sounds & music 
            contentManager = new ContentManager(stage, canvas.width, canvas.height);
            contentManager.SetDownloadCompleted(startGame);
            contentManager.StartDownload();
        }
        else {
            platformerGame.ReloadCurrentLevel();
        }
    }

    app.start();
})(window);
