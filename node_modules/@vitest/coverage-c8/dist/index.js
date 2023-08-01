import inspector from 'node:inspector';

const session = new inspector.Session();
function startCoverage() {
  session.connect();
  session.post("Profiler.enable");
  session.post("Profiler.startPreciseCoverage", {
    callCount: true,
    detailed: true
  });
}
async function takeCoverage() {
  return new Promise((resolve, reject) => {
    session.post("Profiler.takePreciseCoverage", async (error, coverage) => {
      if (error)
        return reject(error);
      const result = coverage.result.filter(filterResult);
      resolve({ result });
    });
  });
}
function stopCoverage() {
  session.post("Profiler.stopPreciseCoverage");
  session.post("Profiler.disable");
  session.disconnect();
}
function filterResult(coverage) {
  if (!coverage.url.startsWith("file://"))
    return false;
  if (coverage.url.includes("/node_modules/"))
    return false;
  return true;
}

var coverage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  startCoverage: startCoverage,
  stopCoverage: stopCoverage,
  takeCoverage: takeCoverage
});

var index = {
  ...coverage,
  async getProvider() {
    const name = "./provider.js";
    const { C8CoverageProvider } = await import(name);
    return new C8CoverageProvider();
  }
};

export { index as default };
