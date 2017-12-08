///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("app/plugins/sdk");
//import { varName } from '../js/constants'   // import constants from constant file using this format
class GrafanaPluginTemplateCtrl extends sdk_1.MetricsPanelCtrl {
    constructor($scope, $injector, $rootScope) {
        super($scope, $injector);
        this.$rootScope = $rootScope;
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
}
GrafanaPluginTemplateCtrl.templateUrl = 'partials/module.html';
exports.GrafanaPluginTemplateCtrl = GrafanaPluginTemplateCtrl;
//# sourceMappingURL=grafanaPluginTemplate_ctrl.js.map