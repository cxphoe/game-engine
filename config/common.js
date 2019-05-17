const path = require('path');
const slash = require('slash');
const ArgParser = require('./argParser');

const resolve = (str, baseDir = __dirname) => {
    return slash(path.resolve(baseDir, str));
};

const join = (...args) => {
    return slash(path.join.apply(null, args));
};

const getRootPath = () => {
    const optionArgs = ArgParser.getOptionArgs();
    let root = optionArgs['build-path'] || path.resolve(__dirname, '../docs');
    if (!path.isAbsolute(root)) {
        root = path.join(process.cwd(), root);
    }
    return root;
};

/** path of the packaged files */
const ROOT_PATH = getRootPath();
/** path of the packaged static files (based on ROOT_PATH) */
const STATIC_PATH = 'static';
/** path of the packaged template files (based on ROOT_PATH) */
const TEMPLATE_PATH = '.';

module.exports = {
    ROOT_PATH,
    STATIC_PATH,
    TEMPLATE_PATH,
    join,
    resolve,
};
