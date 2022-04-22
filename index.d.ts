// WICG Spec: https://github.com/WICG/navigation-api

// https://wicg.github.io/navigation-api/#navigation
interface Navigation {
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

    onnavigate: ((this: Navigation, ev: Event) => any) | null;
    onnavigatesuccess: ((this: Navigation, ev: Event) => any) | null;
    onnavigateerror: ((this: Navigation, ev: Event) => any) | null;
    oncurrententrychange: ((this: Navigation, ev: Event) => any) | null;
}

// https://wicg.github.io/navigation-api/#global
declare const navigation: Navigation | undefined;

declare interface Window extends WindowNavigation {}

// https://wicg.github.io/navigation-api/#global
declare interface WindowNavigation {
    readonly navigation?: Navigation;
}

// https://wicg.github.io/navigation-api/#navigateevent
interface NavigationEvent extends Event {
    readonly navigationType: NavigationApiNavigationType;
    readonly destination: NavigationDestination;
    readonly canTransition: boolean;
    readonly userInitiated: boolean;
    readonly hashChange: boolean;
    readonly signal: AbortSignal;
    readonly formData?: FormData;
    readonly downloadRequest?: string;
    readonly info: any;

    transitionWhile(newNavigationAction: Promise<void>, options?: NavigationTransitionWhileOptions): void;
    restoreScroll(): void;
}

declare var NavigationEvent: {
    prototype: NavigationEvent;
    new(type: string, eventInit: NavigateEventInit): Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
};

// https://wicg.github.io/navigation-api/#dictdef-navigateeventinit
interface NavigateEventInit extends EventInit {
    navigationType?: NavigationType;
    destination: NavigationDestination;
    canTransition?: boolean;
    userInitiated?: boolean;
    hashChange?: boolean;
    signal: AbortSignal;
    formData?: FormData | null;
    downloadRequest?: string | null;
    info?: any;
}

// https://wicg.github.io/navigation-api/#navigationhistoryentry
interface NavigationHistoryEntry extends EventTarget {
    readonly url?: string;
    readonly key: string;
    readonly id: string;
    readonly index: number;
    readonly sameDocument: boolean;

    getState(): any;

    ondispose: ((this: NavigationHistoryEntry, ev: Event) => any) | null;
}

// https://wicg.github.io/navigation-api/#navigationdestination
interface NavigationDestination {
    readonly url: string;
    readonly key?: string;
    readonly id?: string;
    readonly index: number;
    readonly sameDocument: boolean;

    getState(): any;
}

// https://wicg.github.io/navigation-api/#dictdef-navigationupdatecurrententryoptions
interface NavigationUpdateCurrentEntryOptions {
    state: any;
}

// https://wicg.github.io/navigation-api/#dictdef-navigationoptions
interface NavigationOptions {
    info: any;
}

// https://wicg.github.io/navigation-api/#dictdef-navigationnavigateoptions
interface NavigationNavigateOptions extends NavigationOptions {
    state: any;
    // Always "auto"
    history: NavigationHistoryBehavior;
}

// https://wicg.github.io/navigation-api/#dictdef-navigationreloadoptions
interface NavigationReloadOptions extends NavigationOptions {
    state: any;
}

// https://wicg.github.io/navigation-api/#navigationtransition
interface NavigationTransition {
    readonly navigationType: NavigationApiNavigationType;
    readonly from: NavigationHistoryEntry;
    readonly finished: Promise<void>;
}

// https://wicg.github.io/navigation-api/#dictdef-navigationresult
interface NavigationResult {
    committed: Promise<NavigationHistoryEntry>;
    finished: Promise<NavigationHistoryEntry>;
}

// https://wicg.github.io/navigation-api/#dictdef-navigationtransitionwhileoptions
interface NavigationTransitionWhileOptions {
    focusReset: NavigationFocusReset;
    scrollRestoration: NavigationScrollRestoration;
}

// https://wicg.github.io/navigation-api/#enumdef-navigationtype
type NavigationApiNavigationType = "reload" | "push" | "replace" | "traverse";

// https://wicg.github.io/navigation-api/#enumdef-navigationhistorybehavior
type NavigationHistoryBehavior = "auto" | "push" | "replace";

// https://wicg.github.io/navigation-api/#enumdef-navigationfocusreset
type NavigationFocusReset = "after-transition" | "manual";

// https://wicg.github.io/navigation-api/#enumdef-navigationscrollrestoration
type NavigationScrollRestoration = "after-transition" | "manual";
