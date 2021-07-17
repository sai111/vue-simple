

简写：

```
animation: name duration timing-function delay iteration-count direction fill-mode play-state

animation: move 2s ease 0.3s 3 normal forwards;
```



| 值                                                           | 说明                                                         | 参数                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| *[animation-name](https://www.runoob.com/cssref/css3-pr-animation-name.html)* | 指定要绑定到选择器的关键帧的名称                             | keyframename                                                 |
| *[animation-duration](https://www.runoob.com/cssref/css3-pr-animation-duration.html)* | 动画指定需要多少秒或毫秒完成                                 | 规定完成动画所花费的时间。默认值是 0，意味着没有动画效果     |
| *[animation-timing-function](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html)* | 设置动画将如何完成一个周期                                   | 使用名为三次贝塞尔（Cubic Bezier）函数的数学函数，默认值为：ease, linear |
| *[animation-delay](https://www.runoob.com/cssref/css3-pr-animation-delay.html)* | 设置动画在启动前的延迟间隔。                                 |                                                              |
| *[animation-iteration-count](https://www.runoob.com/cssref/css3-pr-animation-iteration-count.html)* | 定义动画的播放次数。                                         | n: 次数 。infinite：规定动画应该无限次播放                   |
| *[animation-direction](https://www.runoob.com/cssref/css3-pr-animation-direction.html)* | 指定是否应该轮流反向播放动画。                               | normal：默认值。动画应该正常播放、alternate：动画应该轮流反向播放 |
| [animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |                                                              |
| *[animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html)* | 指定动画是否正在运行或已暂停。                               | paused：指定暂停动画。running：指定正在运行的动画            |







animation-timing-function【规定动画的速度曲线】

| 值                            | 描述                                                         | 测试                                                         |
| :---------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| linear                        | 动画从头到尾的速度是相同的。                                 | [测试](https://www.w3school.com.cn/tiy/c.asp?f=css_animation-timing-function) |
| ease                          | 默认。动画以低速开始，然后加快，在结束前变慢。               | [测试](https://www.w3school.com.cn/tiy/c.asp?f=css_animation-timing-function&p=2) |
| ease-in                       | 动画以低速开始。                                             | [测试](https://www.w3school.com.cn/tiy/c.asp?f=css_animation-timing-function&p=3) |
| ease-out                      | 动画以低速结束。                                             | [测试](https://www.w3school.com.cn/tiy/c.asp?f=css_animation-timing-function&p=4) |
| ease-in-out                   | 动画以低速开始和结束。                                       | [测试](https://www.w3school.com.cn/tiy/c.asp?f=css_animation-timing-function&p=5) |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。 |                                                              |



[animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html)

| 值        | 描述                                                         |
| :-------- | :----------------------------------------------------------- |
| none      | 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。 |
| forwards  | 在动画结束后（由 animation-iteration-count 决定），动画将应用该属性值。 |
| backwards | 动画将应用在 animation-delay 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 animation-direction 为 "normal" 或 "alternate" 时）或 to 关键帧中的值（当 animation-direction 为 "reverse" 或 "alternate-reverse" 时）。 |
| both      | 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。 |
| initial   | 设置该属性为它的默认值。请参阅 [*initial*](https://www.runoob.com/cssref/css-initial.html)。 |
| inherit   | 从父元素继承该属性。请参阅 [*inherit*](https://www.runoob.com/cssref/css-inherit.html)。 |
