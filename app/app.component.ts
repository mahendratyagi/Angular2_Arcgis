import { Component } from '@angular/core';

@Component({
    selector: 'playground-app',
    styles: [`
        section {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 4em 0 0 0;
        }
        `],
    template: `
        <nav>
            <a href="#" class="brand">
                <span>Blood Donation</span>
            </a>            

            <!-- responsive-->
            <input id="bmenub" type="checkbox" class="show">
            <label for="bmenub" class="burger pseudo button">≡</label>

        </nav>
        <main>
            <section>
                <router-outlet></router-outlet>
            </section>
        </main>
        `
})
export class AppComponent { }
