/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ScoFactory, Sco, ISco} from "@haztivity/core/index";
import {page as page6611} from "./pages/6611/page";
let sco: ISco = ScoFactory.createSco(
    {
        name: "1221",
        pages: [
            page6611
        ],
        components: []
    }
);
//pageChangeStart
sco.on();
//pageChangeEnd
sco.on();
//pageComplete
sco.on();
//sco end
sco.on();
//error
sco.on();
sco.run();