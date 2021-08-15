var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebGLRenderer } from 'three';
import { Scene } from 'three';
class JBScene extends Scene {
    constructor(name, game, root) {
        super();
        this.onResize = this._onResize.bind(this);
        this.name = name;
        this.game = game;
        this.root = root;
        this.userID = "anon";
        console.log("JBScene constructor");
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("JBScene preload");
        });
    }
    start() { this.enter(null); }
    pause() { }
    set_user_id(id) {
        this.userID = id;
        console.log("setting user ID");
        console.log(this.userID);
    }
    enter(prev, phase) {
        return __awaiter(this, void 0, void 0, function* () {
            this.renderer = new WebGLRenderer({ antialias: false });
            //renderer.outputEncoding = sRGBEncoding;
            //renderer.shadowMap.enabled = true;
            //renderer.shadowMap.type = PCFSoftShadowMap;
            this.renderer.domElement.id = "id_" + this.name;
            let parent = document.getElementById(this.root);
            parent.appendChild(this.renderer.domElement);
            this.currentPhase = phase;
        });
    }
    leave(next) {
        return __awaiter(this, void 0, void 0, function* () {
            let parent = document.getElementById("game");
            while (parent.lastChild) {
                parent.removeChild(parent.lastChild);
            }
        });
    }
    tick(dt) { }
    _onResize() {
        if (this.renderer !== null) {
            let parent = document.getElementById(this.root);
            this.renderer.setSize(parent.clientWidth, parent.clientHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);
        }
    }
}
export { JBScene };
