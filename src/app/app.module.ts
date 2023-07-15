import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CanvasBoxComponent } from "./components/canvas-box/canvas-box.component";
import { CameraViewComponent } from "./components/camera-view/camera-view.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Material
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
    declarations: [AppComponent, CanvasBoxComponent, CameraViewComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatGridListModule,
    ],
    exports: [MatGridListModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
