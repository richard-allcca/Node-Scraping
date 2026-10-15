export const getTargetUrl = (defaultUrl) => process.env.PUPPETEER_URL?.trim() || defaultUrl;

export const getLaunchOptions = (defaults = {}) => {
  const options = { ...defaults };
  const headlessSetting = process.env.PUPPETEER_HEADLESS;
  const slowMoSetting = process.env.PUPPETEER_SLOW_MO;

  if (headlessSetting !== undefined) {
    if (headlessSetting !== 'true' && headlessSetting !== 'false') {
      throw new Error('PUPPETEER_HEADLESS debe ser "true" o "false".');
    }
    options.headless = headlessSetting === 'true';
  }

  if (slowMoSetting !== undefined) {
    const slowMo = Number(slowMoSetting);
    if (!Number.isFinite(slowMo) || slowMo < 0) {
      throw new Error('PUPPETEER_SLOW_MO debe ser un número mayor o igual que cero.');
    }
    options.slowMo = slowMo;
  }

  return options;
};
