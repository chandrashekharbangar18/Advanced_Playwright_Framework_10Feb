module.exports = {
  level1: {
    paths: ["src/cucumber/level_02_Basics/feature/**/*.feature"],
    require: [
      "src/cucumber/support/world.ts",
      "src/cucumber/support/hook.ts",
      "src/cucumber/level_02_Basics/step-def/**/*.ts",
    ],
    format: ["pretty"],
  },
  level2: {
    paths: ["src/cucumber/level_03_data-driven/feature/**/*.feature"],
    require: [
      "src/cucumber/support/world.ts",
      "src/cucumber/support/hook.ts",
      "src/cucumber/level_03_data-driven/steps/**/*.ts",
    ],
    format: ["pretty"],
  },
};
