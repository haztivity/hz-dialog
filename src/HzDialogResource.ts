/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController,DataOptions,ResourceSequence} from "@haztivity/core/index";
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
        this._findTriggers();
        let dialogOptions = this._DataOptions.getDataOptions(this._$element,"dialog");
        this._options.dialog = this._$.extend(true,HzDialogResource._DEFAULT_DIALOG_OPTIONS,dialogOptions);
        this._options.dialog.dialogClass = this._options.dialog.dialogClass ? this._options.dialog.dialogClass+" "+HzDialogResource.CLASS_DIALOG : HzDialogResource.CLASS_DIALOG;
        this._$element.dialog(this._options.dialog);
        this._dialog = this._$element.data("uiDialog");
        this._assignEvents();
    }
    protected _assignEvents(){
        this._$element.off("."+HzDialogResource.NAMESPACE);
        this._$element.on( "dialogopen", {instance:this}, this._onDialogOpen );
        this._eventEmitter.on(ResourceSequence.ON_RESOURCE_STATE_CHANGE,{instance:this},this._onSequenceStateChange);
    }
    protected _onSequenceStateChange(e,resource,state){
        resource._triggers.removeClass(`${ResourceSequence.CLASS_RUNNING} ${ResourceSequence.CLASS_COMPLETED} ${ResourceSequence.CLASS_WAITING}`);
        switch(state){
            case ResourceSequence.STATES.completed:
                resource._triggers.addClass(ResourceSequence.CLASS_COMPLETED);
                break;
            case ResourceSequence.STATES.running:
                resource._triggers.addClass(ResourceSequence.CLASS_RUNNING);
                break;
            case ResourceSequence.STATES.waiting:
                resource._triggers.addClass(ResourceSequence.CLASS_WAITING);
                break;
        }
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
    public disable(){
        if(super.disable()){
            this._$element.dialog("option","disabled",true);
            this._triggers.attr("disabled","disabled");
            this._triggers.addClass(ResourceController.CLASS_DISABLED);
        }
    }
    public enable(){
        if(super.enable()){
            this._$element.dialog("option","disabled",false);
            this._triggers.removeAttr("disabled");
            this._triggers.removeClass(ResourceController.CLASS_DISABLED);
        }
    }
    protected _markAsCompleted(){
        this._triggers.removeClass(HzDialogResource.CLASS_UNCOMPLETED);
        this._triggers.addClass(HzDialogResource.CLASS_COMPLETED);
        super._markAsCompleted();
    }
    protected _onEventTriggered(e){
        let instance:HzDialogResource = e.data.instance;
        if(!instance.isDisabled()) {
            instance._dialog.open();
        }
    }
    public getInstance(): any {
        return this._dialog;
    }
}