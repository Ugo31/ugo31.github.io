var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AnimationMixer, } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
var JBObjectType;
(function (JBObjectType) {
    JBObjectType[JBObjectType["TaiwanBear"] = 1] = "TaiwanBear";
    JBObjectType[JBObjectType["TaiwanPolice"] = 2] = "TaiwanPolice";
})(JBObjectType || (JBObjectType = {}));
;
class JBAnimation {
    constructor(name, path, cls, timeScale) {
        this.name = name;
        this.path = path;
        this.cls = cls;
        this.timeScale = timeScale;
        this.name = name;
        this.path = path;
        this.cls = cls;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.preload();
        });
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            const gltfLoader = new GLTFLoader();
            const data = yield gltfLoader.loadAsync(this.path);
            this.data = data;
            console.log(`Roar data!!! ${typeof (data)}`);
            console.dir(data);
            this.model = data.scene.children[0];
            console.log("Roar!!!", this.model);
            this.mixer = new AnimationMixer(this.model);
        });
    }
    tick(delta, sim) {
        return this.mixer.update(delta);
    }
    translate(tx, ty, tz) {
        this.model.position.set(tx, ty, tz);
    }
    rotate(a, b, c) {
        this.model.rotation.set(a, b, c);
    }
    home() {
        console.log(`home: this.model ${this.model}`);
        return this.model;
    }
    findAnimation(name) {
        let anims = this.data["animations"];
        let ani = null;
        for (const a of anims) {
            if (a.name === name) {
                ani = a;
                break;
            }
        }
        return ani;
    }
    playAnimation(name) {
        if ((this.currentClip === undefined) || (this.currentClip === null) || (this.currentClip.name !== name)) {
            let clip = this.findAnimation(name);
            if (clip !== null) {
                if ((this.currentClip !== undefined) && (this.currentClip !== null)) {
                    if (this.currentClip.name !== name) {
                        this.stopAnimation();
                    }
                }
                this.currentClip = clip;
                this.currentAction = this.mixer.clipAction(this.currentClip);
                if (this.currentAction !== null) {
                    this.currentAction.play();
                }
            }
        }
    }
    stopAnimation() {
        if ((this.currentAction !== undefined) && (this.currentAction !== null)) {
            this.currentAction.stop();
            this.currentAction = null;
            this.currentClip = null;
        }
    }
}
export { JBAnimation, JBObjectType };
