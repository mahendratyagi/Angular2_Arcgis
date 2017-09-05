System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            AppComponent = /** @class */ (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'playground-app',
                        styles: ["\n        section {\n            width: 90%;\n            max-width: 1200px;\n            margin: 0 auto;\n            padding: 4em 0 0 0;\n        }\n        "],
                        template: "\n        <nav>\n            <a href=\"#\" class=\"brand\">\n                <span>Blood Donation</span>\n            </a>            \n\n            <!-- responsive-->\n            <input id=\"bmenub\" type=\"checkbox\" class=\"show\">\n            <label for=\"bmenub\" class=\"burger pseudo button\">\u2261</label>\n\n        </nav>\n        <main>\n            <section>\n                <router-outlet></router-outlet>\n            </section>\n        </main>\n        "
                    })
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map