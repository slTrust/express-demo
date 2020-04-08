> 安装express-generator

```
npm i -g express-generator
```

> 使用express-generator生成一个express项目

```
# --view 渲染引擎使用 ejs
express --view=ejs what_i_love #项目名
cd what_i_love
npm i
```

> 安装并设置eslint，使用Airbnb标准

- [搜索 npm eslint airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

初始化eslint

- 推荐项目本地安装，而不是全局安装
- 安装好后运行 `npx eslint--init`

```
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? None of these
? Which framework does your project use? None of these
? Does your project use TypeScript? No
? Where does your code run? Node
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in? JSON
```

> 打开 webstorm

- 首选项 搜索 eslint 选择你的 node 和 eslint文件
- webstorm提示TypeError: this.cliEngine is not a constructor
    - https://blog.csdn.net/qq_20567691/article/details/101152933
```
修改这个文件/Applications/WebStorm.app/Contents/plugins/JavaScriptLanguage/languageService/eslint/bin/eslint-plugin.js



// this.cliEngine = require(packagePath + "lib/cli-engine");
this.cliEngine = require(packagePath + "lib/cli-engine").CLIEngine;
重启webstorm就可以了
```

- 格式化为eslint标准(右键Fix ESLint Problems) https://www.cnblogs.com/qq752059037/p/11098882.html
- [webstorm设置](https://blog.csdn.net/peade/article/details/101032075)