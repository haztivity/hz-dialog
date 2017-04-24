"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var index_1 = require("@haztivity/core/index");
var page_pug_1 = require("./page.pug");
var HzDialog_1 = require("../../../resources/hz-dialog/HzDialog");
exports.page = index_1.PageFactory.createPage({
    name: "6611",
    resources: [
        HzDialog_1.HzDialogResource
    ],
    template: page_pug_1.default,
    autoSequence: false
});
exports.page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
    console.log(pageController.options.name + " rendering");
});
exports.page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
    console.log(pageController.options.name + " rendered");
    $page.find('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
});
exports.page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
    console.log(pageController.options.name + " show start");
});
exports.page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
    console.log(pageController.options.name + " show end");
});
exports.page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
    console.log(pageController.options.name + " complete change");
});
exports.page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
    console.log(pageController.options.name + " destroy");
});
//# sourceMappingURL=page.js.map