System.register(["@haztivity/core/index", "jquery-ui/ui/widgets/dialog"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, dialog, HzDialogResource, HzDialogResource_1;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (dialog_1) {
                dialog = dialog_1;
            }
        ],
        execute: function () {
            dialog;
            HzDialogResource = HzDialogResource_1 = (function (_super) {
                __extends(HzDialogResource, _super);
                function HzDialogResource(_$, _EventEmitterFactory, _DataOptions) {
                    var _this = _super.call(this, _$, _EventEmitterFactory) || this;
                    _this._DataOptions = _DataOptions;
                    return _this;
                }
                HzDialogResource.prototype.init = function (options, config) {
                    this._config = config;
                    this._id = new Date().getTime();
                    this._namespace = HzDialogResource_1.NAMESPACE + this._id;
                    this._options = options;
                    this._options.on = this._options.on || "click";
                    var dialogOptions = this._DataOptions.getDataOptions(this._$element, "dialog");
                    this._options.dialog = this._$.extend(true, HzDialogResource_1._DEFAULT_DIALOG_OPTIONS, dialogOptions);
                    this._options.dialog.dialogClass = this._options.dialog.dialogClass ? this._options.dialog.dialogClass + " " + HzDialogResource_1.CLASS_DIALOG : HzDialogResource_1.CLASS_DIALOG;
                    this._$element.dialog(this._options.dialog);
                    this._dialog = this._$element.data("uiDialog");
                    this._assignEvents();
                    this._findTriggers();
                };
                HzDialogResource.prototype._assignEvents = function () {
                    this._$element.off("." + HzDialogResource_1.NAMESPACE);
                    this._$element.on("dialogopen", { instance: this }, this._onDialogOpen);
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
                    }
                    var triggers = this._$(this._options.trigger);
                    if (this.isCompleted()) {
                        triggers.addClass(HzDialogResource_1.CLASS_COMPLETED);
                    }
                    else {
                        triggers.addClass(HzDialogResource_1.CLASS_UNCOMPLETED);
                    }
                    triggers.on(this._options.on + "." + this._namespace, { instance: this }, this._onEventTriggered);
                    this._triggers = triggers;
                };
                HzDialogResource.prototype._markAsCompleted = function () {
                    _super.prototype._markAsCompleted.call(this);
                    this._triggers.addClass(HzDialogResource_1.CLASS_COMPLETED);
                };
                HzDialogResource.prototype._onEventTriggered = function (e) {
                    var instance = e.data.instance;
                    instance._dialog.open();
                };
                HzDialogResource.prototype.getInstance = function () {
                    return this._dialog;
                };
                return HzDialogResource;
            }(index_1.ResourceController));
            HzDialogResource.NAMESPACE = "hzDialog";
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
            exports_1("HzDialogResource", HzDialogResource);
        }
    };
});
//# sourceMappingURL=HzDialogResource.js.map