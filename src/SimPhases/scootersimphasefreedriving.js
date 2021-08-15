import { ScooterSimPhaseOverlay } from "../scootersimphaseoverlay";
const content = `<h1>Free Driving</h1>
`;
var ScooterSimPhaseFreeDrivingState;
(function (ScooterSimPhaseFreeDrivingState) {
    ScooterSimPhaseFreeDrivingState["FreeDriving"] = "free driving";
    ScooterSimPhaseFreeDrivingState["FreeDrivingDone"] = "free driving-done";
})(ScooterSimPhaseFreeDrivingState || (ScooterSimPhaseFreeDrivingState = {}));
class ScooterSimPhaseFreeDriving extends ScooterSimPhaseOverlay {
    constructor(game, state) {
        super("scooter_sim_phase_free_driving_intro", game, content, [-12.2, 0.94, -15, -Math.PI / 2]);
        this.state = ScooterSimPhaseFreeDrivingState[state.toLowerCase()];
    }
    switchPhase(prev, next) {
        if (next === ScooterSimPhaseFreeDrivingState.FreeDriving) {
            let sim = this.game.currentScene;
            let scooter = sim.scooterObj;
            let track = sim.test_track;
            scooter.init_position(sim.overlayPhase.spawn);
        }
    }
    tickPhase(dt) {
        let sim = this.game.currentScene;
        let scooter = sim.scooterObj;
        let track = sim.test_track;
        if (sim.prevPhase !== sim.currentPhase) {
            sim.overlayPhase.switchPhase(sim.prevPhase, sim.currentPhase);
        }
        console.log(`SlowDriving tick phase ${sim.currentPhase} dt ${dt}`);
    }
}
export { ScooterSimPhaseFreeDriving, ScooterSimPhaseFreeDrivingState };
