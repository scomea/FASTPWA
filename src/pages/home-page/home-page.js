"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = exports.homePageTemplate = void 0;
const fast_element_1 = require("@microsoft/fast-element");
const home_page_styles_1 = require("./home-page.styles");
const fast_element_2 = require("@microsoft/fast-element");
/**
 * Generates a template
 *
 * @public
 */
exports.homePageTemplate = (0, fast_element_2.html) `
 <app-page>
      <img class="image" src='assets/images/beach.jpg'>
      <h1>Welcome!</h1>
      <p>
      This "app" is an informal effort to create a sample
      <fluent-anchor appearance="hypertext" href="https://github.com/microsoft/fast">FAST</fluent-anchor>
      based PWA that could be used as a starting template, reference "app" and test plaform for UX explorations.
      <p>
      We use the FAST router for navigation, FAST based Fluent web-components and design system for the UI.
      <p>
</app-page>
`;
let HomePage = (() => {
    let _classDecorators = [(0, fast_element_1.customElement)({
            name: "home-page",
            template: exports.homePageTemplate,
            styles: home_page_styles_1.homePageStyles,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = fast_element_1.FASTElement;
    var HomePage = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "HomePage");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomePage = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomePage = _classThis;
})();
exports.HomePage = HomePage;
