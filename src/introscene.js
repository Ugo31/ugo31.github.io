var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebGLRenderer, OrthographicCamera, PlaneGeometry, Mesh, MeshBasicMaterial, TextureLoader } from 'three';
import { JBScene } from './jbscene';
class IntroScene extends JBScene {
    // "../assets/images/taiwan_drivers_licence_intro.png"
    constructor(name, game, content, prev, next, bg, root) {
        super(name, game, root);
        this.loader = null;
        this.loaded = false;
        this.content = content;
        this.prev = prev;
        this.next = next;
        this.textureName = bg;
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.textureName !== "") {
                if (this.loader === null) {
                    this.loader = new TextureLoader();
                }
                this.texture = this.loader.load(this.textureName);
            }
        });
    }
    createDOM() {
        let parent = document.getElementById(this.root);
        if (parent !== null) {
            this.wrapper = parent;
            this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
            //renderer.outputEncoding = sRGBEncoding;
            //renderer.shadowMap.enabled = true;
            //renderer.shadowMap.type = PCFSoftShadowMap;
            this.renderer.domElement.id = "id_" + this.name;
            parent.appendChild(this.renderer.domElement);
            let l = document.createElement("div");
            l.className = "intro_scene";
            l.id = "id_" + this.name + "_labels";
            l.style.position = "absolute";
            l.innerHTML = this.content;
            parent.appendChild(l);
            //console.log(`inner ${l.innerHTML}`);
            this.labels = l;
            if (this.next !== "") {
                let nb = document.getElementById(this.name + "_btn_next");
                nb.onclick = () => {
                    //console.log("intro scene next button pressed");
                    this.game.switch(this.next);
                };
            }
            if (this.prev !== "") {
                let pb = document.getElementById(this.name + "_btn_prev");
                pb.onclick = () => {
                    //console.log("intro scene prev button pressed");
                    this.game.switch(this.prev);
                };
            }
        }
    }
    enter(prev) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loaded = false;
            yield this.preload();
            this.createDOM();
            // camera
            let vWidth = 300;
            let vHeight = 300;
            this.camera = new OrthographicCamera(vWidth / -2, vWidth / 2, vHeight / -2, vHeight / 2, 1, 2);
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera.position.z = -1;
            this.camera.rotation.x = 180.0 * (Math.PI / 180);
            this.add(this.camera);
            this.material = new MeshBasicMaterial({ map: this.texture });
            this.plane = new Mesh(new PlaneGeometry(vWidth, vHeight), this.material);
            this.add(this.plane);
            this._onResize();
            window.addEventListener('resize', this.onResize);
            this.loaded = true;
        });
    }
    tick(dt) {
        if ((this.camera !== null) && (this.camera !== undefined)) {
            //console.log(`intro scene tick ${this.camera}`);
            this.renderer.render(this, this.camera);
        }
    }
}
export { IntroScene };
