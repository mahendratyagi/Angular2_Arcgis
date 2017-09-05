import { Component, ViewChildren } from '@angular/core';
import { EsriSceneViewComponent } from './esri-scene-view.component';
import { ViewCoordinationService } from './view-coordination.service';
import { BrowserDetectionService } from './browser-detection.service';

@Component({
    selector: 'synced-views',
    styles: [`
        .label-override {
            margin-left: 0;
            margin-right: 1em;
        }
        `],
    template: 
        `
        <h4 *ngIf="isMobile"><span class="label warning label-override">Warning</span> {{ isMobileMessage }}</h4>
        
        <div class="tabs two" *ngIf="!isMobile">
            <div class="row">
                <div>
                    <esri-scene-view class="stack"></esri-scene-view>                    
                </div>              
            </div>
        </div>        
        `,
     providers: [ViewCoordinationService, BrowserDetectionService]
})
export class SyncedViewsComponent {
    isMobile: boolean = false;
    isMobileMessage: string = null;
    delaySync: boolean = false;
    disableSync: boolean = false;

    constructor(private _browserSniffer: BrowserDetectionService) {
        this.isMobile = _browserSniffer.isMobile();
        this.isMobileMessage = _browserSniffer.isMobileMessage;
    }

    @ViewChildren(EsriSceneViewComponent)
    sceneViewComponents: any

    syncViews() {
        if (!this.disableSync) {
            this.sceneViewComponents.toArray().forEach(svc => svc.syncCamera(this.delaySync));
        }
    }
}
