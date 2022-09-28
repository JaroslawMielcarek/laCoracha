module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
    // '^.+\\.vue$': 'vue-jest'
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "vue"
  ],
}
