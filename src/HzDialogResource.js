"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var index_1 = require("@haztivity/core/index");
require("jquery-ui-dist/jquery-ui.js");
var HzDialogResource = HzDialogResource_1 = (function (_super) {
    __extends(HzDialogResource, _super);
    function HzDialogResource(_$, _EventEmitterFactory, _DataOptions) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._DataOptions = _DataOptions;
        return _this;
    }
    HzDialogResource.prototype.init = function (options, config) {
        this._config = config;
        this._$element.uniqueId();
        this._id = this._$element.attr("id");
        this._namespace = HzDialogResource_1.NAMESPACE + this._id;
        this._options = options;
        this._options.on = this._options.on || "click";
        this._findTriggers();
        this._options = this._$.extend(true, HzDialogResource_1._DEFAULT_DIALOG_OPTIONS, options);
        this._options.dialogClass = this._options.dialogClass ? this._options.dialogClass + " " + HzDialogResource_1.CLASS_DIALOG : HzDialogResource_1.CLASS_DIALOG;
        this._$element.dialog(this._options);
        this._dialog = this._$element.data("uiDialog");
        this._assignEvents();
    };
    HzDialogResource.prototype._assignEvents = function () {
        this._eventEmitter.globalEmitter.on(index_1.Navigator.ON_CHANGE_PAGE_START + "." + this._namespace, { instance: this }, this._onChangePageStart);
        this._$element.off("." + HzDialogResource_1.NAMESPACE);
        this._$element.on("dialogopen", { instance: this }, this._onDialogOpen);
        this._eventEmitter.on(index_1.ResourceSequence.ON_RESOURCE_STATE_CHANGE, { instance: this }, this._onSequenceStateChange);
    };
    HzDialogResource.prototype._onSequenceStateChange = function (e, resource, state) {
        resource._triggers.removeClass(index_1.ResourceSequence.CLASS_RUNNING + " " + index_1.ResourceSequence.CLASS_COMPLETED + " " + index_1.ResourceSequence.CLASS_WAITING);
        switch (state) {
            case index_1.ResourceSequence.STATES.completed:
                resource._triggers.addClass(index_1.ResourceSequence.CLASS_COMPLETED);
                break;
            case index_1.ResourceSequence.STATES.running:
                resource._triggers.addClass(index_1.ResourceSequence.CLASS_RUNNING);
                break;
            case index_1.ResourceSequence.STATES.waiting:
                resource._triggers.addClass(index_1.ResourceSequence.CLASS_WAITING);
                break;
        }
    };
    HzDialogResource.prototype._onChangePageStart = function (e) {
        var instance = e.data.instance;
        if (instance._dialog) {
            instance._dialog.close();
        }
    };
    HzDialogResource.prototype._onDialogOpen = function (e) {
        var instance = e.data.instance;
        instance._markAsCompleted();
    };
    HzDialogResource.prototype._findTriggers = function () {
        if (this._triggers) {
            this._triggers.off("." + this._namespace);
            this._triggers.removeClass(HzDialogResource_1.CLASS_UNCOMPLETED);
            this._triggers.removeClass(HzDialogResource_1.CLASS_COMPLETED);
            this._triggers.remove(HzDialogResource_1.ATTR_RELATED_DIALOG);
        }
        var triggers = this._$(this._options.trigger);
        triggers.attr(HzDialogResource_1.ATTR_RELATED_DIALOG, this._id);
        if (this.isCompleted()) {
            triggers.addClass(HzDialogResource_1.CLASS_COMPLETED);
        }
        else {
            triggers.addClass(HzDialogResource_1.CLASS_UNCOMPLETED);
        }
        triggers.on(this._options.on + "." + this._namespace, { instance: this }, this._onEventTriggered);
        this._triggers = triggers;
    };
    HzDialogResource.prototype.disable = function () {
        if (_super.prototype.disable.call(this)) {
            this._$element.dialog("option", "disabled", true);
            this._triggers.attr("disabled", "disabled");
            this._triggers.addClass(index_1.ResourceController.CLASS_DISABLED);
        }
    };
    HzDialogResource.prototype.enable = function () {
        if (_super.prototype.enable.call(this)) {
            this._$element.dialog("option", "disabled", false);
            this._triggers.removeAttr("disabled");
            this._triggers.removeClass(index_1.ResourceController.CLASS_DISABLED);
        }
    };
    HzDialogResource.prototype._markAsCompleted = function () {
        this._triggers.removeClass(HzDialogResource_1.CLASS_UNCOMPLETED);
        this._triggers.addClass(HzDialogResource_1.CLASS_COMPLETED);
        _super.prototype._markAsCompleted.call(this);
    };
    HzDialogResource.prototype._onEventTriggered = function (e) {
        var instance = e.data.instance;
        if (!instance.isDisabled()) {
            instance._dialog.open();
        }
    };
    HzDialogResource.prototype.destroy = function () {
        this._eventEmitter.globalEmitter.off(index_1.Navigator.ON_CHANGE_PAGE_START + "." + this._namespace);
        if (this._dialog) {
            this._dialog.close();
            this._dialog.destroy();
        }
        _super.prototype.destroy.call(this);
    };
    HzDialogResource.prototype.getInstance = function () {
        return this._dialog;
    };
    return HzDialogResource;
}(index_1.ResourceController));
HzDialogResource.NAMESPACE = "hzDialog";
HzDialogResource.ATTR_RELATED_DIALOG = "data-hz-dialog";
HzDialogResource._DEFAULT_DIALOG_OPTIONS = {
    autoOpen: false,
    draggable: false,
    resizable: false
};
HzDialogResource.CLASS_TRIGGER = "hz-dialog__trigger";
HzDialogResource.CLASS_DIALOG = "hz-dialog";
HzDialogResource = HzDialogResource_1 = __decorate([
    index_1.Resource({
        name: "HzDialog",
        dependencies: [
            index_1.$,
            index_1.EventEmitterFactory,
            index_1.DataOptions
        ]
    })
], HzDialogResource);
exports.HzDialogResource = HzDialogResource;
var HzDialogResource_1;
//# sourceMappingURL=HzDialogResource.js.map