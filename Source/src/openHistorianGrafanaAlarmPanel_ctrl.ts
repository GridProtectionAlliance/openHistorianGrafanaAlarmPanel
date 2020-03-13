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
	SelectedDeviceIds: Array<number>;
	
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
		this.panel.showAllStates = (this.panel.showAllStates != undefined ? this.panel.showAllStates : false);
		
		this.panel.filterDevice = (this.panel.filterDevice != undefined ? this.panel.filterDevice : true);
		this.panel.showAllStates = (this.panel.useRegex != undefined ? this.panel.useRegex : false);
		this.panel.deviceGroups = (this.panel.deviceGroups != undefined ? this.panel.deviceGroups : []);
		
		this.SelectedDeviceIds = [];
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
			this.getGroups()

			let filter = this.panel.filter
			try {
				filter = this.templateSrv.replace(this.panel.filter, this.panel.scopedVars, 'regex');
			} catch (e) {
				console.log('Alarm panel error: ', e);
			}

			let filterdata = data.data;
			if (this.panel.filterDevice && this.panel.filter !== "") {
				let filtereddata: any[] = [];
				let re = new RegExp(filter);
				filterdata.forEach(item => {
					if (re.test(item.Name)) {
						filtereddata.push(item);
					}
				});
				filterdata = filtereddata;
			}
			else if (!this.panel.filterDevice) {
				this.updateGroups()
				let filtereddata: any[] = [];
				filterdata.forEach(item => {

					if (this.SelectedDeviceIds.indexOf(item.DeviceID) > -1)
						filtereddata.push(item);
				});

				filterdata = filtereddata;
			
			}

			this.$scope.data = filterdata;

			if (!this.panel.showAllStates)
				this.$scope.colors = _.uniqBy(filterdata, 'State');

			if (this.panel.showAllStates) {
				this.datasource.getPossibleAlarmStates().then(data => {
					this.$scope.colors = data.data
				})
			}
			//console.log('data-recieved');

		})
	}

    onDataError(msg) {
        //console.log('data-error');
    }


	updateGroups() {

		let updatedDeviceGroups = this.panel.deviceGroups

		if (this.panel.useRegex) {
			if (this.panel.filter == "")
				updatedDeviceGroups = updatedDeviceGroups.map(item => item.enabled = true);
			else {
				let filter = this.panel.filter
				try {
					filter = this.templateSrv.replace(this.panel.filter, this.panel.scopedVars, 'regex');
				} catch (e) {
					console.log('Alarm panel error: ', e);
				}
				let re = new RegExp(filter);

				updatedDeviceGroups.forEach((item,i) => {
					
					if (re.test(item.name)) 
						updatedDeviceGroups[i].enabled = true;
					else
						updatedDeviceGroups[i].enabled = false;

				})
			}
		}

		let enabledID = [];
		updatedDeviceGroups.filter(item => item.enabled).forEach(item => { enabledID = enabledID.concat(item.Devices) });
		this.SelectedDeviceIds = _.uniq(enabledID)



	
	}

	getGroups() {
		this.datasource.getDeviceGroups().then(data => {

			let updatedDeviceGroups: any[] = [];

			if (data.data.length == 0) {
				this.panel.filterDevice = true;
				return;
			}



			data.data.forEach(g => {
				let index = this.panel.deviceGroups.findIndex(item => item.ID == g.ID);

				let enabled = false;
				if (index > -1)
					enabled = this.panel.deviceGroups[index].enabled

				updatedDeviceGroups.push({ name: g.Name, ID: g.ID, enabled: enabled, Devices: g.Devices })
			})

			this.panel.deviceGroups = updatedDeviceGroups;
		})
	}
	
    handleClick(d) {
        window.open( this.panel.link + '/DeviceStatus.cshtml?ID=' + d.ID)
    }
    // #endregion

}