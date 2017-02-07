System.register(["@haztivity/core/index", "./pages/6611/page"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, page_1, sco;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (page_1_1) {
                page_1 = page_1_1;
            }
        ],
        execute: function () {
            sco = index_1.ScoFactory.createSco({
                name: "1221",
                pages: [
                    page_1.page
                ],
                components: []
            });
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
        }
    };
});
//# sourceMappingURL=index.js.map