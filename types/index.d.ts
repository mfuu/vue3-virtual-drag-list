import * as vue from 'vue';

declare const VirtualList: vue.DefineComponent<{
    dataSource: {};
    modelValue: {};
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    tableMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: StringConstructor;
        default: string;
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    sortable: {
        type: BooleanConstructor;
        default: boolean;
    };
    handle: {
        type: (StringConstructor | FunctionConstructor)[];
    };
    group: {
        type: (StringConstructor | ObjectConstructor)[];
    };
    scroller: {
        type: ({
            new (): Document;
            prototype: Document;
        } | {
            new (): HTMLElement;
            prototype: HTMLElement;
        })[];
    };
    lockAxis: {
        type: vue.PropType<"x" | "y">;
        default: string;
    };
    direction: {
        type: vue.PropType<"vertical" | "horizontal">;
        default: string;
    };
    keeps: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
    };
    debounceTime: {
        type: NumberConstructor;
        default: number;
    };
    throttleTime: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: NumberConstructor;
        default: number;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollSpeed: {
        type: ObjectConstructor;
        default: () => {
            x: number;
            y: number;
        };
    };
    scrollThreshold: {
        type: NumberConstructor;
        default: number;
    };
    keepOffset: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    fallbackOnBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    delayOnTouchOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    rootTag: {
        type: StringConstructor;
        default: string;
    };
    wrapTag: {
        type: StringConstructor;
        default: string;
    };
    wrapClass: {
        type: StringConstructor;
        default: string;
    };
    wrapStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    ghostClass: {
        type: StringConstructor;
        default: string;
    };
    ghostStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    chosenClass: {
        type: StringConstructor;
        default: string;
    };
    placeholderClass: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:dataSource" | "update:modelValue" | "top" | "bottom" | "drag" | "drop" | "rangeChange")[], "update:dataSource" | "update:modelValue" | "top" | "bottom" | "drag" | "drop" | "rangeChange", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    dataSource: {};
    modelValue: {};
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    tableMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    draggable: {
        type: StringConstructor;
        default: string;
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    sortable: {
        type: BooleanConstructor;
        default: boolean;
    };
    handle: {
        type: (StringConstructor | FunctionConstructor)[];
    };
    group: {
        type: (StringConstructor | ObjectConstructor)[];
    };
    scroller: {
        type: ({
            new (): Document;
            prototype: Document;
        } | {
            new (): HTMLElement;
            prototype: HTMLElement;
        })[];
    };
    lockAxis: {
        type: vue.PropType<"x" | "y">;
        default: string;
    };
    direction: {
        type: vue.PropType<"vertical" | "horizontal">;
        default: string;
    };
    keeps: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
    };
    debounceTime: {
        type: NumberConstructor;
        default: number;
    };
    throttleTime: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: NumberConstructor;
        default: number;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollSpeed: {
        type: ObjectConstructor;
        default: () => {
            x: number;
            y: number;
        };
    };
    scrollThreshold: {
        type: NumberConstructor;
        default: number;
    };
    keepOffset: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    fallbackOnBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    delayOnTouchOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    rootTag: {
        type: StringConstructor;
        default: string;
    };
    wrapTag: {
        type: StringConstructor;
        default: string;
    };
    wrapClass: {
        type: StringConstructor;
        default: string;
    };
    wrapStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    ghostClass: {
        type: StringConstructor;
        default: string;
    };
    ghostStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    chosenClass: {
        type: StringConstructor;
        default: string;
    };
    placeholderClass: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:dataSource"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onTop?: ((...args: any[]) => any) | undefined;
    onBottom?: ((...args: any[]) => any) | undefined;
    onDrag?: ((...args: any[]) => any) | undefined;
    onDrop?: ((...args: any[]) => any) | undefined;
    onRangeChange?: ((...args: any[]) => any) | undefined;
}, {
    dataKey: string;
    tableMode: boolean;
    draggable: string;
    itemClass: string;
    sortable: boolean;
    lockAxis: "x" | "y";
    direction: "vertical" | "horizontal";
    keeps: number;
    debounceTime: number;
    throttleTime: number;
    animation: number;
    autoScroll: boolean;
    scrollSpeed: Record<string, any>;
    scrollThreshold: number;
    keepOffset: boolean;
    disabled: boolean;
    fallbackOnBody: boolean;
    delay: number;
    delayOnTouchOnly: boolean;
    rootTag: string;
    wrapTag: string;
    wrapClass: string;
    wrapStyle: Record<string, any>;
    ghostClass: string;
    ghostStyle: Record<string, any>;
    chosenClass: string;
    placeholderClass: string;
}>;

export { VirtualList as default };
