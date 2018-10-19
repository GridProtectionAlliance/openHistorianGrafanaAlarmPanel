//******************************************************************************************************
//  openHistorianGrafanaAlarmPanel.ts - Gbtc
//
//  Copyright © 2017, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  12/15/2017 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
System.register(["app/plugins/sdk", "lodash"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var sdk_1, lodash_1, OpenHistorianGrafanaAlarmPanel;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {//******************************************************************************************************
            //  openHistorianGrafanaAlarmPanel.ts - Gbtc
            //
            //  Copyright © 2017, Grid Protection Alliance.  All Rights Reserved.
            //
            //  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
            //  the NOTICE file distributed with this work for additional information regarding copyright ownership.
            //  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
            //  file except in compliance with the License. You may obtain a copy of the License at:
            //
            //      http://opensource.org/licenses/MIT
            //
            //  Unless agreed to in writing, the subject software distributed under the License is distributed on an
            //  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
            //  License for the specific language governing permissions and limitations.
            //
            //  Code Modification History:
            //  ----------------------------------------------------------------------------------------------------
            //  12/15/2017 - Billy Ernest
            //       Generated original version of source code.
            //
            //******************************************************************************************************
            OpenHistorianGrafanaAlarmPanel = /** @class */ (function (_super) {
                __extends(OpenHistorianGrafanaAlarmPanel, _super);
                function OpenHistorianGrafanaAlarmPanel($scope, $injector, $rootScope) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.$rootScope = $rootScope;
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('panel-teardown', _this.onPanelTeardown.bind(_this));
                    _this.events.on('render', _this.onRender.bind(_this));
                    _this.events.on('panel-initialized', _this.onPanelInitialized.bind(_this));
                    _this.events.on('data-received', _this.onDataRecieved.bind(_this));
                    //this.events.on('data-snapshot-load', console.log('data-snapshot-load'));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    _this.events.on('refresh', _this.onRefresh.bind(_this));
                    _this.panel.link = (_this.panel.link != undefined ? _this.panel.link : '..');
                    return _this;
                }
                // #region Events from Graphana Handlers
                OpenHistorianGrafanaAlarmPanel.prototype.onInitEditMode = function () {
                    this.addEditorTab('Options', 'public/plugins/openhistorian-alarm-panel/partials/editor.html', 2);
                };
                OpenHistorianGrafanaAlarmPanel.prototype.onPanelTeardown = function () {
                    //console.log('panel-teardown');
                };
                OpenHistorianGrafanaAlarmPanel.prototype.onPanelInitialized = function () {
                    //console.log('panel-initialized');
                };
                OpenHistorianGrafanaAlarmPanel.prototype.onRefresh = function () {
                    //console.log('refresh');
                };
                OpenHistorianGrafanaAlarmPanel.prototype.onResize = function () {
                    var ctrl = this;
                    //console.log('refresh');
                };
                OpenHistorianGrafanaAlarmPanel.prototype.onRender = function () {
                    //console.log('render');
                };
                OpenHistorianGrafanaAlarmPanel.prototype.onDataRecieved = function (data) {
                    var _this = this;
                    this.datasource.getAlarmStates().then(function (data) {
                        _this.$scope.data = data.data;
                        _this.$scope.colors = lodash_1.default.uniqBy(data.data, 'State');
                    });
                    //console.log('data-recieved');
                };
                OpenHistorianGrafanaAlarmPanel.prototype.onDataError = function (msg) {
                    //console.log('data-error');
                };
                OpenHistorianGrafanaAlarmPanel.prototype.handleClick = function (d) {
                    window.open(this.panel.link + '/DeviceStatus.cshtml?ID=' + d.ID);
                };
                OpenHistorianGrafanaAlarmPanel.templateUrl = 'partials/module.html';
                return OpenHistorianGrafanaAlarmPanel;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("OpenHistorianGrafanaAlarmPanel", OpenHistorianGrafanaAlarmPanel);
        }
    };
});
//# sourceMappingURL=openHistorianGrafanaAlarmPanel_ctrl.js.map