//测试目录
//测试 正则
//测试 扩展名
//自定义jest
// 有时间改好 先提上去
const webpackConfig = require('./creams.config.js');
const readAllFileList = require("./config/jest/readAllFile.js");
const path = require('path');
/**
 * fileList : (指定检测覆盖率的 文件路径)
 * [{
 *  filePath: RegExp(/src\/components/) || path (匹配文件绝对路径)
 *  ExtensionName (检测覆盖率的文件后缀)
 * }]
 * testReg: RegExp(匹配检测覆盖率的 测试文件)
 *
 */
// const fileList = [{
//   filePath: /src\/components/,
//   ExtensionName:'/**/*.{ts,tsx}'
// }]
// const fileList = [{
//   filePath: path.resolve(__dirname, './src/components'),
//   ExtensionName: '/**/*.{ts,tsx}'
// }]

//获取自定义 指定检查所有需要测试的文件  不配置是默认
const fileList = [];
var testReg = /__tests__/;
const collectCoverageFrom = [...new Set(readAllFileList(fileList, testReg))];

//获取自定义 webpack别名
const { alias, jest } = webpackConfig;
delete alias['@'];
const moduleNameMapperConfig = {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
    "@/([^\\.]*)$": "<rootDir>/src/$1",
}
const moduleNameMapper = (alias) => Object.keys(alias).reduce((target, key) => {
    const moduleNameMapperKey = `^${key}(.*)$`;
    const moduleNameMapperValue = alias[key].split('creams-main')[1];
    return {
        [moduleNameMapperKey]: `<rootDir>${moduleNameMapperValue}$1`,
        ...target,
        ...moduleNameMapperConfig
    }
}, {})

module.exports = {
    verbose: true,
    setupFiles: ["<rootDir>/config/jest/setupTests.js"],
    setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.js"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    modulePathIgnorePatterns: ['<rootDir>/node_modules'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/config/jest/',
        '<rootDir>/__mocks__',
    ],
    collectCoverage: true,
    collectCoverageFrom,
    //   collectCoverageFrom: [
    //     '<rootDir>/src/components/**/*.{js,jsx,ts,tsx}',
    //   ],
    coverageThreshold: {
        // global: {
        //   "branches": 50,
        //   "functions": 50,
        //   "lines": 50,
        //   "statements": 70
        // }
    },
    coveragePathIgnorePatterns: ["/node_modules/"],
    testMatch: [
        '<rootDir>/**/__tests__/**/*.(j|t)s?(x)',
        '<rootDir>/**/(*.)(spec|test).(j|t)s?(x)'
    ],
    //   testMatch: null,
    testEnvironment: 'jsdom',
    transform: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/jest/fileTransformer.js",
        // "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        '^.+\\.(css|less)$': "<rootDir>/config/jest/custom-transformer.js",
    },
    //测试过程不改变满足配置的文件
    transformIgnorePatterns: ['/node_modules/'],
    moduleDirectories: ["node_modules", "src"],
    modulePaths: ['<rootDir>/src', '<rootDir>/modules'],
    moduleNameMapper: moduleNameMapper(alias),
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.test.json',
            diagnostics: false,
        },
    },
    preset: "ts-jest",
    //ui 测试快照
    snapshotSerializers: ["enzyme-to-json/serializer"],
    ...jest
}