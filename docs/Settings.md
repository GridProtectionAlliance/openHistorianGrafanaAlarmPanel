# openHistorian Device Alarm Panel

## Settings

### Grafana Panel Settings
The following Settings are available in the Grafana plugin:
* **Panel Link Adress**: This link is used to access the Device Status Page of the openPDC when the user clicks on any of the devices in the panel. The Device Status page provides additional information about the PMU and its connection status.
For instance, if the PDC is running on a server _127.1.1.1_ with the default port settings, then this link should be set to _http://127.1.1.1:8280/ _

![GitHub Logo](../Source/src/images/Settings.png)

* **Device Name Filter**: This filterexpression is used to filter the devices shown on the panel. If the expression is left blank all devices are shown. The expression is based on [REGEX](google.com) and is applied to the device names.
For instance if obnly devices starting with _GPA- _ should be shown the expression would be _$GPA- _.

### openPDC adapter Settings
In addition to the Grafana panel there is a number of settings in the [openPDC Action Adapter](./setup.md) that has to run on the associated openPDC to ensure the panel works.
The relevant adapter settings are:
