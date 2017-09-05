import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';

import { SyncedViewsComponent } from './synced-views.component';
import { EsriSceneViewComponent } from './esri-scene-view.component';

// import { GeometryEngineShowcaseComponent } from './geometry-engine-showcase.component';
// import { EsriMapViewComponent } from './esri-map-view.component';


const routes: Routes = [
     {
        path: '',
        component: SyncedViewsComponent
    }
];

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    declarations: [
        AppComponent,
        SyncedViewsComponent,
        EsriSceneViewComponent
    ],
    // providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
