var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JBObjectType, JBAnimation } from './jbanimation';
import { Clock } from 'three';
var States;
(function (States) {
    States[States["Roaming"] = 0] = "Roaming";
    States[States["Chase"] = 1] = "Chase";
    States[States["Attack"] = 2] = "Attack";
    States[States["AttackDone"] = 3] = "AttackDone";
    States[States["AttackCoolDown"] = 4] = "AttackCoolDown";
})(States || (States = {}));
;
class TaiwanBear extends JBAnimation {
    constructor(name) {
        super(name, "../assets/tlgf/taiwan bear.glb", JBObjectType.TaiwanBear, 2.0);
        this.state = States.Roaming;
        this.freq = 2.0;
        this.kpa = 10;
        this.kda = 0;
        this.kia = 0;
        this.kpv = 1;
        this.kdv = 0;
        this.kiv = 0;
        this.prevDiff = 0;
        this.maxVelocity = 5;
        this.updateClock = new Clock();
        this.roamX = 0;
        this.roamZ = 0;
        this.attackTime = 0;
        this.ChargeDistanceParam = 10.0;
        this.AttackDistanceParam = 2.0;
        this.AttackTimeParam = 2.5;
        this.AttackCoolDownTimeParam = 7.0;
        this.AttackSpeedParam = 2.5;
        this.WalkSpeedParam = 0.5;
        this.AniSpeedFactor = 0.3;
        this.clock = new Clock();
        this.clock.start();
    }
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.init.call(this);
            this.model.scale.x = this.model.scale.y = this.model.scale.z = 0.4;
            this.state = States.Roaming;
        });
    }
    home() {
        this.translate(-7, 0.0, -12.0);
        this.rotate(0.0, 0.0 / 360.0 * Math.PI, 0.0);
        console.log(`TaiwanBear home. data=${typeof (this.data)} animation=`);
        console.dir(this.data);
        this.velocities = [0, 0, 1];
        //this.playAnimation( "slow walking" );
        //this.playAnimation( "slow_walking" );
        //this.model.tick = (delta) => this.mixer.update(delta);
        let m = super.home();
        //m.scale.x = m.scale.y = m.scale.z = 0.5;
        return m;
    }
    normalizeAngle(theta) {
        while (theta < -180.0 / 180.0 * Math.PI) {
            theta = theta + 360.0 / 180.0 * Math.PI;
        }
        while (theta > 180.0 / 180.0 * Math.PI) {
            theta = theta - 360.0 / 180.0 * Math.PI;
        }
        return theta;
    }
    // angleDifference( a1, a2 ) {
    //     let sign = a1 > a2 ? +1 : -1;
    //     let diff;
    //     if ( sign === 1 ) {
    //         diff = a1 - a2;
    //     } else {
    //         diff = a2 - a1;
    //     }
    //     while ( diff > 180.0/360.0 * Math.PI ) {
    //         sign = - sign;
    //         diff = diff - 360.0/360.0 * Math.PI;
    //     }
    //     return sign * diff;
    // }
    angleDifference(a1, a2) {
        let a1n = a1; //this.normalizeAngle( a1 );
        let a2n = a2; //this.normalizeAngle( a2 );
        let diff = a2 - a1;
        if (diff > 180.0 / 180.0 * Math.PI) {
            diff = diff - 360.0 / 180.0 * Math.PI;
        }
        if (diff < -180.0 / 180.0 * Math.PI) {
            diff = diff + 360.0 / 180.0 * Math.PI;
        }
        return diff;
    }
    update() {
        const delta = this.updateClock.getDelta();
        let { x, y, z } = this.model.position;
        let theta = this.normalizeAngle(this.model.rotation.y);
        const [v_lin, theta_d] = this.velocities;
        let dx = Math.sin(theta) * v_lin * delta;
        let dz = Math.cos(theta) * v_lin * delta;
        this.translate(x + dx, y, z + dz);
        this.rotate(0, this.normalizeAngle(theta + theta_d * delta), 0);
    }
    chase(xt, zt, vel = 0.4) {
        let { x, y, z } = this.model.position;
        let dist = Math.hypot(z - zt, x - xt);
        let theta = this.normalizeAngle(this.model.rotation.y);
        let phi = this.normalizeAngle(Math.atan2(xt - x, zt - z));
        let diff = this.angleDifference(theta, phi);
        this.velocities[1] = diff * this.kpa + this.kda * (diff - this.prevDiff);
        this.velocities[0] = vel;
        this.prevDiff = diff;
        console.log(`dist ${dist} x ${x} z ${z} theta ${theta} xt ${xt} zt ${zt} phi ${phi} diff ${diff} theta_d ${this.velocities[1]} v_lin ${this.velocities[0]}`);
    }
    tick(delta, sim) {
        let aniSpeed = 1.0;
        let scooter = sim.scooterObj;
        if (this.state === States.Roaming) {
            this.playAnimation("slow_walking");
            if (Math.random() < 0.01) {
                this.roamX = -10 + Math.random() * 20.0;
                this.roamZ = -10 + Math.random() * 20.0;
            }
            this.chase(this.roamX, this.roamZ, this.WalkSpeedParam);
            let xt = scooter.get_position().x;
            let zt = scooter.get_position().z;
            let { x, y, z } = this.model.position;
            let dist = Math.hypot(z - zt, x - xt);
            if (dist < this.ChargeDistanceParam) {
                this.state = States.Chase;
            }
            aniSpeed = this.velocities[0] / this.AniSpeedFactor;
        }
        else if (this.state === States.Chase) {
            this.playAnimation("slow walking");
            if ((scooter !== undefined) && (scooter !== null)) {
                let xt = scooter.get_position().x;
                let zt = scooter.get_position().z;
                this.chase(xt, zt, this.AttackSpeedParam);
                let { x, y, z } = this.model.position;
                let dist = Math.hypot(z - zt, x - xt);
                if (dist >= this.ChargeDistanceParam) {
                    this.state = States.Roaming;
                }
                else if (dist < this.AttackDistanceParam) {
                    this.state = States.Attack;
                }
                aniSpeed = this.velocities[0] / this.AniSpeedFactor;
            }
        }
        else if (this.state === States.Attack) {
            this.playAnimation("standup");
            this.attackTime = this.clock.getElapsedTime();
            this.velocities = [0, 0];
            this.state = States.AttackDone;
            aniSpeed = 1.0;
        }
        else if (this.state === States.AttackDone) {
            if (this.clock.getElapsedTime() > this.attackTime + this.AttackTimeParam) {
                let xt = scooter.get_position().x;
                let zt = scooter.get_position().z;
                let { x, y, z } = this.model.position;
                let dist = Math.hypot(z - zt, x - xt);
                if (dist <= this.AttackDistanceParam) {
                    console.log("CRASH");
                    scooter.crash();
                }
                this.playAnimation("slow_walking");
                this.rotate(0, this.normalizeAngle(this.model.rotation.y + 180.0 / 180.0 * Math.PI), 0);
                this.state = States.AttackCoolDown;
                this.attackTime = this.clock.getElapsedTime();
                this.velocities[0] = this.WalkSpeedParam;
                aniSpeed = this.velocities[0] / this.AniSpeedFactor;
            }
        }
        else if (this.state === States.AttackCoolDown) {
            if (this.clock.getElapsedTime() > this.attackTime + this.AttackCoolDownTimeParam) {
                this.state = States.Roaming;
                this.attackTime = this.clock.getElapsedTime();
            }
            aniSpeed = this.velocities[0] / this.AniSpeedFactor;
        }
        this.update();
        return super.tick(delta * aniSpeed, sim);
    }
}
export { TaiwanBear };
