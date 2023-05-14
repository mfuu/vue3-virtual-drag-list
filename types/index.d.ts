import * as vue from 'vue';

declare const VirtualDragList: vue.DefineComponent<{
    dataSource: {
        type: ArrayConstructor;
        default: () => never[];
    };
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    draggable: {
        type: (StringConstructor | FunctionConstructor)[];
    };
    handle: {
        type: (StringConstructor | FunctionConstructor)[];
    };
    group: {
        type: (StringConstructor | ObjectConstructor)[];
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
        default: number;
    };
    delay: {
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
    scrollThreshold: {
        type: NumberConstructor;
        default: number;
    };
    keepOffset: {
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
    headerTag: {
        type: StringConstructor;
        default: string;
    };
    footerTag: {
        type: StringConstructor;
        default: string;
    };
    itemTag: {
        type: StringConstructor;
        default: string;
    };
    itemStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
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
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("top" | "bottom" | "drag" | "drop" | "add" | "remove")[], "top" | "bottom" | "drag" | "drop" | "add" | "remove", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    dataSource: {
        type: ArrayConstructor;
        default: () => never[];
    };
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    draggable: {
        type: (StringConstructor | FunctionConstructor)[];
    };
    handle: {
        type: (StringConstructor | FunctionConstructor)[];
    };
    group: {
        type: (StringConstructor | ObjectConstructor)[];
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
        default: number;
    };
    delay: {
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
    scrollThreshold: {
        type: NumberConstructor;
        default: number;
    };
    keepOffset: {
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
    headerTag: {
        type: StringConstructor;
        default: string;
    };
    footerTag: {
        type: StringConstructor;
        default: string;
    };
    itemTag: {
        type: StringConstructor;
        default: string;
    };
    itemStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
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
}>> & {
    onTop?: ((...args: any[]) => any) | undefined;
    onBottom?: ((...args: any[]) => any) | undefined;
    onDrag?: ((...args: any[]) => any) | undefined;
    onDrop?: ((...args: any[]) => any) | undefined;
    onAdd?: ((...args: any[]) => any) | undefined;
    onRemove?: ((...args: any[]) => any) | undefined;
}, {
    dataSource: unknown[];
    dataKey: string;
    direction: "vertical" | "horizontal";
    keeps: number;
    size: number;
    delay: number;
    animation: number;
    autoScroll: boolean;
    scrollThreshold: number;
    keepOffset: boolean;
    rootTag: string;
    wrapTag: string;
    wrapClass: string;
    wrapStyle: Record<string, any>;
    headerTag: string;
    footerTag: string;
    itemTag: string;
    itemStyle: Record<string, any>;
    itemClass: string;
    disabled: boolean;
    ghostClass: string;
    ghostStyle: Record<string, any>;
    chosenClass: string;
}>;

export { VirtualDragList as default };
