// WICG Spec: https://github.com/WICG/navigation-api

/** @see https://wicg.github.io/navigation-api/#navigation */
interface Navigation extends EventTarget {
    entries(): NavigationHistoryEntry[];
    readonly currentEntry?: NavigationHistoryEntry;
    updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void;
    readonly transition?: NavigationTransition;

    readonly canGoBack: boolean;
    readonly canGoForward: boolean;

    navigate(url: string, options?: NavigationNavigateOptions): NavigationResult;
    reload(options?: NavigationReloadOptions): NavigationResult;

    traverseTo(key: string, options?: NavigationOptions): NavigationResult;
    back(options?: NavigationOptions): NavigationResult;
    forward(options?: NavigationOptions): NavigationResult;

    onnavigate: ((this: Navigation, ev: NavigateEvent) => any) | null;
    onnavigatesuccess: ((this: Navigation, ev: Event) => any) | null;
    onnavigateerror: ((this: Navigation, ev: Event) => any) | null;
    oncurrententrychange: ((this: Navigation, ev: NavigationCurrentEntryChangeEvent) => any) | null;
}

// https://wicg.github.io/navigation-api/#global
declare const navigation: Navigation | undefined;

declare interface Window extends WindowNavigation {}

// https://wicg.github.io/navigation-api/#global
declare interface WindowNavigation {
    readonly navigation?: Navigation;
}

/** @see https://wicg.github.io/navigation-api/#navigateevent */
interface NavigateEvent extends Event {
    readonly navigationType: NavigationApiNavigationType;
    readonly destination: NavigationDestination;
    /** @deprecated Deprecated in favour of {@link canIntercept} */
    readonly canTransition?: boolean;
    readonly canIntercept?: boolean;
    readonly userInitiated: boolean;
    readonly hashChange: boolean;
    readonly signal: AbortSignal;
    readonly formData?: FormData;
    readonly downloadRequest?: string;
    readonly info: any;

    /** @deprecated Deprecated in favour of {@link intercept} */
    transitionWhile?(newNavigationAction: Promise<void>, options?: NavigationTransitionWhileOptions): void;
    intercept?(options?: NavigationInterceptOptions): void;
    restoreScroll(): void;
}

declare var NavigateEvent: {
    prototype: NavigateEvent;
    new(type: string, eventInit: NavigateEventInit): Event;
};

/** @see https://wicg.github.io/navigation-api/#dictdef-navigateeventinit */
interface NavigateEventInit extends EventInit {
    navigationType?: NavigationType;
    destination: NavigationDestination;
    /** @deprecated Deprecated in favour of {@link canIntercept} */
    canTransition?: boolean;
    canIntercept?: boolean;
    userInitiated?: boolean;
    hashChange?: boolean;
    signal: AbortSignal;
    formData?: FormData | null;
    downloadRequest?: string | null;
    info?: any;
}

/** @see https://wicg.github.io/navigation-api/#navigationcurrententrychangeevent */
interface NavigationCurrentEntryChangeEvent extends Event {
    readonly navigationType?: NavigationApiNavigationType;
    readonly from: NavigationHistoryEntry;
}

declare var NavigationCurrentEntryChangeEvent: {
    prototype: NavigationCurrentEntryChangeEvent;
    new(type: string, eventInit: NavigationCurrentEntryChangeEventInit): Event;
};

/** @see https://wicg.github.io/navigation-api/#dictdef-navigationcurrententrychangeeventinit */
interface NavigationCurrentEntryChangeEventInit extends EventInit {
    navigationType?: NavigationType;
    destination: NavigationHistoryEntry;
}

/** @see https://wicg.github.io/navigation-api/#navigationhistoryentry */
interface NavigationHistoryEntry extends EventTarget {
    readonly url?: string;
    readonly key: string;
    readonly id: string;
    readonly index: number;
    readonly sameDocument: boolean;

    getState(): any;

    ondispose: ((this: NavigationHistoryEntry, ev: Event) => any) | null;
}

/** @see https://wicg.github.io/navigation-api/#navigationdestination */
interface NavigationDestination {
    readonly url: string;
    readonly key?: string;
    readonly id?: string;
    readonly index: number;
    readonly sameDocument: boolean;

    getState(): any;
}

/** @see https://wicg.github.io/navigation-api/#dictdef-navigationupdatecurrententryoptions */
interface NavigationUpdateCurrentEntryOptions {
    state: any;
}

/** @see https://wicg.github.io/navigation-api/#dictdef-navigationoptions */
interface NavigationOptions {
    info?: any;
}

/** @see https://wicg.github.io/navigation-api/#dictdef-navigationnavigateoptions */
interface NavigationNavigateOptions extends NavigationOptions {
    state?: any;
    // Defaults to "auto"
    history?: NavigationHistoryBehavior;
}

/** @see https://wicg.github.io/navigation-api/#dictdef-navigationreloadoptions */
interface NavigationReloadOptions extends NavigationOptions {
    state?: any;
}

/** @see https://wicg.github.io/navigation-api/#navigationtransition */
interface NavigationTransition {
    readonly navigationType: NavigationApiNavigationType;
    readonly from: NavigationHistoryEntry;
    readonly finished: Promise<void>;
}

/** @see https://wicg.github.io/navigation-api/#dictdef-navigationresult */
interface NavigationResult {
    committed: Promise<NavigationHistoryEntry>;
    finished: Promise<NavigationHistoryEntry>;
}

/** @deprecated Deprecated in favour of {@link NavigationInterceptOptions} */
interface NavigationTransitionWhileOptions {
    focusReset?: NavigationFocusReset;
    scrollRestoration?: NavigationScrollRestoration;
}

/** @see https://wicg.github.io/navigation-api/#dictdef-navigationinterceptoptions */
interface NavigationInterceptOptions {
    handler?: NavigationInterceptHandler;
    focusReset?: NavigationFocusReset;
    scrollRestoration?: NavigationScrollRestoration;
}

/** @see https://wicg.github.io/navigation-api/#enumdef-navigationtype */
type NavigationApiNavigationType = "reload" | "push" | "replace" | "traverse";

/** @see https://wicg.github.io/navigation-api/#enumdef-navigationhistorybehavior */
type NavigationHistoryBehavior = "auto" | "push" | "replace";

/** @see https://wicg.github.io/navigation-api/#enumdef-navigationintercepthandler */
type NavigationInterceptHandler = Promise<void>;

/** @see https://wicg.github.io/navigation-api/#enumdef-navigationfocusreset */
type NavigationFocusReset = "after-transition" | "manual";

/** @see https://wicg.github.io/navigation-api/#enumdef-navigationscrollrestoration */
type NavigationScrollRestoration = "after-transition" | "manual";
