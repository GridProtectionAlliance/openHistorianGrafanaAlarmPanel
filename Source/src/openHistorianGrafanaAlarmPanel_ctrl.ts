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


//<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import * as _ from "lodash";

//import { varName } from '../js/constants'   // import constants from constant file using this format

export class OpenHistorianGrafanaAlarmPanel extends MetricsPanelCtrl{
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

        this.panel.link = (this.panel.link != undefined ? this.panel.link : '..');
		this.panel.filter = (this.panel.filter != undefined ? this.panel.filter : '');
		this.panel.showLegend = (this.panel.showLegend != undefined ? this.panel.showLegend : true);
    }

    // #region Events from Graphana Handlers
    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/openhistorian-alarm-panel/partials/editor.html', 2);
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
        this.datasource.getAlarmStates().then(data => {
			//console.log(data);
			let filterdata = data.data;
			if (this.panel.filter !== "") {
				let filtereddata: any[] = [];
				let re = new RegExp(this.panel.filter);
				filterdata.forEach(item => {
				if (re.test(item.Name))	{
					filtereddata.push(item);
				}
				});
				filterdata = filtereddata;
			}
            this.$scope.data = filterdata;
            this.$scope.colors = _.uniqBy(filterdata, 'State');
        })
        //console.log('data-recieved');
    }

    onDataError(msg) {
        //console.log('data-error');
    }

    handleClick(d) {
        window.open( this.panel.link + '/DeviceStatus.cshtml?ID=' + d.ID)
    }
    // #endregion

}