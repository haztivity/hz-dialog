/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController,DataOptions} from "@haztivity/core/index";
import * as dialog from "jquery-ui/ui/widgets/dialog";
dialog;
interface IOptions {
    on?: string;
    trigger?: string;
}
@Resource(
    {
        name: "HzDialog",
        dependencies: [
            $,
            EventEmitterFactory,
            DataOptions
        ]
    }
)
export class HzDialogResource extends ResourceController {
    public static readonly NAMESPACE = "hzDialog";
    public static readonly _DEFAULT_DIALOG_OPTIONS = {
        autoOpen:false,
        draggable:false,
        resizable:false
    };
    protected static readonly CLASS_TRIGGER = "hz-dialog__trigger";
    protected static readonly CLASS_DIALOG = "hz-dialog";
    protected _DataOptions:DataOptions;
    protected _id;
    protected _namespace;
    protected _triggers:JQuery;
    protected _dialog;
    constructor (_$, _EventEmitterFactory, _DataOptions){
        super(_$,_EventEmitterFactory);
        this._DataOptions = _DataOptions;
    }
    public init(options: any, config?: any): any {
        this._config = config;
        this._id = new Date().getTime();
        this._namespace = HzDialogResource.NAMESPACE + this._id;
        this._options = options;
        this._options.on = this._options.on || "click";
        let dialogOptions = this._DataOptions.getDataOptions(this._$element,"dialog");
        this._options.dialog = this._$.extend(true,HzDialogResource._DEFAULT_DIALOG_OPTIONS,dialogOptions);
        this._options.dialog.dialogClass = this._options.dialog.dialogClass ? this._options.dialog.dialogClass+" "+HzDialogResource.CLASS_DIALOG : HzDialogResource.CLASS_DIALOG;
        this._$element.dialog(this._options.dialog);
        this._dialog = this._$element.data("uiDialog");
        this._assignEvents();
        this._findTriggers();
    }
    protected _assignEvents(){
        this._$element.off("."+HzDialogResource.NAMESPACE);
        this._$element.on( "dialogopen", {instance:this}, this._onDialogOpen );
    }
    protected _onDialogOpen(e){
        let instance = e.data.instance;
        instance._markAsCompleted();
    }
    protected _findTriggers(){
        if(this._triggers){
            this._triggers.off("."+this._namespace);
            this._triggers.removeClass(HzDialogResource.CLASS_UNCOMPLETED);
            this._triggers.removeClass(HzDialogResource.CLASS_COMPLETED);
        }
        let triggers = this._$(this._options.trigger);
        if(this.isCompleted()){
            triggers.addClass(HzDialogResource.CLASS_COMPLETED);
        }else{
            triggers.addClass(HzDialogResource.CLASS_UNCOMPLETED);
        }
        triggers.on(`${this._options.on}.${this._namespace}`, {instance: this}, this._onEventTriggered);
        this._triggers= triggers;
    }
    protected _markAsCompleted(){
        super._markAsCompleted();
        this._triggers.addClass(HzDialogResource.CLASS_COMPLETED);
    }
    protected _onEventTriggered(e){
        let instance:HzDialogResource = e.data.instance;
        instance._dialog.open();
    }
    public getInstance(): any {
        return this._dialog;
    }
}