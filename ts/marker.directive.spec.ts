/// <reference path="../typings/index.d.ts" />

import { MarkerDirective,
    MapComponent, LatLng } from './index';
import { point, latLng } from 'leaflet';

const EXAMPLE_CONTENT: string = 'Vel ipsum odit quia velit omnis illo voluptatem ut. Aperiam porro voluptates maiores.';

function hasAsChild(root: HTMLElement, child: HTMLElement): boolean {
    'use strict';
    const length: number = root.children.length;
    for (let i: number = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}

describe('Icon Directive', () => {
    describe('[(display)]', () => {
        var map: MapComponent,
        layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should remove DOM container when not displaying', () => {
            layer.display = false;
            /* istanbul ignore if */
            if (hasAsChild(layer.getPane(), layer.getElement())) {
                throw new Error('Map is still parent element of the tile layer');
            }
        });
        it('should re-add DOM container when display is true again', () => {
            layer.display = false;
            layer.display = true;

            /* istanbul ignore if */
            if (!hasAsChild(layer.getPane(), layer.getElement())) {
                throw new Error('Map is not parent element of the tile layer');
            }
        });
        it('should remove EventListeners when not displaying', (done: MochaDone) => {
            const zoomEvents: {fn: Function}[] = (<any>map)._events.zoom,
                length: number = zoomEvents.length,
                originalEventListener: Function = layer.getEvents()['zoom'];

            layer.display = false;

            for (let i: number = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
            }
            return done();
        });
        it('should re-add EventListeners when display is true again', (done: MochaDone) => {
            const zoomEvents: {fn: Function}[] = (<any>map)._events.zoom,
                length: number = zoomEvents.length,
                originalEventListener: Function = layer.getEvents()['zoom'];

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
            /* istanbul ignore next */
            return done(new Error('There is no event on listener'));
        });
        it('should set to false by removing from map', (done: MochaDone) => {

            layer.displayChange.subscribe((val: boolean) => {
                /* istanbul ignore if */
                if (val !== false) {
                    return new Error('Wrong value emitted');
                }
                /* istanbul ignore if */
                if (layer.display) {
                    return new Error('Wrong value from variable call');
                }
                done();
            });

            map.removeLayer(layer);
        });
        it('should set to true when adding to map again', (done: MochaDone) => {
            map.removeLayer(layer);
            layer.displayChange.subscribe((val: boolean) => {
                /* istanbul ignore if */
                if (val !== true) {
                    return done(new Error('Wrong value emitted'));
                }
                /* istanbul ignore if */
                if (!layer.display) {
                    return done(new Error('Wrong value from variable call'));
                }
                done();
            });

            map.addLayer(layer);
        });
    });
    describe('[(opacity)]', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.opacity = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.options.opacity !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.options.opacity }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();
            layer.opacity = val;
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.opacity !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.opacity }`));
                }
                return done();
            }, 0);

        });
        it('should be changed in Angular when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();
            layer.setOpacity(val);
            setTimeout(() => {
                /* istanbul ignore if */
                if (layer.opacity !== val) {
                    return done(new Error(`Wrong value setted: ${ val } != ${ layer.opacity }`));
                }
                return done();
            }, 0);

        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.opacityChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.opacity = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.opacityChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setOpacity(val);
        });
    });

    describe('[(lat)]', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            /* istanbul ignore if */
            if (layer.getLatLng().lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.getLatLng().lat }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            /* istanbul ignore if */
            if (layer.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lat }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([val, 0]);
            /* istanbul ignore if */
            if (layer.lat !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lat }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });


            layer.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            /* istanbul ignore if */
            if (layer.getLatLng().lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.getLatLng().lng }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            /* istanbul ignore if */
            if (layer.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lng }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([0, val]);
            /* istanbul ignore if */
            if (layer.lng !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.lng }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                /* istanbul ignore if */
                if (eventVal !== val) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });


            layer.setLatLng([0, val]);
        });
    });
    describe('[(position)]', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.position = val;
            /* istanbul ignore if */
            if (layer.getLatLng().lat !== val.lat || layer.getLatLng().lng !== val.lng) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.getLatLng() }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.position = val;
            /* istanbul ignore if */
            if (layer.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.position }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.setLatLng(val);
            /* istanbul ignore if */
            if (layer.position !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.position }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            layer.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal.lat !== val.lat || eventVal.lng !== val.lng) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            layer.positionChange.subscribe((eventVal: LatLng) => {
                /* istanbul ignore if */
                if (eventVal.lat !== val.lat || eventVal.lng !== val.lng) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setLatLng(val);
        });
    });

    // TODO: icon
    describe('[title]', () => {
       var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'http://test';
            layer.title = val;
            /* istanbul ignore if */
            if (layer.options.title !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.title }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'http://test';
            layer.title = val;
            /* istanbul ignore if */
            if (layer.title !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.title }`);
            }
        });
    });
    describe('[alt]', () => {
       var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'http://test';
            layer.alt = val;
            /* istanbul ignore if */
            if (layer.options.alt !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.alt }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'http://test';
            layer.alt = val;
            /* istanbul ignore if */
            if (layer.alt !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.alt }`);
            }
        });
    });

    describe('[draggable]', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.draggable = false;
            /* istanbul ignore if */
            if (layer.dragging.enabled()) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.dragging.disable();
            layer.draggable = true;
            /* istanbul ignore if */
            if (!layer.dragging.enabled()) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.draggable = false;
            /* istanbul ignore if */
            if (layer.draggable) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.draggable = true;
            /* istanbul ignore if */
            if (!layer.draggable) {
                throw new Error(`It is not setted to true`);
            }
        });
    });

    // Events
    describe('(dragend)', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.dragendEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('dragend', testEvent);
        });
    });
    describe('(dragstart)', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.dragstartEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('dragstart', testEvent);
        });
    });
    describe('(movestart)', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.movestartEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('movestart', testEvent);
        });
    });
    describe('(drag)', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.dragEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('drag', testEvent);
        });
    });
    describe('(moveend)', () => {
        var map: MapComponent,
            layer: MarkerDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            layer = new MarkerDirective(map);
            return done();
        });
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.moveendEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.testHandle !== testEvent.testHandle) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            layer.fire('moveend', testEvent);
        });
    });
});
