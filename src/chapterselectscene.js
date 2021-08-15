var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IntroScene } from './introscene';
import { SimPhase } from './scootersimscene';
class ChapterSelectScene extends IntroScene {
    constructor(game) {
        let name = "chapter_select";
        let content = `<h1>Taiwan Scooter Licence Test</h1> 
        
        <h2>Select Chapter</h2>
    
        <table>
        <tr>
        <td><button id="chapter_free_driving" class="chapter_select">Practice: Free Driving</button></td>
        </tr>
        <tr>
        <td><button id="chapter_slow_driving" class="chapter_select">Practice: Slow Driving</button></td>
        </tr>
        <tr>
        <td><button id="chapter_zebra_crossing" class="chapter_select">Practice: Zebra Crossing</button></td>
        </tr>
        <tr>
        <td><button id="chapter_zebra_hook_turn" class="chapter_select">Practice: Hook turn</button></td>
        </tr>
        <tr>
        <td><button id="chapter_line_changing" class="chapter_select">Practice: Lane Changing</button></td>
        </tr>
        <tr>
        <td><button id="chapter_hair_pin" class="chapter_select">Practice: Hairpin Bend</button></td>
        </tr>
        
        <tr>
        <td><button id="chapter_rail_crossing" class="chapter_select">Practice: Railroad crossing</button></td>
        </tr>
        
        <tr>
        \n
        </tr>

        <tr>
        <td><p>Enter username for the driving test</p>
        <input name="searchTxt" type="text" maxlength="512" id="userID" class="userID"/></td>
        </tr>
        <tr>
        <td><button id="chapter_driving_test" class="chapter_select">Take the Driving Test</button></td>
        </tr>
        </table>
    
        <button id="${name}_btn_prev" class="game_button_prev">Previous</button>
        `;
        super(name, game, content, "control_intro", "", "../assets/images/taiwan_drivers_licence_intro.png", "game");
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    enter(prev) {
        const _super = Object.create(null, {
            enter: { get: () => super.enter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.enter.call(this, prev);
            let nb;
            nb = document.getElementById("chapter_free_driving");
            nb.onclick = () => {
                console.log("chapter free driving");
                this.game.switch("sim", SimPhase.FreeDriving);
            };
            nb = document.getElementById("chapter_slow_driving");
            nb.onclick = () => {
                console.log("chapter slow driving");
                this.game.switch("sim", SimPhase.SlowDrivingIntro);
            };
            nb = document.getElementById("chapter_zebra_crossing");
            nb.onclick = () => {
                console.log("chapter zebra crossing");
                this.game.switch("sim", SimPhase.ZebraIntro);
            };
            nb = document.getElementById("chapter_zebra_hook_turn");
            nb.onclick = () => {
                console.log("chapter_zebra_hook_turn");
                this.game.switch("sim", SimPhase.HookTurnIntro);
            };
            nb = document.getElementById("chapter_zebra_hook_turn");
            nb.onclick = () => {
                console.log("chapter_zebra_hook_turn");
                this.game.switch("sim", SimPhase.HookTurnIntro);
            };
            nb = document.getElementById("chapter_rail_crossing");
            nb.onclick = () => {
                console.log("chapter_rail_crossing");
                this.game.switch("sim", SimPhase.RailCrossIntro);
            };
            nb = document.getElementById("chapter_hair_pin");
            nb.onclick = () => {
                console.log("chapter_hair_pin");
                this.game.switch("sim", SimPhase.HairPinIntro);
            };
            nb = document.getElementById("chapter_line_changing");
            nb.onclick = () => {
                console.log("chapter_line_changing");
                this.game.switch("sim", SimPhase.LineCrossIntro);
            };
            nb = document.getElementById("chapter_driving_test");
            if (nb !== null) {
                nb.onclick = () => {
                    console.log("chapter driving test");
                    var textfield;
                    textfield = document.getElementById("userID");
                    if (textfield.value) {
                        if (textfield.value != "insert username here") {
                            console.log(textfield.value);
                            this.game.switch("sim", SimPhase.DrivingTest, textfield.value);
                        }
                        else {
                            window.prompt("USERNAME", "You need to specify your username to take the real test ");
                        }
                    }
                    else {
                        textfield.value = "insert username here";
                    }
                };
            }
        });
    }
}
export { ChapterSelectScene };
