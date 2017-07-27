cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-ble/ble.js",
        "id": "cordova-plugin-ble.BLE",
        "pluginId": "cordova-plugin-ble",
        "clobbers": [
            "evothings.ble"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
        "id": "cordova-plugin-device-motion.Acceleration",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
        "id": "cordova-plugin-device-motion.accelerometer",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/src/browser/AccelerometerProxy.js",
        "id": "cordova-plugin-device-motion.AccelerometerProxy",
        "pluginId": "cordova-plugin-device-motion",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-eddystone/js/eddystone-plugin.js",
        "id": "cordova-plugin-eddystone.eddystoneplugin",
        "pluginId": "cordova-plugin-eddystone",
        "clobbers": [
            "evothings.eddystone"
        ]
    },
    {
        "file": "plugins/cordova-plugin-shake/www/shake.js",
        "id": "cordova-plugin-shake.Shake",
        "pluginId": "cordova-plugin-shake",
        "clobbers": [
            "shake"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "id": "cordova-plugin-vibration.notification",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/src/browser/Vibration.js",
        "id": "cordova-plugin-vibration.Vibration",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-ble": "2.0.1",
    "cordova-plugin-device-motion": "1.2.5",
    "cordova-plugin-eddystone": "1.3.0",
    "cordova-plugin-shake": "0.6.0",
    "cordova-plugin-vibration": "2.1.5",
    "cordova-plugin-whitelist": "1.2.2"
}
// BOTTOM OF METADATA
});