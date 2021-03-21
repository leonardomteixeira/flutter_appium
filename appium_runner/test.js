const wdio = require('webdriverio');
const assert = require('assert');
const find = require('appium-flutter-finder');

const osSpecificOps = process.env.APPIUM_OS === 'android' ? {
    platformName: 'Android',
    deviceName: 'emulator-5554',
    app: __dirname + '/../pokemon_lets_go_flutter/build/app/outputs/apk/debug/app-debug.apk',
} : process.env.APPIUM_OS === 'ios' ? {
    platformName: 'iOS',
    platformVersion: '12.2',
    deviceName: 'iPhone X',
    noReset: true,
    app: __dirname + '/../pokemon_lets_go_flutter/Build/ios/Debug-iphonesimulator/Runner.app',

} : {};

const opts = {
    port: 4723,
    capabilities: {
        ...osSpecificOps,
        automationName: 'Flutter'
    }
};

(async () => {
    console.log(opts.capabilities);
    console.log('Initial APPIUM testing');
    const driver = await wdio.remote(opts);
    assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');
    await driver.execute('flutter:clearTimeline');
    await driver.execute('flutter:forceGC');

    await driver.execute('flutter:waitFor', find.byText('Bulbasaur'));
    await driver.execute('flutter:waitFor', find.byValueKey('pokemon-Bulbasaur'));
    await driver.elementClick(find.byValueKey('pokemon-Bulbasaur'));

    await driver.execute('flutter:waitFor', find.byText('Bulbasaur'));
    await driver.elementClick(find.byType('Icon'));

    driver.deleteSession();
})();
