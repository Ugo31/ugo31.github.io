import { IntroScene } from './introscene';
class ScooterSimPhaseOverlay extends IntroScene {
    constructor(name, game, content, spawn) {
        super("scooter_sim_phase_overlay", game, "", "", "", "../assets/images/taiwan traffic board.png", "id_sim_overlay");
        this.content = content;
        this.spawn = spawn;
    }
    start() {
        this.updateDOM();
        this.show(true);
        // setTimeout( () => {
        //     this.currentPhase = SimPhase.SlowDriving;
        // }, 5000 );
        // if ( ( prev === SimPhase.SlowDrivingIntro ) && ( next === SimPhase.SlowDriving ) ) {
        //     this.overlayPhase.show( false );
        // }
        return false;
    }
    stop() {
        this.show(false);
    }
    updateDOM() {
        this.labels.innerHTML = this.content;
    }
    switchPhase(prev, next) { }
    tickPhase(dt) { }
    show(show) {
        if (show) {
            this.wrapper.hidden = false;
        }
        else {
            this.wrapper.hidden = true;
        }
    }
    hide() {
        this.wrapper.hidden = true;
    }
}
export { ScooterSimPhaseOverlay };
