import assert from 'node:assert/strict';
import test from 'node:test';
import { getLaunchOptions, getTargetUrl } from '../src/exampleConfig.js';

const withEnvironment = (values, callback) => {
  const originalValues = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  });

  try {
    callback();
  } finally {
    Object.entries(originalValues).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
  }
};

test('uses the default URL unless a non-empty override is configured', () => {
  withEnvironment({ PUPPETEER_URL: undefined }, () => {
    assert.equal(getTargetUrl('https://example.com'), 'https://example.com');
  });

  withEnvironment({ PUPPETEER_URL: '  https://local.test/page  ' }, () => {
    assert.equal(getTargetUrl('https://example.com'), 'https://local.test/page');
  });
});

test('preserves launch defaults and reads headless and slow motion overrides', () => {
  withEnvironment({ PUPPETEER_HEADLESS: undefined, PUPPETEER_SLOW_MO: undefined }, () => {
    assert.deepEqual(getLaunchOptions({ headless: false, slowMo: 100 }), {
      headless: false,
      slowMo: 100,
    });
  });

  withEnvironment({ PUPPETEER_HEADLESS: 'true', PUPPETEER_SLOW_MO: '25' }, () => {
    assert.deepEqual(getLaunchOptions({ headless: false }), { headless: true, slowMo: 25 });
  });
});

test('rejects invalid launch option values', () => {
  withEnvironment({ PUPPETEER_HEADLESS: 'yes' }, () => {
    assert.throws(() => getLaunchOptions(), /PUPPETEER_HEADLESS/);
  });

  withEnvironment({ PUPPETEER_SLOW_MO: '-1' }, () => {
    assert.throws(() => getLaunchOptions(), /PUPPETEER_SLOW_MO/);
  });
});
