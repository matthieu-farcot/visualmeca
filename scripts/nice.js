AFRAME.registerComponent("cycle-piston", {

    schema: {
        vitesse: {default: 0.25}   // unités par seconde
    },

    init() {

        this.piston = this.el.querySelector("#piston");
        this.mobile = this.el.querySelector("#pistonmobile");
        this.pd = this.el.querySelector("#pistond");
        this.pg = this.el.querySelector("#pistong");

        // Références
        this.y0 = this.piston.object3D.position.y;
        this.x0 = this.mobile.object3D.position.x;

        this.courseY = 0.249;
        this.courseX = 0.19;

        this.etat = 0;

    },

    tick(time, dt) {

        const dy = this.schema.vitesse * dt / 1000;
        const dx = this.schema.vitesse * dt / 1000;

        switch(this.etat){

        //--------------------------------------------------
        // 0 Descente
        //--------------------------------------------------

        case 0:

            this.piston.object3D.position.y -= dy;

            this.pd.object3D.rotation.z -= Math.PI/2 * dt/1000;

            if(this.piston.object3D.position.y <= this.y0-this.courseY){

                this.piston.object3D.position.y=this.y0-this.courseY;
                this.pd.object3D.rotation.z=-Math.PI/2;

                this.etat=1;

            }

        break;

        //--------------------------------------------------
        // 1 Déplacement droite
        //--------------------------------------------------

        case 1:

            this.mobile.object3D.position.x += dx;

            this.pg.object3D.rotation.y += Math.PI/2*dt/1000;

            if(this.mobile.object3D.position.x>=this.x0+this.courseX){

                this.mobile.object3D.position.x=this.x0+this.courseX;

                this.etat=2;

            }

        break;

        //--------------------------------------------------
        // 2 Retour gauche
        //--------------------------------------------------

        case 2:

            this.mobile.object3D.position.x -= dx;

            this.pg.object3D.rotation.y -= Math.PI/2*dt/1000;

            if(this.mobile.object3D.position.x<=this.x0){

                this.mobile.object3D.position.x=this.x0;

                this.etat=3;

            }

        break;

        //--------------------------------------------------
        // 3 Montée
        //--------------------------------------------------

        case 3:

            this.piston.object3D.position.y += dy;

            this.pd.object3D.rotation.z += Math.PI/2 * dt/1000;

            if(this.piston.object3D.position.y>=this.y0){

                this.piston.object3D.position.y=this.y0;

                this.pd.object3D.rotation.z=0;

                this.etat=0;

            }

        break;

        }

    }

});
