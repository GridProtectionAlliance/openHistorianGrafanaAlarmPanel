///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';

//import { varName } from '../js/constants'   // import constants from constant file using this format

export class GrafanaPluginTemplateCtrl extends MetricsPanelCtrl{
    static templateUrl:string = 'partials/module.html';

    constructor($scope, $injector, private $rootScope) {
        super($scope, $injector);
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-teardown', this.onPanelTeardown.bind(this));
        this.events.on('render', this.onRender.bind(this));
        this.events.on('panel-initialized', this.onPanelInitialized.bind(this));
        this.events.on('data-received', this.onDataRecieved.bind(this));
        //this.events.on('data-snapshot-load', console.log('data-snapshot-load'));
        this.events.on('data-error', this.onDataError.bind(this));
        this.events.on('refresh', this.onRefresh.bind(this));

    }

    // #region Events from Graphana Handlers
    onInitEditMode() {
        //console.log('init-edit-mode');
    }

    onPanelTeardown() {
        //console.log('panel-teardown');
    }

    onPanelInitialized() {
        //console.log('panel-initialized');
    }

    onRefresh() {
        //console.log('refresh');
    }

    onResize() {
        var ctrl = this;
        //console.log('refresh');
    }

    onRender() {
        //console.log('render');

    }

    onDataRecieved(data) {
        //console.log('data-recieved');
    }

    onDataError(msg) {
        //console.log('data-error');
    }
    // #endregion

}