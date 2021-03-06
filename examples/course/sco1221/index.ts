/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ScoFactory, Sco, ISco} from "@haztivity/core";
import {page as page6611} from "./pages/6611/page";
import template from "./sco.pug";
import {HzNavbarComponent} from "@haztivity/hz-navbar";
import "./main.scss";
import "./markdown.scss";
import "./prism-github.scss";
import "jquery-ui-dist/jquery-ui.css";
let sco: ISco = ScoFactory.createSco(
    {
        name: "1221",
        template:template,
        pages: [
            page6611
        ],
        components: [
            HzNavbarComponent
        ]
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
