AFRAME.registerComponent("cycle-piston", {

    init() {

        this.piston = this.el.querySelector("#piston");
        this.mobile = this.el.querySelector("#pistonmobile");

        // Démarrage de la première animation
        this.bbDown();

    },

    //-----------------------------
    // BB DESCENTE
    //-----------------------------
    bbDown() {

        this.piston.emit("bbdown");

        this.piston.addEventListener(
            "animationcomplete__bbdown",
            () => this.ccGo(),
            { once: true }
        );

    },

    //-----------------------------
    // CC ALLER
    //-----------------------------
    ccGo() {

        this.mobile.emit("ccgo");

        this.mobile.addEventListener(
            "animationcomplete__ccgo",
            () => this.ccBack(),
            { once: true }
        );

    },

    //-----------------------------
    // CC RETOUR
    //-----------------------------
    ccBack() {

        this.mobile.emit("ccback");

        this.mobile.addEventListener(
            "animationcomplete__ccback",
            () => this.bbUp(),
            { once: true }
        );

    },

    //-----------------------------
    // BB REMONTÉE
    //-----------------------------
    bbUp() {

        this.piston.emit("bbup");

        this.piston.addEventListener(
            "animationcomplete__bbup",
            () => this.bbDown(),
            { once: true }
        );

    }

});
