const services = {
    [process.env.TL_PLATFORM]: require('./services/tl'),
    [process.env.WA_PLATFORM]: require('./services/wa'),
    [process.env.LE_PLATFORM]: require('./services/le'),
    [process.env.GH_PLATFORM]: require('./services/gh'),
    [process.env.BR_PLATFORM]: require('./services/br'),
    [process.env.BH_PLATFORM]: require('./services/bh'),
    [process.env.RC_PLATFORM]: require('./services/rc'),
    [process.env.AJ_PLATFORM]: require('./services/aj'),
    [process.env.FT_PLATFORM]: require('./services/ft'),
    [process.env.GO_PLATFORM]: require('./services/go'),
    [process.env.RB_PLATFORM]: require('./services/rb'),
    [process.env.SR_PLATFORM]: require('./services/sr'),
};
module.exports = (platform, url, browser, jobUrl) => ({
    getJobs: () => services[platform].getJobs(browser, jobUrl),
    getUrls: () => services[platform].getUrls(browser, url),
});