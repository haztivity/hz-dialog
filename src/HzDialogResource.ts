/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController,DataOptions,ResourceSequence,Navigator} from "@haztivity/core";
import "jquery-ui-dist/jquery-ui.js";
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
    public static readonly ATTR_RELATED_DIALOG = "data-hz-dialog";
    protected static readonly DEFAULTS = {
        completeOnOpen:false
    };
    protected static readonly _DEFAULT_DIALOG_OPTIONS = {
        autoOpen:false,
        draggable:false,
        resizable:false
    };
    protected static readonly CLASS_TRIGGER = "hz-dialog__trigger";
    protected static readonly CLASS_DIALOG = "hz-dialog";
    protected static readonly CLASS_OPEN = "hz-dialog--open";
    protected _DataOptions:DataOptions;
    protected _id;
    protected _namespace;
    protected _triggers:JQuery;
    protected _dialogInstance;
    protected _options;
    protected _config;
    constructor (_$, _EventEmitterFactory, _DataOptions){
        super(_$,_EventEmitterFactory);
        this._DataOptions = _DataOptions;
    }
    public init(options: any, config?: any): any {
        this._config = config;
        this._namespace = HzDialogResource.NAMESPACE + this._id;
        this._options = this._$.extend(true,{},HzDialogResource.DEFAULTS,options);
        this._options.on = this._options.on || "click";
        this.refresh();
    }
    public refresh(){
        if(this._dialogInstance){
            this._dialogInstance.destroy();
        }
        this._$element.uniqueId();
        this._id = this._$element.attr("id");
        let dialogOptions = this._DataOptions.getDataOptions(this._$element, "dialog");
        this._options.dialog = this._$.extend(true,{}, HzDialogResource._DEFAULT_DIALOG_OPTIONS, dialogOptions);
        this._options.dialog.dialogClass = this._options.dialog.dialogClass ? this._options.dialog.dialogClass+" "+HzDialogResource.CLASS_DIALOG : HzDialogResource.CLASS_DIALOG;
        this._options.dialog.classes = this._options.dialog.classes ? this._options.dialog.classes+" "+HzDialogResource.CLASS_DIALOG : HzDialogResource.CLASS_DIALOG;
        this._$element.dialog(this._options.dialog);
        this._dialogInstance = this._$element.data("uiDialog");
        this._findTriggers();
        this._assignEvents();
    }
    protected _assignEvents(){
        this._eventEmitter.globalEmitter.off("."+this._namespace);
        this._$element.off("."+this._namespace);
        this._eventEmitter.off("."+this._namespace);
        this._eventEmitter.globalEmitter.on(Navigator.ON_CHANGE_PAGE_START+"."+this._namespace,{instance:this},this._onChangePageStart);
        this._$element.on( "dialogopen"+"."+this._namespace, {instance:this}, this._onDialogOpen );
        this._$element.on( "dialogclose"+"."+this._namespace, {instance:this}, this._onDialogClose);
        this._eventEmitter.on(ResourceSequence.ON_RESOURCE_STATE_CHANGE+"."+this._namespace,{instance:this},this._onSequenceStateChange);
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
    protected _onChangePageStart(e){
        let instance = e.data.instance;
        if(instance._dialog){
            instance._dialog.close();
        }
    }
    protected _onDialogOpen(e){
        let instance = e.data.instance;
        instance._triggers.addClass(HzDialogResource.CLASS_OPEN);
        if(instance._options.completeOnOpen === true) {
            instance._markAsCompleted();
        }
    }
    protected _onDialogClose(e){
        let instance = e.data.instance;
        instance._triggers.removeClass(HzDialogResource.CLASS_OPEN);
        if(instance._options.completeOnOpen != true) {
            instance._markAsCompleted();
        }
    }
    protected _findTriggers(){
        if(this._triggers){
            this._triggers.off("."+this._namespace);
            this._triggers.removeClass(HzDialogResource.CLASS_UNCOMPLETED);
            this._triggers.removeClass(HzDialogResource.CLASS_COMPLETED);
            this._triggers.remove(HzDialogResource.ATTR_RELATED_DIALOG);
        }
        let triggers = this._$(this._options.trigger);
        triggers.attr(HzDialogResource.ATTR_RELATED_DIALOG,this._id);
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
            if(this._triggers.length == 0){
                this._$element.dialog("open");
            }
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
            instance._dialogInstance.open();
        }
    }
    public destroy(){
        this._eventEmitter.globalEmitter.off(Navigator.ON_CHANGE_PAGE_START+"."+this._namespace);
        if(this._dialogInstance) {
            this._dialogInstance.close();
            this._dialogInstance.destroy();
        }
        super.destroy();
    }
    public getInstance(): any {
        return this._dialogInstance;
    }
}