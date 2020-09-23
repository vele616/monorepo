const services = {
    [process.env.FA_TL_URL]: require('./services/tl'),
    [process.env.AG_TL_URL]: require('./services/tl'),
    [process.env.C_TL_URL]: require('./services/tl'),
    [process.env.GB_TL_URL]: require('./services/tl'),
    [process.env.ID_TL_URL]: require('./services/tl'),
    [process.env.NB_TL_URL]: require('./services/tl'),
    [process.env.RL_WA_URL]: require('./services/wa'),
    [process.env.IP_WA_URL]: require('./services/wa'),
    [process.env.MA_WA_URL]: require('./services/wa'),
    [process.env.RS_WA_URL]: require('./services/wa'),
    [process.env.WM_WA_URL]: require('./services/wa'),
    [process.env.PR_LE_URL]: require('./services/le'),
    [process.env.EB_LE_URL]: require('./services/le'),
    [process.env.K2_LE_URL]: require('./services/le'),
    [process.env.RH_LE_URL]: require('./services/le'),
    [process.env.FT_GH_URL]: require('./services/gh'),
    [process.env.OB_GH_URL]: require('./services/gh'),
    [process.env.B_GH_URL]: require('./services/gh'),
    [process.env.CP_GH_URL]: require('./services/gh'),
    [process.env.LT_BR_URL]: require('./services/br'),
    [process.env.I_BR_URL]: require('./services/br'),
    [process.env.CV_BR_URL]: require('./services/br'),
    [process.env.MT_BR_URL]: require('./services/br'),
    [process.env.OS_BR_URL]: require('./services/br'),
    [process.env.WL_BR_URL]: require('./services/br'),
    [process.env.PL_BR_URL]: require('./services/br'),
    [process.env.KP_BH_URL]: require('./services/bh'),
    [process.env.BS_BH_URL]: require('./services/bh'),
    [process.env.AM_BH_URL]: require('./services/bh'),
    [process.env.WI_BH_URL]: require('./services/bh'),
};
module.exports = (url, browser, jobUrl) => ({
    getJobs: () => services[url].getJobs(browser, jobUrl),
    getUrls: () => services[url].getUrls(browser, url),
});