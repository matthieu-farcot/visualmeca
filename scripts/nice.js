AFRAME.registerComponent("cycle-piston", {

    init() {

        this.piston = this.el.querySelector("#piston");
        this.mobile = this.el.querySelector("#pistonmobile");
        this.pd = this.el.querySelector("#pistond");
        this.pg = this.el.querySelector("#pistong");

        // Positions d'origine
        this.pistonPos = this.piston.object3D.position.clone();
        this.mobilePos = this.mobile.object3D.position.clone();

        // Rotations d'origine (en degrés)
        this.pdRot = this.pd.getAttribute("rotation");
        this.pgRot = this.pg.getAttribute("rotation");

        this.bbAller();
    },

    //-----------------------------
    // BB ALLER
    //-----------------------------
    bbAller() {

        this.piston.setAttribute("animation__move", {
            property: "position",
            to: `${this.pistonPos.x} ${this.pistonPos.y-0.249} ${this.pistonPos.z}`,
            dur: 1000,
            easing: "linear"
        });

        this.pd.setAttribute("animation__rot", {
            property: "rotation",
            to: `${this.pdRot.x} ${this.pdRot.y} ${this.pdRot.z-90}`,
            dur: 1000,
            easing: "linear"
        });


        this.piston.addEventListener("animationcomplete__move",
            () => this.bbRetour(),
            {once:true});
    },

    //-----------------------------
    // BB RETOUR
    //-----------------------------
    bbRetour() {

        this.piston.setAttribute("animation__move", {
            property: "position",
            to: `${this.pistonPos.x} ${this.pistonPos.y} ${this.pistonPos.z}`,
            dur: 1000,
            easing: "linear"
        });

        this.pd.setAttribute("animation__rot", {
            property: "rotation",
            to: `${this.pdRot.x} ${this.pdRot.y} ${this.pdRot.z}`,
            dur: 1000,
            easing: "linear"
        });


        this.piston.addEventListener("animationcomplete__move",
            () => this.ccAller(),
            {once:true});
    },

    //-----------------------------
    // CC ALLER
    //-----------------------------
    ccAller() {

        this.mobile.setAttribute("animation__move", {
            property: "position",
            to: `${this.mobilePos.x+0.19} ${this.mobilePos.y} ${this.mobilePos.z}`,
            dur: 1000,
            easing: "linear"
        });

        this.pg.setAttribute("animation__rot", {
            property: "rotation",
            to: `${this.pgRot.x} 180 90`,
            dur: 1000,
            easing: "linear"
        });

        this.mobile.addEventListener("animationcomplete__move",
            () => this.ccRetour(),
            {once:true});
    },

    //-----------------------------
    // CC RETOUR
    //-----------------------------
    ccRetour() {

        this.mobile.setAttribute("animation__move", {
            property: "position",
            to: `${this.mobilePos.x} ${this.mobilePos.y} ${this.mobilePos.z}`,
            dur: 1000,
            easing: "linear"
        });

        this.pg.setAttribute("animation__rot", {
            property: "rotation",
            to: `${this.pgRot.x} ${this.pgRot.y} ${this.pgRot.z}`,
            dur: 1000,
            easing: "linear"
        });

        this.mobile.addEventListener("animationcomplete__move",
            () => this.bbAller(),
            {once:true});
    }

});
