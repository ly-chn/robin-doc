## Robin 是什么

Robin 是一个简易的 Java 反爬框架, 目标是填补 Java 没有一个好用的反爬库的空白, 为中小型公司的反爬工作的提供良好的解决方案.

目前虽然爬虫已经有不少爬虫判刑案例, 但是在利益的诱惑之下依然有数不清的公司在非法获取数据, 
而大多中小公司的反爬要不少的成本, 不免要降低反爬工作的优先级.

简单百度一下不难发现, 爬虫教程遍地都是, 爬虫/反爬虫/反反爬虫之战 简直是诸神黄昏. 
这些人肆意破坏规则, 还有人自欺欺人, 告诉你, 
只要你的"数据量不够大/没有拿来盈利/不让对方服务器宕机/频率像普通用户访问/不窃取用户个人信息/不利用漏洞"即可, 
完全忽略站点说明和`robots`协议. 可耻至极. 附参考链接[知乎-爬虫究竟是合法还是违法的](https://www.zhihu.com/question/291554395)

但是虽然他们是违法/不道德的, 我们依然没什么手段维护自己权益, 首先定位爬虫比较困难, 很难分析是不是用户瞎点的还是爬虫爬取的, 
很难找到是哪个公司还是个人爬取的数据.

因此特写了此框架, 希望可以增加爬虫的成本, 阻止低级爬虫, 为系统的稳定运行增加一份保障.

##  Features

Robin目前内置两种策略, 可以实现大家常见需求, 未来会增加更多策略, 也欢迎大家提出建议.

- 持续访问限制

- 令牌桶

## 常见的反爬策略

1. 后端

    - QPS 限制

      > 每秒可响应次数

    - IP 访问频率限制

      > IP 访问频率限制可以说是最常见的了, 对于同一个 IP 短期内高频率访问, 基本可以认定为无效访问, 而且对于小公司/个人的爬虫, 维护一个 IP 代理池也是需要一些成本的. 但是如果网站本身访问量很大, 检测此项还是比较有难度的.

    - ua 验证

      > 这个应该是最低级的爬虫限制策略了, 因为web开发者好好跟着爬虫课程学习一小时就能绕过这个策略.

    - Token 验证

      > 对敏感数据要求登录后获取, 这是一个非常好的方案, Robin 将实现对单一用户在使用不同代理 ( IP 等 ) 的频繁访问进行检测. 对会员等级, 帐号权限相关的校验请交给专业的权限框架去解决, 这里推荐一个权限框架: [sa-token](https://sa-token.cc/)(一个轻量级 java 权限认证框架，让鉴权变得简单、优雅！)

    - 指定接口访问限制

      > 有些接口是需要轮询查询的, 访问理应频繁的, 这些接口应当在其它验证策略排除之外, 比如验证码接口, Robin 也将为此做出相应手段

    - 网站持续浏览限制

      > 有些爬虫会发现各种频率限制策略, 但这些爬虫要的不是效率, 而是数据, 那么在这些爬虫将会进行缓慢的爬取, 比如每次获取数据后停顿随机 10~20 秒, 这是我们就需要对这种爬虫单独给出策略, 比如正常用户不会连续五六个小时, 每分钟都访问( 人总是要吃喝拉撒的吧 )

    - robots协议

      > !> Robin 暂时不会考虑相关策略
      >
      > 介绍 (来自 [Google SEO 优化指南](https://developers.google.com/search/docs/advanced/robots/intro?hl=zh-cn)):
      >
      > robots.txt 文件规定了搜索引擎抓取工具可以/无法请求抓取您网站上的哪些网页或文件。
      >
      > ```
      > 如需使用, 建议完整查看相关指南. 不是所有的爬虫都遵守这个规则 ( 事实上你想阻止的爬虫几乎都不遵守 )
      > 
      > Robin并不会给系统主动添加 robots.txt, 以下提出对 robots.txt 的一些建议:
      > 
      > 1. 不需要 SEO 的时候建议加上禁用所有爬虫
      > 2. 不要将robots文件写的太过详细, 至少应当写个通配符, 不然有些爬虫找不到你接口的时候直接通过robots文件直接看到了.
    - 被遗忘的爬虫

      > 有些写爬虫的直接放服务器, 随后被作者遗忘, 一直会浪费服务器性能, 未来可能会对这些爬虫做出策略

2. 需要前端配合的验证

   > 优点: 简单小策略可增加爬虫不少心思
   >
   > 缺点: 容易绕过, 尤其是未经过混淆的前端代码
   >
   > 此处逻辑应由用户自己扩展, 不应框架提供, 否者太容易从框架中找到验证方式了, Robin将会提供示例, 不会提供相应策略

    - 特殊的 header

      > 其实token已经算是其一了, 再举一个常见的例子
      >
      > 一个请求发过来的时候header中带有一个MD5, 计算方式: md5( salt + 当前请求的分钟级时间戳 ), 后端只要验证最近几分钟的MD5是否一致即可

    - aes/des等加密部分字段

      > 至少我遇到的网站不常用, 也只有登录或第三方调用等才会用的, 毕竟比较依靠后端性能.

    - 轮询存活

      > 这点就不说了, 比较低级

    - 使用第三方授权

      > 这个就把部分反爬成本嫁接给第三方了

    - 用户指纹/环境指纹

      > 比较高级, 一般不会公开这种检测方式, 因为性能, 数据分析成本较高, 所以不在Robin的考虑范围之内

    - ai识别

      > 如验证码的轨迹检测, 和第三方的联调, 如`腾讯`最近上传用户的浏览器历史记录判断用户是否正常, 同上, 不在 Robin 的考虑范围

3. 其它

   > 这部分大都是非及时性的反爬策略了, 如对访问日志的分析, 发现爬虫的其它特性