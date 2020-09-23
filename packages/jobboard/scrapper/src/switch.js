const services = {
    [process.env.TL_PLATFORM]: require('./services/tl'),
    [process.env.WA_PLATFORM]: require('./services/wa'),
    [process.env.LE_PLATFORM]: require('./services/le'),
    [process.env.GH_PLATFORM]: require('./services/gh'),
    [process.env.BR_PLATFORM]: require('./services/br'),
    [process.env.BH_PLATFORM]: require('./services/bh'),
};
module.exports = (platform, url, browser, jobUrl) => ({
    getJobs: () => services[platform].getJobs(browser, jobUrl),
    getUrls: () => services[platform].getUrls(browser, url),
});