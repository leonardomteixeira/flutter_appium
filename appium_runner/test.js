const wdio = require('webdriverio');
const assert = require('assert');
const find = require('appium-flutter-finder');

const osSpecificOps = process.env.APPIUM_OS === 'android' ? {
    platformName: 'Android',
    deviceName: 'emulator-5554',
    // @todo support non-unix style path
    app: __dirname + '/../../appium_example/build/app/outputs/apk/debug/app-debug.apk',
} : process.env.APPIUM_OS === 'ios' ? {
    platformName: 'iOS',
    platformVersion: '12.2',
    deviceName: 'iPhone X',
    noReset: true,
    app: __dirname + '/../ios/Runner.zip',

} : {};

const opts = {
    port: 4723,
    capabilities: {
        ...osSpecificOps,
        automationName: 'Flutter'
    }
};

(async () => {
    console.log('Initial APPIUM testing');
    const driver = await wdio.remote(opts);
    assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');
    await driver.execute('flutter:clearTimeline');
    await driver.execute('flutter:forceGC');

    await driver.execute('flutter:waitFor', find.byValueKey('loginBtn'));
})
