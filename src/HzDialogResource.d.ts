/// <reference types="@haztivity" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import { ResourceController, DataOptions } from "@haztivity/core/index";
export declare class HzDialogResource extends ResourceController {
    static readonly NAMESPACE: string;
    static readonly _DEFAULT_DIALOG_OPTIONS: {
        autoOpen: boolean;
        draggable: boolean;
        resizable: boolean;
    };
    protected static readonly CLASS_TRIGGER: string;
    protected static readonly CLASS_DIALOG: string;
    protected _DataOptions: DataOptions;
    protected _id: any;
    protected _namespace: any;
    protected _triggers: JQuery;
    protected _dialog: any;
    constructor(_$: any, _EventEmitterFactory: any, _DataOptions: any);
    init(options: any, config?: any): any;
    protected _assignEvents(): void;
    protected _onSequenceStateChange(e: any, resource: any, state: any): void;
    protected _onDialogOpen(e: any): void;
    protected _findTriggers(): void;
    disable(): void;
    enable(): void;
    protected _markAsCompleted(): void;
    protected _onEventTriggered(e: any): void;
    getInstance(): any;
}
